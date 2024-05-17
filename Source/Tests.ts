
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

	static isFalse(conditionToCheck: boolean): void
	{
		if (conditionToCheck != false)
		{
			throw new Error("Expected: false, but was: not false.");
		}
	}

	static isTrue(conditionToCheck: boolean): void
	{
		if (conditionToCheck != true)
		{
			throw new Error("Expected: true, but was: not true.");
		}
	}
}

class Tests
{
	die(): void
	{
		var tea = ThisCouldBeBetter.TextAdventureEngine;
		var Universe = tea.Universe;

		var worldCreate = () => Game.worldBuild();
		var universe = Universe.fromWorldCreate(worldCreate);
		universe.initialize();

		var world = universe.world;
		Assert.isNotNull(world);

		var run = (commandText: string) =>
			world.updateForUniverseAndCommandText(universe, commandText);

		var turnsWaitedSoFar = 0;
		var turnsToWait = 90;
		for (var turnsWaitedSoFar = 0; turnsWaitedSoFar < turnsToWait; turnsWaitedSoFar++)
		{
			run("wait");
		}

		Assert.isFalse(world.isOver);

		var turnsToWait = 10;
		for (var turnsWaitedSoFar = 0; turnsWaitedSoFar < turnsToWait; turnsWaitedSoFar++)
		{
			run("wait");
		}
		Assert.isTrue(world.isOver);

	}

	playFromStart(): void
	{
		var tea = ThisCouldBeBetter.TextAdventureEngine;
		var Universe = tea.Universe;

		var worldCreate = () => Game.worldBuild();
		var universe = Universe.fromWorldCreate(worldCreate);
		universe.initialize();

		var world = universe.world;
		Assert.isNotNull(world);

		var run = (commandText: string) =>
			world.updateForUniverseAndCommandText(universe, commandText);

		// Start.

		// Pax Aeterna.

		// Upper deck.
		run("go door");
		run("go forward");
		run("talk to man");
		run("type astral bodies");
		run("get cartridge");
		run("go forward");
		run("search body");
		run("get keycard");
		run("go aft");
		run("go aft");
		run("go aft");
		run("go elevator");

		// Lower deck.
		run("go forward");
		run("go forward");
		run("go elevator");

		// Engineering deck.
		run("go aft");
		run("press open bay door button");
		run("go aft");
		run("go elevator");
		run("use keycard on slot");
		run("go elevator");

		// Docking bay.
		run("press left button");
		run("get gadget");
		run("press right button");
		run("get spacesuit");
		run("go airlock");
		run("push platform button");
		run("go pod");

		// Escape pod.
		run("press launch button");
		run("press autonav button");

		// Ekkis II Wilderness.

		run("go door");

		Assert.areEqual
		(
			Places.planetDesertCrashSite_Name(),
			world.placeCurrent().name
		);

		// crash site
		run("go east");

		// cliff bottoms, hole
		run("go south");
		run("go east");
		// beneath bridge
		run("go east");
		// bottom ramp, cave
		run("go up");
		// bridge arch, east side
		run("go west");
		// bridge arch, west side
		run("go west");
		// cliff tops, west
		run("go north");
		// peak
		run("go east");
		// cliff tops, north
		run("go east");
		// cliff tops, northeast, columns
		run("go columns");

		// caverns
		// elevator
		run("go west");
		// grating
		run("go west");
		// geyser
		run("go west");
		// pool
		run("go west");
		// barrier
		run("go west");
		// drips
		run("go east");
		// projection room
		run("go north");
		// steamworks
		run("go skimmer");

		// Village of [Farting Noise].

		Assert.areEqual
		(
			Places.planetSettlementBarFront_Name(),
			world.placeCurrent().name
		);

		run("go bar");

		run("go outside");
		run("go north");
		run("go east");
		run("go door");
		// robot shop

		run("buy pilot robot");

		run("go outside");
		run("go west");
		run("go west");
		// ship lot north

		Assert.areEqual
		(
			Places.planetSettlementNorthOfUsedShipLot_Name(),
			world.placeCurrent().name
		);
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
		() => tests.die(),
		() => tests.playFromStart()
	]
);

testFixture.run();