import React from "react";
import moment from 'moment';

export default class SpaceItem extends React.Component {

	constructor( props ) {
		super(props)

		this.state = {
			data: props.data
		}
	}

	setFormState( props ) {
		this.setState( {
			data: props.data
		} )
	}

	componentWillReceiveProps( props ) {
		this.setFormState( props )
	}

	render() {

		let spanClass = `feed-time`;
		let descMarkup = ""
		let images = [];
		let imagecount = 1;

		if( this.state.data.s_title.length && this.state.data.s_author.length ) {
			descMarkup = (
				<pre><strong>{this.state.data.s_author}</strong>{this.state.data.s_title}</pre>
			)
		} else if( this.state.data.s_title.length ) {
			descMarkup = (
				<pre>{this.state.data.s_title}</pre>
			)
		}

		if( this.state.data.images.length === 1 ) {
			imagecount = 1;
		} else if( this.state.data.images.length === 2 ) {
			imagecount = 2;
		} else {
			imagecount = 3;
		}

		for( var i=0; i<this.state.data.images.length; i++ ) {

			if( i==3 ) {
				break
			}

			let image = this.state.data.images[i];
			let style = {
				backgroundImage: `url(${image.i_url})`
			}
			images.push(
				<li key={image.i_id} style={style}></li>
			)
		}

		return (

			<div className="feed-item">
				<span className={spanClass}>
					<span className="feed-time-text">{moment(this.state.data.s_createddate).fromNow( true )}</span>
				</span>

				<a className={`space-images space-images-${imagecount}`} href={`/${this.state.data.s_id}`}>
					<ul>
						{images}
					</ul>
				</a>

				<div className="feed-desc">
					{descMarkup}
				</div>

				<ul className="feed-actions">
					<li>
						<a className="facebook-link" href={`https://www.facebook.com/sharer/sharer.php?u=http://imij.space/${this.state.data.s_id}`}>
							<span className="typcn typcn-social-facebook"></span>
							<span className="share-title">Facebook</span>
						</a>
					</li>
					<li>
						<a className="twitter-link" href={`https://twitter.com/share?url=http://imij.space/${this.state.data.s_id}`}>
							<span className="typcn typcn-social-twitter"></span>
							<span className="share-title">Twitter</span>
						</a>
					</li>
				</ul>
			</div>

		);
	}
	
}

SpaceItem.propTypes = {
	data: React.PropTypes.object.isRequired
}