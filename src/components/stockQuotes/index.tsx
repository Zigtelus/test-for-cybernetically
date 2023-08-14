import React from "react";
import { connect } from "react-redux";
import s from "./index.module.less";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";

import { loadStock, stockData, stockLoader } from "../../redux/stockQuotes/stockQuotes.action.ts";
import { changeSymbol } from "../../redux/general/general.action.ts";
import { StockType } from "../../redux/stockQuotes/stockQuotes.reducer.ts";

import { RootState } from "../../redux/index.ts";
import Loading from "../loading/index.tsx";
import NotFound from "../../pages/main/NotFound/index.tsx";

interface RouteParams {
  id: string;
  symbol: string;
}

interface Props extends RouteComponentProps<RouteParams> {
  //mapStateToProps
  stocks: StockType[];
  isLoading: boolean;
  token: string;
  symbol: string;
  symbols: any[]

  // mapDispatchToProps
  loadStock: (token: string, symbol: string) => void;
  stockData: (data: any) => void;
  stockLoader: () => void;
  changeSymbol: (symbol: string) => void;
};

class StockQuotes extends React.Component<Props> {

  constructor(props: Props) {
    super(props);
    this.getStocks = this.getStocks.bind(this);
    this.changeSymbol = this.changeSymbol.bind(this);
  }

  componentDidMount(): void {
    this.changeSymbol();
  }

  changeSymbol() {
    const { symbol } = this.props.match.params;

    if (symbol !== this.props.symbol) {
      this.props.changeSymbol(symbol);
    }
  }



  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
    this.changeSymbol();
    if (prevProps !== this.props) {
      const { loadStock, stockLoader, token, stockData, stocks, symbol } = this.props;

      if (prevProps.stocks !== stocks) {
        stockData(stocks);
      }

      if (prevProps.token !== token || prevProps.symbol !== symbol && !!symbol) {
        stockLoader();
        loadStock(token, symbol);
      }
    }
  }

  // получение котировок
  getStocks(stocks: StockType[]) {
    // номер индекса котировки
    const paramId: number = Number(this.props.match.params.id) - 1;

    const stockItem: any = stocks[paramId];

    // перебор объекта
    return Object.keys(stockItem)
      .map(stock => <div
        className={s.stock}
        key={stock}
      >
        <span>{stock}</span> <span>{!!stockItem[stock] ? stockItem[stock] : "нет информации"}</span>
      </div>
      )
  }

  render() {
    const { stocks, isLoading, token, symbol } = this.props;
    const paramId = Number(this.props.match.params.id);
    const { getStocks } = this;

    return <div>

      {
        paramId > 10 ?
          <NotFound /> :
          (

            <div>
              {
                isLoading ?
                  <Loading /> :
                  <>
                    {
                      /* 
                        проверка на наличие токена
                        если токен есть в стейте, значит он прошел проверку
                      */
                      !!token && (

                        // если stocks имеется по символу в symbolTarget, тогда проверка будет пройдена
                        !!stocks[0] ?
                          <div>
                            {
                              getStocks(stocks)
                            }
                          </div> :
                          <div>
                            <p>данные не были найдены в API iexcloud</p>
                            <p>как оказалось, там многих нет компаний. В техподдержке предложили воспользоваться другими данными, но это будет дольше, так как нужно самому будет собирать данные с разных АПИ</p>
                          </div>
                      )
                    }


                    <div className={s.numbersOfPages}>
                      {

                        /* проверка на наличие stocks в стейте
                           если обнаружены, тогда мапим данные */
                        !!stocks[0] && stocks.map(stock => {
                          return <Link
                            key={stock.stockId}
                            className={`${s.numberPage} ${paramId === stock.stockId && s.numberPageActive}`}
                            to={`/stocks/${stock.stockId}/${stock.symbol}`}
                          >{stock.stockId}</Link>
                        }
                        )
                      }
                    </div>
                  </>
              }
            </div>
          )
      }
    </div>
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    stocks: state.stockQuotes.stocks,
    isLoading: state.stockQuotes.isLoading,
    token: state.general.token,
    symbol: state.general.symbol,
    symbols: state.tickerSymbols.symbols
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    loadStock: (token: string, symbol: string) => dispatch(loadStock(token, symbol)),
    stockLoader: () => dispatch(stockLoader(true)),
    stockData: (data: any) => dispatch(stockData(data)),
    changeSymbol: (symbol: string) => dispatch(changeSymbol(symbol))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StockQuotes));