import { Link } from "react-router-dom";
export default function Header() {
  return (
    <>
      <div className="container">
        <nav>
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
