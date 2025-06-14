import "../css/navigation.css";
import { Link } from "react-router-dom";

const Navigation = ({ isMenuOpen }) => {
  return (
    <nav className="main-nav">
      <ul id="nav-menu" className={isMenuOpen ? 'show' : ''}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link to="/news">News</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
