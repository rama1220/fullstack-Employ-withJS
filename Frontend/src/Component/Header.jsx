import { Link } from "react-router-dom";
import Logo from "../assets/image/logo.png";
export default function Header() {
  return (
    <>
      <div className="container">
        <nav>
          <div className="logo">
            <img src={Logo} alt="" />
          </div>
          <Link to="/login" className="nav-link">
            <h4>Login</h4>
          </Link>
        </nav>
        <div className="hero-section">
          <h2>Wellcome to The Company</h2>
        </div>
      </div>
    </>
  );
}
