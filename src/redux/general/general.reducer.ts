export interface InitialStateGeneral {
  token: string;
  symbol: string;
  popup: boolean;
}

// Определение начального состояния
const initialState: InitialStateGeneral = {
  token: '',
  symbol: '',
  popup: false
};

// Определение редьюсера
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'CHANGE_TOKEN':
      return { ...state, token: action.payload };
    case 'CHANGE_SYMBOL':
      return { ...state, symbol: action.payload };
    case 'CHANGE_POPUP':
      return { ...state, popup: action.payload };
    default:
      return state;
  }
};

export default reducer;
