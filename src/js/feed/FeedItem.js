import React from "react";
import moment from 'moment';
import $ from 'jquery';

export default class FeedItem extends React.Component {

	constructor( props ) {
		super(props)

		this.state = {
			i_id: props.i_id,
			i_createddate: props.i_createddate,
			i_description: props.i_description,
			i_author: props.i_author,
			i_type: props.i_type.split( "," ),
			i_extension: props.i_extension,
			i_url: props.i_url
		}
	}

	hoverIn( e ) {
		$( e.target ).addClass( 'hover' )
	}

	hoverOut( e ) {
		$( e.target ).removeClass( 'hover' )
	}

	setFormState( props ) {
		this.setState( {
			i_id:props.i_id,
			i_createddate:props.i_createddate,
			i_description:props.i_description,
			i_author:props.i_author,
			i_type:props.i_type.split( "," ),
			i_extension: props.i_extension,
			i_url:props.i_url
		} )
	}

	componentWillReceiveProps( props ) {
		this.originalState = props
		this.setFormState( props )
	}

	render() {

		let spanClass = `feed-time feed-time-${ this.state.i_type.length}`;
		let bgMarkup = []

		for( var i=0; i<this.state.i_type.length; i++ ) {
			let classNames = "feed-bg " + this.state.i_type[i];
			bgMarkup.push(
				<span onMouseOver={this.hoverIn.bind(this)} onMouseOut={this.hoverOut.bind(this)} title={this.state.i_type[i]} key={this.state.i_type[i]} className={classNames}></span>
			)
		}

		let descMarkup = ""

		if( this.state.i_description.length && this.state.i_author.length ) {
			descMarkup = (
				<pre><strong>{this.state.i_author}</strong>{this.state.i_description}</pre>
			)
		} else if( this.state.i_description.length ) {
			descMarkup = (
				<pre>{this.state.i_description}</pre>
			)
		}

		return (

			<div className="feed-item">
				<span className={spanClass}>
					{bgMarkup}
					<span className="feed-time-text">{moment(this.state.i_createddate).fromNow( true )}</span>
				</span>

				<img src={this.state.i_url} alt={this.state.i_description} />

				<div className="feed-desc">
					{descMarkup}
				</div>

				<ul className="feed-actions">
					<li>
						<a className="facebook-link" href={`https://www.facebook.com/sharer/sharer.php?u=http://imij.space/i/${this.state.i_id}.${this.state.i_extension}`} target="_blank">
							<span className="typcn typcn-social-facebook"></span>
							<span className="share-title">Facebook</span>
						</a>
					</li>
					<li>
						<a className="twitter-link" href={`http://imij.space/i/${this.state.i_id}.${this.state.i_extension}`} target="_blank">
							<span className="typcn typcn-social-twitter"></span>
							<span className="share-title">Twitter</span>
						</a>
					</li>
				</ul>
			</div>

		);
	}
	
}

FeedItem.propTypes = {
	i_id: React.PropTypes.string.isRequired,
	i_createddate: React.PropTypes.string.isRequired,
	i_description: React.PropTypes.string.isRequired,
	i_author: React.PropTypes.string.isRequired,
	i_type: React.PropTypes.string.isRequired,
	i_url: React.PropTypes.string.isRequired,
	i_extension: React.PropTypes.string.isRequired
}