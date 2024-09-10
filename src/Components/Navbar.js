import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { useTheme } from '../context/ThemeProvider';

function ColorSchemesExample() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const token = localStorage.getItem("token");

  const textClass = theme === 'light' ? 'text-white' : 'text-dark';
  console.log("textClass", textClass)

  return (
    <>
      <Navbar bg={theme === 'light' ? 'dark' : 'white'} data-bs-theme={theme === 'light' ? 'dark' : 'white'}>
        <Container>
          {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
          <Nav className="me-auto">
            <Nav.Link><Link to="/" className={`text-decoration-none ${textClass}`}>Home</Link></Nav.Link>
            {/* <NavLink to={'/dashbord'}>Home</NavLink> */}
            <Nav.Link><NavLink to="/cryptolist" className={`text-decoration-none ${textClass}`}>CryptoList</NavLink></Nav.Link>
            <Nav.Link><NavLink to="/aboutus" className={`text-decoration-none ${textClass}`}>AboutUs</NavLink></Nav.Link>
            <Nav.Link><NavLink to="/testy" className={`text-decoration-none ${textClass}`}>Testy</NavLink></Nav.Link>
            <Nav.Link><NavLink to="contactUs" className={`text-decoration-none ${textClass}`}>ContactUs</NavLink></Nav.Link>
            {/* {token ?
              <Nav.Link><NavLink to="/logout" className={`text-decoration-none ${textClass}`}>Logout</NavLink></Nav.Link> :
              <Nav.Link><NavLink to="/login" className={`text-decoration-none ${textClass}`}>Login</NavLink></Nav.Link>
            } */}
          </Nav>
          <Nav.Link className={textClass}>{user}</Nav.Link>&nbsp;&nbsp;&nbsp;
          <div className='rounded-4'
            onClick={toggleTheme}
            style={{
              border: '1px solid gray',
              position: 'relative',
              width: '40px',
              height: '20px',
              background: theme === 'light' ? 'white' : 'black',
              cursor: 'pointer'
            }}
          >
            <div className='rounded-5'
            style={{
              position: 'absolute',
              top: '1px',
              left: theme === 'light' ? '1px' : '21px',
              width: '16px',
              height: '16px',
              background: theme === 'light' ? 'black' : 'white'
            }}></div>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
