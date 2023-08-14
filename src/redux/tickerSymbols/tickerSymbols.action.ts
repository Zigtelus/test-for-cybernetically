import { TickerSymbolType } from "./tickerSymbols.reducer"

// загрузка SYMBOLS
export const loadTikerSymbols = (token: string) => ({
  type: 'LOAD_TIKER-SYMBOLS',
  token: token
})

// добавление всех Symbols в стейт
export const getTikerSymbols = (dataFromServer: TickerSymbolType[] | []) => ({
  type: 'GET_TIKER-SYMBOLS',
  payload: dataFromServer
})

// смена состояния isLoading
export const tikerSymbolsLoader = (statusLoader: boolean) => ({
  type: 'TIKER-SYMBOLS_LOADING',
  payload: statusLoader
})

export type loadTikerSymbolsType = ReturnType<typeof loadTikerSymbols>