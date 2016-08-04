const Listr = require('listr')

function createVisualTasks(tasks) {
	const listrInstance = new Listr(tasks)
	return listrInstance
}

module.exports = {

	create: createVisualTasks,

	run: function runVisualTasks(tasks) {
		const listrInstance = createVisualTasks(tasks)
		listrInstance.run()
		return listrInstance
	}
}
