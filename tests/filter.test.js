const { filterDataByAnimals } = require('../lib/filter');

const sampleData = [
	{
		name: 'Country A',
		people: [
			{
				name: 'Person A',
				animals: [
					{ name: 'Lion' },
					{ name: 'Oryx' }
				]
			},
			{
				name: 'Person B',
				animals: [
					{ name: 'Dog' }
				]
			}
		]
	},
	{
		name: 'Country B',
		people: [
			{
				name: 'Person C',
				animals: [
					{ name: 'John Dory' },
					{ name: 'Cat' }
				]
			}
		]
	}
];

describe('filterDataByAnimals', () => {
	it('should filter animals matching the pattern', () => {
		const result = filterDataByAnimals(sampleData, 'ry');
		expect(result).toEqual([
			{
				name: 'Country A',
				people: [
					{
						name: 'Person A',
						animals: [
							{ name: 'Oryx' }
						]
					}
				]
			},
			{
				name: 'Country B',
				people: [
					{
						name: 'Person C',
						animals: [
							{ name: 'John Dory' }
						]
					}
				]
			}
		]);
	});

	it('should not return anything if no matches found', () => {
		const result = filterDataByAnimals(sampleData, 'zzz');
		expect(result).toBeUndefined();
	});

	it('should not include people with no matching animals', () => {
		const result = filterDataByAnimals(sampleData, 'ory');
		expect(result).toEqual([
			{
				name: 'Country A',
				people: [
					{
						name: 'Person A',
						animals: [
							{ name: 'Oryx' }
						]
					}
				]
			},
			{
				name: 'Country B',
				people: [
					{
						name: 'Person C',
						animals: [
							{ name: 'John Dory' }
						]
					}
				]
			}
		]);
	});

	it('should match animals case-insensitively', () => {
		const result = filterDataByAnimals(sampleData, 'ORY');
		expect(result).toEqual([
			{
				name: 'Country A',
				people: [
					{
						name: 'Person A',
						animals: [
							{ name: 'Oryx' }
						]
					}
				]
			},
			{
				name: 'Country B',
				people: [
					{
						name: 'Person C',
						animals: [
							{ name: 'John Dory' }
						]
					}
				]
			}
		]);
	});

	it('should ignore countries with no people', () => {
		const input = [
			...sampleData,
			{ name: 'Empty Country', people: [] }
		];

		const result = filterDataByAnimals(input, 'ry');
		expect(result).toEqual([
			{
				name: 'Country A',
				people: [
					{
						name: 'Person A',
						animals: [
							{ name: 'Oryx' }
						]
					}
				]
			},
			{
				name: 'Country B',
				people: [
					{
						name: 'Person C',
						animals: [
							{ name: 'John Dory' }
						]
					}
				]
			}
		]);
	});

	it('should ignore people with empty animal lists', () => {
		const input = [
			{
				name: 'Testland',
				people: [
					{
						name: 'Empty Animal Person',
						animals: []
					},
					{
						name: 'Valid Person',
						animals: [
							{ name: 'Oryx' }
						]
					}
				]
			}
		];

		const result = filterDataByAnimals(input, 'ry');
		expect(result).toEqual([
			{
				name: 'Testland',
				people: [
					{
						name: 'Valid Person',
						animals: [
							{ name: 'Oryx' }
						]
					}
				]
			}
		]);
	});

	it('should not crash when animal name is missing', () => {
		const input = [
			{
				name: 'Broken Zoo',
				people: [
					{
						name: 'Zoologist',
						animals: [
							{ name: 'Oryx' },
							{ notName: 'Oops' },
							{}
						]
					}
				]
			}
		];

		const result = filterDataByAnimals(input, 'ry');
		expect(result).toEqual([
			{
				name: 'Broken Zoo',
				people: [
					{
						name: 'Zoologist',
						animals: [
							{ name: 'Oryx' }
						]
					}
				]
			}
		]);
	});
});
