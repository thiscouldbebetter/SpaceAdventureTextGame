
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

		var commandsSetsToRunAsStringArrays =
		[
			// Start.

			// Pax Aeterna.
			[
				// Upper deck.

				"go door",
				"go forward",
				"talk to man",
				"type astral bodies",
				"get cartridge",
				"go forward",
				"search body",
				"get keycard",
				"go aft",
				"go aft",
				"go elevator",

				// Lower deck.
				"go forward",
				"go forward",
				"go elevator",

				// Engineering deck.
				"go aft",
				"press open bay door button",
				"go aft",
				"use keycard on slot",
				"go elevator",

				// Docking bay.
				"press left button",
				"get gadget",
				"press right button",
				"get spacesuit",
				"go airlock",
				"push platform button",
				"go pod",

				// Escape pod.
				"press launch button",
				"press autonav button",
			],

			// Ekkis II Wilderness.

			[
				"go door",

				// crash site
				"go east",
				
				// cliff bottoms, hole
				"go south",
				"go east",
				// beneath bridge
				"go east",
				// bottom ramp, cave
				"go up",
				// bridge arch, east side
				"go west",
				// bridge arch, west side
				"go west",
				// cliff tops, west
				"go north",
				// peak
				"go east",
				// cliff tops, north
				"go east",
				// cliff tops, northeast, columns
				"go columns",

				// caverns
				// elevator
				"go west",
				// grating
				"go west",
				// geyser
				"go west",
				// pool
				"go west",
				// barrier
				"go west",
				// drips
				"go east",
				// projection room
				"go north",
				// steamworks
				"go skimmer",
			],

			// Village of [Farting Noise].
			[
				"go bar",

				"go outside",
				"go north",
				"go east",
				"go door",
				// robot shop

				"go outside",
				"go west",
				"go west",
				// ship lot north
			]
		];

		var placesExpectedAfterCommandSets =
		[
			Places.friendlyShipEscapePod_Name(),
			Places.planetSettlementBarFront_Name(),
			Places.planetSettlementNorthOfUsedShipLot_Name()
		];

		for (var s = 0; s < commandsSetsToRunAsStringArrays.length; s++)
		{
			var commandsToRunAsText = commandsSetsToRunAsStringArrays[s];

			var place = world.placeCurrent();

			for (var i = 0; i < commandsToRunAsText.length; i++)
			{
				var commandText = commandsToRunAsText[i];
				world.updateForUniverseAndCommandText(universe, commandText);
				place = world.placeCurrent();
			}

			var placeExpectedName = placesExpectedAfterCommandSets[s];

			Assert.areEqual(placeExpectedName, place.name);
		}
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