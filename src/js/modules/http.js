import { settings } from '../constants';
import xhr from 'xhr'

const ok = 200
const created = 201
const nocontent = 204
const badRequest = 400
const unauthorized = 401
const notFound = 404

const statusCodes = {
	success: [ ok, created, nocontent ],
	error: [ badRequest, unauthorized, notFound ]
}


function get( url, success, error ) {

	let call = xhr( {
		uri: settings.apiUrl + url,
		headers: {
			'Content-Type': 'application/json'
		}
	}, function( err, response ) {
		if ( statusCodes.success.includes( response.statusCode ) ) {
			success( err, JSON.parse( response.body ), response.headers )
		} else {
			if ( error ) {
				try {
					error( err, JSON.parse( response.body ) )
				} catch ( e ) {
					error( err, { error: 'There was an error processing your request' } )
				}
			}
		}
	} )

	return call

}


function post( url, data, success, error ) {

	let call = xhr( {
		uri: settings.apiUrl + url,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify( data )
	}, function( err, response ) {
		if ( statusCodes.success.includes( response.statusCode ) ) {
			success( err, JSON.parse( response.body ), response.headers )
		} else {
			if ( error ) {
				try {
					error( err, JSON.parse( response.body ) )
				} catch ( e ) {
					error( err, { error: 'There was an error processing your request' } )
				}
			}
		}
	} )

	return call

}


function put( url, data, success, error ) {

	let call = xhr( {
		uri: settings.apiUrl + url,
		method: 'PUT',
		body: JSON.stringify( data ),
		headers: {
			'Content-Type': 'application/json'
		}
	}, function( err, response ) {
		if ( statusCodes.success.includes( response.statusCode ) ) {
			success( err, JSON.parse( response.body ), response.headers )
		} else {
			if ( error ) {
				try {
					error( err, JSON.parse( response.body ) )
				} catch ( e ) {
					error( err, { error: 'There was an error processing your request' } )
				}
			}
		}
	} )

	return call

}


function remove( url, success, error ) {
	let call = xhr( {
		uri: settings.apiUrl + url,
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		}
	}, function( err, response ) {
		if ( statusCodes.success.includes( response.statusCode ) ) {
			success( err, JSON.parse( response.body ), response.headers )
		} else {
			if ( error ) {
				try {
					error( err, JSON.parse( response.body ) )
				} catch ( e ) {
					error( err, { error: 'There was an error processing your request' } )
				}
			}
		}
	} )

	return call

}



export {
	get, put, post, remove
}
