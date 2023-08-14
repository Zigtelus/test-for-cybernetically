import React, { useMemo } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import s from "./index.module.less";

import { RootState } from "../../redux";

import { loadTikerSymbols, tikerSymbolsLoader } from "../../redux/tickerSymbols/tickerSymbols.action";
import { changeSymbol } from "../../redux/general/general.action";
import { TickerSymbolType } from "../../redux/tickerSymbols/tickerSymbols.reducer";
import Loading from "../loading";

interface Props {
  // mapDispatchToProps
  fetchSymbols: (token: string) => void;
  tikerSymbolsLoader: (status: boolean) => void;
  changeSymbol: (symbol: string) => void;

  // mapStateToProps
  symbols: TickerSymbolType[];
  symbol: string;
  isLoading: boolean;
  isToken: string;
};

interface State {
  numberPages: number;
};

class TickerSymbolsBtns extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      numberPages: 10
    };
    this.handleChangeSymbol = this.handleChangeSymbol.bind(this);
    this.getSymbols = this.getSymbols.bind(this);
  }

  componentDidMount(): void {
    this.getSymbols()
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    if (prevProps !== this.props) {
      this.getSymbols()
    }
  }

  getSymbols() {
    const { isToken, symbols, tikerSymbolsLoader, fetchSymbols } = this.props

    /* если токен подтвержденный имеется, но символов нет в стейте редакса,
       тогда запрашиваем их с сервера */
    if (!!isToken && !symbols[0]) {
      tikerSymbolsLoader(true)
      fetchSymbols(isToken)
    }
  }

  handleChangeSymbol(symbol: string) {
    this.props.changeSymbol(symbol);
  }


  render() {
    const { isLoading, symbols, symbol } = this.props;
    const { numberPages } = this.state;

    return <div>

      <div className={s.symbols}>
        {
          isLoading ?
            <Loading /> :
            <>
              {
                !!symbols[0] &&
                symbols
                  .filter((symbol, index) => index < numberPages)
                  .map(itemSymbol => {
                    const itemSSymbol = itemSymbol.symbol;

                    return <Link
                      key={itemSSymbol}
                      className={`${s.symbolItem} ${itemSSymbol === symbol && s.symbolItemActive}`}
                      to={`/stocks/1/${itemSSymbol}`}
                    >{itemSSymbol}</Link>
                  })
              }
            </>
        }
      </div>
    </div>
  }
}

const mapStateToProps = (state: RootState) => ({
  symbol: state.general.symbol,
  symbols: state.tickerSymbols.symbols,
  isLoading: state.tickerSymbols.isLoading,
  isToken: state.general.token,
});

const mapDispatchToProps = (dispatch: any) => ({
  tikerSymbolsLoader: (status: boolean) => dispatch(tikerSymbolsLoader(status)),
  fetchSymbols: (token: string) => dispatch(loadTikerSymbols(token)),
  changeSymbol: (symbol: string) => dispatch(changeSymbol(symbol))
});

export default connect(mapStateToProps, mapDispatchToProps)(TickerSymbolsBtns);