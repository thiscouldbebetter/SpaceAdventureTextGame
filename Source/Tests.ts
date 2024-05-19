
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
	universe: Universe;
	world: World;

	// Helpers.

	run(commandText: string): void
	{
		this.world.updateForUniverseAndCommandText(this.universe, commandText);
	}

	universeAndWorldCreateAndSet(): void
	{
		var tea = ThisCouldBeBetter.TextAdventureEngine;
		var Universe = tea.Universe;

		var worldCreate = () => Game.worldBuild();
		var universe = Universe.fromWorldCreate(worldCreate);
		universe.initialize();

		var world = universe.world;
		Assert.isNotNull(world);

		this.universe = universe;
		this.world = world;
	}

	// Tests.

	die_FriendlyShip_EscapePodLaunchesIntoClosedBayDoors(): void
	{
		this.universeAndWorldCreateAndSet();
		var world = this.world;
		var run = this.run.bind(this);

		run("cheat goto 16"); // escape pod interior
		run("press launch button");

		Assert.isTrue(world.isOver);
	}

	die_FriendlyShip_Explodes(): void
	{
		this.universeAndWorldCreateAndSet();
		var world = this.world;
		var run = this.run.bind(this);

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

	die_FriendlyShip_GoIntoAirlockWithNoSuit(): void
	{
		this.universeAndWorldCreateAndSet();
		var world = this.world;
		var run = this.run.bind(this);

		run("cheat goto 12"); // docking bay antechamber
		run("go airlock");

		Assert.isTrue(world.isOver);
	}

	die_PlanetCliffs_BridgeCollapses(): void
	{
		this.universeAndWorldCreateAndSet();
		var world = this.world;
		var run = this.run.bind(this);

		run("cheat goto 33"); // east side of bridge

		Assert.isFalse(world.isOver);

		run("go west");
		Assert.isFalse(world.isOver);

		run("go east");
		Assert.isFalse(world.isOver);

		run("go west");
		Assert.isFalse(world.isOver);

		run("go east");
		Assert.isFalse(world.isOver);

		run("go west");
		Assert.isTrue(world.isOver);
	}

	die_PlanetCliffs_LookInHole(): void
	{
		this.universeAndWorldCreateAndSet();
		var world = this.world;
		var run = this.run.bind(this);

		run("cheat goto 17"); // crash site
		run("go east");

		Assert.isFalse(world.isOver);

		run("look in hole");

		Assert.isTrue(world.isOver);
	}

	die_PlanetCliffs_EatenByCaveMonster(): void
	{
		this.universeAndWorldCreateAndSet();
		var world = this.world;
		var run = this.run.bind(this);

		run("cheat goto 29"); // cliff cave interior

		Assert.isFalse(world.isOver);

		var turnsForMonsterToKillPlayer = 3;

		for (var i = 0; i < turnsForMonsterToKillPlayer - 1; i++)
		{
			run("wait");
			Assert.isFalse(world.isOver);
		}

		run("wait");

		Assert.isTrue(world.isOver);
	}

	die_PlanetDesert_EscapePodCrashesWithNoSeatBelt(): void
	{
		this.universeAndWorldCreateAndSet();
		var world = this.world;
		var run = this.run.bind(this);

		run("cheat goto 10"); // engineering deck amidships
		run("press open bay doors button");

		run("cheat goto 16"); // escape pod interior
		run("press launch button");

		Assert.isFalse(world.isOver);

		run("press autonav button");

		Assert.isTrue(world.isOver);
	}

	die_PlanetDesert_OfThirst(): void
	{
		this.universeAndWorldCreateAndSet();
		var world = this.world;
		var run = this.run.bind(this);

		run("cheat goto 17"); // crash site

		var turnsWaitedSoFar = 0;
		var turnsToWait = 30;
		for (var turnsWaitedSoFar = 0; turnsWaitedSoFar < turnsToWait; turnsWaitedSoFar++)
		{
			run("wait");
		}

		Assert.isFalse(world.isOver);

		var turnsToWait = 20;
		for (var turnsWaitedSoFar = 0; turnsWaitedSoFar < turnsToWait; turnsWaitedSoFar++)
		{
			run("wait");
		}
		Assert.isTrue(world.isOver);
	}

	playFromStartToEnd(): void
	{
		this.universeAndWorldCreateAndSet();
		var world = this.world;
		var run = this.run.bind(this);

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
		run("go left closet");
		run("get gadget");
		run("go out");
		run("press right button");
		run("go right closet");
		run("get spacesuit");
		run("go out");
		run("go airlock");
		run("go pod");

		Assert.areEqual
		(
			Places.friendlyShipDockingBayHangar_Name(),
			world.placeCurrent().name
		);

		run("push platform button");
		run("go pod");

		// Escape pod.
		run("put on safety harness");
		run("press launch button");
		run("press autonav button");

		// Pod crashes on planet.
		run("get survival kit");
		run("open survival kit");
		run("get dehydrated water");
		run("take off safety harness");
		run("go door");

		// Ekkis II Wilderness.
		// crash site

		Assert.areEqual
		(
			Places.planetDesertCrashSite_Name(),
			world.placeCurrent().name
		);

		run("go east");

		// cliff bottoms, hole
		run("go south");
		run("go east");
		// beneath bridge
		run("go east");
		// bottom ramp, cave
		run("go up");
		run("go cave");
		run("throw dehydrated water at monster");
		run("get chunk");
		run("go outside");
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
		run("talk to alien");
		run("get skimmer key");
		run("insert key in skimmer");

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

	survive_PlanetDesert_DrinkToPreventDyingOfThirst(): void
	{
		this.universeAndWorldCreateAndSet();
		var world = this.world;
		var run = this.run.bind(this);

		run("cheat goto 17"); // crash site
		run("cheat get dehydrated water");

		var turnsToWait = 30;
		for (var turnsWaitedSoFar = 0; turnsWaitedSoFar < turnsToWait; turnsWaitedSoFar++)
		{
			run("wait");
		}

		Assert.isFalse(world.isOver);

		run("drink dehydrated water");

		var turnsToWait = 20;
		for (var turnsWaitedSoFar = 0; turnsWaitedSoFar < turnsToWait; turnsWaitedSoFar++)
		{
			run("wait");
		}

		Assert.isFalse(world.isOver);
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
		() => tests.die_FriendlyShip_EscapePodLaunchesIntoClosedBayDoors(),
		() => tests.die_FriendlyShip_Explodes(),
		() => tests.die_FriendlyShip_GoIntoAirlockWithNoSuit(),
		() => tests.die_PlanetCliffs_BridgeCollapses(),
		() => tests.die_PlanetCliffs_LookInHole(),
		() => tests.die_PlanetCliffs_EatenByCaveMonster(),
		() => tests.die_PlanetDesert_EscapePodCrashesWithNoSeatBelt(),
		() => tests.die_PlanetDesert_OfThirst(),
		() => tests.playFromStartToEnd(),
		() => tests.survive_PlanetDesert_DrinkToPreventDyingOfThirst()
	]
);

testFixture.run();