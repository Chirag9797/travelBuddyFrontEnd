import React, { useContext } from 'react';
import { Navbar, NavbarBrand, NavItem, NavbarText, NavLink, Nav, Button } from 'reactstrap';
import {Link, useNavigate} from 'react-router-dom'
import TravelContext from '../context/TravelContext';


const NavbarR = () => {

const travelContext = useContext(TravelContext);

const {logout} = travelContext;
const navigate = useNavigate();

const logoutUSer = ()=>{
  logout();
  navigate("/login", {replace:true})
}
  return (
    <div>
      <Navbar
        expand="md"
        style={{backgroundColor:'#c44569', color:'white'}}
        >

        <NavbarBrand href="/" style={{color:'black'}}>
          Travel Buddy Finder
        </NavbarBrand>

        <Nav
          className="me-auto"
          
          navbar
        >
          <NavItem>
            <NavLink >
              <Link to="/" style={{textDecoration:'none', color:'white'}}>HOME </Link>
              
            </NavLink>
          </NavItem>
          <NavItem> 
            <NavLink>
            <Link to="/map" style={{textDecoration:'none', color:'white'}}>MAP </Link>
            </NavLink>
          </NavItem>
          <NavItem> 
            <NavLink>
            <Link to="/trips" style={{textDecoration:'none', color:'white'}}>TRIPS </Link>
            </NavLink>
          </NavItem>
        </Nav>
        <NavLink>
          <Button onClick={logoutUSer} color="primary">Logout</Button>
        {/* <Link to="/logout" style={{textDecoration:'none', color:'white'}}>LOGOUT </Link> */}
        </NavLink>



      </Navbar>
    </div>
  )
}

export default NavbarR;