import React from 'react';
import { useContext } from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import './NavBar.css'
import logo from '../../../images/syringe.png'

const NavBar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const handleLogOut=() =>{
        sessionStorage.clear()
    }
    return (
        <Navbar expand="lg" className='container'>
            <span className='font-weight-bolder'><Link to='/'><h1><img style={{height:'25px'}} src={logo} alt="" /> Vaccine For All</h1></Link></span>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto ps-5 pe-5">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li><Link to='/admin'>Admin</Link></li>
                    <li><Link to='/liveChat'>Live Support</Link></li>
                    <li className='text-primary'>{loggedInUser.displayName||loggedInUser.name}</li>
                </Nav>
                {
                    loggedInUser.email ?
                        < a href="/"><button onClick={handleLogOut} className='btn btn-secondary'>Logout</button></a>
                        :
                        <Link to='/login'><Button variant="outline-success">Login</Button></Link>
                }
            </Navbar.Collapse>
        </Navbar >
    );
};

export default NavBar;