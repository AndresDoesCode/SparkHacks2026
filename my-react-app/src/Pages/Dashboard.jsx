import '../Styles/Dashboard.css'
import socket from '../Components/Socket';
import { useState, useEffect } from 'react';

function Dashboard() {
  const [blog, setBlog] = useState();
  const [user, setUser] = useState();

useEffect(() => {
  socket.emit("get_info");

  socket.on("recieve_data", (data) => {
    setUser(data);
  });

  // Cleanup listener on unmount
  return () => socket.off("recieve_data");
}, []);


  function handleBlogChange({target}){
    setBlog(target.value)
  }
  function onClickHandler() {
    socket.emit("create-portfolio", user);
  }
  const token = localStorage.getItem("token");
  
  const user2 = {
    "name":"Sedrik",
    "description":"I love 67",
    "profession": "unemployed"
  }


  return (
    <div className='DasboardContainer'>
      <div className='DashboardLeft'>
        <p>Username</p>
        <p>{user?.name || "Loading..."}</p>
        <p>Password</p>
        <p>{user?.password || "Loading..."}</p>
        <p>Followers</p>
        <p>{user?.follow || "Loading..."}</p>
      </div>
      <div className='DashboardRight'>

        <h1>Type here to post a blog</h1>
        <input value={blog} onChange={handleBlogChange}/>
        <button onClick={onClickHandler}>
          <p>Post</p>
        </button>
      </div>
      
    </div>
  );
}

export default Dashboard;
