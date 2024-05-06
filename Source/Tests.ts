
class Assert
{
	static areEqual(expected: any, actual: any): void
	{
		if (actual != expected)
		{
			throw new Error("Expected: '" + expected + "', but was: '" + actual + "'.");
		}
	}

	static isNotNull(objectToCheck: object): void
	{
		if (objectToCheck == null)
		{
			throw new Error("Expected: not null, but was: null.");
		}
	}
}

class Tests
{
	playFromStart(): void
	{
		var tea = ThisCouldBeBetter.TextAdventureEngine;
		var Universe = tea.Universe;

		var worldCreate = () => Game.worldBuild();
		var universe = Universe.fromWorldCreate(worldCreate);
		universe.initialize();

		var world = universe.world;
		Assert.isNotNull(world);

		var commandsToRunAsText =
		[
			"go door",
			"go forward",
			"talk to man",
			"type astral bodies",
			"get cartridge",
			"put cartridge in reader"
		];


		for (var i = 0; i < commandsToRunAsText.length; i++)
		{
			var commandText = commandsToRunAsText[i];
			world.updateForUniverseAndCommandText(universe, commandText);
		}

		var place = world.placeCurrent();
		Assert.areEqual("Pax Aeterna - Library", place.name);
	}
}

class TestFixture
{
	name: string;
	tests: ( () => void)[];

	constructor(name: string, tests: ( () => void)[])
	{
		this.name = name;
		this.tests = tests;
	}

	run()
	{
		console.log("About to run tests in fixture '" + this.name + "'...")

		for (var i = 0; i < this.tests.length; i++)
		{
			var test = this.tests[i];
			test();
		}

		console.log
		(
			"...all "
			+ this.tests.length
			+ " tests in fixture completed successfully."
		);
	}
}

var tests = new Tests();

var testFixture = new TestFixture
(
	"All Tests",
	[
		() => tests.playFromStart()
	]
);

testFixture.run();