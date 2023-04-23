
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
	
}

class Places
{
	ArcadiaBridge: string;

	ArcadiaDockingBayHangar: string;
	ArcadiaDockingBayVestibule: string;

	ArcadiaEngineeringDeckHallAft: string;
	ArcadiaEngineeringDeckHallAmidships: string;
	ArcadiaEngineeringDeckHallForward: string;

	ArcadiaJanitorsCloset: string;

	ArcadiaLibrary: string;

	ArcadiaLowerDeckHallAft: string;
	ArcadiaLowerDeckHallAmidships: string;
	ArcadiaLowerDeckHallForward: string;

	ArcadiaUpperDeckHallAft: string;
	ArcadiaUpperDeckHallAmidships: string;
	ArcadiaUpperDeckHallForward: string;

	EscapePod: string;

	KeronaCliffsBottomNorth: string;
	KeronaCliffsBottomNortheast: string;
	KeronaCliffsBottomNorthwest: string;
	KeronaCliffsBottomSouth: string;
	KeronaCliffsBottomSoutheast: string;
	KeronaCliffsBottomSouthwest: string;

	KeronaCliffsTopNorth: string;
	KeronaCliffsTopNortheast: string;
	KeronaCliffsTopNorthwest: string;
	KeronaCliffsTopSouth: string;
	KeronaCliffsTopSoutheast: string;
	KeronaCliffsTopSouthwest: string;

	KeronaDesertCrashSite: string;
	KeronaDesertEast: string;
	KeronaDesertNorth: string;
	KeronaDesertWest: string;

	KeronaUlenceFlatsBarFront: string;
	KeronaUlenceFlatsBarInterior: string;
	KeronaUlenceFlatsBarRear: string;
	KeronaUlenceFlatsDroidsBWeFront: string;
	KeronaUlenceFlatsDroidsBWeInterior: string;
	KeronaUlenceFlatsNorthwest: string;
	KeronaUlenceFlatsNorthwest: string;
	KeronaUlenceFlatsTinysUsedShips: string;

	constructor
	(
		var p = (n: string) => Place.fromName(n);

		this.ArcadiaBridge = p("Arcadia - Bridge");

		this.ArcadiaJanitorsCloset = this.arcadiaJanitorsCloset();

		this.ArcadiaDockingBayHangar = p("Arcadia - Docking Bay - Hangar");
		this.ArcadiaDockingBayVestibule = p("Arcadia - Docking Bay - Vestibule");

		this.ArcadiaEngineeringDeckAft = p("Arcadia - Engineering Deck - Aft");
		this.ArcadiaEngineeringDeckAmidships = p("Arcadia - Engineering Deck - Amidships");
		this.ArcadiaEngineeringDeckForward = p("Arcadia - Engineering Deck - Forward");

		this.ArcadiaLibrary = p("Arcadia - Library");

		this.ArcadiaUpperDeckHallAft = p("Arcadia - Upper Deck - Hall - Aft");
		this.ArcadiaUpperDeckHallAmidships = p("Arcadia - Upper Deck - Hall - Amidships");
		this.ArcadiaUpperDeckHallForward = p("Arcadia - Upper Deck - Hall - Forward");

		this.ArcadiaLowerDeckHallAft = p("Arcadia - Lower Deck - Hall - Aft");
		this.ArcadiaLowerDeckHallAmidships = p("Arcadia - Lower Deck - Hall - Amidships");
		this.ArcadiaLowerDeckHallForward = p("Arcadia - Lower Deck - Hall - Forward");

		this.EscapePod = p("Escape Pod");

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

		this.KeronaUlenceFlatsBarFront = p("Kerona - Ulence Flats - Bar - Front");
		this.KeronaUlenceFlatsBarInterior = p("Kerona - Ulence Flats - Bar - Interior");
		this.KeronaUlenceFlatsBarRear = p("Kerona - Ulence Flats - Bar - Rear");
		this.KeronaUlenceFlatsDroidsBWeFront = p("Kerona - Ulence Flats - Droids-B-We - Front");
		this.KeronaUlenceFlatsDroidsBWeInterior = p("Kerona - Ulence Flats - Droids-B-We - Interior");
		this.KeronaUlenceFlatsNorthwest = p("Kerona - Ulence Flats - North");
		this.KeronaUlenceFlatsNorthwest = p("Kerona - Ulence Flats - Northwest");
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
			"Arcadia - Bridge",

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

	arcadiaJanitorsCloset()
	{
		return this.place
		(
			"Arcadia - Janitor's Closet",

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

	arcadiaUpperDeckHallAmidships()
	{
		return this.place
		(
			"Arcadia - Upper Deck - Hall - Amidships",

			"This is a hallway in the spaceship Arcadia.  "
			+ "The hall continues to forward and to aft.  "
			+ "In the middle is a door leading to the janitor's closet, "
			+ "which is where you, our hero, came in to this story.",

			scriptsCustom.PlaceArcadiaUpperDeckHallAmidshipsUpdate.name,

			[
				new Portal("closet", portalDescription, PlaceNames.ArcadiaJanitorsCloset),
				new Portal("fore", portalDescription, PlaceNames.ArcadiaUpperDeckHallForward),
				new Portal("aft", portalDescription, PlaceNames.ArcadiaUpperDeckHallAft)
			]
		);
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
