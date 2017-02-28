import React from 'react'
import NavLink from '../modules/NavLink';

export default class NotFound extends React.Component {
	constructor( props ) {
		super( props )
	}

	render() {
		return (
			<div className="container">
				<h3>Page Not Found</h3>

				<p>
					We looked for the page you are trying to access, and then we looked again... <br />
					But we are sorry, we can not find the page you are trying to access
				</p>
				<p>
					<NavLink to="/" onlyActiveOnIndex={true}>Return home</NavLink>
				</p>
			</div>
		)
	}
}
