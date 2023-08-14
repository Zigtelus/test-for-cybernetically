import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux";

type Props = {
  symbol: string
}

class Header extends React.Component<Props> {

  render() {
    const { symbol } = this.props;

    return (
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">home</Link>
            </li>
            <li>

              {/* в случае если symbol был ранее выбран, тогда перекидывает сразу на выбранный symbol*/}
              <Link to={`/stocks${!!symbol ? `/1/${symbol}` : ''}`}>stocks</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  symbol: state.general.symbol
});

export default connect(mapStateToProps)(Header);
