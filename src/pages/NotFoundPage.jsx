import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.code}>404</h1>
        <h2 style={styles.title}>Страница не найдена</h2>
        <p style={styles.text}>Похоже, вы перешли по несуществующему адресу.</p>

        <button style={styles.button} onClick={() => navigate("/")}>
          Вернуться на главную
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    textAlign: "center",
    background: "rgba(255,255,255,0.1)",
    padding: "40px",
    borderRadius: "16px",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
  },
  code: {
    fontSize: "96px",
    margin: "0",
    animation: "pulse 2s infinite",
  },
  title: {
    margin: "10px 0",
    fontSize: "28px",
  },
  text: {
    marginBottom: "20px",
    opacity: 0.9,
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    background: "#fff",
    color: "#764ba2",
    fontWeight: "bold",
    transition: "0.3s",
  },
};

export default NotFoundPage;
