export type StockType = {
  stockId: number,
  capitalExpenditures: number,
  cashChange: number,
  cashFlow: number,
  cashFlowFinancing: number,
  changesInInventories: number,
  changesInReceivables: number,
  currency: string,
  depreciation: number,
  dividendsPaid: null,
  exchangeRateEffect: null,
  filingType: string,
  fiscalDate: string,
  fiscalQuarter: number,
  fiscalYear: number,
  investingActivityOther: null,
  investments: null,
  netBorrowings: number,
  netIncome: number,
  otherFinancingCashFlows: null,
  reportDate: string,
  symbol: string,
  totalInvestingCashFlows: number,
  id: string,
  key: string,
  subkey: string,
  date: number,
  updated: number
}

export interface initialStateStockQuotes {
  stocks: StockType[];
  isLoading: boolean;
  error: string;
}

// Определение начального состояния
const initialState: initialStateStockQuotes = {
  stocks: [],
  isLoading: false,
  error: ''
};

// Определение редьюсера
const reducer = (state = initialState, action: any) => {

  switch (action.type) {
    case 'STOCK_DATA':
      // добавление stockId 
      const stocks = action.payload

      return {
        ...state,
        stocks,
        isLoading: false,
        error: !!action.payload[0] ? '' : 'токен введен не верно'
      };
    case 'STOCKS_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default reducer;
