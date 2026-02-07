import '../Styles/Dashboard.css'

function Dashboard() {
  const token = localStorage.getItem("token");

  const user = {
    "name":"Osama",
    "id": "67",
    "Bio":"I love 67",
    "profession": "unemployed"
  }

  return (
    <div className='DasboardContainer'>
      <div className='DasboardLeft'>
        <p>Test</p>
      </div>
    </div>
  );
}

export default Dashboard;
