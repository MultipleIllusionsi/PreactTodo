import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";
import * as style from "./style.scss";

const Header: FunctionalComponent = () => {
  return (
    <header class={style.header}>
      <h1>Preact TODO List</h1>
      <nav>
        <Link activeClassName={style.active} href="/">
          Home
        </Link>
        <Link activeClassName={style.active} href="/list">
          List
        </Link>
      </nav>
    </header>
  );
};

export default Header;
