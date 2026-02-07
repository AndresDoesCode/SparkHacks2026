function Dashboard() {
  const token = localStorage.getItem("token");

  return (
    <div style={{ padding: "2rem" }}>
        <h1 style={{color: "red"}}>Dashboard</h1>

        <p>You are logged in 🎉</p>

        <p>
            <strong>Token present:</strong>{" "}
            {token ? "Yes" : "No"}
        </p>

        <button
        onClick={() => {
            
            localStorage.removeItem("token");
            window.location.href = "/log-in";
        }}
        >
        Logout
        </button>
    </div>
  );
}

export default Dashboard;
