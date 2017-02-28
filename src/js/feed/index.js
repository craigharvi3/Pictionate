import React from "react";

import * as http from '../modules/http';

import UploadLoader from '../app/UploadLoader';
import FeedItem from './FeedItem';
import Sidebar from '../app/Sidebar';
import Header from '../app/Header';

export default class Feed extends React.Component {

	constructor( props ) {
		super(props)

		this.state = {
			data: null,
			space: props.space || null,
			showLoader: false,
			session: null,
			sidebarClass: ""
		}
	}

	addToFeed( item ) {
		let data = this.state.data;
		data.unshift( item );
		this.setState( { data: data } );
	}

	getImages( categories="" ) {

		this.setState({
			showLoader: true
		})

		let sId = ""

		if( this.state.space !== null ) {
			sId = this.state.space.s_id;
		}

		setTimeout( () => {

			this.getData = http.get( '/images?categories=' + categories + '&spaceId=' + sId, ( err, response ) => {
				this.setState({
					data: response,
					showLoader: false
				})
			}, () => {
				alert("Error")
			} )
			
		}, 200 )

	}

	componentDidMount() {
		this.getImages();

		this.props.route.session.done( ( _data ) => {
			if( _data.error ) {
				// no session
			} else {
				this.setState({
					session: _data
				})
			}
		})

	}

	componentWillUnmount() {
		this.getData.abort()
	}

	componentWillReceiveProps( props ) {
		this.setState({
			space: props.space || null
		})
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

		let images = [];

		if( this.state.data === null ) {
			images = "";
		} else if( this.state.data.length ) {
			this.state.data.forEach( ( image ) => {
				images.push( 
					<FeedItem
						key={image.I_ID}
						i_id={image.I_ID}
						i_createddate={image.I_CREATEDDATE}
						i_description={image.I_DESCRIPTION}
						i_author={image.I_AUTHOR}
						i_type={image.I_TYPE}
						i_url={image.I_URL}
						i_extension={image.I_EXTENSION}
					/> 
				)
			} );
		} else {
			images = (
				<p className="noresults">No images found.</p>
			)
		}

		return (

			<div>
				<Header addToFeed={this.addToFeed.bind(this)} space={this.state.space} session={this.state.session} showMenu={this.showMenu.bind(this)} />
				<UploadLoader show={this.state.showLoader} />
				<div className="container wrap group">
					<Sidebar filterImages={this.getImages.bind(this)} space={this.state.space} sidebarClass={this.state.sidebarClass} />
					<div className="feed">
						{images}
					</div>
				</div>
			</div>

		);
	}
	
}

Feed.propTypes = {
	space: React.PropTypes.object,
	route: React.PropTypes.object
}