#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node "$0" "$@"

require('loud-rejection/register')

const path = require('path')
const sumUp = require('sum-up')

const MARKDOWN_OUTPUT = false
const DISPLAY_CODE = false
console.log(sumUp(require('../../package.json')));

const originalRequire = require
require = function(moduleRef) {
	if (moduleRef.startsWith('@offirmo/cli-toolbox/'))
		moduleRef = '../../' + moduleRef.slice(21)
	return originalRequire(moduleRef)
}

require('@offirmo/cli-toolbox/stdout/clear-cli')()
const stylizeString = require('@offirmo/cli-toolbox/string/stylize-string')
const _ = require('@offirmo/cli-toolbox/lodash')


function demo(moduleName, urlOrModeModuleNames, fn) {
	console.log(`${MARKDOWN_OUTPUT?'### ':''}~~~~~~~ ${moduleName} ~~~~~~~`)

	urlOrModeModuleNames = _.flatten([ urlOrModeModuleNames ])
	urlOrModeModuleNames.forEach(urlOrModeModuleName => {
		if (urlOrModeModuleName.slice(0, 4) === 'http') {
			console.log(`See more at ${stylizeString.blue(urlOrModeModuleName)}`)
		}
		else {
			const modulePackage = { json: require(path.join('../../node_modules', urlOrModeModuleName, 'package.json'))}
			let resume = 'Based on: ' + sumUp(modulePackage.json)
			if (MARKDOWN_OUTPUT) resume = resume.split('\n').join('\n\n')
			console.log(resume)
		}
	})

	if (DISPLAY_CODE) {
		if (MARKDOWN_OUTPUT) console.log('```js')
		console.log(fn.toString().split('\n').slice(1, -1).map(s => s.slice(2)).join('\n'))
		if (MARKDOWN_OUTPUT) console.log('```')
	}

	console.log(stylizeString.dim.italic('```'))
	return Promise.resolve(fn())
	.then(() => {
		console.log(stylizeString.dim.italic('```'))
	})
}

let sequence = Promise.resolve()


////////////////////////////////////
sequence = sequence.then(() => demo(
	'framework/meow',
	'meow',
	() => {
		const meow = require('@offirmo/cli-toolbox/framework/meow')
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'framework/vorpal',
	'vorpal',
	() => {
		const vorpal = require('@offirmo/cli-toolbox/framework/vorpal')
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'fs/json',
	[ 'load-json-file', 'write-json-file' ],
	() => {
		const json = require('@offirmo/cli-toolbox/fs/json')

		return json.read(__dirname + '/../../package.json').then(data => console.log(data.repository))
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'fs/extra',
	'fs-extra',
	() => {
		const fs = require('@offirmo/cli-toolbox/fs/extra')

		const dirs = fs.lsDirs(__dirname + '/../..')
		console.log(dirs)
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'stdout/clear-cli',
	'https://github.com/sindresorhus/clear-cli',
	() => {
		const clearCli = require('@offirmo/cli-toolbox/stdout/clear-cli')

		//clearCli()
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'stdout/visual_tasks',
	'listr',
	() => {
		const visual_tasks = require('@offirmo/cli-toolbox/stdout/visual_tasks')

		return visual_tasks.run([
			////////////
			{
				title: 'Gathering list of models',
				task: () => (new Promise(resolve => setTimeout(resolve, 250)))
			},
			////////////
			{
				title: 'Synchronizing models',
				task: () => visual_tasks.create(
					[1, 2, 3].map(x => ({
						title: `${x}`,
						task: () => (new Promise((resolve, reject) => {
							x === 2 ? reject(new Error('failed at step 2')) : setTimeout(resolve, 250)
						}))
					})),
					{concurrent: true}
				)
			},
			////////////
			{
				title: 'All done',
				task: () => {}
			}
			////////////
		])
		.catch(err => {
			console.error(err.message)
		})
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'string/fancy/make_sparkline',
	'sparkly',
	() => {
		const make_sparkline = require('@offirmo/cli-toolbox/string/fancy/make_sparkline')

		// TODO
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'string/prettify-json',
	'prettyjson',
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
	'chalk',
	() => {
		const stylizeString = require('@offirmo/cli-toolbox/string/stylize-string')

		console.log(stylizeString.bold.yellow.bgBlue('Hello'))
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'string/arrayify',
	'columnify',
	() => {
		const arrayify = require('@offirmo/cli-toolbox/string/arrayify')

		const data = {
			"commander@0.6.1": 1,
			"minimatch@0.2.14": 3,
			"mkdirp@0.3.5": 2,
			"sigmund@1.0.0": 3
		}

		console.log(arrayify(data))
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'string/boxify',
	'boxen',
	() => {
		const boxify = require('@offirmo/cli-toolbox/string/boxify')

		console.log(boxify('Hello'))
	}
))
////////////////////////////////////
sequence = sequence.then(() => demo(
	'string/columnify',
	'cli-columns',
	() => {
		const columnify = require('@offirmo/cli-toolbox/string/columnify')

		const data = require('pokemon').all

		console.log(columnify(data))
	}
))
////////////////////////////////////
sequence = sequence.then(() => console.log(`~~~ All done, thank you ! ~~~`))
////////////////////////////////////
