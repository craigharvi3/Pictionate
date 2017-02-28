import React from "react";

import DocumentMeta from 'react-document-meta';

export default class Image extends React.Component {

	constructor( props ) {
		super(props)

		this.state = {
			i_key: props.params.imageId
		}
	}

	render() {

		const meta = {
			title: 'Imij Space - The online image store build with ease in mind.',
			description: 'The online image store build with ease in mind.',
			canonical: `http://imij.space`,
			meta: {
				property: {
					'og:title': 'Imij Space - Just images.',
					'og:type': 'article',
					'og:image': `http://cdn.imij.space/${this.state.i_key}`,
					'og:site_name': 'Imij Space - Just images.'
				}
			}
		};

		return (

			<div>
				<DocumentMeta {...meta} />
				<header className="header">
					<a id="aside-home" className="logo" href="/">
						<img src="/a/img/imij-logo.png" alt="Logo" />
					</a>
				</header>

				<div className="image">
					<img src={`http://cdn.imij.space/${this.state.i_key}`} />
				</div>
			</div>

		);
	}
	
}

Image.propTypes = {
	params: React.PropTypes.object.isRequired
}