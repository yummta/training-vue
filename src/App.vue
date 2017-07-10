<template lang="pug">
	#app
		img(src='./assets/logo.png')
		h1 Platzimusic
		select(v-model="countrySelected")
			option( v-for="country in countries" v-bind:value="country.value" ) {{ country.name }}
		spinner(v-show="spinner")
		ul
			artist( v-for="artist in artists" v-bind:artist="artist" )
</template>

<script>

import getArtist from './api'
import Artist from './components/Artist.vue'
import Spinner from './components/Spinner.vue'

export default {
	name: 'app',
	data () {
		return {
			artists: [],
			countries : [
				{ name: 'Perú',  value: 'peru' },
				{ name: 'Argentina', value: 'argentina'},
				{ name: 'España', value: 'spain' }
			],
			countrySelected: 'peru',
			spinner: true
		}
	},
	methods: {
		refreshCountry () {
			const self = this
			this.spinner = true
			this.artists = []
			getArtist( this.countrySelected )
				.then( function ( artists ) {
					self.spinner = false
					self.artists = artists
			} )
		}
	},
	components: {
		Artist,
		Spinner
	},
	mounted () {
		this.refreshCountry()
	},
	watch: {
		countrySelected () {
			this.refreshCountry()
		}
	}
}
</script>

<style lang="stylus">
#app
	font-family 'Avenir', Helvetica, Arial, sans-serif
	-webkit-font-smoothing antialiased
	-moz-osx-font-smoothing grayscale
	text-align center
	color #2c3e50
	margin-top 60px

h1, h2
	font-weight normal

ul
	list-style-type none
	padding 0

li
	display inline-block
	margin 0 10px
a
	color #42b983
</style>
