import React from 'react';

import auth from '../modules/auth';
import Bindings from './Bindings';

import 'react-fastclick';

Bindings.bind();

export default class App extends React.Component {
	constructor( props ) {
		super( props );
		this.state = {
			loggedIn: auth.token()
		};
	}

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

App.propTypes = {
	children: React.PropTypes.object.isRequired
} 