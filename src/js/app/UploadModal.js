import React from 'react'
import ReactDOM from 'react-dom'
import * as http from '../modules/http';
import $ from 'jquery'

export default class UploadModal extends React.Component {

	constructor( props ) {
		super(props)

		let author = localStorage.getItem( 'imij-author' );

		this.state = {
			image: props.image,
			desc: "",
			author: author || "",
			characters: 1000,
			type: [],
			show: props.show,
			mimetype: props.mimetype,
			extension: props.extension,
			categories: [],
			space: props.space || null,
			session: props.session || null
		}
	}

	close( e ) {

		if( e ) {
			e.preventDefault();
		}

		this.props.onClose();

		$( "body" ).removeClass("noscroll");

		this.setState({
			show: false
		})
	}

	componentWillReceiveProps( props ) {
		this.setState({
			session: props.session || null,
			space: props.space || null
		})
	}

	handleUpload( e ) {
		e.preventDefault();

		if( !this.state.type.length ) {
			alert("Please select at least one category");
			return false;
		}

		this.props.uploadLoader( true );
		this.close()

		let data = Object.assign( {}, this.state );

		delete data.show;
		delete data.categories;
		delete data.characters;

		if( this.state.space !== null ) {
			data.s_id = this.state.space.s_id;
		}

		delete data.session;
		delete data.space;

		if( localStorage && data.author ) {
			localStorage.setItem( 'imij-author', data.author );
		}

		http.post( '/images', data, function( err, response ) {
			this.props.uploadLoader( false );
			this.props.addToFeed( response );
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

	changeDesc( e ) {

		let chars = 1000 - e.target.value.length;

		if( chars === 0 ) {

			this.setState({
				characters: chars
			})

			return false;
		}

		this.setState({
			desc: e.target.value,
			characters: chars
		})
	}

	changeAuthor( e ) {
		this.setState({
			author: e.target.value
		})
	}

	componentDidMount() {
		this.focusInput();
		this.getCategories();
	}

	focusInput() {
		if( this.state.author.length ) {
			ReactDOM.findDOMNode(this.refs.imageDesc).focus(); 
		} else {
			ReactDOM.findDOMNode(this.refs.imageAuthor).focus(); 
		}
	}

	modalKeyDown( e ) {
		if( e.keyCode == 27 ) {
			this.close( e )
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

		return (

			<div className={classNames} onClick={this.onClickModal.bind(this)}>

				<a className="modal-close" onClick={this.close.bind(this)}>
					<span className="typcn typcn-times"></span>
				</a>
				
				<div className="modal-inner">
					
					<div className="modal-content">
						
						<img src={this.props.image} alt="Image" />

						<div className="modal-spaced">
							
							<form ref="uploadForm" onSubmit={this.handleUpload.bind(this)}>

								<input type="hidden" ref="uploadImage" value={this.props.image} />
								<input type="hidden" ref="uploadType" value={this.state.type} />
								<input type="hidden" ref="uploadDesc" value={this.state.desc} />
								
								<div className="grid grid-halfs group">

									<div className="grid-item">
										<input type="text" ref="imageAuthor" placeholder="Photo author..." onChange={this.changeAuthor.bind(this)} value={this.state.author}/>
										<textarea id="image-desc" ref="imageDesc" placeholder="Photo description..." onChange={this.changeDesc.bind(this)} value={this.state.desc}></textarea>
										<small className="altmarg">{this.state.characters} characters left</small>
									</div>

									<div className="grid-item">
									<small>Choose a maximum of 5 categories</small>
										<ul className="colour-filters group">
											{categoriesMarkup}
										</ul>
									</div>

								</div>

								<div className="done group">
									<button type="submit" className="btn right"><span className="typcn typcn-tick"></span> Post</button>
								</div>

							</form>

						</div>
					</div>

				</div>

			</div>
		)
	}

}

UploadModal.propTypes = {
	image: React.PropTypes.string.isRequired,
	show: React.PropTypes.bool.isRequired,
	mimetype: React.PropTypes.string.isRequired,
	extension: React.PropTypes.string.isRequired,
	onClose: React.PropTypes.func.isRequired,
	addToFeed: React.PropTypes.func,
	uploadLoader: React.PropTypes.func,
	space: React.PropTypes.object,
	session: React.PropTypes.object
}
