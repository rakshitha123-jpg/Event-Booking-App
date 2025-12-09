import { useNavigate } from 'react-router-dom'
import '../style/header/Header.css'

const Header = () => {
  const navigate=useNavigate()
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">Event Master</h1>
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/events">Events</a>
          <a href="#about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <button className="login">USER Login | Register</button>
        <button className="login"  onClick={() => navigate('/client')}>Client Login</button>
      </div>
    </header>
  )
}

export default Header
