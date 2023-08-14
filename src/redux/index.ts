import { combineReducers } from 'redux';

import ReducerGeneral, { InitialStateGeneral } from './general/general.reducer.ts';
// ассинхронные редюсеры
import ReducerStockQuotes, { initialStateStockQuotes } from './stockQuotes/stockQuotes.reducer.ts';
import ReducerTickerSymbols, { initialStateTickerSymbols } from './tickerSymbols/tickerSymbols.reducer.ts';


export const rootReducer = combineReducers({
  stockQuotes: ReducerStockQuotes,
  tickerSymbols: ReducerTickerSymbols,
  general: ReducerGeneral
});

export interface RootState {
  stockQuotes: initialStateStockQuotes,
  tickerSymbols: initialStateTickerSymbols,
  general: InitialStateGeneral
}