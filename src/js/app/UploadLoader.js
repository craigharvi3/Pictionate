import React from 'react'

export default class UploadLoader extends React.Component {

	constructor( props ) {
		super(props)

		this.state = props;

		this.colours = [
			"#5bc0eb",
			"#9bc53d",
			"#fde74c",
			"#e55934"
		];

		// 
	}

	componentWillReceiveProps( props ) {
		this.setState({
			show: props.show
		})
	}

	getRandomColour() {
		return this.colours[ Math.floor( Math.random() * this.colours.length ) ];
	}

	render() {

		let classNames = "modal loader";

		if( !this.state.show ) {
			classNames += " hide"
		}

		let randomColour = this.getRandomColour();

		return (

			<div className={classNames}>
				<svg width="150" height="150" viewBox="0 0 187.3 93.7" preserveAspectRatio="xMidYMid meet" >
					<path stroke={randomColour} id="outline" fill="none" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z" />
					<path id="outline-bg" opacity="0.1" fill="none" stroke="#000" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z" />
				</svg>
			</div>
		)
	}

} 
