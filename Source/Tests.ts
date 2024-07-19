
class Assert
{
	static areEqual(expected: any, actual: any): void
	{
		if (actual != expected)
		{
			throw new Error("Expected: '" + expected + "', but was: '" + actual + "'.");
		}
	}

	static isFalse(conditionToCheck: boolean): void
	{
		if (conditionToCheck != false)
		{
			throw new Error("Expected: false, but was: not false.");
		}
	}

	static isNotNull(objectToCheck: object): void
	{
		if (objectToCheck == null)
		{
			throw new Error("Expected: not null, but was: null.");
		}
	}

	static isNull(objectToCheck: object): void
	{
		if (objectToCheck != null)
		{
			throw new Error("Expected: null, but was: not null.");
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

		run("cheat goto " + Places.friendlyShipEscapePod_Name() ); // escape pod interior
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

		run("cheat goto " + Places.friendlyShipDockingBayAntechamber_Name() ); // docking bay antechamber
		run("go airlock");

		Assert.isTrue(world.isOver);
	}

	die_PlanetCaverns_DrinkingFromStrangePool(): void
	{
		this.universeAndWorldCreateAndSet();
		var world = this.world;
		var run = this.run.bind(this);

		run("cheat goto " + Places.planetCavernsPool_Name() ); // pool

		Assert.isFalse(world.isOver);

		run("drink pool");

		Assert.isTrue(world.isOver);
	}

	die_PlanetCaverns_EatenByMonsterUnderGrating(): void
	{
		this.universeAndWorldCreateAndSet();
		var world = this.world;
		var run = this.run.bind(this);

		run("cheat goto " + Places.planetCavernsGratingEastSide_Name() ); // east side of grating

		Assert.isFalse(world.isOver);

		run("go west");

		Assert.isTrue(world.isOver);
	}

	die_PlanetCaverns_MeltedByAcidDrips(): void
	{
		this.universeAndWorldCreateAndSet();
		var world = this.world;
		var run = this.run.bind(this);

		run("cheat goto " + Places.planetCavernsDripsBefore_Name() ); // west side of drips

		Assert.isFalse(world.isOver);

		run("go east");

		// The westernmost set of drips
		// drips every other turn,
		// so wait at most one turn to die.
		run("wait");

		Assert.isTrue(world.isOver);
	}

	die_PlanetCaverns_WalkingThroughLaserBarrier(): void
	{
		this.universeAndWorldCreateAndSet();
		var world = this.world;
		var run = this.run.bind(this);

		run("cheat goto " + Places.planetCavernsBarrier_Name() ); // barrier
		run("go barrier");
		Assert.isTrue(world.isOver);
	}

	die_PlanetCliffs_BridgeCollapses(): void
	{
		this.universeAndWorldCreateAndSet();
		var world = this.world;
		var run = this.run.bind(this);

		run("cheat goto " + Places.planetCliffsTopSouthEastSide_Name() ); // east side of bridge

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

		run("cheat goto " + Places.planetDesertCrashSite_Name() ); // crash site
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

		run("cheat goto " + Places.planetCliffsCaveInterior_Name() ); // cliff cave interior

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

		run("cheat goto " + Places.friendlyShipEngineeringDeckAmidships_Name() ); // engineering deck amidships
		run("press open bay doors button");

		run("cheat goto " + Places.friendlyShipEscapePod_Name() ); // escape pod interior
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

		run("cheat goto " + Places.planetDesertCrashSite_Name() ); // crash site

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

	die_PlanetSettlement_LosingAtGambling(): void
	{
		this.universeAndWorldCreateAndSet();
		var world = this.world;
		var run = this.run.bind(this);

		run("cheat goto " + Places.planetSettlementBarInterior_Name() );
		run("cheat get 1 quatloos" );

		Assert.isFalse(world.isOver);

		var randomNumberGenerator = this.universe.randomNumberGenerator;

		// We need three unlucky symbols to lose,
		// but there are other random numbers being taken off the queue.
		randomNumberGenerator.enqueue(0); 
		randomNumberGenerator.enqueue(0); 
		randomNumberGenerator.enqueue(0);
		randomNumberGenerator.enqueue(0);
		randomNumberGenerator.enqueue(0);

		run("put quatloo in slot machine");

		Assert.isTrue(world.isOver);
	}

	fail_PlanetSettlement_SkimmerGetsStolen(): void
	{
		this.universeAndWorldCreateAndSet();
		var world = this.world;
		var run = this.run.bind(this);

		run("cheat goto " + Places.planetSettlementBarFront_Name() );

		var placeBarFront = world.placeCurrent();

		var emplacementSkimmer = placeBarFront.emplacementByName("skimmer");

		Assert.isNotNull(emplacementSkimmer);

		run("go north");
		run("go south");

		var emplacementSkimmer = placeBarFront.emplacementByName("skimmer");

		Assert.isNull(emplacementSkimmer);
	}

	placesAllHaveUniqueNames(): void
	{
		this.universeAndWorldCreateAndSet();
		var world = this.world;

		var places = world.places;
		var placesNames = places.map(x => x.name);
		var placesDistinctShareSameName =
			placesNames.some
			(
				placeName =>
					places.filter(place => place.name == placeName).length > 1
			);
		Assert.isFalse(placesDistinctShareSameName);
	}

	placesAreAllConnectedByPortals(): void
	{
		this.universeAndWorldCreateAndSet();
		var world = this.world;

		var places = world.places;

		var placesThatAreNotConnected =
		[
			world.placeByName(Places.friendlyShipEscapePod_Name() ),
			world.placeByName(Places.planetDesertDeep_Name() ), // hack - This needs to be fixed.
			world.placeByName(Places.enemyShipNearbySpace_Name() )
		];

		for (var i = 0; i < places.length; i++)
		{
			var place = places[i];
			var placeIsConnected =
				(placesThatAreNotConnected.indexOf(place) < 0);
			if (placeIsConnected)
			{
				var placePortals = place.portals;
				var placesAdjacentNames = placePortals.map(x => x.placeDestinationName);
				placesAdjacentNames = placesAdjacentNames.filter(x => x != null);
				var placesAdjacent = placesAdjacentNames.map(x => world.placeByName(x) );

				for (var j = 0; j < placesAdjacent.length; j++)
				{
					var placeAdjacent = placesAdjacent[j];
					var placeAdjacentIsConnected =
						(placesThatAreNotConnected.indexOf(placeAdjacent) < 0);
					if (placeAdjacentIsConnected)
					{
						var placeAdjacentPortals = placeAdjacent.portals;
						var doesAReturnPortalExist =
							placeAdjacentPortals.some(x => x.placeDestinationName == place.name);
						if (doesAReturnPortalExist == false)
						{
							console.log(placeAdjacent.name + " not connected back to: " + place.name);
						}
						Assert.isTrue(doesAReturnPortalExist);
					}
				}
			}
		}
	}

	playFromStartToEnd(): void
	{
		this.universeAndWorldCreateAndSet();
		var world = this.world;
		var run = this.run.bind(this);

		// Start.

		// Pax Aeterna.

		// Lower deck.
		run("go out");
		run("go elevator");

		// Upper deck.
		run("go forward");
		run("go forward");
		run("go forward");

		// Bridge.
		run("search captain");
		run("get keycard");
		run("go aft");
		run("go aft"); // "You hear the tramping of heavy feet from aft."
		run("go door"); // Officers' quarters.
		run("hide behind plant");
		run("wait");
		run("wait");
		run("go outside");
		run("go aft");
		run("go elevator");

		// Lower deck again.
		run("go forward");
		run("go library");
		run("talk to man");
		run("type pandimensional metacalculus for hypernavigators");
		run("get cartridge");
		run("go forward");
		run("go aft");
		run("go aft");
		run("go aft");
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
		run("get canteen");
		run("get can of sham");
		run("take off safety harness");
		run("go door");

		// Ekkis II Wilderness.
		// crash site

		Assert.areEqual
		(
			Places.planetDesertCrashSite_Name(),
			world.placeCurrent().name
		);

		run("get glass");

		run("go east");

		// cliff bottoms, hole
		run("go south");
		run("go east");
		// beneath bridge
		run("go east");
		// bottom ramp, cave
		run("go cave");
		run("throw canteen at monster");
		run("get claw");
		run("go outside");

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
		run("get rock");
		run("go west");
		// grating, east side
		run("put can of sham on grating");
		run("go west");
		// grating, west side
		run("go west");
		// geyser
		run("put rock in geyser");
		run("go west");
		// pool
		run("go west");
		// barrier
		run("put glass in barrier");
		run("go west");

		// drips
		// west of drips

		Assert.areEqual
		(
			Places.planetCavernsDripsBefore_Name(),
			world.placeCurrent().name
		);

		// Wait for the right moment to pass the drips.
		// The drip sets stop, from west to east respectively,
		// every 2 turns, every 3 turns, and every 5 turns.
		// So they all stop dripping every 30 turns.
		// But the player must pass under on the
		// eighth, ninth, and tenth turns after that,
		// because 8 is divisible by 2, 9 by 3, and 10 by 5.

		while (world.turnsSoFar % 30 != 7)
		{
			run("wait");
		}

		run("go east");
		// drips 1
		Assert.areEqual
		(
			Places.planetCavernsDrips1_Name(),
			world.placeCurrent().name
		);

		run("go east");
		// drips 2
		Assert.areEqual
		(
			Places.planetCavernsDrips2_Name(),
			world.placeCurrent().name
		);

		run("go east");
		// drips 3
		Assert.areEqual
		(
			Places.planetCavernsDrips3_Name(),
			world.placeCurrent().name
		);

		run("go east");
		// east of drips
		Assert.areEqual
		(
			Places.planetCavernsDripsAfter_Name(),
			world.placeCurrent().name
		);

		run("turn on gadget");
		run("go east");
		// projection room

		run("go north");
		// steamworks

		Assert.areEqual
		(
			Places.planetCavernsSteamworks_Name(),
			world.placeCurrent().name
		);
		
		run("talk to alien");
		run("get skimmer key");
		run("insert key in skimmer");

		// Village of [Farting Noise].

		Assert.areEqual
		(
			Places.planetSettlementBarFront_Name(),
			world.placeCurrent().name
		);

		run("get skimmer key");

		// Sell the skimmer for 30 quatloos,
		// with no jetpack and no coupon book.
		// Note, this makes the game unwinnable.
		run("talk to person");
		run("say yes");

		run("go bar");
		run("go outside");


		run("go bar");

		run("buy drink");
		run("buy drink");
		run("buy drink");
		// Hear the location of the enemy ship.

		var agentPlayer = world.agentPlayer;
		var itemQuatloos = agentPlayer.itemByName("quatloos");
		var place = world.placeCurrent();
		var emplacementSlotMachine = place.emplacementByName("slot machine");
		var timesSlotMachinePlayed = 0;
		var timesToPlaySlotMachineMax = 1000;
		while
		(
			emplacementSlotMachine.activated()
			&& timesSlotMachinePlayed < timesToPlaySlotMachineMax
		)
		{
			run("save gambling");
			var quatloosBeforeGambling = itemQuatloos.quantity;
			run("put quatloo in slot machine");
			var quatloosAfterGambling = itemQuatloos.quantity;
			var shouldRestore =
				(quatloosAfterGambling < quatloosBeforeGambling)
				|| world.isOver;

			if (shouldRestore)
			{
				run("restore gambling");
			}

			timesSlotMachinePlayed++;
		}

		run("go out");

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

		run("go south");
		// ship lot

		run("talk to salesbeing");
		run("go north");
		// ship lot north

		run("look ship");
		run("buy ship");
		run("get in ship");
		run("press load button");
		run("press launch button");
		run("talk to robot");
		run("KL-5-6800");

		Assert.areEqual
		(
			Places.enemyShipAirlockExterior_Name(),
			world.placeCurrent().name
		);
	}

	survive_PlanetDesert_DrinkToPreventDyingOfThirst(): void
	{
		this.universeAndWorldCreateAndSet();
		var world = this.world;
		var run = this.run.bind(this);

		run("cheat goto " + Places.planetDesertCrashSite_Name() ); // crash site
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
		() => tests.die_PlanetCaverns_EatenByMonsterUnderGrating(),
		() => tests.die_PlanetCaverns_MeltedByAcidDrips(),
		() => tests.die_PlanetCaverns_WalkingThroughLaserBarrier(),
		() => tests.die_PlanetCliffs_BridgeCollapses(),
		() => tests.die_PlanetCliffs_LookInHole(),
		() => tests.die_PlanetCliffs_EatenByCaveMonster(),
		() => tests.die_PlanetDesert_EscapePodCrashesWithNoSeatBelt(),
		() => tests.die_PlanetDesert_OfThirst(),
		() => tests.die_PlanetSettlement_LosingAtGambling(),

		() => tests.fail_PlanetSettlement_SkimmerGetsStolen(),

		() => tests.survive_PlanetDesert_DrinkToPreventDyingOfThirst(),

		() => tests.placesAllHaveUniqueNames(),
		() => tests.placesAreAllConnectedByPortals(),

		() => tests.playFromStartToEnd(),
	]
);

testFixture.run();