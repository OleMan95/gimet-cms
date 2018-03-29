import React, { Component } from 'react';
import logo from "../../data/logo.svg";
import './Header.scss';

class Header extends Component {

	render() {
		return (
			<footer className="footer">
				<p>Authors:</p>
				<a href="/">Oleksii Manachynskyi</a>
				<a href="/">Roman Suprun</a>
			</footer>
		);
	}
}

export default Header;
