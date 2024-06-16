
class Game
{
	static worldBuild(): World
	{
		var player = Agent.fromNames
		(
			[ "self", "me", "myself" ]
		).descriptionWhenExaminedSet
		(
			"This is you.  You have to start getting used to this.",
		).itemsAdd
		(
			[
				Item.fromNamesAndDescription
				(
					[ "washrag", "rag" ],

					[
						"This is a rag you use to clean things sometimes.  ",
						"You may or may not have given it a name.  ",
						"And a backstory.  And a love interest.  ",
						"And a ragtag group of friends ",
						"that it may or may not go on adventures with.",
						"\n\n",
						"He's Terry C. Washburn, heir to the Whammy-Chamois dynasty, ",
						"beloved of the lovely Bubbles Scrubbington, and leader of the ",
						"Moisture Satiety Society"
					].join("")
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
	CanOfSham: Item;
	Canteen: Item;
	CaveBeastClaw: Item;
	CouponBook: Item;
	DataCartridge: Item;
	Gadget: Item; // Translator.
	GasGrenade: Item;
	Keycard: Item;
	Jetpack: Item;
	Multitool: Item;
	PulseRifle: Item;
	Quatloos: Item;
	ReflectiveGlass: Item;
	Rock: Item;
	SkimmerKey: Item;
	SpaceSuit: Item;
	SurvivalKit: Item;

	_All: Item[];

	constructor()
	{
		this.CanOfSham = this.canOfSham();
		this.CaveBeastClaw = this.caveBeastClaw();
		this.Canteen = this.canteen();
		this.CouponBook = this.couponBook();
		this.DataCartridge = this.dataCartridge();
		this.Gadget = this.gadget();
		this.GasGrenade = this.gasGrenade();
		this.Keycard = this.keycard();
		this.Multitool = this.multitool();
		this.Quatloos = this.quatloos();
		this.ReflectiveGlass = this.reflectiveGlass();
		this.Rock = this.rock();
		this.SkimmerKey = this.skimmerKey();
		this.SpaceSuit = this.spaceSuit();

		// Containers.
		this.SurvivalKit = this.survivalKit
		(
			[ this.Canteen, this.Multitool, this.CanOfSham ]
		);

		this._All =
		[
			this.CanOfSham,
			this.Canteen,
			this.CaveBeastClaw,
			this.CouponBook,
			this.DataCartridge,
			this.Gadget,
			this.GasGrenade,
			this.Keycard,
			this.Multitool,
			this.Quatloos,
			this.ReflectiveGlass,
			this.Rock,
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

	canOfSham(): Item
	{
		return Item.fromNamesAndDescription
		(
			[ "can of Sham", "can of sham", "can", "sham" ],

			[
				"These are cans of Sham (tm) taken from the survival kit ",
				"of the Pax Aeterna's escape pod.  ",
				"\n\n",
				"If you're not familiar with the product, ",
				"Sham (tm) is a... popular... brand of ",
				"canned artificial cultured animal muscle protein.  ",
				"\n\n",
				"Nobody eats real meat anymore, ",
				"because people feel guilty about the cruelty to animals.  ",
				"Sham (tm) puts the cruelty where it belongs--in the consumer's mouth.",
			].join("")
		).quantitySet(3);
	}

	caveBeastClaw(): Item
	{
		return Item.fromNamesAndDescription
		(
			[ "cave beast claw", "beast claw", "claw" ],

			[
				"This is one of the claws of the cave beast of Ekkis II, ",
				"whom you murdered.  But it was coming right for you!  ",
				"It was self-defense.  You think.  ",
				"And that makes it not murder, right?  ",
				"Maybe it was, like, beastslaughter?",
				"\n\n",
				"Anyway, you killed a living being whose appearance and demeanor ",
				"made you feel scared, and then you picked up his severed hand ",
				"and took it with you.  Classy.  You suppose maybe the claw could be useful ",
				"for retrieving cans off of high shelves, if you can figure out how to ",
				"make the fingers open and close from the near end of the stump, ",
				"and if you survive long enough to find any high shelves with cans on them."
			].join("")
		);
	}

	canteen(): Item
	{
		return Item.fromNamesAndDescription
		(
			[ "canteen", "dehydrated water", "water", "bottle" ],

			[
				"This is a canteen filled with water, sort of.  ",
				"But, as a prominent warning label clearly reads, it's 'dehydrated water'.",
				"\n\n",
				"What that means is that it's full of hydrogen gas ",
				"under an incredible amount of pressure, enough to liquefy it.  ",
				"When the valve in the bottle's neck is opened, ",
				"it allows a small amount of the gas out ",
				"to combust in the oxygen (hopefully!) of the surrounding (hopefully!) air, ",
				"which creates a small amount of water vapor ",
				"that condenses in the mouth of the bottle, " ,
				"thus providing a small quantity of drinkable water, ",
				"along with a medium quantity of danger of a hydrogen explosion.",
				"\n\n",
				"This technology theoretically makes it possible to carry ",
				"about nine times more water that one could with a normal canteen, ",
				"but as a practical matter, all the pressurizing and processing equipment ",
				"adds almost as much weight as it saves.  ",
				"You suspect this thing only exists because somebody's cousin ",
				"got a lucrative government contract to develop it.",
				"\n\n",
				"Besides that, the water that comes out is warm.  Yuck."
			].join("")

		).commandAdd
		(
			Command.fromTextsAndScriptExecuteName
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

	couponBook(): Item
	{
		return Item.fromNamesAndDescription
		(
			[ "coupon book" ],

			[
				"This is a coupon book that purports to facilitate big savings ",
				"for customers of the businesses in the settlement of [Farting Noise], ",
				"of which, as near as you can figure out from looking at the coupons, ",
				"there are three: a bar, a spaceship dealership, and a robot emporium.  ",
				"You imagine their Chamber of Commerce meetings ",
				"could be held inside an elevator."
			].join("")
		);
	}

	dataCartridge(): Item
	{
		return Item.fromNamesAndDescription
		(
			[ "data cartridge", "cartridge" ],

			[
				"This is a data cartridge labelled 'Pandimensional Metacalculus for Hypernavigators' ",
				"that you retrieved from the library of the Pax Aeterna ",
				"using the skills you learned in the Remedial Library Literacy course ",
				"they made you take when you came on board.",
				"\n\n",
				"A dying man used his last breath to recommend it to you, ",
				"so you figure it must be good."
			].join("")

		).commandAdd
		(
			Command.fromTextsAndScriptExecuteName
			(
				MessageHelper.combinePhraseArrays
				([
					[ "put", "place", "insert" ],
					[ "cartridge", "data cartridge" ],
					[ null, "in", "into" ],
					[ "slot", "reader" ]
				]),

				Scripts.Instance().itemDataCartridge_PutInSlot.name
			)
		);
	}

	gadget(): Item
	{
		return Item.fromNamesAndDescription
		(
			[ "gadget" ],

			[
				"This is a gadget you found in a closet, ",
				"then just picked up and put in your pocket, ",
				"even though it's not yours and you don't know what it does.  ",
				"It sounds weird when you put it like that.",
				"\n\n",
				"The gadget's intended function is cryptic.  ",
				"There's a button and an indicator light.  ",
				"And some sort of... grille?.. on one end.  ",
				"That's it, though."
			].join("")

		).commandAdd
		(
			Command.fromTextsAndScriptExecuteName
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

			[
				"This is a Vadik gas grenade.  ",
				"The Vadik are notoriously, and apparently cheerfully, violent, ",
				"so you're not sure why they even have non-lethal weapons like these.  ",
				"Maybe they're issued to underperforming crew for purposes of public shaming."
			].join("")
		);
	}

	keycard(): Item
	{
		return Item.fromNamesAndDescription
		(
			[ "keycard", "key", "card" ],

			[
				"This is an access keycard for the starship Pax Aeterna.  ",
				"You guess it could also be, like, a picnic table for ants."
			].join("")
		);
	}

	reflectiveGlass(): Item
	{
		return Item.fromNamesAndDescription
		(
			[ "glass", "reflective glass", "windshield" ],

			[
				"This is a shard of reflective glass from the shattered windshield ",
				"of the Pax Aeterna's escape pod.  ",
				"It's the size of your palm, roughly.  Well, more like sharply.  ",
				"You're not sure how you're carrying this without cutting yourself."
			].join("")
		);
	}

	multitool(): Item
	{
		return Item.fromNamesAndDescription
		(
			[ "multitool" ],

			[
				"This is a multitool taken from the survival kit of the Pax Aeterna's ",
				"escape pod.  Various small tools are fixed on one end by a rivet ",
				"and folded into the handle.  ",
				"A selected tool can be extended and locked in place for use.",
				"\n\n",
				"You hope you don't need it.  ",
				"The only tool you've ever used on one of these is the toothpick, ",
				"which you lost.  Your roommate never let you use it again after that."
			].join("")
		);
	}

	quatloos(): Item
	{
		return Item.fromNamesAndDescription
		(
			[ "quatloos", "credits", "coins", "money" ],

			[
				"Quatloos are the most widely-shared form of currency ",
				"in the galaxy.  They were originally used exclusively ",
				"to gamble on blood sports with non-consenting combatants, ",
				"and were thus outlawed in most jurisdictions.  ",
				"But eventually, all forms of cash were outlawed by the authorities, ",
				"since nobody used cash for anything that wasn't illegal.  ",
				"Eventually, those same authorities realized that pretty much anybody ",
				"using any medium of exchange was up to no good, ",
				"so a lot of them outlawed money in general.",
				"\n\n",
				"It's been mostly positive, but there are some downsides.  ",
				"Like when, as happens from time to time, ",
				"especially when one is on an adventure, ",
				"one finds it necessary to transact business with less enlightened beings ",
				"who aren't committed to the cause of abolishing resource contention ",
				"for the common good.  Which turns out to be a lot of people.  ",
				"That's where quatloos come in."
			].join("")
		);
	}

	rock(): Item
	{
		return Item.fromNamesAndDescription
		(
			[ "rock", "stone" ],

			[
				"It's a rock.  It's got one round end and one pointy end.  ",
				"It's kind of teardrop shaped, you guess?",
				"\n\n",
				"You remember a ancient video where a kid ",
				"was participating in a candy-distribution festival ",
				"and got distributed a rock instead.  ",
				"You're not sure what the moral of the story was.  ",
				"Seemingly, it was that kid's life sucked.  ",
				"But that was pretty obvious from the get-go, ",
				"because even though he was pre-pubescent, ",
				"he was already bald."
			].join("")
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
			Command.fromTextsAndScriptExecuteName
			(
				MessageHelper.combinePhraseArrays
				([
					[ "put", "insert", "use" ],
					[ "key", "skimmer key" ],
					[ null, "in", "on" ],
					[ "skimmer" ]
				]),
				Scripts.Instance().placePlanetCavernsSteamworks_InsertKeyInSkimmer.name
			)
		);
	}

	spaceSuit(): Item
	{
		return Item.fromNames
		(
			[ "space suit", "spacesuit", "suit" ]
		).descriptionWhenExaminedSet
		(
			[
				"This is space suit from the starship Pax Aeterna.  ",
				"It keeps the space out and the air in.  ",
				"Maybe they should call it an air suit."
			].join("")
		).scriptGetSet
		(
			Script.fromName
			(
				Scripts.Instance().placeFriendlyShipDockingBayAntechamberClosetRight_GetSpaceSuit.name
			)
		);
	}

	survivalKit(contents: Item[]): Item
	{
		return Item.fromNames
		(
			[ "survival kit", "kit" ]
		).descriptionWhenExaminedSet
		(
			"This is a survival kit from the Pax Aeterna's escape pod."
		).itemsAdd
		(
			contents
		).commandAddFromTextSourceAndScriptName
		(
			TextSourceStrings.fromStrings([ "open survival kit", "open kit" ]),
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

	emplacement2(names: string[], descriptionWhenExamined: string): Emplacement
	{
		return Emplacement.fromNamesAndDescriptions
		(
			names, null, descriptionWhenExamined
		);
	}

	emplacement3
	(
		names: string[],
		descriptionWhenExamined: string,
		scriptUseName: string
	): Emplacement
	{
		return Emplacement.fromNamesDescriptionsAndScriptUseName
		(
			names,
			null, // descriptionAsPartOfPlace
			descriptionWhenExamined,
			scriptUseName
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
			null, // script,
			objects
		);
	}

	place4
	(
		name: string,
		description: string,
		script: Script,
		objects: any[]
	): Place
	{
		return Place.fromNameDescriptionScriptNameAndObjects
		(
			name,
			description,
			script,
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
			.scriptUseSet(Script.fromName(scriptUseName) );

		return returnPortal;
	}

	// Places.

	// Places - Pax Aeterna.

	friendlyShipBridge(): Place
	{
		return this.place3
		(
			Places.friendlyShipBridge_Name(),

			[
				"This is the command bridge of the starship Pax Aeterna.  ",
				"A large transparent hemispherical dome arches overhead, ",
				"showing the brilliantly shining surrounding stars.  ",
				"\n\n",
				"Banks of incomprehensible--to you, at least--controls ",
				"line the aft wall, with the nearby seats ",
				"most of which are empty, but two of which are filled with the slumped bodies ",
				"of the counselor and tactical officer.  ",
				"\n\n",
				"There're also some bodies scattered on the floor: ",
				"the navigator, the helm officer, and the first officer.",
				"\n\n",
				"Near the center of the room is the captain's chair.  ",
				"It is huge, and looks extremely comfortable.  ",
				"You've secretly always wanted to sit in it, ",
				"but it is currently occupied, as it usually is, by the captain.  ",
				"She's dead right now, but still.",
				"\n\n",
				"A prominent pedestal behind the captain's chair ",
				"formerly held the Stellar Juvenator, but now stands vacant.",
				"\n\n",
				"A door leads back out to the corridor."
			].join(""),

			[
				this.portal
				(
					[ "door", "outside", "hall", "corridor" ],
					Places.friendlyShipUpperDeckHallForward_Name()
				),

				this.emplacement2
				(
					[ "captain" ],

					[
						"The captain still looks calm and self-assured, even with a ",
						"ten-centimeter hole blasted through her midsection.  ",
						"What a class act."
					].join("")
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "search captain" ],
						this.scripts.emplacementBodyKeycardSearch.name
					)
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "search body" ],
						this.scripts.placeFriendlyShipBridge_SearchBody.name
					)
				),

				this.emplacement2
				(
					[ "captain's chair" ],

					[
						"This chair is deluxe.  This chair is so deluxe that it should really ",
						"be written as two words: de luxe."
					].join("")
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "sit in chair" ],
						this.scripts.placeFriendlyShipBridge_SitInChair.name
					)
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "hide behind captain's chair" ],
						this.scripts.placeFriendlyShipBridge_HideBehindCaptainsChair.name
					)
				),

				this.emplacement2
				(
					[ "counselor" ],

					[
						"The counselor's uniform is, for some reason, ",
						"in a completey different style from everybody else's uniforms.  ",
						"You never really understood why that was.  ",
						"Can you even really call it a uniform?",
						"\n\n",
						"You liked her.  She would nod at you whenever she passed you in the hall.  ",
						"A few times you could've sworn ",
						"she even seemed like she was trying to remember your name."
					].join("")
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "search counselor" ],
						this.scripts.emplacementBodyEmptySearch.name
					)
				),

				this.emplacement2
				(
					[ "first officer" ],

					[
						"The first officer's body lies on the floor here.  ",
						"You didn't much like this guy.  He was only ever nice to you ",
						"when the counselor was around.",
						"\n\n",
						"And his facial hair kept changing.  ",
						"Beard or no beard?  No beard or beard? ",
						"Decide, already, dude, you're in your forties now.  ",
						"\n\n",
						"Anyway, half his beard is gone now, ",
						"because half his face is gone.  Poetic justice, you guess."
					].join("")
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "search first officer" ],
						this.scripts.emplacementBodyEmptySearch.name
					)
				),

				this.emplacement2
				(
					[ "helmsman" ],

					[
						"The helmsman hit on you one time.  ",
						"Honestly, you were flattered: He kept it tight."
					].join("")
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "search helmsman" ],
						this.scripts.emplacementBodyEmptySearch.name
					)
				),

				this.emplacement2
				(
					[ "navigator" ],

					"You never understood anything this kid said.  Plus his accent seemed fakey."
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "search navigator" ],
						this.scripts.emplacementBodyEmptySearch.name
					)
				),

				this.emplacement2
				(
					[ "tactical officer" ],

					[
						"This guy gave you the creeps.  He would sit in the mess hall ",
						"sharpening knives.  What were those knives even for?  ",
						"He didn't eat with them.  He sure wasn't using them for his job.  ",
						"And how did they keep getting dull?",
						"\n\n",
						"Anyway, it's lucky for everybody he's dead.  Losing the battle for this ship ",
						"would have definitely put him in a worse-than-usual mood."
					].join("")

				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "search tactical officer" ],
						this.scripts.emplacementBodyEmptySearch.name
					)
				)
			]
		);
	}

	static friendlyShipBridge_Name(): string
	{
		return "Pax Aeterna - Bridge";
	}

	friendlyShipCaptainsQuarters(): Place
	{
		return this.place3
		(
			Places.friendlyShipCaptainsQuarters_Name(),

			[
				"You stand in the personal quarters of the captain ",
				"of the Pax Aeterna.  You feel pretty weird about it.  ",
				"On some level, you were hoping that her door would be locked.",
				"\n\n",
				"A door leads back out to the corridor."
			].join(""),

			[
				this.portal
				(
					[ "door", "outside", "hall", "corridor" ],
					Places.friendlyShipUpperDeckHallForward_Name()
				),

				this.emplacement2
				(
					[ "grand piano" ],

					[
						"The captain's grand piano occupies most of the cabin's generous floor space.  ",
						"She was evidently quite an accomplished pianist.  ",
						"She'd have to be, to justify using this much space and mass ",
						"on a working starship."
					].join("")
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "hide behind grand piano", "hide behind piano" ],
						this.scripts.placeFriendlyShipBridge_SearchBody.name
					)
				),
			]
		);
	}

	static friendlyShipCaptainsQuarters_Name(): string
	{
		return "Pax Aeterna - Captain's Quarters";
	}

	friendlyShipDockingBayAntechamber(): Place
	{
		return this.place3
		(
			Places.friendlyShipDockingBayAntechamber_Name(),

			[
				"This is the antechamber of the Pax Aeterna's docking bay.  ",
				"A large airlock door leads to the hangar.  ",
				"A control console occupies one wall, while ",
				"on the opposite wall are two closets, with a pair of ",
				" buttons at chest height between them. ",
				" An elevator leads back to the engineering deck."
			].join(""),

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
				).lock().descriptionWhenExaminedSet
				(
					"The door to the left closet is closed."
				),

				this.portal
				(
					[ "right closet" ],
					Places.friendlyShipDockingBayAntechamberClosetRight_Name()
				).lock().descriptionWhenExaminedSet
				(
					"The door to the right closet is closed."
				),

				this.emplacement( [ "controls", "console", "control console" ] ),

				this.emplacement
				(
					[ "left button", "button" ]
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
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
					Command.fromTextsAndScriptExecuteName
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

			[
				"This is the left-hand closet of the antechamber ",
				"of the Pax Aeterna's docking bay.  ",
				"The door leads back to the antechamber."
			].join(""),

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

			[
				"This is the right-hand closet of the antechamber ",
				"of the Pax Aeterna's docking bay.  ",
				"The door leads back to the antechamber."
			].join(""),

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

			[
				"This is the Pax Aeterna's docking bay hangar.  ",
				"\n\n",
				"Though the docking bay's floor is easily large enough to accomodate ",
				"a 20-passenger luxury yacht, it is currently empty ",
				"except for a relatively small hatch in the floor ",
				"and a control console near the airlock door leading back to the antechamber.",
				"\n\n",
				"A similarly gigantic pair of doors at the far end of the bay ",
				"allows ships to enter and depart when open, ",
				"and keeps everything safely sheltered when closed."
			].join(""),

			[
				this.portal( [ "airlock" ], Places.friendlyShipDockingBayAntechamber_Name() ),

				this.portal
				(
					[ "escape pod", "pod" ], Places.friendlyShipEscapePod_Name()
				).descriptionWhenExaminedSet
				(
					[
						"The pod is kind of cramped-looking, ",
						"but as it's your only hope of survival right now, ",
						"you prefer to think of it as 'cozy'."
					].join("")
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

					[
						"This is a trapdoor in the floor, ",
						"perhaps three meters by five meters, ",
						"split down the middle into two retractible doors."
					].join("")
				),

				this.emplacement
				(
					[ "docking bay doors", "bay doors", "doors" ],
				).lock().descriptionWhenExaminedSet
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

			[
				"This is the aft end of the Pax Aeterna's engineering deck.  ",
				"\n\n",
				"A passage to fore leads back to the rest of the deck.",
				"\n\n",
				"In the aft wall is an door, ",
				"behind which is an elevator that goes down to the docking bay.  ",
				"I know, I know: I said this was the lowest deck.  ",
				"And that was the truth.  Yes, if the docking bay were a deck, ",
				"it would be the lowest one.  But it's a bay, not a deck.  ",
				"So it can't be the lowest deck.  ",
				"It's the lowest bay, though, promise.  ",
				"Well, the lowest of the bays you're likely to see.",
				"\n\n",
				"Next to the elevator door is a small panel with a slot in it."
			].join(""),

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
					Command.fromTextsAndScriptExecuteName
					(
						[
							"use keycard on slot",
							"insert keycard in slot",
							"put keycard in slot"
						],

						this.scripts.itemKeycardUse.name
					)
				),

				Agent.fromNamesDescriptionsAndScriptUpdateForTurnName
				(
					[ "vadik soldier", "vadik", "enemy" ],

					[
						"A Vadik soldier points his weapon in your direction.  ",
						"You hope it's pointing at someone behind you--people usually are--",
						"but in this instance, you have a bad feeling that it means you."
					].join(""),

					[
						"The Vadik soldier is dressed head-to-toe in a suit of gleaming black ",
						"battle armor.  It's roughly human-shaped, but the armor coverage ",
						"doesn't give any more details as to what it looks like.  ",
						"Anyway, his most salient feature at the moment ",
						"is the wicked-looking gun he has trained on you."
					].join(""),

					Script.fromName(this.scripts.regionFriendlyShip_AgentEnemyUpdateForTurn.name)
				),
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

			[
				"This is the middle of the Pax Aeterna's engineering deck.  ",
				"To fore and aft are the other sections of the deck.",
				"\n\n",
				"Three large transparent domes on the floor cover the tops of ",
				"the ship's reactor tubes.  These domes are currently pulsing ",
				"an unsettling reddish-orange, accompanied by a loud ",
				"and ominous droning sound.  ",
				"Probably one of the most ominous droning sounds you've heard in a while.",
				"\n\n",
				"A thick window ",
				"looks down over the ship's docking bay, with a control console ",
				"running beneath that window.  The bodies of two crewmen lie on the floor."
			].join(""),

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

					[
						"These are the controls for the docking bay doors, ",
						"which are visible through the nearby window.  ",
						"There are two buttons, one that says 'open bay doors' ",
						"and another that says 'close bay doors'.  ",
						"It doesn't take a rocket scientist to operate these controls, ",
						"although there is prominently placed placard that says otherwise."
					].join("")
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

					[
						"This button opens the docking bay doors, ",
						"if they happen to be closed.  ",
						"Otherwise, they do nothing.  Or so you assume."
					].join("")

				).visibleSet(false).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
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

					[
						"This button closes the docking bay doors, ",
						"if they happen to be open.  ",
						"Otherwise, they do nothing.  Or so you assume."
					].join("")
				).visibleSet(false).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
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

					[
						"You're not sure why the ends of the reactor tubes ",
						"need to be transparent, but these are, and the colors ",
						"currently coming through them don't give you a good feeling."
					].join("")
				),

				this.emplacement2
				(
					[ "window", "bay", "docking bay" ],

					[
						"The window looks out over the ship's docking bay, ",
						"including the large doors at the end of it, ",
						"through which ships and cargo pass.  ",
						"The view is not especially interesting.  ",
						"This is a pretty down-to-business window, on the whole, ",
						"especially when the bay doors are closed."
					].join("")
				),

				this.emplacement( [ "body" ] ).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						["search body"],
						this.scripts.emplacementBodyEmptySearch.name
					)
				),

				this.emplacement( [ "other body" ] ).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
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

			[
				"This is the forward end of the Pax Aeterna's engineering deck.  ",
				"I know I said that the deck above was the lower deck, ",
				"but this deck is lower than that.  It's the lower lower deck.  ",
				"I promise, there are no decks lower than this one.",
				"\n\n",
				"The rest of the deck lies to aft.  ",
				"\n\n",
				"At the fore end, an door opens on an elevator back to the ",
				"lower-but-not-quite-lowest deck."
			].join(""),

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

			[
				"This is the interior of one of the Pax Aeterna's escape pods.  ",
				"A padded seat with safety belts completely occupies the floor of the pod's cabin.  ",
				"Beneath the window is a console with various controls, ",
				"including a throttle, a monitor screen, and some buttons.  ",
				"A gull-wing door in the left wall of the pod allows entry and exit.  ",
				"Opposite the door, on the starboard wall, is a mounting for a survival kit.  ",
				"Above the control console is a large window, through which ",
				"the pod's surroundings can be seen."
			].join(""),

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
					Command.fromTextsAndScriptExecuteName
					(
						[ "look window", "look through window", "look out window" ],
						this.scripts.placeFriendlyShipEscapePod_LookWindow.name
					)
				),

				this.emplacement( [ "autonav button", "autonav", "button" ] ).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
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
					Command.fromTextsAndScriptExecuteName
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
					Command.fromTextsAndScriptExecuteName
					(
						MessageHelper.combinePhraseArrays
						([
							[ "use", "fasten", "put on" ],
							emplacementSafetyHarnessNames
						]),
						this.scripts.placeFriendlyShipEscapePod_PutOnSafetyHarness.name
					)
				),

				Items.Instance().SurvivalKit,

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

			[
				"This office/supply closet/quarters, ",
				"despite the word 'quarters' after the last slash, ",
				"is a bit cramped and uncomfortable for sleeping in, ",
				"as it doesn't have a bed.  ",
				"The quartermaster promised you a cot, but no cot ever showed up, ",
				"and anyway there's no room for it amongst all the cleaning supplies.  ",
				"And as for the 'office' part: don't offices have desks?",
				"\n\n",
				"Anyway, despite how hard it is to nap here, ",
				"heroically, you make it work.  And you don't ",
				"just make it work; you make it work a LOT.",
				"\n\n",
				"A door leads out to the corridor.  ",
				"(You tried sleeping out there once, but someone got mad.)"
			].join(""),

			Script.fromName(this.scripts.placeFriendlyShipJanitorsCloset_Update.name),

			[
				this.portal
				(
					[ "corridor", "door", "hall", "out", "outside" ],
					Places.friendlyShipLowerDeckHallAft_Name()
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

			[
				"This is the Pax Aeterna's library.  ",
				"A door leads back out into the hallway.  ",
				"\n\n",
				"The high walls are occupied almost completely with floor-to-ceiling shelves, ",
				"and the shelves are occupied almost completely ",
				"with rows upon rows of plastic cartridges containing magnetic data tape.  ",
				"(The fleet tried a solid-state, full-digital data storage system for a while, ",
				" but it was agreed that it just didn't give the same rich tones.)"
			].join(""),

			[
				this.portal
				(
					[ "out", "outside", "door", "hall", "corridor" ],
					Places.friendlyShipLowerDeckHallAmidships_Name()
				),

				this.emplacement3
				(
					[ "console", "retrieval console", "controls" ],

					[
						"This is a standard data cartridge retrieval console.  ",
						"If the title of a desired data cartridge is typed ",
						"on the console's keyboard, ",
						"the retrieval robot will retrieve that cartridge from the stacks ",
						"and drop it into the cartidge hopper below the console. ",
						"From there, the cartridge is generally slotted into a reader ",
						"and its contents displayed on a screen.  ",
						"It's a complicated system, to be sure, ",
						"but that sixteen hours of training you took was probably enough."
					].join(""),

					this.scripts.placeFriendlyShipLibrary_UseConsole.name
				).descriptionAsPartOfPlaceSet
				(
					[
						"On the wall opposite the door is a retrieval console with a keyboard and screen, ",
						"a spiderlike cartridge-retrieval robot clinging to the shelves just above it."
					].join(""),

				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "type", "enter" ],
						this.scripts.placeFriendlyShipLibrary_Type.name
					)
				),

				this.emplacement2
				(
					[ "table" ],

					[
						"The table provides a comfortable place ",
						"for the more literate members of the crew to research data tapes.",
						"\n\n",
						"You, on the other hand, have only used it once, ",
						"as an improvised playfield for a game of Vir-Naki Caroms ",
						"with the cartridge-retrieval bot. ",
						"But they made you stop before you could even ",
						"figure out how to detach the bot from the shelves, ",
						"much less get a nice volley going."
					].join("")
				).descriptionAsPartOfPlaceSet
				(
					[
						"A spacious round table ringed with upholstered seats ",
						"fills a pit in the center of the room.  ",
						"It is intended to provide a comfortable place to read data cartridges, ",
						"though there are no cartridge readers present.  ",
						"Every crew member was issued one on boarding, ",
						"but you lost yours.",
						"\n\n",
						"Well, broke it, really.  But then you lost the pieces."
					].join("")
				),

				this.emplacement2
				(
					[ "science officer", "scientist", "man", "person", "body", "corpse", "being" ],

					[
						"The science officer is not moving in any perceptible way.  ",
						"You can't tell from here if he's even breathing, ",
						"which is the most important kind of moving, ",
						"when you think about it."
					].join("")
				).descriptionAsPartOfPlaceSet
				(
					[
						"A man wearing the uniform of the ship's science officer  ",
						"lays face-down on the floor near the cartridge retrieval console."
					].join("")
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[
							"search body",
							"search science officer",
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
		return this.place4
		(
			Places.friendlyShipLowerDeckHallAft_Name(),

			[
				"This is a hallway on the lower deck of the starship Pax Aeterna.  ",
				"The hall continues to forward, and ends in a bulkhead to aft, ",
				"where a door opens onto an elevator.",
				"\n\n",
				"Another door along the hallway ",
				"leads to the office/supply closet/quarters ",
				"of the Maintenance Specialist (Sanitation Grade), ",
				"which is where you, our hero, came boldly to this story, ",
				"as soon as you figured out how to 'go door'."
			].join(""),

			Script.fromName(this.scripts.placeFriendlyShipUpperDeckHallAmidships_Update.name),

			[
				this.portal
				(
					[ "closet", "office", "closet door", "office door" ],
					Places.friendlyShipJanitorsCloset_Name()
				),

				this.portal( [ "forward" ], Places.friendlyShipLowerDeckHallAmidships_Name() ),
				this.portal( [ "elevator", "aft" ], Places.friendlyShipUpperDeckHallAft_Name() ),

				this.emplacement
				(
					[ "body" ]
				).descriptionAsPartOfPlaceSet
				(
					[
						"The dead body of one of the ship's crew ",
						"lies on the floor near the door of your office/supply/closet/quarters, ",
						"his hand outstretched as if to operate the door button. ",
						"You guess it's lucky he didn't get inside before he got killed. ",
						"Lucky for you, that is, not for him.  ",
						"You do feel rather guilty for sleeping through his death, ",
						"which, from the looks of things, wasn't even an especially quiet one."
					].join("")

				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
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

			[
				"This is a corridor on the lower deck of the starship Pax Aeterna.  ",
				"\n\n",
				"This hallway mostly looks the same as all the other hallways so far, ",
				"but your trained eye can still detect subtle indications of slight damage ",
				"from when a floor scrubber went out of control, ",
				"collided with the wall, and rubbed against for several meters ",
				"before getting back on track.  That very nearly cost it the race, ",
				"but luckily the other scrubber was disqualified for unsportspersonlike conduct.",
				"\n\n",
				"The hall continues to forward and to aft.  ",
				"There is a door labelled 'Library' that leads who knows where."
			].join(""),

			[
				this.portal( [ "forward" ], Places.friendlyShipLowerDeckHallForward_Name() ),
				this.portal( [ "aft" ] , Places.friendlyShipLowerDeckHallAft_Name() ),
				this.portal( [ "library" ], Places.friendlyShipLibrary_Name() ),

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

			[
				"This is a hallway on the lower deck of the starship Pax Aeterna.  ",
				"The hall continues to aft, and ends in a bulkhead to forward.  ",
				"(Sometimes you can't help but think that ",
				"this ship's architect went a little heavy on the hallways.)",
				"\n\n",
				"A door labelled 'Mess Hall' leads to, you guessed it, the mess hall.",
				"\n\n",
				"Another door opens onto an elevator.  ",
				"\n\n",
				"Another body of one of your crewmates lies here.  ",
				"You start to feel sorry for whoever has to clean all this up."
			].join(""),

			[
				this.portal( [ "aft" ], Places.friendlyShipLowerDeckHallAmidships_Name() ),

				this.portal( [ "mess hall" ], Places.friendlyShipMessHall_Name() ),

				this.portal( [ "elevator" ], Places.friendlyShipEngineeringDeckForward_Name() ),

				this.emplacement( [ "body" ] ).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
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

	friendlyShipMessHall(): Place
	{
		return this.place3
		(
			Places.friendlyShipMessHall_Name(),

			[
				"This is the mess hall of the Pax Aeterna.  ",
				"You've eaten many a solitary meal here.  ",
				"If you never see another bowl of gartan root stew, ",
				"it'll be too soon."
			].join(""),

			[
				this.portal
				(
					[ "corridor", "door", "hall", "out", "outside" ],
					Places.friendlyShipLowerDeckHallForward_Name()
				),

				this.emplacement
				(
					[ "counter" ]
				).descriptionAsPartOfPlaceSet
				(
					[
						"A few feet from the wall opposite the door is a long counter, ",
						"behind which the ship's cook (who always insisted he was the ship's 'chef') ",
						"would prepare technically nourishing meals for the crew."
					].join("")
				)
			]
		);
	}

	static friendlyShipMessHall_Name(): string
	{
		return "Pax Aeterna - Mess Hall";
	}

	friendlyShipOfficersQuartersAntechamber(): Place
	{
		return this.place3
		(
			Places.friendlyShipOfficersQuartersAntechamber_Name(),

			[
				"This is a small antechamber for a suite of rooms ",
				"serving as the personal quarters of of the Pax Aeterna's bridge crew.  ",
				"Several doors lead from this antechamber to each officer's individual quarters.  ",
				"A large, bushy, artificial plant occupies a planter in the back of the antechamber."
			].join(""),

			[
				this.portal
				(
					[ "corridor", "hall", "out", "outside" ],
					Places.friendlyShipUpperDeckHallAmidships_Name()
				),

				this.portal
				(
					[ "counselor's quarters" ],
					null
				).lock(),

				this.portal
				(
					[ "first officer's quarters" ],
					null
				).lock(),

				this.portal
				(
					[ "helmsman's quarters" ],
					null
				).lock(),

				this.portal
				(
					[ "navigator's quarters" ],
					null
				).lock(),

				this.portal
				(
					[ "science officer's quarters" ],
					null
				).lock(),

				this.portal
				(
					[ "tactical officer's quarters" ],
					null
				).lock(),

				this.emplacement
				(
					[ "plant", "artificial plant", "bush", "planter" ]
				).descriptionAsPartOfPlaceSet
				(
					"This artificial plant is quite bushy."
				).commandAdd
				(
					Command.fromTextsAndScriptExecute
					(
						[ "hide behind plant" ],
						Script.fromNameAndRun
						(
							"HideBehindPlant",
							(u, w, p, x, y) =>
							{
								u.messageEnqueue("You hide behind the plant.");
							}
						)
					)
				)
			]
		);
	}

	static friendlyShipOfficersQuartersAntechamber_Name(): string
	{
		return "Pax Aeterna - Officer's Quarters Antechamber";
	}

	friendlyShipUpperDeckHallAft(): Place
	{
		return this.place3
		(
			Places.friendlyShipUpperDeckHallAft_Name(),

			[
				"This is a hallway on the upper deck of the starship Pax Aeterna.  ",
				"\n\n",
				"The upper deck looks almost exactly like the lower deck. ",
				"Honestly, there'd be no way to tell them apart, ",
				"if the buttons in the elevator weren't labelled.",
				"\n\n",
				"Well, to be fair, the scattered corpses are slighly more prestigious on this deck.  ",
				"The body of your supervisor lies supine in this corridor, ",
				"brows furrowed in a disapproving expression even in death.  ",
				"A hard trick to pull off, but then again, he put in lots of practice ",
				"when he was alive.  Every time he talked to you, at a minimum.",
				"\n\n",
				"The hall continues to forward, and ends in a bulkhead to aft, ",
				"where a door opens on to an elevator."
			].join(""),

			[
				this.portal( [ "forward" ], Places.friendlyShipUpperDeckHallAmidships_Name() ),

				this.portal( [ "elevator", "aft", "door" ], Places.friendlyShipLowerDeckHallAft_Name() ),

				this.emplacement( [ "body" ] ).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
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
		return this.place3
		(
			Places.friendlyShipUpperDeckHallAmidships_Name(),

			[
				"This is a hallway on the upper deck of the starship Pax Aeterna.  ",
				"The hall continues forward and to aft.  ",
				"\n\n",
				"The body of one of your fellow crew members lies prone ",
				"against the port wall, the neck bent sharply upwards ",
				"and the chin propped against the bulkhead itself.  ",
				"This is the most awkward death pose yet.",
				"\n\n",
				"A door leads to a suite of officers' quarters."
			].join(""),

			[
				this.portal
				(
					[ "forward" ],
					Places.friendlyShipUpperDeckHallForward_Name()
				),

				this.portal
				(
					[ "aft" ], Places.friendlyShipUpperDeckHallAft_Name()
				),

				this.portal
				(
					[ "officers' quarters", "quarters", "suite" ],
					Places.friendlyShipOfficersQuartersAntechamber_Name()
				),

				this.emplacement( [ "body" ] ).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "search body" ],
						this.scripts.emplacementBodyEmptySearch.name
					)
				)
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

			[
				"This is a hallway on the upper deck of the starship Pax Aeterna.",
				"\n\n",
				"The hall continues to aft.  To forward, it ends in a door labeled 'Bridge', ",
				"near which the body of a dead crewperson lies crumpled.  ",
				"\n\n",
				"A door here leads to the captain's personal quarters."
			].join(""),

			[
				this.portal
				(
					[ "aft" ],
					Places.friendlyShipUpperDeckHallAmidships_Name()
				),

				this.portal
				(
					[ "bridge", "bridge door", "forward" ],
					Places.friendlyShipBridge_Name()
				),

				this.portal
				(
					[ "captain's quarters", "quarters" ],
					Places.friendlyShipCaptainsQuarters_Name()
				),

				this.emplacement( [ "body" ] ).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						["search body"],
						this.scripts.emplacementBodyEmptySearch.name
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

			[
				"Your escape pod has crashed in the middle of the desert ",
				"of the planet Ekkis II.  ",
				"(What a stupid place to crash, you dumb idiot pod!)",
				"The crash has rendered the pod completely inoperable.  ",
				"Its structural frame is severely bent, its door is unclosable, ",
				"and its forward window has shattered, ",
				"scattering shards of highly reflective glass ",
				"(it looks like glass, anyway) ",
				"over the sand in front of the pod.",
				"\n\n",
				"Wait, shards?  How did that get past safety inspection?",
				"\n\n",
				"The sun is blazing.  Or they are.  There may be more than one;",
				"it is, or they are, too hard to look at to tell.  ",
				"It's so hot and dry that your sweat is evaporating ",
				"almost as fast as it seeps out of your pores." ,
				"\n\n",
				"The desert stretches away as far as the eye can see to the ",
				"north, west, and south.  It's majestically depressing.",
				"\n\n",
				"A maze of rocky cliffs rises to the east.  ",
				"At least, with your luck, you assume it must be mazelike."
			].join(""),

			[
				this.portal( [ "pod", "escape pod" ], Places.friendlyShipEscapePod_Name() ),
				this.portal( [ "east" ], Places.planetCliffsBottomNorthwestWestSide_Name() ),
				this.portal( [ "north" ], Places.planetDesertNorth_Name() ),
				this.portal( [ "south" ], Places.planetDesertSouth_Name() ),
				this.portal( [ "south" ], Places.planetDesertWest_Name() ),
				Items.Instance().ReflectiveGlass
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

			[
				"You stand in the trackless desert of the planet Ekkis II.  ",
				"\n\n",
				"The featureless sand stretches away in all directions.  ",
				"It's not encouraging, frankly."
			].join(""),

			Script.fromName(this.scripts.placePlanetDesertDeep_Update.name),

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

			[
				"You stand in the trackless desert of the planet Ekkis II, ",
				"just north of the wreck of your crashed escape pod.  ",
				"Some cliffs rise to the southeast. ",
				"The featureless sand stretches away in every other direction.  ",
				"If you were a poet, you'd probably be moved ",
				"to write a poem about loneliness. ",
				"But you're not, so instead you just sweat and wish for a lemonade."
			].join(""),

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

			[
				"You stand in the trackless desert of the planet Ekkis II, ",
				"just south of the wreck of your crashed escape pod.  ",
				"Some cliffs rise to the northeast.  ",
				"A sea of dunes stretches away in every other direction.  ",
				"Except... there!  In the distance!  You see... ",
				"No, on second thought, that's just an eyeball floater.  ",
				"It was a pretty rough crash.  You should get checked out ",
				"whenever you next find a doctor. "
			].join(""),

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

			[
				"You stand in the trackless desert of the planet Ekkis II, ",
				"just west of the wreck of your crashed escape pod.  ",
				"Beyond the pod, some cliffs rise from the sand. ",
				"A sea of dunes stretch away in every other direction.",
				"\n\n",
				"What does 'trackless' mean, anyway?  ",
				"It's not like most places are just brimming over with tracks.  ",
				"Maybe a train switchyard, you guess.  ",
				"But those are increasingly rare."
			].join(""),

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

			[
				"You stand on the sand of the Ekkis II desert, just to the south  ",
				"of a steep stone cliff running from west to east.  ",
				"Other cliffs can be seen to the west, east, and south.  ",
				"\n\n",
				"This cliff seems especially cliffy indeed, ",
				"but you're reserving judgement ",
				"until you've seen all the entrants.  It's only fair."
			].join(""),

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

			[
				"You stand on the sand of the Ekkis II desert, just to the south  ",
				"of a steep stone cliff running from the west ",
				"and ending just to the east.  ",
				"\n\n",
				"Above, on the clifftop, two large stone pillars ",
				"stand about four meters apart from each other.  ",
				"As they rise, they bend toward each other like horns, ",
				"with jagged, broken tops.  Maybe it's the dehydration, ",
				"but you feel like these are some pretty cool, top-ten stone horns.",
				"\n\n",
				"To the east, the sand stretches away from the foot of the cliff, ",
				"as far as the eye can see.  Well, your eyes, at least."
			].join(""),

			[
				this.portal( [ "south" ], Places.planetCliffsBottomSoutheast_Name()),
				this.portal( [ "west" ], Places.planetCliffsBottomNorth_Name()),
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

			[
				"You stand on the sand of the Ekkis II desert, at the base  ",
				"of a sheer stone cliff.  ",
				"\n\n",
				"The cliff, to an unarguable degree, ",
				"blocks progress to the north, south, and west, ",
				"so don't you even try it."
			].join(""),

			[
				this.portal( [ "east" ], Places.planetCliffsBottomNorth_Name()),
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
		[
			"You stand on the sand of the Ekkis II desert, at the base  ",
			"of a sheer stone cliff that curves away to the south and east,  ",
			"and which blocks passage to the east.  ",
			"\n\n",
			"The site where your escape pod crashed is to the west.",
			"\n\n",
			"To the south, more cliffs are visible. ",
			"\n\n",
			"The desert stretches away to the north and west.",
			"\n\n",
			"The cliff face has a nearly circular hole in it, ",
			"a little less than two meters off the ground.  ",
			"Nice: you like a cliff face with a little somethin' goin' on."
		].join("");

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

					[
						"This is a hole in the side of the cliff face, ",
						"about 40 centimeters in diameter.  Its interior is ",
						"deeply shadowed, making it impossible to see what, ",
						"if anything, might be inside it."
					].join("")
					
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
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

			[
				"You stand on the desert of Ekkis II, ",
				"in a area surrounded by a system of cliffs.  ",
				"In the shelter afforded by the cliffs, ",
				"some stunted greenery actually manages to cling to life.  ",
				"\n\n",
				"Overhead, a weathered stone arch bridges the tops of the cliffs ",
				"to the east with those to the west.  ",
				"It's very picturesque, and you without a camera.",
				"\n\n",
				"Surface paths between cliff bases run to the west, north, and east."
			].join(""),

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

			[
				"You stand on a clear stretch of sand amid a formation of stone cliffs.  ",
				"The sandy surface of the desert runs to the north and to the west. ",
				"\n\n",
				"To the east is a tall, confused jumble of rocks, ",
				" in which a large, shadowy cave mouth opens.  ",
				"What with the sun(s) and all, ",
				"you feel you could really go for some shadows about now, ",
				"even though you normally sleep with a night-light.",
				"\n\n",
				"On the west side of the clearing, a stone slope rises jaggedly ",
				"upward between jutting upright stones, forming a natural stone ramp ",
				"that climbs as it runs northward and then turns west toward the top."
			].join(""),

			[
				this.portal( [ "north" ], Places.planetCliffsBottomNortheast_Name() ),
				this.portal( [ "west" ], Places.planetCliffsBottomSouth_Name() ),
				this.portal( [ "east", "cave" ], Places.planetCliffsCaveInterior_Name() ),
				this.portal( [ "up", "slope", "ramp" ], Places.planetCliffsTopSouthEastSide_Name() )
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

			[
				"More cliffs here, and sand.  ",
				"This planet only has a couple of things going on, ",
				"but danged if it disappoints on the cliff and sand front.",
				"\n\n",
				"Specifically, cliffs rise to the north and east, ",
				"while to the south and west lies sand.  ",
				"It's balanced.  Kind of a yin-yang thing.  ",
				"Though you're not sure which is which.  ",
				"Or maybe they doubled up on yang."
			].join(""),

			[
				this.portal( [ "east" ], Places.planetCliffsBottomSouth_Name() ),
				this.portal( [ "north" ], Places.planetCliffsBottomNorthwestWestSide_Name() )
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

			[
				"You stand in the mouth of a cave.  ",
				"The intense light of the outside desert ",
				"reaches only a short way into the darkness.  ",
				"Some mossy vegetation clings to the rock near the entrance.  ",
				"To the west the cave opens back out to ",
				"the Ekkis II desert.  ",
				"\n\n",
				"There's... well, to be frank, there's a smell."
			].join(""),

			Script.fromName(this.scripts.placePlanetCliffsCaveInterior_Update.name),

			[
				this.portal3
				(
					[ "west", "out", "outside" ],
					Places.planetCliffsBottomSoutheast_Name(),
					this.scripts.placePlanetCliffsCaveInterior_GoWest.name
				),

				this.portal3
				(
					[ "east" ],
					Places.planetCliffsBottomSoutheast_Name(),
					this.scripts.placePlanetCliffsCaveInterior_GoEast.name
				),

				Agent.fromNamesAndDescription
				(
					[ "cave beast", "beast", "monster", "creature" ],

					[
						"It's dark in here, but as near as you can make out, ",
						"you think this might be a monster charging toward you, ",
						"presumably to kill you."
					].join("")

				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						MessageHelper.combinePhraseArrays
						([
							[ "throw" ],
							[ "canteen", "bottle", "dehydrated water" ],
							[ null, "at" ],
							[ "cave beast", "beast", "monster", "creature" ]
						]),

						this.scripts.placePlanetCliffsCaveInterior_ThrowCanteenAtBeast.name
					)
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

			[
				"You stand atop a rocky cliff rising from the desert ",
				"of the planet Ekkis II.  ",
				"The top of the cliff continues to the west and east.  ",
				"The path is especially narrow and precarious here.  ",
				"You're glad you can just type 'go east' or whatever ",
				"rather than turning the game speed way down ",
				"and picking your way along one step at a time."
			].join(""),

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

			[
				"You stand on the end of a clifftop ",
				"above the desert of the planet Ekkis II.  ",
				"A pair of leaning stone columns rises from the clifftop here, ",
				"bending toward each other like horns.  ",
				"\n\n",
				"(Are they columns if they're not completely vertical, though?",
				"Hmm, maybe they're slashes.  ",
				"Or, one is a slash, and the other a backslash.  ",
				"Anyway, they're definitely not rows.)",
				"\n\n",
				"The stone horns look especially cool up close.  ",
				"You woozily compose an album cover in your head, ",
				"with the stone horns pictured in the background ",
				"and with you looking bored and fully hydrated in the foreground.  ",
				"You further fantasize about your imaginary band's groupies, ",
				"each of which is offering you a cool fruity drink.",
				"\n\n",
				"Back in the real world, the top of the cliff ",
				"runs back toward the west, where there is also no water."
			].join(""),

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

			[
				"You stand atop a cliff rising from the desert of the planet Ekkis II.  ",
				"The path along the clifftop curves from the south to the east.  ",
				"\n\n",
				"Some jagged peaks jut upward along the northern edge of the cliff.  ",
				"Hey, at least these cliffs are trying something new."
			].join(""),

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

			[
				"You stand atop a cliff rising from the desert of the planet Ekkis II.",
				"\n\n",
				"To the east, a downward slope curves southward ",
				"back to the desert surface. ",
				"\n\n",
				"To the west, the cliff top rises and then falls ",
				"in an weathered stone arch, ",
				"which serves as a natural bridge to the clifftop on the other side." ,
				"\n\n",
				"Below the arch is a slightly greener patch of desert ",
				"sheltered by the surrounding cliffs.  ",
				"From here, it almost looks idyllic.  ",
				"But no, you just came from there, and it's all dyllic enough."
			].join(""),

			[
				this.portal( [ "east" ], Places.planetCliffsBottomSoutheast_Name() ),
				this.portal
				(
					[ "west", "arch", "bridge" ],
					Places.planetCliffsTopSouthWestSide_Name()
				).scriptUseSet
				(
					Script.fromName(this.scripts.placePlanetCliffsTopSouth_CrossBridge.name)
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

			[
				"You stand atop a cliff rising from the desert of the planet Ekkis II.",
				"\n\n",
				"To the west, the clifftop path continues, ",
				"curving around to the north.  ",
				"To the east, the cliff top rises and then falls ",
				"in an weathered stone arch, ",
				"which serves as a natural bridge to the clifftop on the other side, ",
				"and from there down a slope to the desert surface.",
				"\n\n",
				"Below the arch is a slightly greener patch of desert ",
				"sheltered by the surrounding cliffs.  ",
				"Despite the greenery, there's not enough water to drink down there, ",
				"even if you were willing to bite a cactus, ",
				"which past experience tells you you should never do again.  "
			].join(""),

			[
				this.portal
				(
					[ "east", "arch", "bridge" ],
					Places.planetCliffsTopSouthEastSide_Name()
				).scriptUseSet
				(
					Script.fromName(this.scripts.placePlanetCliffsTopSouth_CrossBridge.name)
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

			[
				"You stand atop a cliff rising from the desert of the planet Ekkis II.  ",
				"The path along the clifftop curves ",
				"from the east, where a natural stone bridge ",
				"arches over the desert surface, ",
				"and continues to the north.",
				"\n\n",
				"The word 'arroyo' crosses your mind.  ",
				"You're not exactly sure what an arroyo is, ",
				"and you're reasonably sure this isn't one, ",
				"but this whole place feels pretty arroyoey."
			].join(""), 

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

			[
				"You are in a cavern deep beneath the desert of the planet Ekkis II.  ",
				"\n\n",
				"The path to the west is blocked by several closely spaced ",
				"and intensely bright beams of light, ",
				"which are emitted from small round ports the rock walls, ",
				"and which pass into similar ports on the other side.  ",
				"\n\n",
				"Okay, this is actually good news, though, right?  ",
				"There must be something good past that barrier, ",
				"or else why the barrier?  ",
				"I mean, unless it's, like, an art installation or something.  ",
				"Those always just make you feel stupid.",
				"\n\n",
				"Beyond this barrier, the path rises up and curves to the right ",
				"in a rough semicircle, leading along a higher path back to the east.",
				"\n\n",
				"Back on this side of the barrier, a lower path leads back to the east."
			].join(""),

			[
				this.portal( [ "east" ], Places.planetCavernsPool_Name() ),
				this.portal3
				(
					[ "west", "barrier", "laser barrier" ],
					Places.planetCavernsDripsBefore_Name(),
					this.scripts.placePlanetCavernsBarrier_GoBarrier.name
				),

				this.emplacement
				(
					[
						"laser barrier",
						"barrier",
						"lasers",
						"beams",
						"beams of light",
						"light"
					]
				).activate().commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						MessageHelper.combinePhraseArrays
						([
							[ "put", "place", "hold", "use" ],
							[
								"reflective glass",
								"glass",
								"shards",
								"shards of glass"
							],
							[ null, "in", "on" ],
							[
								"laser barrier",
								"barrier",
								"lasers",
								"beams",
								"beams of light",
								"light"
							]
						]),

						this.scripts.placePlanetCavernsBarrier_PutGlassInBarrier.name
					)
				)
			]
		);
	}

	static planetCavernsBarrier_Name(): string
	{
		return "Ekkis II - Caverns - Barrier";
	}

	planetCavernsDrips1(): Place
	{
		return this.place4
		(
			Places.planetCavernsDrips1_Name(),

			[
				"You are in a cavern deep beneath the desert of the planet Ekkis II, ",
				"in a passage where drips of clear liquid fall intermittently ",
				"from the ceiling and through small, precise holes in the floor ",
				"that appear as if they were made to fit them.",
				"\n\n",
				"The passage continues to the east, under two more sets of drips, ",
				"each set dripping in its own distinct rhythm.",
				"\n\n",
				"To the west, the passage leads back ",
				"toward the entrance to the caverns."
			].join(""),

			Script.fromName(this.scripts.placePlanetCavernsDrips_Update.name),

			[
				this.portal( [ "west" ], Places.planetCavernsDripsBefore_Name() ),
				this.portal( [ "east" ], Places.planetCavernsDrips2_Name() )
			]
		);
	}

	static planetCavernsDrips1_Name(): string
	{
		return "Ekkis II - Caverns - Drips - West";
	}

	planetCavernsDrips2(): Place
	{
		return this.place4
		(
			Places.planetCavernsDrips2_Name(),

			[
				"You are in a cavern deep beneath the desert of the planet Ekkis II, ",
				"in a passage where drips of clear liquid fall intermittently ",
				"from the ceiling and through small, precise holes in the floor ",
				"that appear as if they were made to fit them.",
				"\n\n",
				"To the west and to the east, the passage continues under more, ",
				"similar drips, each set of drips dripping in its own distinct rhythm."
			].join(""),

			Script.fromName(this.scripts.placePlanetCavernsDrips_Update.name),

			[
				this.portal( [ "west" ], Places.planetCavernsDrips1_Name() ),
				this.portal( [ "east" ], Places.planetCavernsDrips3_Name() )
			]
		);
	}

	static planetCavernsDrips2_Name(): string
	{
		return "Ekkis II - Caverns - Drips - Middle";
	}

	planetCavernsDrips3(): Place
	{
		return this.place3
		(
			Places.planetCavernsDrips3_Name(),

			[
				"You are in a cavern deep beneath the desert of the planet Ekkis II, ",
				"in a passage where drips of clear liquid fall intermittently ",
				"from the ceiling and through small, precise holes in the floor ",
				"that appear as if they were made to fit them.",
				"\n\n",
				"The passage continues, thankfully drier, to the east.",
				"\n\n",
				"To the west, the passage leads back toward the entrance to the caverns, ",
				"passing under another two sets of drips, ",
				"each dripping in its own distinct rhythm."
			].join(""),

			[
				this.portal( [ "west" ], Places.planetCavernsDrips2_Name() ),
				this.portal( [ "east" ], Places.planetCavernsDripsAfter_Name() )
			]
		);
	}

	static planetCavernsDrips3_Name(): string
	{
		return "Ekkis II - Caverns - Drips - East";
	}

	planetCavernsDripsBefore(): Place
	{
		return this.place4
		(
			Places.planetCavernsDripsBefore_Name(),

			[
				"You are in a cavern deep beneath the desert of the planet Ekkis II.  ",
				"\n\n",
				"A passage runs to the east, under drips of a clear liquid ",
				"fall intermittently from the ceiling.  ",
				"Each drip passes into a small, precise hole in the floor ",
				"that appears as if it were made to fit it.",
				"\n\n",
				"If this is supposed to be a water feature, ",
				"it's got nothing on your grandparents' ",
				"topless bronze torso model pouring a bottomless jar into a pool.  ",
				"They just don't make water features ",
				"sexy like they used to.",
				"\n\n",
				"To the west, another passage leads back ",
				"toward the entrance to the caverns, ",
				"curving left in a rough semicircle back down to the level below."
			].join(""),

			Script.fromName(this.scripts.placePlanetCavernsDrips_Update.name),

			[
				this.portal( [ "west" ], Places.planetCavernsBarrier_Name() ),
				this.portal( [ "east" ], Places.planetCavernsDrips1_Name() )
			]
		);
	}

	static planetCavernsDripsBefore_Name(): string
	{
		return "Ekkis II - Caverns - West of Drips";
	}

	planetCavernsDripsAfter(): Place
	{
		return this.place4
		(
			Places.planetCavernsDripsAfter_Name(),

			[
				"You are in a cavern deep beneath the desert of the planet Ekkis II.  ",
				"\n\n",
				"A passage runs to the west, under drips of a clear liquid ",
				"that fall intermittently from the ceiling.  ",
				"Each drip passes into a small, precise hole in the floor ",
				"that appears as if it were made to fit it.",
				"\n\n",
				"You're amazed that you managed to get on this side of the drips ",
				"without getting dripped on even once. ",
				"You must have a great sense of timing.  ",
				"Though, if your timing is so great, how is it possible ",
				"that you keep bombing so hard at open-mic stand-up comedy night?",
				"\n\n",
				"To the west, another passage leads back ",
				"toward the entrance to the caverns, ",
				"curving left in a rough semicircle back down to the level below."
			].join(""),

			Script.fromName(this.scripts.placePlanetCavernsDrips_Update.name),

			[
				this.portal( [ "west" ], Places.planetCavernsDrips3_Name() ),
				this.portal( [ "east" ], Places.planetCavernsProjectionRoom_Name() )
			]
		);
	}

	static planetCavernsDripsAfter_Name(): string
	{
		return "Ekkis II - Caverns - East of Drips";
	}

	planetCavernsElevator(): Place
	{
		return this.place3
		(
			Places.planetCavernsElevator_Name(),

			[
				"You stand at the bottom of the elevator that brought you down ",
				"what seemes like hundreds of meters ",
				"from the edge of a remote clifftop on the surface of a desert planet ",
				"to a cool, dark, rocky cavern.  ",
				"This setup all seems very inconvenient to you, ",
				"but hey, at least it wasn't stairs.",
				"\n\n",
				"The elevator door lies at the east side of the passage.",
				"\n\n",
				"From there, the passage runs to the west, deeper into the cavern."
			].join(""),

			[
				this.portal
				(
					[ "elevator", "door", "up", "east" ],
					Places.planetCliffsTopNortheast_Name()
				),
				this.portal( [ "west" ], Places.planetCavernsGratingEastSide_Name() ),

				Items.Instance().Rock,
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

			[
				"You are in a cavern deep beneath the desert of the planet Ekkis II.",
				"\n\n",
				"The passage to the west ends abruptly in a solid rock wall.  ",
				"Nearby, a small geyser shoots out of a hole ",
				"in the top of a stalagmite, wetly and steamily, ",
				"but not in, like, a gross way.  ",
				"Though, again, and I know I'm throwing this phrase around a lot recently, ",
				"but, again, undeniably, there does happen to be a smell.",
				"\n\n",
				"Another passage leads back east, toward the cavern entrance."
			].join(""),

			[
				this.portal( [ "west", "door" ], Places.planetCavernsPool_Name() ).block().hide(),
				this.portal( [ "east" ], Places.planetCavernsGratingWestSide_Name() ),

				this.emplacement2
				(
					[ "wall" ],

					[
						"Examining the wall closely, ",
						"you see a faint rectangular outline of hairline cracks in the rock. ",
						"It happens to a lot of us as we get older.  ",
						"Geological age ain't nothin' but a number.  ",
						"Well, usually a number and a unit.  Like 'megayear'."
					].join("")
				),

				this.emplacement2
				(
					[ "geyser" ],

					[
						"You examine the geyser.  ",
						"Aw, what a bubbly, happy little guy. ",
						"It's a good thing the sun isn't blazing so hot inside this cavern, ",
						"Or you'd be tempted to take a drink of the steaming hot liquid.  ",
						"And that, even assuming it's just water, would melt your esophagus."
					].join("")
				).commandAddFromTextsAndScriptName
				(
					MessageHelper.combinePhraseArrays
					([
						[ "put", "insert", "place", "shove", "jam" ],
						[ "rock", "stone" ],
						[ null, "in", "into", "on" ],
						[ "geyser", "hole", "stalagmite" ]
					]),
					this.scripts.placePlanetCavernsGeyser_PutRockInGeyser.name
				)
			]
		);
	}

	static planetCavernsGeyser_Name(): string
	{
		return "Ekkis II - Caverns - Geyser";
	}

	planetCavernsGratingEastSide(): Place
	{
		return this.place3
		(
			Places.planetCavernsGratingEastSide_Name(),

			[
				"You are in a cavern deep beneath the desert of the planet Ekkis II, ",
				"in a passage running from east to west.",
				"\n\n",
				"In the floor leading to the west, a thick metal grating ",
				"perforated with holes about 10 centimeters wide ",
				"stretches from wall to wall across the entire passage. "
			].join(""),

			[
				this.emplacement2
				(
					[ "grate", "grating", "grille" ],

					[
						"You bend over and look closely at the grating.  ",
						"You think you see something moving down there.  ",
						"And maybe you hear some sloshing.  ",
						"And, yeah, there's a smell.  ",
						"For a metal grate in a cave, ",
						"it's kind of a sensory smorgasbord."
					].join("")
				).commandAddFromTextsAndScriptName
				(
					MessageHelper.combinePhraseArrays
					([
						[ "put", "drop", "set", "throw" ],
						[ "can", "sham", "can of sham" ],
						[ null, "on", "at" ],
						[ "grating", "grate", "grille" ]
					]),
					this.scripts.placePlanetCavernsGrating_PutCanOfShamOnGrating.name
				),

				this.portal3
				(
					[ "west", "grating", "grate", "grille" ],
					Places.planetCavernsGratingWestSide_Name(),
					this.scripts.placePlanetCavernsGrating_CrossGrating.name
				),

				this.portal( [ "east" ], Places.planetCavernsElevator_Name() )
			]
		);
	}

	static planetCavernsGratingEastSide_Name(): string
	{
		return "Ekkis II - Caverns - Grating - East Side";
	}

	planetCavernsGratingWestSide(): Place
	{
		return this.place3
		(
			Places.planetCavernsGratingWestSide_Name(),

			[
				"You are in a cavern deep beneath the desert of the planet Ekkis II, ",
				"in a passage running from east to west.",
				"\n\n",
				"In the floor leading back to the east, a thick metal grating ",
				"perforated with holes about 10 centimeters wide ",
				"stretches from wall to wall across the entire passage.  ",
				"\n\n",
				"Now that you're on this side of it, ",
				"it seems only fair to remind you, in case you've forgotten, ",
				"that there's a monster down there able to, and willing to, ",
				"eat an unopened can of Sham (tm) in a matter of seconds."
			].join(""),

			[
				this.emplacement3
				(
					[ "grate", "grating", "grille" ],

					this.scripts.placePlanetCavernsGrating_CrossGrating.name,

					[
						"You bend over and look closely at the grating.  ",
						"You can see some slight movement, ",
						"hear some bathtub noises,  ",
						"and there is, as there frequently is in your life lately, a smell.  ",
						"\n\n",
						"Whatever's down there is likely still down there, ",
						"unless this is its coworker and they're taking it in shifts."
					].join("")
				).commandAddFromTextsAndScriptName
				(
					[ "put can of sham on grating" ],
					this.scripts.placePlanetCavernsGrating_PutCanOfShamOnGrating.name
				),

				this.portal( [ "west" ], Places.planetCavernsGeyser_Name() ),
				this.portal
				(
					[ "east", "grating", "grate", "grille" ],
					Places.planetCavernsGratingEastSide_Name()
				)
			]
		);
	}

	static planetCavernsGratingWestSide_Name(): string
	{
		return "Ekkis II - Caverns - Grating - West Side";
	}

	planetCavernsPool(): Place
	{
		return this.place3
		(
			Places.planetCavernsPool_Name(),

			[
				"You are in a cavern deep beneath the desert of the planet Ekkis II. ",
				"You stand on a wide ledge that runs south, back through a hidden doorway, ",
				"where a plugged geyser steams fitfully.  To the west, the ledge runs ",
				"through dark natural stone columns and on into the darkness.  ",
				"Far below the ledge is a pool of clear liquid, ",
				"with drips falling from holes in the ceiling to fill it.  ",
				"A passage leads back to the east."
			].join(""),

			[
				this.portal( [ "west" ], Places.planetCavernsBarrier_Name() ),
				this.portal( [ "east" ], Places.planetCavernsGeyser_Name() ),

				this.emplacement2
				(
					[ "pool", "pool of water" ],

					[
						"This is a transparent pool in a basin of gleaming crystal, ",
						"fed from above by drops that rain from the ceiling, ",
						"making concentric circles on the otherwise still surface.  ",
						"\n\n",
						"It's so Zen that it gets you excited.  ",
						"Which makes it not Zen.  ",
						"Which, in turn, makes it even more Zen.  ",
						"Zen is tricky like that."
					].join("")

				).commandAddFromTextsAndScriptName
				(
					MessageHelper.combinePhraseArrays
					([
						[ "drink" ],
						[ null, "from" ],
						[ "pool", "water", "liquid" ]
					]),
					this.scripts.placePlanetCavernsPool_DrinkFromPool.name
				)
			]
		);
	}

	static planetCavernsPool_Name(): string
	{
		return "Ekkis II - Caverns - Pool";
	}

	planetCavernsProjectionRoom(): Place
	{
		return this.place4
		(
			Places.planetCavernsProjectionRoom_Name(),

			[
				"You are in a cavern deep beneath the desert of the planet Ekkis II. ",
				"\n\n",
				"This space is completely dark at the moment.  ",
				"Earlier, it was lit only ",
				"by a holographic projection of a triangular-headed alien.  ",
				"In retrospect, that giant alien head really livened up the decor.  ",
				"A passage leads back to the east."
			].join(""),

			Script.fromName(this.scripts.placePlanetCavernsProjectionRoom_Update.name),

			[
				this.portal( [ "west" ], Places.planetCavernsDripsAfter_Name() ),
				this.portal
				(
					[ "north" ],
					Places.planetCavernsSteamworks_Name()
				).block().hide()
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

			[
				"You are in a cavern deep beneath the desert of the planet Ekkis II. ",
				"\n\n",
				"Arrays of giant metal pistons pump noisily away, ",
				"leaking wisps of steam.  Too bad your awkward cousin isn't here, ",
				"he'd be way into this.",
				"\n\n",
				"A computer console with a monitor and standard data cartridge slot ",
				"stands against the north wall.  Above it is a catwalk where members ",
				"of a gray-skinned, large-eyed, triangular-headed alien species ",
				"busily operate various inscrutable control systems.",
				"\n\n",
				"To the west is a small, garage-like space, with a door at the end ",
				"that appears to open onto a large elevator platform."
			].join(""),

			[
				this.portal( [ "south" ], Places.planetCavernsProjectionRoom_Name() ),

				this.emplacement2
				(
					[ "cartridge reader", "reader" ],

					[
						"A computer console with a monitor and standard data cartridge slot ",
						"stands against the north wall.  Here, in the ancient steamworks of ",
						"a lost civilization under the surface of a barely inhabited planet.  ",
						"You knew the cartridge technology wasn't exactly state-of-the-art, ",
						"but this is ridiculous."
					].join("")
				),

				this.emplacement
				(
					[ "alien" ]
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
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
		return this.place4
		(
			Places.planetSettlementBarFront_Name(),

			[
				"You stand in the tiny settlement named, ",
				" as near as you can make out from the signs in Universal Phonospeak, ",
				"[Farting Noise].  ",
				"In the natives' defense, maybe their farts ",
				"sound completely different from yours.",
				"\n\n",
				"To the east stands a pourstone igloo with an arched entrance, ",
				"above which is a lighted sign that reads ",
				"'Poot-Poot-P-Phttt' in Universal Phonospeak, ",
				"followed by 'BAR' in ",
				"several of the more common, less aspirated, languages ",
				"of this sector of space.",
				"\n\n",
				"Several spaceships, presumably belonging to the bar's patrons, ",
				"stand nearby.",
				"\n\n",
				"To the west, you can see another, cubical building, with a few more ",
				"run-down looking spaceships in front of it, and decorated with ",
				"strings of cheap but festive plastic pennants. ",
				"A large sign reads 'Non-Gelatinous George's Used Ships' in friendly, ",
				"or at least extroverted, letters.",
				"\n\n",
				"Away to the north is the edge of another domelike building, ",
				"possibly a store of some sort.",
				"\n\n",
				"To the south, a faint shimmer in the air betrays the force field ",
				"that protects this settlement from the native predatory sand-swimmers.  ",
				"You look nervously at the field generator unit, ",
				"which looks dusty, battered, and none too new.  ",
				"But you're standing here, instead of in a sand-swimmer's belly, ",
				"so you guess it must work."
			].join(""),

			Script.fromName(this.scripts.placePlanetSettlementBarFront_Update.name),

			[
				this.portal( [ "north" ], Places.planetSettlementRobotShopWest_Name() ),
				this.portal( [ "west" ], Places.planetSettlementUsedShipLot_Name() ),
				this.portal( [ "east" ], Places.planetSettlementBarRear_Name() ),
				this.portal( [ "south" ], Places.planetDesertDeep_Name() ),
				this.portal( [ "bar", "in", "inside" ], Places.planetSettlementBarInterior_Name() ),

				this.emplacement2
				(
					[ "seedy-looking being", "skimmer enthusiast", "person", "being", "buyer" ],

					[
						"This being is hanging around outside a bar ",
						"in the middle of the day.  He must be so rich."
					].join("")

				).descriptionAsPartOfPlaceSet
				(
					[
						"A seedy-looking being loitering near the entrance to the bar ",
						"eyes your skimmer appreciatively.  You think those are eyes, ",
						"anyway."
					].join("")
				).commandAddFromTextsAndScriptName
				(
					MessageHelper.combinePhraseArrays
					([
						[ "talk" ],
						[ null, "to" ],
						[ "skimmer enthusiast", "person", "being", "buyer" ]
					]),
					this.scripts.placePlanetSettlementBarFront_TalkToPerson.name
				),

				this.emplacement2
				(
					[ "skimmer", "sand-skimmer", "vehicle", "car" ],

					[
						"This is the sand-skimmer that the ancient desert cavern aliens ",
						"gave you after you did that contract killing for them.  ",
						"\n\n",
						"Man, space is weird."
					].join("")
				).commandAddFromTextsAndScriptName
				(
					MessageHelper.combinePhraseArrays
					([
						[ "get", "take" ],
						[ null, "skimmer" ],
						[ null, "ignition" ],
						[ "key" ]
					]),
					this.scripts.placePlanetSettlementBarFront_GetSkimmerKey.name
				).itemAdd
				(
					Items.Instance().SkimmerKey
				)
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
		[
			"You stand inside the [Farting Noise] bar.  ",
			"\n\n",
			"A short ascending stairway set into the west wall ",
			"of the dome-shaped building ",
			"leads back outside.",
			"\n\n",
			"A small stage occupies the north wall, ",
			"where a band of garishly dressed (and even more garishly undressed) bipeds ",
			"manipulating complicated instruments loudly emit ",
			"what you can only assume is a song, ",
			"and that you can only further assume to be one of their hits.  ",
			"Like every musical act in every bar ever, ",
			"nobody pays them the least attention.  ",
			"\n\n",
			"The bar proper runs along the opposite, south wall, ",
			"where an expressionless bartender ",
			"delivers drinks to patrons seated on stools, ",
			"some of whom are engaged in conversation, ",
			"or at least reciprocal bluster, with each other, ",
			"and who periodically expel clouds of smoke and/or vapor, ",
			"which, under ordinary circumstances, might rise, ",
			"except that the space nearer the apex of the dome ",
			"is already full of similar high-opacity particulates ",
			"and is not accepting further contributions at this time.",
			"\n\n",
			"A cabinet housing some sort of video gambling machine ",
			"stands near the east wall.  ",
			"A squat cleaning robot busily sweeps the floor around the machine, ",
			"then empties a load of its sweepings into a porthole in the back wall.  "
		].join("");

		return this.place3
		(
			Places.planetSettlementBarInterior_Name(),

			description,

			[
				this.portal
				(
					[ "west", "out", "outside", "door" ],
					Places.planetSettlementBarFront_Name()
				),

				this.emplacement2
				(
					[ "band", "performers", "musicians", "singer" ],

					"You like some of their early stuff."
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "talk band", "talk to band" ],

						this.scripts.placePlanetSettlementBarInterior_TalkToBand.name
					)
				),

				this.emplacement2
				(
					[ "bar" ],

					[
						"The light is neither very bright nor pleasant, ",
						"nor is the bar polished.  ",
						"That's a literary reference, kids.  ",
						"It's from a story about a guy who's suicidal.  ",
						"Looking around this place, you can totally understand why."
					].join("")
				),

				this.emplacement2
				(
					[ "bartender", "barman" ],

					[
						"This bartender doesn't appear to be the ",
						"'listen to your problems' kind of bartender.  ",
						"You try to catch his eye, but he evades your gaze ",
						"with the effortless skill of long practice."
					].join("")

				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[
							"talk to bartender", "talk to barman",
							"talk bartender", "talk barman"
						],
						this.scripts.placePlanetSettlementBarInterior_TalkToBartender.name
					)
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[
							"buy bru-ale", "buy drink", "buy beer",
							"order bru-ale", "order drink", "order beer"
						],
						this.scripts.placePlanetSettlementBarInterior_BuyDrink.name
					)
				),

				this.emplacement2
				(
					[ "customers", "patrons", "barflies" ],

					[
						"I suppose 'patrons' is a rather grand name ",
						"for this motley amalgamation of limbs, tongues, ",
						"poor attitudes, bad habits, ",
						"and unpleasant fluids, ",
						"but at least if we call them patrons we don't have to focus ",
						"on their distinguishing characteristics."
					].join("")
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						MessageHelper.combinePhraseArrays
						([
							[ "talk", "talk to" ],
							[ "customers", "patrons", "barflies" ]
						]),
						this.scripts.placePlanetSettlementBarInterior_TalkToCustomers.name
					)
				),

				this.emplacement3
				(
					[ "slot machine", "gambling machine", "machine" ],

					[
						"It appears to be some variant of a slot machine.  ",
						"When the player inserts some money ",
						"and pulls the handle on the side, ",
						"behind each of three little viewing slots, ",
						"a reel printed with various symbols around its edge spins, ",
						"eventually stopping so that a random symbol ",
						"is visible through the slot.  ",
						"If the symbols match, you presumably get some sort of prize.",
						"\n\n",
						"You were never cool, or dumb, enough to enjoy gambling."
					].join(""),

					this.scripts.placePlanetSettlementBarInterior_UseSlotMachine.name
				)
				.activate()
				.commandAddFromTextSourceAndScriptName
				(
					/*
					TextSourceStrings.fromStrings
					(
						MessageHelper.combinePhraseArrays
						([
							[ "put", "insert" ],
							[ "quatloo", "coin", "money" ],
							[ null, "in" ],
							[ "slot machine", "gambling machine", "machine" ]
						])
					),
					*/

					TextSourcePhraseCombination.fromPhraseArrays
					([
						[ "put", "insert" ],
						[ "quatloo", "coin", "money" ],
						[ null, "in" ],
						[ "slot machine", "gambling machine", "machine" ]
					]),

					this.scripts.placePlanetSettlementBarInterior_UseSlotMachine.name
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

			[
				"You stand behind the [Farting Noise] bar.  ",
				"It is somewhat secluded here.",
				"Anti-sand-swimmer force-fields block access to the surrounding desert ",
				"to the east and south.  ",
				"You can see another, larger building to the north.  ",
				"\n\n",
				"As you stand around loitering behind a bar, ",
				"reflecting on how Mom said this is exactly how you'd end up, ",
				"a hatch in the back wall of the bar opens ",
				"and expels some fine white powder, ",
				"which settles onto a larger heap of powder below."
			].join(""),

			[
				this.portal( [ "north" ], Places.planetSettlementRobotShopFront_Name() ),
				this.portal( [ "west" ], Places.planetSettlementBarFront_Name() ),

				this.emplacement2
				(
					[ "heap", "pile", "powder", "white powder", "ashes" ],

					[
						"This is a heap of finely divided white powder.  ",
						"Looks a bit like ashes, except who burns things anymore?"
					].join("")
				).commandAddFromTextsAndScriptName
				(
					MessageHelper.combinePhraseArrays
					([
						[ "search", "look through" ],
						[ "heap", "pile", "powder", "white powder", "ashes" ],
					]),
					this.scripts.placePlanetSettlementBarRear_SearchAshes.name
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

			[
				"You stand in the desert settlement of [Farting Noise], ",
				"to the south of the entrance door of a domed building ",
				"bearing the sign 'Buy, Robot'.",
				"\n\n",
				"You figure that name is probably a half-haunched ",
				"joking reference to something.  ",
				"You generally don't get joking references, ",
				"but you find they get even less funny ",
				"if you ask someone to explain them.  So never mind."
			].join(""),

			[
				this.portal( [ "west" ], Places.planetSettlementRobotShopWest_Name() ),
				this.portal( [ "south" ], Places.planetSettlementBarRear_Name() ),

				this.portal
				(
					[ "door", "shop", "store", "in", "inside" ],
					Places.planetSettlementRobotShopInterior_Name()
				),

				this.emplacement2
				(
					[ "store", "shop", "dome", "Buy, Robot", "Buy Robot"],

					[
						"The domed building occupied by Buy, Robot ",
						"is a bit less lived-in-looking than the other buildings in town.  ",
						"You're not sure whether that means business is good or bad."
					].join("")
				)
			]
		);
	}

	static planetSettlementRobotShopFront_Name(): string
	{
		return "Ekkis II - [Farting Noise] - Buy, Robot - Front";
	}

	planetSettlementRobotShopInterior(): Place
	{
		var returnPlace = this.place3
		(
			Places.planetSettlementRobotShopInterior_Name(),

			[
				"You stand inside the [Farting Noise] branch of 'Buy, Robot'. ",
				"Various currently-unmoving robots are displayed on pedestals, ",
				"each bearing a more-or-less conspicious price tag.  ",
				"A salesbeing watches you idly, perhaps waiting ",
				"to see if you require assistance ",
				"or if you're just going to ask to use the bathroom.  ",
				"Maybe they're even making a little bet with themself ",
				"over which it will be.",
				"\n\n",
				"A door leads back outside, as doors do.",
				"\n\n",
				"The robots currently on display are:"
			].join(""),

			[
				this.portal
				(
					[ "out", "outside", "door"],
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

					[
						"As you move to examine the robot, ",
						"the salesbeing smoothly interposes themself.  ",
						"'This is the General Toiler S-34.  ",
						"It's not for helping around the house.  ",
						"It's not for helping around the garden.  ",
						"It's not for helping around the kitchen.  ",
						"What is it for, you ask?  ",
						"It's for all those things!",
						"\n\n",
						"Here the salesbeing chuckles.  ",
						"You suppose these moments must be the ones he lives for, ",
						"if you can call that living.",
						"\n\n",
						"'Its price is 400 credits, or 320 with coupon.'"
					].join("")
				).descriptionAsPartOfPlaceSet
				(
					"- A wheeled robot."
				),

				this.emplacement2
				(
					[
						"bipedal robot",
						"pilot/navigator robot",
						"pilot robot",
						"navigator robot",
						"navigation robot",
						"pilot/navigator",
						"pilot",
						"navigator",
						"Astromatix Stardodger QG",
						"Astromatix",
						"Stardodger",
						"QG"
					],

					[
						"As you move to examine the robot, ",
						"the salesbeing smoothly interposes themself.  ",
						"'This is the Astromatix Stardodger QG.  ",
						"It's the best pilot/navigator robot money can buy.'  ",
						"He slaps the robot's... pauldron?... briskly, and continues, ",
						"'You can fit so many starmaps into this bad boy.  ",
						"Its price is 300 credits, or 240 with coupon.'"
					].join("")
				).descriptionAsPartOfPlaceSet
				(
					"- A bipedal robot."
				),

				this.emplacement2
				(
					[
						"six-legged robot",
						"agricultural robot",
						"farming robot",
						"farmer",
						"Agron Cultivo F-12",
						"Agron",
						"Cultivo",
						"F-12"
					],

					[
						"As you move to examine the robot, ",
						"the salesbeing smoothly interposes themself.  ",
						"'This is the Agron Cultivo F-12.  ",
						"It's a farming robot.  ",
						"Now, you might say, can't be much farming going on ",
						"here on the deserts of Ekkis II.  And you'd be right.  ",
						"But that just means you have an opportunity ",
						"to get in on the ground floor.  ",
						"Or the ground ground, in this case.  ",
						"Its price is 400 credits, or 320 with coupon.'"
					].join("")
				).descriptionAsPartOfPlaceSet
				(
					"- A six-legged robot."
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

					[
						"As you move to examine the robot, ",
						"the salesbeing smoothly interposes themself.  ",
						"'This is the Stope & Adit Deep Dolly.  ",
						"It's a mining robot.  ",
						"And I always say, what's mine is yours.  ",
						"For only 700 credits, or 560 with coupon.'"
					].join("")
				).descriptionAsPartOfPlaceSet
				(
					"- A drill-faced robot."
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

					[
						"As you move to examine the robot, ",
						"the salesbeing smoothly interposes themself.  ",
						"'This is the BlackDark KLR-668 with Bioexclusion Package.  ",
						"It's a military/security/military security robot.  ",
						"We're technically only supposed to sell this to governments.  ",
						"But if I may say so, you have a rather sovereign look about you, ",
						"so I might be convinced to expedite the paperwork for you, ",
						"provided the price is right. ",
						"And that right price is 2500 credits, or 2000 with coupon.'"
					].join("")
				).descriptionAsPartOfPlaceSet
				(
					"- A gun-armed robot."
				)

			]
		);

		var emplacementsRobots = returnPlace.emplacements;
		for (var i = 0; i < emplacementsRobots.length; i++)
		{
			var emplacementRobot = emplacementsRobots[i];

			emplacementRobot.commandAddFromTextsAndScriptName
			(
				MessageHelper.combinePhraseArrays
				([
					[ "buy", "purchase" ],
					emplacementRobot.names
				]),
				this.scripts.placePlanetSettlementRobotShopInterior_BuyRobot.name
			)
		}

		return returnPlace;
	}

	static planetSettlementRobotShopInterior_Name(): string
	{
		return "Ekkis II - [Farting Noise] - Buy, Robot - Interior";
	}

	planetSettlementRobotShopWest(): Place
	{
		return this.place3
		(
			Places.planetSettlementRobotShopWest_Name(),

			[
				"You stand in the desert settlement of [Farting Noise], ",
				"to the west of a large domed building.  ",
				"\n\n",
				"To the east, you can see the building's entrance, ",
				"over which is a sign reading 'Buy, Robot'.  ",
				"A smaller domed building housing a bar lies to the south. ",
				"\n\n",
				"Further to the west, you see a spaceship standing ",
				"at the northern edge of a brightly decorated lot ",
				"containing several more ships.",
				"\n\n",
				"A force field blocks access to the open desert to the north.  ",
				"That's okay by you.  You haven't been out of the open desert ",
				"long enough to get nostalgic about it."
			].join(""),

			[
				this.portal( [ "south" ], Places.planetSettlementBarFront_Name() ),
				this.portal( [ "east" ], Places.planetSettlementRobotShopFront_Name() ),
				this.portal( [ "west" ], Places.planetSettlementNorthOfUsedShipLot_Name() )
			]
		);
	}

	static planetSettlementRobotShopWest_Name(): string
	{
		return "Ekkis II - [Farting Noise] - Buy, Robot - West";
	}

	planetSettlementNorthOfUsedShipLot(): Place
	{
		return this.place3
		(
			Places.planetSettlementNorthOfUsedShipLot_Name(),

			[
				"You stand in the desert settlement of [Farting Noise].  ",
				"You see a spaceship standing here, and, to the south, ",
				"a brightly decorated lot containing several more ships.  ",
				"To the east, you see a large domed building. ",
				"\n\n",
				"A smaller domed building with a sign that says 'Bar' lies to the southeast. ",
				"\n\n",
				"A force field blocks access to the open desert to the north and west.  ",
				"You idly wonder who's paying to run all these force fields.  ",
				"Probably there's some kind of committee that takes up a periodic collection.  ",
				"You envy whoever got the contract.  It's bound to be a steady job.  ",
				"No matter where you go, ",
				"people are always not going to want to be eaten."
			].join(""),

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
			Places.planetSettlementUsedShipLot_Name(),

			[
				"You stand in the desert settlement of [Farting Noise], ",
				"in a sandy lot brighly decorated with colorful pennants ",
				" strung along lines, and containing several ships ",
				"in various states of wear.  ",
				"Just to the north you see another ship standing by itself.",
				"\n\n",
				"At one edge of the lot is a small cubical building ",
				"bearing a sign that says, 'Non-Gelatinous George's Used Ships'.",
				"\n\n",
				"A domed building with a sign that says 'Bar', ",
				"among other things, stands to the east. ",
				"\n\n",
				"A larger domed building stands to the northeast. ",
				"\n\n",
				"A force field blocks access to the open desert to the south and west, ",
				"keeping out the predatory sand-swimmers, and, ",
				"as Non-Gelatinous George would say, keeping in the savings."
			].join(""),

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
				this.portal( [ "airlock" ], Places.enemyShipAirlockChamber_Name() ),
				this.portal( [ "hall" ], Places.enemyShipLowerDeckHall1_Name() ),
			]
		);
	}

	static enemyShipAirlockAntechamber_Name(): string
	{
		return "Venipositor - Airlock Antechamber";
	}

	enemyShipAirlockChamber(): Place
	{
		return this.place3
		(
			Places.enemyShipAirlockChamber_Name(),

			[
				"This is the interior of one of the Venipositor's airlocks.",
				"Doors at either end lead inside and outside of the Venipositor"
			].join(""),

			[
				this.portal( [ "in", "inside" ], Places.enemyShipAirlockAntechamber_Name() ),
				this.portal( [ "out", "outside" ], Places.enemyShipAirlockExterior_Name() )
			]
		);
	}

	static enemyShipAirlockChamber_Name(): string
	{
		return "Venipositor - Airlock";
	}

	enemyShipAirlockExterior(): Place
	{
		return this.place3
		(
			Places.enemyShipAirlockExterior_Name(),

			[
				"This is the exterior of the Venipositor, near an airlock door.  ",
				"The boundless sweep of space spreads out in all directions."
			].join(""),

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

			[
				"This is the armory of the Venipositor.  ",
				"\n\n",
				"A trapezoidal leads back ",
				"out onto the catwalk above the Stellar Juvenator chamber.",
				"\n\n",
				"Along the opposite wall, a high counter ",
				"with a heavily-armed robot standing watch behind it ",
				"blocks the path to racks and racks of weapons.  ",
				"\n\n",
				"The Vadik seem to all be professional soldier/assassin/murderers, ",
				"so you have to worry about what kind of weapons they keep under lock and key.  ",
				"But maybe they just want to keep track of what kind of weapons are popular, ",
				"so they can order more of them?",
				"\n\n",
			].join(""),

			[
				this.portal
				(
					[ "arch" ],
					Places.enemyShipStellarJuvenatorChamberCatwalk_Name()
				),

				Agent.fromNames
				(
					[ "robot", "heavily-armed robot", "guard robot" ]
				).descriptionAsPartOfPlaceSet
				(
					[
						"The guard robot monitors you intently.  ",
						"You wouldn't say it's aiming its guns at you, exactly, ",
						"it's just that it has so many guns built into it ",
						"that it'd be hard to prevent at least a few of them ",
						"from being pointed at you."
					].join("")
				).descriptionWhenExaminedSet
				(
					[
						"This robot guards guns from gun-worshippers for a living, ",
						"and looks like it.  You don't want to mess with this thing."
					].join("")
				),

				Items.Instance().gasGrenade.name
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

			[
				"This is a laundry room on the Venipositor.  ",
				"Yes, you read that right: a laundry room.",
				"Even on board this city-sized mobile killing machine, ",
				"it's not all gunports and missile bays.  ",
				"People still need to get their clothes cleaned.  ",
				"And the Vadik need their clothes cleaned more than average, ",
				"given the amount of times that they mus go wading through blood ",
				"in any given week.",
				"\n\n",
				"Still, as a Maintenance Specialist (Sanitation Grade), ",
				"you have to admit that this is a pretty swanky laundry setup.",
				"The entire port wall of the laundry room is taken up ",
				"by an enormous washer and dryer, ",
				"each of which has a door easily two meters in diameter, ",
				"side-by-side with an automated presser and folder.",
				"Running horizontally in front of the machines is a track, on which ",
				"large, wheeled laundry bins made of transparent plastic ride. ",
				"Rising vertically under each cleaning machine ",
				"is a mechanism for raising the nearest bin on the track, ",
				"hoisting it above the door and tilting it until its contents ",
				"fall inside the corresponding machine.",
				"Then the machine does its assigned task, and ",
				"another mechanism unloads the processed clothes ",
				"back into the waiting empty bin. ",
				"Then all the bins on the track are advanced to the next station: ",
				"the dirty bins, if any, move toward the washer, ",
				"the bin currently in front of the washer moves toward the dryer, ",
				"the bin currently in front of the dryer moves toward the pressing and folding machine, ",
				"and the bin currently in front of the presser/folder moves into the outgoing-laundry zone, ",
				"from which a worker rolls the bins out of the laundry to distribute ",
				"the laundered clothes back amongst the crew quarters.",
				"\n\n",
				"A vent high in the aft wall provides ventilation for the steamy air."
			].join(""),

			[
				this.emplacement2
				(
					[ "dirty bin" ],

					"This laundry bin is full of used, dirty clothes awaiting washing.  "
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "get in bin" ],
						this.scripts.placeEnemyShipLaundry_GetInBin.name
					)
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "get in dirty bin" ],
						this.scripts.placeEnemyShipLaundry_GetInBin.name
					)
				),

				this.emplacement2
				(
					[ "washer bin" ],

					[
						"This empty laundry bin stands in front of the washer, ",
						"waiting to be loaded with clean wet clothes."
					].join("")
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "get in washer bin" ],
						this.scripts.placeEnemyShipLaundry_GetInBin.name
					)
				),

				this.emplacement2
				(
					[ "washer", "clothes washer", "washing machine"],

					"The washer is full of wet clothes that it is in the process of washing."
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "get in washer" ],
						this.scripts.placeEnemyShipLaundry_GetInMachine.name
					)
				),

				this.emplacement2
				(
					[ "wet bin" ],
					"This laundry bin is full of clean, wet clothes awaiting drying."
				),

				this.emplacement2
				(
					[ "dryer", "clothes dryer"],

					"The dryer is full of clean, wet clothes that it is currently drying."
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "get in dryer" ],
						this.scripts.placeEnemyShipLaundry_GetInMachine.name
					)
				),

				this.emplacement2
				(
					[ "dryer bin" ],

					[
						"This empty laundry bin stand in front of the dryer, ",
						"waiting to be loaded with clean dry clothes."
					].join("")
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "get in dryer bin" ],
						this.scripts.placeEnemyShipLaundry_GetInBin.name
					)
				),

				this.emplacement2
				(
					[ "dry bin" ],

					[
						"This laundry bin is full of clean, dry clothes ",
						"awaiting pressing and folding."
					].join("")
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "get in dry bin" ],
						this.scripts.placeEnemyShipLaundry_GetInBin.name
					)
				),

				this.emplacement2
				(
					[ "presser" ],

					[
						"The presser/folder's robotic arms are taking clean, ",
						"dry clothes from its intake hopper and ",
						"feeding them carefully onto a conveyor belt, ",
						"which passes the clothes through the rollers of a steam presser.  ",
						"From there, other machines fold the clothes ",
						"and deposit them in the waiting laundry bin."
					].join("")

				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "get in dryer" ],
						this.scripts.placeEnemyShipLaundry_GetInMachine.name
					)
				),

				this.emplacement2
				(
					[ "presser bin" ],

					[
						"This laundry bin stands in front of the presser/folder, ",
						"which is currently in the process of loading it ",
						"with clean, dry, pressed, and folded clothes."
					].join("")
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "get in presser bin" ],
						this.scripts.placeEnemyShipLaundry_GetInBin.name
					)
				),

				this.emplacement2
				(
					[ "pressed bin" ],

					[
						"This laundry bin is full of clean, dry, pressed, and folded clothes ",
						"awaiting delivery to their owners' respective quarters."
					].join("")
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "get in pressed bin" ],
						this.scripts.placeEnemyShipLaundry_GetInBin.name
					)
				),

				this.emplacement2
				(
					[ "vent" ],

					[
						"The rectangular vent cover is about three meters above the ground, ",
						"and is secured to the wall with a standard screw at each corner."
					].join("")
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[ "get in vent" ],
						this.scripts.placeEnemyShipLaundry_GetInVent.name
					)
				)
			]
		);
	}

	static enemyShipLaundry_Name(): string
	{
		return "Venipositor - Laundry";
	}

	enemyShipLowerDeckHall1(): Place
	{
		return this.place3
		(
			Places.enemyShipLowerDeckHall1_Name(),

			[
				"This is a hallway somwhere on a lower deck of the Venipositor.  ",
				"A door leads back to the antechamber of the airlock you entered by.",
				"In the other direction, the hallway takes a leftward bend toward... more hall."
			].join(),

			[
				this.portal( [ "door" ], Places.enemyShipAirlockAntechamber_Name() ),
				this.portal
				(
					[ "hall", "hallway", "corridor", "bend" ],
					Places.enemyShipLowerDeckHall2_Name()
				),
			]
		);
	}

	static enemyShipLowerDeckHall1_Name(): string
	{
		return "Venipositor - Lower Deck - Hall - Outside Airlock Antechamber";
	}

	enemyShipLowerDeckHall2(): Place
	{
		return this.place3
		(
			Places.enemyShipLowerDeckHall2_Name(),

			[
				"This is a hallway somwhere on a lower deck of the Venipositor.  ",
				"The hall ends in a door opening on an elevator.",
				"\n\n",
				"In the other direction, the corridor takes a leftward bend ",
				"back toward the airlock you entered by."
			].join(),

			[
				this.portal
				(
					[ "elevator" ], Places.enemyShipLowerDeckHall1_Name()
				),
				this.portal
				(
					[ "hall", "hallway", "corridor", "bend" ],
					Places.enemyShipLowerDeckHall3_Name()
				)
			]
		);
	}

	static enemyShipLowerDeckHall2_Name(): string
	{
		return "Venipositor - Hall - Lower Deck - Elevator";
	}

	enemyShipLowerDeckHall3(): Place
	{
		return this.place3
		(
			Places.enemyShipLowerDeckHall3_Name(),

			[
				"This is another hallway somwhere on a lower deck of the Venipositor.  ",
				"\n\n",
				"At one end, the hall ends in a tall trapezoidal arch ",
				"about three times your height.  Wait, can an arch be trapezoidal?",
				"\n\n",
				"In the other direction, the corridor continues into the ever-present ",
				"darkness.  Some well-placed glow-globes would really help this place out.  ",
				"Plus maybe some carpet.  And some art?  Unless all these weird, ",
				"angular metal doodads sticking out of the walls are Vadik art?",
				"\n\n",
				"In between is a door opening on an elevator."
			].join(),

			[
				this.portal
				(
					[ "arch" ],
					Places.enemyShipStellarJuvenatorChamber_Name()
				),
				this.portal
				(
					[ "elevator" ],
					Places.enemyShipUpperDeckHall2_Name()
				),
				this.portal
				(
					[ "hall", "hallway", "corridor"  ],
					Places.enemyShipLowerDeckHall4_Name()
				)
			]
		);
	}

	static enemyShipLowerDeckHall3_Name(): string
	{
		return "Venipositor - Lower Deck - Hall with Trapezoidal Arch and Elevator";
	}

	enemyShipLowerDeckHall4(): Place
	{
		return this.place3
		(
			Places.enemyShipLowerDeckHall4_Name(),

			[
				"You are in yet another hallway somwhere on a lower deck of the Venipositor.",
				"\n\n",
				"At one end, the hall ends in an elevator door.  Again.",
				"\n\n",
				"In the other direction, it continues into the darkness.  Again.",
				"\n\n",
				"Same old, same old.  It seems like if spaceship designers had their way, ",
				"spaceships would just be all doors and hallways.",
				"You make a mental note to start a hallway supply company ",
				"when this is all over."
			].join(),

			[
				this.portal
				(
					[ "elevator" ],
					Places.enemyShipUpperDeckHall3_Name()
				),
				this.portal
				(
					[ "hall", "hallway", "corridor"  ],
					Places.enemyShipLowerDeckHall3_Name()
				)
			]
		);
	}

	static enemyShipLowerDeckHall4_Name(): string
	{
		return "Venipositor - Lower Deck - Halls, Again?";
	}

	enemyShipNearbySpace(): Place
	{
		return this.place3
		(
			Places.enemyShipNearbySpace_Name(),

			[
				"You are in your ship, hovering nearby an enormous Vadik warship ",
				"Based on its hull markings, it seems to be named something like 'Venipositor'.  ",
				"The name sounds menacing, which they probably intended, ",
				"and also kind of dirty, which they probably didn't.",
				"\n\n",
				"It's a terrifying ship.  Its color scheme could best be described as ",
				"'Dried Blood on Rusty Murder Weapon.'",
				"There are sharp edges, jagged metal teeth, and needlelike points everywhere, ",
				"most of which have a bunch of Vadik writing scrawled near them.  ",
				"On an ordinary ship, you'd expect such writing to be warnings ",
				"about how dangerous everything is, " ,
				"but from what little you can read of it, ",
				"this writing seems instead to be bragging ",
				"about how dangerous everything is."
			].join(""),

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

	enemyShipFighterBay(): Place
	{
		return this.place3
		(
			Places.enemyShipFighterBay_Name(),

			[
				"This is one of the the fighter bays of the Venipositor.  ",
				"An array of wicked-looking Vadik fighters ",
				"stand ready to be swiftly launched into space ",
				"through their respective launch tubes, ",
				"and thence to thoroughly mess up some civilization's waketime.",
				"\n\n",
				"An elevator leads back to the rest of the ship."
			].join(""),

			[
				this.portal
				(
					[ "elevator" ],
					Places.enemyShipUpperDeckHall2_Name()
				),

				this.emplacement2
				(
					[ "fighter", "ship" ],

					[
						"The fighter is everything you'd want a Vadik fighter to be.  ",
						"It looks like it just got out of prison ",
						"and immediately knifed the person giving it a ride back to town."
					].join("")
				)
			]
		);
	}

	static enemyShipFighterBay_Name(): string
	{
		return "Venipositor - Fighter Bay";
	}

	enemyShipStellarJuvenatorChamber(): Place
	{
		return this.place3
		(
			Places.enemyShipStellarJuvenatorChamber_Name(),

			[
				"This is a cavernous room on the Venipositor.  ",
				"\n\n",
				"The titanic Stellar Juvenator is mounted on a pedestal, ",
				"with an armed Vadik guard standing nearby.  ",
				"\n\n",
				"The Stellar Juvenator glows and crackles with luminous energies.  ",
				"It doesn't look safe to be around.  ",
				"You're not sure how much of that is its normal operating mode.  ",
				"Then again, since the thing is designed to reignite old stars, ",
				"you suppose even its normal operating mode is pretty scary.",
				"\n\n",
				"A catwalk runs overhead.  You're getting vertigo just looking at it."
			].join(""),

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

			[
				"You are standing on a railed catwalk above a ",
				"cavernous chamber on the Venipositor.",
				"\n\n",
				"On the one hand, a catwalk is a welcome change from another hallway.  ",
				"On the other hand, a catwalk is kind of like just a half-dressed ",
				"hallway that you can fall to your death from.",
				"\n\n",
				"On the floor, far below, the Stellar Juvenator",,
				"is mounted on a pedestal, ",
				"with an armed Vadik guard standing nearby.  ",
				"\n\n",
				"At either end, the catwalk runs through trapezoidal arches, ",
				"one leading back to the hallways you came from, ",
				"and the other bearing a placard reading 'Armory'."
			].join(""),

			[
				this.portal
				(
					[ "armory" ], 
					Places.enemyShipArmory_Name()
				),
				this.portal
				(
					[ "hall", "hallway", "corridor" ],
					Places.enemyShipUpperDeckHall4_Name()
				),
			]
		);
	}

	static enemyShipStellarJuvenatorChamberCatwalk_Name(): string
	{
		return "Venipositor - Stellar Juvenator Chamber - Catwalk";
	}

	enemyShipUpperDeckHall1(): Place
	{
		return this.place3
		(
			Places.enemyShipUpperDeckHall1_Name(),

			[
				"This is a shadowy corridor on an upper deck of the Venipositor.",
				"\n\n",
				"The shadowy hallway ends with an shadowy elevator door, ",
				"and, in the other direction, continues into the shadows.  ",
				"In between, another short, shadowy, corridor intersects this hallway ",
				"at a shadowy right angle and itself ends in a shadowy door.",
				"\n\n",,
				"Look, it sounds ominous, sure, but if I were you, ",
				"I wouldn't read too much into all the shadows.  ",
				"They're not, like, supernatural or anything.  ",
				"It's just the Vadik don't seem to light their ships very well.  ",
				"It doesn't mean the ship is haunted.  It's just a normal spaceship",
				"that just happens to be full of ",
				"perfectly normal, mundane, genocidal monsters ",
				"who want to destroy you and all life in the galaxy."
			].join(""),

			[
				this.portal( [ "elevator" ], Places.enemyShipLowerDeckHall2_Name() ),
				this.portal
				(
					[ "hall", "hallway", "corridor" ],
					Places.enemyShipUpperDeckHall2_Name()
				),
				this.portal
				(
					[ "door" ],
					Places.enemyShipUpperDeckHall3_Name()
				)
			]
		);
	}

	static enemyShipUpperDeckHall1_Name(): string
	{
		return "Venipositor - Upper Deck - Hall - Shadowy Intersection";
	}

	enemyShipUpperDeckHall2(): Place
	{
		return this.place3
		(
			Places.enemyShipUpperDeckHall2_Name(),

			[
				"You stand near a small bank of elevators ",
				"on an upper deck of the Venipositor.  ",
				"\n\n",
				"It's a very small bank of elevators.  ",
				"It is, in fact, two elevators.  ",
				"That's the minimum possible size an elevator bank can be ",
				"and still be called a 'bank'.",
				"One of the elevators is on the left, ",
				"and the other is on the right.  ",
				"After a moment's reflection, you are forced to acknowledge ",
				"that two adjacent elevators pretty much have to be ",
				"arranged like that.",
				"\n\n",
				"Along another wall is a door labelled 'Vadik' in Laundry.  ",
				"Sorry, no.  It actually says 'Laundry' in Vadik. ",
				"It's okay, you're still learning.",
				"\n\n",
				"In the direction opposite the laundry room door,",
				"an especially shadowy stretch of hall ",
				"stretches shadowingly into the shadows.  Shadows!"
			].join(""),

			[
				this.portal
				(
					[ "door", "laundry" ],
					Places.enemyShipLaundry_Name()
				),
				this.portal
				(
					[ "left elevator" ],
					Places.enemyShipLowerDeckHall3_Name()
				),
				this.portal
				(
					[ "right elevator" ],
					Places.enemyShipFighterBay_Name()
				),
				this.portal
				(
					[ "hall", "hallway", "corridor", "shadows", "shadowy stretch of hall" ],
					Places.enemyShipUpperDeckHall1_Name()
				),

			]
		);
	}

	static enemyShipUpperDeckHall2_Name(): string
	{
		return "Venipositor - Upper Deck - Hall - Two Elevators, No Waiting";
	}

	enemyShipUpperDeckHall3(): Place
	{
		return this.place3
		(
			Places.enemyShipUpperDeckHall4_Name(),

			[
				"Sweet gentle gel matrix, you're in yet another hall ",
				"of the Venipositor.  We'll say this one is on an upper deck, ",
				"because you arrived here in an elevator going up.  ",
				"\n\n",
				"But it looks exactly like the part of the hall on the lower deck ",
				"that you just took the elevator from to get here.  ",
				"The ship designer was clearly checked all the way out of the process.",
				"\n\n",
				"At one end, the hall ends in the elevator in which you first arrived here.",
				"\n\n",
				"In the other direction, it continues into, you guessed it, darkness."
			].join(),

			[
				this.portal
				(
					[ "elevator" ],
					Places.enemyShipLowerDeckHall4_Name()
				),
				this.portal
				(
					[ "hall", "hallway", "corridor", "darkness" ],
					Places.enemyShipUpperDeckHall4_Name()
				)
			]
		);
	}

	static enemyShipUpperDeckHall3_Name(): string
	{
		return "Venipositor - Upper Deck - Are You Kidding Me with These Halls?";
	}

	enemyShipUpperDeckHall4(): Place
	{
		return this.place3
		(
			Places.enemyShipUpperDeckHall4_Name(),

			[
				"More hall.  Venipositor.  Upper deck.",
				"\n\n",
				"Hall boring.  All halls boring.  ",
				"It's been so long now, ",
				"you've forgotten what rooms even look like.",
				"Are they long and narrow, and contain only doors?  ",
				"No, that's what hallways are like.  ",
				"You think you remember rooms being a little different.  ",
				"\n\n",
				"At one end, the hall ends in a familiar-looking trapezoidal arch.  ",
				"It looks just like the one you saw on the deck below.  ",
				"At the time, that arch was something new, ",
				"a breath of architectural fresh air.  ",
				"But now they've gone and ruined that too.",
				"\n\n",
				"The hall continues back in the opposite direction.  ",
				"You've already been there, though, so there's no hope ",
				"for anything in that direction but hallway."
			].join(),

			[
				this.portal
				(
					[ "arch" ],
					Places.enemyShipStellarJuvenatorChamberCatwalk_Name()
				),
				this.portal
				(
					[ "hall", "hallway", "corridor", "darkness" ],
					Places.enemyShipUpperDeckHall3_Name()
				)
			]
		);
	}

	static enemyShipUpperDeckHall4_Name(): string
	{
		return "Venipositor - Upper Deck - Hall Approximately 43 Million";
	}

	enemyShipVentilationShaft1(): Place
	{
		return this.place3
		(
			Places.enemyShipVentilationShaft1_Name(),

			[
				"This is a ventilation shaft on the Venipositor.  ",
				"A short side branch leads to a vent cover.  ",
				"\n\n",
				"The ventilation shaft, being a ventilation shaft, ",
				"is quite cramped and echoey.  Event the tiniest movement ",
				"makes so much noise, and it's literally being piped ",
				"to every room on this deck.  ",
				"It's the miracle that the Vadik haven't found you and murdered you yet.  ",
				"\n\n",
				"Though you do remember one time, growing up, ",
				"when there were macrolice in the crawlspace, ",
				"and nobody was too eager to crawl in there after them either."
			].join(""),

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

			[
				"This is a ventilation shaft on the Venipositor.  ",
				"A short side branch leads to a vent cover."
			].join(""),

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

			[
				"This is a featureless stretch of ventilation shaft on the Venipositor.  ",
				"This being a ventilation duct, there's a constant flow of air running past you.  ",
				"You don't care for it.  ",,
				"Leave it to the Vadik to make a breeze somehow unpleasant."
			].join(""),

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

			[
				"This is a featureless stretch of ventilation shaft on the Venipositor.",
				"And you thought the hallways were boring.  ",
				"At least the ducts have an excuse: ",
				"nobody was ever supposed to be in them."
			].join(""),

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
				places.friendlyShipCaptainsQuarters(),
				places.friendlyShipOfficersQuartersAntechamber(),
				places.friendlyShipUpperDeckHallAmidships(),
				places.friendlyShipUpperDeckHallForward(),
				places.friendlyShipUpperDeckHallAft(),
				places.friendlyShipBridge(),

				// Lower Deck.
				places.friendlyShipLibrary(),
				places.friendlyShipLowerDeckHallAft(),
				places.friendlyShipLowerDeckHallAmidships(),
				places.friendlyShipLowerDeckHallForward(),
				places.friendlyShipMessHall(),
				places.friendlyShipJanitorsCloset(),

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
				places.planetCavernsElevator(),
				places.planetCavernsGratingEastSide(),
				places.planetCavernsGratingWestSide(),
				places.planetCavernsGeyser(),
				places.planetCavernsPool(),

				places.planetCavernsBarrier(),

				places.planetCavernsDripsBefore(),
				places.planetCavernsDrips1(),
				places.planetCavernsDrips2(),
				places.planetCavernsDrips3(),
				places.planetCavernsDripsAfter(),

				places.planetCavernsProjectionRoom(),
				places.planetCavernsSteamworks(),
			]
		);
	}

	planetSettlement(places: Places, scripts: Scripts): Region
	{
		return Region.fromNameScriptUpdateForTurnNameAndPlaces
		(
			"Ekkis 2 - Settlement",

			scripts.regionPlanetSettlement_UpdateForTurn.name,

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
				places.enemyShipLowerDeckHall1(),
				places.enemyShipLowerDeckHall2(),
				places.enemyShipLowerDeckHall3(),
				places.enemyShipLowerDeckHall4(),
				places.enemyShipNearbySpace(),
				places.enemyShipFighterBay(),
				places.enemyShipStellarJuvenatorChamber(),
				places.enemyShipStellarJuvenatorChamberCatwalk(),
				places.enemyShipUpperDeckHall1(),
				places.enemyShipUpperDeckHall2(),
				places.enemyShipUpperDeckHall3(),
				places.enemyShipUpperDeckHall4(),
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

			this.itemDataCartridge_PutInSlot,
			this.itemDehydratedWaterUse,
			this.itemGadgetPressButton,
			this.itemKeycardUse,
			this.itemSurvivalKitOpen,

			this.placeEnemyShipLaundry_GetInBin,
			this.placeEnemyShipLaundry_GetInMachine,
			this.placeEnemyShipLaundry_GetInVent,

			this.placeFriendlyShipBridge_HideBehindCaptainsChair,
			this.placeFriendlyShipBridge_SearchBody,
			this.placeFriendlyShipBridge_SitInChair,
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

			this.placePlanetCavernsBarrier_GoBarrier,
			this.placePlanetCavernsBarrier_PutGlassInBarrier,
			this.placePlanetCavernsDrips_Update,
			this.placePlanetCavernsGeyser_PutRockInGeyser,
			this.placePlanetCavernsGrating_CrossGrating,
			this.placePlanetCavernsGrating_PutCanOfShamOnGrating,
			this.placePlanetCavernsPool_DrinkFromPool,
			this.placePlanetCavernsSteamworks_InsertKeyInSkimmer,
			this.placePlanetCavernsSteamworks_TalkToAlien,
			this.placePlanetCavernsProjectionRoom_Update,
			this.placePlanetCliffsTopSouth_CrossBridge,
			this.placePlanetCliffsCaveInterior_GoEast,
			this.placePlanetCliffsCaveInterior_GoWest,
			this.placePlanetCliffsCaveInterior_ThrowCanteenAtBeast,
			this.placePlanetCliffsCaveInterior_Update,
			this.placePlanetCliffsBottomNorthwestWestSide_LookInHole,

			this.placePlanetDesertDeep_Update,

			this.placePlanetSettlementBarFront_GetSkimmerKey,
			this.placePlanetSettlementBarFront_RefuseToSellSkimmer,
			this.placePlanetSettlementBarFront_SellSkimmer,
			this.placePlanetSettlementBarFront_TalkToPerson,
			this.placePlanetSettlementBarFront_Update,
			this.placePlanetSettlementBarInterior_BuyDrink,
			this.placePlanetSettlementBarInterior_TalkToBand,
			this.placePlanetSettlementBarInterior_TalkToBartender,
			this.placePlanetSettlementBarInterior_TalkToCustomers,
			this.placePlanetSettlementBarInterior_UseSlotMachine,
			this.placePlanetSettlementBarRear_SearchAshes,
			this.placePlanetSettlementRobotShopInterior_BuyRobot,

			this.regionFriendlyShip_AgentEnemyUpdateForTurn,
			this.regionFriendlyShip_UpdateForTurn,
			this.regionPlanetDesert_UpdateForTurn,
			this.regionPlanetSettlement_UpdateForTurn,
			this.regionPlanetSettlement_NavigationRobotUpdate,

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
		[
			"The Vadik's only response is to disintegrate you.",
			"\n\n",
			"You are dead."
		].join("");
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

	itemDataCartridge_PutInSlot(u: Universe, w: World, p: Place, c: Command): void
	{
		var message;

		var cartridgeReaderIsPresent = (p.emplacementByName("reader") != null);

		if (cartridgeReaderIsPresent)
		{
			message =
			[
				"There is no cartridge reader here, ",
				"and we're decades away from self-reading data cartridges.  ",
				"Or so you assume."
			].join("");
		}
		else
		{
			message =
			[
				"You insert the cartridge into the reader.  ",
				"The display lights up with a bunch of letters and symbols, ",
				"while the galaxy's most soporific narrator starts talking about math.  ",
				"You think it's math, anyway.  You don't actually understand any of it, ",
				"which certainly supports the 'it's math' hypothesis.  ",
				"On the other hand, this math doesn't seem to have any numbers in it, ",
				"like ones or fours or sevens.  Doesn't math have numbers?",
				"\n\n",
				"School never was your strong suit.",
				"\n\n",
				"Just as you're about to eject the cartridge, possibly to burn it, ",
				"there's a sudden discontinuity in the video, ",
				"and a wild-eyed, wild-haired man appears in frame.  ",
				"Hey, you know him!.  He's the scientist guy who died on the floor ",
				"of the Pax Aeterna library while you did nothing to help.  ",
				"You didn't know he was a movie star.",
				"\n\n",
				"On the video, the man says, 'This is Slade Gorham, Chief Scientist of ",
				"the Commonwealth ship Pax Aeterna.  The Vadik have taken over the ship.  ",
				"They have taken the Stellar Juvenator.  ",
				"They must not be allowed to possess it.  ",
				"In their hands, its unimaginable power could mean the end of civilized life ",
				"in the galaxy.",
				"\n\n",
				"'Whoever's seeing this: You must destroy the Stellar Juvenator.  ",
				"The code to initiate the built-in self destruct is: ",
				"\n\n",
				"    star juvie go boom-boom bye now gorham alpha 9",
				"\n\n",
				"Good luck, we're all depending on you.  ",
				"May the universe guide you to victory.'",
				"\n\n",
				"And that's where the video ends.  Whoa, dramatic."
			].join("");
		}

		u.messageEnqueue(message);
	}

	itemDehydratedWaterUse(u: Universe, w: World, p: Place, c: Command): void
	{
		var message =
		[
			"You drink from the water bottle.  ",
			"There, that'll keep the Grim Specter of Thirst ",
			"a few meters further away for a few minutes."
		].join("");

		var stateName = "TurnsSinceLastDrink";

		w.agentPlayer.stateGroup.stateWithNameSetToValue(stateName, 0);

		u.messageEnqueue(message);
	}

	itemGadgetPressButton(u: Universe, w: World, p: Place, c: Command): void
	{
		var itemGadget = w.agentPlayer.itemByName("gadget");

		var message =
			"You press the only button on the gadget.  The indicator light ";

		var itemGadgetIsActivated = itemGadget.activated();

		if (itemGadgetIsActivated)
		{
			message +=
				"goes dark.  Whatever this thing does, it's not doing it now.";

			itemGadget.deactivate();
		}
		else
		{
			message +=
				"illuminates.  Whatever this thing does, it's doing it now.";

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
				[
					"You insert the keycard in the slot.  ",
					"The elevator door slides open."
				].join("");
				portalElevator.unlock().descriptionWhenExaminedSet("The elevator door is open.");
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
		var message = "You open the survival kit.  ";

		var itemSurvivalKit = w.agentPlayer.itemByName("survival kit");
		var itemsContained = itemSurvivalKit.items;
		if (itemsContained.length == 0)
		{
			message += "It's empty."
		}
		else
		{
			var itemsContainedAsText =
				itemsContained.map(x => x.nameAndQuantity() ).join("\n\t- ");

			message +=
			[
				"Inside, you find the following " + itemsContainedAsText,
				"\n\n",
				"It seems a little heavy on the Sham (tm) at first,  ",
				"but then you remember that announcement that the Commonwealth",
				"had entered a corporate partnership with Delitron-9000, ",
				"the manufacturer of Sham (tm).  ",
				"It's too bad they didn't also form a partnership ",
				"with the Kracktastic Krill-Cracker people.  ",
				"\n\n",
				"Anyway, just looking at all that Sham (tm) ",
				"effectively suppresses your desire to eat for the near future, ",
				"which you suppose is useful in a survival situation."
			].join("");

			p.itemsAdd(itemsContained);
			itemSurvivalKit.itemsClear();
		}

		u.messageEnqueue(message);
	}

	// Places.

	placeEnemyShipLaundry_GetInBin
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var vadikEnters =
		[
			"After a few moments, a Vadik soldier--laundry worker?--enters, ",
			"pushing ahead of him another wheeled bin of dirty laundry, ",
			"which he adds to the end of the queue behind the already-present dirty bin.",
			"\n\n"
		].join("");

		var vadikSeesPlayerInEmptyBin =
		[
			"Then he sees you.  It's not like you're well hidden.",
			"The bin you're trying to hide in is transparent, remember?",
			"\n\n",
			"He zaps you, through the wall of the bin, with his ray gun."
		].join();

		var vadikSeesPlayerTryingToHideInFoldedLaundry =
		[
			"Then the Vadik sees you attempting to hide in the bin of folded laundry.  ",
			"The helmet he wears conceals his features and expression, ",
			"but you could almost swear he was laughing as he pulls the trigger.  ",
			"\n\n",
			"(If it makes you feel any better, ",
			"even if you'd managed to dig deep enough to hide, ",
			"he would have noticed that the laundry on top of you was no longer neatly folded.)"
		].join("");

		var vadikGoofsOff =
		[
			"Then he crosses the room to the other end of the queue, ",
			"where a bin of clean, dry, pressed, and folded laundry awaits delivery.",
			"\n\n",
			"Then he leans against the outgoing bin ",
			"and fiddles idly with his pocket computer.  ",
			"Soon you realize he's playing a game.  ",
			"And he's really into it.  He's not going anywhere for a while.",
			"\n\n",
			"Meanwhile, the laundry machines along the track finish their particular tasks.  ",
			"The washer and dryer unload their contents into the bins waiting in front of them.",
			"All the bins then move along the track to the next station, ",
			"where their contents are loaded back into the momentarily vacant machines."
		].join("");

		var commandText = c.text();
		var binName = commandText.split(" ")[2];

		var climbIntoBin: string;
		var vadikSeesPlayerOrGoofsOff: string;
		var fateOfBinPlayerIsIn: string;

		if (binName == "bin")
		{
			u.messageEnqueue("Which bin?  There are several here.");
			return;
		}
		else if (binName == "dirty")
		{
			climbIntoBin = 
			[
				"You climb into the bin of dirty clothes awaiting washing",
				"and burrow down to conceal yourself under them, ",
				"keeping one eye exposed to monitor the room.  ",
				"Your open eye waters from the stench of vigorously used laundry."
			].join("");

			vadikSeesPlayerOrGoofsOff = vadikGoofsOff;

			fateOfBinPlayerIsIn =
			[
				"The bin you're hiding in is loaded into the washer, ",
				"which, after several seconds, fills completely with warm soapy water, ",
				"Well, that's okay, you won't drown, ",
				"because of your environment suit.",
				"\n\n",
				"But your suit is intended for the vaccuum of space, ",
				"not for underwater work.  Its systems instantly short out, ",
				"leaving it a dead husk.  It remains watertight, ",
				"but no more air is being supplied.  ",
				"If you can't get out of this machine and get your helmet off, ",
				"you will soon suffocate.",
				"\n\n",
				"You wait in increasing discomfort as the washer runs through its cycle",,
				"filling, soaking, agitating, draining, rinsing, and draining again.  ",
				"Nearing asphixiation, you tear your helmet off as the machine enters the spin cycle, ",
				"and gasp desperately as the g-forces try to press you through the wall.",
				"\n\n",
				"Then it's over.  The washer dumps you and its charge of clothing ",
				"into the laundry bin waiting in front of it.",
				"\n\n",
				"The Vadik laundry tech is no longer present.  You have survived."
			].join("")

		}
		else if (binName == "washer")
		{
			climbIntoBin = 
			[
				"You climb into the empty bin waiting in front of the washer.  ",
				"Since there are no clothes in the bin, it's easy to see out.  ",
				"But it's equally easy to see in.  "
			].join("");

			vadikSeesPlayerOrGoofsOff = vadikSeesPlayerInEmptyBin;

			fateOfBinPlayerIsIn = "You are dead.";
		}
		else if (binName == "wet")
		{
			climbIntoBin = 
			[
				"You climb into the bin of damp clothes awaiting drying",
				"and burrow down to conceal yourself under them, ",
				"(which is difficult, because damp clothes are heavy and lumpy,) ",
				"keeping one eye exposed to monitor the room."
			].join("");

			vadikSeesPlayerOrGoofsOff = vadikGoofsOff;

			fateOfBinPlayerIsIn =
			[
				"The bin you're hiding in is loaded into the dryer.  ",
				"As you begin to tumble among the clothes, painfully accumulating bruises, ",
				"the dryer starts to get very hot, ",
				"hotter than your environment suit is rated to handle, ",
				"even if it wasn't quickly broken from being ",
				"repeatedly pounded against the dryer's interior.  ",
				"You are being simultaneously beaten and cooked to death.",
				"\n\n",
				"Soon you are unable to take the agony anymore, ",
				"so you try to open the door, happy to let the Vadik put you out of your misery, ",
				"but the door is very hard to even get to, ",
				"and impossible to open, while the machine is running.",
				"\n\n",
				"You are dead."
			].join("");
		}
		else if (binName == "dryer")
		{
			climbIntoBin = 
			[
				"You climb into the empty bin waiting in front of the dryer.  ",
				"Since there are no clothes in the bin, it's easy to see out.  ",
				"But it's equally easy to see in.  "
			].join("");

			vadikSeesPlayerOrGoofsOff = vadikSeesPlayerInEmptyBin;

			fateOfBinPlayerIsIn = "You are dead.";
		}
		else if (binName == "dry")
		{
			climbIntoBin = 
			[
				"You climb into the bin of dry clothes awaiting pressing and folding",
				"and burrow down to conceal yourself under them, ",
				"keeping one eye exposed to monitor the room."
			].join("");

			vadikSeesPlayerOrGoofsOff = vadikGoofsOff;

			fateOfBinPlayerIsIn =
			[
				"The bin you're hiding in is loaded into the presser/folder's intake hopper.  ",
				"The regret sets in almost immedately as the robotics ",
				"pick the clothes off the top of the pile you're hiding under ",
				"and feed them into the presser.  Soon the robotic grippers grab you ",
				"and feed you into the presser as well.",
				"\n\n",
				"Then they fold you, but you're not a alive for that part.",
				"\n\n",
				"You are dead."
			].join("");
		}
		else if (binName == "presser")
		{
			climbIntoBin = 
			[
				"You climb into the laundry bin waiting in front of the presser/folder.  ",
				"It's not easy.  The presser loads the bin with folded clothes as it works, ",
				"so the bin is already almost full.  ",
				"You try to burrow under the folded clothes, ",
				"but the folded clothes form hard strata that are not easy to burrow into."
			].join("");

			vadikSeesPlayerOrGoofsOff = vadikSeesPlayerTryingToHideInFoldedLaundry;

			fateOfBinPlayerIsIn = "You are dead.";
		}
		else if (binName == "pressed")
		{
			climbIntoBin = 
			[
				"You climb into the laundry bin full of outgoing pressed laundry ",
				"waiting delivery to its respective owners.",
				"You try to burrow under the folded clothes, but it's not easy.  ",
				"The folded clothes form hard strata that are not easy to burrow into."
			].join("");

			vadikSeesPlayerOrGoofsOff = vadikSeesPlayerTryingToHideInFoldedLaundry;

			fateOfBinPlayerIsIn = "You are dead.";
		}

		var message = 
		[
			climbIntoBin,
			"\n\n",
			vadikEnters,
			"\n\n",
			vadikSeesPlayerOrGoofsOff,
			"\n\n",
			fateOfBinPlayerIsIn
		].join("");

		u.messageEnqueue(message);
	}

	placeEnemyShipLaundry_GetInMachine
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message =
		[
			"The laundry machines have safety interlocks to ensure that ",
			"nothing gets inside them except what's in the laundry bins.  ",
			"That makes sense.  The Vadik are a proud warrior culture, ",
			"and nobody wants to die doing laundry."
		].join("");

		u.messageEnqueue(message);
	}

	placeEnemyShipLaundry_GetInVent
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message =
		[
			"todo"
		].join("");

		u.messageEnqueue(message);
	}

	placeFriendlyShipBridge_HideBehindCaptainsChair
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		u.messageEnqueue
		(
			[
				"You conceal yourself behind the captain's chair.  ",
				"You reflect that this chair is so big you could have brought a couple friends."
			].join("")
		);
	}

	placeFriendlyShipBridge_SearchBody
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		u.messageEnqueue("You'll have to be more specific.");
	}

	placeFriendlyShipBridge_SitInChair
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		u.messageEnqueue("Nah.  You don't want to get dead-people germs.");
	}

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
				[
					"As the airlock door closes behind you, ",
					"and the air is pumped out of the chamber, ",
					"you suddenly realize you're not wearing a space suit.",
					"\n\n",
					"The next few seconds are not pleasant for you.  ",
					"\n\n",
					"You are dead."
				].join("")
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
			portalCloset.unlock().descriptionWhenExaminedSet("The door to the left closet is open.");
		}
		else
		{
			message = "The door of the left closet slides closed.";
			portalCloset.lock().descriptionWhenExaminedSet("The door to the right closet is closed.");
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
			portalCloset.unlock().descriptionWhenExaminedSet("The door to the right closet is open.");
		}
		else
		{
			message = "The door of the right closet slides closed.";
			portalCloset.lock().descriptionWhenExaminedSet("The door to the right closet is closed.");
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
			[
				"When you press the button, the platform carrying the escape pod ",
				"sinks back beneath the floor, ",
				"and the trapdoor slides closed over it."
			].join("");

			portalPod.hide().block();
		}
		else
		{
			message =
			[
				"When you press the button, the trapdoor in the floor slides open ",
				"and a platform under it rises up to floor level.  ",
				"On the platform stands a single-person escape pod."
			].join("");

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
				[
					"Through the window, you see the docking bay doors slide open.  ",
					"Beyond them you see the darkness of space."
				].join("")
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
				[
					"The elevator door does not open as you approach.  ",
					"It must be locked."
				].join("")
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
			[
				"You're in deep space.  Not to be a fun sponge or anything, ",
				"but there's nothing outside worth opening the door for."
			].join("");
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
			[
				"deep space, adorned with thousands of stars, ",
				"plus the distant, still-glowing wreckage of the Pax Aeterna.  ",
				"A tragic end for such a proud vessel and her doughty crew, ",
				"but, from this distance, you must admit ",
				"it has a certain undeniable beauty to it."
			].join("");
		}
		else if (portalDoorPlaceDestinationName == Places.friendlyShipDockingBayHangar_Name() )
		{
			message +=
			[
				"the docking bay of the Pax Aeterna, ",
				"whose better days are behind it now.  ",
				"You suspect there aren't any days ahead of it, ",
				"better, worse, or otherwise."
			].join("");
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
				"smashes into the cargo bay doors, ",
				"which some idiot left closed, ",
				"and explodes.",
				"\n\n",
				"You are dead."
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
				"part of the fleet of the Inner Orion Arm Commonwealth, ",
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
				"called a 'Stellar Juvenator' to... somewhere or other.  ",
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
				"As you bend down to check on the man in the science uniform, ",
				"his eyes spring open.  He stares at you wildly, ",
				"weakly clutching and unclutching his fingers, ",
				"then points shakily at the shelves of data cartridges ",
				"and harshly croaks out the words 'Pandimensional Metacalculus for Hypernavigators'.  ",
				"\n\n",
				"Then he dies.  You think.  You're not a doctor.  ",
				"But when the roto-scrubber looked as bad as he does, ",
				"you had to get a new roto-scrubber.",
				"\n\n",
				"Blatz, those are some heavy last words.  You better write them down, ",
				"in case you somehow survive this and someone in his family ",
				"asks about this moment."
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
			[
				"Right, I forgot that you failed Remedial Lib-Sci 0001.  ",
				"Try adding the title of the tape you want retrieved."
			].join("");
		}
		else if (cartridgeNameTyped == "pandimensional metacalculus for hypernavigators")
		{
			message =
			[
				"You type 'Pandimensional Metacalculus for Hypernavigators' ",
				"(without the quotes: protip) ",
				"into the control console's keyboard.  ",
				"The retrieval robot skitters into action, ",
				"traversing the shelves with a fluid rhythm of limbs ",
				"that makes you feel both jealous and a little grossed-out.  ",
				"It plucks a data tape from its place ",
				"and returns it to the console, ",
				"where it drops it into the retrieval hopper.  ",
				"\n\n",
				"See?  You just don't get that kind of satisfying clatter ",
				"with solid-state."
			].join("");

			p.itemAdd
			(
				Item.fromNamesAndDescription
				(
					[ "cartridge", "data cartridge", "cart", "data cart" ],

					[
						"A label printed on this data cartridge reads ",
						"'Pandimensional Metacalculus for Hypernavigators'.  ",
						"Growing up, you were always more bullied than bully, ",
						"but just reading its title makes you want to beat up this data cartridge."
					].join("")
				).commandAdd
				(
					Command.fromTextsAndScriptExecuteName
					(
						[
							"put cartridge in reader",
							"put cartridge in slot",
							"use cartridge on reader"
						],
						Scripts.Instance().itemDataCartridge_PutInSlot.name
					)
				)
			);
		}
		else
		{
			message =
			[
				"The cartridge-retrieval control console buzzes politely, ",
				"to the extent that a buzz can be polite, ",
				"and displays an error message: ",
				"'No cartridge with the specified title could be found.'"
			].join("");
		}

		u.messageEnqueue(message);
	}

	placeFriendlyShipLibrary_UseConsole(u: Universe, w: World, p: Place, c: Command): any
	{
		var message =
		[
			"Try typing something, like 'type whatever'.  ",
			"\n\n",
			"Yes, I know what you're thinking: ",
			"It's hundreds of years in the future, ",
			"and I still have to type stuff?  ",
			"And what, are they still using QWERTY?  ",
			"\n\n",
			"Don't be stupid.  This is a naval-grade data retrieval console, ",
			"not some third-hand clicky-clack from a high-school keyboarding class.  ",
			"No, it doesn't use QWERTY.  It uses GHAFTR.  The GHAFTR keyboard layout ",
			"is proven to allow the expert typist to type 0.43% faster than QWERTY.  ",
			"\n\n",
			"Granted, there are only twelve known GHAFTR experts, ",
			"and that's counting four dead ones.  ",
			"For everyone else, typing on a GHAFTR keyboard ",
			"takes about four times as long.  So you'd better get started."
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

	placePlanetCavernsBarrier_GoBarrier
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var emplacementBarrier = p.emplacementByName("laser barrier");

		var barrierIsActivated = emplacementBarrier.activated();

		var message: string;

		if (barrierIsActivated)
		{
			message =
			[
				"You walk brazenly through the laser barrier.  ",
				"Your roommate used to say that it's all about confidence.  ",
				"And, much to your amazement, confidence works!  ",
				"You pass through the beams of light ",
				"and reach the other side in one piece.  ",
				"\n\n",
				"For a few moments.  Then you split into several pieces, well, slices really, ",
				"like a cartoon character who just had a high-speed collision ",
				"with a cheese cutter.",
				"\n\n",
				"You are dead."
			].join("");

			w.end();
		}
		else
		{
			var portalBarrier = p.portalByName("barrier");
			portalBarrier.goThrough(u, w);
		}

		u.messageEnqueue(message);
	}

	placePlanetCavernsBarrier_PutGlassInBarrier
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var emplacementBarrier = p.emplacementByName("barrier");

		var barrierIsActivated = emplacementBarrier.activated();

		var message: string;

		var itemGlass = w.agentPlayer.itemByName("glass");
		
		if (itemGlass == null)
		{
			message = "You don't have any such thing in your possession.";
		}
		else if (barrierIsActivated)
		{
			message =
			[
				"You gingerly hold the shard of reflective glass ",
				"in one of the beams of the laser barrier.  ",
				"The beam partially reflects off the semi-mirrored surface, ",
				"and, due to the poorly chosen angle you're holding the glass at, ",
				"almost burns your toes off.",
				"\n\n",
				"You carefully angle the glass so that the reflected beam ",
				"returns to its point of origin and impinges on its own emitter port, ",
				"which, after a few seconds of such exposure, ",
				"melts, disabling the beam coming out of it.",
				"\n\n",
				"You repeat the process with the other beams.  ",
				"In a few moments, the barrier is no longer functional.",
				"\n\n",
				"The instructor of your Remedial Laser Pragmatics class ",
				"would be proud, you think.  Though it's a little hard ",
				"to read his expression since you cauterized his eyebrows."
			].join("");

			var emplacementBarrier = p.emplacementByName("barrier");
			emplacementBarrier.deactivate();
		}
		else
		{
			message =
			[
				"The barrier is already disabled.  Let it go."
			].join("");
		}

		u.messageEnqueue(message);
	}

	placePlanetCavernsDrips_Update
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var turnsSoFar = w.turnsSoFar;

		var drippingOrNot =
		[
			(turnsSoFar % 2 != 0),
			(turnsSoFar % 3 != 0),
			(turnsSoFar % 5 != 0)
		];

		var placeIsCurrentlyDripping = false;

		if (p.name == Places.planetCavernsDrips1_Name())
		{
			placeIsCurrentlyDripping = drippingOrNot[0];
		}
		else if (p.name == Places.planetCavernsDrips2_Name())
		{
			placeIsCurrentlyDripping = drippingOrNot[1];
		}
		else if (p.name == Places.planetCavernsDrips3_Name())
		{
			placeIsCurrentlyDripping = drippingOrNot[2];
		}

		if (placeIsCurrentlyDripping)
		{
			message =
			[
				"As you walk under one of the intermittent sets of drips, ",
				"several of them fall onto your head. ",
				"\n\n",
				"It turns out the drops are made of horrifically strong acid. ",
				"The first few burrow through your skin, then your skull, ",
				"then your brain.  You lose control of your limbs and fall, ",
				"which just makes your body a larger target for more drips, ",
				"which drill more tiny holes in you, ",
				"which kills you. ",
				"\n\n",
				"You are dead."
			].join("");

			w.end();
		}
		else
		{
			var message =
			[
				"The first, westernmost set of drips is currently "
					+ (drippingOrNot[0] ? "not " : "") + "dripping.  ",

				"The second, middle set of drips is currently "
					+ (drippingOrNot[1] ? "not " : "") + "dripping.  ",

				"The third, easternmost set of drips is currently "
					+ (drippingOrNot[2] ? "not " : "") + "dripping."

			].join("\n\n");
		}

		u.messageEnqueue(message);

	}

	placePlanetCavernsGeyser_PutRockInGeyser
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message: string;

		var emplacementGeyser = p.emplacementByName("geyser");
		var rockIsAlreadyInGeyser =
			emplacementGeyser.itemByName("rock") != null;

		if (rockIsAlreadyInGeyser)
		{
			message =
			[
				"You already put a rock in the geyser.  ",
				"Isn't that enough for you?  No?  ",
				"Wait a minute, you don't even have another rock, ",
				"do you?  What sick game are you playing?"
			].join("");
		}
		else if (w.agentPlayer.itemByName("rock") != null)
		{
			message =
			[
				"You jam the pointier end of the rock into the geyser, ",
				"stopping the flow of steam, but not before it burns ",
				"your fingers slightly.  ",
				"\n\n",
				"As you stick the burned hand in your mouth to dull the pain, ",
				"you hear some labored mechanical noises from inside ",
				"the rock wall to the west.  ",
				"A previously hidden door appears in the stone ",
				"and slides aside to reveal a passage leading deeper into the cave."
			].join("");

			var portalDoor = p.portalByName("door");
			portalDoor.show().unblock();
		}
		else
		{
			message = 
			[
				"You don't see any rock here!  ",
				"\n\n",
				"Maybe I should explain how all this works again.  ",
				"I'm not, like, a genie.  I can't magic up rocks out of nothing.  ",
				"If you want to put a rock into a geyser, ",
				"you have to find a rock somewhere, pick it up, ",
				"take it to someplace where a geyser already is, ",
				"and then jam it in.  Manually."
			].join("");
		}

		u.messageEnqueue(message);
	}

	placePlanetCavernsGrating_CrossGrating
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var itemCanOfSham = p.itemByName("can of sham");
		var monsterIsDistracted = itemCanOfSham != null;

		var message: string;

		if (monsterIsDistracted)
		{
			message =
			[
				"You quickly cross over the grating while the monster beneath it is distracted.  ",
				"Just in time, too.  Just as you step off the grating, ",
				"the flaling tentacle manages to split open the can of Sham, ",
				"its contents falling in chunks through the grating.  ",
				"The slurping noises that follow are indescribably disgusting.",
				"But hey, at least somebody out there enjoys Sham (tm)."
			].join("")
		}
		else
		{
			message =
			[
				"Just as you step onto the grating, ",
				"a tentacle reaches through one of the holes ",
				"and wraps itself tightly around your ankle.  ",
				"You are alarmed by this, but then you realize that ",
				"you are far too large to be pulled through any of these holes.",
				"\n\n",
				"And that's true, as far as it goes, ",
				"but unfortunately the tentacle is so strong ",
				"that it pulls you through the hole anyway, ",
				"despite the incompatible sizes. ",
				"The parts of you that don't fit through the hole get peeled off ",
				"of the parts of you that do fit ",
				"and flop down onto the grating, ",
				"where other tentacles grab those parts, then repeat the process ",
				"until all your parts are gone.",
				"\n\n",
				"It's kind of like being fed through a pasta extruder, ",
				"but if somebody added the marinara sauce before they shaped the noodles.",
				"\n\n",
				"You are dead."
			].join("");

			w.end();
		}

		u.messageEnqueue(message);

		if (w.isOver == false)
		{
			var portal = p.portalByName("grating");
			portal.goThrough(u, w);
		}
	}

	placePlanetCavernsGrating_PutCanOfShamOnGrating
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message: string;

		var agentPlayer = w.agentPlayer;

		var itemCanOfSham = agentPlayer.itemByName("can of sham");

		if (itemCanOfSham == null)
		{
			message = 
			[
				"You don't have any Sham (tm) on you at the moment.  ",
				"You take a moment to add it to your mental shopping list.  ",
				"To be honest, though, if you ever again get close enough to civilization ",
				"to visit a food dispensary, you fully intend to just palm this whole adventure ",
				"off on somebody more qualified."
			].join("");
		}
		else
		{
			agentPlayer.itemDropQuantityIntoPlace(itemCanOfSham, 1, p);

			message =
			[
				"You put the can of Sham (tm) on the grating, ",
				"and immediately, a tentacle reaches through one of the holes ",
				"wraps itself tightly around the can, ",
				"and tries to pull it through.  ",
				"But the size and shape of the can, together with ",
				"the high-quality, fallout-shelter-gauge metal it's made of, ",
				"prevents the tentacle from pulling it through.",
				"\n\n",
				"Or at least not immediately.  ",
				"However, the frustrated flailing of the tentacle ",
				"as it bangs the can against the grating ",
				"is putting large dents in the can, ",
				"and some of the meat simulant inside is visible through the forming cracks.",
				"It won't be long now."
			].join("");
		}

		u.messageEnqueue(message);
	}

	placePlanetCavernsPool_DrinkFromPool
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message =
		[
			"Not all transparent liquids are water, you know.  ",
			"Very few of them are, in fact.  ",
			"Only one, to be petty about it.",
			"\n\n",
			"For example, this particular transparent liquid was a very strong acid, ",
			"which melts you from the inside out, which is, to look on the bright side, ",
			"at least a novel way to die.",
			"\n\n",
			"You are dead."
		].join("");

		u.messageEnqueue(message);

		w.end();
	}

	placePlanetCavernsSteamworks_InsertKeyInSkimmer
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message =
		[
			"You put the key into a similarly-shaped hole in the skimmer control panel, ",
			"then stare at the controls in confusion for a few moments ",
			"before you figure out what to do next. ",
			"Then you turn the key sharply clockwise for a moment, ",
			"and the skimmer's engines hum to life.  Whoa, retro.",
			"\n\n",
			"The 100-kilometer trip to the nearest settlement is uneventful, ",
			"your skimmer gliding swiftly and effortlessly a couple dozen centimeters ",
			"above the surface of the sand.  ",
			"There are a few rocks along the way, ",
			"but you skillfully avoid them.  Most of them.  A lot of them, anyway.  ",
			"You must admit you aren't great at the action parts.  ",
			"You wish there was a way to skip them.",
			"\n\n",
			"A half-hour or so later, you and your slightly-worse-for-the-wear ",
			"secondhand sand sled slide up to the shield of a small settlement.  ",
			"Automated equipment detects the skimmer's approach, ",
			"and an aperture in the shield opens just long enough for you to pass through.",
			"\n\n",
			"You park the skimmer outside of a bar.  That's just like you.",
		].join("");

		u.messageEnqueue(message);

		var player = w.agentPlayer;
		var itemSkimmerKey = player.itemByName("skimmer key");
		player.itemRemove(itemSkimmerKey);

		w.placeCurrentSetByName(Places.planetSettlementBarFront_Name() );
	}

	placePlanetCavernsProjectionRoom_Update
	(
		u: Universe, w: World, p: Place, c: Command
	)
	{
		var agentPlayer = w.agentPlayer;

		var itemCaveBeastChunk = agentPlayer.itemByName("cave beast claw");
		var playerHasEvidenceOfKill = (itemCaveBeastChunk != null);

		var itemGadget = agentPlayer.itemByName("gadget");
		var translatorIsActive = itemGadget.activated();

		var messagePlayerPresentsProofOfKill =
		[
			"You hold up the claw of the deceased beast, and ask the giant head ",
			"if it's good enough.",
			"\n\n",
			"'ER... YES, ' the head responds.",
			"\n\n",
			"The projection disappears, and a doorway opens in the north wall of the cave.  ",
			"\n\n",
			"Its purpose fulfilled, you discard the chunk of flesh into the shadows.  ",
			"After your time in the desert sun, you smell quite bad enough on your own."
		].join("");

		var portalNorth = p.portalByName("north");

		if (p.hasBeenVisited() == false)
		{
			p.visit();

			var message =
			[
				"You step into a pitch-black space.  ",
				"From the feel of the air around you, ",
				"it seems to be perhaps twenty meters across.  ",
				"You stand still a while, waiting for your eyes to adjust, ",
				"but it actually seems to get a bit darker.",
				"\n\n",
				"Suddenly, a phosphorescent image of a huge alien head, ",
				"five meters from chin to scalp, kindles into existence ",
				"in the center of the chamber.  You stagger back a bit in shock, ",
				"at the apparent size of his pores if nothing else, ",
				"then cover your ears as the apparition begins to speak.",
				"\n\n",
			].join("");

			if (translatorIsActive)
			{
				message +=
				[
					"As the alien speaks, presumably in his own language, ",
					"the gadget you found in the closet on the Pax Aeterna ",
					"begins speaking just after him, in similar inflections.  ",
					"Apparently it's been a translator all along.  ",
					"\n\n",
					"'YOU HAVE DONE WELL MAKING IT THIS FAR, OUTWORLDER,' ",
					"bellows the head, with excessive volume, 'THIS FACILITY IS DESIGNED ",
					"TO WINNOW OUT THOSE OF LOW INTELLIGENCE.  BUT YOU CLEARLY ",
					"HAVE NEED OF OUR ASSISTANCE.  WE DO NOT OFFER SUCH HELP CHEAPLY.  ",
					"YOU MUST OFFER RECOMPENSE.  IN A CAVE ON THE EAST SIDE OF THE CLIFFS ",
					"ABOVE THIS FACILITY, THERE IS A BEAST.  IT IS INCONVENIENT TO US.  ",
					"KILL IT, THEN RETURN HERE WITH PROOF OF ITS DEMISE.'  ",
					"\n\n",
				].join("");

				if (playerHasEvidenceOfKill)
				{
					message += messagePlayerPresentsProofOfKill;
					portalNorth.unblock().show();
				}
			}
			else
			{
				message +=
				[
					"Whatever the alien is saying, he's sure saying it loud.  ",
					"But unfortunately, he's not saying it in any language you recognize.",
					"\n\n",
				].join("");
			}

			if (playerHasEvidenceOfKill == false || translatorIsActive == false)
			{
				message +=
				[
					"As the alien finishes his speech, ",
					"a trap door in the floor irises open, and you fall through it.  ",,
					"You are whisked through some, like, pneumatic tubes, ",
					"and then you feel yourself rising upward for a sustained stretch.  ",
					"\n\n",
					"You emerge into the sunlight on top of the cliffs of the Ekkis II desert, ",
					"in the same place, between the two broken stone horns, ",
					"from which you first descended into the caverns.  ",
					"You can't puzzle out how that works, mechanically, but here you are."
				].join("");

				w.placeCurrentSetByName(Places.planetCliffsTopNortheast_Name() );
			}
		}
		else // hasBeenVisited == true
		{
			message +=
			[
				"You step back into the darkness of the projection chamber.  ",
				"The image of the alien head springs back into existence, ",
				"and speaks.",
				"\n\n",
			].join("");

			if (translatorIsActive)
			{
				message +=
				[
					"'YOU HAVE RETURNED.  DO YOU HAVE PROOF OF THE BEAST'S DEATH?  ",
					"IF SO, SHOW IT TO ME.'",
					"\n\n"
				].join("");

				if (playerHasEvidenceOfKill)
				{
					message += messagePlayerPresentsProofOfKill;
					portalNorth.unblock().show();
				}
			}
			else
			{
				message +=
				[
					"The alien's speech this time is much shorter, ",
					"and seems to have the cadence of a question.  ",
					"As he finishes, you stand silently for a few seconds, ",
					"feeling like you did just before you flunked out ",
					"of Remedial Martian class.",
					"\n\n",
					"After a few more seconds, the alien makes an unmistakable scoffing noise, ",
					"and then the trap-door in the floor irises open under you again.  ",
					"In a few seconds, you're back at the top of the cliff.  ",
					"Maybe you've been given a second chance?  To do what, you're not sure."
				].join("");

				w.placeCurrentSetByName(Places.planetCliffsTopNortheast_Name() );
			}
		}

		u.messageEnqueue(message);
	}

	placePlanetCavernsSteamworks_TalkToAlien
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message =
		[
			"The alien greets you from the catwalk above, ",
			"and explains that it is part of an ancient race ",
			"that once ruled this planet, but now lives underground.  ",
			"You briefly wonder if you have to feel guilty about this, ",
			"but the alien has already moved on to thank you for destroying the cave beast, ",
			"and, as a reward, throws down to you the starter key to a sand skimmer ",
			"that the alien says should allow you to reach the nearest settlement ",
			"without being eaten by sand-swimmers.  ",
			"The alien then turns and walks off into the depths of the steamworks, ",
			"but not before muttering something about the skimmer's throttle sticking a bit."
		].join("");

		u.messageEnqueue(message);

		p.itemAdd(Items.Instance().SkimmerKey);
	}

	placePlanetCliffsBottomNorthwestWestSide_LookInHole
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message =
		[
			"You cross over to the cliff base and put your head near the hole ",
			"to see what you can see inside.  ",
			"As your eyes adjust to the relative darkness, ",
			"you think you see something.  ",
			"You catch the gleam of something whitish, shiny, triangular, and smallish, ",
			"maybe a couple centimeters long.  ",
			"Whatever it is, you now start to notice that there's more than one.  ",
			"Actually, there's a whole bunch of them.",
			"And they're coming closer.",
			"\n\n",
			"Yeah, they were teeth.",
			"\n\n",
			"You are dead."
		].join("");

		u.messageEnqueue(message);
		
		w.end();
	}

	placePlanetCliffsCaveInterior_GoEast
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{

		var message =
		[
			"You stumble a few hesitant steps forward into the darkness of the cave.",
			"Even though you've only moved a few meters deeper into the cave, ",
			"the smell has intensified to an almost unbearable degree.  ",
			"Behind you, the light from the cave mouth seems very inviting.",
			"While you were very down on it before, you find that ",
			"even a few moments in this cave has really given you a new appreciation ",
			"for the burning sun of the desert outside.",
			"\n\n"
		].join("");

		var caveBeastIsAlive = (p.agentByName("beast") != null);

		if (caveBeastIsAlive)
		{
			message +=
			[
				"In a few moments, a cave monster either knocks you unconscious ",
				"or possibly decapitates you.  Its hard to tell in the dark.",
				"\n\n",
				"You are dead."
			].join("");

			w.end();
		}
		else
		{
			message +=
			[
				"You're no master spelunker, but you know a smelly empty hole when you feel it.",
				"That cave beast wasn't a dragon.  There no hoard of treasure back here, ",
				"Unless you covet cave beast droppings, and, while you have a lot of faults, ",
				"that's not one of them.",
				"\n\n",
				"After a few more moments you head back to the mouth of the cave."
			].join("");
		}

		u.messageEnqueue(message);
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

		var portal = p.portalByName("out");
		portal.goThrough(u, w);
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

		var agentCaveBeast = p.agentByName("cave beast");

		var caveBeastIsStillAlive = (agentCaveBeast != null);

		if (caveBeastIsStillAlive)
		{
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
				[
					"From far back in the cave, you hear a slapping noise, ",
					"as of spatulate feet running across rocks."
				].join("");
			}
			else if (turnsSinceLastEnteringCave == 1)
			{
				message =
				[
					"That slapping-footsteps noise you heard coming from the back of the cave ",
					"is now coming from the middle of the cave, ",
					"and seems to be heading for the front of the cave, ",
					"which makes you uncomfortable, because that's where you are.  ",
					"In the shadows, you can just make out something big coming toward you."
				].join("");
			}
			else if (turnsSinceLastEnteringCave == 2)
			{
				message =
				[
					"A nightmarish beast charges into the dim light at the mouth of the cave.  ",
					"It looks like a bear married a frog married a spider, ",
					"and then their offspring ate all three of its parents ",
					"and then got a wicked sunburn on its full-body excema.",
					"\n\n",
					"You think it would have killed you already, ",
					"but luckily even the low light here seems to blind it, stun it, maybe hurt it.  ",
					"It staggers a bit, throwing one claw over its eyes.  ",
					"It still has several other claws left over to deal with you, though.  ",
					"And it's still moving toward you."
				].join("");
			}
			else if (turnsSinceLastEnteringCave == 3)
			{
				message =
				[
					"Well, you waited too long.  ",
					"If you were hoping the bellowing, charging claw monster ",
					"would turn out to be friendly, I'm afraid I must inform you ",
					"that this is not that kind of game.",
					"\n\n",
					"You are dead."
				].join("");

				w.end();
			}

			u.messageEnqueue(message);

			turnsSinceLastEnteringCave++;

			w.agentPlayer.stateGroup.stateWithNameSetToValue
			(
				stateName, turnsSinceLastEnteringCave
			);
		}
	}

	placePlanetCliffsCaveInterior_ThrowCanteenAtBeast
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message =
		[
			"You throw your canteen full of pressurized hydrogen gas ",
			"toward the charging beast.  ",
			"Despite the darkness, you clearly see the gleam of its teeth ",
			"as it snaps at the incoming tidbit ",
			"like a domestic pet grabbing a treat out of the air, ",
			"clamping its jaws around the bottle and piercing its sides.",
			"\n\n",
			"The canteen explodes.  So does the beast.  So do you, almost.",
			"\n\n",
			"Ears ringing fiercely, you pick yourself up off the floor of the cave ",
			"and survey the aftermath.  There are tiny bits of cave beast everywhere, ",
			"glued to various cave surfaces with the beast's formerly-internal fluids.  ",
			"A single claw that somehow miraculously survived the explosion relatively intact ",
			"lies near the mouth of the cave. "
		].join("");

		p.agentRemove(p.agentByName("beast"), w);
		var itemCaveBeastClaw = Items.Instance().CaveBeastClaw;
		p.itemAdd(itemCaveBeastClaw);

		u.messageEnqueue(message);
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
			[
				"As you walk across the stone arch, it groans under your weight.  ",
				"New cracks appear in the stone.  ",
				"The existing cracks get longer, wider, and deeper, ",
				"and not in a sexy way."
			].join("");
		}
		else if (timesBridgeCrossed == 1)
		{
			message =
			[
				"As you walk across the stone arch again, ",
				"all the cracks in the rock get bigger.  ",
				"Which is just what you expected to happen.  ",
				"It's always gratifying when experiment agrees with theory."
			].join("");
		}
		else if (timesBridgeCrossed == 2)
		{
			message =
			[
				"As you walk across the stone arch again, ",
				"all the cracks in the rock get bigger.  ",
				"Which is just what you expected to happen.  ",
				"It's always gratifying when experiment agrees with theory."
			].join("");
		}
		else if (timesBridgeCrossed == 3)
		{
			message =
			[
				"You walk across the stone arch yet again. ",
				"This time, some of the cracks get so big ",
				"that pieces of stone actually start falling off of the arch ",
				"and make little puffs as they impact the sand below.  ",
				"\n\n",
				"This is starting to remind you of that time the ranger ",
				"yelled at you at Delicately Arrayed Crystals Galactic Park."
			].join("");
		}
		else if (timesBridgeCrossed == 4)
		{
			message =
			[
				"Against your every better instinct, you start to walk ",
				"across the stone arch yet again. ",
				"As you approach the apex, a shower of little stones ",
				"falls to the desert below.  Then, with a groaning, rattling roar, ",
				"The entire thing collapses, and it and you plummet to the desert below.  ",
				"\n\n",
				"You try jumping up in the air just before the boulder you're standing on ",
				"hits the sand, like your uncle used to say ",
				"you can do with a falling elevator car, ",
				"but either your uncle or your timing is wrong, ",
				"because it doesn't work.  ",
				"\n\n",
				"It's academic anyway, since a bunch more boulders fall on top of you.",
				"\n\n",
				"You are dead."
			].join("");

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

	placePlanetSettlementBarFront_GetSkimmerKey
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message: string;

		var emplacementSkimmer = p.emplacementByName("skimmer");
		var itemSkimmerKey = emplacementSkimmer.itemByName("skimmer key");
		var keyHasAlreadyBeenTaken =
			itemSkimmerKey == null;

		if (keyHasAlreadyBeenTaken)
		{
			message =
			[
				"You've already taken the key, remember?  ",
				"\n\n",
				"Are you okay?  Maybe you need a neurologist.  ",
				"Or at least some ground tarkan root.  ",
				"It's the all-natural memory aid that the sky-monks of Shadalon ",
				"have depended on for centuries."
			].join("");
		}
		else
		{
			message =
			[
				"You remove the skimmer's ignition key ",
				"from the skimmer, and put it in your pocket.  ",
				"\n\n",
				"Good thinking.  I'd say this looks like a rough ",
				"part of town, but that would imply that there are parts ",
				"of this town that aren't rough.  ",
				"And, looking around, I just can't make that promise."
			].join("")

			var agentPlayer = w.agentPlayer;
			agentPlayer.itemAdd(itemSkimmerKey);
		}

		u.messageEnqueue(message);
	}

	placePlanetSettlementBarFront_RefuseToSellSkimmer
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var emplacementSkimmerEnthusiast =
			p.emplacementByName("skimmer enthusiast");
		var stateName = "OffersToBuySkimmerRefusedSoFar";
		var stateGroup = emplacementSkimmerEnthusiast.stateGroup;

		var offersToBuySkimmerRefusedSoFar = parseInt
		(
			stateGroup.stateWithNameGetValue(stateName)
		);

		offersToBuySkimmerRefusedSoFar++;
		stateGroup.stateWithNameSetToValue(stateName, offersToBuySkimmerRefusedSoFar);
	}

	placePlanetSettlementBarFront_SellSkimmer
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var items = Items.Instance();

		var itemsToTradeForSkimmer =
		[
			items.Quatloos.clone().quantitySet(30)
		];

		var emplacementSkimmerEnthusiast =
			p.emplacementByName("skimmer enthusiast");
		var stateName = "OffersToBuySkimmerRefusedSoFar";
		var stateGroup = emplacementSkimmerEnthusiast.stateGroup;

		var offersToBuySkimmerRefusedSoFar = parseInt
		(
			stateGroup.stateWithNameGetValue(stateName)
		);

		if (offersToBuySkimmerRefusedSoFar >= 1)
		{
			itemsToTradeForSkimmer.push(items.CouponBook);
		}

		if (offersToBuySkimmerRefusedSoFar >= 2)
		{
			itemsToTradeForSkimmer.push(items.Jetpack);
		}

		var itemsToTradeForSkimmerAsString =
			itemsToTradeForSkimmer.map(x => x.nameAndQuantity() ).join(",");

		var message =
		[
			"You hand the skimmer key to the ground-car enthusiast, ",
			"and he hands you the ",
			itemsToTradeForSkimmerAsString,
			", and you both shake hands.  ",
			"(You definitely don't have enough hands for this, but never mind.)  ",
			"He then gets into the skimmer, turns the key, ",
			"and soon vanishes into the distance.",
			"\n\n",
			"Where the heck is he even going?"
		].join("");

		u.messageEnqueue(message);

		var player = w.agentPlayer;
		player.itemWithNameRemove("skimmer key");
		player.itemsAdd(itemsToTradeForSkimmer);

		p.emplacementWithNameRemove("skimmer");
		p.emplacementWithNameRemove("skimmer enthusiast");
	}

	placePlanetSettlementBarFront_TalkToPerson
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message =
		[
			"The being gazes at your sand-skimmer longingly, almost lustfully.",
			"\n\n",
			"'Hey, nice skimmer.  That the model with the dual-fuel inlet-outlets?'",
			"\n\n",
			"Despite the fact that you're pretty sure ",
			"what he just said is literal nonsense, you nod wisely ",
			"the way you always do around ground-vehicle enthusiasts.",
			"\n\n",
			"He runs a hand sensually, almost pornographically, along its front fender.  ",
			"'Would you be willing to sell it?'",
			"\n\n",
			"It's an intriguing offer.  ",
			"On the one hand, it doesn't really belong to you. ",
			"On the other hand, you did sort of blow up a cave monster for it.  ",
			"And the original owners probably don't don't have any use for it, ",
			"living in a hole under a cliff maze as they do.  ",
			"And it is almost completely out of fuel, ",
			"and you have no money to refill it, ",
			"so it's not doing you, or anybody else, any good as is.",
			"\n\n",
			"After a moment's thought, you ask how much 'she' is worth to him.  ",
			"On the off-chance that calling an inanimate object by a feminine pronoun ",
			"doesn't sell the impression that you're a mechanically-minded man, ",
			"you lean casually against the headlight, ",
			"which promptly cracks off and hangs limply from its wiring.",
			"\n\n",
			"The prospective buyer offers you 30 quatloos.  ",
			"(Probably it would have been higher before the headlight.)  ",
			"What do you say, yes or no?"
		].join("");

		var emplacementSkimmerBuyer = p.emplacementByName("person");
		var scripts = Scripts.Instance();
		emplacementSkimmerBuyer.commandWithTextRemove("talk to person");
		emplacementSkimmerBuyer.commandAddFromTextsAndScriptName
		(
			[ "say yes", "yes", "sell skimmer", "deal" ],
			scripts.placePlanetSettlementBarFront_SellSkimmer.name
		)
		emplacementSkimmerBuyer.commandAddFromTextsAndScriptName
		(
			[ "say no", "no", "refuse", "no deal" ],
			scripts.placePlanetSettlementBarFront_RefuseToSellSkimmer.name
		);

		u.messageEnqueue(message);
	}

	placePlanetSettlementBarFront_Update
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message: string;

		if (p.hasBeenVisited())
		{
			var emplacementSkimmer = p.emplacementByName("skimmer");

			if (emplacementSkimmer == null)
			{
				message =
				[
					"You're pretty sure this is where you parked your skimmer.  ",
					"But it's not here any more.  You probably should have taken ",
					"the key out of the ignition."
				].join("");
			}
			else
			{
				var stateName = "HasSecondSaleOfferForSkimmerBeenRefused";
				var hasSecondSaleOfferBeenRefused =
					p.stateGroup.stateWithNameGetValue(stateName);

				if (hasSecondSaleOfferBeenRefused == false)
				{
					message =
					[
						"That guy who tried to buy your skimmer ",
						" is here.  ",
						"'Hey,' he says, 'look.  I'm willing to throw in",
						"this jetpack.  It's a real good jetpack.  ",
						"So, my final offer is, 30 quatloos, a jetpack, ",
						"and the coupon book.  What do you say?"
					].join("");
				}
			}
		}
		
		u.messageEnqueue(message);
	}

	placePlanetSettlementBarInterior_BuyDrink
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message: string;

		var itemQuatloos = w.agentPlayer.itemByName("quatloos");

		var quatloosPerBeer = 2;

		if (itemQuatloos == null || itemQuatloos.quantity < quatloosPerBeer)
		{
			message = "You don't have enough quatloos!"
		}
		else
		{
			message =
			[
				"You buy a bru-ale and sit at the bar to drink it.  ",
				"You're normally not much of a bru-ale guy, ",
				"but you have to admit that this is a bit better ",
				"than dying of thirst in the desert.",
				"\n\n",
				"As you sip your drink, and nibble at the bar snacks, ",
				"you listen idly to the conversations ",
				"of your fellow patrons."
			].join("");

			var stateName = "AnecdotesHeardSoFar";
			var placeStateGroup = p.stateGroup;
			var anecdotesHeardSoFar =
				placeStateGroup.stateWithNameGetValue(stateName);

			if (anecdotesHeardSoFar == null)
			{
				anecdotesHeardSoFar = 0;
			}

			var barAnecdote: string;

			if (anecdotesHeardSoFar == 0)
			{
				barAnecdote =
				[
					"You hear a joke that ends with the punchline, ",
					"'Aldebaran, hell!  That's my WIFE!'  ",
					"The joke really only works in Ancient Farconian, ",
					"which is a language that neither you ",
					"nor the teller of the joke, ",
					"nor anyone else at the bar speaks.  ",
					"So you're not sure why everybody's laughing.  ",
					"But you laugh too.  How else are you going to fit in?"
				].join("");
			}
			else if (anecdotesHeardSoFar == 1)
			{
				barAnecdote =
				[
					"You listen to a fellow patron brag about his sexual prowess.  ",
					"Some of the details of his story are mutually irreconcilable, ",
					"and those that aren't make him seem less like a sexual dynamo ",
					"and more like an inconsiderate boor, ",
					"but everyone else seems to accept his tale with convivial bonhomie, ",
					"and when the story finally winds up, ",
					"just after he confesses to some borderline felonies, ",
					"they all slap him on various body parts ",
					"with congratulatory gusto.",
					"\n\n",
					"So you do too.  How else are you going to keep fitting in?"
				].join("");
			}
			else if (anecdotesHeardSoFar == 2)
			{
				barAnecdote =
				[
					"A fellow patron, in hushed, conspiratorial tones, ",
					"relates an anecdote of some mysterious goings-on ",
					"he witnessed when stopping off to take on hydrogen from a gas giant ",
					"in the uncharted starsystem KL-5-6800.  ",
					"\n\n",
					"'All of a sudden, my scanner picked up a large amount of mass ",
					"heading right for me.  I figured that the locals were sending a ",
					"fleet after me, because they didn't take kindly to me ",
					"harvesting their Jovian.  So I started the hyperdrive warming up, ",
					"in case I needed to make a quick getaway from the law.  ",
					"But then the scanner said it couldn't a fleet, ",
					"all that mass was all in one piece.  ",
					"I thought sure that it was malfunctioning, ",
					"but then I saw this monster chug into orbit.  ",
					"It must have massed a gigatonne, easy.  Bristling with weapons.  ",
					"Had something written in Vadik on the side.  ",
					"\n\n",
					"Well, I cut the feed and let my hydro-harvester drop into the giant, ",
					"and flicked on the hyperdrive before it the computer ",
					"could finish the safety checks.  It blew out after 7 light-years, ",
					"and I had to limp to the nearest base on sublight.  ",
					"Cost me 2000 quatloos to replace, plus labor.  ",,
					"\n\n",
					"But I'd do it again.  I don't want no trouble with no Vadik."
				].join("")
			}
			else
			{
				barAnecdote =
				[
					"After the story about the Vadik warship in KL-5-6800, ",
					"the conversation at the bar seems to have hit a permanent lull.  ",
					"You finish your drink in silence."
				].join("");
			}

			message += "\n\n" + barAnecdote;

			anecdotesHeardSoFar++;
			placeStateGroup.stateWithNameSetToValue(stateName, anecdotesHeardSoFar);
		}

		u.messageEnqueue(message);
	}

	placePlanetSettlementBarInterior_TalkToBand
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message =
		[
			"You try to talk to the band.  During their live performance.  ",
			"Ugh.  You're one of those kind of people, huh?  ",
			"\n\n",
			"The band, as is their privilege, ignores you.  Right now, I wish I could."
		].join("");

		u.messageEnqueue(message);
	}

	placePlanetSettlementBarInterior_TalkToBartender
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message =
		[
			"Before you can get out so much as a syllable, ",
			"the bartender cuts you off.  'Bru-ale?' he asks in a clipped tone ",
			"that makes you feel like you've just been hung up on from orbit.  ",
			"When you do not immediately respond, ",
			"the bartender turns back to the other patrons."
		].join("");

		u.messageEnqueue(message);
	}

	placePlanetSettlementBarInterior_TalkToCustomers
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message =
		[
			"Your awkward attempt to insert yourself ",
			"into the conversation is deeply unwelcome.  ",
			"Your stammering would-be opening ",
			"is buried under so much sudden icy silence from them ",
			"that your body temperature actually drops by a degree centigrade.  ",
			"Under other circumstances, it might actually feel rather refreshing.",
			"\n\n",
			"You're unbelievably bad at this sort of thing.  ",
			"Maybe it would be better just to buy a drink and hang out."
		].join("")

		u.messageEnqueue(message);
	}

	placePlanetSettlementBarInterior_UseSlotMachine
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message: string;

		var emplacementSlotMachine = p.emplacementByName("slot machine");
		var slotMachineIsActivated = emplacementSlotMachine.activated();
		if (slotMachineIsActivated == false)
		{
			message =
			[
				"The slot machine claims to be out of order.  ",
				"You suspect it's just knows a real high-roller when it sees one, ",
				"and is cowering in fear of your gambling prowess."
			].join("");
		}
		else
		{

			var itemQuatloos = w.agentPlayer.itemByName("quatloos");

			if (itemQuatloos == null || itemQuatloos.quantity == 0)
			{
				message =
				[
					"You don't have any more quatloos!"
				].join("");
			}
			else
			{
				w.agentPlayer.itemRemoveQuantity(itemQuatloos, 1);

				var messageIntrosToChooseFrom =
				[
					"Fighting down an intrusive recollection of how your great uncle ",
					+ "died penniless and alone due to his gambling addiction, ",

					"Swallowing nervously, ",

					"Gazing imploringly at the ceiling, "
					+ "toward where you imagine Lady Luck lives, ",

					"With a shaky hand, ",

					"Wiping flop sweat off your palms and onto your pant legs, "
				];

				var messageIntroIndex =
					Math.floor(u.randomNumberGenerator.next() * messageIntrosToChooseFrom.length);
				var messageIntro = messageIntrosToChooseFrom[messageIntroIndex];

				var symbolLucky = "seven-pointed crystal";
				var symbolUnlucky = "exposed cranial endoskeleton";
				var symbolsToChooseFrom =
				[
					symbolUnlucky,
					"lightly mutated vegetation",
					"lightly mutated vegetation",
					"lightly mutated vegetation",
					"upturned livestock footwear",
					"upturned livestock footwear",
					"upturned livestock footwear",
					symbolLucky,
				]

				var symbolsToChooseCount = 3;
				var symbolsChosen = new Array<string>();
				for (var i = 0; i < symbolsToChooseCount; i++)
				{
					var symbolIndexRandom =
						Math.floor(u.randomNumberGenerator.next() * symbolsToChooseFrom.length);
					var symbolChosen = symbolsToChooseFrom[symbolIndexRandom];
					symbolsChosen.push(symbolChosen);
				}

				var areAllSymbolsTheSame =
					symbolsChosen[0] == symbolsChosen[1]
					&& symbolsChosen[1] == symbolsChosen[2];

				var messageResult: string;

				if (areAllSymbolsTheSame)
				{
					messageResult = "The symbols match!  ";

					if (symbolsChosen[0] == symbolLucky)
					{
						messageResult += "And it's the luckiest combination!  You win 20 quatloos!";

						itemQuatloos.quantity += 10;
					}
					else if (symbolsChosen[0] == symbolUnlucky)
					{
						messageResult =
						[
							"Unfortunately, this isn't the good kind of match.  ",
							"\n\n",
							"A port in the side of the machine slides open, ",
							"and the muzzle of a laser blaster emerges.  ",
							"You're still staring at it, wondering what it's for, ",
							"when it shows you what it's for by emitting a burst of energy ",
							"that instantly separates each individual atom ",
							"in your body from its neighbors and then, just to be thorough, ",
							"sets it on fire. ",
							"\n\n",
							"The cleaning bot sweeps up your ashes while the slot machine ",
							"plays a couple measures of a whimsical little electronic dirge.  ",
							"Then the bot disposes of your ashes ",
							"through the dedicated ash-disposal port in the back wall of the bar, ",
							"where they drift down to join the ashes of previous unlucky gamblers.",
							"\n\n",
							"You are dead."
						].join("");

						w.end();
					}
					else
					{
						messageResult += "You win 5 quatloos!"
					}
				}
				else
				{
					messageResult =
					[
						"The symbols don't match.  So nothing much happens, ",
						"except that the machine emits a sad electronic raspberry noise, ",
						"and you lose another quatloo."
					].join("");
				}

				message =
				[
					messageIntro,
					"you insert a quatloo in the slot machine and pull the handle.  ",
					"\n\n",
					"The reels rotate for a while, and then each stops with a loud thunk.",
					"\n\n",
					"The symbols visible on the reels are: ",,
					"\n\n",
					symbolsChosen.join("\n\n"),
					"\n\n",
					messageResult
				].join("");

				var itemQuatloosQuantityMax = 250; // todo
				if (itemQuatloos.quantity >= itemQuatloosQuantityMax)
				{
					message +=
					[
						"\n\n",
						"After it pays out one last time, a small status light ",
						"on the slot machine lights up, reading 'out of order'.  ",
						"What a punk, punking out like that ",
						"just when you were on a roll."
					].join("");

					emplacementSlotMachine.deactivate();
				};
			}
		}

		u.messageEnqueue(message);
	}
	
	placePlanetSettlementBarRear_SearchAshes
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message: string;

		var emplacementAshes = p.emplacementByName("ashes");
		var itemQuatloos = emplacementAshes.itemByName("quatloos");
		if (itemQuatloos == null)
		{
			message =
			[
				"You sift the ashes again, but there's nothing here.  ",
				"You're just getting dirty.  Dirtier."
			].join("");
		}
		else
		{
			message =
			[
				"Searching through the ashes, you find a blackened, ",
				"slightly melted quatloo.  Nice!  ",
				"And there's no need to think about how it got there, right?"
			].join("");

			var player = w.agentPlayer;
			player.itemAdd(itemQuatloos);
		}

		u.messageEnqueue(message);
	}

	placePlanetSettlementRobotShopInterior_BuyRobot
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var message: string;

		var messageNotEnoughMoney =
		[
			"The salesbeing looks at you sadly, and says, ",
			"'I'm afraid you don't have enough money ",
			"to purchase this robot.'  Then he shakes his head, ",
			"while maintaining eye contact, ",
			"perhaps trying to communicate that he blames ",
			"the current state of mathematics education, ",
			"not you personally, for the error."
		].join("");

		var commandText = c.text();
		var robotToPurchaseName = commandText.split(" ").slice(1).join(" ");
		var emplacementRobotNavigator = p.emplacementByName("navigator");
		var robotToPurchaseIsNavigator =
			emplacementRobotNavigator.namesInclude(robotToPurchaseName);

		if (robotToPurchaseIsNavigator == false)
		{
			message = messageNotEnoughMoney;
		}
		else
		{
			var agentPlayer = w.agentPlayer;

			var itemCouponBook = agentPlayer.itemByName("coupon book");
			var playerHasCouponBook = (itemCouponBook != null);

			var priceOfRobotInQuatloos =
				playerHasCouponBook ? 250 : 300;

			var itemQuatloos = agentPlayer.itemByName("quatloos");

			if (itemQuatloos == null || itemQuatloos.quantity < priceOfRobotInQuatloos)
			{
				message = messageNotEnoughMoney;
			}
			else
			{
				message =
				[
					"The salesbeing, with evident joy, ",
					"accepts your money, then instructs the robot ",
					"that you are its new owner.  ",
					"It begins to follow you, awaiting your command.  ",
					"You're not sure what commands to give a navigation robot.  ",
					"You guess you'll need to buy a spaceship too, now.  ",
					"\n\n",
					"Capitalism, huh?  They always get you somehow."
				].join("");

				agentPlayer.itemRemoveQuantity(itemQuatloos, priceOfRobotInQuatloos);

				p.emplacementRemove(emplacementRobotNavigator);

				var agentRobot = Agent.fromNames
				(
					emplacementRobotNavigator.names
				).descriptionAsPartOfPlaceSet
				(
					"The navigation robot you purchased follows obediently behind you."
				).descriptionWhenExaminedSet
				(
					[
						"This is your navigation robot.  ",
						"If only your high-school classmates could see you now.  ",
						"They'd be so jealous.  Well, except maybe for Todd Astromatix.  ",
						"He's loaded.  You hear he invented some revolutionary new kind of thing."
					].join("")
				).scriptUpdateForTurnSet
				(
					Script.fromName
					(
						Scripts.Instance().regionPlanetSettlement_NavigationRobotUpdate.name
					)
				);
				p.agentAdd(agentRobot, w);
			}
		}

		u.messageEnqueue(message);
	}

	regionFriendlyShip_UpdateForTurn(u: Universe, w: World, p: Place, c: Command): void
	{
		var turnsSoFar = w.turnsSoFar;

		if (turnsSoFar == 3)
		{
			u.messageEnqueue
			(
				[
					"In the distance, you can hear shouting, ",
					"then the sound of weapons fire, ",
					"then screaming, then silence."
				].join("")
			);
		}
		else if (turnsSoFar == 10)
		{
			u.messageEnqueue
			(
				[
					"You hear and feel a powerful explosion somewhere on board the ship.  ",
					"The lights flicker.  That's bad.  These are really expensive lights ",
					"that are guaranteed not to do that."
				].join("")
			);
		}
		else if (turnsSoFar == 20)
		{
			u.messageEnqueue
			(
				[
					"The force of another explosion being transferred ",
					"through the ship's frame ",
					"nearly knocks you off your feet.  ",
					"Some sparks shoot out of a panel, which is especially unsettling, ",
					"since you're pretty sure there's not even anything electrical behind that panel."
				].join("")
			);
		}
		else if (turnsSoFar == 30)
		{
			u.messageEnqueue
			(
				[
					"With another loud boom, the lights go completely out, ",
					"and stay out for a few seconds.  ",
					"Then they come back on.  But not all of them, ",
					"and not all the way, and not all the time."
				].join("")
			);
		}
		else if (turnsSoFar == 40)
		{
			u.messageEnqueue
			(
				[
					"You stagger as a titanic metallic groaning noise ",
					"echoes through the ship's halls.  ",
					"It sounds as if the ship is tearing itself apart, ",
					"which seems like a thing it might plausibly do in the next few minutes."
				].join("")
			);
		}
		else if (turnsSoFar == 50)
		{
			u.messageEnqueue
			(
				[
					"A series of sharp explosions makes the deck heave ",
					"under you, throwing you into the ceiling",
					"by banking you off a wall, ",
					"and then slamming you back into the floor."
				].join("")
			);
		}
		else if (turnsSoFar == 60)
		{
			u.messageEnqueue
			(
				[
					"The rumbles, groaning, and explosions are getting so bad now ",
					"that it's getting hard to hear yourself think, ",
					"so you just have to hope that you are.  ",
					"Additionally, a pulsing, droning noise adds itself to the cacaphony."
				].join("")
			);
		}
		else if (turnsSoFar == 70)
		{
			u.messageEnqueue
			(
				[
					"The pulsing, droning noise is steadily rising in pitch.  ",
					"The pops, moans, and booms are steadily increasing in tempo.  ",
					"This symphony of destruction is clearly building up to something."
				].join("")
			);
		}
		else if (turnsSoFar == 80)
		{
			u.messageEnqueue
			(
				[
					"The pulsing, droning noise is now a ululating scream ",
					"that feels like it's trying simultaneously to claw its way into ",
					"and out of your skull.",
					"She cannae take much more o' this, Cap'n."
				].join("")
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
				[
					"The ship tears itself into a thousand pieces, ",
					"with a sound louder than ears can hear.  ",
					"Luckily, the ear-shattering noise only lasts a moment, ",
					"because all the ship's air rushes out into the surrounding vaccuum.  ",
					"Luckier still, you don't die of asphixiation, because you're ",
					"sheared into seven separate pieces by shrapnel from the explosion first.",
					"\n\n",
					"You are dead."
				].join("")
			);

			w.end();
		}
	}

	regionFriendlyShip_AgentEnemyUpdateForTurn
	(
		u: Universe, w: World, p: Place, c: Command
	): void
	{
		var placeOccupiedByEnemy = p;
		var agentEnemy = placeOccupiedByEnemy.agentByName("enemy");

		var message: string;

		var placeOccupiedByPlayer = w.placeCurrent();
		var stateName = "PlaceOccupiedByPlayerPreviousName";
		var placeOccupiedByPlayerPreviousName =
			agentEnemy.stateGroup.stateWithNameGetValue(stateName);
		var playerHasJustMoved =
			(placeOccupiedByPlayer.name != placeOccupiedByPlayerPreviousName);

		if (placeOccupiedByEnemy == placeOccupiedByPlayer)
		{
			message = "The Vadik soldier zaps you.  You are dead.";
			placeOccupiedByPlayer.agentRemove(agentEnemy, w);
			w.end();
		}
		else
		{
			var portalsEnemyMayGoThrough = placeOccupiedByEnemy.portalsVisible();

			var portalLeadingDirectlyToPlayer = portalsEnemyMayGoThrough.find
			(
				x => x.placeDestinationName == placeOccupiedByPlayer.name
			);

			var playerAndEnemyAreInAdjacentPlaces =
				(portalLeadingDirectlyToPlayer != null);

			var portalToGoThrough =
				(portalLeadingDirectlyToPlayer == null)
				? u.randomNumberGenerator.randomElementFromArray(portalsEnemyMayGoThrough)
				: portalLeadingDirectlyToPlayer;

			// Only move into player's room
			// if the player hasn't just moved there,
			// because otherwise the player gets no warning.
			var shouldEnemyMove =
				(playerAndEnemyAreInAdjacentPlaces == false)
				|| (playerHasJustMoved == false);

			if (shouldEnemyMove)
			{
				agentEnemy.goThroughPortal(portalToGoThrough, w);
			}

			placeOccupiedByEnemy = agentEnemy.place(w);
			if (placeOccupiedByEnemy == placeOccupiedByPlayer)
			{
				message =
				[
					"A Vadik soldier strides into view and immediately trains its weapon on you.",
					"Terrifying as it is, you can't help but admire its confident bearing.  ",
					"And that uniform really pops."
				].join("");
			}
			else
			{
				portalsEnemyMayGoThrough = placeOccupiedByEnemy.portalsVisible();

				var portalLeadingDirectlyToPlayer = portalsEnemyMayGoThrough.find
				(
					x => x.placeDestinationName == placeOccupiedByPlayer.name
				);

				if (portalLeadingDirectlyToPlayer != null)
				{
					var portalLeadingFromPlayerToEnemy =
						placeOccupiedByPlayer.portals.find
						(
							x => x.placeDestinationName == placeOccupiedByEnemy.name
						);

					var portalLeadingFromPlayerToEnemyName =
						portalLeadingFromPlayerToEnemy.name();

					var directions = [ "forward", "aft", "outside" ];

					var isDefiniteArticleNeeded =
						directions.indexOf(portalLeadingFromPlayerToEnemyName) < 0;

					message =
					[
						"You hear the tramping of heavy feet coming from ",
						(isDefiniteArticleNeeded ? "the " : ""),
						portalLeadingFromPlayerToEnemyName + "."
					].join("");
				}
			}
		}

		u.messageEnqueue(message);
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
				[
					"You're getting thirsty.  This desert really takes it out of you.",
					"'It' being your body's precious moisture."
				].join("")
			);
		}
		else if (turnsSinceLastDrink == 20)
		{
			u.messageEnqueue
			(
				[
					"You're getting very thirsty now.  ",
					"This desert is a monster.  ",
					"Some kind of... water-sucking... low-moisture... monster.",
					"Look, it's too hot to think of what kind of monster it is right now."
				].join("")
			);
		}
		else if (turnsSinceLastDrink >= 30 && turnsSinceLastDrink < 40)
		{
			u.messageEnqueue
			(
				[
					"Hey!  I don't know if you were listening before, ",
					"but YOU ARE VERY VERY THIRSTY NOW.  ",
					"If you don't drink something very soon, ",
					"you will die of dehydration."
				].join("")
			);
		}
		else if (turnsSinceLastDrink == 40)
		{
			u.messageEnqueue
			(
				[
					"Welp, you're dying now.  Yes, right now.  Of dehydration,  ",
					"which is a pretty bad way to go, ",
					"or at least it seems that way to you.",
					"\n\n",
					"I guess most ways to die are bad, though.  ",
					"It's all subjective.  ",
					"Some people say that drowning is the worst way to die, ",
					"but that actually sounds nice to you right now.  Go figure.  ",
					"Anyway: ",
					"\n\n",
					"You are dead."
				].join("")
			);
			w.end();
		}

		turnsSinceLastDrink++;
		agentPlayer.stateGroup.stateWithNameSetToValue
		(
			stateName, turnsSinceLastDrink
		);
	}

	regionPlanetSettlement_NavigationRobotUpdate(u: Universe, w: World, p: Place, c: Command): void
	{
		var placeBarInterior =
			w.placeByName(Places.planetSettlementBarInterior_Name() );

		var placeCurrent = w.placeCurrent();

		if (placeCurrent.name != placeBarInterior.name)
		{
			var region = placeCurrent.region(w);
			var agentRobot = region.agentByName("navigation robot");
			if (agentRobot != null)
			{
				if (p != placeCurrent)
				{
					p.agentRemove(agentRobot, w);
					placeCurrent.agentAdd(agentRobot, w);
				}
			}
		}
	}

	regionPlanetSettlement_UpdateForTurn(u: Universe, w: World, p: Place, c: Command): void
	{
		var placeBarFront =
			w.placeByName(Places.planetSettlementBarFront_Name() );

		if (p.name != placeBarFront.name)
		{
			var emplacementSkimmer = placeBarFront.emplacementByName("skimmer");
			if (emplacementSkimmer != null)
			{
				var itemSkimmerKey = emplacementSkimmer.itemByName("skimmer key")
				var keyWasLeftInSkimmer = (itemSkimmerKey != null);
				if (keyWasLeftInSkimmer)
				{
					placeBarFront.emplacementRemove(emplacementSkimmer);
				}
			}
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
