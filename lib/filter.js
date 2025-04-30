const filterDataByAnimals = (data, query) => {
	const lowerQuery = query.toLowerCase();

	const filtered = data.map(country => {
		const people = country.people
			.map(person => {
				const animals = person.animals.filter(animal =>
					animal.name?.toLowerCase().includes(lowerQuery)
				);

				return animals.length ? { ...person, animals } : null;
			})
			.filter(Boolean);

		return people.length ? { ...country, people } : null;
	}).filter(Boolean);

	return filtered.length ? filtered : undefined;
};

module.exports = {
	filterDataByAnimals
};
