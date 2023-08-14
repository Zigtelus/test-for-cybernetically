import React from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter, RouteComponentProps } from "react-router-dom";

import { RootState } from "../redux";
import { changePopup, changeToken } from "../redux/general/general.action";

import Home from "./main/home";
import Main from "./main";
import Header from "./header";
import Popup from "../components/popup";
import TickerSymbolsBtns from "../components/tickerSymbolsBtns";
import Stocks from "./main/stocks";
import NotFound from "./main/NotFound";

interface Props extends RouteComponentProps {
  isPopup: boolean;
  token: string;

  //mapDispatchToProps
  addToken: (token: string) => void;
  changePopup: (status: boolean) => void;
}

class App extends React.Component<Props> {

  componentDidMount(): void {

    // проверка на наличие токена в localStorage
    const token = localStorage.getItem('token');
    const { addToken, changePopup } = this.props;

    // в случае если токен найден, мы отправляем его в стейт
    if (!!token) {
      addToken(token);
    } else {
      changePopup(true);
    }
  }

  render() {
    const { isPopup } = this.props;


    return (
      <div>
        <Header />
        <Main>
          <Switch>
            <Route exact path="/" component={Home} />

            {/* stocks */}
            <Route exact path="/stocks" render={() => <div>
              <TickerSymbolsBtns />
              <p>выберите символ</p>
            </div>} />

            <Route path="/stocks/:id/:symbol" render={() => <>
              <Stocks />
            </>} />

            {/* NotFound */}
            <Route path="*" component={NotFound} />


          </Switch>
        </Main>
        {isPopup && <Popup />}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    isPopup: state.general.popup,
    token: state.general.token
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addToken: (token: string) => dispatch(changeToken(token)),
    changePopup: (status: boolean) => dispatch(changePopup(status))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
