#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec `dirname $0`/../../node_modules/.bin/ts-node "$0" "$@"

const stylizeString = require('@offirmo/cli-toolbox/output/stylize-string')

function demo(module_name, repo_url, fn) {
	console.log(`~~~~~~~ ${module_name} ~~~~~~~`)
	return Promise.resolve(fn())
	.then(
		() => console.log(stylizeString.dim.italic(`\nSee more at ${stylizeString.blue(repo_url)}`))
	)
}

let sequence = Promise.resolve()

////////////////////////////////////
sequence = sequence.then(() => demo('output/columnify', 'https://github.com/timoxley/columnify', () => {
	const columnify = require('@offirmo/cli-toolbox/output/columnify')

	var data = {
		"commander@0.6.1": 1,
		"minimatch@0.2.14": 3,
		"mkdirp@0.3.5": 2,
		"sigmund@1.0.0": 3
	}

	console.log(columnify(data))
}))
////////////////////////////////////
sequence = sequence.then(() => demo('output/boxify', 'https://github.com/sindresorhus/boxen', () => {
	const boxify = require('@offirmo/cli-toolbox/output/boxify')

	console.log(boxify('Hello'))
}))
////////////////////////////////////
sequence = sequence.then(() => demo('output/prettify-json', 'https://github.com/rafeca/prettyjson', () => {
	const prettifyJson = require('@offirmo/cli-toolbox/output/prettify-json')

	var data = {
		username: 'rafeca',
		url: 'https://github.com/rafeca',
		twitter_account: 'https://twitter.com/rafeca',
		projects: ['prettyprint', 'connfu']
	}

	var options = {}

	console.log(prettifyJson(data, options))
}))
////////////////////////////////////
sequence = sequence.then(() => demo('output/stylize-string', 'https://github.com/rafeca/prettyjson', () => {
	const stylizeString = require('@offirmo/cli-toolbox/output/stylize-string')

	console.log(stylizeString.bold.yellow.bgBlue('Hello'))
}))
////////////////////////////////////
sequence = sequence.then(() => demo('framework/meow', 'https://github.com/sindresorhus/meow', () => {
	const meow = require('@offirmo/cli-toolbox/framework/meow')
}))
////////////////////////////////////
sequence = sequence.then(() => demo('framework/vorpal', 'https://github.com/dthree/vorpal', () => {
	const vorpal = require('@offirmo/cli-toolbox/framework/vorpal')
}))
////////////////////////////////////
