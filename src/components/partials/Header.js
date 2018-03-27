import React, { Component } from 'react';
import logo from "./logo.svg";
import './Header.css';

class Header extends Component {

	render() {
		return (
      <header className="header">
        <h1 className="title">GIMET CMS</h1>
        <img src={logo} alt={'logo'}/>
      </header>
		);
	}
}

export default Header;
