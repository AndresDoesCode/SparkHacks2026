import './Layout.css'

function Layout() {
  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">SparkHacks</div>
        <div className="navbar-right">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/login">Login</a>
        </div>
      </nav>

      <main className="page-content">
        <p>Test</p>
      </main>
    </>
  )
}

export default Layout
