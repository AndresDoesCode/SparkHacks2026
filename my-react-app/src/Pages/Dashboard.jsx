import '../Styles/Dashboard.css'

function Dashboard() {
  const token = localStorage.getItem("token");

  return (
    <div style={{ padding: "2rem" }}>
        

        {/* <button
        onClick={() => {
            
            localStorage.removeItem("token");
            window.location.href = "/log-in";
        }}
        >
        Logout
        </button> */}
    </div>
  );
}

export default Dashboard;
