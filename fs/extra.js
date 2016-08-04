const fs = require('fs-extra')

// hat tip to http://stackoverflow.com/a/24594123/587407
const path = require('path')
function lsDirs(srcpath) {
	return fs
		.readdirSync(srcpath)
		.filter(file => fs.statSync(
			path.join(srcpath, file)
		).isDirectory())
}
fs.lsDirs = lsDirs

module.exports = fs
