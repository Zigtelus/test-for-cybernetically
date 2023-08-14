// добавить данные в стейт
export const stockData = (dataFromServer: any) => ({
  type: 'STOCK_DATA',
  payload: dataFromServer
})

// добавить токен
export const loadStock = (token: string, symbol: string) => ({
  type: 'LOAD_STOCK',
  payload: { token, symbol }
})

// изменение статуса isLoading
export const stockLoader = (statusLoader: boolean) => ({
  type: 'STOCKS_LOADING',
  payload: statusLoader
})

export type LoadStockType = ReturnType<typeof loadStock>