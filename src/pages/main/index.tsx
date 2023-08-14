import React, { ReactNode } from "react";
import s from "./index.module.less";


interface Props {
  children: ReactNode;
}

class Main extends React.Component<Props> {

  render() {
    const { children } = this.props;

    return <main className={s.main}>
      {children}
    </main>
  }
}

export default Main;