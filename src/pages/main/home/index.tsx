import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {

  render = () => <div>
    <p>тестовое задание Цыганкова Григория</p>
    <p>проект создан на классовых компонентах и собственной сборке Webpack, так как совместимости из "коробки" TS с классовыми компонентами не предусмотренно</p>
    <p>что бы посмотреть котировки, вам необходимо выбрть <Link to="/stocks">stocks</Link></p>
  </div>
}


export default Home;
