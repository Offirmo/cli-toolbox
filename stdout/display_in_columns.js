const cliColumns = require('cli-columns')

function createVisualTasks(tasks, options) {
	const listrInstance = new Listr(tasks, options)
	return listrInstance
}

module.exports = {

	create: createVisualTasks,

	run: function runVisualTasks(tasks, options) {
		const listrInstance = createVisualTasks(tasks, options)
		return listrInstance.run()
	}
}
