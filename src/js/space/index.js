import React from "react";

import Feed from '../feed';
import * as http from '../modules/http';

export default class Space extends React.Component {

	constructor( props ) {
		super(props)

		this.state = {
			s_id: this.props.params.spaceId,
			s_title: "",
			s_author: "",
			ownerid: "",
			session: {}
		}
	}

	getSpace() {

		this.getData = http.get( '/space?spaceId=' + this.state.s_id, ( err, response ) => {
			this.setState({
				s_title: response.S_TITLE,
				s_author: response.S_AUTHOR,
				ownerid: response.U_ID
			})
		}, () => {
			alert("Error")
		} )

	}

	componentDidMount() {
		this.getSpace();
		this.props.route.session.done( ( _data ) => {
			this.setState({
				session: _data
			})
		} );
	}

	render() {

		let data = {
			s_id: this.state.s_id,
			s_title: this.state.s_title,
			s_author: this.state.s_author,
			ownerid: this.state.ownerid
		}

		return (
			<div>
				<Feed route={this.props.route} space={data} />
			</div>
		);
	}
	
}

Space.propTypes = {
	params: React.PropTypes.object,
	route: React.PropTypes.object
}