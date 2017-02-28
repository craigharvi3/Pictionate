import React from 'react'
import * as http from '../modules/http';

export default class Sidebar extends React.Component {

	constructor( props ) {
		super(props)

		this.state = {
			categories: [],
			selectedCategories: [],
			space: props.space || null,
			sidebarClass: props.sidebarClass || ""
		}
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

	componentDidMount() {
		this.getCategories()
	}

	componentWillReceiveProps( props ) {
		this.setState({
			space: props.space || null,
			sidebarClass: props.sidebarClass || ""
		})
	}

	componentWillUnmount() {
		this.categoriesData.abort();
	}

	chooseType( e ) {
		e.preventDefault();

		let data = this.state.selectedCategories;
		let id = parseInt( e.target.getAttribute("value"), 10 );

		if ( !isNaN( id ) && data.indexOf( id ) > -1 ) {
			data.splice( data.indexOf( id ), 1 );
		} else {
			data.push( id )
		}

		this.setState({
			selectedCategories: data
		})

		let categories = data.join( ',' );

		if( isNaN( categories ) ) {
			categories = ""
		}

		this.props.filterImages( categories );
	}

	render() {

		let categoriesMarkup = [];

		this.state.categories.forEach( ( cat ) => {

			let className = cat.C_SHORT_TITLE;

			if( this.state.selectedCategories.indexOf( cat.C_ID ) > -1 ) {
				className += " active";
			}

			categoriesMarkup.push( 
				<li key={cat.C_ID}>
					<a href="" className={className} value={cat.C_ID} onClick={this.chooseType.bind(this)}><span className={cat.C_ICON}></span> {cat.C_TITLE}</a>
				</li>
			)
		})

		let spaceMarkup = "";

		if( this.state.space !== null ) {
			spaceMarkup = (
				<div className="space-title">
					<h2>{this.state.space.s_title}</h2>
					<p>by {this.state.space.s_author}</p>
					<hr />
				</div>
			)
		}

		let classNames = "sidebar fixed ";

		if( this.state.sidebarClass.length ) {
			classNames += this.state.sidebarClass;
		}

		return (
			<aside className={classNames}>

				{spaceMarkup}

				<h3>Imij Categories</h3>

				<ul className="colour-filters group">
					{categoriesMarkup}
				</ul>

				{/* 

				<hr />

				<form>

					<div className="slat-control">
						<span className="typcn typcn-calendar"></span>
						<input type="text" placeholder="From..." />
					</div>

					<div className="slat-control">
						<span className="typcn typcn-calendar"></span>
						<input type="text" placeholder="To..." />
					</div>

					<button className="btn" type="submit">
						<span className="typcn typcn-filter"></span> Apply filter
					</button>

				</form>

				*/} 

			</aside>
		)
	}

} 

Sidebar.propTypes = {
	filterImages: React.PropTypes.func.isRequired,
	sidebarClass: React.PropTypes.string,
	space: React.PropTypes.object
}
