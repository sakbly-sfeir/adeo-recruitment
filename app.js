const { filterDataByAnimals } = require('./lib/filter')
const { dataWithCount } = require('./lib/counter')
const { data } = require("./data");

const AVAILABLE_COMMANDS = {
	filter: filterDataByAnimals,
	count : dataWithCount
}

const args = process.argv.slice(2)

const commandArg = args[0]?.split('=')
const commandName = commandArg?.[0]?.replace('--', '')
const query = commandArg?.[1]

const command = AVAILABLE_COMMANDS[commandName] ?? null

if (!command) {
	throw new Error(`Unknown command: ${commandName}`)
}

const result = command(data, query)

if (result)
	console.log(JSON.stringify(result, null, 2))

