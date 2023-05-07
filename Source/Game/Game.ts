
class Game
{
	static worldBuild(): World
	{
		var player = new Agent
		(
			"self",
			"This is you.",
			null, // scriptUpdateForTurnName
			[
				Item.fromNameAndDescription
				(
					"washrag",
					"This is a rag you use to clean things sometimes."
				)
			],
			null // commands
		);

		var scriptsCustom = new Scripts();

		var places = Places.Instance()._All;

		var commands = Command.Instances()._All;

		var scriptsAll = new Array<Script>();

		var commandsAsScripts = commands.map((x: Command) => x._scriptExecute);
		scriptsAll.push(...commandsAsScripts);

		scriptsAll.push(...scriptsCustom._All);

		var returnValue = new World
		(
			"Space_Quest",
			places,
			player,
			commands,
			scriptsAll,
			null, // turnsSoFar,
			null
		);

		return returnValue;
	}
}

class Items
{
	Beer: Item;
	Buckazoids: Item;
	Cartridge: Item;
	DehydratedWater: Item;
	Gadget: Item; // Translator.
	GasGrenade: Item;
	Keycard: Item;
	Jetpack: Item;
	OratPart: Item;
	PulseRifle: Item;
	SkimmerKey: Item;
	SurvivalKit: Item;
	XenonArmyKnife: Item;
}

class Places
{
	ArcadiaBridge: Place;

	ArcadiaDockingBayAntechamber: Place;
	ArcadiaDockingBayHangar: Place;

	ArcadiaEngineeringDeckAft: Place;
	ArcadiaEngineeringDeckAmidships: Place;
	ArcadiaEngineeringDeckForward: Place;

	ArcadiaEscapePod: Place;

	ArcadiaJanitorsCloset: Place;

	ArcadiaLibrary: Place;

	ArcadiaLowerDeckHallAft: Place;
	ArcadiaLowerDeckHallAmidships: Place;
	ArcadiaLowerDeckHallForward: Place;

	ArcadiaUpperDeckHallAft: Place;
	ArcadiaUpperDeckHallAmidships: Place;
	ArcadiaUpperDeckHallForward: Place;

	DeepSpaceEscapePod: Place;

	DeltaurAirlockAntechamber: Place;
	DeltaurAirlockChamber: Place;
	DeltaurAirlockExterior: Place;

	DeltaurArmory: Place;

	DeltaurLaundry: Place;

	DeltaurLowerDeckHallAft: Place;
	DeltaurLowerDeckHallAmidships: Place;
	DeltaurLowerDeckHallFore: Place;

	DeltaurNearbySpace: Place;

	DeltaurShuttleBay: Place;

	DeltaurStarGeneratorChamber: Place;
	DeltaurStarGeneratorChamberCatwalk: Place;

	DeltaurUpperDeckHallAft: Place;
	DeltaurUpperDeckHallAmidships: Place;
	DeltaurUpperDeckHallFore: Place;

	DeltaurVentilationShaft1: Place;
	DeltaurVentilationShaft2: Place;
	DeltaurVentilationShaft3: Place;
	DeltaurVentilationShaft4: Place;

	KeronaCavernsBarrier: Place;
	KeronaCavernsDrips: Place;
	KeronaCavernsElevator: Place;
	KeronaCavernsGeyser: Place;
	KeronaCavernsGrating: Place;
	KeronaCavernsPool: Place;
	KeronaCavernsProjectionRoom: Place;
	KeronaCavernsSteamworks: Place;

	KeronaCliffsBottomNorth: Place;
	KeronaCliffsBottomNortheast: Place;
	KeronaCliffsBottomNorthwestEastSide: Place;
	KeronaCliffsBottomNorthwestWestSide: Place;
	KeronaCliffsBottomSouth: Place;
	KeronaCliffsBottomSoutheast: Place;
	KeronaCliffsBottomSouthwest: Place;

	KeronaCliffsCaveInterior: Place;

	KeronaCliffsTopNorth: Place;
	KeronaCliffsTopNortheast: Place;
	KeronaCliffsTopNorthwest: Place;
	KeronaCliffsTopSouth: Place;
	KeronaCliffsTopSoutheast: Place;
	KeronaCliffsTopSouthwest: Place;

	KeronaDesertCrashSite: Place;
	KeronaDesertDeep: Place;
	KeronaDesertEscapePodInterior: Place;
	KeronaDesertNorth: Place;
	KeronaDesertSouth: Place;
	KeronaDesertWest: Place;

	KeronaEscapePodInterior: Place;

	KeronaUlenceFlatsBarFront: Place;
	KeronaUlenceFlatsBarInterior: Place;
	KeronaUlenceFlatsBarRear: Place;
	KeronaUlenceFlatsDroidsBWeFront: Place;
	KeronaUlenceFlatsDroidsBWeInterior: Place;
	KeronaUlenceFlatsDroidsBWeWest: Place;
	KeronaUlenceFlatsNorthOfTinysUsedShips: Place;
	KeronaUlenceFlatsTinysUsedShips: Place;

	_All: Place[];

	constructor()
	{
		this.ArcadiaBridge = this.arcadiaBridge();

		this.ArcadiaJanitorsCloset = this.arcadiaJanitorsCloset();

		this.ArcadiaDockingBayAntechamber = this.arcadiaDockingBayAntechamber();
		this.ArcadiaDockingBayHangar = this.arcadiaDockingBayHangar();

		this.ArcadiaEngineeringDeckAft = this.arcadiaEngineeringDeckAft();
		this.ArcadiaEngineeringDeckAmidships = this.arcadiaEngineeringDeckAmidships();
		this.ArcadiaEngineeringDeckForward = this.arcadiaEngineeringDeckForward();

		this.ArcadiaEscapePod = this.arcadiaEscapePod();

		this.ArcadiaLibrary = this.arcadiaLibrary();

		this.ArcadiaUpperDeckHallAft = this.arcadiaUpperDeckHallAft();
		this.ArcadiaUpperDeckHallAmidships = this.arcadiaUpperDeckHallAmidships();
		this.ArcadiaUpperDeckHallForward = this.arcadiaUpperDeckHallForward();

		this.ArcadiaLowerDeckHallAft = this.arcadiaLowerDeckHallAft();
		this.ArcadiaLowerDeckHallAmidships = this.arcadiaLowerDeckHallAmidships();
		this.ArcadiaLowerDeckHallForward = this.arcadiaLowerDeckHallForward();

		this.DeepSpaceEscapePod = this.deepSpaceEscapePod();

		this.DeltaurAirlockAntechamber = this.deltaurAirlockAntechamber();
		this.DeltaurAirlockChamber = this.deltaurAirlockChamber();
		this.DeltaurAirlockExterior = this.deltaurAirlockExterior();
		this.DeltaurArmory = this.deltaurArmory();
		this.DeltaurLaundry = this.deltaurLaundry();
		this.DeltaurLowerDeckHallAft = this.deltaurLowerDeckHallAft();
		this.DeltaurLowerDeckHallAmidships = this.deltaurLowerDeckHallAmidships();
		this.DeltaurLowerDeckHallFore = this.deltaurLowerDeckHallFore();
		this.DeltaurNearbySpace = this.deltaurNearbySpace();
		this.DeltaurShuttleBay = this.deltaurShuttleBay();
		this.DeltaurStarGeneratorChamber = this.deltaurStarGeneratorChamber();
		this.DeltaurStarGeneratorChamberCatwalk = this.deltaurStarGeneratorChamberCatwalk();
		this.DeltaurUpperDeckHallAft = this.deltaurUpperDeckHallAft();
		this.DeltaurUpperDeckHallAmidships = this.deltaurUpperDeckHallAmidships();
		this.DeltaurUpperDeckHallFore = this.deltaurUpperDeckHallFore();
		this.DeltaurVentilationShaft1 = this.deltaurVentilationShaft1();
		this.DeltaurVentilationShaft2 = this.deltaurVentilationShaft2();
		this.DeltaurVentilationShaft3 = this.deltaurVentilationShaft3();
		this.DeltaurVentilationShaft4 = this.deltaurVentilationShaft4();

		this.KeronaCavernsBarrier = this.keronaCavernsBarrier();
		this.KeronaCavernsDrips = this.keronaCavernsDrips();
		this.KeronaCavernsElevator = this.keronaCavernsElevator();
		this.KeronaCavernsGeyser = this.keronaCavernsGeyser();
		this.KeronaCavernsGrating = this.keronaCavernsGrating();
		this.KeronaCavernsPool = this.keronaCavernsPool();
		this.KeronaCavernsProjectionRoom = this.keronaCavernsProjectionRoom();
		this.KeronaCavernsSteamworks = this.keronaCavernsSteamworks();

		this.KeronaCliffsBottomNorth = this.keronaCliffsBottomNorth();
		this.KeronaCliffsBottomNortheast = this.keronaCliffsBottomNortheast();
		this.KeronaCliffsBottomNorthwestEastSide = this.keronaCliffsBottomNorthwestEastSide();
		this.KeronaCliffsBottomNorthwestWestSide = this.keronaCliffsBottomNorthwestWestSide();
		this.KeronaCliffsBottomSouth = this.keronaCliffsBottomSouth();
		this.KeronaCliffsBottomSoutheast = this.keronaCliffsBottomSoutheast();
		this.KeronaCliffsBottomSouthwest = this.keronaCliffsBottomSouthwest();

		this.KeronaCliffsCaveInterior = this.keronaCliffsCaveInterior();

		this.KeronaCliffsTopNorth = this.keronaCliffsTopNorth();
		this.KeronaCliffsTopNortheast = this.keronaCliffsTopNortheast();
		this.KeronaCliffsTopNorthwest = this.keronaCliffsTopNorthwest();
		this.KeronaCliffsTopSouth = this.keronaCliffsTopSouth();
		this.KeronaCliffsTopSoutheast = this.keronaCliffsTopSoutheast();
		this.KeronaCliffsTopSouthwest = this.keronaCliffsTopSouthwest();

		this.KeronaDesertCrashSite = this.keronaDesertCrashSite();
		this.KeronaDesertDeep = this.keronaDesertDeep();
		this.KeronaDesertEscapePodInterior = this.keronaDesertEscapePodInterior();
		this.KeronaDesertNorth = this.keronaDesertNorth();
		this.KeronaDesertSouth = this.keronaDesertSouth();
		this.KeronaDesertWest = this.keronaDesertWest();

		this.KeronaUlenceFlatsBarFront = this.keronaUlenceFlatsBarFront();
		this.KeronaUlenceFlatsBarInterior = this.keronaUlenceFlatsBarInterior();
		this.KeronaUlenceFlatsBarRear = this.keronaUlenceFlatsBarRear();
		this.KeronaUlenceFlatsDroidsBWeFront = this.keronaUlenceFlatsDroidsBWeFront();
		this.KeronaUlenceFlatsDroidsBWeInterior = this.keronaUlenceFlatsDroidsBWeInterior();
		this.KeronaUlenceFlatsDroidsBWeWest = this.keronaUlenceFlatsDroidsBWeWest();
		this.KeronaUlenceFlatsNorthOfTinysUsedShips = this.keronaUlenceFlatsNorthOfTinysUsedShips();
		this.KeronaUlenceFlatsTinysUsedShips = this.keronaUlenceFlatsTinysUsedShips();

		this._All =
		[
			this.ArcadiaBridge,
			this.ArcadiaDockingBayAntechamber,
			this.ArcadiaDockingBayHangar,
			this.ArcadiaEngineeringDeckAft,
			this.ArcadiaEngineeringDeckAmidships,
			this.ArcadiaEngineeringDeckForward,
			this.ArcadiaEscapePod,
			this.ArcadiaJanitorsCloset,
			this.ArcadiaLibrary,
			this.ArcadiaLowerDeckHallAft,
			this.ArcadiaLowerDeckHallAmidships,
			this.ArcadiaLowerDeckHallForward,
			this.ArcadiaUpperDeckHallAft,
			this.ArcadiaUpperDeckHallAmidships,
			this.ArcadiaUpperDeckHallForward,

			this.DeepSpaceEscapePod,

			this.DeltaurAirlockAntechamber,
			this.DeltaurAirlockChamber,
			this.DeltaurAirlockExterior,
			this.DeltaurArmory,
			this.DeltaurLaundry,
			this.DeltaurLowerDeckHallAft,
			this.DeltaurLowerDeckHallAmidships,
			this.DeltaurLowerDeckHallFore,
			this.DeltaurNearbySpace,
			this.DeltaurShuttleBay,
			this.DeltaurStarGeneratorChamber,
			this.DeltaurStarGeneratorChamberCatwalk,
			this.DeltaurUpperDeckHallAft,
			this.DeltaurUpperDeckHallAmidships,
			this.DeltaurUpperDeckHallFore,
			this.DeltaurVentilationShaft1,
			this.DeltaurVentilationShaft2,
			this.DeltaurVentilationShaft3,
			this.DeltaurVentilationShaft4,

			this.KeronaCavernsBarrier,
			this.KeronaCavernsDrips,
			this.KeronaCavernsElevator,
			this.KeronaCavernsGeyser,
			this.KeronaCavernsGrating,
			this.KeronaCavernsPool,
			this.KeronaCavernsProjectionRoom,
			this.KeronaCavernsSteamworks,
			this.KeronaCliffsBottomNorth,
			this.KeronaCliffsBottomNortheast,
			this.KeronaCliffsBottomNorthwestEastSide,
			this.KeronaCliffsBottomNorthwestWestSide,
			this.KeronaCliffsBottomSouth,
			this.KeronaCliffsBottomSoutheast,
			this.KeronaCliffsBottomSouthwest,
			this.KeronaCliffsCaveInterior,
			this.KeronaCliffsTopNorth,
			this.KeronaCliffsTopNortheast,
			this.KeronaCliffsTopNorthwest,
			this.KeronaCliffsTopSouth,
			this.KeronaCliffsTopSoutheast,
			this.KeronaCliffsTopSouthwest,
			this.KeronaDesertCrashSite,
			this.KeronaDesertDeep,
			this.KeronaDesertNorth,
			this.KeronaDesertSouth,
			this.KeronaDesertWest,
			this.KeronaEscapePodInterior,
			this.KeronaUlenceFlatsBarFront,
			this.KeronaUlenceFlatsBarInterior,
			this.KeronaUlenceFlatsBarRear,
			this.KeronaUlenceFlatsDroidsBWeFront,
			this.KeronaUlenceFlatsDroidsBWeInterior,
			this.KeronaUlenceFlatsDroidsBWeWest,
			this.KeronaUlenceFlatsNorthOfTinysUsedShips,
			this.KeronaUlenceFlatsTinysUsedShips,
		];
	}

	static _instance: Places;
	static Instance(): Places
	{
		if (Places._instance == null)
		{
			Places._instance = new Places();
		}
		return Places._instance;
	} 

	emplacement(name: string): Emplacement
	{
		return Emplacement.fromNameAndDescription(name, name);
	}

	place2
	(
		name: string,
		description: string
	): Place
	{
		return Place.fromNameDescriptionScriptNameAndObjects
		(
			name,
			description,
			null, // scriptName
			[] // objects
		);
	}

	place
	(
		name: string,
		description: string,
		objects: any[]
	): Place
	{
		return Place.fromNameDescriptionScriptNameAndObjects
		(
			name,
			description,
			null, // scriptName
			objects
		);
	}

	place4
	(
		name: string,
		description: string,
		objects: any[],
		scriptName: string
	): Place
	{
		return Place.fromNameDescriptionScriptNameAndObjects
		(
			name,
			description,
			scriptName,
			objects
		);
	}

	portal(name: string, placeDestinationName: string): Portal
	{
		return new Portal(name, null, placeDestinationName);
	}

	// Places.

	arcadiaBridge(): Place
	{
		return this.place
		(
			this.arcadiaBridge_Name(),

			"This is the command bridge of the starship Arcadia.  "
			+ "A large transparent hemispherical dome arches overhead, "
			+ "showing the brilliantly shining surrounding stars."
			+ "Banks of mostly incomprehensible controls "
			+ "line the circular wall, with the nearby seats "
			+ "either empty or filled with the slumped bodies of dead crew."
			+ "There's several bodies scattered on the floor, as well.  "
			+ "A prominent pedestal in the center "
			+ "formerly held the Star Generator, but now stands vacant.",

			[]
		);
	}

	arcadiaBridge_Name(): string
	{
		return "Arcadia - Bridge";
	}

	arcadiaDockingBayAntechamber(): Place
	{
		return this.place
		(
			this.arcadiaDockingBayAntechamber_Name(),

			"This is the antechamber of the Arcadia's docking bay.  "
			+ "A large airlock door leads to the hangar.  "
			+ "A control console occupies one wall, while "
			+ "on the opposite wall are two closets, with a pair of " 
			+ " buttons at chest height between them. "
			+ " An elevator leads back to the engineering deck.",

			[
				this.portal("airlock", this.arcadiaDockingBayHangar_Name()),
				this.portal("elevator", this.arcadiaEngineeringDeckAft_Name()),

				this.emplacement("controls"),
				this.emplacement("hatch")
			]
		);
	}

	arcadiaDockingBayAntechamber_Name(): string
	{
		return "Arcadia - Docking Bay - Antechamber";
	}

	arcadiaDockingBayHangar(): Place
	{
		return this.place
		(
			this.arcadiaDockingBayHangar_Name(),

			"This is the Arcadia's docking bay hangar.  "
			+ "Though its floor is easily large enough to accomodate "
			+ "a 20-passenger luxury yacht, it is currently empty "
			+ "except for a relatively small hatch in the floor "
			+ "and a control console near the airlock door leading back to the antechamber."
			+ "A similarly gigantic pair of doors at the far end of the bay "
			+ " allows ships to enter and depart when open, "
			+ " and keeps everything safely sheltered when closed.",

			[
				this.portal("door", this.arcadiaDockingBayAntechamber_Name() ),

				this.emplacement("controls"),
				this.emplacement("hatch")
			]
		);
	}

	arcadiaDockingBayHangar_Name(): string
	{
		return "Arcadia - Docking Bay - Hangar";
	}

	arcadiaEngineeringDeckAft(): Place
	{
		return this.place
		(
			this.arcadiaEngineeringDeckAft_Name(),

			"This is the aft end of the Arcadia's engineering deck."
			+ "A passage to fore leads back to the rest of the deck.  "
			+ "In the aft wall is an elevator door, and next to that "
			+ "is a small panel with a slot in it.",

			[
				this.portal("elevator", this.arcadiaDockingBayAntechamber_Name() ),
				this.portal("forward", this.arcadiaEngineeringDeckAmidships_Name() ),

				this.emplacement("slot")
			]
		);
	}

	arcadiaEngineeringDeckAft_Name(): string
	{
		return "Arcadia - Engineering Deck - Aft";
	}

	arcadiaEngineeringDeckAmidships(): Place
	{
		return this.place
		(
			this.arcadiaEngineeringDeckAmidships_Name(),

			"This is the middle of the Arcadia's engineering deck."
			+ "To fore and aft are the other sections of the deck.  "
			+ "Three large transparent domes on the floor cover the tops of "
			+ "the ship's reactor tubes.  These domes are currently pulsing "
			+ "an unsettling reddish-orange, accompanied by a loud "
			+ "and ominous droning sound.  A thick window "
			+ "looks down over the ship's docking bay, with a control console "
			+ "running beneath that window.  The bodies of two crewmen lie on the floor.",

			[
				this.portal("aft", this.arcadiaEngineeringDeckAft_Name()),
				this.portal("forward", this.arcadiaEngineeringDeckForward_Name()),

				this.emplacement("body"),
				this.emplacement("controls"),
				this.emplacement("dome"),
				this.emplacement("window")
			]
		);
	}

	arcadiaEngineeringDeckAmidships_Name(): string
	{
		return "Arcadia - Engineering Deck - Aft";
	}

	arcadiaEngineeringDeckForward(): Place
	{
		return this.place
		(
			this.arcadiaEngineeringDeckForward_Name(),

			"This is the fore end of the Arcadia's engineering deck."
			+ "The rest of the deck lies to aft.  "
			+ "At the fore end, an door opens on an elevator back to the other decks.",

			[
				this.portal("elevator", this.arcadiaLowerDeckHallForward_Name() ),
				this.portal("aft", this.arcadiaEngineeringDeckAmidships_Name() ),

				this.emplacement("slot")
			]
		);
	}

	arcadiaEngineeringDeckForward_Name(): string
	{
		return "Arcadia - Engineering Deck - Forward";
	}

	arcadiaEscapePod(): Place
	{
		return this.place
		(
			this.arcadiaEscapePod_Name(),

			"This is the interior of one of the Arcadia's escape pods."
			+ "Through its front window, you can see the doors of hangar bay."
			+ "Beneath the window is a console with various controls, "
			+ "including a throttle, a monitor screen, and some buttons. "
			+ "A padded seat with safety belts fills the center of the pod's cabin.  "
			+ "A gull-wing door in the left wall of the pod allows entry and exit.  "
			+ "Opposite the door, on the starboard wall, a survival kit is mounted.",

			[
				this.portal("door", this.arcadiaDockingBayHangar_Name() ),

				this.emplacement("autonav button"),
				this.emplacement("buttons"),
				this.emplacement("console"),
				this.emplacement("don't button"),
				this.emplacement("monitor screen"),
				this.emplacement("safety belt"),
				this.emplacement("survival kit"),
				this.emplacement("throttle")
			]
		);
	}

	arcadiaEscapePod_Name(): string
	{
		return "Arcadia - Escape Pod";
	}

	arcadiaJanitorsCloset(): Place
	{
		return this.place
		(
			this.arcadiaJanitorsCloset_Name(),

			"This is a janitor's closet on the starship Arcadia.  "
			+ "It's a bit cramped and uncomfortable for napping in, "
			+ "but, heroically, you make it work.  And you don't "
			+ " just make it work; you make it work a LOT.",

			[
				this.portal("door", this.arcadiaUpperDeckHallAmidships_Name()),
			],

			// todo - script: PlaceArcadiaJanitorsCloset

		);
	}

	arcadiaJanitorsCloset_Name(): string
	{
		return "Arcadia - Janitor's Closet";
	}

	arcadiaLibrary(): Place
	{
		return this.place
		(
			this.arcadiaLibrary_Name(),

			"This is the Arcadia's library.  "
			+ "Doors in the fore and aft walls lead to hallways.  "
			+ "The high walls are occupied almost completely with narrow shelves, "
			+ "and the shelves are occupied almost completely "
			+ "with row after row of data cartridges.  "
			+ "A spacious round table ringed with comfortable seats and cartridge readers "
			+ "fills a pit in the center of the room.  "
			+ "On one wall is a control console with a keyboard and screen, "
			+ "a spiderlike droid clinging to the wall just above it."
			+ "A man wearing a scientist's smock lies face-down "
			+ " on the floor in front of the console. ",

			[
				this.portal("forward", this.arcadiaUpperDeckHallForward_Name() ),
				this.portal("aft", this.arcadiaUpperDeckHallAmidships_Name() ),

				this.emplacement("console"),
				this.emplacement("table"),
				this.emplacement("man")
			]
		);
	}

	arcadiaLibrary_Name(): string
	{
		return "Arcadia - Library";
	}

	arcadiaLowerDeckHallAft(): Place
	{
		return this.place
		(
			this.arcadiaLowerDeckHallAft_Name(),

			"This is a hallway in the spaceship Arcadia.  "
			+ "The hall continues to forward.  "
			+ "There is a door here leading to an elevator.",

			[
				this.portal("aft", this.arcadiaLowerDeckHallAmidships_Name()),
				this.emplacement("body")
			]
		);
	}

	arcadiaLowerDeckHallAft_Name(): string
	{
		return "Arcadia - Lower Deck - Hall - Aft";
	}

	arcadiaLowerDeckHallAmidships(): Place
	{
		return this.place
		(
			this.arcadiaLowerDeckHallAmidships_Name(),

			"This is a hallway in the spaceship Arcadia.  "
			+ "The hall continues to forward and to aft.  "
			+ "In the middle is a door leading to the janitor's closet, "
			+ "which is where you, our hero, came in to this story.",

			[
				this.portal("closet", this.arcadiaJanitorsCloset_Name()),
				this.portal("forward", this.arcadiaLowerDeckHallForward_Name()),
				this.portal("aft", this.arcadiaLowerDeckHallAft_Name())
			]

			// Scripts.Instance().PlaceArcadiaLowerDeckHallAmidshipsUpdate.name
		);
	}

	arcadiaLowerDeckHallAmidships_Name(): string
	{
		return "Arcadia - Lower Deck - Hall - Amidships";
	}

	arcadiaLowerDeckHallForward(): Place
	{
		return this.place
		(
			this.arcadiaLowerDeckHallAft_Name(),

			"This is a hallway in the spaceship Arcadia.  "
			+ "The hall continues to aft.  "
			+ "The body of a dead crewman lies crumpled "
			+ "against the bulkhead at the forward end of the hall.",

			[
				this.portal("aft", this.arcadiaLowerDeckHallAmidships_Name()),
				this.emplacement("body")
			]
		);
	}

	arcadiaLowerDeckHallForward_Name(): string
	{
		return "Arcadia - Lower Deck - Hall - Forward";
	}

	arcadiaUpperDeckHallAft(): Place
	{
		return this.place
		(
			this.arcadiaUpperDeckHallAft_Name(),

			"This is a hallway in the spaceship Arcadia.  "
			+ "The hall continues to forward.  "
			+ "There is a door here leading to an elevator.",

			[
				this.portal("aft", this.arcadiaUpperDeckHallAmidships_Name()),
				this.emplacement("body")
			]
		);
	}

	arcadiaUpperDeckHallAft_Name(): string
	{
		return "Arcadia - Upper Deck - Hall - Aft";
	}

	arcadiaUpperDeckHallAmidships(): Place
	{
		return this.place
		(
			this.arcadiaUpperDeckHallAmidships_Name(),

			"This is a hallway in the spaceship Arcadia.  "
			+ "The hall continues to forward and to aft.  "
			+ "In the middle is a door leading to the janitor's closet, "
			+ "which is where you, our hero, came in to this story.",

			[
				this.portal("closet", this.arcadiaJanitorsCloset_Name()),
				this.portal("forward", this.arcadiaUpperDeckHallForward_Name()),
				this.portal("aft", this.arcadiaUpperDeckHallAft_Name())
			]

			//Scripts.Instance().PlaceArcadiaUpperDeckHallAmidshipsUpdate.name
		);
	}

	arcadiaUpperDeckHallAmidships_Name(): string
	{
		return "Arcadia - Upper Deck - Hall - Amidships";
	}

	arcadiaUpperDeckHallForward(): Place
	{
		return this.place
		(
			this.arcadiaUpperDeckHallAft_Name(),

			"This is a hallway in the spaceship Arcadia.  "
			+ "The hall continues to aft.  "
			+ "The body of a dead crewman lies crumpled "
			+ "against the bulkhead at the forward end of the hall.",

			[
				this.portal("aft", this.arcadiaUpperDeckHallAmidships_Name()),
				this.emplacement("body")
			]
		);
	}

	arcadiaUpperDeckHallForward_Name(): string
	{
		return "Arcadia - Upper Deck - Hall - Forward";
	}

	deepSpaceEscapePod(): Place
	{
		return this.place
		(
			this.deepSpaceEscapePod_Name(),

			"This is the interior of one of the Arcadia's escape pods."
			+ "Through its front window, you can see deep space.  "
			+ "Beneath the window is a console with various controls, "
			+ "including a throttle, a monitor screen, and some buttons. "
			+ "A padded seat with safety belts fills the center of the pod's cabin.  "
			+ "A gull-wing door in the left wall of the pod allows entry and exit.  "
			+ "Opposite the door, on the starboard wall, a survival kit is mounted.",

			[
				this.portal("door", this.arcadiaDockingBayHangar_Name() ),

				this.emplacement("autonav button"),
				this.emplacement("buttons"),
				this.emplacement("console"),
				this.emplacement("don't button"),
				this.emplacement("monitor screen"),
				this.emplacement("safety belt"),
				this.emplacement("survival kit"),
				this.emplacement("throttle")
			]
		);
	}

	deepSpaceEscapePod_Name(): string
	{
		return "Deep Space - Escape Pod";
	}

	deltaurAirlockAntechamber(): Place
	{
		return this.place
		(
			this.deltaurAirlockAntechamber_Name(),

			"This is the antechamber of an airlock on the Deltaur.",

			[
				// todo
			]
		);
	}

	deltaurAirlockAntechamber_Name(): string { return "Deltaur - Airlock - Antechamber"; }

	deltaurAirlockChamber(): Place
	{
		return this.place
		(
			this.deltaurAirlockChamber_Name(),

			"This is the interior of one of the Deltaur's airlocks."
			+ "Doors at either end lead into and out of the Deltaur",

			[
				this.portal("in", this.deltaurAirlockAntechamber_Name() ),
				this.portal("out", this.deltaurAirlockExterior_Name() )
			]
		);
	}

	deltaurAirlockChamber_Name(): string { return "Deltaur - Airlock - Chamber"; }

	deltaurAirlockExterior(): Place
	{
		return this.place
		(
			this.deltaurAirlockExterior_Name(),

			"This is the exterior of the Deltaur, near an airlock door.  "
			+ "The boundless sweep of space spreads out in all directions.",

			[
				this.portal("door", this.deltaurAirlockChamber_Name() ),
			]
		);
	}

	deltaurAirlockExterior_Name(): string { return "Deltaur - Exterior - Airlock Door"; }

	deltaurArmory(): Place
	{
		return this.place
		(
			this.deltaurArmory_Name(),

			"This is the armory of the Deltaur."
			+ "At the aft end high counter, with a robot standing watch behind it, "
			+ "blocks the path to the weapon racks.  A door to forward leads back "
			+ "out onto the catwalk above the Star Generator chamber.",

			[
				this.portal("forward", this.deltaurStarGeneratorChamberCatwalk_Name() )
			]
		);
	}

	deltaurArmory_Name(): string { return "Deltaur - Armory"; }

	deltaurLaundry(): Place
	{
		return this.place
		(
			this.deltaurLaundry_Name(),

			"This is a laundry room on the Deltaur.",

			[
				// todo
			]
		);
	}

	deltaurLaundry_Name(): string { return "Deltaur - Laundry"; }

	deltaurLowerDeckHallAft(): Place
	{
		return this.place
		(
			this.deltaurLowerDeckHallAft_Name(),

			"This is the aft end of a hallway on the lower deck of the Deltaur.",

			[
				this.portal("forward", this.deltaurLowerDeckHallAmidships_Name() )
			]
		);
	}

	deltaurLowerDeckHallAft_Name(): string { return "Deltaur - Hall - Lower Deck - Aft"; }

	deltaurLowerDeckHallAmidships(): Place
	{
		return this.place
		(
			this.deltaurLowerDeckHallAmidships_Name(),

			"This is the amidships section of a hallway on the lower deck of the Deltaur.",

			[
				this.portal("aft", this.deltaurLowerDeckHallAft_Name() ),
				this.portal("forward", this.deltaurLowerDeckHallFore_Name() )
			]
		);
	}

	deltaurLowerDeckHallAmidships_Name(): string { return "Deltaur - Hall - Lower Deck - Amidships"; }

	deltaurLowerDeckHallFore(): Place
	{
		return this.place
		(
			this.deltaurLowerDeckHallFore_Name(),

			"This is the forward end of a hallway on the lower deck of the Deltaur.",

			[
				this.portal("aft", this.deltaurLowerDeckHallAmidships_Name() ),
			]
		);
	}

	deltaurLowerDeckHallFore_Name(): string { return "Deltaur - Hall - Lower Deck - Forward"; }

	deltaurNearbySpace(): Place
	{
		return this.place
		(
			this.deltaurNearbySpace_Name(),

			"You are in your ship, hovering nearby the Deltaur.",

			[
				this.portal("out", this.deltaurAirlockExterior_Name() ),
			]
		);
	}

	deltaurNearbySpace_Name(): string { return "Deltaur - Nearby Space"; }

	deltaurShuttleBay(): Place
	{
		return this.place
		(
			this.deltaurShuttleBay_Name(),

			"This is the shuttle bay of the Deltaur.",

			[
				// todo
			]
		);
	}

	deltaurShuttleBay_Name(): string { return "Deltaur - Shuttle Bay"; }

	deltaurStarGeneratorChamber(): Place
	{
		return this.place
		(
			this.deltaurStarGeneratorChamber_Name(),

			"This is a cavernous room on the Deltaur.  "
			+ "The Star Generator is mounted on a pedestal, "
			+ "with an armed guard standing nearby.  "
			+ "A catwalk runs overhead.",

			[
				// todo
			]
		);
	}

	deltaurStarGeneratorChamber_Name(): string { return "Deltaur - Star Generator Chamber"; }

	deltaurStarGeneratorChamberCatwalk(): Place
	{
		return this.place
		(
			this.deltaurStarGeneratorChamberCatwalk_Name(),

			"You are standing on a railed catwalk above a "
			+ " cavernous chamber on the Deltaur.  "
			+ "On the floor, far below, the Star Generator"
			+ "is mounted on a pedestal, "
			+ "with an armed guard standing nearby.  "
			+ "The catwalk runs fore and aft.",

			[
				this.portal("aft", this.deltaurArmory_Name()),
				this.portal("forward", "todo"),
			]
		);
	}

	deltaurStarGeneratorChamberCatwalk_Name(): string { return "Deltaur - Star Generator Chamber - Catwalk"; }

	deltaurUpperDeckHallAft(): Place
	{
		return this.place
		(
			this.deltaurUpperDeckHallAft_Name(),

			"This is the aft end of a hallway on the upper deck of the Deltaur.",

			[
				this.portal("forward", this.deltaurUpperDeckHallAmidships_Name() ),
			]
		);
	}

	deltaurUpperDeckHallAft_Name(): string { return "Deltaur - Hall - Upper Deck - Aft"; }

	deltaurUpperDeckHallAmidships(): Place
	{
		return this.place
		(
			this.deltaurUpperDeckHallAmidships_Name(),

			"This is the amidships section of a hallway "
			+ "on the upper deck of the Deltaur.",

			[
				this.portal("aft", this.deltaurUpperDeckHallAft_Name() ),
				this.portal("forward", this.deltaurUpperDeckHallFore_Name() ),
			]
		);
	}

	deltaurUpperDeckHallAmidships_Name(): string { return "Deltaur - Hall - Upper Deck - Amidships"; }

	deltaurUpperDeckHallFore(): Place
	{
		return this.place
		(
			this.deltaurUpperDeckHallFore_Name(),

			"This is the forward end of a hallway on the upper deck of the Deltaur.",

			[
				this.portal("aft", this.deltaurUpperDeckHallAmidships_Name() ),
			]
		);
	}

	deltaurUpperDeckHallFore_Name(): string { return "Deltaur - Hall - Upper Deck - Forward"; }

	deltaurVentilationShaft1(): Place
	{
		return this.place
		(
			this.deltaurVentilationShaft1_Name(),

			"This is a ventilation shaft on the Deltaur.  "
			+ "A short side branch leads to a vent cover.",

			[
				this.portal("back", this.deltaurVentilationShaft4_Name() ),
				this.portal("forward", this.deltaurVentilationShaft1_Name() ),
				this.portal("vent", this.deltaurAirlockAntechamber_Name() )
			]
		);
	}

	deltaurVentilationShaft1_Name(): string { return "Deltaur - Ventilation Shaft - 1"; }

	deltaurVentilationShaft2(): Place
	{
		return this.place
		(
			this.deltaurVentilationShaft2_Name(),

			"This is a ventilation shaft on the Deltaur.  "
			+ "A short side branch leads to a vent cover.",

			[
				this.portal("back", this.deltaurVentilationShaft1_Name() ),
				this.portal("forward", this.deltaurVentilationShaft3_Name() ),
				this.portal("vent", this.deltaurLaundry_Name() )
			]
		);
	}

	deltaurVentilationShaft2_Name(): string { return "Deltaur - Ventilation Shaft - 2"; }

	deltaurVentilationShaft3(): Place
	{
		return this.place
		(
			this.deltaurVentilationShaft3_Name(),

			"This is a featureless stretch of ventilation shaft on the Deltaur.",

			[
				this.portal("back", this.deltaurVentilationShaft2_Name() ),
				this.portal("forward", this.deltaurVentilationShaft4_Name() )
			]
		);
	}

	deltaurVentilationShaft3_Name(): string { return "Deltaur - Ventilation Shaft - 3"; }

	deltaurVentilationShaft4(): Place
	{
		return this.place
		(
			this.deltaurVentilationShaft4_Name(),

			"This is a featureless stretch of ventilation shaft on the Deltaur.",

			[
				this.portal("back", this.deltaurVentilationShaft3_Name() ),
				this.portal("forward", this.deltaurVentilationShaft1_Name() )
			]
		);
	}

	deltaurVentilationShaft4_Name(): string { return "Deltaur - Ventilation Shaft - 4"; }

	keronaCavernsBarrier(): Place
	{
		return this.place
		(
			this.keronaCavernsBarrier_Name(),

			"You are in a cavern deep beneath the desert of the planet Kerona.  "
			+ "The path to the west is blocked by several closely spaced "
			+ "and intensely bright beams of light,"
			+ "which are emitted from small round ports the rock walls, "
			+ "and which pass into similar ports on the other side.  "
			+ "A passage leads back to the east.",

			[
				this.portal("east", this.keronaCavernsPool_Name() ),
				this.portal("west", this.keronaCavernsGeyser_Name() )
			]
		);
	}

	keronaCavernsBarrier_Name(): string { return "Kerona - Caverns - Barrier"; }

	keronaCavernsDrips(): Place
	{
		return this.place
		(
			this.keronaCavernsDrips_Name(),

			"You are in a cavern deep beneath the desert of the planet Kerona.  "
			+ "The passage runs to the east, where drips of a clear liquid "
			+ "fall intermittently from the ceiling.  "
			+ "Each drip passes into a small, precise hole in the floor "
			+ "that appears as if it were made to fit it."
			+ "A passage leads back to the west.",
			
			[
				this.portal("east", this.keronaCavernsProjectionRoom_Name() ),
				this.portal("west", this.keronaCavernsBarrier_Name() )
			]
		);
	}

	keronaCavernsDrips_Name(): string { return "Kerona - Caverns - Drips"; }

	keronaCavernsElevator(): Place
	{
		return this.place
		(
			this.keronaCavernsElevator_Name(),

			"You stand at the bottom of the elevator that brought you down "
			+ "from the cliffs of Kerona to a cool, dark, rocky cavern.  "
			+ "The elevator door lies at the east side of the passage.  "
			+ "From there, the passage runs to the west.",

			[
				this.portal("west", this.keronaCavernsGrating_Name() )
			]
		);
	}

	keronaCavernsElevator_Name(): string { return "Kerona - Caverns - Elevator"; }

	keronaCavernsGeyser(): Place
	{
		return this.place
		(
			this.keronaCavernsGeyser_Name(),

			"You are in a cavern deep beneath the desert of the planet Kerona.  "
			+ "The passage to the west ends abruptly in a solid rock wall."
			+ "Nearby, a small geyser shoots wetly and steamily out of a hole "
			+ " in the top of a stalagmite."
			+ "Another passage leads back east.",

			[
				this.portal("west", this.keronaCavernsPool_Name() ),
				this.portal("east", this.keronaCavernsGrating_Name() )
			]
		);
	}

	keronaCavernsGeyser_Name(): string { return "Kerona - Caverns - Geyser"; }

	keronaCavernsGrating(): Place
	{
		return this.place
		(
			this.keronaCavernsGrating_Name(),

			"You are in a cavern deep beneath the desert of the planet Kerona, "
			+ "in a passage running from east to west."
			+ "In the floor leading to the west, a thick metal grating "
			+ "perforated with holes about 10 centimeters wide "
			+ "stretches from wall to wall across the entire passage. ",

			[
				this.portal("west", this.keronaCavernsGeyser_Name() ),
				this.portal("east", this.keronaCavernsElevator_Name() )
			]
		);
	}

	keronaCavernsGrating_Name(): string { return "Kerona - Caverns - Grating"; }

	keronaCavernsPool(): Place
	{
		return this.place
		(
			this.keronaCavernsPool_Name(),

			"You are in a cavern deep beneath the desert of the planet Kerona. "
			+ "You stand on a wide ledge that runs south, back through a hidden doorway, "
			+ " where a plugged geyser steams fitfully.  To the west, the ledge runs "
			+ "through dark natural stone columns and on into the darkness.  "
			+ "Far below the ledge is a pool of clear liquid, "
			+ "with drips falling from holes in the ceiling to fill it.  "
			+ "A passage leads back to the east.",

			[
				this.portal("west", this.keronaCavernsBarrier_Name() ),
				this.portal("east", this.keronaCavernsGeyser_Name() )
			]
		);
	}

	keronaCavernsPool_Name(): string { return "Kerona - Caverns - Pool"; }

	keronaCavernsProjectionRoom(): Place
	{
		return this.place
		(
			this.keronaCavernsProjectionRoom_Name(),

			"You are in a cavern deep beneath the desert of the planet Kerona. "
			+ "This space is completely dark at the moment.  Earlier, it was lit only " 
			+ "by a holographic projection of a triangular-headed alien.  "
			+ "A passage leads back to the east.",

			[
				this.portal("east", this.keronaCavernsBarrier_Name() ),
				this.portal("west", this.keronaCavernsSteamworks_Name() )
			]
		);
	}

	keronaCavernsProjectionRoom_Name(): string { return "Kerona - Caverns - Projection Room"; }

	keronaCavernsSteamworks(): Place
	{
		return this.place
		(
			this.keronaCavernsSteamworks_Name(),

			"You are in a cavern deep beneath the desert of the planet Kerona. "
			+ "Arrays of giant metal pistons pump noisily away, leaking wisps of steam. "
			+ "A computer console with a monitor and standard data cartridge slot "
			+ "stands against the north wall.  Above it is a catwalk where members "
			+ "of a gray-skinned, large-eyed, triangular-headed alien species "
			+ "busily operate various inscrutable control systems."
			+ "To the west is a small, garage-like space, with a door at the end "
			+ "that appears to open onto a large elevator platform.",

			[
				this.portal("east", this.keronaCavernsProjectionRoom_Name() ),
			]
		);
	}

	keronaCavernsSteamworks_Name(): string { return "Kerona - Caverns - Steamworks"; }

	keronaCliffsBottomNorth(): Place
	{
		return this.place
		(
			this.keronaCliffsBottomNorth_Name(),

			"You stand on the sand of the Kerona desert, just to the south  "
			+ "of a steep stone cliff running from west to east. ",

			[
				this.portal("south", this.keronaCliffsBottomSouth_Name()),
				this.portal("west", this.keronaCliffsBottomNorthwestEastSide_Name()),
				this.portal("east", this.keronaCliffsBottomNortheast_Name())
			]
		);
	}

	keronaCliffsBottomNorth_Name(): string { return "Kerona - Cliffs - North" };

	keronaCliffsBottomNortheast(): Place
	{
		return this.place
		(
			this.keronaCliffsBottomNortheast_Name(),

			"You stand on the sand of the Kerona desert, just to the south  "
			+ "of a steep stone cliff running from the west "
			+ "and ending just to the east.  "
			+ "Above, on the clifftop, two large stone pillars stand about four meters "
			+ "apart from each other.  As they rise, they bend toward each other like horns, "
			+ "with jagged, broken tops.  "
			+ "\n\n"
			+ "To the east, the sand stretches away as far as you can see.",

			[
				this.portal("south", this.keronaCliffsBottomSouth_Name()),
				this.portal("west", this.keronaCliffsBottomNorthwestEastSide_Name()),
				this.portal("east", this.keronaDesertDeep_Name())
			]
		);
	}

	keronaCliffsBottomNortheast_Name(): string { return "Kerona - Cliffs - Northeast" };

	keronaCliffsBottomNorthwestEastSide(): Place
	{
		return this.place
		(
			this.keronaCliffsBottomNorthwestEastSide_Name(),

			"You stand on the sand of the Kerona desert, at the base  "
			+ "of a sheer stone cliff that curves away to the south and east.  ",

			[
				this.portal("south", this.keronaCliffsBottomNorth_Name()),
				this.portal("east", this.keronaCliffsBottomSouthwest_Name())
			]
		);
	}

	keronaCliffsBottomNorthwestEastSide_Name(): string { return "Kerona - Cliffs - Northwest - East Side" };

	keronaCliffsBottomNorthwestWestSide(): Place
	{
		return this.place
		(
			this.keronaCliffsBottomNorthwestWestSide_Name(),

			"You stand on the sand of the Kerona desert, at the base  "
			+ "of a sheer stone cliff that curves away to the south and east,  "
			+ "and which blocks passage to the east.  "
			+ "The site where your escape pod crashed is to the west."
			+ "To the south, more cliffs are visible. "
			+ " The desert stretches away to the north, and west.",

			[
				this.portal("south", this.keronaCliffsBottomSouth_Name()),
				this.portal("west", this.keronaDesertCrashSite_Name()),
				this.emplacement
				(
					"hole"

					// "This is a hole in the side of the cliff face, "
					// + "about 40 centimeters in diameter.  Its interior is "
					// + "deeply shadowed, making it impossible to see what, "
					// + "if anything, might be inside it."
				)
			]
		);
	}

	keronaCliffsBottomNorthwestWestSide_Name(): string
	{
		return "Kerona - Cliffs - Northwest - West Side"
	};

	keronaCliffsBottomSouth(): Place
	{
		return this.place
		(
			this.keronaCliffsBottomSouth_Name(),

			"todo",

			[
				this.portal("east", this.keronaCliffsBottomSoutheast_Name() ),
				this.portal("north", this.keronaCliffsBottomNorth_Name() ),
				this.portal("west", this.keronaCliffsBottomSouthwest_Name() ),
			]
		);
	}

	keronaCliffsBottomSouth_Name(): string { return "Kerona - Cliffs - South" };

	keronaCliffsBottomSoutheast(): Place
	{
		return this.place
		(
			this.keronaCliffsBottomSoutheast_Name(),

			"You stand on a clear stretch of sand amid a formation of stone cliffs.  "
			+ "The sandy surface of the desert runs to the north and to the west. "
			+ "To the east is a tall, confused jumble of rocks, "
			+ " in which a large, shadowy cave mouth opens."
			+ "On the west side of the clearing, a stone slope rises jaggedly "
			+ "upward between jutting upright stones, climbing as it runs northward.",

			[
				this.portal("north", this.keronaCliffsBottomSouth_Name() ),
				this.portal("west", this.keronaCliffsBottomSouth_Name() ),
				this.portal("east", this.keronaCliffsCaveInterior_Name() ),
				this.portal("slope", this.keronaCliffsTopNortheast_Name() )
			]
		);
	}

	keronaCliffsBottomSoutheast_Name(): string { return "Kerona - Cliffs - Southeast" };

	keronaCliffsBottomSouthwest(): Place
	{
		return this.place
		(
			this.keronaCliffsBottomSouthwest_Name(),

			"todo",

			[
				this.portal("east", this.keronaCliffsBottomSouth_Name() ),
				this.portal("north", this.keronaCliffsBottomNorthwestEastSide_Name() )
			]
		);
	}

	keronaCliffsBottomSouthwest_Name(): string { return "Kerona - Cliffs - Southwest" };

	keronaCliffsCaveInterior() : Place
	{
		return this.place
		(
			this.keronaCliffsCaveInterior_Name(),

			"This is a cool, dark cave.  Mossy vegetation clings to the rocks.  "
			+ "To the west the cave opens out into the blazing daylight "
			+ "of the Kerona desert.",

			[
				this.portal("west", this.keronaCliffsBottomSoutheast_Name() ),
			]
		);
	}

	keronaCliffsCaveInterior_Name() : string { return "Kerona - Cliffs - Cave - Interior"; }

	keronaCliffsTopNorth() : Place
	{
		return this.place
		(
			this.keronaCliffsTopNorth_Name(),

			"You stand atop a cliff rising from the desert of the planet Kerona.",

			[
				this.portal("east", this.keronaCliffsBottomNortheast_Name() ),
				this.portal("south", this.keronaCliffsBottomSouth_Name() ),
				this.portal("west", this.keronaCliffsBottomNorthwestWestSide_Name() )
			]
		);
	}

	keronaCliffsTopNorth_Name() : string { return "Kerona - Cliffs - Top - North"; }

	keronaCliffsTopNortheast() : Place
	{
		return this.place
		(
			this.keronaCliffsTopNortheast_Name(),

			"You stand atop a cliff rising from the desert of the planet Kerona.  "
			+ "A pair of bent stone columns rises, bending toward each other like horns.",

			[
				this.portal("south", this.keronaCliffsBottomSoutheast_Name() ),
				this.portal("west", this.keronaCliffsBottomNorth_Name() )
			]
		);
	}

	keronaCliffsTopNortheast_Name() : string { return "Kerona - Cliffs - Top - Northeast"; }

	keronaCliffsTopNorthwest() : Place
	{
		return this.place
		(
			this.keronaCliffsTopNorthwest_Name(),

			"You stand atop a cliff rising from the desert of the planet Kerona.",

			[
				this.portal("east", this.keronaCliffsBottomNorth_Name() ),
				this.portal("south", this.keronaCliffsBottomSouthwest_Name() )
			]
		);
	}

	keronaCliffsTopNorthwest_Name() : string { return "Kerona - Cliffs - Top - Northwest"; }

	keronaCliffsTopSouth() : Place
	{
		return this.place
		(
			this.keronaCliffsTopSouth_Name(),

			"You stand atop a cliff rising from the desert of the planet Kerona.",

			[
				this.portal("east", this.keronaCliffsBottomSoutheast_Name() ),
				this.portal("north", this.keronaCliffsBottomNorth_Name() ),
				this.portal("west", this.keronaCliffsBottomSouthwest_Name() )
			]
		);
	}

	keronaCliffsTopSouth_Name() : string { return "Kerona - Cliffs - Top - South"; }

	keronaCliffsTopSoutheast() : Place
	{
		return this.place
		(
			this.keronaCliffsTopSoutheast_Name(),

			"You stand atop a cliff rising from the desert of the planet Kerona.",

			[
				this.portal("north", this.keronaCliffsBottomNortheast_Name() ),
				this.portal("west", this.keronaCliffsBottomSouth_Name() )
			]
		);
	}

	keronaCliffsTopSoutheast_Name() : string { return "Kerona - Cliffs - Top - Southeast"; }

	keronaCliffsTopSouthwest() : Place
	{
		return this.place
		(
			this.keronaCliffsTopSouthwest_Name(),

			"You stand atop a cliff rising from the desert of the planet Kerona",

			[
				// todo
			]
		);
	}

	keronaCliffsTopSouthwest_Name() : string { return "Kerona - Cliffs - Top - Southwest"; }

	keronaDesertCrashSite() : Place
	{
		return this.place
		(
			this.keronaDesertCrashSite_Name(),

			"Your escape pod has crashed in the middle of the desert "
			+ "of the planet Kerona, rendering it completely inoperable.  "
			+ "Its structural frame is severely bent, and the door unclosable.  "
			+ "The forward window has shattered, "
			+ "scattering shards of highly reflective glass over the sand "
			+ "in front of the pod."
			+ "\n\n"
			+ "The desert stretches away as far as the eye can see to the "
			+ "north, west, and south.  A maze of rocky cliffs rises to the east.",

			[]
		);
	}

	keronaDesertCrashSite_Name(): string { return "Kerona - Desert - Crash Site"; }

	keronaDesertDeep() : Place
	{
		return this.place
		(
			this.keronaDesertDeep_Name(),

			"You stand in the trackless desert of the planet Kerona, "
			+ "The featureless sand stretches away in every direction.",

			[]

			// Scripts.placeKeronaDesertDeepUpdate.name
		)
	}

	keronaDesertDeep_Name(): string { return "Kerona - Desert - Deep Desert"; }

	keronaDesertEscapePodInterior() : Place
	{
		return this.place
		(
			this.keronaDesertEscapePodInterior_Name(),

			"You sit inside your escape pod where it has crashed on the surface "
			+ "of the desert planet Kerona.  The pod's controls are dark and silent. "
			+ "The forward window was shattered in the crash.  "
			+ "Through the web of cracks and gaps, the yellow "
			+ "sand of the desert stretches away before you, seemingly forever.  "
			+ "The door of the pod is open, and, due to structural damage "
			+ "incurred during the crash, cannot be closed.  The hot, dry "
			+ "desert air floods the pod, causing you to sweat profusely.",

			[
				this.portal("door", this.keronaDesertCrashSite_Name() )
			]
		);
	}

	keronaDesertEscapePodInterior_Name(): string { return "Kerona - Desert - Escape Pod Interior"; }

	keronaDesertNorth() : Place
	{
		return this.place
		(
			this.keronaDesertNorth_Name(),

			"You stand in the trackless desert of the planet Kerona, "
			+ "just north of the wreck of your crashed escape pod.  "
			+ "The featureless sand stretches away in every other direction.",

			[
				this.portal("south", this.keronaDesertCrashSite_Name() ),
				this.portal("north", this.keronaDesertDeep_Name() ),
				this.portal("east", this.keronaDesertDeep_Name() ),
				this.portal("west", this.keronaDesertDeep_Name() ),
			]
		);
	}

	keronaDesertNorth_Name(): string { return "Kerona - Desert - North of Crash Site"; }

	keronaDesertSouth() : Place
	{
		return this.place
		(
			this.keronaDesertSouth_Name(),

			"You stand in the trackless desert of the planet Kerona, "
			+ "just south of the wreck of your crashed escape pod.  "
			+ "The featureless sand stretches away in every other direction.",

			[
				this.portal("north", this.keronaDesertCrashSite_Name() ),
				this.portal("south", this.keronaDesertDeep_Name() ),
				this.portal("east", this.keronaDesertDeep_Name() ),
				this.portal("west", this.keronaDesertDeep_Name() ),
			]
		);
	}

	keronaDesertSouth_Name(): string { return "Kerona - Desert - South of Crash Site"; }

	keronaDesertWest() : Place
	{
		return this.place
		(
			this.keronaDesertWest_Name(),

			"You stand in the trackless desert of the planet Kerona, "
			+ "just west of the wreck of your crashed escape pod.  "
			+ "The featureless sand stretches away in every other direction.",

			[
				this.portal("east", this.keronaDesertCrashSite_Name() ),
				this.portal("north", this.keronaDesertDeep_Name() ),
				this.portal("south", this.keronaDesertDeep_Name() ),
				this.portal("west", this.keronaDesertDeep_Name() ),
			]
		);
	}

	keronaDesertWest_Name(): string { return "Kerona - Desert - West of Crash Site"; }

	keronaUlenceFlatsBarFront() : Place
	{
		return this.place
		(
			this.keronaUlenceFlatsBarFront_Name(),

			"You stand in the tiny settlement of Ulence Flats.  "
			+ "To the east stands a concrete igloo with an arched entrance, "
			+ "above which is a lighted sign that says 'BAR' in "
			+ "several of the more common languages of this sector of space."
			+ "Several spaceships, presumably belonging to the bar's patrons,"
			+ "stand nearby."
			+ "\n\n"
			+ "To the west, you can see another, similar building, with a few more "
			+ "run-down looking spaceships in front of it, and decorated with "
			+ "strings of cheap but festive plastic pennants."
			+ "\n\n"
			+ "Away to the north is the edge of yet another domelike building, "
			+ "possibly a store of some sort."
			+ "\n\n"
			+ "To the south, a faint shimmer in the air betrays the forcefield "
			+ "that protects this settlement from the native predatory sand-swimmers.",

			[
				this.portal("north", this.keronaUlenceFlatsDroidsBWeWest_Name() ),
				this.portal("west", this.keronaUlenceFlatsTinysUsedShips_Name() ),
				this.portal("east", this.keronaUlenceFlatsBarRear_Name() ),
				this.portal("south", this.keronaDesertDeep_Name() )
			]
		);
	}

	keronaUlenceFlatsBarFront_Name(): string { return "Kerona - Ulence Flats - Bar - Front"; }

	keronaUlenceFlatsBarInterior() : Place
	{
		return this.place
		(
			this.keronaUlenceFlatsBarInterior_Name(),

			"You stand inside the Ulence Flats bar.  "
			+ "On a small stage, a band of garishly dressed bipeds loudly plays "
			+ "what you can only assume is a song, "
			+ "and that you can only assume to be one of their hits.  "
			+ "A bar runs along the opposite wall, where a harried bartender "
			+ "delivers drinks to patrons seated on stools, "
			+ "some of whom are engaged in conversation, or at least reciprocal bluster.  "
			+ "A cabinet housing some sort of video gambling machine stands in the back.  "
			+ "A squat cleaning robot busily sweeps the floor around the machine, "
			+ "and periodically empties a load of its sweepings into a hatch in the back wall.",

			[
				this.portal("north", this.keronaUlenceFlatsDroidsBWeWest_Name() ),
				this.portal("west", this.keronaUlenceFlatsTinysUsedShips_Name() ),
				this.portal("east", this.keronaUlenceFlatsBarRear_Name() ),
				this.portal("south", this.keronaDesertDeep_Name() ),

				this.emplacement("band"),
				this.emplacement("bar"),
				this.emplacement("heap"),
				this.emplacement("machine"),
				this.emplacement("bartender"),
				this.emplacement("patrons")
			]
		);
	}

	keronaUlenceFlatsBarInterior_Name(): string { return "Kerona - Ulence Flats - Bar - Interior"; }

	keronaUlenceFlatsBarRear() : Place
	{
		return this.place
		(
			this.keronaUlenceFlatsBarRear_Name(),

			"You stand behind the Ulence Flats bar.  "
			+ "It is somewhat secluded here."
			+ "Force-fields block access to the surrounding desert to the east and south.  "
			+ "You can see another, larger building to the north.  "
			+ "At irregular intervals, a hatch in the back wall of the bar opens "
			+ "and expels some fine white powder, "
			+ "which settles onto a larger heap of powder below.",

			[
				this.portal("north", this.keronaUlenceFlatsDroidsBWeWest_Name() ),
				this.portal("west", this.keronaUlenceFlatsTinysUsedShips_Name() ),
				this.portal("east", this.keronaUlenceFlatsBarRear_Name() ),

				this.emplacement("heap")
			]
		);
	}

	keronaUlenceFlatsBarRear_Name(): string { return "Kerona - Ulence Flats - Bar - Rear"; }

	keronaUlenceFlatsDroidsBWeFront(): Place
	{
		return this.place
		(
			this.keronaUlenceFlatsDroidsBWeFront_Name(),

			"You stand in the desert settlement of Ulence Flats, "
			+ "to the south of the entrance of a domed building "
			+ "bearing the sign 'Droids-B-We'.",

			[
				// todo
			]
		);
	}

	keronaUlenceFlatsDroidsBWeFront_Name(): string { return "Kerona - Droids-B-We - Front"; }

	keronaUlenceFlatsDroidsBWeInterior(): Place
	{
		return this.place
		(
			this.keronaUlenceFlatsDroidsBWeInterior_Name(),

			"You stand inside the Ulence Flats branch of 'Droids-B-We'. "
			+ "Various inactive robots are displayed on pedestals, "
			+ "each bearing a more-or-less conspicious price tag.  "
			+ "A salesbeing watches you idly, perhaps waiting to see if you require assistance.  "
			+ "In the south wall is the door leading back outside.",

			[
				// todo
			]
		);
	}

	keronaUlenceFlatsDroidsBWeInterior_Name(): string { return "Kerona - Droids-B-We - Interior"; }

	keronaUlenceFlatsDroidsBWeWest(): Place
	{
		return this.place
		(
			this.keronaUlenceFlatsDroidsBWeWest_Name(),

			"You stand in the desert settlement of Ulence Flats, "
			+ "to the west of a large domed building.  "
			+ "A smaller domed building housing a bar lies to the south. "
			+ "Further to the west you see a spaceship standing "
			+ "at the northern edge of a brightly decorated lot containing several more ships."
			+ "A force field blocks access to the open desert to the north. ",

			[
				// todo
			]
		);
	}

	keronaUlenceFlatsDroidsBWeWest_Name(): string { return "Kerona - Droids-B-We - West"; }

	keronaUlenceFlatsNorthOfTinysUsedShips(): Place
	{
		return this.place
		(
			this.keronaUlenceFlatsNorthOfTinysUsedShips_Name(),

			"You stand in the desert settlement of Ulence Flats.  "
			+ "You see a spaceship standing here, and, to the south,"
			+ "a brightly decorated lot containing several more ships."
			+ " To the east, you see a large domed building. "
			+ "A smaller domed building with a sign that says 'Bar' lies to the southeast. "
			+ "A force field blocks access to the open desert to the north and west.",

			[
				// todo
			]
		);
	}

	keronaUlenceFlatsNorthOfTinysUsedShips_Name(): string
	{
		return "Kerona - Ulence Flats - North of Tiny's Used Ships";
	}

	keronaUlenceFlatsTinysUsedShips(): Place
	{
		return this.place
		(
			this.keronaUlenceFlatsNorthOfTinysUsedShips_Name(),

			"You stand in the desert settlement of Ulence Flats, "
			+ "in a sandy lot brighly decorated with colorful pennants "
			+ " strung along lines, and containing several ships in various states of wear."
			+ "Just to the north you see another ship standing by itself."
			+ "At one edge of the lot is a small cubical building "
			+ "bearing a sign that says, 'Tiny's Used Ships'."
			+ "A domed building with a sign that says 'Bar' stands to the east. "
			+ "A larger domed building stands to the northeast. "
			+ "A force field blocks access to the open desert to the south and west. ",

			[
				// todo
			]
		);
	}

	keronaUlenceFlatsTinysUsedShips_Name(): string
	{
		return "Kerona - Ulence Flats - Tiny's Used Ships";
	}

}

class Scripts
{
	AgentSarienTalkTo: Script;
	EmplacementDeadCrewpersonUse: Script;
	ItemKeycardUse: Script;
	PlaceArcadiaJanitorsClosetUpdate: Script;

	_All: Script[];

	constructor()
	{
		var s = (a: string, b: any) => new Script(a, b);

		this.AgentSarienTalkTo = s("AgentSarienTalkTo", this.agentSarienTalkTo);
		this.EmplacementDeadCrewpersonUse = s
		(
			"EmplacementDeadCrewpersonUse",
			this.emplacementDeadCrewpersonUse
		);
		this.ItemKeycardUse = s("ItemKeycardUse", this.itemKeycardUse);
		this.PlaceArcadiaJanitorsClosetUpdate = s
		(
			"PlaceArcadiaJanitorsClosetUpdate",
			this.placeArcadiaJanitorsClosetUpdate
		);

		this._All =
		[
			this.AgentSarienTalkTo,
			this.EmplacementDeadCrewpersonUse,
			this.ItemKeycardUse,
			this.PlaceArcadiaJanitorsClosetUpdate
		];
	}

	static _instance: Scripts;
	static Instance(): Scripts
	{
		if (Scripts._instance == null)
		{
			Scripts._instance = new Scripts();
		}
		return Scripts._instance;
	}

	agentSarienTalkTo(u: Universe, w: World, p: Place, agent: any): void
	{
		var message = "The Sarien's only response is to disintegrate you."
		w.isOver = true;

		u.messageEnqueue(message);
	}

	emplacementDeadCrewpersonUse
	(
		u: Universe, w: World, place: Place,
		emplacementDeadCrewperson: any, target: any
	): void
	{
		var message: string;

		if (target != null)
		{
			message = "You can't use the crewperson's body on anything.";
		}
		else
		{
			message = "You find a keycard in the crewperson's pockets.";

			var itemKeycard = Item.fromNameAndDescription
			(
				"keycard", "This is an access keycard for the starship Arcadia."
			);
			place.itemAdd(itemKeycard);

			emplacementDeadCrewperson._scriptUseName = null;
		}

		u.messageEnqueue(message);
	}

	itemKeycardUse(u: Universe, w: World, p: Place, i: any, target: any)
	{
		var message;
		if (target == null)
		{
			message = "The keycard must be used on something.";
		}
		else if (target.name != "slot")
		{
			message = "The keycard will only fit in an appropriately sized slot.";
		}
		else if (target.stateGroup.valueGetByName(StateNames.isOpen() ) )
		{
			message =  "There's no need to use the keycard again, the door is already open.";
			target.stateGroup.stateWithNameSetToValue(StateNames.isOpen(), true);
		}
		else
		{
			message = "You insert the keycard into the slot.  The adjacent door opens.";
			target.stateGroup.stateWithNameSetToValue(StateNames.isOpen(), true);
		}

		u.messageEnqueue(message);
	}

	placeArcadiaJanitorsClosetUpdate(u: Universe, w: World, p: Place): any
	{
		if (p.hasBeenVisited() == false)
		{
			var messageLines =
			[
				"You are napping, on duty, in the janitor's closet of the "
				+ "starship Arcadia when you are awakened by a loud klaxon.  "
				+ "Party foul."
			]
			var message = messageLines.join("");
			u.messageEnqueue(message);
		}
	}

	placeArcadiaUpperDeckHallAmidshipsUpdate(u: Universe, w: World, p: Place): any
	{
		if (p.hasBeenVisited() == false)
		{
			var messageLines =
			[
				"You stumble out of the janitor's closet into the hall, "
				+ "where, unfortunately, not only is the klaxon louder, "
				+ "but it's also joined by annoying flashing red lights."
				+ "On the positive side, a few seconds later, "
				+ "the klaxon and and the lights both stop abruptly."
				+ "\n\n"
				+ "Probably nothing to worry about, right?"
			]
			var message = messageLines.join("");
			u.messageEnqueue(message);
		}
	}

}

class StateNames
{
	static isEmpty(): string
	{
		return "isEmpty";
	}

	static isOpen(): string
	{
		return "isOpen";
	}

	static isSharpened(): string
	{
		return "isSharpened";
	}

	static isUnlocked(): string
	{
		return "isUnlocked";
	}
}
