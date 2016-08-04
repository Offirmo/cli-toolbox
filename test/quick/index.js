#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"

require('loud-rejection/register')
const sumUp = require('sum-up');

const DISPLAY_CODE = false
console.log(sumUp(require('../../package.json')));

const originalRequire = require
require = function(moduleRef) {
	if (moduleRef.startsWith('@offirmo/cli-toolbox/'))
		moduleRef = '../../' + moduleRef.slice(21)
	return originalRequire(moduleRef)
}

const stylizeString = require('@offirmo/cli-toolbox/string/stylize-string')


function demo(moduleName, repoUrl, fn) {
	console.log(`### ~~~~~~~ ${moduleName} ~~~~~~~`)

	if (DISPLAY_CODE) {
		console.log('```js')
		console.log(fn.toString().split('\n').slice(1, -1).map(s => s.slice(2)).join('\n'))
		console.log('```')
	}

	console.log('```')
	return Promise.resolve(fn())
	.then(
		() => console.log(stylizeString.dim.italic('```' + `\nSee more at ${stylizeString.blue(repoUrl)}`))
	)
}

let sequence = Promise.resolve()

////////////////////////////////////
sequence = sequence.then(() => demo(
	'stdout/clear-cli',
	'https://github.com/sindresorhus/clear-cli',
	() => {
		const clearCli = require('@offirmo/cli-toolbox/stdout/clear-cli')

		clearCli()
		console.log(`~~~~~~~ output/clear-cli ~~~~~~~`)
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'string/columnify',
	'https://github.com/timoxley/columnify',
	() => {
		const columnify = require('@offirmo/cli-toolbox/string/columnify')

		var data = {
			"commander@0.6.1": 1,
			"minimatch@0.2.14": 3,
			"mkdirp@0.3.5": 2,
			"sigmund@1.0.0": 3
		}

		console.log(columnify(data))
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'string/boxify',
	'https://github.com/sindresorhus/boxen',
	() => {
		const boxify = require('@offirmo/cli-toolbox/string/boxify')

		console.log(boxify('Hello'))
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'string/prettify-json',
	'https://github.com/rafeca/prettyjson',
	() => {
		const prettifyJson = require('@offirmo/cli-toolbox/string/prettify-json')

		var data = {
			username: 'rafeca',
			url: 'https://github.com/rafeca',
			twitter_account: 'https://twitter.com/rafeca',
			projects: ['prettyprint', 'connfu']
		}

		var options = {}

		console.log(prettifyJson(data, options))
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'string/stylize-string',
	'https://github.com/rafeca/prettyjson',
	() => {
		const stylizeString = require('@offirmo/cli-toolbox/string/stylize-string')

		console.log(stylizeString.bold.yellow.bgBlue('Hello'))
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'framework/meow',
	'https://github.com/sindresorhus/meow',
	() => {
		const meow = require('@offirmo/cli-toolbox/framework/meow')
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'framework/vorpal',
	'https://github.com/dthree/vorpal',
	() => {
		const vorpal = require('@offirmo/cli-toolbox/framework/vorpal')
	}
))
////////////////////////////////////
