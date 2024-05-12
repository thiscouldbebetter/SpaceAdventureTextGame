
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

		var places = new Places();

		var commands = Command.Instances()._All;

		var scriptsAll = new Array<Script>();

		var commandsAsScripts = commands.map((x: Command) => x._scriptExecute);
		scriptsAll.push(...commandsAsScripts);

		scriptsAll.push(...scriptsCustom._All);

		var placeInitialName = Places.friendlyShipJanitorsCloset_Name();

		var returnValue = new World
		(
			"Space_Adventure_Game",
			places._All,
			player,
			commands,
			scriptsAll,
			null, // turnsSoFar,
			placeInitialName
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
	scripts: Scripts;

	_All: Place[];

	constructor()
	{
		this.scripts = Scripts.Instance();

		this._All =
		[
			// Pax Aeterna - Upper Deck.
			this.friendlyShipJanitorsCloset(),
			this.friendlyShipUpperDeckHallAmidships(),
			this.friendlyShipLibrary(),
			this.friendlyShipUpperDeckHallForward(),
			this.friendlyShipUpperDeckHallAft(),
			this.friendlyShipBridge(),

			// Pax Aeterna - Lower Deck.

			this.friendlyShipLowerDeckHallAft(),
			this.friendlyShipLowerDeckHallAmidships(),
			this.friendlyShipLowerDeckHallForward(),

			// Pax Aeterna - Engineering Deck.

			this.friendlyShipEngineeringDeckAft(),
			this.friendlyShipEngineeringDeckAmidships(),
			this.friendlyShipEngineeringDeckForward(),

			// Pax Aeterna - Docking Bay.

			this.friendlyShipDockingBayAntechamber(),
			this.friendlyShipDockingBayHangar(),
			this.friendlyShipEscapePod(),

			// Ekkis 2 - Desert.

			this.planetDesertCrashSite(),
			this.planetDesertDeep(),
			this.planetDesertNorth(),
			this.planetDesertSouth(),
			this.planetDesertWest(),

			// Ekkis 2 - Cliffs.

			this.planetCliffsBottomNorth(),
			this.planetCliffsBottomNortheast(),
			this.planetCliffsBottomNorthwestEastSide(),
			this.planetCliffsBottomNorthwestWestSide(),
			this.planetCliffsBottomSouth(),
			this.planetCliffsBottomSoutheast(),
			this.planetCliffsBottomSouthwest(),
			this.planetCliffsCaveInterior(),
			this.planetCliffsTopNorth(),
			this.planetCliffsTopNortheast(),
			this.planetCliffsTopNorthwest(),
			this.planetCliffsTopSouthEastSide(),
			this.planetCliffsTopSouthWestSide(),
			this.planetCliffsTopSouthwest(),

			// Ekkis 2 - Caverns.

			this.planetCavernsProjectionRoom(),
			this.planetCavernsSteamworks(),

			this.planetCavernsBarrier(),
			this.planetCavernsDrips(),
			this.planetCavernsElevator(),
			this.planetCavernsGeyser(),
			this.planetCavernsGrating(),
			this.planetCavernsPool(),

			// Ekkis 2 - Village of [Farting Noise].

			this.planetSettlementBarFront(),
			this.planetSettlementBarInterior(),
			this.planetSettlementBarRear(),
			this.planetSettlementRobotShopFront(),
			this.planetSettlementRobotShopInterior(),
			this.planetSettlementRobotShopWest(),
			this.planetSettlementNorthOfUsedShipLot(),
			this.planetSettlementUsedShipLot(),

			// enemyShip.

			this.enemyShipAirlockAntechamber(),
			this.enemyShipAirlockChamber(),
			this.enemyShipAirlockExterior(),
			this.enemyShipArmory(),
			this.enemyShipLaundry(),
			this.enemyShipLowerDeckHallAft(),
			this.enemyShipLowerDeckHallAmidships(),
			this.enemyShipLowerDeckHallFore(),
			this.enemyShipNearbySpace(),
			this.enemyShipShuttleBay(),
			this.enemyShipStellarJuvenatorChamber(),
			this.enemyShipStellarJuvenatorChamberCatwalk(),
			this.enemyShipUpperDeckHallAft(),
			this.enemyShipUpperDeckHallAmidships(),
			this.enemyShipUpperDeckHallFore(),
			this.enemyShipVentilationShaft1(),
			this.enemyShipVentilationShaft2(),
			this.enemyShipVentilationShaft3(),
			this.enemyShipVentilationShaft4()
		];
	}

	emplacement(name: string): Emplacement
	{
		return Emplacement.fromNameAndDescription(name, name);
	}

	emplacement2(name: string, description: string): Emplacement
	{
		return Emplacement.fromNameAndDescription(name, description);
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

	place3
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
			null, // scriptName,
			objects
		);
	}

	place4
	(
		name: string,
		description: string,
		scriptName: string,
		objects: any[]
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
		return Portal.fromNameAndPlaceDestinationName(name, placeDestinationName);
	}

	portal_WithScript(name: string, scriptUseName: string): Portal
	{
		return new Portal(name, null, null, scriptUseName);
	}

	// Places.

	// Places - Pax Aeterna.

	friendlyShipBridge(): Place
	{
		return this.place2
		(
			Places.friendlyShipBridge_Name(),

			"This is the command bridge of the starship Pax Aeterna.  "
			+ "A large transparent hemispherical dome arches overhead, "
			+ "showing the brilliantly shining surrounding stars."
			+ "Banks of mostly incomprehensible controls "
			+ "line the circular wall, with the nearby seats "
			+ "either empty or filled with the slumped bodies of dead crew."
			+ "There're several bodies scattered on the floor, as well.  "
			+ "A prominent pedestal in the center "
			+ "formerly held the Stellar Juvenator, but now stands vacant."
		);
	}

	static friendlyShipBridge_Name(): string
	{
		return "Pax Aeterna - Bridge";
	}

	friendlyShipDockingBayAntechamber(): Place
	{
		return this.place3
		(
			Places.friendlyShipDockingBayAntechamber_Name(),

			"This is the antechamber of the Pax Aeterna's docking bay.  "
			+ "A large airlock door leads to the hangar.  "
			+ "A control console occupies one wall, while "
			+ "on the opposite wall are two closets, with a pair of " 
			+ " buttons at chest height between them. "
			+ " An elevator leads back to the engineering deck.",

			[
				this.portal("airlock", Places.friendlyShipDockingBayHangar_Name()),
				this.portal("elevator", Places.friendlyShipEngineeringDeckAft_Name()),

				this.emplacement("controls"),
				this.emplacement("hatch")
			]
		);
	}

	static friendlyShipDockingBayAntechamber_Name(): string
	{
		return "Pax Aeterna - Docking Bay - Antechamber";
	}

	friendlyShipDockingBayHangar(): Place
	{
		return this.place3
		(
			Places.friendlyShipDockingBayHangar_Name(),

			"This is the Pax Aeterna's docking bay hangar.  "
			+ "Though its floor is easily large enough to accomodate "
			+ "a 20-passenger luxury yacht, it is currently empty "
			+ "except for a relatively small hatch in the floor "
			+ "and a control console near the airlock door leading back to the antechamber."
			+ "A similarly gigantic pair of doors at the far end of the bay "
			+ " allows ships to enter and depart when open, "
			+ " and keeps everything safely sheltered when closed.",

			[
				this.portal("airlock", Places.friendlyShipDockingBayAntechamber_Name() ),
				this.portal("pod", Places.friendlyShipEscapePod_Name() ),

				this.emplacement("controls"),
				this.emplacement("hatch"),
				this.emplacement("pod"),
			]
		);
	}

	static friendlyShipDockingBayHangar_Name(): string
	{
		return "Pax Aeterna - Docking Bay - Hangar";
	}

	friendlyShipEngineeringDeckAft(): Place
	{
		return this.place3
		(
			Places.friendlyShipEngineeringDeckAft_Name(),

			"This is the aft end of the Pax Aeterna's engineering deck."
			+ "A passage to fore leads back to the rest of the deck.  "
			+ "In the aft wall is an elevator door, and next to that "
			+ "is a small panel with a slot in it.",

			[
				this.portal("elevator", Places.friendlyShipDockingBayAntechamber_Name() ),
				this.portal("forward", Places.friendlyShipEngineeringDeckAmidships_Name() ),

				this.emplacement("slot")
			]
		);
	}

	static friendlyShipEngineeringDeckAft_Name(): string
	{
		return "Pax Aeterna - Engineering Deck - Aft";
	}

	friendlyShipEngineeringDeckAmidships(): Place
	{
		return this.place3
		(
			Places.friendlyShipEngineeringDeckAmidships_Name(),

			"This is the middle of the Pax Aeterna's engineering deck."
			+ "To fore and aft are the other sections of the deck.  "
			+ "Three large transparent domes on the floor cover the tops of "
			+ "the ship's reactor tubes.  These domes are currently pulsing "
			+ "an unsettling reddish-orange, accompanied by a loud "
			+ "and ominous droning sound.  A thick window "
			+ "looks down over the ship's docking bay, with a control console "
			+ "running beneath that window.  The bodies of two crewmen lie on the floor.",

			[
				this.portal("aft", Places.friendlyShipEngineeringDeckAft_Name()),
				this.portal("forward", Places.friendlyShipEngineeringDeckForward_Name()),

				this.emplacement("controls"),
				this.emplacement("dome"),
				this.emplacement("window"),
				this.emplacement("body").commandAdd
				(
					new Command
					(
						["search body"],
						this.scripts.emplacementBodyEmptySearch.name
					)
				)
			]
		);
	}

	static friendlyShipEngineeringDeckAmidships_Name(): string
	{
		return "Pax Aeterna - Engineering Deck - Aft";
	}

	friendlyShipEngineeringDeckForward(): Place
	{
		return this.place3
		(
			Places.friendlyShipEngineeringDeckForward_Name(),

			"This is the fore end of the Pax Aeterna's engineering deck."
			+ "The rest of the deck lies to aft.  "
			+ "At the fore end, an door opens on an elevator back to the other decks.",

			[
				this.portal("elevator", Places.friendlyShipLowerDeckHallForward_Name() ),
				this.portal("aft", Places.friendlyShipEngineeringDeckAmidships_Name() ),

				this.emplacement("slot")
			]
		);
	}

	static friendlyShipEngineeringDeckForward_Name(): string
	{
		return "Pax Aeterna - Engineering Deck - Forward";
	}

	friendlyShipEscapePod(): Place
	{
		return this.place3
		(
			Places.friendlyShipEscapePod_Name(),

			"This is the interior of one of the Pax Aeterna's escape pods."
			+ "A padded seat with safety belts completely occupies the floor of the pod's cabin.  "
			+ "Beneath the window is a console with various controls, "
			+ "including a throttle, a monitor screen, and some buttons. "
			+ "A gull-wing door in the left wall of the pod allows entry and exit.  "
			+ "Opposite the door, on the starboard wall, is a mounting for a survival kit.  "
			+ "Above the control console is a large window, through which "
			+ "the pod's surroundings can be seen.",

			[
				this.portal_WithScript
				(
					"door",
					this.scripts.placefriendlyShipEscapePod_GoDoor.name
				),

				this.emplacement("autonav button").commandAdd
				(
					new Command
					(
						[ "press autonav", "press autonav button" ],
						this.scripts.placefriendlyShipEscapePod_PressAutonavButton.name
					)
				),
				this.emplacement("buttons"),
				this.emplacement("console"),
				this.emplacement("don't button"),
				this.emplacement("launch button").commandAdd
				(
					new Command
					(
						[ "press launch", "press launch button" ],
						this.scripts.placefriendlyShipEscapePod_PressLaunchButton.name
					)
				),
				this.emplacement("monitor screen"),
				this.emplacement("safety belt"),
				this.emplacement("survival kit"),
				this.emplacement("throttle")
			]
		);
	}

	static friendlyShipEscapePod_Name(): string
	{
		return "Pax Aeterna - Escape Pod";
	}

	friendlyShipJanitorsCloset(): Place
	{
		return this.place4
		(
			Places.friendlyShipJanitorsCloset_Name(),

			"This office/supply closet/quarters, "
			+ "despite the word 'quarters' after the last slash, "
			+ "is a bit cramped and uncomfortable for sleeping in, "
			+ "as it doesn't have a bed.  "
			+ "The quartermaster promised you a cot, but no cot ever showed up, "
			+ "and anyway there's no room for it amongst all the cleaning supplies.  "
			+ "And as for the 'office' part: don't offices have desks?"
			+ "\n\n"
			+ "Anyway, despite how hard it is to nap here, "
			+ "heroically, you make it work.  And you don't "
			+ "just make it work; you make it work a LOT."
			+ "\n\n"
			+ "A door leads out to the hall.  "
			+ "(You tried sleeping out there once, but someone got mad.)",

			this.scripts.placefriendlyShipJanitorsCloset_Update.name,

			[
				this.portal("door", Places.friendlyShipUpperDeckHallAmidships_Name()),
			]
		);
	}

	static friendlyShipJanitorsCloset_Name(): string
	{
		return "Pax Aeterna - Maintenance Specialist (Sanitation Grade)'s Office/Supply Closet/Quarters";
	}

	friendlyShipLibrary(): Place
	{
		return this.place3
		(
			Places.friendlyShipLibrary_Name(),

			"This is the Pax Aeterna's library.  "
			+ "Doors in the fore and aft walls lead to hallways.  "
			+ "\n\n"
			+ "The high walls are occupied almost completely with floor-to-ceiling shelves, "
			+ "and the shelves are occupied almost completely "
			+ "with rows upon rows of plastic cartridges containing magnetic data tape.  "
			+ "(The fleet tried a solid-state, full-digital data storage system for a while, "
			+ " but it was agreed that it just didn't give the same rich tones.)"
			+ "\n\n"
			+ "A spacious round table ringed with upholstered seats, "
			+ "fills a pit in the center of the room.  "
			+ "It is intended to provide a comfortable place to read data cartridges, "
			+ "though there are no cartridge readers present.  "
			+ "Every crew member was issued one on boarding, "
			+ "but you lost yours.  Well, broke it, really."
			+ "\n\n"
			+ "On one wall is a retrieval console with a keyboard and screen, "
			+ "a spiderlike cartridge-retrieval robot clinging to the shelves just above it."
			+ "\n\n"
			+ "A man wearing a scientist's smock lies face-down "
			+ "on the floor in front of the console. ",

			[
				this.portal("forward", Places.friendlyShipUpperDeckHallForward_Name() ),
				this.portal("aft", Places.friendlyShipUpperDeckHallAmidships_Name() ),

				this.emplacement2
				(
					"console",
					"If the title of a desired data cartridge is typed "
					+ "on the console's keyboard, "
					+ "the retrieval robot will retrieve that cartridge from the stacks "
					+ "and drop it into the cartidge hopper below the console. "
					+ "From there, the cartridge is generally slotted into a reader "
					+ "and its contents displayed on a screen.  "
					+ "It's a complicated system, to be sure, "
					+ "but that sixteen hours of training you took was probably enough."
				).commandAdd
				(
					new Command
					(
						[ "type", "enter" ],
						this.scripts.placefriendlyShipLibrary_Type.name
					)
				),

				this.emplacement2
				(
					"table",

					"The table provides a comfortable place "
					+ "for the more literate members of the crew to research data tapes."
					+ "\n\n"
					+ "You, on the other hand, have only used it once,"
					+ "as an improvised playfield for a game of Vir-Naki Caroms "
					+ "with the cartridge-retrieval bot. "
					+ "But they made you stop before you could even "
					+ "figure out how to detach the bot from the shelves, "
					+ "much less get a nice volley going."
				),

				this.emplacement2
				(
					"man",
					"He's not moving in any perceptible way.  "
					+ "You can't tell from here if he's even breathing, "
					+ "which is the most important kind of moving, "
					+ "when you think about it."
				).commandAdd
				(
					new Command
					(
						[ "search body", "search man", "talk to man" ],
						this.scripts.placefriendlyShipLibrary_TalkToMan.name
					)
				)
			]
		);
	}

	static friendlyShipLibrary_Name(): string
	{
		return "Pax Aeterna - Library";
	}

	friendlyShipLowerDeckHallAft(): Place
	{
		return this.place3
		(
			Places.friendlyShipLowerDeckHallAft_Name(),

			"This is a hallway on the lower deck of the starship Pax Aeterna.  "
			+ "(It looks almost exactly like the upper deck, though. "
			+ "Honestly, if the buttons in the elevator weren't labelled, "
			+ "there'd be no way to tell them apart.)  "
			+ "The hall continues to forward, and ends in a bulkhead to aft.  "
			+ "A door here opens onto an elevator.",
			+ "\n\n"
			+ "The body of your supervisor lies supine in this corridor, "
			+ "brows furrowed in a disapproving expression even in death."
			+ "A hard trick to pull off, but then again, he put in lots of practice"
			+ "when he was alive.  Every time he talked to you, at a minimum."

			[
				this.portal("forward", Places.friendlyShipLowerDeckHallAmidships_Name() ),
				this.portal("elevator", Places.friendlyShipUpperDeckHallAft_Name() ),
				this.emplacement("body").commandAdd
				(
					new Command
					(
						["search body"],
						this.scripts.emplacementBodyEmptySearch.name
					)
				)

			]
		);
	}

	static friendlyShipLowerDeckHallAft_Name(): string
	{
		return "Pax Aeterna - Lower Deck - Hall - Aft";
	}

	friendlyShipLowerDeckHallAmidships(): Place
	{
		return this.place3
		(
			Places.friendlyShipLowerDeckHallAmidships_Name(),

			"This is a hallway on the lower deck of the starship Pax Aeterna.  "
			+ "You can still detect subtle indications of slight damage "
			+ "from when a floor scrubber went out of control, "
			+ "collided with the wall, and rubbed against for several meters "
			+ "before getting back on track.  That very nearly cost it the race, "
			+ "but luckily the other scrubber was disqualified for unsportspersonlike conduct."
			+ "The hall continues to forward and to aft.",

			[
				this.portal("forward", Places.friendlyShipLowerDeckHallForward_Name() ),
				this.portal("aft", Places.friendlyShipLowerDeckHallAft_Name() )
			]
		);
	}

	static friendlyShipLowerDeckHallAmidships_Name(): string
	{
		return "Pax Aeterna - Lower Deck - Hall - Amidships";
	}

	friendlyShipLowerDeckHallForward(): Place
	{
		return this.place3
		(
			Places.friendlyShipLowerDeckHallForward_Name(),

			"This is a hallway on the lower deck of the starship Pax Aeterna.  "
			+ "The hall continues to aft, and ends in a bulkhead to forward.  "
			+ "There is a door here opening on an elevator.  "
			+ "\n\n"
			+ "Another body of one of your crewmates lies here.  "
			+ "You start to feel sorry for whoever has to clean all this up.",

			[
				this.portal("aft", Places.friendlyShipLowerDeckHallAmidships_Name() ),
				this.portal("elevator", Places.friendlyShipEngineeringDeckForward_Name() ),
				this.emplacement("body").commandAdd
				(
					new Command
					(
						["search body"],
						this.scripts.emplacementBodyEmptySearch.name
					)
				)
			]
		);
	}

	static friendlyShipLowerDeckHallForward_Name(): string
	{
		return "Pax Aeterna - Lower Deck - Hall - Forward";
	}

	friendlyShipUpperDeckHallAft(): Place
	{
		return this.place3
		(
			Places.friendlyShipUpperDeckHallAft_Name(),

			"This is a hallway on the upper deck of the starship Pax Aeterna.  "
			+ "The hall continues to forward, and ends in a bulkhead to aft.  "
			+ "There is a door here opening on an elevator.  "
			+ "\n\n"
			+ "The body of one of your fellow crew members lies prone "
			+ "near the aft bulkhead, the neck bent sharply upwards "
			+ "and the chin propped against the bulkhead itself.  "
			+ "This is the most awkward pose yet."

			[
				this.portal("forward", Places.friendlyShipUpperDeckHallAmidships_Name() ),
				this.portal("elevator", Places.friendlyShipLowerDeckHallAft_Name() ),
				this.emplacement("body").commandAdd
				(
					new Command
					(
						["search body"],
						this.scripts.emplacementBodyEmptySearch.name
					)
				)
			]
		);
	}

	static friendlyShipUpperDeckHallAft_Name(): string
	{
		return "Pax Aeterna - Upper Deck - Hall - Aft";
	}

	friendlyShipUpperDeckHallAmidships(): Place
	{
		return this.place4
		(
			Places.friendlyShipUpperDeckHallAmidships_Name(),

			"This is a hallway on the upper deck of the starship Pax Aeterna.  "
			+ "The hall ends in a door to forward, and continues to aft.  "
			+ "In the middle is a door leading to the office/supply closet/quarters "
			+ "of the Maintenance Specialist (Sanitation Grade), "
			+ "which is where you, our hero, came boldly to this story, "
			+ "as soon as you figured out how to 'go door'."

			this.scripts.placefriendlyShipUpperDeckHallAmidships_Update.name,

			[
				this.portal("closet", Places.friendlyShipJanitorsCloset_Name()),
				this.portal("forward", Places.friendlyShipLibrary_Name()),
				this.portal("aft", Places.friendlyShipUpperDeckHallAft_Name())
			]
		);
	}

	static friendlyShipUpperDeckHallAmidships_Name(): string
	{
		return "Pax Aeterna - Upper Deck - Hall - Amidships";
	}

	friendlyShipUpperDeckHallForward(): Place
	{
		return this.place3
		(
			Places.friendlyShipUpperDeckHallForward_Name(),

			"This is a hallway on the upper deck of the starship Pax Aeterna.  "
			+ "The hall ends in a bulkhead to forward, "
			+ "near which the body of a dead crewperson lies crumpled.  "
			+ "This is a pretty out-of-the way spot.  "
			+ "They must've been hiding here when they got shot.  "
			+ "Either that, or they died of natural causes by coincidence, "
			+ "and nobody's been down this hall to find them until just now.  "
			+ "Unlikely, but we shouldn't rule anything out."

			[
				this.portal("aft", Places.friendlyShipLibrary_Name()),
				this.emplacement("body").commandAdd
				(
					new Command
					(
						["search body"],
						this.scripts.emplacementBodyKeycardSearch.name
					)
				)
			]
		);
	}

	static friendlyShipUpperDeckHallForward_Name(): string
	{
		return "Pax Aeterna - Upper Deck - Hall - Forward";
	}

	// Places - Ekkis 2.

	// Places - Ekkis 2 - Desert.

	planetDesertCrashSite() : Place
	{
		return this.place3
		(
			Places.planetDesertCrashSite_Name(),

			"Your escape pod has crashed in the middle of the desert "
			+ "of the planet Ekkis II.  "
			+ "(What a stupid place to crash, you dumb idiot pod!)"
			+ "The crash has rendered the pod completely inoperable.  "
			+ "Its structural frame is severely bent, its door is unclosable, "
			+ "and its forward window has shattered, "
			+ "scattering shards of highly reflective glass "
			+ "(it looks like glass, anyway)"
			+ "over the sand in front of the pod."
			+ "\n\n"
			+ "Wait, shards?  How did that get past safety inspection?"
			+ "\n\n"
			+ "The sun is blazing.  Or they are.  There may be more than one;"
			+ "it is, or they are, too hard to look at to tell.  "
			+ "It's so hot and dry that your sweat is evaporating "
			+ "almost as fast as it seeps out of your pores." 
			+ "\n\n"
			+ "The desert stretches away as far as the eye can see to the "
			+ "north, west, and south.  It's majestically depressing."
			+ "\n\n"
			+ "A maze of rocky cliffs rises to the east.  "
			+ "At least, with your luck, you assume it must be mazelike.",
			[
				this.portal("pod", Places.friendlyShipEscapePod_Name() ),
				this.portal("east", Places.planetCliffsBottomNorthwestWestSide_Name() )
			]
		);
	}

	static planetDesertCrashSite_Name(): string
	{
		return "Ekkis II - Desert - Crash Site";
	}

	planetDesertDeep() : Place
	{
		return this.place3
		(
			Places.planetDesertDeep_Name(),

			"You stand in the trackless desert of the planet Ekkis II, "
			+ "The featureless sand stretches away in every direction.  "
			+ "It's not encouraging, frankly.",

			[]

			// Scripts.placeplanetDesertDeepUpdate.name
		)
	}

	static planetDesertDeep_Name(): string
	{
		return "Ekkis II - Desert - Deep Desert";
	}

	planetDesertNorth() : Place
	{
		return this.place3
		(
			Places.planetDesertNorth_Name(),

			"You stand in the trackless desert of the planet Ekkis II, "
			+ "just north of the wreck of your crashed escape pod.  "
			+ "Some cliffs rise to the southeast. "
			+ "The featureless sand stretches away in every other direction.  "
			+ "If you were a poet, you'd probably be moved "
			+ "to write a poem about loneliness. "
			+ "But you're not, so instead you just sweat and wish for a lemonade."

			[
				this.portal("south", Places.planetDesertCrashSite_Name() ),
				this.portal("north", Places.planetDesertDeep_Name() ),
				this.portal("east", Places.planetDesertDeep_Name() ),
				this.portal("west", Places.planetDesertDeep_Name() ),
			]
		);
	}

	static planetDesertNorth_Name(): string { return "Ekkis II - Desert - North of Crash Site"; }

	planetDesertSouth() : Place
	{
		return this.place3
		(
			Places.planetDesertSouth_Name(),

			"You stand in the trackless desert of the planet Ekkis II, "
			+ "just south of the wreck of your crashed escape pod.  ",
			+ "Some cliffs rise to the northeast.  ",
			+ "A sea of dunes stretches away in every other direction."
			+ "Except... there!  In the distance!  You see... "
			+ "No, on second thought, that's just an eyeball floater.  "
			+ "It was a pretty rough crash.  You should get checked out "
			+ "whenever you next find a doctor. "

			[
				this.portal("north", Places.planetDesertCrashSite_Name() ),
				this.portal("south", Places.planetDesertDeep_Name() ),
				this.portal("east", Places.planetDesertDeep_Name() ),
				this.portal("west", Places.planetDesertDeep_Name() ),
			]
		);
	}

	static planetDesertSouth_Name(): string { return "Ekkis II - Desert - South of Crash Site"; }

	planetDesertWest() : Place
	{
		return this.place3
		(
			Places.planetDesertWest_Name(),

			"You stand in the trackless desert of the planet Ekkis II, "
			+ "just west of the wreck of your crashed escape pod.  ",
			+ "Beyond the pod, some cliffs rise from the sand. "
			+ "A sea of dunes stretch away in every other direction."
			+ "\n\n"
			+ "What does 'trackless' mean, anyway?  "
			+ "It's not like most places are just brimming over with tracks.",

			[
				this.portal("east", Places.planetDesertCrashSite_Name() ),
				this.portal("north", Places.planetDesertDeep_Name() ),
				this.portal("south", Places.planetDesertDeep_Name() ),
				this.portal("west", Places.planetDesertDeep_Name() ),
			]
		);
	}

	static planetDesertWest_Name(): string
	{
		return "Ekkis II - Desert - West of Crash Site";
	}

	// Places - Ekkis 2 - Cliffs.

	planetCliffsBottomNorth(): Place
	{
		return this.place3
		(
			Places.planetCliffsBottomNorth_Name(),

			"You stand on the sand of the Ekkis II desert, just to the south  "
			+ "of a steep stone cliff running from west to east.  "
			+ "Other cliffs can be seen to the west, east, and south.  "
			+ "\n\n"
			+ "This cliff seems especially cliffy indeed, "
			+ "but you're reserving judgement "
			+ "until you've seen all the entrants.  It's only fair."  

			[
				this.portal("south", Places.planetCliffsBottomSouth_Name()),
				this.portal("west", Places.planetCliffsBottomNorthwestEastSide_Name()),
				this.portal("east", Places.planetCliffsBottomNortheast_Name())
			]
		);
	}

	static planetCliffsBottomNorth_Name(): string
	{
		return "Ekkis II - Cliffs - Bottom - North"
	}

	planetCliffsBottomNortheast(): Place
	{
		return this.place3
		(
			Places.planetCliffsBottomNortheast_Name(),

			"You stand on the sand of the Ekkis II desert, just to the south  "
			+ "of a steep stone cliff running from the west "
			+ "and ending just to the east.  "
			+ "\n\n"
			+ "Above, on the clifftop, two large stone pillars "
			+ "stand about four meters apart from each other.  "
			+ "As they rise, they bend toward each other like horns, "
			+ "with jagged, broken tops.  Maybe it's the dehydration, "
			+ "but you feel like these are some pretty cool, top-ten stone horns."
			+ "\n\n"
			+ "To the east, the sand stretches away from the foot of the cliff, "
			+ "as far as the eye can see.  Well, your eyes, at least.",

			[
				this.portal("south", Places.planetCliffsBottomSoutheast_Name()),
				this.portal("west", Places.planetCliffsBottomNorthwestEastSide_Name()),
				this.portal("east", Places.planetDesertDeep_Name())
			]
		);
	}

	static planetCliffsBottomNortheast_Name(): string
	{
		return "Ekkis II - Cliffs - Bottom - Northeast"
	};

	planetCliffsBottomNorthwestEastSide(): Place
	{
		return this.place3
		(
			Places.planetCliffsBottomNorthwestEastSide_Name(),

			"You stand on the sand of the Ekkis II desert, at the base  "
			+ "of a sheer stone cliff that curves away to the south and east.  "
			+ "\n\n"
			+ "The cliff, to an unarguable degree, "
			+ "blocks progress to the north and west, "
			+ "so don't you even try it.",

			[
				this.portal("east", Places.planetCliffsBottomNorth_Name()),
				this.portal("south", Places.planetCliffsBottomSouthwest_Name())
			]
		);
	}

	static planetCliffsBottomNorthwestEastSide_Name(): string
	{
		return "Ekkis II - Cliffs - Bottom - Northwest - East Side"
	}

	planetCliffsBottomNorthwestWestSide(): Place
	{
		return this.place3
		(
			Places.planetCliffsBottomNorthwestWestSide_Name(),

			"You stand on the sand of the Ekkis II desert, at the base  "
			+ "of a sheer stone cliff that curves away to the south and east,  "
			+ "and which blocks passage to the east.  "
			+ "\n\n"
			+ "The site where your escape pod crashed is to the west."
			+ "\n\n"
			+ "To the south, more cliffs are visible. "
			+ "\n\n"
			+ " The desert stretches away to the north, and west."
			+ "\n\n",
			+ "The cliff face has a nearly circular hole in it, "
			+ "a little less than two meters off the ground.  "
			+ "Nice: you like a cliff face with a little somethin' goin' on.",

			[
				this.portal("south", Places.planetCliffsBottomSouthwest_Name()),
				this.portal("west", Places.planetDesertCrashSite_Name()),
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

	static planetCliffsBottomNorthwestWestSide_Name(): string
	{
		return "Ekkis II - Cliffs - Bottom - Northwest - West Side"
	}

	planetCliffsBottomSouth(): Place
	{
		return this.place3
		(
			Places.planetCliffsBottomSouth_Name(),

			"You stand on the desert of Ekkis II, "
			+ "in a area surrounded by a system of cliffs.  "
			+ "In the shelter afforded by the cliffs, "
			+ "some stunted greenery actually manages to cling to life.  "
			+ "\n\n"
			+ "Overhead, a weathered stone arch bridges the tops of the cliffs "
			+ "to the east with those to the west.  "
			+ "It's very picturesque, and you without a camera."
			+ "\n\n"
			+ "Surface paths between cliff bases run to the west, north, and east.",

			[
				this.portal("east", Places.planetCliffsBottomSoutheast_Name() ),
				this.portal("north", Places.planetCliffsBottomNorth_Name() ),
				this.portal("west", Places.planetCliffsBottomSouthwest_Name() ),
			]
		);
	}

	static planetCliffsBottomSouth_Name(): string
	{
		return "Ekkis II - Cliffs - Bottom - South"
	}

	planetCliffsBottomSoutheast(): Place
	{
		return this.place3
		(
			Places.planetCliffsBottomSoutheast_Name(),

			"You stand on a clear stretch of sand amid a formation of stone cliffs.  "
			+ "The sandy surface of the desert runs to the north and to the west. "
			+ "\n\n"
			+ "To the east is a tall, confused jumble of rocks, "
			+ " in which a large, shadowy cave mouth opens.  "
			+ "What with the sun(s) and all, "
			+ "you feel you could really go for some shadows about now,"
			+ "even though you normally sleep with a night-light."
			+ "\n\n"
			+ "On the west side of the clearing, a stone slope rises jaggedly "
			+ "upward between jutting upright stones, climbing as it runs northward.",

			[
				this.portal("north", Places.planetCliffsBottomSouth_Name() ),
				this.portal("west", Places.planetCliffsBottomSouth_Name() ),
				this.portal("east", Places.planetCliffsCaveInterior_Name() ),
				this.portal("up", Places.planetCliffsTopSouthEastSide_Name() )
			]
		);
	}

	static planetCliffsBottomSoutheast_Name(): string
	{
		return "Ekkis II - Cliffs - Bottom - Southeast"
	}

	planetCliffsBottomSouthwest(): Place
	{
		return this.place3
		(
			Places.planetCliffsBottomSouthwest_Name(),

			"More cliffs here, and sand.  "
			+ "This planet only has a couple of things going on, "
			+ "but danged if it disappoints on the cliff and sand front.",
			+ "\n\n"
			+ "Specifically, cliffs rise to the north and east, "
			+ "while to the south and west lies sand.  "
			+ "It's balanced.  Kind of a yin-yang thing.  "
			+ "Though you're not sure which is which.  "
			+ "Or maybe they doubled up on yang."

			[
				this.portal("east", Places.planetCliffsBottomSouth_Name() ),
				this.portal("north", Places.planetCliffsBottomNorthwestEastSide_Name() )
			]
		);
	}

	static planetCliffsBottomSouthwest_Name(): string { return "Ekkis II - Cliffs - Bottom - Southwest" };

	planetCliffsCaveInterior() : Place
	{
		return this.place3
		(
			Places.planetCliffsCaveInterior_Name(),

			"This is a cool, dark cave.  Mossy vegetation clings to the rocks.  "
			+ "To the west the cave opens out into the blazing daylight "
			+ "of the Ekkis II desert.  "
			+ "There's... there's a smell.",

			[
				this.portal("west", Places.planetCliffsBottomSoutheast_Name() ),
			]
		);
	}

	static planetCliffsCaveInterior_Name() : string
	{
		return "Ekkis II - Cliffs - Cave - Interior";
	}

	planetCliffsTopNorth() : Place
	{
		return this.place3
		(
			Places.planetCliffsTopNorth_Name(),

			"You stand atop a rocky cliff rising from the desert "
			+ "of the planet Ekkis II.  "
			+ "The top of the cliff continues to the west and east."
			+ "The path is especially narrow and precarious here.  "
			+ "You're glad you can just type 'go east' or whatever "
			+ "rather than turning down the game speed "
			+ "and picking your way along one step at a time.",

			[
				this.portal("east", Places.planetCliffsTopNortheast_Name() ),
				this.portal("west", Places.planetCliffsTopNorthwest_Name() )
			]
		);
	}

	static planetCliffsTopNorth_Name() : string
	{
		return "Ekkis II - Cliffs - Top - North";
	}

	planetCliffsTopNortheast() : Place
	{
		return this.place3
		(
			Places.planetCliffsTopNortheast_Name(),

			"You stand on the end of a clifftop "
			+ "above the desert of the planet Ekkis II.  "
			+ "A pair of leaning stone columns rises from the clifftop here, "
			+ "bending toward each other like horns.  "
			+ "\n\n"
			+ "(Are they columns if they're not completely vertical, though?"
			+ "Hmm, maybe they're slashes.  "
			+ "Or, one is a slash, and the other a backslash."
			+ "Anyway, they're definitely not rows.)"
			+ "\n\n"
			+ "The stone horns look especially cool up close.  "
			+ "You woozily compose an album cover in your head, "
			+ "with the stone horns pictured in the background "
			+ "and with you looking bored and fully hydrated in the foreground."
			+ "You further fantasize about your imaginary band's groupies, "
			+ "each of which is offering you a cool fruity drink."
			+ "\n\n"
			+ "Back in the real world, the top of the cliff "
			+ "runs back toward the west, where there is also no water.",

			[
				this.portal("west", Places.planetCliffsTopNorth_Name() ),
				this.portal("columns", Places.planetCavernsElevator_Name() )
			]
		);
	}

	static planetCliffsTopNortheast_Name() : string { return "Ekkis II - Cliffs - Top - Northeast"; }

	planetCliffsTopNorthwest() : Place
	{
		return this.place3
		(
			Places.planetCliffsTopNorthwest_Name(),

			"You stand atop a cliff rising from the desert of the planet Ekkis II.  "
			+ "The path along the clifftop curves from the south to the east.  "
			+ "\n\n"
			+ "Some jagged peaks jut upward along the northern edge of the cliff.  "
			+ "Hey, at least these cliffs are trying something new.",

			[
				this.portal("east", Places.planetCliffsTopNorth_Name() ),
				this.portal("south", Places.planetCliffsTopSouthwest_Name() )
			]
		);
	}

	static planetCliffsTopNorthwest_Name() : string
	{
		return "Ekkis II - Cliffs - Top - Northwest";
	}

	planetCliffsTopSouthEastSide() : Place
	{
		return this.place3
		(
			Places.planetCliffsTopSouthEastSide_Name(),

			"You stand atop a cliff rising from the desert of the planet Ekkis II."
			+ "\n\n"
			+ "To the east, a downward slope curves southward "
			+ "back to the desert surface. "
			+ "\n\n"
			+ "To the west, the cliff top rises and then falls "
			+ "in an weathered stone arch, "
			+ "which serves as a natural bridge to the clifftop on the other side." 
			+ "\n\n"
			+ "Below the arch is a slightly greener patch of desert "
			+ "sheltered by the surrounding cliffs.  "
			+ "From here, it almost looks idyllic.  "
			+ "But no, you just came from there, and it's all dyllic enough.",

			[
				this.portal("east", Places.planetCliffsBottomSoutheast_Name() ),
				this.portal("west", Places.planetCliffsTopSouthWestSide_Name() )
			]
		);
	}

	static planetCliffsTopSouthEastSide_Name() : string
	{
		return "Ekkis II - Cliffs - Top - Arch - East Side";
	}

	planetCliffsTopSouthWestSide() : Place
	{
		return this.place3
		(
			Places.planetCliffsTopSouthWestSide_Name(),

			"You stand atop a cliff rising from the desert of the planet Ekkis II."
			+ "\n\n"
			+ "To the west, the clifftop path continues, "
			+ "curving around to the north."
			+ "To the east, the cliff top rises and then falls "
			+ "in an weathered stone arch, "
			+ "which serves as a natural bridge to the clifftop on the other side,"
			+ "and from there down a slope to the desert surface."
			+ "\n\n"
			+ "Below the arch is a slightly greener patch of desert "
			+ "sheltered by the surrounding cliffs.  "
			+ "Despite the greenery, there's not enough water to drink down there, "
			+ "even if you were willing to bite a cactus, "
			+ "which past experience tells you you should never do again."

			[
				this.portal("east", Places.planetCliffsTopSouthEastSide_Name() ),
				this.portal("west", Places.planetCliffsTopSouthwest_Name() )
			]
		);
	}

	static planetCliffsTopSouthWestSide_Name() : string
	{
		return "Ekkis II - Cliffs - Top - Arch - West Side";
	}

	planetCliffsTopSouthwest() : Place
	{
		return this.place3
		(
			Places.planetCliffsTopSouthwest_Name(),

			"You stand atop a cliff rising from the desert of the planet Ekkis II.  "
			+ "The path along the clifftop curves "
			+ "from the east, where a natural stone bridge "
			+ "arches over the desert surface, "
			+ "and continues to the north."
			+ "\n\n"
			+ "The word 'arroyo' crosses your mind.  "
			+ "You're not exactly sure what an arroyo is,"
			+ "and you're reasonably sure this isn't one, "
			+ "but this whole place feels pretty arroyoey.", 

			[
				this.portal("north", Places.planetCliffsTopNorthwest_Name() ),
				this.portal("east", Places.planetCliffsTopSouthWestSide_Name() )
			]
		);
	}

	static planetCliffsTopSouthwest_Name() : string
	{
		return "Ekkis II - Cliffs - Top - Southwest";
	}

	// Places - Ekkis 2 - Caverns.

	planetCavernsBarrier(): Place
	{
		return this.place3
		(
			Places.planetCavernsBarrier_Name(),

			"You are in a cavern deep beneath the desert of the planet Ekkis II.  "
			+ "\n\n"
			+ "The path to the west is blocked by several closely spaced "
			+ "and intensely bright beams of light,"
			+ "which are emitted from small round ports the rock walls, "
			+ "and which pass into similar ports on the other side.  "
			+ "\n\n"
			+ "Okay, this is actually good news, though, right?  "
			+ "There must be something good past that barrier, "
			+ "or else why the barrier?  "
			+ "I mean, unless it's, like, an art installation or something.  "
			+ "Those always just make you feel stupid."
			+ "\n\n"
			+ "Beyond this barrier, the path rises up and curves to the right "
			+ "in a rough semicircle, leading along a higher path back to the east."
			+ "\n\n"
			+ "Back on this side of the barrier, a lower path leads back to the east.",

			[
				this.portal("east", Places.planetCavernsPool_Name() ),
				this.portal("west", Places.planetCavernsDrips_Name() )
			]
		);
	}

	static planetCavernsBarrier_Name(): string
	{
		return "Ekkis II - Caverns - Barrier";
	}

	planetCavernsDrips(): Place
	{
		return this.place3
		(
			Places.planetCavernsDrips_Name(),

			"You are in a cavern deep beneath the desert of the planet Ekkis II.  "
			+ "\n\n"
			+ "A passage runs to the east, where drips of a clear liquid "
			+ "fall intermittently from the ceiling.  "
			+ "Each drip passes into a small, precise hole in the floor "
			+ "that appears as if it were made to fit it."
			+ "\n\n"
			+ "If this is a water feature, it's got nothing on your grandparents' "
			+ "topless bronze torso model pouring a bottomless jar into a pool.  "
			+ "Which reminds you, they just don't make water features "
			+ "sexy like they used to."
			+ "\n\n"
			+ "To the west, another passage leads back "
			+ "toward the entrance to the caverns, "
			+ "curving left in a rough semicircle back down to the level below.",
			
			[
				this.portal("east", Places.planetCavernsProjectionRoom_Name() ),
				this.portal("west", Places.planetCavernsBarrier_Name() )
			]
		);
	}

	static planetCavernsDrips_Name(): string
	{
		return "Ekkis II - Caverns - Drips";
	}

	planetCavernsElevator(): Place
	{
		return this.place3
		(
			Places.planetCavernsElevator_Name(),

			"You stand at the bottom of the elevator that brought you down "
			+ "what seemes like hundreds of meters "
			+ "from the edge of a remote clifftop on the surface of a desert planet "
			+ "to a cool, dark, rocky cavern.  "
			+ "This setup all seems very inconvenient to you, "
			+ "but hey, at least it wasn't stairs."
			+ "\n\n"
			+ "The elevator door lies at the east side of the passage."
			+ "\n\n"
			+ "From there, the passage runs to the west, deeper into the cavern.",

			[
				this.portal("door", Places.planetCliffsTopNortheast_Name() ),
				this.portal("west", Places.planetCavernsGrating_Name() )
			]
		);
	}

	static planetCavernsElevator_Name(): string
	{
		return "Ekkis II - Caverns - Elevator";
	}

	planetCavernsGeyser(): Place
	{
		return this.place3
		(
			Places.planetCavernsGeyser_Name(),

			"You are in a cavern deep beneath the desert of the planet Ekkis II."
			+ "\n\n"
			+ "The passage to the west ends abruptly in a solid rock wall."
			+ "Nearby, a small geyser shoots out of a hole "
			+ "in the top of a stalagmite, wetly and steamily, "
			+ "but not in, like, a gross way."
			+ "\n\n"
			+ "Another passage leads back east, toward the cavern entrance.",

			[
				this.portal("west", Places.planetCavernsPool_Name() ),
				this.portal("east", Places.planetCavernsGrating_Name() ),

				this.emplacement
				(
					"wall",

					"Examining the wall closely, "
					+ "you see a faint rectangular outline of hairline cracks in the rock. "
					+ "It happens to a lot of us as we get older.  "
					+ "Geological age ain't nothin' but a number.  "
					+ "Well, usually a number and a unit.  Like 'megayear'."
				),

				this.emplacement
				(
					"geyser",

					"You examine the geyser.  "
					+ "Aw, what a bubbly, happy little guy. "
					+ "It's a good thing the sun isn't blazing so hot inside this cavern,"
					+ "Or you'd be tempted to take a drink of the steaming hot liquid.  "
					+ "And that would melt your esophagus."
				)
			]
		);
	}

	static planetCavernsGeyser_Name(): string
	{
		return "Ekkis II - Caverns - Geyser";
	}

	planetCavernsGrating(): Place
	{
		return this.place3
		(
			Places.planetCavernsGrating_Name(),

			"You are in a cavern deep beneath the desert of the planet Ekkis II, "
			+ "in a passage running from east to west."
			+ "In the floor leading to the west, a thick metal grating "
			+ "perforated with holes about 10 centimeters wide "
			+ "stretches from wall to wall across the entire passage. ",

			[
				this.emplacement
				(
					"grating",

					"You bend over and look closely at the grating."
					+ "You think you see something moving down there.  "
					+ "And maybe you hear some sloshing.  "
					+ "And, yeah, there's a smell.  "
					+ "For a metal grate in a cave, "
					+ "it's kind of a sensory smorgasbord."
				),

				this.portal("west", Places.planetCavernsGeyser_Name() ),
				this.portal("east", Places.planetCavernsElevator_Name() )
			]
		);
	}

	static planetCavernsGrating_Name(): string
	{
		return "Ekkis II - Caverns - Grating";
	}

	planetCavernsPool(): Place
	{
		return this.place3
		(
			Places.planetCavernsPool_Name(),

			"You are in a cavern deep beneath the desert of the planet Ekkis II. "
			+ "You stand on a wide ledge that runs south, back through a hidden doorway, "
			+ " where a plugged geyser steams fitfully.  To the west, the ledge runs "
			+ "through dark natural stone columns and on into the darkness.  "
			+ "Far below the ledge is a pool of clear liquid, "
			+ "with drips falling from holes in the ceiling to fill it.  "
			+ "A passage leads back to the east.",

			[
				this.portal("west", Places.planetCavernsBarrier_Name() ),
				this.portal("east", Places.planetCavernsGeyser_Name() )
			]
		);
	}

	static planetCavernsPool_Name(): string
	{
		return "Ekkis II - Caverns - Pool";
	}

	planetCavernsProjectionRoom(): Place
	{
		return this.place3
		(
			Places.planetCavernsProjectionRoom_Name(),

			"You are in a cavern deep beneath the desert of the planet Ekkis II. "
			+ "\n\n"
			+ "This space is completely dark at the moment.  "
			+ "Earlier, it was lit only " 
			+ "by a holographic projection of a triangular-headed alien.  "
			+ "In retrospect, that giant alien head really livened up the decor."
			+ "A passage leads back to the east.",

			[
				this.portal("west", Places.planetCavernsDrips_Name() ),
				this.portal("north", Places.planetCavernsSteamworks_Name() )
			]
		);
	}

	static planetCavernsProjectionRoom_Name(): string
	{
		return "Ekkis II - Caverns - Projection Room";
	}

	planetCavernsSteamworks(): Place
	{
		return this.place3
		(
			Places.planetCavernsSteamworks_Name(),

			"You are in a cavern deep beneath the desert of the planet Ekkis II. "
			+ "\n\n"
			+ "Arrays of giant metal pistons pump noisily away, "
			+ "leaking wisps of steam.  Too bad your awkward cousin isn't here, "
			+ "he'd be way into this."
			+ "\n\n"
			+ "A computer console with a monitor and standard data cartridge slot "
			+ "stands against the north wall.  Above it is a catwalk where members "
			+ "of a gray-skinned, large-eyed, triangular-headed alien species "
			+ "busily operate various inscrutable control systems."
			+ "\n\n"
			+ "To the west is a small, garage-like space, with a door at the end "
			+ "that appears to open onto a large elevator platform.",

			[
				this.portal("east", Places.planetCavernsProjectionRoom_Name() ),
				this.portal("skimmer", Places.planetSettlementBarFront_Name() )
			]
		);
	}

	static planetCavernsSteamworks_Name(): string { return "Ekkis II - Caverns - Steamworks"; }

	// Places - Ekkis 2 - Village of [Farting Noise].

	planetSettlementBarFront() : Place
	{
		return this.place3
		(
			Places.planetSettlementBarFront_Name(),

			"You stand in the tiny settlement named, "
			+ " as near as you can make out from the signs in Universal Phonospeak, "
			+ "[Farting Noise].  "
			+ "In the natives' defense, maybe their farts "
			+ "sound completely different from yours."
			+ "\n\n"
			+ "To the east stands a pourstone igloo with an arched entrance, "
			+ "above which is a lighted sign that reads "
			+ "'Poot-Poot-P-Phttt' in Universal Phonospeak,"
			+ "followed by 'BAR' in "
			+ "several of the more common, less aspirated, languages "
			+ "of this sector of space."
			+ "\n\n"
			+ "Several spaceships, presumably belonging to the bar's patrons,"
			+ "stand nearby."
			+ "\n\n"
			+ "To the west, you can see another, cubical building, with a few more "
			+ "run-down looking spaceships in front of it, and decorated with "
			+ "strings of cheap but festive plastic pennants."
			+ "\n\n"
			+ "Away to the north is the edge of another domelike building, "
			+ "possibly a store of some sort."
			+ "\n\n"
			+ "To the south, a faint shimmer in the air betrays the force field "
			+ "that protects this settlement from the native predatory sand-swimmers.  "
			+ "You look nervously at the field generator unit, "
			+ "which looks dusty, battered, and none too new.  "
			+ "But you're standing here, instead of in a sand-swimmer's belly, "
			+ "so you guess it must work.",

			[
				this.portal("north", Places.planetSettlementRobotShopWest_Name() ),
				this.portal("west", Places.planetSettlementUsedShipLot_Name() ),
				this.portal("east", Places.planetSettlementBarRear_Name() ),
				this.portal("south", Places.planetDesertDeep_Name() ),
				this.portal("bar", Places.planetSettlementBarInterior_Name() )
			]
		);
	}

	static planetSettlementBarFront_Name(): string
	{
		return "Ekkis II - [Farting Noise] - Bar - Front";
	}

	planetSettlementBarInterior() : Place
	{
		return this.place3
		(
			Places.planetSettlementBarInterior_Name(),

			"You stand inside the [Farting Noise] bar.  "
			+ "\n\n"
			+ "On a small stage, a band of garishly dressed bipeds "
			+ "manipulating complicated instruments loudly emits "
			+ "what you can only assume is a song, "
			+ "and that you can only further assume to be one of their hits.  "
			+ "Like every musical act in every bar ever, "
			+ "nobody pays them the least attention.  "
			+ "\n\n"
			+ "The bar proper runs along the opposite wall, "
			+ "where an expressionless bartender "
			+ "delivers drinks to patrons seated on stools, "
			+ "some of whom are engaged in conversation, "
			+ "or at least reciprocal bluster, with each other. "
			+ "Some of these patrons periodically expel clouds of smoke and/or vapor, "
			+ "which you suppose, under ordinary circumstances, might rise, "
			+ "except that the space nearer the apex of the dome "
			+ "is already full of similar high-opacity particulates "
			+ "and is not accepting further contributions at this time."
			+ "\n\n"
			+ "A cabinet housing some sort of video gambling machine "
			+ "stands in the back.  "
			+ "A squat cleaning robot busily sweeps the floor around the machine, "
			+ "then empties a load of its sweepings into a hatch in the back wall.",
			+ "A short stairway leads back outside."

			[
				this.portal("outside", Places.planetSettlementBarFront_Name() ),

				this.emplacement
				(
					"band",

					"You like some of their early stuff."
				),

				this.emplacement
				(
					"bar",
					"The light is neither very bright nor pleasant, "
					+ "nor is the bar polished."
				),

				this.emplacement
				(
					"machine",

					"It appears to be some variant of a slot machine.  "
					+ "When the player inserts some money "
					+ "and pulls the handle on the side, "
					+ "behind each of three little viewing slots, "
					+ "a reel printed with various symbols around its edge spins, "
					+ "eventually stopping so that a random symbol is visible through the slot."
					+ "If the symbols match, you presumably get some sort of prize."
					+ "\n\n"
					+ "You were never cool, or dumb, enough to enjoy gambling."
				),

				this.emplacement
				(
					"bartender",

					"This bartender doesn't appear to be the "
					+ "'listen to your problems' kind of bartender."
				),

				this.emplacement
				(
					"patrons",
					"I suppose 'patrons' is a rather grand name "
					+ "for this motley amalgamation of limbs, tongues, "
					+ "poor attitudes, and bad habits, "
					+ "but at least if we call them patrons we don't have to focus "
					+ "on their distinguishing characteristics."
				)
			]
		);
	}

	static planetSettlementBarInterior_Name(): string
	{
		return "Ekkis II - [Farting Noise] - Bar - Interior";
	}

	planetSettlementBarRear() : Place
	{
		return this.place3
		(
			Places.planetSettlementBarRear_Name(),

			"You stand behind the [Farting Noise] bar.  "
			+ "It is somewhat secluded here."
			+ "Anti-sand-swimmer force-fields block access to the surrounding desert "
			+ "to the east and south.  "
			+ "You can see another, larger building to the north.  "
			+ "\n\n"
			+ "As you stand around loitering behind a bar, ",
			+ "reflecting on how Mom said this is exactly how you'd end up,"
			+ "a hatch in the back wall of the bar opens "
			+ "and expels some fine white powder, "
			+ "which settles onto a larger heap of powder below.",

			[
				this.portal("north", Places.planetSettlementRobotShopWest_Name() ),
				this.portal("west", Places.planetSettlementUsedShipLot_Name() ),
				this.portal("east", Places.planetSettlementBarRear_Name() ),

				this.emplacement
				(
					"heap",

					"Finely divided white power.  Looks a bit like ashes."
				)
			]
		);
	}

	static planetSettlementBarRear_Name(): string
	{
		return "Ekkis II - [Farting Noise] - Bar - Rear";
	}

	planetSettlementRobotShopFront(): Place
	{
		return this.place3
		(
			Places.planetSettlementRobotShopFront_Name(),

			"You stand in the desert settlement of [Farting Noise], "
			+ "to the south of the entrance door of a domed building "
			+ "bearing the sign 'Buy, Robot'.  "
			+ "\n\n"
			+ "You figure that name is probably a half-haunched "
			+ "joking reference to something.  "
			+ "You generally don't get joking references, "
			+ "but you find they get even less funny "
			+ "if you ask someone to explain them.  So never mind."

			[
				this.portal("west", Places.planetSettlementRobotShopWest_Name() ),
				this.portal("door", Places.planetSettlementRobotShopInterior_Name() ),
			]
		);
	}

	static planetSettlementRobotShopFront_Name(): string
	{
		return "Ekkis II - Buy, Robot - Front";
	}

	planetSettlementRobotShopInterior(): Place
	{
		return this.place3
		(
			Places.planetSettlementRobotShopInterior_Name(),

			"You stand inside the [Farting Noise] branch of 'Buy, Robot'. "
			+ "Various currently-unmoving robots are displayed on pedestals, "
			+ "each bearing a more-or-less conspicious price tag.  "
			+ "A salesbeing watches you idly, perhaps waiting "
			+ "to see if you require assistance "
			+ "or if you're just going to ask to use the bathroom.  "
			+ "Maybe they're even making a little bet with themself "
			+ "over which it will be."
			+ "\n\n"
			+ "A door leads back outside, as doors do.",

			[
				this.portal("outside", Places.planetSettlementRobotShopFront_Name() )

				this.emplacement
				(
					"green robot",

					"As you move to examine the robot, "
					+ "the salesbeing smoothly interposes themself.  "
					+ "'This is the General Toiler S-34.  "
					+ "It's not for helping around the house.  "
					+ "It's not for helping around the garden.  "
					+ "It's not for helping around the kitchen.  "
					+ "What is it for, you ask?  "
					+ "It's for all those things!"
					+ "\n\n"
					+ "Here the salesbeing chuckles.  "
					+ "You suppose these moments must be the ones he lives for, "
					+ "if you can call that living."
					+ "\n\n"
					+ "Its price is 40 credits, or 32 with coupon.'"
				),

				this.emplacement
				(
					"bipedal robot",

					"As you move to examine the robot, "
					+ "the salesbeing smoothly interposes themself.  "
					+ "'This is the Astromatix Stardodger QG.  "
					+ "It's the best pilot/navigator robot money can buy.'  "
					+ "He slaps the robot's... pauldron?... briskly, and continues, "
					+ "'You can fit so many starmaps into this bad boy."
					+ "Its price is 45 credits, or 36 with coupon.'"
				),

				this.emplacement
				(
					"four-legged robot",

					"As you move to examine the robot, "
					+ "the salesbeing smoothly interposes themself.  "
					+ "'This is the Agron Cultivo F-12.  "
					+ "It's a farming robot.  "
					+ "Now, you might say, can't be much farming going on "
					+ "here on the deserts of Ekkis II.  And you'd be right.  "
					+ "But that just means you have an opportunity "
					+ "to get in on the ground floor.  "
					+ "Or the ground ground, in this case."
					+ "Its price is 300 credits, or 240 with coupon.'"
				),

				this.emplacement
				(
					"drill-faced robot",

					"As you move to examine the robot, "
					+ "the salesbeing smoothly interposes themself.  "
					+ "'This is the Stope & Adit Deep Dolly.  "
					+ "It's a mining robot.  "
					+ "And I always say, what's mine is yours."
					+ "Only 700 credits, or 560 with coupon.'"
				),

				this.emplacement
				(
					"gun-armed robot",

					"As you move to examine the robot, "
					+ "the salesbeing smoothly interposes themself.  "
					+ "'This is the BlackDark KLR-668 with Bioexclusion Package.  "
					+ "It's a military/security/military security robot.  "
					+ "We're technically only supposed to sell this to governments.  "
					+ "But if I may say so, you have a rather sovereign look about you, "
					+ "so I might be convinced to expedite the paperwork for you,"
					+ "provided the price is right. "
					+ "And that right price is 2500 credits, or 2000 with coupon.'"
				)

			]
		);
	}

	static planetSettlementRobotShopInterior_Name(): string
	{
		return "Ekkis II - Buy, Robot - Interior";
	}

	planetSettlementRobotShopWest(): Place
	{
		return this.place3
		(
			Places.planetSettlementRobotShopWest_Name(),

			"You stand in the desert settlement of [Farting Noise], "
			+ "to the west of a large domed building.  "
			+ "\n\n"
			+ "To the east, you can see the building's entrance, "
			+ "over which is a sign reading 'Buy, Robot'.  "
			+ "A smaller domed building housing a bar lies to the south. "
			+ "\n\n"
			+ "Further to the west, you see a spaceship standing "
			+ "at the northern edge of a brightly decorated lot "
			+ "containing several more ships."
			+ "\n\n"
			+ "A force field blocks access to the open desert to the north.  "
			+ "That's okay by you.  You haven't been out of the open desert "
			+ "long enough to get nostalgic about it.",

			[
				this.portal("south", Places.planetSettlementBarFront_Name() ),
				this.portal("east", Places.planetSettlementRobotShopFront_Name() ),
				this.portal("west", Places.planetSettlementNorthOfUsedShipLot_Name() )
			]
		);
	}

	static planetSettlementRobotShopWest_Name(): string
	{
		return "Ekkis II - Buy, Robot - West";
	}

	planetSettlementNorthOfUsedShipLot(): Place
	{
		return this.place3
		(
			Places.planetSettlementNorthOfUsedShipLot_Name(),

			"You stand in the desert settlement of [Farting Noise].  "
			+ "You see a spaceship standing here, and, to the south,"
			+ "a brightly decorated lot containing several more ships."
			+ " To the east, you see a large domed building. "
			+ "\n\n"
			+ "A smaller domed building with a sign that says 'Bar' lies to the southeast. "
			+ "\n\n"
			+ "A force field blocks access to the open desert to the north and west.  "
			+ "You idly wonder who's paying to run all these force fields.  "
			+ "Probably there's some kind of committee that takes up a periodic collection.  "
			+ "You envy whoever got the contract.  It's bound to be a steady job."
			+ "No matter where you go, "
			+ "people are always not going to want to be eaten.",

			[
				this.portal("east", Places.planetSettlementRobotShopWest_Name() ),
				this.portal("south", Places.planetSettlementUsedShipLot_Name() )
			]
		);
	}

	static planetSettlementNorthOfUsedShipLot_Name(): string
	{
		return "Ekkis II - [Farting Noise] - North of Non-Gelatinous George's Used Ships";
	}

	planetSettlementUsedShipLot(): Place
	{
		return this.place3
		(
			Places.planetSettlementNorthOfUsedShipLot_Name(),

			"You stand in the desert settlement of [Farting Noise], "
			+ "in a sandy lot brighly decorated with colorful pennants "
			+ " strung along lines, and containing several ships "
			+ "in various states of wear.  "
			+ "Just to the north you see another ship standing by itself."
			+ "\n\n"
			+ "At one edge of the lot is a small cubical building "
			+ "bearing a sign that says, 'Non-Gelatinous George's Used Ships'."
			+ "\n\n"
			+ "A domed building with a sign that says 'Bar', among other things, stands to the east. "
			+ "\n\n"
			+ "A larger domed building stands to the northeast. "
			+ "\n\n"
			+ "A force field blocks access to the open desert to the south and west, "
			+ "keeping out the predatory sand-swimmers, and, "
			+ "as Non-Gelatinous George would say, keeping in the savings.",

			[
				this.portal("east", Places.planetSettlementBarFront_Name() ),
				this.portal("north", Places.planetSettlementNorthOfUsedShipLot_Name() )
			]
		);
	}

	static planetSettlementUsedShipLot_Name(): string
	{
		return "Ekkis II - [Farting Noise] - Non-Gelatinous George's Used Ships";
	}

	// Places - enemyShip.

	enemyShipAirlockAntechamber(): Place
	{
		return this.place3
		(
			Places.enemyShipAirlockAntechamber_Name(),

			"This is the antechamber of an airlock on the Venipositor.",

			[
				// todo
			]
		);
	}

	static enemyShipAirlockAntechamber_Name(): string
	{
		return "Venipositor - Airlock - Antechamber";
	}

	enemyShipAirlockChamber(): Place
	{
		return this.place3
		(
			Places.enemyShipAirlockChamber_Name(),

			"This is the interior of one of the Venipositor's airlocks."
			+ "Doors at either end lead into and out of the Venipositor",

			[
				this.portal("in", Places.enemyShipAirlockAntechamber_Name() ),
				this.portal("out", Places.enemyShipAirlockExterior_Name() )
			]
		);
	}

	static enemyShipAirlockChamber_Name(): string
	{
		return "Venipositor - Airlock - Chamber";
	}

	enemyShipAirlockExterior(): Place
	{
		return this.place3
		(
			Places.enemyShipAirlockExterior_Name(),

			"This is the exterior of the Venipositor, near an airlock door.  "
			+ "The boundless sweep of space spreads out in all directions.",

			[
				this.portal("door", Places.enemyShipAirlockChamber_Name() ),
			]
		);
	}

	static enemyShipAirlockExterior_Name(): string
	{
		return "Venipositor - Exterior - Airlock Door";
	}

	enemyShipArmory(): Place
	{
		return this.place3
		(
			Places.enemyShipArmory_Name(),

			"This is the armory of the Venipositor.  "
			+ "At the aft end high counter, with a robot standing watch behind it, "
			+ "blocks the path to the weapon racks.  A door to forward leads back "
			+ "out onto the catwalk above the Stellar Juvenator chamber.",

			[
				this.portal("forward", Places.enemyShipStellarJuvenatorChamberCatwalk_Name() )
			]
		);
	}

	static enemyShipArmory_Name(): string
	{
		return "Venipositor - Armory";
	}

	enemyShipLaundry(): Place
	{
		return this.place3
		(
			Places.enemyShipLaundry_Name(),

			"This is a laundry room on the Venipositor.",

			[
				// todo
			]
		);
	}

	static enemyShipLaundry_Name(): string
	{
		return "Venipositor - Laundry";
	}

	enemyShipLowerDeckHallAft(): Place
	{
		return this.place3
		(
			Places.enemyShipLowerDeckHallAft_Name(),

			"This is the aft end of a hallway on the lower deck of the Venipositor.",

			[
				this.portal("forward", Places.enemyShipLowerDeckHallAmidships_Name() )
			]
		);
	}

	static enemyShipLowerDeckHallAft_Name(): string
	{
		return "Venipositor - Hall - Lower Deck - Aft";
	}

	enemyShipLowerDeckHallAmidships(): Place
	{
		return this.place3
		(
			Places.enemyShipLowerDeckHallAmidships_Name(),

			"This is the amidships section of a hallway on the lower deck of the Venipositor.",

			[
				this.portal("aft", Places.enemyShipLowerDeckHallAft_Name() ),
				this.portal("forward", Places.enemyShipLowerDeckHallFore_Name() )
			]
		);
	}

	static enemyShipLowerDeckHallAmidships_Name(): string
	{
		return "Venipositor - Hall - Lower Deck - Amidships";
	}

	enemyShipLowerDeckHallFore(): Place
	{
		return this.place3
		(
			Places.enemyShipLowerDeckHallFore_Name(),

			"This is the forward end of a hallway on the lower deck of the Venipositor.",

			[
				this.portal("aft", Places.enemyShipLowerDeckHallAmidships_Name() ),
			]
		);
	}

	static enemyShipLowerDeckHallFore_Name(): string
	{
		return "Venipositor - Hall - Lower Deck - Forward";
	}

	enemyShipNearbySpace(): Place
	{
		return this.place3
		(
			Places.enemyShipNearbySpace_Name(),

			"You are in your ship, hovering nearby the Venipositor.",

			[
				this.portal("out", Places.enemyShipAirlockExterior_Name() ),
			]
		);
	}

	static enemyShipNearbySpace_Name(): string
	{
		return "Venipositor - Nearby Space";
	}

	enemyShipShuttleBay(): Place
	{
		return this.place3
		(
			Places.enemyShipShuttleBay_Name(),

			"This is the shuttle bay of the Venipositor.",

			[
				// todo
			]
		);
	}

	static enemyShipShuttleBay_Name(): string
	{
		return "Venipositor - Shuttle Bay";
	}

	enemyShipStellarJuvenatorChamber(): Place
	{
		return this.place3
		(
			Places.enemyShipStellarJuvenatorChamber_Name(),

			"This is a cavernous room on the Venipositor.  "
			+ "The Stellar Juvenator is mounted on a pedestal, "
			+ "with an armed guard standing nearby.  "
			+ "A catwalk runs overhead.",

			[
				// todo
			]
		);
	}

	static enemyShipStellarJuvenatorChamber_Name(): string
	{
		return "Venipositor - Stellar Juvenator Chamber";
	}

	enemyShipStellarJuvenatorChamberCatwalk(): Place
	{
		return this.place3
		(
			Places.enemyShipStellarJuvenatorChamberCatwalk_Name(),

			"You are standing on a railed catwalk above a "
			+ " cavernous chamber on the Venipositor.  "
			+ "On the floor, far below, the Stellar Juvenator"
			+ "is mounted on a pedestal, "
			+ "with an armed guard standing nearby.  "
			+ "The catwalk runs fore and aft.",

			[
				this.portal("aft", Places.enemyShipArmory_Name()),
				this.portal("forward", "todo"),
			]
		);
	}

	static enemyShipStellarJuvenatorChamberCatwalk_Name(): string
	{
		return "Venipositor - Stellar Juvenator Chamber - Catwalk";
	}

	enemyShipUpperDeckHallAft(): Place
	{
		return this.place3
		(
			Places.enemyShipUpperDeckHallAft_Name(),

			"This is the aft end of a hallway on the upper deck of the Venipositor.",

			[
				this.portal("forward", Places.enemyShipUpperDeckHallAmidships_Name() ),
			]
		);
	}

	static enemyShipUpperDeckHallAft_Name(): string
	{
		return "Venipositor - Hall - Upper Deck - Aft";
	}

	enemyShipUpperDeckHallAmidships(): Place
	{
		return this.place3
		(
			Places.enemyShipUpperDeckHallAmidships_Name(),

			"This is the amidships section of a hallway "
			+ "on the upper deck of the Venipositor.",

			[
				this.portal("aft", Places.enemyShipUpperDeckHallAft_Name() ),
				this.portal("forward", Places.enemyShipUpperDeckHallFore_Name() ),
			]
		);
	}

	static enemyShipUpperDeckHallAmidships_Name(): string
	{
		return "Venipositor - Hall - Upper Deck - Amidships";
	}

	enemyShipUpperDeckHallFore(): Place
	{
		return this.place3
		(
			Places.enemyShipUpperDeckHallFore_Name(),

			"This is the forward end of a hallway on the upper deck of the Venipositor.",

			[
				this.portal("aft", Places.enemyShipUpperDeckHallAmidships_Name() ),
			]
		);
	}

	static enemyShipUpperDeckHallFore_Name(): string
	{
		return "Venipositor - Hall - Upper Deck - Forward";
	}

	enemyShipVentilationShaft1(): Place
	{
		return this.place3
		(
			Places.enemyShipVentilationShaft1_Name(),

			"This is a ventilation shaft on the Venipositor.  "
			+ "A short side branch leads to a vent cover.",

			[
				this.portal("back", Places.enemyShipVentilationShaft4_Name() ),
				this.portal("forward", Places.enemyShipVentilationShaft1_Name() ),
				this.portal("vent", Places.enemyShipAirlockAntechamber_Name() )
			]
		);
	}

	static enemyShipVentilationShaft1_Name(): string
	{
		return "Venipositor - Ventilation Shaft - 1";
	}

	enemyShipVentilationShaft2(): Place
	{
		return this.place3
		(
			Places.enemyShipVentilationShaft2_Name(),

			"This is a ventilation shaft on the Venipositor.  "
			+ "A short side branch leads to a vent cover.",

			[
				this.portal("back", Places.enemyShipVentilationShaft1_Name() ),
				this.portal("forward", Places.enemyShipVentilationShaft3_Name() ),
				this.portal("vent", Places.enemyShipLaundry_Name() )
			]
		);
	}

	static enemyShipVentilationShaft2_Name(): string
	{
		return "Venipositor - Ventilation Shaft - 2";
	}

	enemyShipVentilationShaft3(): Place
	{
		return this.place3
		(
			Places.enemyShipVentilationShaft3_Name(),

			"This is a featureless stretch of ventilation shaft on the Venipositor.",

			[
				this.portal("back", Places.enemyShipVentilationShaft2_Name() ),
				this.portal("forward", Places.enemyShipVentilationShaft4_Name() )
			]
		);
	}

	static enemyShipVentilationShaft3_Name(): string
	{
		return "Venipositor - Ventilation Shaft - 3";
	}

	enemyShipVentilationShaft4(): Place
	{
		return this.place3
		(
			Places.enemyShipVentilationShaft4_Name(),

			"This is a featureless stretch of ventilation shaft on the Venipositor.",

			[
				this.portal("back", Places.enemyShipVentilationShaft3_Name() ),
				this.portal("forward", Places.enemyShipVentilationShaft1_Name() )
			]
		);
	}

	static enemyShipVentilationShaft4_Name(): string
	{
		return "Venipositor - Ventilation Shaft - 4";
	}
}

class Scripts
{
	_All: Script[];

	constructor()
	{
		var scriptMethods =
		[
			this.agentSarienTalkTo,
			this.emplacementBodyEmptySearch,
			this.emplacementBodyKeycardSearch,
			this.itemCartridgeUse,
			this.itemKeycardUse,
			this.placefriendlyShipEscapePod_GoDoor,
			this.placefriendlyShipEscapePod_PressAutonavButton,
			this.placefriendlyShipEscapePod_PressLaunchButton,
			this.placefriendlyShipJanitorsCloset_Update,
			this.placefriendlyShipLibrary_TalkToMan,
			this.placefriendlyShipLibrary_Type,
			this.placefriendlyShipUpperDeckHallAmidships_Update,
			this.todo
		];

		var scripts = new Array<Script>();

		for (var i = 0; i < scriptMethods.length; i++)
		{
			var scriptMethod = scriptMethods[i];

			var scriptName = scriptMethod.name;

			var script = new Script(scriptName, scriptMethod);

			scripts.push(script);
		}

		this._All = scripts;
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

	emplacementBodyEmptySearch
	(
		u: Universe, w: World, place: Place, command: Command, target: any
	): void
	{
		var message: string;

		if (target != null)
		{
			message = "You can't use the crewperson's body on anything.";
		}
		else
		{
			message = "You find nothing in the crewperson's pockets.";
		}

		u.messageEnqueue(message);
	}

	emplacementBodyKeycardSearch
	(
		u: Universe, w: World, place: Place, command: Command, target: any
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
				"keycard", "This is an access keycard for the starship friendlyShip."
			);
			place.itemAdd(itemKeycard);

			var emplacementBody = place.emplacements.find(x => x.name == "body");
			emplacementBody.commands.length = 0;
		}

		u.messageEnqueue(message);
	}

	itemCartridgeUse(u: Universe, w: World, p: Place, c: Command): void
	{
		var message;

		if (p.emplacementByName("reader") == null)
		{
			message = "There is no cartridge reader here.";
		}
		else
		{
			message =
				"You insert the cartridge into the reader.  "
				+ "The display lights up with glowing text, "
				+ "describing the majestic formation of astral bodies, "
				+ "and their complex and sometimes surprising relationships "
				+ "with all life in the universe."
				+ "\n\n"
				+ "My word, it's boring.  School never was your strong suit.";
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

	placefriendlyShipEscapePod_GoDoor
	(
		u: Universe, w: World, place: Place, portalDoor: Portal
	): any
	{
		var portalDoorPlaceDestinationName =
			portalDoor.placeDestinationName;

		if (portalDoorPlaceDestinationName == null)
		{
			var message =
				"You're in deep space.  There's nothing outside "
				+ " worth opening the door for.";
			u.messageEnqueue(message);
		}
		else
		{
			portalDoor.goThrough(u, w);
		}

		u.messageEnqueue(message);
	}

	placefriendlyShipEscapePod_PressAutonavButton
	(
		u: Universe, w: World, p: Place, c: Command
	): any
	{
		var messageLines =
		[
			"You press the autonav button, and the pod reorients itself ",
			"and engages its main drive, then its hyperdrive.  ",
			"The window fills with the hypnotic lights of hyperspace.  ",
			"\n\n",
			"After several hours, the pod approaches its destination, ",
			"a desert planet the nav computer calls Ekkis II.  ",
			"The pod enters orbit of the planet, ",
			"selects the largest (but still tiny) settlement on the surface, ",
			"and begins its descent through the atmosphere.",
			"\n\n",
			"That's when you hear a loud bang, then a metallic tearing sound.  ",
			"Oh, that's right, the planetfall system is compromised.",
			"\n\n",
			"It's a rough ride down, and you get pretty shaken up.",
			"The worst part is the sudden stop at the end.",
			"You survive it, but the pod doesn't.  It'll never fly again.",
			"Through the shattered window you see the dunes of a desert.",
			"But no settlement.  It appears the pod has crashed ",
			"hundreds of kilometers from the intended landing site."
		];

		u.messageEnqueue(messageLines.join(""));

		p.portalByName("door").placeDestinationName =
			Places.planetDesertCrashSite_Name();
	}

	placefriendlyShipEscapePod_PressLaunchButton(u: Universe, w: World, p: Place, c: Command): any
	{
		var messageLines =
		[
			"You press the button, and the pod shudders into motion.  ",
			"It rises off the deck, then, with a burst of thrusters, ",
			"glides through the cargo bay doors ",
			"and away into the free space around the Pax Aeterna.",
			"\n\n",
			"And not a moment too soon.  No sooner does the pod ",
			"reach the minimum safe distance than the Pax Aeterna ",
			"lights up in a cascade of explosions ",
			"and, in a matter of seconds, rips itself to flinders.",
			"\n\n",
			"Okay, remember before, when I mentioned minimum safe distance?  ",
			"Well, maybe I was wrong about that, ",
			"because an almost invisibly fast piece of debris from the wreck ",
			"strikes the pod, its transferred momentum ",
			"causing the pod to spin wildly for a few seconds, ",
			"before the automatic attitude controls dampen the rotation.  ",
			"An angry red status light appears on the pod's control console ",
			"that reads 'planetfall system compromised'.  Ooh boy."
		];

		u.messageEnqueue(messageLines.join(""));

		var stateEscapePodLocation = "EscapePodLocation";

		p.stateWithNameSetToValue(stateEscapePodLocation, "DeepSpace");
	}

	placefriendlyShipJanitorsCloset_Update(u: Universe, w: World, p: Place, c: Command): any
	{
		if (p.hasBeenVisited() == false)
		{
			p.visit();

			var messageLines =
			[
				"Space Adventure Game Clone",
				"\n\n",

				"You are jolted awake to find yourself ",
				"in the office/supply closet/quarters ",
				"of the Maintenance Specialist (Sanitation Grade) ",
				"of the starship Pax Aeterna, " ,
				"currently on an urgent mission to...",
				"\n\n",

				"...something or other, ",
				"you weren't really listening when they said.  ",
				"Probably they're in the process of saving... something or other; ",
				"they usually are.  The day, if you had to guess.  ",
				"You appreciate their motivation, but don't really share it.  ",
				"You don't even like the day that much, honestly.",
				"\n\n",

				"You had been napping, on duty, ",
				"but now you've been awakened by a loud klaxon.  ",
				"Party foul."
			];

			u.messageEnqueue(messageLines.join(""));
		}
	}

	placefriendlyShipLibrary_TalkToMan(u: Universe, w: World, p: Place, c: Command): any
	{
		var stateScientistIsDeadName = "ScientistIsDead";

		var scientistIsDead = p.stateWithNameIsTrue(stateScientistIsDeadName);

		var message = "";
		if (scientistIsDead)
		{
			message = "Yeah, he's dead.  Ninety-five percent sure this time.";
		}
		else
		{
			message =
			[
				"As you bend down to check on the man in the lab coat, ",
				"his eyes spring open.  He stares at you wildly, ",
				"weakly clutching and unclutching his fingers, ",
				"then points shakily at the shelves of data cartridges ",
				"and harshly croaks out the words 'astral bodies'.  ",
				"\n\n",
				"Then he dies.  You think.  You're not a doctor.  ",
				"But when the roto-scrubber looked as bad as he does, ",
				"you had to get a new roto-scrubber."
			].join("");

			p.stateWithNameSetToTrue(stateScientistIsDeadName);
		}

		u.messageEnqueue(message);

	}

	placefriendlyShipLibrary_Type(u: Universe, w: World, p: Place, c: Command): any
	{
		var commandText = c.text();

		var commandTextWords = commandText.split(" ");
		var cartridgeNameTyped =
			commandTextWords.slice(1).join(" ").toLowerCase();

		var message = "";

		if (cartridgeNameTyped == "")
		{
			message =
				"Right, I forgot that you failed Remedial Lib-Sci 0001.  "
				+ "Try adding the title of the tape you want retrieved.";
		}
		else if (cartridgeNameTyped == "astral bodies")
		{
			message =
				"You type 'astral bodies' (without the quotes: protip) "
				+ "into the control console's keyboard.  "
				+ "The retrieval robot skitters into action, "
				+ "traversing the shelves with a fluid rhythm of limbs "
				+ "that makes you feel both jealous and a little grossed-out.  "
				+ "It plucks a data tape from its place "
				+ "and returns it to the console, "
				+ "where it drops it into the retrieval hopper.  "
				+ "(See?  You just don't get that kind of satisfying clatter "
				+ "with solid-state.)";

			p.itemAdd
			(
				Item.fromNameAndDescription
				(
					"cartridge",
					"A label printed on this data cartridge reads 'Astral Bodies'."
				).commandAdd
				(
					new Command
					(
						[
							"put cartridge in reader",
							"put cartridge in slot",
							"use cartridge on reader"
						],
						Scripts.Instance().itemCartridgeUse.name
					)
				)
			);
		}
		else
		{
			message =
				"The cartridge-retrieval control console buzzes politely, "
				+ "to the extent that a buzz can be polite, "
				+ "and displays an error message: "
				+ "'No cartridge with the specified title could be found.'"
		}

		u.messageEnqueue(message);
	}

	placefriendlyShipUpperDeckHallAmidships_Update
	(
		u: Universe, w: World, p: Place, c: Command
	): any
	{
		if (p.hasBeenVisited() == false)
		{
			p.visit();

			var messageLines =
			[
				"You notice, as you stumble out of the supply closet, ",
				"that unfortunately not only is the klaxon louder in the hall, ",
				"but it's also joined by annoying flashing red lights, ",
				"as well as somebody saying 'intruder alert' over and over, ",
				"with, it must be said, an disproportionate lack of alarm.  ",
				"On the positive side, after several seconds of this, ",
				"both the klaxon and the lights stop abruptly.",
				"\n\n",
				"Probably nothing to worry about, right?"
			]
			var message = messageLines.join("");
			u.messageEnqueue(message);

			var placeDescription = p.description;
			u.messageEnqueue(placeDescription);
		}
	}

	todo(u: Universe, w: World, p: Place, i: any, target: any): void
	{
		u.messageEnqueue("todo");
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
