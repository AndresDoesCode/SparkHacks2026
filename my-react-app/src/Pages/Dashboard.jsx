import '../Styles/Dashboard.css'
import socket from '../Components/Socket';
import { useState, useEffect } from 'react';

function Dashboard() {
  const [blog, setBlog] = useState();
  const [user, setUser] = useState();
  const [blogs, setBlogs] = useState([]);

useEffect(() => {
  const token = localStorage.getItem("token");
  socket.emit("get_info", { token });
  socket.emit("get_user_blogs", { token });

  socket.on("recieve_data", (data) => {
    setUser(data);
  });

  socket.on("receive_blogs", (blogList) => {
    setBlogs(blogList);
  });

  // Cleanup listener on unmount
  return () => {
    socket.off("recieve_data");
    socket.off("receive_blogs");
  };
}, []);


  function handleBlogChange({target}){
    setBlog(target.value)
  }
  function onClickHandler() {
    const token = localStorage.getItem("token");
    if (!blog || blog.trim() === "") {
      alert("Please write something before posting!");
      return;
    }
    socket.emit("post_blog", { token, content: blog });

    socket.once("blog_post_success", (newBlog) => {
      alert("Blog posted successfully!");
      setBlog(""); // Clear the input after successful post
      // Add the new blog to the top of the list
      setBlogs([{ ...newBlog, username: user?.username }, ...blogs]);
    });

    socket.once("blog_post_failed", (error) => {
      alert("Failed to post blog: " + error);
    });
  }
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
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
        <p>{user?.username ?? "Loading..."}</p>
        <p>Artist Type</p>
        <p>{user?.ArtistType ?? "Loading..."}</p>
        <p>Followers</p>
        <p>{user?.Followers ?? "Loading..."}</p>
        <button
          onClick={handleLogout}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
            transition: 'background-color 0.3s'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#cc0000'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ff4444'}
        >
          Logout
        </button>
      </div>
      <div className='DashboardRight'>

        <h1>Type here to post a blog</h1>
        <input value={blog} onChange={handleBlogChange}/>
        <button onClick={onClickHandler}>
          <p>Post</p>
        </button>

        <div style={{ marginTop: '40px' }}>
          <h2>Your Blog Posts</h2>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginTop: '20px'
          }}>
            {blogs.length === 0 ? (
              <p style={{ color: '#666' }}>No blog posts yet. Post your first blog above!</p>
            ) : (
              blogs.map((blogPost) => (
                <div
                  key={blogPost.id}
                  style={{
                    padding: '15px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    border: '1px solid #ddd'
                  }}
                >
                  <p style={{ margin: '0 0 10px 0', whiteSpace: 'pre-wrap' }}>
                    {blogPost.content}
                  </p>
                  <small style={{ color: '#666' }}>
                    Posted on {new Date(blogPost.created_at).toLocaleString()}
                  </small>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
