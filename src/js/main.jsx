import React from 'react';
import ReactDOM from 'react-dom';

import '../css/main';

// var React = require('react');
// var ReactDOM = require('react-dom');
// require('../css/all.css');





setInterval( function() {
	const ele = (
			<div>
				<h1>Hello, world</h1>
				<h2>It is {new Date().toLocaleString()}.</h2>
			</div>
		);
	ReactDOM.render(
			ele,
			document.getElementById('root')
		);
}, 1000)



