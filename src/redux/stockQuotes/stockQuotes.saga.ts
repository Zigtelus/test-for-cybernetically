import { put } from "redux-saga/effects"
import { LoadStockType, stockData } from "./stockQuotes.action"
import { StockType } from "./stockQuotes.reducer";

async function fetchStocks(payload: { token: string, symbol: string }) {
  try {
    const response = await fetch(`https://api.iex.cloud/v1/data/core/cash_flow/${payload.symbol}?token=${payload.token}&last=10`);
    const data = await response.json();

    // добавил stockId, что бы key можно было поставить DOM елементам
    return data.map((item: StockType, index: number) =>
      ({ ...item, stockId: index + 1 }));
  } catch (error) {
    console.log('error', error);
    return [];
  }
}

export function* workerLoadStock(loadStock: LoadStockType): any {
  const data = yield fetchStocks(loadStock.payload)

  yield put(stockData(data))
}