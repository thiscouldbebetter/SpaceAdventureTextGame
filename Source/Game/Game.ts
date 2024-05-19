
class Game
{
	static worldBuild(): World
	{
		var player = Agent.fromNames
		(
			[ "self", "me", "myself" ]
		).descriptionSet
		(
			"This is you.  You have to start getting used to this.",
		).itemsAdd
		(
			[
				Item.fromNamesAndDescription
				(
					[ "washrag", "rag" ],

					"This is a rag you use to clean things sometimes.  "
					+ "You may or may not have given it a name.  "
					+ "And a backstory."
				)
			]
		);

		var scriptsCustom = new Scripts();

		var regions = new Regions();

		var items = new Items();

		var commands = Command.Instances()._All;

		var scriptsAll = new Array<Script>();

		var commandsAsScripts = commands.map((x: Command) => x._scriptExecute);
		scriptsAll.push(...commandsAsScripts);

		scriptsAll.push(...scriptsCustom._All);

		var placeInitialName = Places.friendlyShipJanitorsCloset_Name();

		var returnValue = new World
		(
			"Space_Adventure_Game",
			regions._All,
			items._All,
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
	Multitool: Item;
	OratPart: Item;
	PulseRifle: Item;
	ReflectiveGlass: Item;
	SkimmerKey: Item;
	SpaceSuit: Item;
	SurvivalKit: Item;

	_All: Item[];

	constructor()
	{
		this.DehydratedWater = this.dehydratedWater();
		this.Gadget = this.gadget();
		this.GasGrenade = this.gasGrenade();
		this.Keycard = this.keycard();
		this.Multitool = this.multitool();
		this.ReflectiveGlass = this.reflectiveGlass();
		this.SkimmerKey = this.skimmerKey();
		this.SpaceSuit = this.spaceSuit();

		// Containers.
		this.SurvivalKit = this.survivalKit
		(
			[ this.DehydratedWater, this.Multitool ]
		);

		this._All =
		[
			this.DehydratedWater,
			this.Gadget,
			this.GasGrenade,
			this.Keycard,
			this.Multitool,
			this.ReflectiveGlass,
			this.SkimmerKey,
			this.SpaceSuit,
			this.SurvivalKit
		];
	}

	static _instance: Items;
	static Instance(): Items
	{
		if (this._instance == null)
		{
			this._instance = new Items();
		}
		return this._instance;
	}

	dehydratedWater(): Item
	{
		return Item.fromNamesAndDescription
		(
			[ "dehydrated water", "water", "canteen", "bottle" ],

			"This is a bottle full of hydrogen gas "
			+ "under an incredible amount of pressure, enough to liquefy it.  "
			+ "When the valve in the bottle's neck is opened, "
			+ "it allows a small amount of the gas out "
			+ "to combust in the oxygen (hopefully!) of the surrounding (hopefully!) air, "
			+ "which creates a small amount of water vapor "
			+ "that condenses in the mouth of the bottle, " 
			+ "thus providing a small quantity of drinkable water."
			+ "\n\n"
			+ "This technology theoretically makes it possible to carry "
			+ "about nine times more water that one could with a normal canteen, "
			+ "but as a practical matter, all the pressurizing and processing equipment "
			+ "adds almost as much weight as it saves.  "
			+ "You suspect this thing only exists because somebody's cousin "
			+ "got a lucrative government contract to develop it."
			+ "\n\n"
			+ "Besides that, the water that comes out is warm.  Yuck."
		).commandAdd
		(
			new Command
			(
				[
					"drink dehydrated water",
					"drink water",
					"drink bottle",
					"drink canteen",
					"drink from bottle",
					"drink from canteen"
				],

				Scripts.Instance().itemDehydratedWaterUse.name
			)
		);
	}

	gadget(): Item
	{
		return Item.fromNamesAndDescription
		(
			[ "gadget" ],

			"This is a gadget you found in a closet, "
			+ "then just picked up and put in your pocket, "
			+ "even though it's not yours and you don't know what it does.  "
			+ "It sounds weird when you put it like that."
			+ "\n\n"
			+ "The gadget's intended function is cryptic.  "
			+ "There's a button and an indicator light.  "
			+ "And some sort of... grille?.. on one end.  "
			+ "That's it, though."
		).commandAdd
		(
			new Command
			(
				[
					"press button on gadget",
					"turn on gadget",
					"turn off gadget",
					"activate gadget",
					"deactivate gadget"
				],
				Scripts.Instance().itemGadgetPressButton.name
			),

		);
	}

	gasGrenade(): Item
	{
		return Item.fromNamesAndDescription
		(
			[ "gas grenade", "grenade" ],

			"This is a Vadik gas grenade.  "
			+ "The Vadik are notoriously, and apparently cheerfully, violent, "
			+ "so you're not sure why they even have non-lethal weapons like these.  "
			+ "Maybe they're issued to underperforming crew for purposes of public shaming."
		);
	}

	keycard(): Item
	{
		return Item.fromNamesAndDescription
		(
			[ "keycard", "key", "card" ],

			"This is an access keycard for the starship Pax Aeterna.  "
			+ "You guess it could also be, like, a picnic table for ants."
		);
	}

	reflectiveGlass(): Item
	{
		return Item.fromNamesAndDescription
		(
			[ "glass", "reflective glass", "windshield" ],

			"This is a shard of reflective glass from the shattered windshield "
			+ "of the Pax Aeterna's escape pod.  "
			+ "It's the size of your palm, roughly.  Well, more like sharply.  "
			+ "You're not sure how you're carrying this without cutting yourself."
		);
	}

	multitool(): Item
	{
		return Item.fromNamesAndDescription
		(
			[ "multitool" ],

			"This is a multitool taken from the survival kit of the Pax Aeterna's "
			+ "escape pod.  Various small tools are fixed on one end by a rivet "
			+ "and folded into the handle.  "
			+ "A selected tool can be extended and locked in place for use."
			+ "\n\n"
			+ "You hope you don't need it.  "
			+ "The only tool you've ever used on one of these is the toothpick, "
			+ "which you lost.  Your roommate never let you use it again after that."
		);
	}

	skimmerKey(): Item
	{
		return Item.fromNamesAndDescription
		(
			[ "skimmer key" ],

			"This is the starter key for a sand skimmer."
		).commandAdd
		(
			new Command
			(
				[ "put key in skimmer", "insert key in skimmer", "use key on skimmer" ],
				Scripts.Instance().placePlanetCavernsSteamworks_InsertKeyInSkimmer.name
			)
		);
	}

	spaceSuit(): Item
	{
		return Item.fromNames
		(
			[ "space suit", "spacesuit", "suit" ]
		).descriptionSet
		(
			"This is space suit from the starship Pax Aeterna.  "
			+ "It keeps the space out and the air in.  "
			+ "Maybe they should call it an air suit."
		).scriptGetNameSet
		(
			Scripts.Instance().placeFriendlyShipDockingBayAntechamberClosetRight_GetSpaceSuit.name
		);
	}

	survivalKit(contents: Item[]): Item
	{
		return Item.fromNames
		(
			[ "survival kit", "kit" ]
		).descriptionSet
		(
			"This is a survival kit from the Pax Aeterna's escape pod."
		).itemsAdd
		(
			contents
		).commandAddFromTextsAndScriptName
		(
			[ "open survival kit" ],
			Scripts.Instance().itemSurvivalKitOpen.name
		);
	}

} // end class Items

class Places
{
	scripts: Scripts;

	constructor()
	{
		this.scripts = Scripts.Instance();
	}

	emplacement(names: string[]): Emplacement
	{
		return Emplacement.fromNames(names);
	}

	emplacement2(names: string[], description: string): Emplacement
	{
		return Emplacement.fromNamesAndDescription(names, description);
	}

	emplacement3(names: string[], description: string, scriptUseName: string): Emplacement
	{
		return Emplacement.fromNamesDescriptionAndScriptUseName
		(
			names, description, scriptUseName
		);
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

	portal(names: string[], placeDestinationName: string): Portal
	{
		return Portal.fromNamesAndPlaceDestinationName(names, placeDestinationName);
	}

	portal3
	(
		names: string[], placeDestinationName: string, scriptUseName: string
	): Portal
	{
		var returnPortal = Portal
			.fromNames(names)
			.placeDestinationNameSet(placeDestinationName)
			.scriptUseNameSet(scriptUseName);

		return returnPortal;
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
				this.portal3
				(
					[ "airlock" ],
					Places.friendlyShipDockingBayHangar_Name(),
					this.scripts.placeFriendlyShipDockingBayAntechamber_GoAirlock.name
				),

				this.portal
				(
					[ "elevator" ],
					Places.friendlyShipEngineeringDeckAft_Name()
				),

				this.portal
				(
					[ "left closet" ],
					Places.friendlyShipDockingBayAntechamberClosetLeft_Name()
				).lock().descriptionSet
				(
					"The door to the left closet is closed."
				),

				this.portal
				(
					[ "right closet" ],
					Places.friendlyShipDockingBayAntechamberClosetRight_Name()
				).lock().descriptionSet
				(
					"The door to the right closet is closed."
				),

				this.emplacement( [ "controls", "console", "control console" ] ),

				this.emplacement
				(
					[ "left button", "button" ]
				).commandAdd
				(
					new Command
					(
						[ "press left button" ],
						this.scripts.placeFriendlyShipDockingBayAntechamber_PressLeftButton.name
					)
				),

				this.emplacement
				(
					[ "right button", "button" ]
				).commandAdd
				(
					new Command
					(
						[ "press right button" ],
						this.scripts.placeFriendlyShipDockingBayAntechamber_PressRightButton.name
					)
				)
			]
		);
	}

	static friendlyShipDockingBayAntechamber_Name(): string
	{
		return "Pax Aeterna - Docking Bay - Antechamber";
	}

	friendlyShipDockingBayAntechamberClosetLeft(): Place
	{
		return this.place3
		(
			Places.friendlyShipDockingBayAntechamberClosetLeft_Name(),

			"This is the left-hand closet of the antechamber "
			+ "of the Pax Aeterna's docking bay.  "
			+ "The door leads back to the antechamber.",

			[
				this.portal
				(
					[ "door", "out", "outside" ],
					Places.friendlyShipDockingBayAntechamber_Name()
				),

				Items.Instance().Gadget
			]
		);
	}

	static friendlyShipDockingBayAntechamberClosetLeft_Name(): string
	{
		return "Pax Aeterna - Docking Bay - Antechamber - Left Closet";
	}

	friendlyShipDockingBayAntechamberClosetRight(): Place
	{
		return this.place3
		(
			Places.friendlyShipDockingBayAntechamberClosetRight_Name(),

			"This is the right-hand closet of the antechamber "
			+ "of the Pax Aeterna's docking bay.  "
			+ "The door leads back to the antechamber.",

			[
				this.portal
				(
					[ "door", "out", "outside" ],
					Places.friendlyShipDockingBayAntechamber_Name()
				),

				Items.Instance().SpaceSuit
			]
		);
	}

	static friendlyShipDockingBayAntechamberClosetRight_Name(): string
	{
		return "Pax Aeterna - Docking Bay - Antechamber - Right Closet";
	}

	friendlyShipDockingBayHangar(): Place
	{
		return this.place3
		(
			Places.friendlyShipDockingBayHangar_Name(),

			"This is the Pax Aeterna's docking bay hangar.  "
			+ "\n\n"
			+ "Though the docking bay's floor is easily large enough to accomodate "
			+ "a 20-passenger luxury yacht, it is currently empty "
			+ "except for a relatively small hatch in the floor "
			+ "and a control console near the airlock door leading back to the antechamber."
			+ "\n\n"
			+ "A similarly gigantic pair of doors at the far end of the bay "
			+ " allows ships to enter and depart when open, "
			+ " and keeps everything safely sheltered when closed.",

			[
				this.portal( [ "airlock" ], Places.friendlyShipDockingBayAntechamber_Name() ),

				this.portal
				(
					[ "escape pod", "pod" ], Places.friendlyShipEscapePod_Name()
				).descriptionSet
				(
					"The pod is kind of cramped-looking, "
					+ "but as it's your only hope of survival right now, "
					+ "you prefer to think of it as 'cozy'."
				).hide().block(),

				this.emplacement2
				(
					[
						"controls", "panel", "console",
						"buttons", "control panel", "control console"
					],

					"The control panel bears a single button, which says 'platform'."
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[
							"press platform button",
							"push platform button",
							"press button",
							"push button"
						],
						this.scripts.placeFriendlyShipDockingBayHangar_PressPlatformButton.name
					)
				),

				this.emplacement2
				(
					[ "hatch", "trapdoor" ],

					"This is a trapdoor in the floor, "
					+ "perhaps three meters by five meters,"
					+ "split down the middle into two retractible doors."
				),

				this.emplacement
				(
					[ "docking bay doors", "bay doors", "doors" ],
				).lock().descriptionSet
				(
					"The bay doors are closed."
				)

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

			"This is the aft end of the Pax Aeterna's engineering deck.  "
			+ "\n\n"
			+ "A passage to fore leads back to the rest of the deck."
			+ "\n\n"
			+ "In the aft wall is an door, "
			+ "behind which is an elevator that goes down to the docking bay.  "
			+ "I know, I know: I said this was the lowest deck.  "
			+ "And that was the truth.  Yes, if the docking bay were a deck, "
			+ "it would be the lowest one.  But it's a bay, not a deck.  "
			+ "So it can't be the lowest deck.  "
			+ "It's the lowest bay, though, promise.  "
			+ "Well, the lowest of the bays you're likely to see."
			+ "\n\n"
			+ "Next to the elevator door is a small panel with a slot in it.",

			[
				this.portal3
				(
					[ "elevator", "door" ],
					Places.friendlyShipDockingBayAntechamber_Name(),
					this.scripts.placeFriendlyShipEngineeringDeckAft_GoElevator.name
				).lockedSet(true),

				this.portal
				(
					[ "forward" ], Places.friendlyShipEngineeringDeckAmidships_Name()
				),

				this.emplacement2
				(
					[ "slot", "lock", "keycard slot", "keyhole" ],
					"The slot is intended to accept a security keycard."
				).commandAdd
				(
					new Command
					(
						[
							"use keycard on slot",
							"insert keycard in slot",
							"put keycard in slot"
						],

						this.scripts.itemKeycardUse.name
					)
				)
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

			"This is the middle of the Pax Aeterna's engineering deck.  "
			+ "To fore and aft are the other sections of the deck."
			+ "\n\n"
			+ "Three large transparent domes on the floor cover the tops of "
			+ "the ship's reactor tubes.  These domes are currently pulsing "
			+ "an unsettling reddish-orange, accompanied by a loud "
			+ "and ominous droning sound.  "
			+ "Probably one of the most ominous droning sounds you've heard in a while."
			+ "\n\n"
			+ "A thick window "
			+ "looks down over the ship's docking bay, with a control console "
			+ "running beneath that window.  The bodies of two crewmen lie on the floor.",

			[
				this.portal( [ "aft" ], Places.friendlyShipEngineeringDeckAft_Name()),
				this.portal( [ "forward" ], Places.friendlyShipEngineeringDeckForward_Name()),

				this.emplacement2
				(
					[
						"console",
						"controls",
						"buttons",
						"control console",
						"control panel"
					],

					"These are the controls for the docking bay doors, "
					+ "which are visible through the nearby window.  "
					+ "There are two buttons, one that says 'open bay doors' "
					+ "and another that says 'close bay doors'."
					+ "It doesn't take a rocket scientist to operate these controls, "
					+ "although there is prominently placed placard that says otherwise."
				),

				this.emplacement2
				(
					[
						"open button",
						"open bay button",
						"open doors button",
						"open bay doors button",
						"button"
					],

					"This button opens the docking bay doors, "
					+ "if they happen to be closed.  "
					+ "Otherwise, they do nothing.  Or so you assume."

				).visibleSet(false).commandAdd
				(
					new Command
					(
						[
							"press open button",
							"press open bay button",
							"press open bay doors button",
							"press open bay door button"
						],

						this.scripts.placeFriendlyShipEngineeringDeckAmidships_PressOpenButton.name,
					)
				),

				this.emplacement2
				(
					[
						"close button",
						"close doors button",
						"close bay doors button",
						"button"
					],

					"This button closes the docking bay doors, "
					+ "if they happen to be open.  "
					+ "Otherwise, they do nothing.  Or so you assume."
				).visibleSet(false).commandAdd
				(
					new Command
					(
						[
							"press close button",
							"press close bay button",
							"press close bay doors button"
						],
						this.scripts.placeFriendlyShipEngineeringDeckAmidships_PressCloseButton.name,
					)
				),

				this.emplacement2
				(
					[ "dome", "domes", "reactor", "tube", "tubes" ],

					"You're not sure why the ends of the reactor tubes "
					+ "need to be transparent, but these are, and the colors "
					+ "currently coming through them don't give you a good feeling."
				),

				this.emplacement2
				(
					[ "window", "bay", "docking bay" ],

					"The window looks out over the ship's docking bay, "
					+ "including the large doors at the end of it, "
					+ "through which ships and cargo pass.  "
					+ "The view is not especially interesting.  "
					+ "This is a pretty down-to-business window, on the whole, "
					+ "especially when the bay doors are closed."
				),

				this.emplacement( [ "body" ] ).commandAdd
				(
					new Command
					(
						["search body"],
						this.scripts.emplacementBodyEmptySearch.name
					)
				),

				this.emplacement( [ "other body" ] ).commandAdd
				(
					new Command
					(
						[ "search other body" ],
						this.scripts.emplacementBodyEmptySearch.name
					)
				)

			]
		);
	}

	static friendlyShipEngineeringDeckAmidships_Name(): string
	{
		return "Pax Aeterna - Engineering Deck - Amidships";
	}

	friendlyShipEngineeringDeckForward(): Place
	{
		return this.place3
		(
			Places.friendlyShipEngineeringDeckForward_Name(),

			"This is the forward end of the Pax Aeterna's engineering deck.  "
			+ "I know I said that the deck above was the lower deck, "
			+ "but this deck is lower than that.  It's the lower lower deck.  "
			+ "I promise, there are no decks lower than this one."
			+ "\n\n"
			+ "The rest of the deck lies to aft.  "
			+ "\n\n"
			+ "At the fore end, an door opens on an elevator back to the other decks.",

			[
				this.portal
				(
					[ "elevator", "door" ],
					Places.friendlyShipLowerDeckHallForward_Name()
				),

				this.portal
				(
					[ "aft" ],
					Places.friendlyShipEngineeringDeckAmidships_Name()
				)
			]
		);
	}

	static friendlyShipEngineeringDeckForward_Name(): string
	{
		return "Pax Aeterna - Engineering Deck - Forward";
	}

	friendlyShipEscapePod(): Place
	{
		var emplacementSafetyHarnessNames =
			[ "safety harness", "safety belt", "harness", "belt" ];

		return this.place3
		(
			Places.friendlyShipEscapePod_Name(),

			"This is the interior of one of the Pax Aeterna's escape pods.  "
			+ "A padded seat with safety belts completely occupies the floor of the pod's cabin.  "
			+ "Beneath the window is a console with various controls, "
			+ "including a throttle, a monitor screen, and some buttons.  "
			+ "A gull-wing door in the left wall of the pod allows entry and exit.  "
			+ "Opposite the door, on the starboard wall, is a mounting for a survival kit.  "
			+ "Above the control console is a large window, through which "
			+ "the pod's surroundings can be seen.",

			[
				this.portal3
				(
					[ "door", "outside", "out" ],
					null, // destination
					this.scripts.placeFriendlyShipEscapePod_GoDoor.name
				),

				this.emplacement
				(
					[ "window" ]
				).commandAdd
				(
					new Command
					(
						[ "look window", "look through window", "look out window" ],
						this.scripts.placeFriendlyShipEscapePod_LookWindow.name
					)
				),

				this.emplacement( [ "autonav button", "autonav", "button" ] ).commandAdd
				(
					new Command
					(
						[ "press autonav", "press autonav button" ],
						this.scripts.placeFriendlyShipEscapePod_PressAutonavButton.name
					)
				),
				this.emplacement( [ "buttons" ] ),
				this.emplacement( [ "console" ] ),
				this.emplacement( [ "don't button", "button" ] ),
				this.emplacement( [ "launch button", "button" ] ).commandAdd
				(
					new Command
					(
						[ "press launch", "press launch button" ],
						this.scripts.placeFriendlyShipEscapePod_PressLaunchButton.name
					)
				),
				this.emplacement( [ "monitor screen" ] ),
				this.emplacement
				(
					emplacementSafetyHarnessNames
				).commandAdd
				(
					new Command
					(
						MessageHelper.combineStringArrays
						(
							[ "use", "fasten", "put on" ],
							emplacementSafetyHarnessNames
						),
						this.scripts.placeFriendlyShipEscapePod_PutOnSafetyHarness.name
					)
				),
				this.emplacement( [ "survival kit" ] ),
				this.emplacement( [ "throttle" ] )
			]
		);
	}

	static friendlyShipEscapePod_Name(): string
	{
		return "Escape Pod";
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
			+ "A door leads out to the corridor.  "
			+ "(You tried sleeping out there once, but someone got mad.)",

			this.scripts.placeFriendlyShipJanitorsCloset_Update.name,

			[
				this.portal
				(
					[ "corridor", "door", "hall", "out", "outside" ],
					Places.friendlyShipUpperDeckHallAmidships_Name()
				),
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
			+ "but you lost yours."
			+ "\n\n"
			+ "Well, broke it, really.  But then you lost the pieces."
			+ "\n\n"
			+ "On one wall is a retrieval console with a keyboard and screen, "
			+ "a spiderlike cartridge-retrieval robot clinging to the shelves just above it."
			+ "\n\n"
			+ "A man wearing a scientist's smock lies face-down "
			+ "on the floor in front of the console. ",

			[
				this.portal( [ "forward" ], Places.friendlyShipUpperDeckHallForward_Name() ),
				this.portal( [ "aft" ], Places.friendlyShipUpperDeckHallAmidships_Name() ),

				this.emplacement3
				(
					[ "console", "retrieval console", "controls" ],

					"This is a standard data cartridge retrieval console.  "
					+ "If the title of a desired data cartridge is typed "
					+ "on the console's keyboard, "
					+ "the retrieval robot will retrieve that cartridge from the stacks "
					+ "and drop it into the cartidge hopper below the console. "
					+ "From there, the cartridge is generally slotted into a reader "
					+ "and its contents displayed on a screen.  "
					+ "It's a complicated system, to be sure, "
					+ "but that sixteen hours of training you took was probably enough.",

					this.scripts.placeFriendlyShipLibrary_UseConsole.name
				).commandAdd
				(
					new Command
					(
						[ "type", "enter" ],
						this.scripts.placeFriendlyShipLibrary_Type.name
					)
				),

				this.emplacement2
				(
					[ "table" ],

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
					[ "scientist", "man", "person", "body", "corpse", "being" ],
					"The scientist is not moving in any perceptible way.  "
					+ "You can't tell from here if he's even breathing, "
					+ "which is the most important kind of moving, "
					+ "when you think about it."
				).commandAdd
				(
					new Command
					(
						[
							"search body",
							"search man",
							"search corpse",
							"search person",
							"search scientist",
							"talk to person",
							"talk to scientist"
						],
						this.scripts.placeFriendlyShipLibrary_TalkToMan.name
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
			+ "The hall continues to forward, and ends in a bulkhead to aft.  "
			+ "A door here opens onto an elevator."
			+ "\n\n"

			+ "The lower deck looks almost exactly like the upper deck. "
			+ "Honestly, there'd be no way to tell them apart, "
			+ "if the buttons in the elevator weren't labelled."
			+ "\n\n"

			+ "Well, to be fair, the scattered corpses are slighly different on this deck.  "
			+ "The body of your supervisor lies supine in this corridor, "
			+ "brows furrowed in a disapproving expression even in death.  "
			+ "A hard trick to pull off, but then again, he put in lots of practice "
			+ "when he was alive.  Every time he talked to you, at a minimum.",

			[
				this.portal( [ "forward" ], Places.friendlyShipLowerDeckHallAmidships_Name() ),
				this.portal( [ "elevator" ], Places.friendlyShipUpperDeckHallAft_Name() ),
				this.emplacement( [ "body" ] ).commandAdd
				(
					new Command
					(
						[ "search body" ],
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

			"This is a corridor on the lower deck of the starship Pax Aeterna.  "
			+ "\n\n"
			+ "This hallway mostly looks the same as all the other hallways so far, "
			+ "but your trained eye can still detect subtle indications of slight damage "
			+ "from when a floor scrubber went out of control, "
			+ "collided with the wall, and rubbed against for several meters "
			+ "before getting back on track.  That very nearly cost it the race, "
			+ "but luckily the other scrubber was disqualified for unsportspersonlike conduct."
			+ "\n\n"
			+ "The hall continues to forward and to aft.",

			[
				this.portal( [ "forward" ], Places.friendlyShipLowerDeckHallForward_Name() ),
				this.portal( [ "aft" ] , Places.friendlyShipLowerDeckHallAft_Name() )
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
			+ "Sometimes you can't help but think that "
			+ "this ship's architect went a little heavy on the hallways."
			+ "\n\n"
			+ "There is a door here opening on an elevator.  "
			+ "\n\n"
			+ "Another body of one of your crewmates lies here.  "
			+ "You start to feel sorry for whoever has to clean all this up.",

			[
				this.portal( [ "aft" ], Places.friendlyShipLowerDeckHallAmidships_Name() ),
				this.portal( [ "elevator", "door" ], Places.friendlyShipEngineeringDeckForward_Name() ),
				this.emplacement( [ "body" ] ).commandAdd
				(
					new Command
					(
						[ "search body" ],
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
			+ "This is the most awkward pose yet.",

			[
				this.portal( [ "forward" ], Places.friendlyShipUpperDeckHallAmidships_Name() ),
				this.portal( [ "elevator", "door" ], Places.friendlyShipLowerDeckHallAft_Name() ),
				this.emplacement( [ "body" ] ).commandAdd
				(
					new Command
					(
						[ "search body" ],
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
			+ "The hall ends in a door to forward labelled 'Library', and continues to aft.  "
			+ "In the middle is a door leading to the office/supply closet/quarters "
			+ "of the Maintenance Specialist (Sanitation Grade), "
			+ "which is where you, our hero, came boldly to this story, "
			+ "as soon as you figured out how to 'go door'.",

			this.scripts.placeFriendlyShipUpperDeckHallAmidships_Update.name,

			[
				this.portal
				(
					[ "closet", "office", "door", "closet door", "office door" ],
					Places.friendlyShipJanitorsCloset_Name()
				),
				this.portal
				(
					[ "forward", "door", "forward door", "library", "library door" ],
					Places.friendlyShipLibrary_Name()
				),
				this.portal( [ "aft" ], Places.friendlyShipUpperDeckHallAft_Name() )
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

			"This is a hallway on the upper deck of the starship Pax Aeterna."
			+ "\n\n"
			+ "To aft, the hall ends in a door labelled 'Library', "
			+ " and to forward, in a bulkhead, "
			+ "near which the body of another dead crewperson lies crumpled.  "
			+ "\n\n"
			+ "This is a pretty out-of-the way spot.  "
			+ "They must've been hiding here when they got shot.  "
			+ "Either that, or they died of natural causes by coincidence, "
			+ "and nobody's been down this hall to find them until just now.  "
			+ "Unlikely, but we shouldn't rule anything out.",

			[
				this.portal
				(
					[ "aft", "library" ],
					Places.friendlyShipLibrary_Name()
				),

				this.emplacement( [ "body" ] ).commandAdd
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
			+ "(it looks like glass, anyway) "
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
				this.portal( [ "pod", "escape pod" ], Places.friendlyShipEscapePod_Name() ),
				this.portal( [ "east" ], Places.planetCliffsBottomNorthwestWestSide_Name() ),
				Items.Instance().reflectiveGlass
			]
		);
	}

	static planetDesertCrashSite_Name(): string
	{
		return "Ekkis II - Desert - Crash Site";
	}

	planetDesertDeep() : Place
	{
		return this.place4
		(
			Places.planetDesertDeep_Name(),

			"You stand in the trackless desert of the planet Ekkis II.  "
			+ "\n\n"
			+ "The featureless sand stretches away in all directions.  "
			+ "It's not encouraging, frankly.",

			this.scripts.placePlanetDesertDeep_Update.name,

			[]
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
			+ "But you're not, so instead you just sweat and wish for a lemonade.",

			[
				this.portal( [ "south" ], Places.planetDesertCrashSite_Name() ),
				this.portal( [ "north" ], Places.planetDesertDeep_Name() ),
				this.portal( [ "east" ], Places.planetDesertDeep_Name() ),
				this.portal( [ "west" ], Places.planetDesertDeep_Name() )
			]
		);
	}

	static planetDesertNorth_Name(): string
	{
		return "Ekkis II - Desert - North of Crash Site";
	}

	planetDesertSouth() : Place
	{
		return this.place3
		(
			Places.planetDesertSouth_Name(),

			"You stand in the trackless desert of the planet Ekkis II, "
			+ "just south of the wreck of your crashed escape pod.  "
			+ "Some cliffs rise to the northeast.  "
			+ "A sea of dunes stretches away in every other direction."
			+ "Except... there!  In the distance!  You see... "
			+ "No, on second thought, that's just an eyeball floater.  "
			+ "It was a pretty rough crash.  You should get checked out "
			+ "whenever you next find a doctor. ",

			[
				this.portal( [ "north" ], Places.planetDesertCrashSite_Name() ),
				this.portal( [ "south" ], Places.planetDesertDeep_Name() ),
				this.portal( [ "east" ], Places.planetDesertDeep_Name() ),
				this.portal( [ "west" ], Places.planetDesertDeep_Name() )
			]
		);
	}

	static planetDesertSouth_Name(): string
	{
		return "Ekkis II - Desert - South of Crash Site";
	}

	planetDesertWest() : Place
	{
		return this.place3
		(
			Places.planetDesertWest_Name(),

			"You stand in the trackless desert of the planet Ekkis II, "
			+ "just west of the wreck of your crashed escape pod.  "
			+ "Beyond the pod, some cliffs rise from the sand. "
			+ "A sea of dunes stretch away in every other direction."
			+ "\n\n"
			+ "What does 'trackless' mean, anyway?  "
			+ "It's not like most places are just brimming over with tracks.  "
			+ "Maybe a train switchyard, you guess.  "
			+ "But those are increasingly rare.",

			[
				this.portal( [ "east" ], Places.planetDesertCrashSite_Name() ),
				this.portal( [ "north" ], Places.planetDesertDeep_Name() ),
				this.portal( [ "south" ], Places.planetDesertDeep_Name() ),
				this.portal( [ "west" ], Places.planetDesertDeep_Name() ),
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
			+ "until you've seen all the entrants.  It's only fair.",

			[
				this.portal( [ "south" ], Places.planetCliffsBottomSouth_Name()),
				this.portal( [ "west" ], Places.planetCliffsBottomNorthwestEastSide_Name()),
				this.portal( [ "east" ], Places.planetCliffsBottomNortheast_Name())
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
				this.portal( [ "south" ], Places.planetCliffsBottomSoutheast_Name()),
				this.portal( [ "west" ], Places.planetCliffsBottomNorthwestEastSide_Name()),
				this.portal( [ "east" ], Places.planetDesertDeep_Name())
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
				this.portal( [ "east" ], Places.planetCliffsBottomNorth_Name()),
				this.portal( [ "south" ], Places.planetCliffsBottomSouthwest_Name())
			]
		);
	}

	static planetCliffsBottomNorthwestEastSide_Name(): string
	{
		return "Ekkis II - Cliffs - Bottom - Northwest - East Side"
	}

	planetCliffsBottomNorthwestWestSide(): Place
	{
		var description = 

			"You stand on the sand of the Ekkis II desert, at the base  "
			+ "of a sheer stone cliff that curves away to the south and east,  "
			+ "and which blocks passage to the east.  "
			+ "\n\n"
			+ "The site where your escape pod crashed is to the west."
			+ "\n\n"
			+ "To the south, more cliffs are visible. "
			+ "\n\n"
			+ " The desert stretches away to the north, and west."
			+ "\n\n"
			+ "The cliff face has a nearly circular hole in it, "
			+ "a little less than two meters off the ground.  "
			+ "Nice: you like a cliff face with a little somethin' goin' on.";

		return this.place3
		(
			Places.planetCliffsBottomNorthwestWestSide_Name(),

			description,

			[
				this.portal( [ "south" ], Places.planetCliffsBottomSouthwest_Name() ),
				this.portal( [ "west" ], Places.planetDesertCrashSite_Name() ),
				this.emplacement2
				(
					[ "hole" ],

					"This is a hole in the side of the cliff face, "
					+ "about 40 centimeters in diameter.  Its interior is "
					+ "deeply shadowed, making it impossible to see what, "
					+ "if anything, might be inside it."
				).commandAdd
				(
					new Command
					(
						[ "look hole", "look in hole", "reach in hole", "put hand in hole" ],
						this.scripts.placePlanetCliffsBottomNorthwestWestSide_LookInHole.name
					)
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
				this.portal( [ "east" ], Places.planetCliffsBottomSoutheast_Name() ),
				this.portal( [ "north" ], Places.planetCliffsBottomNorth_Name() ),
				this.portal( [ "west" ], Places.planetCliffsBottomSouthwest_Name() ),
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
				this.portal( [ "north" ], Places.planetCliffsBottomSouth_Name() ),
				this.portal( [ "west" ], Places.planetCliffsBottomSouth_Name() ),
				this.portal( [ "east" ], Places.planetCliffsCaveInterior_Name() ),
				this.portal( [ "up" ], Places.planetCliffsTopSouthEastSide_Name() )
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
			+ "but danged if it disappoints on the cliff and sand front."
			+ "\n\n"
			+ "Specifically, cliffs rise to the north and east, "
			+ "while to the south and west lies sand.  "
			+ "It's balanced.  Kind of a yin-yang thing.  "
			+ "Though you're not sure which is which.  "
			+ "Or maybe they doubled up on yang.",

			[
				this.portal( [ "east" ], Places.planetCliffsBottomSouth_Name() ),
				this.portal( [ "north" ], Places.planetCliffsBottomNorthwestEastSide_Name() )
			]
		);
	}

	static planetCliffsBottomSouthwest_Name(): string
	{
		return "Ekkis II - Cliffs - Bottom - Southwest"
	};

	planetCliffsCaveInterior() : Place
	{
		return this.place4
		(
			Places.planetCliffsCaveInterior_Name(),

			"You stand in the mouth of a cave.  "
			+ "The intense light of the outside desert "
			+ "reaches only a short way into the darkness.  "
			+ "Some mossy vegetation clings to the rock near the entrance.  "
			+ "To the west the cave opens back out to "
			+ "the Ekkis II desert.  "
			+ "\n\n"
			+ "There's... well, to be frank, there's a smell.",

			this.scripts.placePlanetCliffsCaveInterior_Update.name,

			[
				this.portal3
				(
					[ "west" ],
					Places.planetCliffsBottomSoutheast_Name(),
					this.scripts.placePlanetCliffsCaveInterior_GoWest.name
				),

				this.portal3
				(
					[ "east" ],
					Places.planetCliffsBottomSoutheast_Name(),
					this.scripts.placePlanetCliffsCaveInterior_GoEast.name
				)

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
			+ "rather than turning the game speed way down "
			+ "and picking your way along one step at a time.",

			[
				this.portal( [ "east" ], Places.planetCliffsTopNortheast_Name() ),
				this.portal( [ "west" ], Places.planetCliffsTopNorthwest_Name() )
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
				this.portal( [ "west" ], Places.planetCliffsTopNorth_Name() ),
				this.portal
				(
					[ "horns", "columns" ],
					Places.planetCavernsElevator_Name()
				)
			]
		);
	}

	static planetCliffsTopNortheast_Name() : string
	{
		return "Ekkis II - Cliffs - Top - Northeast";
	}

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
				this.portal( [ "east" ], Places.planetCliffsTopNorth_Name() ),
				this.portal( [ "south" ], Places.planetCliffsTopSouthwest_Name() )
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
				this.portal( [ "east" ], Places.planetCliffsBottomSoutheast_Name() ),
				this.portal
				(
					[ "west", "arch", "bridge" ],
					Places.planetCliffsTopSouthWestSide_Name()
				).scriptUseNameSet
				(
					this.scripts.placePlanetCliffsTopSouth_CrossBridge.name
				)
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
			+ "curving around to the north.  "
			+ "To the east, the cliff top rises and then falls "
			+ "in an weathered stone arch, "
			+ "which serves as a natural bridge to the clifftop on the other side, "
			+ "and from there down a slope to the desert surface."
			+ "\n\n"
			+ "Below the arch is a slightly greener patch of desert "
			+ "sheltered by the surrounding cliffs.  "
			+ "Despite the greenery, there's not enough water to drink down there, "
			+ "even if you were willing to bite a cactus, "
			+ "which past experience tells you you should never do again.  ",

			[
				this.portal
				(
					[ "east", "arch", "bridge" ],
					Places.planetCliffsTopSouthEastSide_Name()
				).scriptUseNameSet
				(
					this.scripts.placePlanetCliffsTopSouth_CrossBridge.name
				),

				this.portal
				(
					[ "west" ],
					Places.planetCliffsTopSouthwest_Name()
				)
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
				this.portal( [ "north" ], Places.planetCliffsTopNorthwest_Name() ),
				this.portal
				(
					[ "east" ],
					Places.planetCliffsTopSouthWestSide_Name()
				)
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
				this.portal( [ "east" ], Places.planetCavernsPool_Name() ),
				this.portal( [ "west" ], Places.planetCavernsDrips_Name() )
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
				this.portal( [ "east" ], Places.planetCavernsProjectionRoom_Name() ),
				this.portal( [ "west" ], Places.planetCavernsBarrier_Name() )
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
				this.portal( [ "elevator", "door" ], Places.planetCliffsTopNortheast_Name() ),
				this.portal( [ "west" ], Places.planetCavernsGrating_Name() )
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
				this.portal( [ "west" ], Places.planetCavernsPool_Name() ),
				this.portal( [ "east" ], Places.planetCavernsGrating_Name() ),

				this.emplacement2
				(
					[ "wall" ],

					"Examining the wall closely, "
					+ "you see a faint rectangular outline of hairline cracks in the rock. "
					+ "It happens to a lot of us as we get older.  "
					+ "Geological age ain't nothin' but a number.  "
					+ "Well, usually a number and a unit.  Like 'megayear'."
				),

				this.emplacement2
				(
					[ "geyser" ],

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
				this.emplacement2
				(
					[ "grate", "grating" ],

					"You bend over and look closely at the grating."
					+ "You think you see something moving down there.  "
					+ "And maybe you hear some sloshing.  "
					+ "And, yeah, there's a smell.  "
					+ "For a metal grate in a cave, "
					+ "it's kind of a sensory smorgasbord."
				),

				this.portal( [ "west" ], Places.planetCavernsGeyser_Name() ),
				this.portal( [ "east" ], Places.planetCavernsElevator_Name() )
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
				this.portal( [ "west" ], Places.planetCavernsBarrier_Name() ),
				this.portal( [ "east" ], Places.planetCavernsGeyser_Name() )
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
				this.portal( [ "west" ], Places.planetCavernsDrips_Name() ),
				this.portal( [ "north" ], Places.planetCavernsSteamworks_Name() )
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
				this.portal( [ "east" ], Places.planetCavernsProjectionRoom_Name() ),

				this.emplacement
				(
					[ "alien" ]
				).commandAdd
				(
					new Command
					(
						[ "talk to alien" ],
						this.scripts.placePlanetCavernsSteamworks_TalkToAlien.name
					)
				)
			]
		);
	}

	static planetCavernsSteamworks_Name(): string
	{
		return "Ekkis II - Caverns - Steamworks";
	}

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
				this.portal( [ "north" ], Places.planetSettlementRobotShopWest_Name() ),
				this.portal( [ "west" ], Places.planetSettlementUsedShipLot_Name() ),
				this.portal( [ "east" ], Places.planetSettlementBarRear_Name() ),
				this.portal( [ "south" ], Places.planetDesertDeep_Name() ),
				this.portal( [ "bar" ], Places.planetSettlementBarInterior_Name() )
			]
		);
	}

	static planetSettlementBarFront_Name(): string
	{
		return "Ekkis II - [Farting Noise] - Bar - Front";
	}

	planetSettlementBarInterior() : Place
	{
		var description =
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
			+ "then empties a load of its sweepings into a porthole in the back wall.  "
			+ "A short ascending stairway leads back outside.";

		return this.place3
		(
			Places.planetSettlementBarInterior_Name(),

			description,

			[
				this.portal( [ "outside", "door" ], Places.planetSettlementBarFront_Name() ),

				this.emplacement2
				(
					[ "band", "performers", "musicians", "singer" ],

					"You like some of their early stuff."
				).commandAdd
				(
					new Command
					(
						[ "talk band", "talk to band" ],

						this.scripts.todo.name

						/*
						"You try to talk to the band.  During their live performance.  "
						+ "You're one of those kind of people, huh?  "
						+ "The band, as is their privilege, ignores you.  Lucky them."
						*/
					)
				),

				this.emplacement2
				(
					[ "bar" ],

					"The light is neither very bright nor pleasant, "
					+ "nor is the bar polished.  "
					+ "That's a literary reference, kids."
				),

				this.emplacement2
				(
					[ "machine", "slot machine", "gambling machine" ],

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

				this.emplacement2
				(
					[ "bartender", "barman" ],

					"This bartender doesn't appear to be the "
					+ "'listen to your problems' kind of bartender.  "
					+ "You try to catch his eye, but he evades your gaze "
					+ "with the effortless skill of long practice."
				),

				this.emplacement2
				(
					[ "customers", "patrons" ],

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
			+ "As you stand around loitering behind a bar, "
			+ "reflecting on how Mom said this is exactly how you'd end up,"
			+ "a hatch in the back wall of the bar opens "
			+ "and expels some fine white powder, "
			+ "which settles onto a larger heap of powder below.",

			[
				this.portal( [ "north" ], Places.planetSettlementRobotShopWest_Name() ),
				this.portal( [ "west" ], Places.planetSettlementUsedShipLot_Name() ),
				this.portal( [ "east" ], Places.planetSettlementBarRear_Name() ),

				this.emplacement2
				(
					[ "heap", "pile" ],

					"This is a heap of finely divided white power.  "
					+ "Looks a bit like ashes, except who burns things anymore?"
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
			+ "if you ask someone to explain them.  So never mind.",

			[
				this.portal( [ "west" ], Places.planetSettlementRobotShopWest_Name() ),
				this.portal( [ "door", "shop", "store", "inside" ], Places.planetSettlementRobotShopInterior_Name() )
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
				this.portal
				(
					[ "outside", "door"],
					Places.planetSettlementRobotShopFront_Name()
				),

				this.emplacement2
				(
					[
						"wheeled robot",
						"domestic robot",
						"general toiler s-34",
						"general toiler",
						"s-34"
					],

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

				this.emplacement2
				(
					[
						"bipedal robot",
						"pilot/navigator robot",
						"pilot robot",
						"navigator robot",
						"pilot/navigator",
						"pilot",
						"navigator",
						"Astromatix Stardodger QG",
						"Astromatix",
						"Stardodger",
						"QG"
					],

					"As you move to examine the robot, "
					+ "the salesbeing smoothly interposes themself.  "
					+ "'This is the Astromatix Stardodger QG.  "
					+ "It's the best pilot/navigator robot money can buy.'  "
					+ "He slaps the robot's... pauldron?... briskly, and continues, "
					+ "'You can fit so many starmaps into this bad boy."
					+ "Its price is 45 credits, or 36 with coupon.'"
				).commandAdd
				(
					Command.fromTextAndScriptExecuteName
					(
						"buy",
						this.scripts.placePlanetSettlementRobotShopInterior_Buy.name
					)
				),

				this.emplacement2
				(
					[
						"six-legged robot",
						"farming robot",
						"farmer",
						"Agron Cultivo F-12",
						"Agron",
						"Cultivo",
						"F-12"
					],

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

				this.emplacement2
				(
					[
						"drill-faced robot",
						"mining robot",
						"miner",
						"Stope & Adit Deep Dolly",
						"Stope & Adit",
						"Deep Dolly"
					],

					"As you move to examine the robot, "
					+ "the salesbeing smoothly interposes themself.  "
					+ "'This is the Stope & Adit Deep Dolly.  "
					+ "It's a mining robot.  "
					+ "And I always say, what's mine is yours."
					+ "For only 700 credits, or 560 with coupon.'"
				),

				this.emplacement2
				(
					[
						"gun-armed robot",
						"military/security/military security robot",
						"military robot",
						"security robot",
						"military security robot",
						"soldier robot",
						"BlackDark KLR-688",
						"BlackDark",
						"KLR-688"
					],

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
				this.portal( [ "south" ], Places.planetSettlementBarFront_Name() ),
				this.portal( [ "east" ], Places.planetSettlementRobotShopFront_Name() ),
				this.portal( [ "west" ], Places.planetSettlementNorthOfUsedShipLot_Name() )
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
				this.portal( [ "east" ], Places.planetSettlementRobotShopWest_Name() ),
				this.portal( [ "south" ], Places.planetSettlementUsedShipLot_Name() )
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
				this.portal( [ "east" ], Places.planetSettlementBarFront_Name() ),
				this.portal( [ "north" ], Places.planetSettlementNorthOfUsedShipLot_Name() )
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
			+ "Doors at either end lead inside and outside of the Venipositor",

			[
				this.portal( [ "in", "inside" ], Places.enemyShipAirlockAntechamber_Name() ),
				this.portal( [ "out", "outside" ], Places.enemyShipAirlockExterior_Name() )
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
				this.portal
				(
					[ "door", "airlock", "inside", "in" ],
					Places.enemyShipAirlockChamber_Name()
				),
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
			+ "\n\n"
			+ "At the aft end, a high counter, with a heavily robot standing watch behind it, "
			+ "blocks the path to the weapon racks.  "
			+ "The Vadik seem to all be professional soldier/assassin/murderers, "
			+ "so you have to worry about what kind of weapons they keep under lock and key.  "
			+ "But maybe they just want to keep track of what kind of weapons are popular, "
			+ "so they can order more of them?"
			+ "\n\n"
			+ "A door to forward leads back "
			+ "out onto the catwalk above the Stellar Juvenator chamber.",

			[
				this.portal
				(
					[ "forward" ],
					Places.enemyShipStellarJuvenatorChamberCatwalk_Name()
				),
				Items.Instance().GasGrenade.name
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
				this.portal( [ "forward" ], Places.enemyShipLowerDeckHallAmidships_Name() )
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
				this.portal( [ "aft" ], Places.enemyShipLowerDeckHallAft_Name() ),
				this.portal( [ "forward" ], Places.enemyShipLowerDeckHallFore_Name() )
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
				this.portal( [ "aft" ], Places.enemyShipLowerDeckHallAmidships_Name() ),
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

			"You are in your ship, hovering nearby the Vadik starship Venipositor."
			+ "\n\n"
			+ "It's a terrifying ship.  Its color scheme could best be described as "
			+ "'Dried Blood on Rusty Murder Weapon.'"
			+ "There are sharp edges, jagged metal teeth, and needlelike points everywhere, "
			+ "most of which have a bunch of Vadik writing scrawled near them.  "
			+ "On an ordinary ship, you'd expect such writing to be warnings "
			+ "about how dangerous everything is, " 
			+ "but from what little you can read of it, "
			+ "this writing seems instead to be bragging "
			+ "about how dangerous everything is.",

			[
				this.portal
				(
					[ "outside", "door", "space" ],
					Places.enemyShipAirlockExterior_Name()
				)
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
			+ "\n\n"
			+ "The titanic Stellar Juvenator is mounted on a pedestal, "
			+ "with an armed Vadik guard standing nearby.  "
			+ "\n\n"
			+ "The Stellar Juvenator glows and crackles with luminous energies.  "
			+ "You're not sure how much of that is its normal operating mode. "
			+ "\n\n"
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
			+ "\n\n"
			+ "On the floor, far below, the Stellar Juvenator"
			+ "is mounted on a pedestal, "
			+ "with an armed Vadik guard standing nearby.  "
			+ "\n\n"
			+ "The catwalk runs fore and aft.",

			[
				this.portal( [ "aft" ], Places.enemyShipArmory_Name()),
				this.portal( [ "forward" ], "todo"),
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
				this.portal( [ "forward" ], Places.enemyShipUpperDeckHallAmidships_Name() ),
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
				this.portal( [ "aft" ], Places.enemyShipUpperDeckHallAft_Name() ),
				this.portal( [ "forward" ], Places.enemyShipUpperDeckHallFore_Name() ),
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
				this.portal( [ "aft" ], Places.enemyShipUpperDeckHallAmidships_Name() ),
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
				this.portal( [ "back" ], Places.enemyShipVentilationShaft4_Name() ),
				this.portal( [ "forward" ], Places.enemyShipVentilationShaft1_Name() ),
				this.portal( [ "vent" ], Places.enemyShipAirlockAntechamber_Name() )
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
				this.portal( [ "back" ], Places.enemyShipVentilationShaft1_Name() ),
				this.portal( [ "forward" ], Places.enemyShipVentilationShaft3_Name() ),
				this.portal( [ "vent" ], Places.enemyShipLaundry_Name() )
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
				this.portal( [ "back" ], Places.enemyShipVentilationShaft2_Name() ),
				this.portal( [ "forward" ], Places.enemyShipVentilationShaft4_Name() )
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
				this.portal( [ "back" ], Places.enemyShipVentilationShaft3_Name() ),
				this.portal( [ "forward" ], Places.enemyShipVentilationShaft1_Name() )
			]
		);
	}

	static enemyShipVentilationShaft4_Name(): string
	{
		return "Venipositor - Ventilation Shaft - 4";
	}
}

class Regions
{
	_All: Region[];

	constructor()
	{
		var places = new Places();
		var scripts = Scripts.Instance();

		this._All =
		[
			this.friendlyShip(places, scripts),
			this.planetDesert(places, scripts),
			this.planetCaverns(places, scripts),
			this.planetSettlement(places, scripts),
			this.enemyShip(places, scripts)
		];
	}

	// Regions.

	friendlyShip(places: Places, scripts: Scripts): Region
	{
		return Region.fromNameScriptUpdateForTurnNameAndPlaces
		(
			"Pax Aeterna",

			scripts.regionFriendlyShip_UpdateForTurn.name, // scriptUpdateForTurnName

			[
				// Upper Deck.
				places.friendlyShipJanitorsCloset(),
				places.friendlyShipUpperDeckHallAmidships(),
				places.friendlyShipLibrary(),
				places.friendlyShipUpperDeckHallForward(),
				places.friendlyShipUpperDeckHallAft(),
				places.friendlyShipBridge(),

				// Lower Deck.

				places.friendlyShipLowerDeckHallAft(),
				places.friendlyShipLowerDeckHallAmidships(),
				places.friendlyShipLowerDeckHallForward(),

				// Engineering Deck.

				places.friendlyShipEngineeringDeckAft(),
				places.friendlyShipEngineeringDeckAmidships(),
				places.friendlyShipEngineeringDeckForward(),

				// Docking Bay.

				places.friendlyShipDockingBayAntechamber(),
				places.friendlyShipDockingBayAntechamberClosetLeft(),
				places.friendlyShipDockingBayAntechamberClosetRight(),
				places.friendlyShipDockingBayHangar(),
				places.friendlyShipEscapePod()
			]
		);
	}

	planetDesert(places: Places, scripts: Scripts): Region
	{
		return Region.fromNameScriptUpdateForTurnNameAndPlaces
		(
			"Ekkis 2 - Desert",

			scripts.regionPlanetDesert_UpdateForTurn.name, // scriptUpdateForTurnName

			[
				// Desert.
				places.planetDesertCrashSite(),
				places.planetDesertDeep(),
				places.planetDesertNorth(),
				places.planetDesertSouth(),
				places.planetDesertWest(),

				// Cliffs.

				places.planetCliffsBottomNorth(),
				places.planetCliffsBottomNortheast(),
				places.planetCliffsBottomNorthwestEastSide(),
				places.planetCliffsBottomNorthwestWestSide(),
				places.planetCliffsBottomSouth(),
				places.planetCliffsBottomSoutheast(),
				places.planetCliffsBottomSouthwest(),
				places.planetCliffsCaveInterior(),
				places.planetCliffsTopNorth(),
				places.planetCliffsTopNortheast(),
				places.planetCliffsTopNorthwest(),
				places.planetCliffsTopSouthEastSide(),
				places.planetCliffsTopSouthWestSide(),
				places.planetCliffsTopSouthwest(),
			]
		);
	}

	planetCaverns(places: Places, scripts: Scripts): Region
	{
		return Region.fromNameAndPlaces
		(
			"Ekkis 2 - Caverns",
			[
				places.planetCavernsProjectionRoom(),
				places.planetCavernsSteamworks(),

				places.planetCavernsBarrier(),
				places.planetCavernsDrips(),
				places.planetCavernsElevator(),
				places.planetCavernsGeyser(),
				places.planetCavernsGrating(),
				places.planetCavernsPool(),
			]
		);
	}

	planetSettlement(places: Places, scripts: Scripts): Region
	{
		return Region.fromNameAndPlaces
		(
			"Ekkis 2 - Settlement",
			[
				places.planetSettlementBarFront(),
				places.planetSettlementBarInterior(),
				places.planetSettlementBarRear(),
				places.planetSettlementRobotShopFront(),
				places.planetSettlementRobotShopInterior(),
				places.planetSettlementRobotShopWest(),
				places.planetSettlementNorthOfUsedShipLot(),
				places.planetSettlementUsedShipLot(),
			]
		);
	}

	enemyShip(places: Places, scripts: Scripts): Region
	{
		return Region.fromNameAndPlaces
		(
			"Venipositor",
			[
				places.enemyShipAirlockAntechamber(),
				places.enemyShipAirlockChamber(),
				places.enemyShipAirlockExterior(),
				places.enemyShipArmory(),
				places.enemyShipLaundry(),
				places.enemyShipLowerDeckHallAft(),
				places.enemyShipLowerDeckHallAmidships(),
				places.enemyShipLowerDeckHallFore(),
				places.enemyShipNearbySpace(),
				places.enemyShipShuttleBay(),
				places.enemyShipStellarJuvenatorChamber(),
				places.enemyShipStellarJuvenatorChamberCatwalk(),
				places.enemyShipUpperDeckHallAft(),
				places.enemyShipUpperDeckHallAmidships(),
				places.enemyShipUpperDeckHallFore(),
				places.enemyShipVentilationShaft1(),
				places.enemyShipVentilationShaft2(),
				places.enemyShipVentilationShaft3(),
				places.enemyShipVentilationShaft4()
			]
		);
	}
}

class Scripts
{
	_All: Script[];

	constructor()
	{
		var scriptMethods =
		[
			this.agentEnemyTalkTo,

			this.emplacementBodyEmptySearch,
			this.emplacementBodyKeycardSearch,

			this.itemCartridgeUse,
			this.itemDehydratedWaterUse,
			this.itemGadgetPressButton,
			this.itemKeycardUse,
			this.itemSurvivalKitOpen,

			this.placeFriendlyShipDockingBayAntechamber_GoAirlock,
			this.placeFriendlyShipDockingBayAntechamber_PressLeftButton,
			this.placeFriendlyShipDockingBayAntechamber_PressRightButton,
			this.placeFriendlyShipDockingBayAntechamberClosetRight_GetSpaceSuit,
			this.placeFriendlyShipDockingBayHangar_PressPlatformButton,
			this.placeFriendlyShipEngineeringDeckAmidships_PressCloseButton,
			this.placeFriendlyShipEngineeringDeckAmidships_PressOpenButton,
			this.placeFriendlyShipEngineeringDeckAft_GoElevator,
			this.placeFriendlyShipEscapePod_GoDoor,
			this.placeFriendlyShipEscapePod_LookWindow,
			this.placeFriendlyShipEscapePod_PressAutonavButton,
			this.placeFriendlyShipEscapePod_PressLaunchButton,
			this.placeFriendlyShipEscapePod_PutOnSafetyHarness,
			this.placeFriendlyShipJanitorsCloset_Update,
			this.placeFriendlyShipLibrary_TalkToMan,
			this.placeFriendlyShipLibrary_Type,
			this.placeFriendlyShipLibrary_UseConsole,
			this.placeFriendlyShipUpperDeckHallAmidships_Update,

			this.placePlanetCavernsSteamworks_InsertKeyInSkimmer,
			this.placePlanetCavernsSteamworks_TalkToAlien,
			this.placePlanetCliffsTopSouth_CrossBridge,
			this.placePlanetCliffsCaveInterior_GoEast,
			this.placePlanetCliffsCaveInterior_GoWest,
			this.placePlanetCliffsCaveInterior_Update,
			this.placePlanetCliffsBottomNorthwestWestSide_LookInHole,

			this.placePlanetDesertDeep_Update,

			this.placePlanetSettlementRobotShopInterior_Buy,

			this.regionFriendlyShip_UpdateForTurn,
			this.regionPlanetDesert_UpdateForTurn,

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

	todo(u: Universe, w: World, p: Place, c: Command): void
	{
		u.messageEnqueue("todo");
	}

	agentEnemyTalkTo(u: Universe, w: World, p: Place, agent: any): void
	{
		var message =
			"The Vadik's only response is to disintegrate you."
			+ "\n\n"
			+ "You are dead."
		u.messageEnqueue(message);
		w.end();
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

			var itemKeycard = Items.Instance().Keycard;
			place.itemAdd(itemKeycard);

			var emplacementBody =
				place.emplacements.find(x => x.names.indexOf("body") >= 0);
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

	itemDehydratedWaterUse(u: Universe, w: World, p: Place, c: Command): void
	{
		var message =
			"You drink from the water bottle.  "
			+ "There, that'll keep the Grim Specter of Thirst "
			+ "a few meters further away for a few minutes.";

		var stateName = "TurnsSinceLastDrink";

		w.agentPlayer.stateGroup.stateWithNameSetToValue(stateName, 0);

		u.messageEnqueue(message);
	}

	itemGadgetPressButton(u: Universe, w: World, p: Place, c: Command): void
	{
		var itemGadget = w.agentPlayer.itemByName("gadget");

		var message =
			"You press the only button on the gadget.  "
			+ "The indicator light "

		var itemGadgetIsActivated = itemGadget.activated();

		if (itemGadgetIsActivated)
		{
			message +=
				"goes dark.  "
				+ "Whatever this thing does, it's not doing it now."

			itemGadget.deactivate();
		}
		else
		{
			message +=
				"illuminates.  "
				+ "Whatever this thing does, it's doing it now."

			itemGadget.activate();
		}

		u.messageEnqueue(message);
	}

	itemKeycardUse(u: Universe, w: World, p: Place, c: Command): void
	{
		var commandText = c.text();
		var commandParts = commandText.split(" ");
		var targetName = commandParts[3];

		var message;
		if (targetName == null)
		{
			message = "The keycard must be used on something.";
		}
		else if (targetName != "slot")
		{
			message = "The keycard will only fit in an appropriately sized slot.";
		}
		else
		{
			var portalElevator = p.portalByName("elevator");
			var portalElevatorIsClosed = portalElevator.locked();
			if (portalElevatorIsClosed)
			{
				message =
					"You insert the keycard in the slot.  "
					+ "The elevator door slides open.";
				portalElevator.unlock().descriptionSet("The elevator door is open.");
			}
			else
			{
				message = "The elevator door is already open."
			}
		}

		u.messageEnqueue(message);
	}

	itemSurvivalKitOpen(u: Universe, w: World, p: Place, c: Command): void
	{
		var message = "You open the survival kit.  .";

		var itemSurvivalKit = w.agentPlayer.itemByName("survival kit");
		var itemsContained = itemSurvivalKit.items;
		if (itemsContained.length == 0)
		{
			message += "It's empty."
		}
		else
		{
			var itemsContainedAsText = itemsContained.map(x => x.name() ).join("\n\t");
			message += "Inside, you find: " + itemsContainedAsText + "."
			p.itemsAdd(itemsContained);
			itemSurvivalKit.itemsClear();
		}

		u.messageEnqueue(message);
	}

	// Places.

	placeFriendlyShipDockingBayAntechamber_GoAirlock
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var playerIsWearingSpaceSuit =
			(w.agentPlayer.itemByName("space suit") != null);

		if (playerIsWearingSpaceSuit == false)
		{
			u.messageEnqueue
			(
				"As the airlock door closes behind you, "
				+ "and the air is pumped out of the chamber, "
				+ "you suddenly realize you're not wearing a space suit."
				+ "\n\n"
				+ "The next few seconds are not pleasant for you.  "
				+ "\n\n"
				+ "You are dead."
			);

			w.end();
		}
		else
		{
			var portal = p.portalByName("airlock");
			portal.goThrough(u, w);
		}
	}

	placeFriendlyShipDockingBayAntechamber_PressLeftButton
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var portalCloset = p.portalByName("left closet");
		var doorIsLocked = portalCloset.locked();
		var message: string;
		if (doorIsLocked)
		{
			message = "The door of the left closet slides open.";
			portalCloset.unlock().descriptionSet("The door to the left closet is open.");
		}
		else
		{
			message = "The door of the left closet slides closed.";
			portalCloset.lock().descriptionSet("The door to the right closet is closed.");
		}
		u.messageEnqueue(message);
	}

	placeFriendlyShipDockingBayAntechamber_PressRightButton
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var portalCloset = p.portalByName("right closet");
		var doorIsLocked = portalCloset.locked();
		var message: string;
		if (doorIsLocked)
		{
			message = "The door of the right closet slides open.";
			portalCloset.unlock().descriptionSet("The door to the right closet is open.");
		}
		else
		{
			message = "The door of the right closet slides closed.";
			portalCloset.lock().descriptionSet("The door to the right closet is closed.");
		}
		u.messageEnqueue(message);
	}

	placeFriendlyShipDockingBayAntechamberClosetRight_GetSpaceSuit
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		u.messageEnqueue("The space suit is too heavy to carry, so you put it on instead.");
		var itemSpaceSuit = p.itemByName("space suit");
		w.agentPlayer.itemGetFromPlace(itemSpaceSuit, p);
	}

	placeFriendlyShipDockingBayHangar_PressPlatformButton
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var portalPod = p.portalByName("escape pod");
		var podIsVisible = portalPod.visible();
		var message: string;
		if (podIsVisible)
		{
			message =
				"When you press the button, the platform carrying the escape pod "
				+ "sinks back beneath the floor, "
				+ "and the trapdoor slides closed over it."

			portalPod.hide().block();
		}
		else
		{
			message =
				"When you press the button, the trapdoor in the floor slides open "
				+ "and a platform under it rises up to floor level.  "
				+ "On the platform stands a single-person escape pod."

			portalPod.show().unblock();
		}

		u.messageEnqueue(message);

	}

	placeFriendlyShipEngineeringDeckAmidships_PressCloseButton
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var placeDockingBay =
			w.placeByName(Places.friendlyShipDockingBayHangar_Name() );
		var emplacementDockingBayDoors =
			placeDockingBay.emplacementByName("bay doors");

		var doorsAreLocked = emplacementDockingBayDoors.locked();
		if (doorsAreLocked)
		{
			u.messageEnqueue("The docking bay doors are already closed.");
		}
		else
		{
			u.messageEnqueue("Through the window, you see the docking bay doors slide closed.");
			emplacementDockingBayDoors.lock();
		}
	}

	placeFriendlyShipEngineeringDeckAmidships_PressOpenButton
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var placeDockingBay =
			w.placeByName(Places.friendlyShipDockingBayHangar_Name() );
		var emplacementDockingBayDoors =
			placeDockingBay.emplacementByName("bay doors");

		var doorsAreLocked = emplacementDockingBayDoors.locked();
		if (doorsAreLocked)
		{
			u.messageEnqueue
			(
				"Through the window, you see the docking bay doors slide open.  "
				+ "Beyond them you see the darkness of space."
			);
			emplacementDockingBayDoors.unlock();
		}
		else
		{
			u.messageEnqueue("The docking bay doors are already open.");
		}
	}

	placeFriendlyShipEngineeringDeckAft_GoElevator
	(
		u: Universe, w: World, place: Place, portal: Portal
	): void
	{
		var portalIsLocked = portal.locked();
		if (portalIsLocked)
		{
			u.messageEnqueue
			(
				"The elevator door does not open as you approach.  "
				+ "It must be locked."
			);
		}
		else
		{
			u.messageEnqueue("You step inside the open elevator.");
			portal.goThrough(u, w);
			portal.lock();
		}
	}

	placeFriendlyShipEscapePod_GoDoor
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

	placeFriendlyShipEscapePod_LookWindow
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message = "You look out the escape pod's window, and see ";

		var portalDoor = p.portalByName("door");
		var portalDoorPlaceDestinationName =
			portalDoor.placeDestinationName;

		if (portalDoorPlaceDestinationName == null)
		{
			message +=
				"deep space, adorned with thousands of stars, "
				+ "plus the distant, still-glowing wreckage of the Pax Aeterna.  "
				+ "A tragic end for such a proud vessel and her doughty crew, "
				+ "but, from this distance, you must admit "
				+ "it has a certain undeniable beauty to it.";
		}
		else if (portalDoorPlaceDestinationName == Places.friendlyShipDockingBayHangar_Name() )
		{
			message +=
				"the docking bay of the Pax Aeterna, "
				+ "whose better days are behind it now.  "
				+ "You suspect there aren't any days ahead of it, "
				+ "better, worse, or otherwise.";
		}
		else if (portalDoorPlaceDestinationName == Places.planetDesertCrashSite_Name() )
		{
			message +=
				"the burning sands and sky of the planet Ekkis II.";
		}

		u.messageEnqueue(message);
	}

	placeFriendlyShipEscapePod_PressAutonavButton
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message =
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
			"Oh, that's right, the landing system is compromised.",
			"\n\n",
			"It's a rough ride down, and you get pretty shaken up.",
			"The worst part is the sudden stop at the end.",
			"\n\n"
		].join("");

		var emplacementSafetyHarness = p.emplacementByName("safety harness");
		var safetyBeltWasWorn = emplacementSafetyHarness.activated();

		if (safetyBeltWasWorn == false)
		{
			message +=
			[
				"You forgot to put on your safety belt.",
				"\n\n",,
				"You are flung forward by the force of the crash, ",
				"and your torso is impaled on the steering assembly.",
				"\n\n",
				"In your few remaining moments of life, ",
				"you have a vision of Captain Safe T. Harness, ",
				"the cartoon pirate animal mascot from the public service posters, ",
				"who shakes his head sadly and says his famous catch phrase, ",
				"'If to fasten yer belt ye be failin', ",
				"'ye be headin' straight for an impalin'!'",
				"\n\n",
				"You are dead."
			];

			w.end();
		}
		else
		{
			message +=
			[
				"You survive the landing intact, ",
				"only because you're wearing your safety belt, ",
				"but the pod doesn't.  It'll never fly again.",
				"Through the shattered window you see the dunes of a desert.",
				"But no settlement.  It appears the pod has crashed ",
				"hundreds of kilometers from the intended landing site."
			].join("");

			p.portalByName("door").placeDestinationName =
				Places.planetDesertCrashSite_Name();
		}

		u.messageEnqueue(message);

	}

	placeFriendlyShipEscapePod_PressLaunchButton
	(
		u: Universe, w: World, p: Place, c: Command
	): any
	{
		var message =
		[
			"You press the button, and the pod shudders into motion.  ",
			"It rises off the deck, then, with a burst of thrusters, ",
		].join("")

		var placeDockingBay =
			w.placeByName(Places.friendlyShipDockingBayHangar_Name() );
		var emplacementBayDoors =
			placeDockingBay.emplacementByName("bay doors");
		var bayDoorsAreClosed = emplacementBayDoors.locked();

		if (bayDoorsAreClosed)
		{
			message +=
			[
				"smashes into the cargo bay doors, "
				+ "which some idiot left closed, ",
				+ "and explodes."
				+ "\n\n"
				+ "You are dead."
			].join("");

			w.end();
		}
		else
		{
			message +=
			[
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
				"that reads 'landing system compromised'.  Ooh boy."
			].join("");

			var stateEscapePodLocation = "EscapePodLocation";

			p.stateGroup.stateWithNameSetToValue(stateEscapePodLocation, "DeepSpace");
		}

		u.messageEnqueue(message);
	}

	placeFriendlyShipEscapePod_PutOnSafetyHarness
	(
		u: Universe, w: World, p: Place, c: Command
	): any
	{
		var message =
		[
			"You fasten the safety harness around yourself, ",
			"mentally reciting the famous catch phrase ",
			"of the safety mascot Captain Safe T. Harness: ",
			"\n\n",
			"If these safety tips ye be markin'",
			"it's safe and sound ye'll be disembarkin'.",
			"\n\n",
			"That cartoon otter has saved your ",
			"simulated smoked salted abdominal-muscle slices ",
			"more times than you can count."
		].join("");

		var emplacementSafetyHarness = p.emplacementByName("safety harness");
		emplacementSafetyHarness.activate();

		u.messageEnqueue(message);
	}

	placeFriendlyShipJanitorsCloset_Update(u: Universe, w: World, p: Place, c: Command): any
	{
		if (p.hasBeenVisited() == false)
		{
			p.visit();

			var message =
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

				"No, wait, you remember now.  They're transporting some gadget ",
				"called a 'stellar juvenator' to... somewhere or other.  ",
				"Something about how somebody's stellar needs juvenating.  ",
				"Whatever it does, it's a big ol' whatchamazig.  ",
				"It takes up quite a lot of floor space you'd otherwise have to mop, ",
				"so you instinctively have warm feelings about it.  ",
				"You hope nothing bad's happened to it.",
				"\n\n",

				"Anyway, you had been napping, on duty, ",
				"but now you've been awakened by a loud klaxon.  ",
				"Party foul."
			].join("");

			u.messageEnqueue(message);
		}
	}

	placeFriendlyShipLibrary_TalkToMan(u: Universe, w: World, p: Place, c: Command): any
	{
		var stateScientistIsDeadName = "ScientistIsDead";

		var scientistIsDead = p.stateGroup.stateWithNameIsTrue(stateScientistIsDeadName);

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

			p.stateGroup.stateWithNameSetToTrue(stateScientistIsDeadName);
		}

		u.messageEnqueue(message);
	}

	placeFriendlyShipLibrary_Type(u: Universe, w: World, p: Place, c: Command): any
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
				Item.fromNamesAndDescription
				(
					[ "cartridge", "data cartridge", "cart", "data cart" ],
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

	placeFriendlyShipLibrary_UseConsole(u: Universe, w: World, p: Place, c: Command): any
	{
		var message =
		[
			"Try typing something, like 'type whatever'.  "
			+ "\n\n"
			+ "Yes, I know what you're thinking: "
			+ "It's hundreds of years in the future, "
			+ "and I still have to type stuff?  "
			+ "And what, are they still using QWERTY?  "
			+ "\n\n"
			+ "Don't be stupid.  This is a naval-grade data retrieval console, "
			+ "not some third-hand clicky-clack from a high-school keyboarding class.  "
			+ "No, it doesn't use QWERTY.  It uses GHAFTR.  The GHAFTR keyboard layout "
			+ "is proven to allow the expert typist to type 0.43% faster than QWERTY.  "
			+ "\n\n"
			+ "Granted, there are only twelve known GHAFTR experts, "
			+ "and that's counting four dead ones.  "
			+ "For everyone else, typing on a GHAFTR keyboard "
			+ "takes about four times as long.  So you'd better get started."
		].join("");

		u.messageEnqueue(message);

	}

	placeFriendlyShipUpperDeckHallAmidships_Update
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

	placePlanetCavernsSteamworks_InsertKeyInSkimmer
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message =
			"You put the key into a similarly-shaped hole in the skimmer control panel, "
			+ "then stare at the controls in confusion for a few moments "
			+ "before you figure out what to do next. "
			+ "Then you turn the key sharply clockwise for a moment, "
			+ "and the skimmer's engines hum to life.  Whoa, retro."
			+ "\n\n"
			+ "The 100-kilometer trip to the nearest settlement is uneventful, "
			+ "your skimmer gliding swiftly and effortlessly a couple dozen centimeters "
			+ "above the surface of the sand.  "
			+ "There are a few rocks along the way, "
			+ "but you skillfully avoid them.  Most of them.  A lot of them, anyway.  "
			+ "You must admit you aren't great at the action parts."
			+ "\n\n"
			+ "A half-hour or so later, you and your slightly-worse-for-the-wear "
			+ "secondhand sand sled slide through the shield of a small settlement.  "
			+ "You park the skimmer outside of a bar.  That's just like you."
			+ "\n\n"
			+ "As you pull up, an alien walks out of the bar and eyes your skimmer appreciatively."

		u.messageEnqueue(message);

		w.placeCurrentSetByName(Places.planetSettlementBarFront_Name() )
	}

	placePlanetCavernsSteamworks_TalkToAlien
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message =
			"The alien greets you from the catwalk above, "
			+ "and explains that it is part of an ancient race "
			+ "that once ruled this planet, but now lives underground.  "
			+ "You briefly wonder if you have to feel guilty about this, "
			+ "but the alien has already moved on to thank you for destroying the cave beast, "
			+ "and, as a reward, throws down to you the starter key to a sand skimmer "
			+ "that the alien says should allow you to reach the nearest settlement "
			+ "without being eaten by sand-swimmers.  "
			+ "The alien then turns and walks off into the depths of the steamworks, "
			+ "but not before muttering something about the skimmer's throttle being stuck.";

		u.messageEnqueue(message)

		p.itemAdd(Items.Instance().SkimmerKey);
	}

	placePlanetCliffsBottomNorthwestWestSide_LookInHole
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message =
			"You cross over to the cliff base and put your head near the hole "
			+ "to see what you can see inside.  "
			+ "As your eyes adjust to the relative darkness, "
			+ "you think you see something.  "
			+ "You catch the gleam of something whitish, shiny, triangular, and smallish, "
			+ "maybe a couple centimeters long.  "
			+ "Whatever it is, you now start to notice that there's more than one.  "
			+ "Actually, there's a whole bunch of them."
			+ "And they're coming closer."
			+ "\n\n"
			+ "Yeah, they were teeth."
			+ "\n\n"
			+ "You are dead."

		u.messageEnqueue(message);
		
		w.end();
	}

	placePlanetCliffsCaveInterior_GoEast
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		u.messageEnqueue
		(
			"You stumble a few hesitant steps forward into the darkness of the cave."
			+ "Even though you've only moved a few meters deeper into the cave, "
			+ "the smell has intensified to an almost unbearable degree.  "
			+ "Behind you, the light from the cave mouth seems very inviting."
			+ "While you were very down on it before, you find that "
			+ "even a few moments in this cave has really given you a new appreciation "
			+ "for the burning sun of the desert outside."
			+ "\n\n"
			+ "In a few moments, a cave monster either knocks you unconscious "
			+ "or possibly decapitates you.  Its hard to tell in the dark."
			+ "\n\n"
			+ "You are dead."
		);
	}

	placePlanetCliffsCaveInterior_GoWest
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var stateName = "TurnsSinceLastEnteringCave";

		w.agentPlayer.stateGroup.stateWithNameSetToValue
		(
			stateName, 0
		);
	}

	placePlanetCliffsCaveInterior_Update
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		if (p.hasBeenVisited() == false)
		{
			u.messageEnqueue(p.description);
			p.visit();
		}

		var stateName = "TurnsSinceLastEnteringCave";
		var turnsSinceLastEnteringCave =
			w.agentPlayer.stateGroup.stateWithNameGetValue(stateName);
		if (turnsSinceLastEnteringCave == null)
		{
			turnsSinceLastEnteringCave = 0;
		}

		var message: string;
		if (turnsSinceLastEnteringCave == 0)
		{
			message =
				"From far back in the cave, you hear a slapping noise,"
				+ "as of spatulate feet running across rocks.";
		}
		else if (turnsSinceLastEnteringCave == 1)
		{
			message =
				"That slapping-footsteps noise you heard coming from the back of the cave "
				+ "is now coming from the middle of the cave, "
				+ "and seems to be heading for the front of the cave, "
				+ "which makes you uncomfortable, because that's where you are.  "
				+ "In the shadows, you can just make out something big coming toward you."
		}
		else if (turnsSinceLastEnteringCave == 2)
		{
			message =
				"A nightmarish beast charges into the dim light at the mouth of the cave.  "
				+ "It looks like a bear married a frog married a spider, "
				+ "and then their offspring ate all three of its parents "
				+ "and then got a wicked sunburn on its full-body excema."
				+ "\n\n"
				+ "You think it would have killed you already, "
				+ "but luckily even the low light here seems to blind it, stun it, maybe hurt it.  "
				+ "It staggers a bit, throwing one claw over its eyes.  "
				+ "It still has several other claws left over to deal with you, though.  "
				+ "And it's still moving toward you."
		}
		else if (turnsSinceLastEnteringCave == 3)
		{
			message =
				"Well, you waited too long.  "
				+ "If you were hoping the bellowing, charging claw monster "
				+ "would turn out to be friendly, I'm afraid I must inform you "
				+ "that this is not that kind of game."
				+ "\n\n"
				+ "You are dead.";

			w.end();
		}

		u.messageEnqueue(message);

		turnsSinceLastEnteringCave++;

		w.agentPlayer.stateGroup.stateWithNameSetToValue
		(
			stateName, turnsSinceLastEnteringCave
		);
	}

	placePlanetCliffsTopSouth_CrossBridge
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var stateName = "TimesBridgeCrossed";
		var region = p.region(w);
		var regionStateGroup = region.stateGroup;
		var timesBridgeCrossed =
			regionStateGroup.stateWithNameGetValue(stateName);
		if (timesBridgeCrossed == null)
		{
			timesBridgeCrossed = 0;
		}

		var message: string;

		if (timesBridgeCrossed == 0)
		{
			message =
				"As you walk across the stone arch, it groans under your weight.  "
				+ "New cracks appear in the stone.  "
				+ "The existing cracks get longer, wider, and deeper, "
				+ "and not in a sexy way."
		}
		else if (timesBridgeCrossed == 1)
		{
			message =
				"As you walk across the stone arch again, "
				+ "all the cracks in the rock get bigger.  "
				+ "Which is just what you expected to happen.  "
				+ "It's always gratifying when experiment agrees with theory."
		}
		else if (timesBridgeCrossed == 2)
		{
			message =
				"As you walk across the stone arch again, "
				+ "all the cracks in the rock get bigger.  "
				+ "Which is just what you expected to happen.  "
				+ "It's always gratifying when experiment agrees with theory."
		}
		else if (timesBridgeCrossed == 3)
		{
			message =
				"You walk across the stone arch yet again. "
				+ "This time, some of the cracks get so big "
				+ "that pieces of stone actually start falling off of the arch "
				+ "and make little puffs as they impact the sand below.  "
				+ "\n\n"
				+ "This is starting to remind you of that time the ranger "
				+ "yelled at you at Delicately Arrayed Crystals Galactic Park."
		}
		else if (timesBridgeCrossed == 4)
		{
			message =
				"Against your every better instinct, you start to walk "
				+ "across the stone arch yet again. "
				+ "As you approach the apex, a shower of little stones "
				+ "falls to the desert below.  Then, with a groaning, rattling roar, "
				+ "The entire thing collapses, and it and you plummet to the desert below.  "
				+ "\n\n"
				+ "You try jumping up in the air just before the boulder you're standing on "
				+ "hits the sand, like your uncle used to say "
				+ "you can do with a falling elevator car, "
				+ "but either your uncle or your timing is wrong, "
				+ "because it doesn't work.  "
				+ "\n\n"
				+ "It's academic anyway, since a bunch more boulders fall on top of you."
				+ "\n\n"
				+ "You are dead.";

			w.end();
		}

		u.messageEnqueue(message);

		timesBridgeCrossed++;
		regionStateGroup.stateWithNameSetToValue(stateName, timesBridgeCrossed);

		if (w.isOver == false)
		{
			var portal = p.portalByName("bridge");
			portal.goThrough(u, w);
		}
	}

	placePlanetDesertDeep_Update
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		if (p.hasBeenVisited() == false)
		{
			p.visit();

			var placeDescription = p.description;
			u.messageEnqueue(placeDescription);

			var message =
			[
				"You hear a grinding noise coming from the deeper desert.  ",
				"It sounds like a hundred-car hovertrain with half its hoverpads missing ",
				"hauling a cargo of tornadoes arguing about politics."
			].join("");

			u.messageEnqueue(message);
		}
		else
		{
			var message =
			[
				"As you idly faff about in the burning sand-strewn waste, ",
				"you notice the grinding sound from the deep desert gets louder and closer. ",
				"You turn from whatever you were doing that seemed so important ",
				"just in time to see a large wavefront of sand moving toward you.  ",
				"In an instant, the mobile dune reaches you, and explodes into a ring ",
				"of needle-sharp crystalling teeth, circling a mouth",
				"wider than you are tall.  Ironically, however, the charging sand-swimmer ",
				"swallows you without chewing, so what was the point of all those teeth?",
				"\n\n",
				"You are dead.  Next time, maybe don't wander around the desert so much.  ",
				"Try to have a plan, is what I'm saying."
			].join("");

			u.messageEnqueue(message);

			w.end();
		}
	}
	
	placePlanetSettlementRobotShopInterior_Buy
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		u.messageEnqueue("todo");
	}

	regionFriendlyShip_UpdateForTurn(u: Universe, w: World, p: Place, c: Command): void
	{
		var turnsSoFar = w.turnsSoFar;

		if (turnsSoFar == 3)
		{
			u.messageEnqueue
			(
				"In the distance, you can hear shouting, "
				+ "then the sound of weapons fire, "
				+ "then screaming, then silence."
			);
		}
		else if (turnsSoFar == 10)
		{
			u.messageEnqueue
			(
				"You hear and feel a powerful explosion somewhere on board the ship.  "
				+ "The lights flicker.  That's bad.  These are really expensive lights "
				+ "that are guaranteed not to do that."
			);
		}
		else if (turnsSoFar == 20)
		{
			u.messageEnqueue
			(
				"The force of another explosion being transferred "
				+ "through the ship's frame "
				+ "nearly knocks you off your feet.  "
				+ "Some sparks shoot out of a panel, which is especially unsettling, "
				+ "since you're pretty sure there's not even anything electrical behind that panel."
			);
		}
		else if (turnsSoFar == 30)
		{
			u.messageEnqueue
			(
				"With another loud boom, the lights go completely out, "
				+ "and stay out for a few seconds.  "
				+ "Then they come back on.  But not all of them, "
				+ "and not all the way, and not all the time."
			);
		}
		else if (turnsSoFar == 40)
		{
			u.messageEnqueue
			(
				"You stagger as a titanic metallic groaning noise "
				+ "echoes through the ship's halls.  "
				+ "It sounds as if the ship is tearing itself apart, "
				+ "which seems like a thing it might plausibly do in the next few minutes."
			);
		}
		else if (turnsSoFar == 50)
		{
			u.messageEnqueue
			(
				"A series of sharp explosions makes the deck heave "
				+ "under you, throwing you into the ceiling"
				+ "by banking you off a wall, "
				+ "and then slamming you back into the floor."
			);
		}
		else if (turnsSoFar == 60)
		{
			u.messageEnqueue
			(
				"The rumbles, groaning, and explosions are getting so bad now "
				+ "that it's getting hard to hear yourself think, "
				+ "so you just have to hope that you are.  "
				+ "Additionally, a pulsing, droning noise adds itself to the cacaphony."
			);
		}
		else if (turnsSoFar == 70)
		{
			u.messageEnqueue
			(
				"The pulsing, droning noise is steadily rising in pitch.  "
				+ "The pops, moans, and booms are steadily increasing in tempo.  "
				+ "This symphony of destruction is clearly building up to something."
			);
		}
		else if (turnsSoFar == 80)
		{
			u.messageEnqueue
			(
				"The pulsing, droning noise is now a ululating scream "
				+ "that feels like it's trying simultaneously to claw its way into "
				+ "and out of your skull."
				+ "She cannae take much more o' this, Cap'n."
			);
		}
		else if (turnsSoFar == 90)
		{
			u.messageEnqueue
			(
				"LOUD LOUD SO LOUD HOW CAN ANYTHING BE THIS LOUD"
			);
		}
		else if (turnsSoFar == 100)
		{
			u.messageEnqueue
			(
				"The ship tears itself into a thousand pieces, "
				+ "with a sound louder than ears can hear.  "
				+ "Luckily, the ear-shattering noise only lasts a moment, "
				+ "because all the ship's air rushes out into the surrounding vaccuum."
				+ "Luckier still, you don't die of asphixiation, because you're "
				+ "sheared into seven separate pieces by shrapnel from the explosion first."
				+ "\n\n"
				+ "You are dead."
			);

			w.end();
		}

	}

	regionPlanetDesert_UpdateForTurn(u: Universe, w: World, p: Place, c: Command): void
	{
		var stateName = "TurnsSinceLastDrink";

		var agentPlayer = w.agentPlayer;
		var turnsSinceLastDrink =
			agentPlayer.stateGroup.stateWithNameGetValue(stateName);

		if (turnsSinceLastDrink == 10)
		{
			u.messageEnqueue
			(
				"You're getting thirsty.  This desert really takes it out of you."
			);
		}
		else if (turnsSinceLastDrink == 20)
		{
			u.messageEnqueue
			(
				"You're getting very thirsty now.  "
				+ "This desert is a monster.  "
				+ "Some kind of... water-sucking... low-moisture... monster."
				+ "Look, it's too hot to think of what kind of monster it is right now."
			);
		}
		else if (turnsSinceLastDrink == 30)
		{
			u.messageEnqueue
			(
				"Hey!  I don't know if you were listening before, "
				+ "but YOU ARE VERY VERY THIRSTY NOW.  "
				+ "If you don't drink something very soon, "
				+ "you will die of dehydration."
			);
		}
		else if (turnsSinceLastDrink == 40)
		{
			u.messageEnqueue
			(
				"Welp, you're dying now.  Yes, right now.  Of dehydration,  "
				+ "which is a pretty bad way to go, "
				+ "or at least it seems that way to you."
				+ "\n\n"
				+ "I guess most ways to die are bad, though.  "
				+ "It's all subjective.  "
				+ "Some people say that drowning is the worst way to die, "
				+ "but that actually sounds nice to you right now.  Go figure.  "
				+ "Anyway: "
				+ "\n\n"
				+ "You are dead."
			);
			w.end();
		}

		turnsSinceLastDrink++;
		agentPlayer.stateGroup.stateWithNameSetToValue
		(
			stateName, turnsSinceLastDrink
		);

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
