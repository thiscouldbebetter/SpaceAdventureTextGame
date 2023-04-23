
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

		var p = (name: string, description: string, scriptName: string, objects: any[]) =>
			Place.fromNameDescriptionScriptNameAndObjects(name, description, scriptName, objects);

		var portalDescription = "This is an exit.";

		var places =
		[

		];

		var commands = Command.Instances()._All;

		var scriptsAll = new Array<Script>;

		var commandsAsScripts = commands.map((x: Command) => x._scriptExecute);
		scriptsAll.push(...commandsAsScripts);

		scriptsAll.push(...scriptsCustom._All);

		var returnValue = new World
		(
			"Demo World",
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

	ArcadiaEngineeringDeckHallAft: Place;
	ArcadiaEngineeringDeckHallAmidships: Place;
	ArcadiaEngineeringDeckHallForward: Place;

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

	DeltaurAirlockChamber: Place;
	DeltaurAirlockExterior: Place;
	DeltaurAirlockInterior: Place;

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

	KeronaCliffsBottomNorth: Place;
	KeronaCliffsBottomNortheast: Place;
	KeronaCliffsBottomNorthwest: Place;
	KeronaCliffsBottomSouth: Place;
	KeronaCliffsBottomSoutheast: Place;
	KeronaCliffsBottomSouthwest: Place;

	KeronaCliffsTopNorth: Place;
	KeronaCliffsTopNortheast: Place;
	KeronaCliffsTopNorthwest: Place;
	KeronaCliffsTopSouth: Place;
	KeronaCliffsTopSoutheast: Place;
	KeronaCliffsTopSouthwest: Place;

	KeronaDesertCrashSite: Place;
	KeronaDesertEast: Place;
	KeronaDesertNorth: Place;
	KeronaDesertWest: Place;

	KeronaEscapePod: Place;

	KeronaUlenceFlatsBarFront: Place;
	KeronaUlenceFlatsBarInterior: Place;
	KeronaUlenceFlatsBarRear: Place;
	KeronaUlenceFlatsDroidsBWeFront: Place;
	KeronaUlenceFlatsDroidsBWeInterior: Place;
	KeronaUlenceFlatsDroidsBWeWest: Place;
	KeronaUlenceFlatsNorthOfTinysUsedShips: Place;
	KeronaUlenceFlatsTinysUsedShips: Place;

	constructor
	(
		var p = (n: string) => Place.fromName(n);

		this.ArcadiaBridge = this.arcadiaBridge;

		this.ArcadiaJanitorsCloset = this.arcadiaJanitorsCloset();

		this.ArcadiaDockingBayAntechamber = this.arcadiaDockingBayAntechamber();
		this.ArcadiaDockingBayHangar = this.arcadiaDockingBayHangar();

		this.ArcadiaEngineeringDeckAft = this.arcadiaEngineeringDeckAft();
		this.ArcadiaEngineeringDeckAmidships = this.arcadiaEngineeringDeckAmidships();
		this.ArcadiaEngineeringDeckForward = this.arcadiaEngineeringDeckForward();

		this.ArcadiaEscapePod = this.arcadiaEscapePod();

		this.ArcadiaLibrary = this.arcadiaLibrary();

		this.ArcadiaUpperDeckHallAft = p("Arcadia - Upper Deck - Hall - Aft");
		this.ArcadiaUpperDeckHallAmidships = p("Arcadia - Upper Deck - Hall - Amidships");
		this.ArcadiaUpperDeckHallForward = p("Arcadia - Upper Deck - Hall - Forward");

		this.ArcadiaLowerDeckHallAft = p("Arcadia - Lower Deck - Hall - Aft");
		this.ArcadiaLowerDeckHallAmidships = p("Arcadia - Lower Deck - Hall - Amidships");
		this.ArcadiaLowerDeckHallForward = p("Arcadia - Lower Deck - Hall - Forward");

		this.DeepSpaceEscapePod = p("Deep Space - Escape Pod");

		this.KeronaCliffsBottomNorth = p("Kerona - Cliffs - North");
		this.KeronaCliffsBottomNortheast = p("Kerona - Cliffs - Northeast");
		this.KeronaCliffsBottomNorthwest = p("Kerona - Cliffs - Northwest");
		this.KeronaCliffsBottomSouth = p("Kerona - Cliffs - South");
		this.KeronaCliffsBottomSoutheast = p("Kerona - Cliffs - Southeast");
		this.KeronaCliffsBottomSouthwest = p("Kerona - Cliffs - Southwest");

		this.KeronaCliffsTopNorthTop = p("Kerona - Cliffs - North - Top");
		this.KeronaCliffsTopNortheastTop = p("Kerona - Cliffs - Northeast - Top");
		this.KeronaCliffsTopNorthwestTop = p("Kerona - Cliffs - Northwest - Top");
		this.KeronaCliffsTopSouthTop = p("Kerona - Cliffs - South - Top");
		this.KeronaCliffsTopSoutheastTop = p("Kerona - Cliffs - Southeast - Top");
		this.KeronaCliffsTopSouthwestTop = p("Kerona - Cliffs - Southwest - Top");

		this.KeronaDesertCrashSite = p("Kerona - Desert - Crash Site");
		this.KeronaDesertNorth = p("Kerona - Desert - North");
		this.KeronaDesertSouth = p("Kerona - Desert - South");
		this.KeronaDesertWest = p("Kerona - Desert - West");

		this.KeronaEscapePod = p("Kerona - Escape Pod");

		this.KeronaUlenceFlatsBarFront = p("Kerona - Ulence Flats - Bar - Front");
		this.KeronaUlenceFlatsBarInterior = p("Kerona - Ulence Flats - Bar - Interior");
		this.KeronaUlenceFlatsBarRear = p("Kerona - Ulence Flats - Bar - Rear");
		this.KeronaUlenceFlatsDroidsBWeFront = p("Kerona - Ulence Flats - Droids-B-We - Front");
		this.KeronaUlenceFlatsDroidsBWeInterior = p("Kerona - Ulence Flats - Droids-B-We - Interior");
		this.KeronaUlenceFlatsDroidsBWeWest = p("Kerona - Ulence Flats - Droids-B-We - West");
		this.KeronaUlenceFlatsNorthOfTinysUsedShips = p("Kerona - Ulence Flats - North of Tiny's Used Ships");
		this.KeronaUlenceFlatsTinysUsedShips = p("Kerona - Ulence Flats - Tiny's Used Ships");
	)

	static _instance: Places;
	static Instances(): Places
	{
		if (Places._instance == null)
		{
			Places._instance = new Places();
		}
		return Places._instance;
	} 

	emplacement(name: string): Emplacement
	{
		return Emplacement.fromName(name);
	}

	place(name: string, description: string, objects: any[]): Place
	{
		return Place.fromNameDescriptionScriptNameAndObjects
		(
			name,
			description,
			null, // scriptName
			objects
		);
	}

	portal(name: string, placeDestinationName: string): Portal
	{
		return new Portal(name, null, placeDestinationName);
	}

	// Places.

	arcadiaBridge()
	{
		return this.place
		(
			this.arcadiaBridge_Name(),

			"This is the command bridge of the starship Arcadia.  "
			+ "A large transparent hemispherical dome arches overhead, "
			+ "showing the brilliantly shining surrounding stars."
			+ "Banks of mostly incomprehensible controls "
			+ "line the circular wall, with the nearby seats ",
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

	arcadiaDockingBayAntechamber()
	{
		return this.place
		(
			this.arcadiaDockingBayAntechamber_Name(),

			"This is the antechamber of the Arcadia's docking bay.  "
			+ "A large airlock door leads to the hangar.  "
			+ "A control console occupies one wall, while "
			+ "on the opposite wall are two closets, with a pair of " 
			+ " buttons at chest height between them. "
			+ " An elevator leads back to the engineering deck."

			[
				this.portal("airlock", this.arcadiaDockingBayHangar_Name())
				this.portal("elevator", this.arcadiaEngineeringDeckAft_Name())

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
			+ " and keeps everything safely sheltered when closed."

			[
				this.portal("door", this.arcadiaDockingBayAntechamber_Name())

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
				this.portal("fore", this.arcadiaEngineeringDeckAmidships_Name() ),

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
			+ "running beneath that window.  The bodies of two crewmen lie on the floor." 

			[
				this.emplacement("body")
				this.emplacement("controls")
				this.emplacement("dome")
				this.emplacement("window")
			]
		);
	}

	arcadiaEngineeringDeckAft_Name(): string
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
			this.arcadiaEngineeringDeckAft_Name(),

			"This is the interior of one of the Arcadia's escape pods."
			+ "Through its front window, you can see the doors of hangar bay."
			+ "Beneath the window is a console with various controls, "
			+ "including a throttle, a monitor screen, and some buttons. "
			+ "A padded seat with safety belts fills the center of the pod's cabin.  "
			+ "A gull-wing door in the left wall of the pod allows entry and exit.  "
			+ "Opposite the door, on the starboard wall, a survival kit is mounted."

			[
				this.portal("door", this.arcadiaDockingBayHangar_Name() ),

				this.emplacement("autonav button"),
				this.emplacement("buttons"),
				this.emplacement("console"),
				this.emplacement("don't button"),
				this.emplacement("monitor screen"),
				this.emplacement("safety belt"),
				this.emplacement("survival kit"),
				this.emplacement("throttle"),
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

			scriptsCustom.PlaceArcadiaJanitorsCloset,

			[
				this.portal("hall", PlaceNames.ArcadiaJanitorsCloset),
			]
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
			+ "On one wall is a control console with a keyboard and screen, ",
			+ "a spiderlike droid clinging to the wall just above it."
			+ "A man wearing a scientist's smock lies face-down "
			+ " on the floor in front of the console. "

			scriptsCustom.PlaceArcadiaJanitorsCloset,

			[
				this.portal("fore", this.ArcadiaUpperDeckHallForward_Name),
				this.portal("aft", this.ArcadiaUpperDeckHallAmidships_Name),

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

	arcadiaUpperDeckHallAmidships(): Place
	{
		return this.place
		(
			this.arcadiaUpperDeckHallAmidships_Name(),

			"This is a hallway in the spaceship Arcadia.  "
			+ "The hall continues to forward and to aft.  "
			+ "In the middle is a door leading to the janitor's closet, "
			+ "which is where you, our hero, came in to this story.",

			scriptsCustom.PlaceArcadiaUpperDeckHallAmidshipsUpdate.name,

			[
				this.portal("closet", this.arcadiaJanitorsCloset_Name()),
				this.portal("fore", this.arcadiaUpperDeckHallForward_Name()),
				this.portal("aft", this.arcadiaUpperDeckHallAft_Name())
			]
		);
	}

	arcadiaUpperDeckHallAmidships_Name(): string
	{
		return "Arcadia - Upper Deck - Hall - Amidships";
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
		this.ItemKecyardUse = s("ItemKeycardUse", this.itemKeycardUse);
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

			emplacementDeadCrewpersonUse._scriptUseName = null;
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

	static isSharpened(): string
	{
		return "isSharpened";
	}

	static isUnlocked(): string
	{
		return "isUnlocked";
	}
}
