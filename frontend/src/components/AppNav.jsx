import { NavLink } from "react-router";

export function AppNav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink to="/accounts">Accounts</NavLink>
        </li>
        <li>
          <NavLink to="/vendors">Vendors</NavLink>
        </li>
      </ul>
    </nav>
  );
}
