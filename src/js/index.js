import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './app/App'
import Feed from './feed'
import Space from './space'
import Profile from './profile'
import Image from './image'

import NotFound from './app/Error'

import $ from 'jquery'

let session = $.ajax( { url: '/api/session', method: "GET", dataType: "JSON" } );

render( (
	<Router history={browserHistory}>

		<Route path="/" component={App}>

			<IndexRoute component={Feed} session={ session } />
			<Route path=":spaceId" component={Space} session={ session } />
			<Route path="profile/:profileId" component={Profile} session={ session } />
			<Route path="i/:imageId" component={Image} />

		</Route>

		<Route path='*' component={NotFound} />
		
	</Router>
), document.getElementById( 'app' ) )
