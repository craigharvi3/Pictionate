import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'

import * as http from '../modules/http';
import $ from 'jquery'

export default class SpaceModal extends React.Component {

	constructor( props ) {
		super(props)

		let author = localStorage.getItem( 'imij-author' );

		this.state = {
			title: "",
			author: author || "",
			type: [],
			show: props.show,
			categories: [],
			session: null
		}
	}

	componentWillReceiveProps( props ) {
		this.setState({
			show: props.show,
			session: props.session
		})
	}

	close( e ) {

		if( e ) {
			e.preventDefault();
		}

		$( "body" ).removeClass("noscroll");

		this.props.onClose()

		this.setState({
			show: false
		})
	}

	handleSpaceCreate( e ) {
		e.preventDefault();

		this.close()

		let data = Object.assign( {}, this.state );

		delete data.show;
		delete data.categories;
		delete data.type;

		if( localStorage && data.author ) {
			localStorage.setItem( 'imij-author', data.author );
		}

		http.post( '/space', data, function( err, response ) {
			if( response.S_ID ) {
				browserHistory.push( '/' + response.S_ID );
			}
		}.bind( this ), function() {
			alert("Error")
		}.bind( this ) )

	}

	getCategories() {
		this.categoriesData = http.get( '/categories', function( err, response ) {
			this.setState({
				categories: response
			})
		}.bind( this ), function() {
			alert("Error")
		}.bind( this ) )
	}

	chooseType( e ) {
		e.preventDefault();
		let data = this.state.type;

		let id = parseInt( e.target.getAttribute("value"), 10 );

		if ( data.indexOf( id ) > -1 ) {
			data.splice( data.indexOf( id ), 1 );
		} else {

			if( data.length >= 5 ) {
				return false;
			}

			data.push( id )
		}

		this.setState({
			type: data
		})
	}

	changeTitle( e ) {

		this.setState({
			title: e.target.value
		})
	}

	changeAuthor( e ) {
		this.setState({
			author: e.target.value
		})
	}

	componentDidMount() {
		if( this.state.session !== null ) {
			this.focusInput();
		}
		this.getCategories();
	}

	focusInput() {
		ReactDOM.findDOMNode(this.refs.spaceAuthor).focus(); 
	}

	modalKeyDown( e ) {
		if( e.keyCode == 27 ) {
			this.close()
		}
	}

	onClickModal(e) {
		if( !$(e.target).closest('.modal-inner').length ) {
			this.close(e)
		}
	}

	render() {

		let categoriesMarkup = [];

		this.state.categories.forEach( ( cat ) => {

			let className = cat.C_SHORT_TITLE;

			if( this.state.type.indexOf( cat.C_ID ) > -1 ) {
				className += " active";
			}

			categoriesMarkup.push( 
				<li key={cat.C_ID}>
					<a href="" className={className} value={cat.C_ID} onClick={this.chooseType.bind(this)}><span className={cat.C_ICON}></span> {cat.C_TITLE}</a>
				</li>
			)
		})

		let classNames = "modal";

		if( !this.state.show ) {
			classNames += " hide"
		}

		let markup = ""

		if( this.state.session == null ) {
			markup = (
				<div>
					<p>Login before you can create your own space</p>
					<a href="/auth/facebook"><span className="typcn typcn-social-facebook"></span> Login with Facebook</a>
				</div>
			)
		} else {
			markup = (
				<form ref="uploadForm" onSubmit={this.handleSpaceCreate.bind(this)}>

					<p>Before we can set up your imij space, we need you to give us your name (so we can give you all the credit) and the title of the your space.</p>
					
					<hr />

					<div className="grid grid-halfs group">

						<div className="grid-item">
							<input type="text" ref="spaceAuthor" placeholder="Space author..." onChange={this.changeAuthor.bind(this)} value={this.state.author}/>
						</div>

						<div className="grid-item">
							<input type="text" id="space-title" ref="spaceTitle" placeholder="Space title..." onChange={this.changeTitle.bind(this)} value={this.state.title} />
						</div>

					</div>

					<div className="done group">
						<button type="submit" className="btn right"><span className="typcn typcn-tick"></span> Create space</button>
					</div>

				</form>
			)
		}

		return (

			<div className={classNames} onKeyDown={this.modalKeyDown.bind(this)} onClick={this.onClickModal.bind(this)}>

				<a className="modal-close" onClick={this.close.bind(this)}>
					<span className="typcn typcn-times"></span>
				</a>
				
				<div className="modal-inner">
					
					<div className="modal-content">

						<div className="modal-spaced">

							{markup}

						</div>
					</div>

				</div>

			</div>

		)
	}

}

SpaceModal.propTypes = {
	show: React.PropTypes.bool.isRequired,
	onClose: React.PropTypes.func
}
