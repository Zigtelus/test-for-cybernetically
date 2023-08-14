import React from "react";
import StockQuotes from "../../../components/stockQuotes";
import TickerSymbolsBtns from "../../../components/tickerSymbolsBtns";

class Stocks extends React.Component {
  render() {
    return <div>
      <TickerSymbolsBtns />
      <StockQuotes />
    </div>
  }
}

export default Stocks;