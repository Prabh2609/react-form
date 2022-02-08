import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png'

const Nav = styled.header`
    width:100%;
    height:10vh;
    box-sizing:border-box;
    position:fixed;
    top:0px;
    padding-left:25%;
    text-align:left;
    z-index:1000;
    background-color:white;
    @media (max-width:768px){
        padding-left:0%;
    }
`
const Logo = styled.img`
    height:100%;
    width:auto;
    margin-left:24px;
`
export default function Header() {
  return (
      <Nav>
          <Logo src={logo}/>
      </Nav>
  );
}
