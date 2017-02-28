import xhr from 'xhr'

import { settings } from '../constants';

let auth = {

	login: ( username, password, cb ) => {

		localStorage.atpToken = ''

		xhr( {
			uri: settings.apiUrl + '/auth/login',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify( { 'username': username, 'password': password } )
		}, function( err, response ) {
			if ( response.statusCode === 200 ) {
				localStorage.atpToken = JSON.parse( response.body ).Token
			}
			if ( cb ) {
				cb( localStorage.atpToken )
			}
		} )

	},

	loggedIn: () => {
		return localStorage.atpToken
	},

	token: () => {
		return auth.loggedIn()
	},

	headers: () => {
		return {
			'Content-Type': 'application/json'
			// 'Authorization': 'Bearer ' + auth.token()
		}
	}
}

export default auth;
