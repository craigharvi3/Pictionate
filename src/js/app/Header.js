import React from 'react'
import ReactDOM from 'react-dom'

import UploadLoader from './UploadLoader';
import UploadModal from './UploadModal';
import SpaceModal from './SpaceModal';
import $ from 'jquery';

export default class Header extends React.Component {

	constructor( props ) {
		super(props)

		this.state = {
			showLoader: false,
			showSpace: false,
			image: null,
			mimetype: '',
			extension: '',
			showNavMenu: false,
			space: props.space || null,
			session: props.session || null,
			parent: props.parent || null
		}
	}

	upload( e ) {
		e.preventDefault();
		$('#upload-file').val(null);
		$( "#upload-file" ).trigger( "click" );
	}

	newSpace( e ) {
		e.preventDefault();
		this.setState({
			showSpace: true
		})
	}

	componentWillReceiveProps( props ) {
		this.setState({
			space: props.space || null,
			session: props.session || null,
			parent: props.parent || null
		})
	}

	onClose() {
		this.setState({
			image: null,
			showSpace: false
		})
	}

	process() {
		

	}
		
	fileAdded() {

		var file = ReactDOM.findDOMNode(this.refs.file).files[0];
		var reader = new FileReader();
		var fileNameArr = file.name.split( '.' );
		var extension = fileNameArr[ fileNameArr.length-1 ];

		reader.onload = function(output) {

			// var dv = new DataView(output.currentTarget.result);
			// var offset = 0, recess = 0;
			// var pieces = [];
			// var i = 0;
			// if (dv.getUint16(offset) == 0xffd8){
			// 	offset += 2;
			// 	var app1 = dv.getUint16(offset);
			// 	offset += 2;
			// 	while (offset < dv.byteLength){
			// 		if (app1 == 0xffe1){
			// 			pieces[i] = {recess:recess,offset:offset-2};
			// 			recess = offset + dv.getUint16(offset);
			// 			i++;
			// 		}
			// 		else if (app1 == 0xffda){
			// 			break;
			// 		}
			// 		offset += dv.getUint16(offset);
			// 		var app1 = dv.getUint16(offset);
			// 		offset += 2;
			// 	}
			// 	if (pieces.length > 0){
			// 		var newPieces = [];
			// 		pieces.forEach(function(v){
			// 			newPieces.push(output.currentTarget.result.slice(v.recess, v.offset));
			// 		}, this);
			// 		newPieces.push(output.currentTarget.result.slice(recess));
			// 		var br = new Blob(newPieces, {type: 'image/jpeg'});
			// 	}
			// }

			$( "body" ).addClass("noscroll");

			this.setState({
				image: output.currentTarget.result,
				mimetype: file.type,
				extension: extension
			})

		}.bind(this);
		
		reader.readAsDataURL(file);
	}

	toggleUploadLoader( _bool ) {
		this.setState({
			showLoader: _bool
		})
	}

	showNavMenu(e) {
		e.preventDefault();

		this.setState({
			showNavMenu: !this.state.showNavMenu
		})
	}

	render() {

		let modalMarkup = "";

		if( this.state.image !== null ) {
			modalMarkup = ( <UploadModal space={this.state.space} session={this.state.session} uploadLoader={this.toggleUploadLoader.bind(this)} addToFeed={this.props.addToFeed} onClose={this.onClose.bind(this)} mimetype={this.state.mimetype} extension={this.state.extension} image={this.state.image} show={(  this.state.image !== null  )} /> )
		}

		let createSpace = "";

		if( this.state.space === null ) {
			createSpace = (
				<a href="" className="info plus" title="Create an imij space" onClick={this.newSpace.bind(this)}>
					<span className="typcn typcn-plus"></span>
				</a>
			)
		}

		let uploadImage = "";
		let loginBtn = "";
		let navMenu = "";

		if( this.state.showNavMenu && this.state.session !== null ) {
			navMenu = (
				<ul className="navMenu">
					<li><a href={`/profile/${this.state.session.U_ID}`}><span className="typcn typcn-user"></span> profile</a></li>
					<li><a href="/logout"><span className="typcn typcn-eject"></span> logout</a></li>
				</ul>
			)
		}

		let onSpacePage = ( this.state.space !== null );
		let hasSession = ( this.state.session !== null );

		if( this.state.parent !== "profile" ) {

			// if( this.state.session !== null && this.state.space !== null && this.state.session.U_ID == this.state.space.ownerid ) {
			if( !onSpacePage || ( onSpacePage && hasSession && this.state.session.U_ID == this.state.space.ownerid ) ) {
				uploadImage = (
					<a href="" className="upload" title="Upload to imij space" onClick={this.upload.bind(this)}>
						<span className="typcn typcn-upload"></span>
					</a>
				)
			}

		}

		if( hasSession ) {
			loginBtn = (
				<a className="upload navbtn" title={`Welcome back ${this.state.session.U_FIRSTNAME}`} onClick={this.showNavMenu.bind(this)}>
					<span className="typcn typcn-arrow-sorted-down"></span>
				</a>
			)
		} else {
			loginBtn = (
				<a href="/auth/facebook" className="upload facebook navbtn" title="Login with facebook">
					<span className="typcn typcn-social-facebook"></span>
				</a>
			)
		}

		return (
			<header className="header">

				<UploadLoader show={this.state.showLoader} />

				{modalMarkup}

				<SpaceModal show={this.state.showSpace} session={this.state.session} onClose={this.onClose.bind(this)} />

				<div className={`header-wrap wrap group ${this.state.parent}`}>

					{navMenu}

					<a href="" className="info menu" onClick={this.props.showMenu.bind(this)}>
						<span className="typcn typcn-th-menu"></span>
					</a>

					<div className="search">
						<span className="magnify typcn typcn-zoom"></span>
						<input type="text" placeholder="Search..." />
					</div>

					<input id="upload-file" type="file" ref="file" accept="image/gif,image/jpg,image/png" onChange={this.fileAdded.bind(this)} />

					{createSpace}

					<a id="aside-home" className="logo" href="/">
						<img src="/a/img/imij-logo.png" alt="Logo" />
					</a>

					{loginBtn}

					{uploadImage}
					
				</div>

			</header>
		)
	}

} 

Header.propTypes = {
	addToFeed: React.PropTypes.func,
	showMenu: React.PropTypes.func,
	session: React.PropTypes.object,
	parent: React.PropTypes.string,
	space: React.PropTypes.object
} 
