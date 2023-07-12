import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


  

function OffcanvasExample() {
  let location = useLocation()
  let navigate = useNavigate();
  // React.useEffect(() => {
  //   // console.log(location.pathname);
   
  // }, [location]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
    
  }
  return (
    <>
      {[ 'sm'].map((expand) => (
        <Navbar key={expand} bg="dark" variant="dark" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="/">i-Notebook</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/Home"  active={location.pathname === "/Home"}>Home</Nav.Link>
                  <Nav.Link href="/About"active={location.pathname === "/About"} >About</Nav.Link>
                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">More</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Privacy Policy
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Contaact Us
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                {!localStorage.getItem("token")?<Form className="d-flex">
                  <Button href='/login' className='mx-2' variant="primary">Login</Button>
                  <Button href='/signup' className='mx-2' variant="primary">Signup</Button>
                </Form>:<Button href='/logout' className='mx-2' variant="primary" onClick={handleLogout}>Logout</Button>}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default OffcanvasExample;