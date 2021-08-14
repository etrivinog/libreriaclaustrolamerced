import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="">
            <img className="nvimage" src="/rudecolombia.jpg" alt="Rudecolombialogo" /> 
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
            <a className="navText">DOCTORADO EN CIENCIAS DE LA EDUCACIÓN
            RUDECOLOMBIA – UNIVERSIDAD DE CARTAGENA</a>
            </NavItem>
          </Nav>
          <NavbarText>
            <img className="udcLogo" src="/Unicartagena.jpg" alt="udcLogo" /> 
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;