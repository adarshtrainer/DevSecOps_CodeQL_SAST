import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
      </div>

      <div>
        {user ? (
          <>
            <span style={styles.user}>Hello, {user.name}</span>

            {/* Only show if admin */}
            {isAdmin && (
              <Link to="/add-project" style={styles.link}>
                Add Project
              </Link>
            )}

            <button onClick={handleLogout} style={styles.button}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f5f5f5",
    marginBottom: "20px",
  },
  link: {
    marginRight: "15px",
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
  },
  user: {
    marginRight: "10px",
    fontWeight: "bold",
  },
  button: {
    padding: "5px 10px",
    cursor: "pointer",
    background: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
  },
};
