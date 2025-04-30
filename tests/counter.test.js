const { dataWithCount } = require('../lib/counter');

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
					{ name: 'Dog' },
					{ name: 'Cat' },
					{ name: 'Snake' }
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
					{ name: 'Tiger' }
				]
			}
		]
	}
];

describe('dataWithCount', () => {
	it('should append counts to country and people names', () => {
		const result = dataWithCount(sampleData);
		expect(result).toEqual([
			{
				name: 'Country A [2]',
				people: [
					{
						name: 'Person A [2]',
						animals: [
							{ name: 'Lion' },
							{ name: 'Oryx' }
						]
					},
					{
						name: 'Person B [3]',
						animals: [
							{ name: 'Dog' },
							{ name: 'Cat' },
							{ name: 'Snake' }
						]
					}
				]
			},
			{
				name: 'Country B [1]',
				people: [
					{
						name: 'Person C [1]',
						animals: [
							{ name: 'Tiger' }
						]
					}
				]
			}
		]);
	});

	it('should handle empty people or animals arrays gracefully', () => {
		const dataWithEmpty = [
			{ name: 'EmptyLand', people: [] },
			{
				name: 'Country',
				people: [
					{
						name: 'Lonely Person',
						animals: []
					}
				]
			}
		];

		const result = dataWithCount(dataWithEmpty);
		expect(result).toEqual([
			{ name: 'EmptyLand [0]', people: [] },
			{
				name: 'Country [1]',
				people: [
					{
						name: 'Lonely Person [0]',
						animals: []
					}
				]
			}
		]);
	});
});
