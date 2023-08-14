export type TickerSymbolType = {
  symbol: string,
  exchange: string,
  exchangeSuffix: string,
  exchangeName: string,
  exchangeSegment: string,
  exchangeSegmentName: string,
  name: string,
  date: string,
  type: string,
  iexId: string,
  region: string,
  currency: string,
  isEnabled: boolean,
  figi: string,
  cik: string,
  lei: string
}

export interface initialStateTickerSymbols {
  symbols: TickerSymbolType[];
  isLoading: boolean;
  error: string;
}

// Определение начального состояния
const initialState: initialStateTickerSymbols = {
  symbols: [],
  isLoading: false,
  error: ''
};

// Определение редьюсера
const reducer = (state = initialState, action: any) => {

  switch (action.type) {
    case 'GET_TIKER-SYMBOLS':
      return {
        ...state,
        symbols: action.payload,
        isLoading: false,
        error: !!action.payload[0] ? '' : 'токен введен не верно'
      };
    case 'TIKER-SYMBOLS_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default reducer;
