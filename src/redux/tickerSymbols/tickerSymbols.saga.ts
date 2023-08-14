import { call, put } from "redux-saga/effects"
import { loadTikerSymbolsType, getTikerSymbols } from "./tickerSymbols.action"
import { TickerSymbolType } from "./tickerSymbols.reducer";

async function fetchTickerSymbols(token: string) {
  try {
    const response = await fetch(`https://api.iex.cloud/v1/data/CORE/REF_DATA?token=${token}`);
    const data: TickerSymbolType[] = await response.json();
    return data
  } catch (error) {
    console.log('error', error);
    return [];

  }
}

export function* workerTickerSymbols(loadTikerSymbols: loadTikerSymbolsType): any {
  const data = yield fetchTickerSymbols(loadTikerSymbols.token)

  yield put(getTikerSymbols(data))
}