import React, { Component } from 'react';
import PropTypes from 'prop-types';
import logo from "../../data/logo.svg";
import './Header.scss';

class Header extends Component {
	constructor(props){
		super(props);
		this.state = {
		};
	}

	render() {
		return (
      <header className="header">
	      <img src={logo} alt={'logo'}/>
	      <h1 className="title">GIMET CMS</h1>
	      <a href={'/'+this.props.page} className="page">go to {this.props.page}</a>
      </header>
		);
	}
}

Header.propTypes = {
	page: PropTypes.string
};

export default Header;
