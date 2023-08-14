import React from "react";
import { Link } from "react-router-dom";


class Header extends React.Component {
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/stocks">stocks</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
