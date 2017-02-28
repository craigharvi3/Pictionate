import React from "react";

import * as http from '../modules/http';

import Header from '../app/Header';
import SpaceItem from './SpaceItem';

export default class Profile extends React.Component {

	constructor( props ) {
		super(props)

		this.state = {
			profileId: this.props.params.profileId,
			data: {},
			session: null,
			sidebarClass: ""
		}
	}

	getProfile() {

		this.getData = http.get( '/space/images/?userId=' + this.state.profileId, ( err, response ) => {
			this.setState({
				data: response
			})
		}, () => {
			alert("Error")
		} )

	}

	componentDidMount() {
		this.getProfile();
		this.props.route.session.done( ( _data ) => {
			this.setState({
				session: _data
			})
		} );
	}

	showMenu(e) {
		e.preventDefault();

		if( !this.state.sidebarClass.length ) {
			this.setState({
				sidebarClass: "in"
			})
		} else {
			this.setState({
				sidebarClass: ""
			})
		}
	}

	render() {

		var spaces = [];

		for( var space in this.state.data ) {
			spaces.push( <SpaceItem key={space} data={this.state.data[space]} />  )
		}

		return (
			<div className="profile">
				<Header parent="profile" addToFeed={() => {}} space={null} session={this.state.session} showMenu={this.showMenu.bind(this)} />
				<div className="container wrap group nopad">
					<div className="feed space group">
						{spaces}
					</div>
				</div>
			</div>
		);
	}
	
}

Profile.propTypes = {
	params: React.PropTypes.object,
	route: React.PropTypes.object
}