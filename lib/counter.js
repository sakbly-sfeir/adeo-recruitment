const keyWithCount = (data, keyToCount, keyToOverride) => ({
	...data,
	[keyToOverride]: `${data.name} [${data[keyToCount].length}]`,
})

const dataWithCount = (data) => {
	return data.map((country) => ({
		...keyWithCount(country, 'people', 'name'),
		people: country.people.map((person) => keyWithCount(person, 'animals', 'name')),
	}))
}

module.exports = {
	dataWithCount
};
