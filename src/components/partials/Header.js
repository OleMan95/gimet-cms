import React, { Component } from 'react';
import logo from "../../data/logo.svg";
import './Header.scss';

class Header extends Component {

	render() {
		return (
      <header className="header">
	      <img src={logo} alt={'logo'}/>
	      <h1 className="title">GIMET CMS</h1>
      </header>
		);
	}
}

export default Header;
