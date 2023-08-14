import React, { ChangeEvent, FormEvent } from "react";
import s from "./index.module.less";
import { connect } from "react-redux";

import { RootState } from "../../redux";
import { changePopup, changeToken } from "../../redux/general/general.action";
import Loading from "../loading";

type Props = {
  //mapStateToProps
  error: string;
  stocks: any;

  //mapDispatchToProps
  addToken: (token: string) => void;
  changePopup: (status: boolean) => void;
}

type State = {
  token: string,
  isLoading: boolean;
  error: string;
}

class Popup extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      token: '',
      isLoading: false,
      error: ','
    };

    this.hundleChangeToken = this.hundleChangeToken.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async fetchData(): Promise<void> {

    const { changePopup, addToken } = this.props;
    const { token } = this.state;

    this.setState(state => ({ ...state, isLoading: true }));

    // проверка на рабочий токен
    await fetch(`https://api.iex.cloud/v1/data/CORE/REF_DATA?token=${token}`)
      .then(response => {
        if (response.ok) {

          //добавляем токен в стейт редакса
          addToken(token);

          //добавляем токен в localStorage
          localStorage.setItem('token', token);

          //меняем статус попапа
          changePopup(false);

          this.setState(state => ({ ...state, error: '' }));
        } else {
          this.setState(state => ({
            ...state,
            error: "токен введен не верно"
          }));
        }
      })
      .catch(error => {
        this.setState(state => ({
          ...state,
          error: "ошибка на сервере"
        }));
      })
      .finally(() => {
        this.setState(state => ({ ...state, isLoading: false }));
      });

  }

  hundleChangeToken(e: ChangeEvent<HTMLInputElement>): void {
    const token = e.target.value;
    this.setState(state => ({ ...state, token }));
  }

  handleSubmit(event: FormEvent) {
    event.preventDefault();
    this.fetchData();
    this.setState(state => ({ ...state, token: '', error: '' }));
  }

  render() {
    const { hundleChangeToken, handleSubmit, state } = this;
    const { isLoading, error } = this.state;

    return <div className={s.popup}>


      {
        isLoading ?
          <Loading /> :
          <form onSubmit={handleSubmit}>
            <label htmlFor="token">Enter your token: </label>
            <input
              type="text"
              name="token"
              id="token"
              value={state.token}
              onChange={(e) => hundleChangeToken(e)}
            />
            <button>submit</button>
          </form>
      }

      {
        !!error && <p> {error} </p>
      }

    </div>
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    error: state.stockQuotes.error,
    stocks: state.stockQuotes.stocks
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addToken: (token: string) => dispatch(changeToken(token)),
    changePopup: (status: boolean) => dispatch(changePopup(status))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);