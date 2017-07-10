import config from './config'

const { apiKey } = config
console.log('apiKey', apiKey)
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:country&api_key=${apiKey}&format=json`

export default function getArtist( country ) {
	let url = URL.replace( ':country', country )
	return fetch(url)
		.then( res => res.json() )
		.then( json => json.topartists.artist )
}