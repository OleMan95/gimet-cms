import React, { Component } from 'react';
import './App.css';
import Header from './partials/Header';

class App extends Component {

	render() {
		return (
			<div className="App">
        <Header />
        <div className="">
        </div>
        <footer className="App-footer">
          <p>Authors:</p>
          <a href="/">Oleksii Manachynskyi</a>
          <a href="/">Roman Suprun</a>
        </footer>
			</div>
		);
	}
}

export default App;
