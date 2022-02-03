import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png'

const Nav = styled.header`
    width:100%;
    height:15vh;
    box-sizing:border-box;
    position:fixed;
    top:0px;
    padding-left:15%;
    text-align:left;
    z-index:1000;
    background-color:white;
`
const Logo = styled.img`
    height:80%;
    width:auto;
`
export default function Header() {
  return (
      <Nav>
          <Logo src={logo}/>
      </Nav>
  );
}
