import { takeEvery } from 'redux-saga/effects';
import { workerLoadStock } from './stockQuotes/stockQuotes.saga.ts';
import { workerTickerSymbols } from './tickerSymbols/tickerSymbols.saga.ts';

export function* watchLoadData() {
  yield takeEvery('LOAD_STOCK', workerLoadStock)
  yield takeEvery('LOAD_TIKER-SYMBOLS', workerTickerSymbols)
}