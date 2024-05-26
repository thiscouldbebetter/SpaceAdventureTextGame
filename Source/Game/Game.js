"use strict";
class Game {
    static worldBuild() {
        var player = Agent.fromNames(["self", "me", "myself"]).descriptionSet("This is you.  You have to start getting used to this.").itemsAdd([
            Item.fromNamesAndDescription(["washrag", "rag"], [
                "This is a rag you use to clean things sometimes.  ",
                "You may or may not have given it a name.  ",
                "And a backstory.  And a love interest.  ",
                "And a ragtag group of friends ",
                "that it may or may not go on adventures with."
            ].join(""))
        ]);
        var scriptsCustom = new Scripts();
        var regions = new Regions();
        var items = new Items();
        var commands = Command.Instances()._All;
        var scriptsAll = new Array();
        var commandsAsScripts = commands.map((x) => x._scriptExecute);
        scriptsAll.push(...commandsAsScripts);
        scriptsAll.push(...scriptsCustom._All);
        var placeInitialName = Places.friendlyShipJanitorsCloset_Name();
        var returnValue = new World("Space_Adventure_Game", regions._All, items._All, player, commands, scriptsAll, null, // turnsSoFar,
        placeInitialName);
        return returnValue;
    }
}
class Items {
    constructor() {
        this.CanOfSham = this.canOfSham();
        this.CaveBeastClaw = this.caveBeastClaw();
        this.Canteen = this.canteen();
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
        this.SurvivalKit = this.survivalKit([this.Canteen, this.Multitool, this.CanOfSham]);
        this._All =
            [
                this.CanOfSham,
                this.Canteen,
                this.CaveBeastClaw,
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
    static Instance() {
        if (this._instance == null) {
            this._instance = new Items();
        }
        return this._instance;
    }
    canOfSham() {
        return Item.fromNamesAndDescription(["can of Sham", "can of sham", "can", "sham"], [
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
        ].join("")).quantitySet(3);
    }
    caveBeastClaw() {
        return Item.fromNamesAndDescription(["cave beast claw", "beast claw", "claw"], [
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
        ].join(""));
    }
    canteen() {
        return Item.fromNamesAndDescription(["canteen", "dehydrated water", "water", "bottle"], [
            "This is a canteen filled with water, sort of.  ",
            "But, as a prominent warning label clearly reads, it's 'dehydrated water'.",
            "\n\n",
            "What that means is that it's full of hydrogen gas ",
            "under an incredible amount of pressure, enough to liquefy it.  ",
            "When the valve in the bottle's neck is opened, ",
            "it allows a small amount of the gas out ",
            "to combust in the oxygen (hopefully!) of the surrounding (hopefully!) air, ",
            "which creates a small amount of water vapor ",
            "that condenses in the mouth of the bottle, ",
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
        ].join("")).commandAdd(new Command([
            "drink dehydrated water",
            "drink water",
            "drink bottle",
            "drink canteen",
            "drink from bottle",
            "drink from canteen"
        ], Scripts.Instance().itemDehydratedWaterUse.name));
    }
    dataCartridge() {
        return Item.fromNamesAndDescription(["data cartridge", "cartridge"], [
            "This is a data cartridge labelled 'astral bodies' ",
            "that you retrieved from the library of the Pax Aeterna ",
            "using the skills you learned in the Remedial Library Literacy course ",
            "they made you take when you came on board.",
            "\n\n",
            "A dying man used his last breath to recommend it to you, ",
            "so you figure it must be good."
        ].join("")).commandAdd(new Command(MessageHelper.combinePhraseArrays([
            ["put", "place", "insert"],
            ["cartridge", "data cartridge"],
            [null, "in", "into"],
            ["slot", "reader"]
        ]), Scripts.Instance().itemDataCartridge_PutInSlot.name));
    }
    gadget() {
        return Item.fromNamesAndDescription(["gadget"], [
            "This is a gadget you found in a closet, ",
            "then just picked up and put in your pocket, ",
            "even though it's not yours and you don't know what it does.  ",
            "It sounds weird when you put it like that.",
            "\n\n",
            "The gadget's intended function is cryptic.  ",
            "There's a button and an indicator light.  ",
            "And some sort of... grille?.. on one end.  ",
            "That's it, though."
        ].join("")).commandAdd(new Command([
            "press button on gadget",
            "turn on gadget",
            "turn off gadget",
            "activate gadget",
            "deactivate gadget"
        ], Scripts.Instance().itemGadgetPressButton.name));
    }
    gasGrenade() {
        return Item.fromNamesAndDescription(["gas grenade", "grenade"], "This is a Vadik gas grenade.  "
            + "The Vadik are notoriously, and apparently cheerfully, violent, "
            + "so you're not sure why they even have non-lethal weapons like these.  "
            + "Maybe they're issued to underperforming crew for purposes of public shaming.");
    }
    keycard() {
        return Item.fromNamesAndDescription(["keycard", "key", "card"], "This is an access keycard for the starship Pax Aeterna.  "
            + "You guess it could also be, like, a picnic table for ants.");
    }
    reflectiveGlass() {
        return Item.fromNamesAndDescription(["glass", "reflective glass", "windshield"], "This is a shard of reflective glass from the shattered windshield "
            + "of the Pax Aeterna's escape pod.  "
            + "It's the size of your palm, roughly.  Well, more like sharply.  "
            + "You're not sure how you're carrying this without cutting yourself.");
    }
    multitool() {
        return Item.fromNamesAndDescription(["multitool"], "This is a multitool taken from the survival kit of the Pax Aeterna's "
            + "escape pod.  Various small tools are fixed on one end by a rivet "
            + "and folded into the handle.  "
            + "A selected tool can be extended and locked in place for use."
            + "\n\n"
            + "You hope you don't need it.  "
            + "The only tool you've ever used on one of these is the toothpick, "
            + "which you lost.  Your roommate never let you use it again after that.");
    }
    quatloos() {
        return Item.fromNamesAndDescription(["quatloos", "credits", "coins", "money"], [
            "Quatloos are the most widely-shared form of currency ",
            "in the galaxy.  They were originally used exclusively ",
            "to gamble on blood sports with non-consenting combatants, ",
            "and were thus outlawed in most jurisdictions.  ",
            "But eventually, all forms of cash were outlawed by the authorities, ",
            "since nobody used cash for anything that wasn't illegal.",
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
        ].join(""));
    }
    rock() {
        return Item.fromNamesAndDescription(["rock", "stone"], [
            "It's a rock.  It's got one round end and one pointy end.",
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
        ].join(""));
    }
    skimmerKey() {
        return Item.fromNamesAndDescription(["skimmer key"], "This is the starter key for a sand skimmer.").commandAdd(new Command(["put key in skimmer", "insert key in skimmer", "use key on skimmer"], Scripts.Instance().placePlanetCavernsSteamworks_InsertKeyInSkimmer.name));
    }
    spaceSuit() {
        return Item.fromNames(["space suit", "spacesuit", "suit"]).descriptionSet("This is space suit from the starship Pax Aeterna.  "
            + "It keeps the space out and the air in.  "
            + "Maybe they should call it an air suit.").scriptGetNameSet(Scripts.Instance().placeFriendlyShipDockingBayAntechamberClosetRight_GetSpaceSuit.name);
    }
    survivalKit(contents) {
        return Item.fromNames(["survival kit", "kit"]).descriptionSet("This is a survival kit from the Pax Aeterna's escape pod.").itemsAdd(contents).commandAddFromTextsAndScriptName(["open survival kit", "open kit"], Scripts.Instance().itemSurvivalKitOpen.name);
    }
} // end class Items
class Places {
    constructor() {
        this.scripts = Scripts.Instance();
    }
    emplacement(names) {
        return Emplacement.fromNames(names);
    }
    emplacement2(names, description) {
        return Emplacement.fromNamesAndDescription(names, description);
    }
    emplacement3(names, description, scriptUseName) {
        return Emplacement.fromNamesDescriptionAndScriptUseName(names, description, scriptUseName);
    }
    place2(name, description) {
        return Place.fromNameDescriptionScriptNameAndObjects(name, description, null, // scriptName
        [] // objects
        );
    }
    place3(name, description, objects) {
        return Place.fromNameDescriptionScriptNameAndObjects(name, description, null, // scriptName,
        objects);
    }
    place4(name, description, scriptName, objects) {
        return Place.fromNameDescriptionScriptNameAndObjects(name, description, scriptName, objects);
    }
    portal(names, placeDestinationName) {
        return Portal.fromNamesAndPlaceDestinationName(names, placeDestinationName);
    }
    portal3(names, placeDestinationName, scriptUseName) {
        var returnPortal = Portal
            .fromNames(names)
            .placeDestinationNameSet(placeDestinationName)
            .scriptUseNameSet(scriptUseName);
        return returnPortal;
    }
    // Places.
    // Places - Pax Aeterna.
    friendlyShipBridge() {
        return this.place2(Places.friendlyShipBridge_Name(), "This is the command bridge of the starship Pax Aeterna.  "
            + "A large transparent hemispherical dome arches overhead, "
            + "showing the brilliantly shining surrounding stars."
            + "Banks of mostly incomprehensible controls "
            + "line the circular wall, with the nearby seats "
            + "either empty or filled with the slumped bodies of dead crew."
            + "There're several bodies scattered on the floor, as well.  "
            + "A prominent pedestal in the center "
            + "formerly held the Stellar Juvenator, but now stands vacant.");
    }
    static friendlyShipBridge_Name() {
        return "Pax Aeterna - Bridge";
    }
    friendlyShipDockingBayAntechamber() {
        return this.place3(Places.friendlyShipDockingBayAntechamber_Name(), "This is the antechamber of the Pax Aeterna's docking bay.  "
            + "A large airlock door leads to the hangar.  "
            + "A control console occupies one wall, while "
            + "on the opposite wall are two closets, with a pair of "
            + " buttons at chest height between them. "
            + " An elevator leads back to the engineering deck.", [
            this.portal3(["airlock"], Places.friendlyShipDockingBayHangar_Name(), this.scripts.placeFriendlyShipDockingBayAntechamber_GoAirlock.name),
            this.portal(["elevator"], Places.friendlyShipEngineeringDeckAft_Name()),
            this.portal(["left closet"], Places.friendlyShipDockingBayAntechamberClosetLeft_Name()).lock().descriptionSet("The door to the left closet is closed."),
            this.portal(["right closet"], Places.friendlyShipDockingBayAntechamberClosetRight_Name()).lock().descriptionSet("The door to the right closet is closed."),
            this.emplacement(["controls", "console", "control console"]),
            this.emplacement(["left button", "button"]).commandAdd(new Command(["press left button"], this.scripts.placeFriendlyShipDockingBayAntechamber_PressLeftButton.name)),
            this.emplacement(["right button", "button"]).commandAdd(new Command(["press right button"], this.scripts.placeFriendlyShipDockingBayAntechamber_PressRightButton.name))
        ]);
    }
    static friendlyShipDockingBayAntechamber_Name() {
        return "Pax Aeterna - Docking Bay - Antechamber";
    }
    friendlyShipDockingBayAntechamberClosetLeft() {
        return this.place3(Places.friendlyShipDockingBayAntechamberClosetLeft_Name(), "This is the left-hand closet of the antechamber "
            + "of the Pax Aeterna's docking bay.  "
            + "The door leads back to the antechamber.", [
            this.portal(["door", "out", "outside"], Places.friendlyShipDockingBayAntechamber_Name()),
            Items.Instance().Gadget
        ]);
    }
    static friendlyShipDockingBayAntechamberClosetLeft_Name() {
        return "Pax Aeterna - Docking Bay - Antechamber - Left Closet";
    }
    friendlyShipDockingBayAntechamberClosetRight() {
        return this.place3(Places.friendlyShipDockingBayAntechamberClosetRight_Name(), "This is the right-hand closet of the antechamber "
            + "of the Pax Aeterna's docking bay.  "
            + "The door leads back to the antechamber.", [
            this.portal(["door", "out", "outside"], Places.friendlyShipDockingBayAntechamber_Name()),
            Items.Instance().SpaceSuit
        ]);
    }
    static friendlyShipDockingBayAntechamberClosetRight_Name() {
        return "Pax Aeterna - Docking Bay - Antechamber - Right Closet";
    }
    friendlyShipDockingBayHangar() {
        return this.place3(Places.friendlyShipDockingBayHangar_Name(), "This is the Pax Aeterna's docking bay hangar.  "
            + "\n\n"
            + "Though the docking bay's floor is easily large enough to accomodate "
            + "a 20-passenger luxury yacht, it is currently empty "
            + "except for a relatively small hatch in the floor "
            + "and a control console near the airlock door leading back to the antechamber."
            + "\n\n"
            + "A similarly gigantic pair of doors at the far end of the bay "
            + " allows ships to enter and depart when open, "
            + " and keeps everything safely sheltered when closed.", [
            this.portal(["airlock"], Places.friendlyShipDockingBayAntechamber_Name()),
            this.portal(["escape pod", "pod"], Places.friendlyShipEscapePod_Name()).descriptionSet("The pod is kind of cramped-looking, "
                + "but as it's your only hope of survival right now, "
                + "you prefer to think of it as 'cozy'.").hide().block(),
            this.emplacement2([
                "controls", "panel", "console",
                "buttons", "control panel", "control console"
            ], "The control panel bears a single button, which says 'platform'.").commandAdd(Command.fromTextsAndScriptExecuteName([
                "press platform button",
                "push platform button",
                "press button",
                "push button"
            ], this.scripts.placeFriendlyShipDockingBayHangar_PressPlatformButton.name)),
            this.emplacement2(["hatch", "trapdoor"], "This is a trapdoor in the floor, "
                + "perhaps three meters by five meters,"
                + "split down the middle into two retractible doors."),
            this.emplacement(["docking bay doors", "bay doors", "doors"]).lock().descriptionSet("The bay doors are closed.")
        ]);
    }
    static friendlyShipDockingBayHangar_Name() {
        return "Pax Aeterna - Docking Bay - Hangar";
    }
    friendlyShipEngineeringDeckAft() {
        return this.place3(Places.friendlyShipEngineeringDeckAft_Name(), "This is the aft end of the Pax Aeterna's engineering deck.  "
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
            + "Next to the elevator door is a small panel with a slot in it.", [
            this.portal3(["elevator", "door"], Places.friendlyShipDockingBayAntechamber_Name(), this.scripts.placeFriendlyShipEngineeringDeckAft_GoElevator.name).lockedSet(true),
            this.portal(["forward"], Places.friendlyShipEngineeringDeckAmidships_Name()),
            this.emplacement2(["slot", "lock", "keycard slot", "keyhole"], "The slot is intended to accept a security keycard.").commandAdd(new Command([
                "use keycard on slot",
                "insert keycard in slot",
                "put keycard in slot"
            ], this.scripts.itemKeycardUse.name))
        ]);
    }
    static friendlyShipEngineeringDeckAft_Name() {
        return "Pax Aeterna - Engineering Deck - Aft";
    }
    friendlyShipEngineeringDeckAmidships() {
        return this.place3(Places.friendlyShipEngineeringDeckAmidships_Name(), "This is the middle of the Pax Aeterna's engineering deck.  "
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
            + "running beneath that window.  The bodies of two crewmen lie on the floor.", [
            this.portal(["aft"], Places.friendlyShipEngineeringDeckAft_Name()),
            this.portal(["forward"], Places.friendlyShipEngineeringDeckForward_Name()),
            this.emplacement2([
                "console",
                "controls",
                "buttons",
                "control console",
                "control panel"
            ], "These are the controls for the docking bay doors, "
                + "which are visible through the nearby window.  "
                + "There are two buttons, one that says 'open bay doors' "
                + "and another that says 'close bay doors'."
                + "It doesn't take a rocket scientist to operate these controls, "
                + "although there is prominently placed placard that says otherwise."),
            this.emplacement2([
                "open button",
                "open bay button",
                "open doors button",
                "open bay doors button",
                "button"
            ], "This button opens the docking bay doors, "
                + "if they happen to be closed.  "
                + "Otherwise, they do nothing.  Or so you assume.").visibleSet(false).commandAdd(new Command([
                "press open button",
                "press open bay button",
                "press open bay doors button",
                "press open bay door button"
            ], this.scripts.placeFriendlyShipEngineeringDeckAmidships_PressOpenButton.name)),
            this.emplacement2([
                "close button",
                "close doors button",
                "close bay doors button",
                "button"
            ], "This button closes the docking bay doors, "
                + "if they happen to be open.  "
                + "Otherwise, they do nothing.  Or so you assume.").visibleSet(false).commandAdd(new Command([
                "press close button",
                "press close bay button",
                "press close bay doors button"
            ], this.scripts.placeFriendlyShipEngineeringDeckAmidships_PressCloseButton.name)),
            this.emplacement2(["dome", "domes", "reactor", "tube", "tubes"], "You're not sure why the ends of the reactor tubes "
                + "need to be transparent, but these are, and the colors "
                + "currently coming through them don't give you a good feeling."),
            this.emplacement2(["window", "bay", "docking bay"], "The window looks out over the ship's docking bay, "
                + "including the large doors at the end of it, "
                + "through which ships and cargo pass.  "
                + "The view is not especially interesting.  "
                + "This is a pretty down-to-business window, on the whole, "
                + "especially when the bay doors are closed."),
            this.emplacement(["body"]).commandAdd(new Command(["search body"], this.scripts.emplacementBodyEmptySearch.name)),
            this.emplacement(["other body"]).commandAdd(new Command(["search other body"], this.scripts.emplacementBodyEmptySearch.name))
        ]);
    }
    static friendlyShipEngineeringDeckAmidships_Name() {
        return "Pax Aeterna - Engineering Deck - Amidships";
    }
    friendlyShipEngineeringDeckForward() {
        return this.place3(Places.friendlyShipEngineeringDeckForward_Name(), "This is the forward end of the Pax Aeterna's engineering deck.  "
            + "I know I said that the deck above was the lower deck, "
            + "but this deck is lower than that.  It's the lower lower deck.  "
            + "I promise, there are no decks lower than this one."
            + "\n\n"
            + "The rest of the deck lies to aft.  "
            + "\n\n"
            + "At the fore end, an door opens on an elevator back to the other decks.", [
            this.portal(["elevator", "door"], Places.friendlyShipLowerDeckHallForward_Name()),
            this.portal(["aft"], Places.friendlyShipEngineeringDeckAmidships_Name())
        ]);
    }
    static friendlyShipEngineeringDeckForward_Name() {
        return "Pax Aeterna - Engineering Deck - Forward";
    }
    friendlyShipEscapePod() {
        var emplacementSafetyHarnessNames = ["safety harness", "safety belt", "harness", "belt"];
        return this.place3(Places.friendlyShipEscapePod_Name(), "This is the interior of one of the Pax Aeterna's escape pods.  "
            + "A padded seat with safety belts completely occupies the floor of the pod's cabin.  "
            + "Beneath the window is a console with various controls, "
            + "including a throttle, a monitor screen, and some buttons.  "
            + "A gull-wing door in the left wall of the pod allows entry and exit.  "
            + "Opposite the door, on the starboard wall, is a mounting for a survival kit.  "
            + "Above the control console is a large window, through which "
            + "the pod's surroundings can be seen.", [
            this.portal3(["door", "outside", "out"], null, // destination
            this.scripts.placeFriendlyShipEscapePod_GoDoor.name),
            this.emplacement(["window"]).commandAdd(new Command(["look window", "look through window", "look out window"], this.scripts.placeFriendlyShipEscapePod_LookWindow.name)),
            this.emplacement(["autonav button", "autonav", "button"]).commandAdd(new Command(["press autonav", "press autonav button"], this.scripts.placeFriendlyShipEscapePod_PressAutonavButton.name)),
            this.emplacement(["buttons"]),
            this.emplacement(["console"]),
            this.emplacement(["don't button", "button"]),
            this.emplacement(["launch button", "button"]).commandAdd(new Command(["press launch", "press launch button"], this.scripts.placeFriendlyShipEscapePod_PressLaunchButton.name)),
            this.emplacement(["monitor screen"]),
            this.emplacement(emplacementSafetyHarnessNames).commandAdd(new Command(MessageHelper.combinePhraseArrays([
                ["use", "fasten", "put on"],
                emplacementSafetyHarnessNames
            ]), this.scripts.placeFriendlyShipEscapePod_PutOnSafetyHarness.name)),
            Items.Instance().SurvivalKit,
            this.emplacement(["throttle"])
        ]);
    }
    static friendlyShipEscapePod_Name() {
        return "Escape Pod";
    }
    friendlyShipJanitorsCloset() {
        return this.place4(Places.friendlyShipJanitorsCloset_Name(), "This office/supply closet/quarters, "
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
            + "(You tried sleeping out there once, but someone got mad.)", this.scripts.placeFriendlyShipJanitorsCloset_Update.name, [
            this.portal(["corridor", "door", "hall", "out", "outside"], Places.friendlyShipUpperDeckHallAmidships_Name()),
        ]);
    }
    static friendlyShipJanitorsCloset_Name() {
        return "Pax Aeterna - Maintenance Specialist (Sanitation Grade)'s Office/Supply Closet/Quarters";
    }
    friendlyShipLibrary() {
        return this.place3(Places.friendlyShipLibrary_Name(), "This is the Pax Aeterna's library.  "
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
            + "on the floor in front of the console. ", [
            this.portal(["forward"], Places.friendlyShipUpperDeckHallForward_Name()),
            this.portal(["aft"], Places.friendlyShipUpperDeckHallAmidships_Name()),
            this.emplacement3(["console", "retrieval console", "controls"], "This is a standard data cartridge retrieval console.  "
                + "If the title of a desired data cartridge is typed "
                + "on the console's keyboard, "
                + "the retrieval robot will retrieve that cartridge from the stacks "
                + "and drop it into the cartidge hopper below the console. "
                + "From there, the cartridge is generally slotted into a reader "
                + "and its contents displayed on a screen.  "
                + "It's a complicated system, to be sure, "
                + "but that sixteen hours of training you took was probably enough.", this.scripts.placeFriendlyShipLibrary_UseConsole.name).commandAdd(new Command(["type", "enter"], this.scripts.placeFriendlyShipLibrary_Type.name)),
            this.emplacement2(["table"], "The table provides a comfortable place "
                + "for the more literate members of the crew to research data tapes."
                + "\n\n"
                + "You, on the other hand, have only used it once,"
                + "as an improvised playfield for a game of Vir-Naki Caroms "
                + "with the cartridge-retrieval bot. "
                + "But they made you stop before you could even "
                + "figure out how to detach the bot from the shelves, "
                + "much less get a nice volley going."),
            this.emplacement2(["scientist", "man", "person", "body", "corpse", "being"], "The scientist is not moving in any perceptible way.  "
                + "You can't tell from here if he's even breathing, "
                + "which is the most important kind of moving, "
                + "when you think about it.").commandAdd(new Command([
                "search body",
                "search man",
                "search corpse",
                "search person",
                "search scientist",
                "talk to person",
                "talk to scientist"
            ], this.scripts.placeFriendlyShipLibrary_TalkToMan.name))
        ]);
    }
    static friendlyShipLibrary_Name() {
        return "Pax Aeterna - Library";
    }
    friendlyShipLowerDeckHallAft() {
        return this.place3(Places.friendlyShipLowerDeckHallAft_Name(), "This is a hallway on the lower deck of the starship Pax Aeterna.  "
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
            + "when he was alive.  Every time he talked to you, at a minimum.", [
            this.portal(["forward"], Places.friendlyShipLowerDeckHallAmidships_Name()),
            this.portal(["elevator"], Places.friendlyShipUpperDeckHallAft_Name()),
            this.emplacement(["body"]).commandAdd(new Command(["search body"], this.scripts.emplacementBodyEmptySearch.name))
        ]);
    }
    static friendlyShipLowerDeckHallAft_Name() {
        return "Pax Aeterna - Lower Deck - Hall - Aft";
    }
    friendlyShipLowerDeckHallAmidships() {
        return this.place3(Places.friendlyShipLowerDeckHallAmidships_Name(), "This is a corridor on the lower deck of the starship Pax Aeterna.  "
            + "\n\n"
            + "This hallway mostly looks the same as all the other hallways so far, "
            + "but your trained eye can still detect subtle indications of slight damage "
            + "from when a floor scrubber went out of control, "
            + "collided with the wall, and rubbed against for several meters "
            + "before getting back on track.  That very nearly cost it the race, "
            + "but luckily the other scrubber was disqualified for unsportspersonlike conduct."
            + "\n\n"
            + "The hall continues to forward and to aft.", [
            this.portal(["forward"], Places.friendlyShipLowerDeckHallForward_Name()),
            this.portal(["aft"], Places.friendlyShipLowerDeckHallAft_Name())
        ]);
    }
    static friendlyShipLowerDeckHallAmidships_Name() {
        return "Pax Aeterna - Lower Deck - Hall - Amidships";
    }
    friendlyShipLowerDeckHallForward() {
        return this.place3(Places.friendlyShipLowerDeckHallForward_Name(), "This is a hallway on the lower deck of the starship Pax Aeterna.  "
            + "The hall continues to aft, and ends in a bulkhead to forward.  "
            + "Sometimes you can't help but think that "
            + "this ship's architect went a little heavy on the hallways."
            + "\n\n"
            + "There is a door here opening on an elevator.  "
            + "\n\n"
            + "Another body of one of your crewmates lies here.  "
            + "You start to feel sorry for whoever has to clean all this up.", [
            this.portal(["aft"], Places.friendlyShipLowerDeckHallAmidships_Name()),
            this.portal(["elevator", "door"], Places.friendlyShipEngineeringDeckForward_Name()),
            this.emplacement(["body"]).commandAdd(new Command(["search body"], this.scripts.emplacementBodyEmptySearch.name))
        ]);
    }
    static friendlyShipLowerDeckHallForward_Name() {
        return "Pax Aeterna - Lower Deck - Hall - Forward";
    }
    friendlyShipUpperDeckHallAft() {
        return this.place3(Places.friendlyShipUpperDeckHallAft_Name(), "This is a hallway on the upper deck of the starship Pax Aeterna.  "
            + "The hall continues to forward, and ends in a bulkhead to aft.  "
            + "There is a door here opening on an elevator.  "
            + "\n\n"
            + "The body of one of your fellow crew members lies prone "
            + "near the aft bulkhead, the neck bent sharply upwards "
            + "and the chin propped against the bulkhead itself.  "
            + "This is the most awkward pose yet.", [
            this.portal(["forward"], Places.friendlyShipUpperDeckHallAmidships_Name()),
            this.portal(["elevator", "door"], Places.friendlyShipLowerDeckHallAft_Name()),
            this.emplacement(["body"]).commandAdd(new Command(["search body"], this.scripts.emplacementBodyEmptySearch.name))
        ]);
    }
    static friendlyShipUpperDeckHallAft_Name() {
        return "Pax Aeterna - Upper Deck - Hall - Aft";
    }
    friendlyShipUpperDeckHallAmidships() {
        return this.place4(Places.friendlyShipUpperDeckHallAmidships_Name(), "This is a hallway on the upper deck of the starship Pax Aeterna.  "
            + "The hall ends in a door to forward labelled 'Library', and continues to aft.  "
            + "In the middle is a door leading to the office/supply closet/quarters "
            + "of the Maintenance Specialist (Sanitation Grade), "
            + "which is where you, our hero, came boldly to this story, "
            + "as soon as you figured out how to 'go door'.", this.scripts.placeFriendlyShipUpperDeckHallAmidships_Update.name, [
            this.portal(["closet", "office", "door", "closet door", "office door"], Places.friendlyShipJanitorsCloset_Name()),
            this.portal(["forward", "door", "forward door", "library", "library door"], Places.friendlyShipLibrary_Name()),
            this.portal(["aft"], Places.friendlyShipUpperDeckHallAft_Name())
        ]);
    }
    static friendlyShipUpperDeckHallAmidships_Name() {
        return "Pax Aeterna - Upper Deck - Hall - Amidships";
    }
    friendlyShipUpperDeckHallForward() {
        return this.place3(Places.friendlyShipUpperDeckHallForward_Name(), "This is a hallway on the upper deck of the starship Pax Aeterna."
            + "\n\n"
            + "To aft, the hall ends in a door labelled 'Library', "
            + " and to forward, in a bulkhead, "
            + "near which the body of another dead crewperson lies crumpled.  "
            + "\n\n"
            + "This is a pretty out-of-the way spot.  "
            + "They must've been hiding here when they got shot.  "
            + "Either that, or they died of natural causes by coincidence, "
            + "and nobody's been down this hall to find them until just now.  "
            + "Unlikely, but we shouldn't rule anything out.", [
            this.portal(["aft", "library"], Places.friendlyShipLibrary_Name()),
            this.emplacement(["body"]).commandAdd(new Command(["search body"], this.scripts.emplacementBodyKeycardSearch.name))
        ]);
    }
    static friendlyShipUpperDeckHallForward_Name() {
        return "Pax Aeterna - Upper Deck - Hall - Forward";
    }
    // Places - Ekkis 2.
    // Places - Ekkis 2 - Desert.
    planetDesertCrashSite() {
        return this.place3(Places.planetDesertCrashSite_Name(), "Your escape pod has crashed in the middle of the desert "
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
            + "At least, with your luck, you assume it must be mazelike.", [
            this.portal(["pod", "escape pod"], Places.friendlyShipEscapePod_Name()),
            this.portal(["east"], Places.planetCliffsBottomNorthwestWestSide_Name()),
            Items.Instance().ReflectiveGlass
        ]);
    }
    static planetDesertCrashSite_Name() {
        return "Ekkis II - Desert - Crash Site";
    }
    planetDesertDeep() {
        return this.place4(Places.planetDesertDeep_Name(), "You stand in the trackless desert of the planet Ekkis II.  "
            + "\n\n"
            + "The featureless sand stretches away in all directions.  "
            + "It's not encouraging, frankly.", this.scripts.placePlanetDesertDeep_Update.name, []);
    }
    static planetDesertDeep_Name() {
        return "Ekkis II - Desert - Deep Desert";
    }
    planetDesertNorth() {
        return this.place3(Places.planetDesertNorth_Name(), "You stand in the trackless desert of the planet Ekkis II, "
            + "just north of the wreck of your crashed escape pod.  "
            + "Some cliffs rise to the southeast. "
            + "The featureless sand stretches away in every other direction.  "
            + "If you were a poet, you'd probably be moved "
            + "to write a poem about loneliness. "
            + "But you're not, so instead you just sweat and wish for a lemonade.", [
            this.portal(["south"], Places.planetDesertCrashSite_Name()),
            this.portal(["north"], Places.planetDesertDeep_Name()),
            this.portal(["east"], Places.planetDesertDeep_Name()),
            this.portal(["west"], Places.planetDesertDeep_Name())
        ]);
    }
    static planetDesertNorth_Name() {
        return "Ekkis II - Desert - North of Crash Site";
    }
    planetDesertSouth() {
        return this.place3(Places.planetDesertSouth_Name(), "You stand in the trackless desert of the planet Ekkis II, "
            + "just south of the wreck of your crashed escape pod.  "
            + "Some cliffs rise to the northeast.  "
            + "A sea of dunes stretches away in every other direction."
            + "Except... there!  In the distance!  You see... "
            + "No, on second thought, that's just an eyeball floater.  "
            + "It was a pretty rough crash.  You should get checked out "
            + "whenever you next find a doctor. ", [
            this.portal(["north"], Places.planetDesertCrashSite_Name()),
            this.portal(["south"], Places.planetDesertDeep_Name()),
            this.portal(["east"], Places.planetDesertDeep_Name()),
            this.portal(["west"], Places.planetDesertDeep_Name())
        ]);
    }
    static planetDesertSouth_Name() {
        return "Ekkis II - Desert - South of Crash Site";
    }
    planetDesertWest() {
        return this.place3(Places.planetDesertWest_Name(), "You stand in the trackless desert of the planet Ekkis II, "
            + "just west of the wreck of your crashed escape pod.  "
            + "Beyond the pod, some cliffs rise from the sand. "
            + "A sea of dunes stretch away in every other direction."
            + "\n\n"
            + "What does 'trackless' mean, anyway?  "
            + "It's not like most places are just brimming over with tracks.  "
            + "Maybe a train switchyard, you guess.  "
            + "But those are increasingly rare.", [
            this.portal(["east"], Places.planetDesertCrashSite_Name()),
            this.portal(["north"], Places.planetDesertDeep_Name()),
            this.portal(["south"], Places.planetDesertDeep_Name()),
            this.portal(["west"], Places.planetDesertDeep_Name()),
        ]);
    }
    static planetDesertWest_Name() {
        return "Ekkis II - Desert - West of Crash Site";
    }
    // Places - Ekkis 2 - Cliffs.
    planetCliffsBottomNorth() {
        return this.place3(Places.planetCliffsBottomNorth_Name(), "You stand on the sand of the Ekkis II desert, just to the south  "
            + "of a steep stone cliff running from west to east.  "
            + "Other cliffs can be seen to the west, east, and south.  "
            + "\n\n"
            + "This cliff seems especially cliffy indeed, "
            + "but you're reserving judgement "
            + "until you've seen all the entrants.  It's only fair.", [
            this.portal(["south"], Places.planetCliffsBottomSouth_Name()),
            this.portal(["west"], Places.planetCliffsBottomNorthwestEastSide_Name()),
            this.portal(["east"], Places.planetCliffsBottomNortheast_Name())
        ]);
    }
    static planetCliffsBottomNorth_Name() {
        return "Ekkis II - Cliffs - Bottom - North";
    }
    planetCliffsBottomNortheast() {
        return this.place3(Places.planetCliffsBottomNortheast_Name(), "You stand on the sand of the Ekkis II desert, just to the south  "
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
            + "as far as the eye can see.  Well, your eyes, at least.", [
            this.portal(["south"], Places.planetCliffsBottomSoutheast_Name()),
            this.portal(["west"], Places.planetCliffsBottomNorthwestEastSide_Name()),
            this.portal(["east"], Places.planetDesertDeep_Name())
        ]);
    }
    static planetCliffsBottomNortheast_Name() {
        return "Ekkis II - Cliffs - Bottom - Northeast";
    }
    ;
    planetCliffsBottomNorthwestEastSide() {
        return this.place3(Places.planetCliffsBottomNorthwestEastSide_Name(), "You stand on the sand of the Ekkis II desert, at the base  "
            + "of a sheer stone cliff that curves away to the south and east.  "
            + "\n\n"
            + "The cliff, to an unarguable degree, "
            + "blocks progress to the north and west, "
            + "so don't you even try it.", [
            this.portal(["east"], Places.planetCliffsBottomNorth_Name()),
            this.portal(["south"], Places.planetCliffsBottomSouthwest_Name())
        ]);
    }
    static planetCliffsBottomNorthwestEastSide_Name() {
        return "Ekkis II - Cliffs - Bottom - Northwest - East Side";
    }
    planetCliffsBottomNorthwestWestSide() {
        var description = "You stand on the sand of the Ekkis II desert, at the base  "
            + "of a sheer stone cliff that curves away to the south and east,  "
            + "and which blocks passage to the east.  "
            + "\n\n"
            + "The site where your escape pod crashed is to the west."
            + "\n\n"
            + "To the south, more cliffs are visible. "
            + "\n\n"
            + "The desert stretches away to the north and west."
            + "\n\n"
            + "The cliff face has a nearly circular hole in it, "
            + "a little less than two meters off the ground.  "
            + "Nice: you like a cliff face with a little somethin' goin' on.";
        return this.place3(Places.planetCliffsBottomNorthwestWestSide_Name(), description, [
            this.portal(["south"], Places.planetCliffsBottomSouthwest_Name()),
            this.portal(["west"], Places.planetDesertCrashSite_Name()),
            this.emplacement2(["hole"], "This is a hole in the side of the cliff face, "
                + "about 40 centimeters in diameter.  Its interior is "
                + "deeply shadowed, making it impossible to see what, "
                + "if anything, might be inside it.").commandAdd(new Command(["look hole", "look in hole", "reach in hole", "put hand in hole"], this.scripts.placePlanetCliffsBottomNorthwestWestSide_LookInHole.name))
        ]);
    }
    static planetCliffsBottomNorthwestWestSide_Name() {
        return "Ekkis II - Cliffs - Bottom - Northwest - West Side";
    }
    planetCliffsBottomSouth() {
        return this.place3(Places.planetCliffsBottomSouth_Name(), "You stand on the desert of Ekkis II, "
            + "in a area surrounded by a system of cliffs.  "
            + "In the shelter afforded by the cliffs, "
            + "some stunted greenery actually manages to cling to life.  "
            + "\n\n"
            + "Overhead, a weathered stone arch bridges the tops of the cliffs "
            + "to the east with those to the west.  "
            + "It's very picturesque, and you without a camera."
            + "\n\n"
            + "Surface paths between cliff bases run to the west, north, and east.", [
            this.portal(["east"], Places.planetCliffsBottomSoutheast_Name()),
            this.portal(["north"], Places.planetCliffsBottomNorth_Name()),
            this.portal(["west"], Places.planetCliffsBottomSouthwest_Name()),
        ]);
    }
    static planetCliffsBottomSouth_Name() {
        return "Ekkis II - Cliffs - Bottom - South";
    }
    planetCliffsBottomSoutheast() {
        return this.place3(Places.planetCliffsBottomSoutheast_Name(), "You stand on a clear stretch of sand amid a formation of stone cliffs.  "
            + "The sandy surface of the desert runs to the north and to the west. "
            + "\n\n"
            + "To the east is a tall, confused jumble of rocks, "
            + " in which a large, shadowy cave mouth opens.  "
            + "What with the sun(s) and all, "
            + "you feel you could really go for some shadows about now,"
            + "even though you normally sleep with a night-light."
            + "\n\n"
            + "On the west side of the clearing, a stone slope rises jaggedly "
            + "upward between jutting upright stones, forming a natural stone ramp "
            + "that climbs as it runs northward and then turns west toward the top.", [
            this.portal(["north"], Places.planetCliffsBottomSouth_Name()),
            this.portal(["west"], Places.planetCliffsBottomSouth_Name()),
            this.portal(["east", "cave"], Places.planetCliffsCaveInterior_Name()),
            this.portal(["up", "slope", "ramp"], Places.planetCliffsTopSouthEastSide_Name())
        ]);
    }
    static planetCliffsBottomSoutheast_Name() {
        return "Ekkis II - Cliffs - Bottom - Southeast";
    }
    planetCliffsBottomSouthwest() {
        return this.place3(Places.planetCliffsBottomSouthwest_Name(), "More cliffs here, and sand.  "
            + "This planet only has a couple of things going on, "
            + "but danged if it disappoints on the cliff and sand front."
            + "\n\n"
            + "Specifically, cliffs rise to the north and east, "
            + "while to the south and west lies sand.  "
            + "It's balanced.  Kind of a yin-yang thing.  "
            + "Though you're not sure which is which.  "
            + "Or maybe they doubled up on yang.", [
            this.portal(["east"], Places.planetCliffsBottomSouth_Name()),
            this.portal(["north"], Places.planetCliffsBottomNorthwestEastSide_Name())
        ]);
    }
    static planetCliffsBottomSouthwest_Name() {
        return "Ekkis II - Cliffs - Bottom - Southwest";
    }
    ;
    planetCliffsCaveInterior() {
        return this.place4(Places.planetCliffsCaveInterior_Name(), "You stand in the mouth of a cave.  "
            + "The intense light of the outside desert "
            + "reaches only a short way into the darkness.  "
            + "Some mossy vegetation clings to the rock near the entrance.  "
            + "To the west the cave opens back out to "
            + "the Ekkis II desert.  "
            + "\n\n"
            + "There's... well, to be frank, there's a smell.", this.scripts.placePlanetCliffsCaveInterior_Update.name, [
            this.portal3(["west", "out", "outside"], Places.planetCliffsBottomSoutheast_Name(), this.scripts.placePlanetCliffsCaveInterior_GoWest.name),
            this.portal3(["east"], Places.planetCliffsBottomSoutheast_Name(), this.scripts.placePlanetCliffsCaveInterior_GoEast.name),
            Agent.fromNamesAndDescription(["cave beast", "beast", "monster", "creature"], "It's dark in here, but as near as you can make out, "
                + "you think this might be a monster charging toward you, "
                + "presumably to kill you.").commandAdd(new Command(MessageHelper.combinePhraseArrays([
                ["throw"],
                ["canteen", "bottle", "dehydrated water"],
                [null, "at"],
                ["cave beast", "beast", "monster", "creature"]
            ]), this.scripts.placePlanetCliffsCaveInterior_ThrowCanteenAtBeast.name))
        ]);
    }
    static planetCliffsCaveInterior_Name() {
        return "Ekkis II - Cliffs - Cave - Interior";
    }
    planetCliffsTopNorth() {
        return this.place3(Places.planetCliffsTopNorth_Name(), "You stand atop a rocky cliff rising from the desert "
            + "of the planet Ekkis II.  "
            + "The top of the cliff continues to the west and east."
            + "The path is especially narrow and precarious here.  "
            + "You're glad you can just type 'go east' or whatever "
            + "rather than turning the game speed way down "
            + "and picking your way along one step at a time.", [
            this.portal(["east"], Places.planetCliffsTopNortheast_Name()),
            this.portal(["west"], Places.planetCliffsTopNorthwest_Name())
        ]);
    }
    static planetCliffsTopNorth_Name() {
        return "Ekkis II - Cliffs - Top - North";
    }
    planetCliffsTopNortheast() {
        return this.place3(Places.planetCliffsTopNortheast_Name(), "You stand on the end of a clifftop "
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
            + "runs back toward the west, where there is also no water.", [
            this.portal(["west"], Places.planetCliffsTopNorth_Name()),
            this.portal(["horns", "columns"], Places.planetCavernsElevator_Name())
        ]);
    }
    static planetCliffsTopNortheast_Name() {
        return "Ekkis II - Cliffs - Top - Northeast";
    }
    planetCliffsTopNorthwest() {
        return this.place3(Places.planetCliffsTopNorthwest_Name(), "You stand atop a cliff rising from the desert of the planet Ekkis II.  "
            + "The path along the clifftop curves from the south to the east.  "
            + "\n\n"
            + "Some jagged peaks jut upward along the northern edge of the cliff.  "
            + "Hey, at least these cliffs are trying something new.", [
            this.portal(["east"], Places.planetCliffsTopNorth_Name()),
            this.portal(["south"], Places.planetCliffsTopSouthwest_Name())
        ]);
    }
    static planetCliffsTopNorthwest_Name() {
        return "Ekkis II - Cliffs - Top - Northwest";
    }
    planetCliffsTopSouthEastSide() {
        return this.place3(Places.planetCliffsTopSouthEastSide_Name(), "You stand atop a cliff rising from the desert of the planet Ekkis II."
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
            + "But no, you just came from there, and it's all dyllic enough.", [
            this.portal(["east"], Places.planetCliffsBottomSoutheast_Name()),
            this.portal(["west", "arch", "bridge"], Places.planetCliffsTopSouthWestSide_Name()).scriptUseNameSet(this.scripts.placePlanetCliffsTopSouth_CrossBridge.name)
        ]);
    }
    static planetCliffsTopSouthEastSide_Name() {
        return "Ekkis II - Cliffs - Top - Arch - East Side";
    }
    planetCliffsTopSouthWestSide() {
        return this.place3(Places.planetCliffsTopSouthWestSide_Name(), "You stand atop a cliff rising from the desert of the planet Ekkis II."
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
            + "which past experience tells you you should never do again.  ", [
            this.portal(["east", "arch", "bridge"], Places.planetCliffsTopSouthEastSide_Name()).scriptUseNameSet(this.scripts.placePlanetCliffsTopSouth_CrossBridge.name),
            this.portal(["west"], Places.planetCliffsTopSouthwest_Name())
        ]);
    }
    static planetCliffsTopSouthWestSide_Name() {
        return "Ekkis II - Cliffs - Top - Arch - West Side";
    }
    planetCliffsTopSouthwest() {
        return this.place3(Places.planetCliffsTopSouthwest_Name(), "You stand atop a cliff rising from the desert of the planet Ekkis II.  "
            + "The path along the clifftop curves "
            + "from the east, where a natural stone bridge "
            + "arches over the desert surface, "
            + "and continues to the north."
            + "\n\n"
            + "The word 'arroyo' crosses your mind.  "
            + "You're not exactly sure what an arroyo is,"
            + "and you're reasonably sure this isn't one, "
            + "but this whole place feels pretty arroyoey.", [
            this.portal(["north"], Places.planetCliffsTopNorthwest_Name()),
            this.portal(["east"], Places.planetCliffsTopSouthWestSide_Name())
        ]);
    }
    static planetCliffsTopSouthwest_Name() {
        return "Ekkis II - Cliffs - Top - Southwest";
    }
    // Places - Ekkis 2 - Caverns.
    planetCavernsBarrier() {
        return this.place3(Places.planetCavernsBarrier_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis II.  "
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
            + "Back on this side of the barrier, a lower path leads back to the east.", [
            this.portal(["east"], Places.planetCavernsPool_Name()),
            this.portal3(["west", "barrier", "laser barrier"], Places.planetCavernsDripsBefore_Name(), this.scripts.placePlanetCavernsBarrier_GoBarrier.name),
            this.emplacement([
                "laser barrier",
                "barrier",
                "lasers",
                "beams",
                "beams of light",
                "light"
            ]).activate().commandAdd(new Command(MessageHelper.combinePhraseArrays([
                ["put", "place", "hold", "use"],
                [
                    "reflective glass",
                    "glass",
                    "shards",
                    "shards of glass"
                ],
                [null, "in", "on"],
                [
                    "laser barrier",
                    "barrier",
                    "lasers",
                    "beams",
                    "beams of light",
                    "light"
                ]
            ]), this.scripts.placePlanetCavernsBarrier_PutGlassInBarrier.name))
        ]);
    }
    static planetCavernsBarrier_Name() {
        return "Ekkis II - Caverns - Barrier";
    }
    planetCavernsDrips1() {
        return this.place4(Places.planetCavernsDrips1_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis II, "
            + "in a passage where drips of clear liquid fall intermittently "
            + "from the ceiling and through small, precise holes in the floor "
            + "that appear as if they were made to fit them."
            + "\n\n"
            + "The passage continues to the east, under two more sets of drips, "
            + "each set dripping in its own distinct rhythm."
            + "\n\n"
            + "To the west, the passage leads back "
            + "toward the entrance to the caverns.", this.scripts.placePlanetCavernsDrips_Update.name, [
            this.portal(["west"], Places.planetCavernsDripsBefore_Name()),
            this.portal(["east"], Places.planetCavernsDrips2_Name())
        ]);
    }
    static planetCavernsDrips1_Name() {
        return "Ekkis II - Caverns - Drips - West";
    }
    planetCavernsDrips2() {
        return this.place4(Places.planetCavernsDrips2_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis II, "
            + "in a passage where drips of clear liquid fall intermittently "
            + "from the ceiling and through small, precise holes in the floor "
            + "that appear as if they were made to fit them."
            + "\n\n"
            + "To the west and to the east, the passage continues under more, "
            + "similar drips, each set of drips dripping in its own distinct rhythm.", this.scripts.placePlanetCavernsDrips_Update.name, [
            this.portal(["west"], Places.planetCavernsDrips1_Name()),
            this.portal(["east"], Places.planetCavernsDrips3_Name())
        ]);
    }
    static planetCavernsDrips2_Name() {
        return "Ekkis II - Caverns - Drips - Middle";
    }
    planetCavernsDrips3() {
        return this.place3(Places.planetCavernsDrips3_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis II, "
            + "in a passage where drips of clear liquid fall intermittently "
            + "from the ceiling and through small, precise holes in the floor "
            + "that appear as if they were made to fit them."
            + "\n\n"
            + "The passage continues, thankfully drier, to the east."
            + "\n\n"
            + "To the west, the passage leads back toward the entrance to the caverns, "
            + "passing under another two sets of drips, "
            + "each dripping in its own distinct rhythm.", [
            this.portal(["west"], Places.planetCavernsDrips2_Name()),
            this.portal(["east"], Places.planetCavernsDripsAfter_Name())
        ]);
    }
    static planetCavernsDrips3_Name() {
        return "Ekkis II - Caverns - Drips - East";
    }
    planetCavernsDripsBefore() {
        return this.place4(Places.planetCavernsDripsBefore_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis II.  "
            + "\n\n"
            + "A passage runs to the east, under drips of a clear liquid "
            + "fall intermittently from the ceiling.  "
            + "Each drip passes into a small, precise hole in the floor "
            + "that appears as if it were made to fit it."
            + "\n\n"
            + "If this is supposed to be a water feature, "
            + "it's got nothing on your grandparents' "
            + "topless bronze torso model pouring a bottomless jar into a pool.  "
            + "They just don't make water features "
            + "sexy like they used to."
            + "\n\n"
            + "To the west, another passage leads back "
            + "toward the entrance to the caverns, "
            + "curving left in a rough semicircle back down to the level below.", this.scripts.placePlanetCavernsDrips_Update.name, [
            this.portal(["west"], Places.planetCavernsBarrier_Name()),
            this.portal(["east"], Places.planetCavernsDrips1_Name())
        ]);
    }
    static planetCavernsDripsBefore_Name() {
        return "Ekkis II - Caverns - West of Drips";
    }
    planetCavernsDripsAfter() {
        return this.place4(Places.planetCavernsDripsAfter_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis II.  "
            + "\n\n"
            + "A passage runs to the west, under drips of a clear liquid "
            + "that fall intermittently from the ceiling.  "
            + "Each drip passes into a small, precise hole in the floor "
            + "that appears as if it were made to fit it."
            + "\n\n"
            + "You're amazed that you managed to get on this side of the drips "
            + "without getting dripped on even once. "
            + "You must have a great sense of timing.  "
            + "Though, if your timing is so great, how is it possible "
            + "that you keep bombing so hard at open-mic stand-up comedy night?"
            + "\n\n"
            + "To the west, another passage leads back "
            + "toward the entrance to the caverns, "
            + "curving left in a rough semicircle back down to the level below.", this.scripts.placePlanetCavernsDrips_Update.name, [
            this.portal(["west"], Places.planetCavernsDrips3_Name()),
            this.portal(["east"], Places.planetCavernsProjectionRoom_Name())
        ]);
    }
    static planetCavernsDripsAfter_Name() {
        return "Ekkis II - Caverns - East of Drips";
    }
    planetCavernsElevator() {
        return this.place3(Places.planetCavernsElevator_Name(), "You stand at the bottom of the elevator that brought you down "
            + "what seemes like hundreds of meters "
            + "from the edge of a remote clifftop on the surface of a desert planet "
            + "to a cool, dark, rocky cavern.  "
            + "This setup all seems very inconvenient to you, "
            + "but hey, at least it wasn't stairs."
            + "\n\n"
            + "The elevator door lies at the east side of the passage."
            + "\n\n"
            + "From there, the passage runs to the west, deeper into the cavern.", [
            this.portal(["elevator", "door", "up", "east"], Places.planetCliffsTopNortheast_Name()),
            this.portal(["west"], Places.planetCavernsGratingEastSide_Name()),
            Items.Instance().Rock,
        ]);
    }
    static planetCavernsElevator_Name() {
        return "Ekkis II - Caverns - Elevator";
    }
    planetCavernsGeyser() {
        return this.place3(Places.planetCavernsGeyser_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis II."
            + "\n\n"
            + "The passage to the west ends abruptly in a solid rock wall."
            + "Nearby, a small geyser shoots out of a hole "
            + "in the top of a stalagmite, wetly and steamily, "
            + "but not in, like, a gross way.  "
            + "Though, again, and I know I'm throwing this phrase around a lot recently, "
            + "but, again, undeniably, there does happen to be a smell."
            + "\n\n"
            + "Another passage leads back east, toward the cavern entrance.", [
            this.portal(["west", "door"], Places.planetCavernsPool_Name()).block().hide(),
            this.portal(["east"], Places.planetCavernsGratingWestSide_Name()),
            this.emplacement2(["wall"], "Examining the wall closely, "
                + "you see a faint rectangular outline of hairline cracks in the rock. "
                + "It happens to a lot of us as we get older.  "
                + "Geological age ain't nothin' but a number.  "
                + "Well, usually a number and a unit.  Like 'megayear'."),
            this.emplacement2(["geyser"], "You examine the geyser.  "
                + "Aw, what a bubbly, happy little guy. "
                + "It's a good thing the sun isn't blazing so hot inside this cavern,"
                + "Or you'd be tempted to take a drink of the steaming hot liquid.  "
                + "And that, even assuming it's just water, would melt your esophagus.  ").commandAddFromTextsAndScriptName(MessageHelper.combinePhraseArrays([
                ["put", "insert", "place", "shove", "jam"],
                ["rock", "stone"],
                [null, "in", "into", "on"],
                ["geyser", "hole", "stalagmite"]
            ]), this.scripts.placePlanetCavernsGeyser_PutRockInGeyser.name)
        ]);
    }
    static planetCavernsGeyser_Name() {
        return "Ekkis II - Caverns - Geyser";
    }
    planetCavernsGratingEastSide() {
        return this.place3(Places.planetCavernsGratingEastSide_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis II, "
            + "in a passage running from east to west."
            + "\n\n"
            + "In the floor leading to the west, a thick metal grating "
            + "perforated with holes about 10 centimeters wide "
            + "stretches from wall to wall across the entire passage. ", [
            this.emplacement2(["grate", "grating", "grille"], "You bend over and look closely at the grating."
                + "You think you see something moving down there.  "
                + "And maybe you hear some sloshing.  "
                + "And, yeah, there's a smell.  "
                + "For a metal grate in a cave, "
                + "it's kind of a sensory smorgasbord.").commandAddFromTextsAndScriptName(MessageHelper.combinePhraseArrays([
                ["put", "drop", "set", "throw"],
                ["can", "sham", "can of sham"],
                [null, "on", "at"],
                ["grating", "grate", "grille"]
            ]), this.scripts.placePlanetCavernsGrating_PutCanOfShamOnGrating.name),
            this.portal3(["west", "grating", "grate", "grille"], Places.planetCavernsGratingWestSide_Name(), this.scripts.placePlanetCavernsGrating_CrossGrating.name),
            this.portal(["east"], Places.planetCavernsElevator_Name())
        ]);
    }
    static planetCavernsGratingEastSide_Name() {
        return "Ekkis II - Caverns - Grating - East Side";
    }
    planetCavernsGratingWestSide() {
        return this.place3(Places.planetCavernsGratingWestSide_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis II, "
            + "in a passage running from east to west."
            + "\n\n"
            + "In the floor leading back to the east, a thick metal grating "
            + "perforated with holes about 10 centimeters wide "
            + "stretches from wall to wall across the entire passage.  "
            + "\n\n"
            + "Now that you're on this side of it, "
            + "it seems only fair to remind you, in case you've forgotten, "
            + "that there's a monster down there able to, and willing to, "
            + "eat an unopened can of Sham (tm) in a matter of seconds.", [
            this.emplacement3(["grate", "grating", "grille"], this.scripts.placePlanetCavernsGrating_CrossGrating.name, "You bend over and look closely at the grating."
                + "You can see some slight movement, "
                + "hear some bathtub noises,  "
                + "and there is, as there frequently is in your life lately, a smell.  "
                + "\n\n"
                + "Whatever's down there is likely still down there, "
                + "unless this is its coworker and they're taking it in shifts.").commandAddFromTextsAndScriptName(["put can of sham on grating"], this.scripts.placePlanetCavernsGrating_PutCanOfShamOnGrating.name),
            this.portal(["west"], Places.planetCavernsGeyser_Name()),
            this.portal(["east", "grating", "grate", "grille"], Places.planetCavernsGratingEastSide_Name())
        ]);
    }
    static planetCavernsGratingWestSide_Name() {
        return "Ekkis II - Caverns - Grating - West Side";
    }
    planetCavernsPool() {
        return this.place3(Places.planetCavernsPool_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis II. "
            + "You stand on a wide ledge that runs south, back through a hidden doorway, "
            + " where a plugged geyser steams fitfully.  To the west, the ledge runs "
            + "through dark natural stone columns and on into the darkness.  "
            + "Far below the ledge is a pool of clear liquid, "
            + "with drips falling from holes in the ceiling to fill it.  "
            + "A passage leads back to the east.", [
            this.portal(["west"], Places.planetCavernsBarrier_Name()),
            this.portal(["east"], Places.planetCavernsGeyser_Name()),
            this.emplacement2(["pool", "pool of water"], [
                "This is a transparent pool in a basin of gleaming crystal, ",
                "fed from above by drops that rain from the ceiling, ",
                "making concentric circles on the otherwise still surface.  ",
                "\n\n",
                "It's so Zen that it gets you excited.",
                "Which makes it not Zen.  ",
                "Which, in turn, makes it even more Zen.  ",
                "Zen is tricky like that."
            ].join("")).commandAddFromTextsAndScriptName(MessageHelper.combinePhraseArrays([
                ["drink"],
                [null, "from"],
                ["pool", "water", "liquid"]
            ]), this.scripts.placePlanetCavernsPool_DrinkFromPool.name)
        ]);
    }
    static planetCavernsPool_Name() {
        return "Ekkis II - Caverns - Pool";
    }
    planetCavernsProjectionRoom() {
        return this.place4(Places.planetCavernsProjectionRoom_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis II. "
            + "\n\n"
            + "This space is completely dark at the moment.  "
            + "Earlier, it was lit only "
            + "by a holographic projection of a triangular-headed alien.  "
            + "In retrospect, that giant alien head really livened up the decor."
            + "A passage leads back to the east.", this.scripts.placePlanetCavernsProjectionRoom_Update.name, [
            this.portal(["west"], Places.planetCavernsDrips3_Name()),
            this.portal(["north"], Places.planetCavernsSteamworks_Name()).block().hide()
        ]);
    }
    static planetCavernsProjectionRoom_Name() {
        return "Ekkis II - Caverns - Projection Room";
    }
    planetCavernsSteamworks() {
        return this.place3(Places.planetCavernsSteamworks_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis II. "
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
            + "that appears to open onto a large elevator platform.", [
            this.portal(["south"], Places.planetCavernsProjectionRoom_Name()),
            this.emplacement2(["cartridge reader", "reader"], "A computer console with a monitor and standard data cartridge slot "
                + "stands against the north wall.  Here, in the ancient steamworks of "
                + "a lost civilization under the surface of a barely inhabited planet.  "
                + "You knew the cartridge technology wasn't exactly state-of-the-art, "
                + "but this is ridiculous."),
            this.emplacement(["alien"]).commandAdd(new Command(["talk to alien"], this.scripts.placePlanetCavernsSteamworks_TalkToAlien.name))
        ]);
    }
    static planetCavernsSteamworks_Name() {
        return "Ekkis II - Caverns - Steamworks";
    }
    // Places - Ekkis 2 - Village of [Farting Noise].
    planetSettlementBarFront() {
        return this.place4(Places.planetSettlementBarFront_Name(), "You stand in the tiny settlement named, "
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
            + "so you guess it must work.", this.scripts.placePlanetSettlementBarFront_Update.name, [
            this.portal(["north"], Places.planetSettlementRobotShopWest_Name()),
            this.portal(["west"], Places.planetSettlementUsedShipLot_Name()),
            this.portal(["east"], Places.planetSettlementBarRear_Name()),
            this.portal(["south"], Places.planetDesertDeep_Name()),
            this.portal(["bar"], Places.planetSettlementBarInterior_Name()),
            Agent.fromNamesAndDescription(["person", "being"], +"This being is hanging around outside a bar "
                + "in the middle of the day.  He must be rich.").commandAddFromTextsAndScriptName(["talk to person", "talk to being"], this.scripts.placePlanetSettlementBarFront_TalkToPerson.name),
            this.emplacement2(["skimmer", "vehicle", "car"], "This is the sand-skimmer that the ancient desert cavern aliens "
                + "gave you after you did that contract killing for them.  "
                + "\n\n"
                + "Man, space is weird.").commandAddFromTextsAndScriptName(MessageHelper.combinePhraseArrays([
                ["get", "take"],
                [null, "skimmer"],
                [null, "ignition"],
                ["key"]
            ]), this.scripts.placePlanetSettlementBarFront_GetSkimmerKey.name)
        ]);
    }
    static planetSettlementBarFront_Name() {
        return "Ekkis II - [Farting Noise] - Bar - Front";
    }
    planetSettlementBarInterior() {
        var description = [
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
        return this.place3(Places.planetSettlementBarInterior_Name(), description, [
            this.portal(["west", "out", "outside", "door"], Places.planetSettlementBarFront_Name()),
            this.emplacement2(["band", "performers", "musicians", "singer"], "You like some of their early stuff.").commandAdd(new Command(["talk band", "talk to band"], this.scripts.placePlanetSettlementBarInterior_TalkToBand.name)),
            this.emplacement2(["bar"], "The light is neither very bright nor pleasant, "
                + "nor is the bar polished.  "
                + "That's a literary reference, kids.  "
                + "It's from a story about a guy who's suicidal.  "
                + "Looking around this place, you can totally understand why."),
            this.emplacement2(["machine", "slot machine", "gambling machine"], "It appears to be some variant of a slot machine.  "
                + "When the player inserts some money "
                + "and pulls the handle on the side, "
                + "behind each of three little viewing slots, "
                + "a reel printed with various symbols around its edge spins, "
                + "eventually stopping so that a random symbol is visible through the slot."
                + "If the symbols match, you presumably get some sort of prize."
                + "\n\n"
                + "You were never cool, or dumb, enough to enjoy gambling."),
            this.emplacement2(["bartender", "barman"], "This bartender doesn't appear to be the "
                + "'listen to your problems' kind of bartender.  "
                + "You try to catch his eye, but he evades your gaze "
                + "with the effortless skill of long practice.").commandAdd(new Command([
                "talk to bartender", "talk to barman",
                "talk bartender", "talk barman"
            ], this.scripts.placePlanetSettlementBarInterior_TalkToBartender.name)).commandAdd(new Command([
                "buy bru-ale", "buy drink", "buy beer",
                "order bru-ale", "order drink", "order beer"
            ], this.scripts.placePlanetSettlementBarInterior_BuyDrink.name)),
            this.emplacement2(["customers", "patrons", "barflies"], "I suppose 'patrons' is a rather grand name "
                + "for this motley amalgamation of limbs, tongues, "
                + "poor attitudes, bad habits, "
                + "and unpleasant fluids, "
                + "but at least if we call them patrons we don't have to focus "
                + "on their distinguishing characteristics.").commandAdd(new Command(MessageHelper.combinePhraseArrays([
                ["talk", "talk to"],
                ["customers", "patrons", "barflies"]
            ]), this.scripts.placePlanetSettlementBarInterior_TalkToCustomers.name)),
            this.emplacement3(["slot machine", "gambling machine", "machine"], "It's a Gamblomat Model MDK.  "
                + "You think this thing might have been banned "
                + "in the more reputable parts of the Commonwealth.  "
                + "Something about a bunch of people who used it getting hurt.  "
                + "You're not sure you understand how.  "
                + "How dangerous can a slot machine be?  ", this.scripts.placePlanetSettlementBarInterior_UseSlotMachine.name)
        ]);
    }
    static planetSettlementBarInterior_Name() {
        return "Ekkis II - [Farting Noise] - Bar - Interior";
    }
    planetSettlementBarRear() {
        return this.place3(Places.planetSettlementBarRear_Name(), "You stand behind the [Farting Noise] bar.  "
            + "It is somewhat secluded here."
            + "Anti-sand-swimmer force-fields block access to the surrounding desert "
            + "to the east and south.  "
            + "You can see another, larger building to the north.  "
            + "\n\n"
            + "As you stand around loitering behind a bar, "
            + "reflecting on how Mom said this is exactly how you'd end up,"
            + "a hatch in the back wall of the bar opens "
            + "and expels some fine white powder, "
            + "which settles onto a larger heap of powder below.", [
            this.portal(["north"], Places.planetSettlementRobotShopWest_Name()),
            this.portal(["west"], Places.planetSettlementUsedShipLot_Name()),
            this.portal(["east"], Places.planetSettlementBarRear_Name()),
            this.emplacement2(["heap", "pile"], "This is a heap of finely divided white power.  "
                + "Looks a bit like ashes, except who burns things anymore?")
        ]);
    }
    static planetSettlementBarRear_Name() {
        return "Ekkis II - [Farting Noise] - Bar - Rear";
    }
    planetSettlementRobotShopFront() {
        return this.place3(Places.planetSettlementRobotShopFront_Name(), "You stand in the desert settlement of [Farting Noise], "
            + "to the south of the entrance door of a domed building "
            + "bearing the sign 'Buy, Robot'.  "
            + "\n\n"
            + "You figure that name is probably a half-haunched "
            + "joking reference to something.  "
            + "You generally don't get joking references, "
            + "but you find they get even less funny "
            + "if you ask someone to explain them.  So never mind.", [
            this.portal(["west"], Places.planetSettlementRobotShopWest_Name()),
            this.portal(["door", "shop", "store", "inside"], Places.planetSettlementRobotShopInterior_Name())
        ]);
    }
    static planetSettlementRobotShopFront_Name() {
        return "Ekkis II - [Farting Noise] - Buy, Robot - Front";
    }
    planetSettlementRobotShopInterior() {
        var returnPlace = this.place3(Places.planetSettlementRobotShopInterior_Name(), "You stand inside the [Farting Noise] branch of 'Buy, Robot'. "
            + "Various currently-unmoving robots are displayed on pedestals, "
            + "each bearing a more-or-less conspicious price tag.  "
            + "A salesbeing watches you idly, perhaps waiting "
            + "to see if you require assistance "
            + "or if you're just going to ask to use the bathroom.  "
            + "Maybe they're even making a little bet with themself "
            + "over which it will be."
            + "\n\n"
            + "A door leads back outside, as doors do.", [
            this.portal(["outside", "door"], Places.planetSettlementRobotShopFront_Name()),
            this.emplacement2([
                "wheeled robot",
                "domestic robot",
                "general toiler s-34",
                "general toiler",
                "s-34"
            ], "As you move to examine the robot, "
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
                + "Its price is 40 credits, or 32 with coupon.'"),
            this.emplacement2([
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
            ], "As you move to examine the robot, "
                + "the salesbeing smoothly interposes themself.  "
                + "'This is the Astromatix Stardodger QG.  "
                + "It's the best pilot/navigator robot money can buy.'  "
                + "He slaps the robot's... pauldron?... briskly, and continues, "
                + "'You can fit so many starmaps into this bad boy."
                + "Its price is 45 credits, or 36 with coupon.'"),
            this.emplacement2([
                "six-legged robot",
                "farming robot",
                "farmer",
                "Agron Cultivo F-12",
                "Agron",
                "Cultivo",
                "F-12"
            ], "As you move to examine the robot, "
                + "the salesbeing smoothly interposes themself.  "
                + "'This is the Agron Cultivo F-12.  "
                + "It's a farming robot.  "
                + "Now, you might say, can't be much farming going on "
                + "here on the deserts of Ekkis II.  And you'd be right.  "
                + "But that just means you have an opportunity "
                + "to get in on the ground floor.  "
                + "Or the ground ground, in this case."
                + "Its price is 300 credits, or 240 with coupon.'"),
            this.emplacement2([
                "drill-faced robot",
                "mining robot",
                "miner",
                "Stope & Adit Deep Dolly",
                "Stope & Adit",
                "Deep Dolly"
            ], "As you move to examine the robot, "
                + "the salesbeing smoothly interposes themself.  "
                + "'This is the Stope & Adit Deep Dolly.  "
                + "It's a mining robot.  "
                + "And I always say, what's mine is yours."
                + "For only 700 credits, or 560 with coupon.'"),
            this.emplacement2([
                "gun-armed robot",
                "military/security/military security robot",
                "military robot",
                "security robot",
                "military security robot",
                "soldier robot",
                "BlackDark KLR-688",
                "BlackDark",
                "KLR-688"
            ], "As you move to examine the robot, "
                + "the salesbeing smoothly interposes themself.  "
                + "'This is the BlackDark KLR-668 with Bioexclusion Package.  "
                + "It's a military/security/military security robot.  "
                + "We're technically only supposed to sell this to governments.  "
                + "But if I may say so, you have a rather sovereign look about you, "
                + "so I might be convinced to expedite the paperwork for you,"
                + "provided the price is right. "
                + "And that right price is 2500 credits, or 2000 with coupon.'")
        ]);
        var emplacementsRobots = returnPlace.emplacements;
        for (var i = 0; i < emplacementsRobots.length; i++) {
            var emplacementRobot = emplacementsRobots[i];
            emplacementRobot.commandAddFromTextsAndScriptName(MessageHelper.combinePhraseArrays([
                ["buy", "purchase"],
                emplacementRobot.names
            ]), this.scripts.placePlanetSettlementRobotShopInterior_BuyRobot.name);
        }
        return returnPlace;
    }
    static planetSettlementRobotShopInterior_Name() {
        return "Ekkis II - [Farting Noise] - Buy, Robot - Interior";
    }
    planetSettlementRobotShopWest() {
        return this.place3(Places.planetSettlementRobotShopWest_Name(), "You stand in the desert settlement of [Farting Noise], "
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
            + "long enough to get nostalgic about it.", [
            this.portal(["south"], Places.planetSettlementBarFront_Name()),
            this.portal(["east"], Places.planetSettlementRobotShopFront_Name()),
            this.portal(["west"], Places.planetSettlementNorthOfUsedShipLot_Name())
        ]);
    }
    static planetSettlementRobotShopWest_Name() {
        return "Ekkis II - [Farting Noise] - Buy, Robot - West";
    }
    planetSettlementNorthOfUsedShipLot() {
        return this.place3(Places.planetSettlementNorthOfUsedShipLot_Name(), "You stand in the desert settlement of [Farting Noise].  "
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
            + "people are always not going to want to be eaten.", [
            this.portal(["east"], Places.planetSettlementRobotShopWest_Name()),
            this.portal(["south"], Places.planetSettlementUsedShipLot_Name())
        ]);
    }
    static planetSettlementNorthOfUsedShipLot_Name() {
        return "Ekkis II - [Farting Noise] - North of Non-Gelatinous George's Used Ships";
    }
    planetSettlementUsedShipLot() {
        return this.place3(Places.planetSettlementNorthOfUsedShipLot_Name(), "You stand in the desert settlement of [Farting Noise], "
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
            + "as Non-Gelatinous George would say, keeping in the savings.", [
            this.portal(["east"], Places.planetSettlementBarFront_Name()),
            this.portal(["north"], Places.planetSettlementNorthOfUsedShipLot_Name())
        ]);
    }
    static planetSettlementUsedShipLot_Name() {
        return "Ekkis II - [Farting Noise] - Non-Gelatinous George's Used Ships";
    }
    // Places - enemyShip.
    enemyShipAirlockAntechamber() {
        return this.place3(Places.enemyShipAirlockAntechamber_Name(), "This is the antechamber of an airlock on the Venipositor.", [
        // todo
        ]);
    }
    static enemyShipAirlockAntechamber_Name() {
        return "Venipositor - Airlock - Antechamber";
    }
    enemyShipAirlockChamber() {
        return this.place3(Places.enemyShipAirlockChamber_Name(), "This is the interior of one of the Venipositor's airlocks."
            + "Doors at either end lead inside and outside of the Venipositor", [
            this.portal(["in", "inside"], Places.enemyShipAirlockAntechamber_Name()),
            this.portal(["out", "outside"], Places.enemyShipAirlockExterior_Name())
        ]);
    }
    static enemyShipAirlockChamber_Name() {
        return "Venipositor - Airlock - Chamber";
    }
    enemyShipAirlockExterior() {
        return this.place3(Places.enemyShipAirlockExterior_Name(), "This is the exterior of the Venipositor, near an airlock door.  "
            + "The boundless sweep of space spreads out in all directions.", [
            this.portal(["door", "airlock", "inside", "in"], Places.enemyShipAirlockChamber_Name()),
        ]);
    }
    static enemyShipAirlockExterior_Name() {
        return "Venipositor - Exterior - Airlock Door";
    }
    enemyShipArmory() {
        return this.place3(Places.enemyShipArmory_Name(), "This is the armory of the Venipositor.  "
            + "\n\n"
            + "At the aft end, a high counter, with a heavily robot standing watch behind it, "
            + "blocks the path to the weapon racks.  "
            + "The Vadik seem to all be professional soldier/assassin/murderers, "
            + "so you have to worry about what kind of weapons they keep under lock and key.  "
            + "But maybe they just want to keep track of what kind of weapons are popular, "
            + "so they can order more of them?"
            + "\n\n"
            + "A door to forward leads back "
            + "out onto the catwalk above the Stellar Juvenator chamber.", [
            this.portal(["forward"], Places.enemyShipStellarJuvenatorChamberCatwalk_Name()),
            Items.Instance().GasGrenade.name
        ]);
    }
    static enemyShipArmory_Name() {
        return "Venipositor - Armory";
    }
    enemyShipLaundry() {
        return this.place3(Places.enemyShipLaundry_Name(), "This is a laundry room on the Venipositor.", [
        // todo
        ]);
    }
    static enemyShipLaundry_Name() {
        return "Venipositor - Laundry";
    }
    enemyShipLowerDeckHallAft() {
        return this.place3(Places.enemyShipLowerDeckHallAft_Name(), "This is the aft end of a hallway on the lower deck of the Venipositor.", [
            this.portal(["forward"], Places.enemyShipLowerDeckHallAmidships_Name())
        ]);
    }
    static enemyShipLowerDeckHallAft_Name() {
        return "Venipositor - Hall - Lower Deck - Aft";
    }
    enemyShipLowerDeckHallAmidships() {
        return this.place3(Places.enemyShipLowerDeckHallAmidships_Name(), "This is the amidships section of a hallway on the lower deck of the Venipositor.", [
            this.portal(["aft"], Places.enemyShipLowerDeckHallAft_Name()),
            this.portal(["forward"], Places.enemyShipLowerDeckHallFore_Name())
        ]);
    }
    static enemyShipLowerDeckHallAmidships_Name() {
        return "Venipositor - Hall - Lower Deck - Amidships";
    }
    enemyShipLowerDeckHallFore() {
        return this.place3(Places.enemyShipLowerDeckHallFore_Name(), "This is the forward end of a hallway on the lower deck of the Venipositor.", [
            this.portal(["aft"], Places.enemyShipLowerDeckHallAmidships_Name()),
        ]);
    }
    static enemyShipLowerDeckHallFore_Name() {
        return "Venipositor - Hall - Lower Deck - Forward";
    }
    enemyShipNearbySpace() {
        return this.place3(Places.enemyShipNearbySpace_Name(), "You are in your ship, hovering nearby the Vadik starship Venipositor."
            + "\n\n"
            + "It's a terrifying ship.  Its color scheme could best be described as "
            + "'Dried Blood on Rusty Murder Weapon.'"
            + "There are sharp edges, jagged metal teeth, and needlelike points everywhere, "
            + "most of which have a bunch of Vadik writing scrawled near them.  "
            + "On an ordinary ship, you'd expect such writing to be warnings "
            + "about how dangerous everything is, "
            + "but from what little you can read of it, "
            + "this writing seems instead to be bragging "
            + "about how dangerous everything is.", [
            this.portal(["outside", "door", "space"], Places.enemyShipAirlockExterior_Name())
        ]);
    }
    static enemyShipNearbySpace_Name() {
        return "Venipositor - Nearby Space";
    }
    enemyShipShuttleBay() {
        return this.place3(Places.enemyShipShuttleBay_Name(), "This is the shuttle bay of the Venipositor.", [
        // todo
        ]);
    }
    static enemyShipShuttleBay_Name() {
        return "Venipositor - Shuttle Bay";
    }
    enemyShipStellarJuvenatorChamber() {
        return this.place3(Places.enemyShipStellarJuvenatorChamber_Name(), "This is a cavernous room on the Venipositor.  "
            + "\n\n"
            + "The titanic Stellar Juvenator is mounted on a pedestal, "
            + "with an armed Vadik guard standing nearby.  "
            + "\n\n"
            + "The Stellar Juvenator glows and crackles with luminous energies.  "
            + "You're not sure how much of that is its normal operating mode. "
            + "\n\n"
            + "A catwalk runs overhead.", [
        // todo
        ]);
    }
    static enemyShipStellarJuvenatorChamber_Name() {
        return "Venipositor - Stellar Juvenator Chamber";
    }
    enemyShipStellarJuvenatorChamberCatwalk() {
        return this.place3(Places.enemyShipStellarJuvenatorChamberCatwalk_Name(), "You are standing on a railed catwalk above a "
            + " cavernous chamber on the Venipositor.  "
            + "\n\n"
            + "On the floor, far below, the Stellar Juvenator"
            + "is mounted on a pedestal, "
            + "with an armed Vadik guard standing nearby.  "
            + "\n\n"
            + "The catwalk runs fore and aft.", [
            this.portal(["aft"], Places.enemyShipArmory_Name()),
            this.portal(["forward"], "todo"),
        ]);
    }
    static enemyShipStellarJuvenatorChamberCatwalk_Name() {
        return "Venipositor - Stellar Juvenator Chamber - Catwalk";
    }
    enemyShipUpperDeckHallAft() {
        return this.place3(Places.enemyShipUpperDeckHallAft_Name(), "This is the aft end of a hallway on the upper deck of the Venipositor.", [
            this.portal(["forward"], Places.enemyShipUpperDeckHallAmidships_Name()),
        ]);
    }
    static enemyShipUpperDeckHallAft_Name() {
        return "Venipositor - Hall - Upper Deck - Aft";
    }
    enemyShipUpperDeckHallAmidships() {
        return this.place3(Places.enemyShipUpperDeckHallAmidships_Name(), "This is the amidships section of a hallway "
            + "on the upper deck of the Venipositor.", [
            this.portal(["aft"], Places.enemyShipUpperDeckHallAft_Name()),
            this.portal(["forward"], Places.enemyShipUpperDeckHallFore_Name()),
        ]);
    }
    static enemyShipUpperDeckHallAmidships_Name() {
        return "Venipositor - Hall - Upper Deck - Amidships";
    }
    enemyShipUpperDeckHallFore() {
        return this.place3(Places.enemyShipUpperDeckHallFore_Name(), "This is the forward end of a hallway on the upper deck of the Venipositor.", [
            this.portal(["aft"], Places.enemyShipUpperDeckHallAmidships_Name()),
        ]);
    }
    static enemyShipUpperDeckHallFore_Name() {
        return "Venipositor - Hall - Upper Deck - Forward";
    }
    enemyShipVentilationShaft1() {
        return this.place3(Places.enemyShipVentilationShaft1_Name(), "This is a ventilation shaft on the Venipositor.  "
            + "A short side branch leads to a vent cover.", [
            this.portal(["back"], Places.enemyShipVentilationShaft4_Name()),
            this.portal(["forward"], Places.enemyShipVentilationShaft1_Name()),
            this.portal(["vent"], Places.enemyShipAirlockAntechamber_Name())
        ]);
    }
    static enemyShipVentilationShaft1_Name() {
        return "Venipositor - Ventilation Shaft - 1";
    }
    enemyShipVentilationShaft2() {
        return this.place3(Places.enemyShipVentilationShaft2_Name(), "This is a ventilation shaft on the Venipositor.  "
            + "A short side branch leads to a vent cover.", [
            this.portal(["back"], Places.enemyShipVentilationShaft1_Name()),
            this.portal(["forward"], Places.enemyShipVentilationShaft3_Name()),
            this.portal(["vent"], Places.enemyShipLaundry_Name())
        ]);
    }
    static enemyShipVentilationShaft2_Name() {
        return "Venipositor - Ventilation Shaft - 2";
    }
    enemyShipVentilationShaft3() {
        return this.place3(Places.enemyShipVentilationShaft3_Name(), "This is a featureless stretch of ventilation shaft on the Venipositor.", [
            this.portal(["back"], Places.enemyShipVentilationShaft2_Name()),
            this.portal(["forward"], Places.enemyShipVentilationShaft4_Name())
        ]);
    }
    static enemyShipVentilationShaft3_Name() {
        return "Venipositor - Ventilation Shaft - 3";
    }
    enemyShipVentilationShaft4() {
        return this.place3(Places.enemyShipVentilationShaft4_Name(), "This is a featureless stretch of ventilation shaft on the Venipositor.", [
            this.portal(["back"], Places.enemyShipVentilationShaft3_Name()),
            this.portal(["forward"], Places.enemyShipVentilationShaft1_Name())
        ]);
    }
    static enemyShipVentilationShaft4_Name() {
        return "Venipositor - Ventilation Shaft - 4";
    }
}
class Regions {
    constructor() {
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
    friendlyShip(places, scripts) {
        return Region.fromNameScriptUpdateForTurnNameAndPlaces("Pax Aeterna", scripts.regionFriendlyShip_UpdateForTurn.name, // scriptUpdateForTurnName
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
        ]);
    }
    planetDesert(places, scripts) {
        return Region.fromNameScriptUpdateForTurnNameAndPlaces("Ekkis 2 - Desert", scripts.regionPlanetDesert_UpdateForTurn.name, // scriptUpdateForTurnName
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
        ]);
    }
    planetCaverns(places, scripts) {
        return Region.fromNameAndPlaces("Ekkis 2 - Caverns", [
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
        ]);
    }
    planetSettlement(places, scripts) {
        return Region.fromNameAndPlaces("Ekkis 2 - Settlement", [
            places.planetSettlementBarFront(),
            places.planetSettlementBarInterior(),
            places.planetSettlementBarRear(),
            places.planetSettlementRobotShopFront(),
            places.planetSettlementRobotShopInterior(),
            places.planetSettlementRobotShopWest(),
            places.planetSettlementNorthOfUsedShipLot(),
            places.planetSettlementUsedShipLot(),
        ]);
    }
    enemyShip(places, scripts) {
        return Region.fromNameAndPlaces("Venipositor", [
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
        ]);
    }
}
class Scripts {
    constructor() {
        var scriptMethods = [
            this.agentEnemyTalkTo,
            this.emplacementBodyEmptySearch,
            this.emplacementBodyKeycardSearch,
            this.itemDataCartridge_PutInSlot,
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
            this.placePlanetSettlementBarFront_TalkToPerson,
            this.placePlanetSettlementBarFront_Update,
            this.placePlanetSettlementBarInterior_BuyDrink,
            this.placePlanetSettlementBarInterior_TalkToBand,
            this.placePlanetSettlementBarInterior_TalkToBartender,
            this.placePlanetSettlementBarInterior_TalkToCustomers,
            this.placePlanetSettlementBarInterior_UseSlotMachine,
            this.placePlanetSettlementRobotShopInterior_BuyRobot,
            this.regionFriendlyShip_UpdateForTurn,
            this.regionPlanetDesert_UpdateForTurn,
            this.todo
        ];
        var scripts = new Array();
        for (var i = 0; i < scriptMethods.length; i++) {
            var scriptMethod = scriptMethods[i];
            var scriptName = scriptMethod.name;
            var script = new Script(scriptName, scriptMethod);
            scripts.push(script);
        }
        this._All = scripts;
    }
    static Instance() {
        if (Scripts._instance == null) {
            Scripts._instance = new Scripts();
        }
        return Scripts._instance;
    }
    todo(u, w, p, c) {
        u.messageEnqueue("todo");
    }
    agentEnemyTalkTo(u, w, p, agent) {
        var message = "The Vadik's only response is to disintegrate you."
            + "\n\n"
            + "You are dead.";
        u.messageEnqueue(message);
        w.end();
    }
    emplacementBodyEmptySearch(u, w, place, command, target) {
        var message;
        if (target != null) {
            message = "You can't use the crewperson's body on anything.";
        }
        else {
            message = "You find nothing in the crewperson's pockets.";
        }
        u.messageEnqueue(message);
    }
    emplacementBodyKeycardSearch(u, w, place, command, target) {
        var message;
        if (target != null) {
            message = "You can't use the crewperson's body on anything.";
        }
        else {
            message = "You find a keycard in the crewperson's pockets.";
            var itemKeycard = Items.Instance().Keycard;
            place.itemAdd(itemKeycard);
            var emplacementBody = place.emplacements.find(x => x.names.indexOf("body") >= 0);
            emplacementBody.commands.length = 0;
        }
        u.messageEnqueue(message);
    }
    itemDataCartridge_PutInSlot(u, w, p, c) {
        var message;
        var cartridgeReaderIsPresent = (p.emplacementByName("reader") != null);
        if (cartridgeReaderIsPresent) {
            message =
                [
                    "There is no cartridge reader here, ",
                    "and we're decades away from self-reading data cartridges.  ",
                    "Or so you assume."
                ].join("");
        }
        else {
            message =
                [
                    "You insert the cartridge into the reader.  ",
                    "The display lights up with breathtaking video ",
                    "showing the majestic formation of astral bodies, ",
                    "while a narrator melliflously explains ",
                    "their complex, intriguing, sometimes surprising relationships ",
                    "with each other and, indeed, with all life in the universe.",
                    "\n\n",
                    "My word, it's boring.  School never was your strong suit.",
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
                    "They have taken the Stellar Juvenator.  They must not be allowed to possess it.",
                    "In their hands, its unimaginable power could mean the end of civilized life ",
                    "in the galaxy.",
                    "\n\n",
                    "'Whoever's seeing this: You must destroy the Stellar Juvenator.  ",
                    "The code to initiate the built-in self destruct is: ",
                    "\n\n",
                    "    star juvie go boom-boom bye now gorham alpha 9",
                    "\n\n",
                    "Good luck, we're all depending on you.",
                    "May the universe guide you to victory.'",
                    "\n\n",
                    "And that's where the video ends.  Whoa, dramatic."
                ].join("");
        }
        u.messageEnqueue(message);
    }
    itemDehydratedWaterUse(u, w, p, c) {
        var message = "You drink from the water bottle.  "
            + "There, that'll keep the Grim Specter of Thirst "
            + "a few meters further away for a few minutes.";
        var stateName = "TurnsSinceLastDrink";
        w.agentPlayer.stateGroup.stateWithNameSetToValue(stateName, 0);
        u.messageEnqueue(message);
    }
    itemGadgetPressButton(u, w, p, c) {
        var itemGadget = w.agentPlayer.itemByName("gadget");
        var message = "You press the only button on the gadget.  "
            + "The indicator light ";
        var itemGadgetIsActivated = itemGadget.activated();
        if (itemGadgetIsActivated) {
            message +=
                "goes dark.  "
                    + "Whatever this thing does, it's not doing it now.";
            itemGadget.deactivate();
        }
        else {
            message +=
                "illuminates.  "
                    + "Whatever this thing does, it's doing it now.";
            itemGadget.activate();
        }
        u.messageEnqueue(message);
    }
    itemKeycardUse(u, w, p, c) {
        var commandText = c.text();
        var commandParts = commandText.split(" ");
        var targetName = commandParts[3];
        var message;
        if (targetName == null) {
            message = "The keycard must be used on something.";
        }
        else if (targetName != "slot") {
            message = "The keycard will only fit in an appropriately sized slot.";
        }
        else {
            var portalElevator = p.portalByName("elevator");
            var portalElevatorIsClosed = portalElevator.locked();
            if (portalElevatorIsClosed) {
                message =
                    "You insert the keycard in the slot.  "
                        + "The elevator door slides open.";
                portalElevator.unlock().descriptionSet("The elevator door is open.");
            }
            else {
                message = "The elevator door is already open.";
            }
        }
        u.messageEnqueue(message);
    }
    itemSurvivalKitOpen(u, w, p, c) {
        var message = "You open the survival kit.  .";
        var itemSurvivalKit = w.agentPlayer.itemByName("survival kit");
        var itemsContained = itemSurvivalKit.items;
        if (itemsContained.length == 0) {
            message += "It's empty.";
        }
        else {
            var itemsContainedAsText = itemsContained.map(x => x.nameAndQuantity()).join("\n\t- ");
            message +=
                "Inside, you find the following " + itemsContainedAsText
                    + "\n\n"
                    + "It seems a little heavy on the Sham (tm) at first,  "
                    + "but then you remember that announcement that the Commonwealth",
                +"had entered a corporate partnership with Delitron-9000, "
                    + "the manufacturer of Sham (tm).  "
                    + "It's too bad they didn't also form a partnership "
                    + "with the Kracktastic Krill-Cracker people.  "
                    + "\n\n"
                    + "Anyway, just looking at all that Sham (tm) "
                    + "effectively suppresses your desire to eat for the near future, "
                    + "which you suppose is useful in a survival situation.";
            p.itemsAdd(itemsContained);
            itemSurvivalKit.itemsClear();
        }
        u.messageEnqueue(message);
    }
    // Places.
    placeFriendlyShipDockingBayAntechamber_GoAirlock(u, w, p, c) {
        var playerIsWearingSpaceSuit = (w.agentPlayer.itemByName("space suit") != null);
        if (playerIsWearingSpaceSuit == false) {
            u.messageEnqueue("As the airlock door closes behind you, "
                + "and the air is pumped out of the chamber, "
                + "you suddenly realize you're not wearing a space suit."
                + "\n\n"
                + "The next few seconds are not pleasant for you.  "
                + "\n\n"
                + "You are dead.");
            w.end();
        }
        else {
            var portal = p.portalByName("airlock");
            portal.goThrough(u, w);
        }
    }
    placeFriendlyShipDockingBayAntechamber_PressLeftButton(u, w, p, c) {
        var portalCloset = p.portalByName("left closet");
        var doorIsLocked = portalCloset.locked();
        var message;
        if (doorIsLocked) {
            message = "The door of the left closet slides open.";
            portalCloset.unlock().descriptionSet("The door to the left closet is open.");
        }
        else {
            message = "The door of the left closet slides closed.";
            portalCloset.lock().descriptionSet("The door to the right closet is closed.");
        }
        u.messageEnqueue(message);
    }
    placeFriendlyShipDockingBayAntechamber_PressRightButton(u, w, p, c) {
        var portalCloset = p.portalByName("right closet");
        var doorIsLocked = portalCloset.locked();
        var message;
        if (doorIsLocked) {
            message = "The door of the right closet slides open.";
            portalCloset.unlock().descriptionSet("The door to the right closet is open.");
        }
        else {
            message = "The door of the right closet slides closed.";
            portalCloset.lock().descriptionSet("The door to the right closet is closed.");
        }
        u.messageEnqueue(message);
    }
    placeFriendlyShipDockingBayAntechamberClosetRight_GetSpaceSuit(u, w, p, c) {
        u.messageEnqueue("The space suit is too heavy to carry, so you put it on instead.");
        var itemSpaceSuit = p.itemByName("space suit");
        w.agentPlayer.itemGetFromPlace(itemSpaceSuit, p);
    }
    placeFriendlyShipDockingBayHangar_PressPlatformButton(u, w, p, c) {
        var portalPod = p.portalByName("escape pod");
        var podIsVisible = portalPod.visible();
        var message;
        if (podIsVisible) {
            message =
                "When you press the button, the platform carrying the escape pod "
                    + "sinks back beneath the floor, "
                    + "and the trapdoor slides closed over it.";
            portalPod.hide().block();
        }
        else {
            message =
                "When you press the button, the trapdoor in the floor slides open "
                    + "and a platform under it rises up to floor level.  "
                    + "On the platform stands a single-person escape pod.";
            portalPod.show().unblock();
        }
        u.messageEnqueue(message);
    }
    placeFriendlyShipEngineeringDeckAmidships_PressCloseButton(u, w, p, c) {
        var placeDockingBay = w.placeByName(Places.friendlyShipDockingBayHangar_Name());
        var emplacementDockingBayDoors = placeDockingBay.emplacementByName("bay doors");
        var doorsAreLocked = emplacementDockingBayDoors.locked();
        if (doorsAreLocked) {
            u.messageEnqueue("The docking bay doors are already closed.");
        }
        else {
            u.messageEnqueue("Through the window, you see the docking bay doors slide closed.");
            emplacementDockingBayDoors.lock();
        }
    }
    placeFriendlyShipEngineeringDeckAmidships_PressOpenButton(u, w, p, c) {
        var placeDockingBay = w.placeByName(Places.friendlyShipDockingBayHangar_Name());
        var emplacementDockingBayDoors = placeDockingBay.emplacementByName("bay doors");
        var doorsAreLocked = emplacementDockingBayDoors.locked();
        if (doorsAreLocked) {
            u.messageEnqueue("Through the window, you see the docking bay doors slide open.  "
                + "Beyond them you see the darkness of space.");
            emplacementDockingBayDoors.unlock();
        }
        else {
            u.messageEnqueue("The docking bay doors are already open.");
        }
    }
    placeFriendlyShipEngineeringDeckAft_GoElevator(u, w, place, portal) {
        var portalIsLocked = portal.locked();
        if (portalIsLocked) {
            u.messageEnqueue("The elevator door does not open as you approach.  "
                + "It must be locked.");
        }
        else {
            u.messageEnqueue("You step inside the open elevator.");
            portal.goThrough(u, w);
            portal.lock();
        }
    }
    placeFriendlyShipEscapePod_GoDoor(u, w, place, portalDoor) {
        var portalDoorPlaceDestinationName = portalDoor.placeDestinationName;
        if (portalDoorPlaceDestinationName == null) {
            var message = "You're in deep space.  There's nothing outside "
                + " worth opening the door for.";
            u.messageEnqueue(message);
        }
        else {
            portalDoor.goThrough(u, w);
        }
        u.messageEnqueue(message);
    }
    placeFriendlyShipEscapePod_LookWindow(u, w, p, c) {
        var message = "You look out the escape pod's window, and see ";
        var portalDoor = p.portalByName("door");
        var portalDoorPlaceDestinationName = portalDoor.placeDestinationName;
        if (portalDoorPlaceDestinationName == null) {
            message +=
                "deep space, adorned with thousands of stars, "
                    + "plus the distant, still-glowing wreckage of the Pax Aeterna.  "
                    + "A tragic end for such a proud vessel and her doughty crew, "
                    + "but, from this distance, you must admit "
                    + "it has a certain undeniable beauty to it.";
        }
        else if (portalDoorPlaceDestinationName == Places.friendlyShipDockingBayHangar_Name()) {
            message +=
                "the docking bay of the Pax Aeterna, "
                    + "whose better days are behind it now.  "
                    + "You suspect there aren't any days ahead of it, "
                    + "better, worse, or otherwise.";
        }
        else if (portalDoorPlaceDestinationName == Places.planetDesertCrashSite_Name()) {
            message +=
                "the burning sands and sky of the planet Ekkis II.";
        }
        u.messageEnqueue(message);
    }
    placeFriendlyShipEscapePod_PressAutonavButton(u, w, p, c) {
        var message = [
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
        if (safetyBeltWasWorn == false) {
            message +=
                [
                    "You forgot to put on your safety belt.",
                    "\n\n", ,
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
        else {
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
    placeFriendlyShipEscapePod_PressLaunchButton(u, w, p, c) {
        var message = [
            "You press the button, and the pod shudders into motion.  ",
            "It rises off the deck, then, with a burst of thrusters, ",
        ].join("");
        var placeDockingBay = w.placeByName(Places.friendlyShipDockingBayHangar_Name());
        var emplacementBayDoors = placeDockingBay.emplacementByName("bay doors");
        var bayDoorsAreClosed = emplacementBayDoors.locked();
        if (bayDoorsAreClosed) {
            message +=
                [
                    "smashes into the cargo bay doors, "
                        + "which some idiot left closed, ",
                    +"and explodes."
                        + "\n\n"
                        + "You are dead."
                ].join("");
            w.end();
        }
        else {
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
    placeFriendlyShipEscapePod_PutOnSafetyHarness(u, w, p, c) {
        var message = [
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
    placeFriendlyShipJanitorsCloset_Update(u, w, p, c) {
        if (p.hasBeenVisited() == false) {
            p.visit();
            var message = [
                "Space Adventure Game Clone",
                "\n\n",
                "You are jolted awake to find yourself ",
                "in the office/supply closet/quarters ",
                "of the Maintenance Specialist (Sanitation Grade) ",
                "of the starship Pax Aeterna, ",
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
    placeFriendlyShipLibrary_TalkToMan(u, w, p, c) {
        var stateScientistIsDeadName = "ScientistIsDead";
        var scientistIsDead = p.stateGroup.stateWithNameIsTrue(stateScientistIsDeadName);
        var message = "";
        if (scientistIsDead) {
            message = "Yeah, he's dead.  Ninety-five percent sure this time.";
        }
        else {
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
    placeFriendlyShipLibrary_Type(u, w, p, c) {
        var commandText = c.text();
        var commandTextWords = commandText.split(" ");
        var cartridgeNameTyped = commandTextWords.slice(1).join(" ").toLowerCase();
        var message = "";
        if (cartridgeNameTyped == "") {
            message =
                "Right, I forgot that you failed Remedial Lib-Sci 0001.  "
                    + "Try adding the title of the tape you want retrieved.";
        }
        else if (cartridgeNameTyped == "astral bodies") {
            message =
                [
                    "You type 'astral bodies' (without the quotes: protip) ",
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
            p.itemAdd(Item.fromNamesAndDescription(["cartridge", "data cartridge", "cart", "data cart"], "A label printed on this data cartridge reads 'Astral Bodies'.").commandAdd(new Command([
                "put cartridge in reader",
                "put cartridge in slot",
                "use cartridge on reader"
            ], Scripts.Instance().itemDataCartridge_PutInSlot.name)));
        }
        else {
            message =
                "The cartridge-retrieval control console buzzes politely, "
                    + "to the extent that a buzz can be polite, "
                    + "and displays an error message: "
                    + "'No cartridge with the specified title could be found.'";
        }
        u.messageEnqueue(message);
    }
    placeFriendlyShipLibrary_UseConsole(u, w, p, c) {
        var message = [
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
    placeFriendlyShipUpperDeckHallAmidships_Update(u, w, p, c) {
        if (p.hasBeenVisited() == false) {
            p.visit();
            var messageLines = [
                "You notice, as you stumble out of the supply closet, ",
                "that unfortunately not only is the klaxon louder in the hall, ",
                "but it's also joined by annoying flashing red lights, ",
                "as well as somebody saying 'intruder alert' over and over, ",
                "with, it must be said, an disproportionate lack of alarm.  ",
                "On the positive side, after several seconds of this, ",
                "both the klaxon and the lights stop abruptly.",
                "\n\n",
                "Probably nothing to worry about, right?"
            ];
            var message = messageLines.join("");
            u.messageEnqueue(message);
            var placeDescription = p.description;
            u.messageEnqueue(placeDescription);
        }
    }
    placePlanetCavernsBarrier_GoBarrier(u, w, p, c) {
        var emplacementBarrier = p.emplacementByName("laser barrier");
        var barrierIsActivated = emplacementBarrier.activated();
        var message;
        if (barrierIsActivated) {
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
        else {
            var portalBarrier = p.portalByName("barrier");
            portalBarrier.goThrough(u, w);
        }
        u.messageEnqueue(message);
    }
    placePlanetCavernsBarrier_PutGlassInBarrier(u, w, p, c) {
        var emplacementBarrier = p.emplacementByName("barrier");
        var barrierIsActivated = emplacementBarrier.activated();
        var message;
        var itemGlass = w.agentPlayer.itemByName("glass");
        if (itemGlass == null) {
            message = "You don't have any such thing in your possession.";
        }
        else if (barrierIsActivated) {
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
        else {
            message =
                [
                    "The barrier is already disabled.  Let it go."
                ].join("");
        }
        u.messageEnqueue(message);
    }
    placePlanetCavernsDrips_Update(u, w, p, c) {
        var turnsSoFar = w.turnsSoFar;
        var drippingOrNot = [
            (turnsSoFar % 2 != 0),
            (turnsSoFar % 3 != 0),
            (turnsSoFar % 5 != 0)
        ];
        var placeIsCurrentlyDripping = false;
        if (p.name == Places.planetCavernsDrips1_Name()) {
            placeIsCurrentlyDripping = drippingOrNot[0];
        }
        else if (p.name == Places.planetCavernsDrips2_Name()) {
            placeIsCurrentlyDripping = drippingOrNot[1];
        }
        else if (p.name == Places.planetCavernsDrips3_Name()) {
            placeIsCurrentlyDripping = drippingOrNot[2];
        }
        if (placeIsCurrentlyDripping) {
            message =
                "As you walk under one of the intermittent sets of drips, "
                    + "several of them fall onto your head. "
                    + "\n\n"
                    + "It turns out the drops are made of horrifically strong acid. "
                    + "The first few burrow through your skin, then your skull, "
                    + "then your brain.  You lose control of your limbs and fall, "
                    + "which just makes your body a larger target for more drips, "
                    + "which drill more tiny holes in you, "
                    + "which kills you. "
                    + "\n\n"
                    + "You are dead.";
            w.end();
        }
        else {
            var message = [
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
    placePlanetCavernsGeyser_PutRockInGeyser(u, w, p, c) {
        var message;
        var emplacementGeyser = p.emplacementByName("geyser");
        var rockIsAlreadyInGeyser = emplacementGeyser.itemByName("rock") != null;
        if (rockIsAlreadyInGeyser) {
            message =
                "You already put a rock in the geyser.  "
                    + "Isn't that enough for you?  No?  "
                    + "Wait a minute, you don't even have another rock, "
                    + "do you?  What sick game are you playing?";
        }
        else if (w.agentPlayer.itemByName("rock") != null) {
            message =
                "You jam the pointier end of the rock into the geyser, "
                    + "stopping the flow of steam, but not before it burns "
                    + "your fingers slightly.  "
                    + "\n\n"
                    + "As you stick the burned hand in your mouth to dull the pain, "
                    + "you hear some labored mechanical noises from inside "
                    + "the rock wall to the west.  "
                    + "A previously hidden door appears in the stone "
                    + "and slides aside to reveal a passage leading deeper into the cave.";
            var portalDoor = p.portalByName("door");
            portalDoor.show().unblock();
        }
        else {
            message =
                "You don't see any rock here!  "
                    + "\n\n"
                    + "Maybe I should explain how all this works again.  "
                    + "I'm not, like, a genie.  I can't magic up rocks out of nothing.  "
                    + "If you want to put a rock into a geyser, "
                    + "you have to find a rock somewhere, pick it up, "
                    + "take it to someplace where a geyser already is, "
                    + "and then jam it in.  Manually.";
        }
        u.messageEnqueue(message);
    }
    placePlanetCavernsGrating_CrossGrating(u, w, p, c) {
        var itemCanOfSham = p.itemByName("can of sham");
        var monsterIsDistracted = itemCanOfSham != null;
        var message;
        if (monsterIsDistracted) {
            message =
                "You quickly cross over the grating while the monster beneath it is distracted.  "
                    + "Just in time, too.  Just as you step off the grating, "
                    + "the flaling tentacle manages to split open the can of Sham, "
                    + "its contents falling in chunks through the grating.  "
                    + "The slurping noises that follow are indescribably disgusting.";
        }
        else {
            message =
                "Just as you step onto the grating, "
                    + "a tentacle reaches through one of the holes "
                    + "and wraps itself tightly around your ankle.  "
                    + "You are alarmed by this, but then you realize that "
                    + "you are far too large to be pulled through any of these holes.";
            +"\n\n"
                + "And that's true, as far as it goes, "
                + "but unfortunately the tentacle is so strong "
                + "that it pulls you through the hole anyway, "
                + "despite the incompatible sizes. "
                + "The parts of you that don't fit through the hole get peeled off "
                + "of the parts of you that do fit "
                + "and flop down onto the grating, "
                + "where other tentacles grab those parts, then repeat the process "
                + "until all your parts are gone."
                + "\n\n"
                + "It's kind of like being fed through a pasta extruder, "
                + "but if somebody added the marinara sauce before they shaped the noodles."
                + "\n\n"
                + "You are dead.";
            w.end();
        }
        u.messageEnqueue(message);
        if (w.isOver == false) {
            var portal = p.portalByName("grating");
            portal.goThrough(u, w);
        }
    }
    placePlanetCavernsGrating_PutCanOfShamOnGrating(u, w, p, c) {
        var message;
        var agentPlayer = w.agentPlayer;
        var itemCanOfSham = agentPlayer.itemByName("can of sham");
        if (itemCanOfSham == null) {
            message =
                "You don't have any Sham (tm) on you at the moment.  "
                    + "You take a moment to add it to your mental shopping list.";
        }
        else {
            agentPlayer.itemDropQuantityIntoPlace(itemCanOfSham, 1, p);
            message =
                "You put the can of Sham (tm) on the grating, "
                    + "and immediately, a tentacle reaches through one of the holes "
                    + "wraps itself tightly around the can, "
                    + "and tries to pull it through.  "
                    + "But the size and shape of the can, together with "
                    + "the high-quality, fallout-shelter-gauge metal it's made of, "
                    + "prevents the tentacle from pulling it through."
                    + "\n\n"
                    + "Or at least not immediately.  "
                    + "However, the frustrated flailing of the tentacle "
                    + "as it bangs the can against the grating "
                    + "is putting large dents in the can, "
                    + "and some of the meat simulant inside is visible through the forming cracks."
                    + "It won't be long now.";
        }
        u.messageEnqueue(message);
    }
    placePlanetCavernsPool_DrinkFromPool(u, w, p, c) {
        var message = [
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
    placePlanetCavernsSteamworks_InsertKeyInSkimmer(u, w, p, c) {
        var message = "You put the key into a similarly-shaped hole in the skimmer control panel, "
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
            + "As you pull up, an alien walks out of the bar and eyes your skimmer appreciatively.";
        u.messageEnqueue(message);
        w.placeCurrentSetByName(Places.planetSettlementBarFront_Name());
    }
    placePlanetCavernsProjectionRoom_Update(u, w, p, c) {
        var agentPlayer = w.agentPlayer;
        var itemCaveBeastChunk = agentPlayer.itemByName("cave beast claw");
        var playerHasEvidenceOfKill = (itemCaveBeastChunk != null);
        var itemGadget = agentPlayer.itemByName("gadget");
        var translatorIsActive = itemGadget.activated();
        var messagePlayerPresentsProofOfKill = [
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
        if (p.hasBeenVisited() == false) {
            p.visit();
            var message = [
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
            if (translatorIsActive) {
                message +=
                    [
                        "As the alien speaks, presumably in his own language, ",
                        "the gadget you found in the closet on the Pax Aeterna ",
                        "begins speaking just after him, in similar inflections.  ",
                        "Apparently it's been a translator all along.  ",
                        "\n\n",
                        "'YOU HAVE DONE WELL MAKING IT THIS FAR, OUTWORLDER,'",
                        "bellows the head, with excessive volume, 'THIS FACILITY IS DESIGNED ",
                        "TO WINNOW OUT THOSE OF LOW INTELLIGENCE.  BUT YOU CLEARLY ",
                        "HAVE NEED OF OUR ASSISTANCE.  WE DO NOT OFFER SUCH HELP CHEAPLY.  ",
                        "YOU MUST OFFER RECOMPENSE.  IN A CAVE ON THE EAST SIDE OF THE CLIFFS ",
                        "ABOVE THIS FACILITY, THERE IS A BEAST.  IT IS INCONVENIENT TO US.  ",
                        "KILL IT, THEN RETURN HERE WITH PROOF OF ITS DEMISE.'  ",
                        "\n\n",
                    ].join("");
                if (playerHasEvidenceOfKill) {
                    message += messagePlayerPresentsProofOfKill;
                    portalNorth.unblock().show();
                }
            }
            else {
                message +=
                    [
                        "Whatever the alien is saying, he's sure saying it loud.  ",
                        "But unfortunately, he's not saying it in any language you recognize.",
                        "\n\n",
                    ].join("");
            }
            if (playerHasEvidenceOfKill == false || translatorIsActive == false) {
                message +=
                    [
                        "As the alien finishes his speech, ",
                        "a trap door in the floor irises open, and you fall through it.  ", ,
                        "You are whisked through some, like, pneumatic tubes, ",
                        "and then you feel yourself risFing upward for a sustained stretch.  ",
                        "\n\n",
                        "You emerge into the sunlight on top of the cliffs of the Ekkis II desert, ",
                        "in the same place, between the two broken stone horns, ",
                        "from which you first descended into the caverns.  ",
                        "You can't puzzle out how that works, mechanically, but here you are."
                    ].join("");
                w.placeCurrentSetByName(Places.planetCliffsTopNortheast_Name());
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
            if (translatorIsActive) {
                message +=
                    [
                        "'YOU HAVE RETURNED.  DO YOU HAVE PROOF OF THE BEAST'S DEATH?  ",
                        "IF SO, SHOW IT TO ME.'",
                        "\n\n"
                    ].join("");
                if (playerHasEvidenceOfKill) {
                    message += messagePlayerPresentsProofOfKill;
                    portalNorth.unblock().show();
                }
            }
            else {
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
                w.placeCurrentSetByName(Places.planetCliffsTopNortheast_Name());
            }
        }
        u.messageEnqueue(message);
    }
    placePlanetCavernsSteamworks_TalkToAlien(u, w, p, c) {
        var message = "The alien greets you from the catwalk above, "
            + "and explains that it is part of an ancient race "
            + "that once ruled this planet, but now lives underground.  "
            + "You briefly wonder if you have to feel guilty about this, "
            + "but the alien has already moved on to thank you for destroying the cave beast, "
            + "and, as a reward, throws down to you the starter key to a sand skimmer "
            + "that the alien says should allow you to reach the nearest settlement "
            + "without being eaten by sand-swimmers.  "
            + "The alien then turns and walks off into the depths of the steamworks, "
            + "but not before muttering something about the skimmer's throttle being stuck.";
        u.messageEnqueue(message);
        p.itemAdd(Items.Instance().SkimmerKey);
    }
    placePlanetCliffsBottomNorthwestWestSide_LookInHole(u, w, p, c) {
        var message = "You cross over to the cliff base and put your head near the hole "
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
            + "You are dead.";
        u.messageEnqueue(message);
        w.end();
    }
    placePlanetCliffsCaveInterior_GoEast(u, w, p, c) {
        var message = [
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
        if (caveBeastIsAlive) {
            message +=
                [
                    "In a few moments, a cave monster either knocks you unconscious ",
                    "or possibly decapitates you.  Its hard to tell in the dark.",
                    "\n\n",
                    "You are dead."
                ].join("");
            w.end();
        }
        else {
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
    placePlanetCliffsCaveInterior_GoWest(u, w, p, c) {
        var stateName = "TurnsSinceLastEnteringCave";
        w.agentPlayer.stateGroup.stateWithNameSetToValue(stateName, 0);
        var portal = p.portalByName("out");
        portal.goThrough(u, w);
    }
    placePlanetCliffsCaveInterior_Update(u, w, p, c) {
        if (p.hasBeenVisited() == false) {
            u.messageEnqueue(p.description);
            p.visit();
        }
        var agentCaveBeast = p.agentByName("cave beast");
        var caveBeastIsStillAlive = (agentCaveBeast != null);
        if (caveBeastIsStillAlive) {
            var stateName = "TurnsSinceLastEnteringCave";
            var turnsSinceLastEnteringCave = w.agentPlayer.stateGroup.stateWithNameGetValue(stateName);
            if (turnsSinceLastEnteringCave == null) {
                turnsSinceLastEnteringCave = 0;
            }
            var message;
            if (turnsSinceLastEnteringCave == 0) {
                message =
                    "From far back in the cave, you hear a slapping noise,"
                        + "as of spatulate feet running across rocks.";
            }
            else if (turnsSinceLastEnteringCave == 1) {
                message =
                    "That slapping-footsteps noise you heard coming from the back of the cave "
                        + "is now coming from the middle of the cave, "
                        + "and seems to be heading for the front of the cave, "
                        + "which makes you uncomfortable, because that's where you are.  "
                        + "In the shadows, you can just make out something big coming toward you.";
            }
            else if (turnsSinceLastEnteringCave == 2) {
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
                        + "And it's still moving toward you.";
            }
            else if (turnsSinceLastEnteringCave == 3) {
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
            w.agentPlayer.stateGroup.stateWithNameSetToValue(stateName, turnsSinceLastEnteringCave);
        }
    }
    placePlanetCliffsCaveInterior_ThrowCanteenAtBeast(u, w, p, c) {
        var message = [
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
        p.agentRemove(p.agentByName("beast"));
        var itemCaveBeastClaw = Items.Instance().CaveBeastClaw;
        p.itemAdd(itemCaveBeastClaw);
        u.messageEnqueue(message);
    }
    placePlanetCliffsTopSouth_CrossBridge(u, w, p, c) {
        var stateName = "TimesBridgeCrossed";
        var region = p.region(w);
        var regionStateGroup = region.stateGroup;
        var timesBridgeCrossed = regionStateGroup.stateWithNameGetValue(stateName);
        if (timesBridgeCrossed == null) {
            timesBridgeCrossed = 0;
        }
        var message;
        if (timesBridgeCrossed == 0) {
            message =
                "As you walk across the stone arch, it groans under your weight.  "
                    + "New cracks appear in the stone.  "
                    + "The existing cracks get longer, wider, and deeper, "
                    + "and not in a sexy way.";
        }
        else if (timesBridgeCrossed == 1) {
            message =
                "As you walk across the stone arch again, "
                    + "all the cracks in the rock get bigger.  "
                    + "Which is just what you expected to happen.  "
                    + "It's always gratifying when experiment agrees with theory.";
        }
        else if (timesBridgeCrossed == 2) {
            message =
                "As you walk across the stone arch again, "
                    + "all the cracks in the rock get bigger.  "
                    + "Which is just what you expected to happen.  "
                    + "It's always gratifying when experiment agrees with theory.";
        }
        else if (timesBridgeCrossed == 3) {
            message =
                "You walk across the stone arch yet again. "
                    + "This time, some of the cracks get so big "
                    + "that pieces of stone actually start falling off of the arch "
                    + "and make little puffs as they impact the sand below.  "
                    + "\n\n"
                    + "This is starting to remind you of that time the ranger "
                    + "yelled at you at Delicately Arrayed Crystals Galactic Park.";
        }
        else if (timesBridgeCrossed == 4) {
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
        if (w.isOver == false) {
            var portal = p.portalByName("bridge");
            portal.goThrough(u, w);
        }
    }
    placePlanetDesertDeep_Update(u, w, p, c) {
        if (p.hasBeenVisited() == false) {
            p.visit();
            var placeDescription = p.description;
            u.messageEnqueue(placeDescription);
            var message = [
                "You hear a grinding noise coming from the deeper desert.  ",
                "It sounds like a hundred-car hovertrain with half its hoverpads missing ",
                "hauling a cargo of tornadoes arguing about politics."
            ].join("");
            u.messageEnqueue(message);
        }
        else {
            var message = [
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
    placePlanetSettlementBarFront_GetSkimmerKey(u, w, p, c) {
        var message;
        var emplacementSkimmer = p.emplacementByName("skimmer");
        var itemSkimmerKey = emplacementSkimmer.itemByName("skimmer key");
        var keyHasAlreadyBeenTaken = itemSkimmerKey == null;
        if (keyHasAlreadyBeenTaken) {
            message =
                "You've already taken the key, remember?  "
                    + "\n\n"
                    + "Are you okay?  Maybe you need a neurologist.  "
                    + "Or at least some gingko biloba.";
        }
        else {
            message =
                "You remove the skimmer's ignition key "
                    + "from the skimmer, and put it in your pocket.  "
                    + "\n\n"
                    + "Good thinking.  I'd say this looks like a rough "
                    + "part of town, but that would imply that there are parts "
                    + "of this town that aren't rough.  "
                    + "And I just can't make that promise.";
            var agentPlayer = w.agentPlayer;
            agentPlayer.itemAdd(itemSkimmerKey);
        }
        u.messageEnqueue(message);
    }
    placePlanetSettlementBarFront_TalkToPerson(u, w, p, c) {
        var message = "The being eyes your skimmer appreciatively."
            + "\n\n"
            + "'Hey, nice skimmer.  That the model with the dual-fuel inlet-outlets?'"
            + "\n\n"
            + "Despite the fact that you're pretty sure "
            + "what he just said is literal nonsense, you nod wisely "
            + "the way you always do around ground-vehicle enthusiasts."
            + "\n\n"
            + "He runs a hand sensually, almost pornographically, along its front fender."
            + "'Would you be willing to sell it?'"
            + "\n\n"
            + "It's an intriguing offer.  "
            + "On the one hand, it doesn't really belong to you. "
            + "On the other hand, you did sort of blow up a cave monster for it."
            + "And the original owners probably don't don't have any use for it, "
            + "living in a hole under a cliff maze as they do.  "
            + "And it is almost completely out of fuel, "
            + "and you have no money to refill it,"
            + "so it's not doing you, or anybody else, any good as is."
            + "\n\n"
            + "'I might,' you say.  'How much is she worth to you?'"
            + "On the off-chance that calling an inanimate object by a feminine pronoun "
            + "doesn't sell the impression that you're a mechanically-minded man, "
            + "you lean casually against the headlight, "
            + "which promptly cracks off and hangs limply from its wiring."
            + "\n\n"
            + "The prospective buyer offers you 30 quatloos "
            + "What do you say, yes or no?";
        u.messageEnqueue(message);
    }
    placePlanetSettlementBarFront_Update(u, w, p, c) {
        var message;
        if (p.hasBeenVisited()) {
            var emplacementSkimmer = p.emplacementByName("skimmer");
            if (emplacementSkimmer == null) {
                // Do nothing.
            }
            else {
                var itemKeyFromSkimmer = emplacementSkimmer.itemByName("skimmer key");
                var keyWasLeftInSkimmer = (itemKeyFromSkimmer != null);
                if (keyWasLeftInSkimmer) {
                    message =
                        "You're pretty sure this is where you parked your skimmer.  "
                            + "But it's not here any more.  You probably should have taken "
                            + "the key out of the ignition.";
                }
                else // keyWasLeftInSkimmer == false
                 {
                    var stateName = "HasSecondSaleOfferForSkimmerBeenRefused";
                    var hasSecondSaleOfferBeenRefused = p.stateGroup.stateWithNameGetValue(stateName);
                    if (hasSecondSaleOfferBeenRefused == false) {
                        message =
                            "That guy who tried to buy your skimmer "
                                + " is here.  "
                                + "'Hey,' he says, 'look.  I'm willing to throw in"
                                + "this jetpack.  It's a real good jetpack.  "
                                + "So, my final offer is, 30 quatloos, a jetpack, "
                                + "and the coupon book.  What do you say?";
                    }
                    // todo - Add agent and command.
                }
            }
        }
        u.messageEnqueue(message);
    }
    placePlanetSettlementBarInterior_BuyDrink(u, w, p, c) {
        var message;
        var itemQuatloos = w.agentPlayer.itemByName("quatloo");
        var quatloosPerBeer = 2;
        if (itemQuatloos == null || itemQuatloos.quantity < quatloosPerBeer) {
            message = "You don't have enough quatloos!";
        }
        else {
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
            var anecdotesHeardSoFar = placeStateGroup.stateWithNameGetValue(stateName);
            if (anecdotesHeardSoFar == null) {
                anecdotesHeardSoFar = 0;
            }
            var barAnecdote;
            if (anecdotesHeardSoFar == 0) {
                barAnecdote =
                    "You hear a joke that ends with the punchline, "
                        + "'Aldebaran, hell!  That's my WIFE!'  "
                        + "The joke really only works in Ancient Farconian, "
                        + "which is a language that neither you "
                        + "nor the teller of the joke, "
                        + "nor anyone else at the bar speaks.  "
                        + "So you're not sure why everybody's laughing.  "
                        + "But you laugh too.  How else are you going to fit in?";
            }
            else if (anecdotesHeardSoFar == 1) {
                barAnecdote =
                    "You listen to a fellow patron brag about his sexual prowess.  "
                        + "Some of the details of his story are mutually irreconcilable, "
                        + "and those that aren't make him seem less like a sexual dynamo "
                        + "and more like an inconsiderate boor, "
                        + "but everyone else seems to accept his tale with convivial bonhomie, "
                        + "and when the story finally winds up, "
                        + "just after he confesses to some borderline felonies, "
                        + "they all slap him on various body parts "
                        + "with congratulatory gusto."
                        + "\n\n"
                        + "So you do too.  How else are you going to keep fitting in?";
            }
            else if (anecdotesHeardSoFar == 2) {
                barAnecdote =
                    "A fellow patron, in hushed, conspiratorial tones, "
                        + "relates an anecdote of some mysterious goings-on "
                        + "he witnessed when stopping off to take on hydrogen from a gas giant "
                        + "in the uncharted starsystem KL-5-6800.  "
                        + "\n\n"
                        + "'All of a sudden, my scanner picked up a large amount of mass "
                        + "heading right for me.  I figured that the locals were sending a "
                        + "fleet after me, because they didn't take kindly to me "
                        + "harvesting their Jovian.  So I started the hyperdrive warming up, "
                        + "in case I needed to make a quick getaway from the law.  "
                        + "But then the scanner said it couldn't a fleet, "
                        + "all that mass was all in one piece.  "
                        + "I thought sure that it was malfunctioning, "
                        + "but then I saw this monster chug into orbit.  "
                        + "It must have massed a gigatonne, easy.  Bristling with weapons.  "
                        + "Had something written in Vadik on the side.  "
                        + "\n\n"
                        + "Well, I cut the feed and let my hydro-harvester drop into the giant, "
                        + "and flicked on the hyperdrive before it the computer "
                        + "could finish the safety checks.  It blew out after 7 light-years, "
                        + "and I had to limp to the nearest base on sublight.  "
                        + "Cost me 2000 quatloos to replace, plus labor.  "
                        + "\n\n"
                        + "But I'd do it again.  I don't want no trouble with no Vadik.";
            }
            else {
                barAnecdote =
                    "After the story about the Vadik warship in KL-5-6800, "
                        + "the conversation at the bar seems to have hit a permanent lull.  "
                        + "You finish your drink in silence.";
            }
            message += "\n\n" + barAnecdote;
            anecdotesHeardSoFar++;
            placeStateGroup.stateWithNameSetToValue(stateName, anecdotesHeardSoFar);
        }
        u.messageEnqueue(message);
    }
    placePlanetSettlementBarInterior_TalkToBand(u, w, p, c) {
        var message = "You try to talk to the band.  During their live performance.  "
            + "Ugh.  You're one of those kind of people, huh?  "
            + "\n\n"
            + "The band, as is their privilege, ignores you.  Not a bad gig.";
        u.messageEnqueue(message);
    }
    placePlanetSettlementBarInterior_TalkToBartender(u, w, p, c) {
        var message = "Before you can get out so much as a syllable, "
            + "the bartender cuts you off.  'Bru-ale?' he asks in a clipped tone "
            + "that makes you feel like you've just been hung up on from orbit.  "
            + "When you do not immediately respond, "
            + "the bartender turns back to the other patrons.";
        u.messageEnqueue(message);
    }
    placePlanetSettlementBarInterior_TalkToCustomers(u, w, p, c) {
        var message = [
            "Your awkward attempt to insert yourself ",
            "into the conversation is deeply unwelcome.  ",
            "Your stammering would-be opening ",
            "is buried under so much sudden icy silence from them ",
            "that your body temperature actually drops by a degree centigrade.  ",
            "Under other circumstances, it might actually feel rather refreshing.",
            "\n\n",
            "You're unbelievably bad at this sort of thing.  ",
            "Maybe it would be better just to buy a drink and hang out."
        ].join("");
        u.messageEnqueue(message);
    }
    placePlanetSettlementBarInterior_UseSlotMachine(u, w, p, c) {
        var message;
        var emplacementSlotMachine = p.emplacementByName("slot machine");
        var slotMachineIsActivated = emplacementSlotMachine.activated();
        if (slotMachineIsActivated == false) {
            message =
                "The slot machine claims to be out of order.  "
                    + "You suspect it's just knows a real high-roller when it sees one, "
                    + "and is cowering in fear of your gambling prowess.";
        }
        else {
            var itemQuatloos = w.agentPlayer.itemByName("quatloo");
            if (itemQuatloos == null || itemQuatloos.quantity == 0) {
                message =
                    [
                        "You don't have any more quatloos!"
                    ].join("");
            }
            else {
                w.agentPlayer.itemRemoveQuantity(itemQuatloos, 1);
                var messageIntrosToChooseFrom = [
                    "Fighting down an intrusive recollection of how your great uncle ",
                    +"died penniless and alone due to his gambling addiction, ",
                    "Swallowing nervously, ",
                    "Gazing imploringly at the ceiling, "
                        + "toward where you imagine Lady Luck lives, ",
                    "With a shaky hand, ",
                    "Wiping flop-sweat off your palms and onto your pant legs, "
                ];
                var messageIntroIndex = Math.floor(Math.random() * messageIntrosToChooseFrom.length);
                var messageIntro = messageIntrosToChooseFrom[messageIntroIndex];
                var symbolLucky = "seven-pointed crystal";
                var symbolUnlucky = "exposed cranial endoskeleton";
                var symbolsToChooseFrom = [
                    "lightly mutated vegetation",
                    "lightly mutated vegetation",
                    "lightly mutated vegetation",
                    "upturned livestock footwear",
                    "upturned livestock footwear",
                    "upturned livestock footwear",
                    symbolLucky,
                    symbolUnlucky,
                ];
                var symbolsToChooseCount = 3;
                var symbolsChosen = new Array();
                for (var i = 0; i < symbolsToChooseCount; i++) {
                    var symbolIndexRandom = Math.floor(Math.random() * symbolsToChooseFrom.length);
                    var symbolChosen = symbolsToChooseFrom[symbolIndexRandom];
                    symbolsChosen.push(symbolChosen);
                }
                var areAllSymbolsTheSame = symbolsChosen[0] == symbolsChosen[1]
                    && symbolsChosen[1] == symbolsChosen[2];
                var messageResult;
                if (areAllSymbolsTheSame) {
                    messageResult = "The symbols match!  ";
                    if (symbolsChosen[0] == symbolLucky) {
                        messageResult += "And it's the luckiest combination!  You win 20 quatloos!";
                        itemQuatloos.quantity += 10;
                    }
                    else if (symbolsChosen[0] == symbolUnlucky) {
                        messageResult =
                            "Unfortunately, this isn't the good kind of match.  "
                                + "\n\n"
                                + "A port in the side of the machine slides open, "
                                + "and the muzzle of a laser blaster emerges.  "
                                + "You're still staring at it, wondering what it's for, "
                                + "when it shows you what it's for by emitting a burst of energy "
                                + "that instantly separates each individual atom "
                                + "in your body from its neighbors and then, just to be thorough, "
                                + "sets it on fire. "
                                + "\n\n"
                                + "The cleaning bot sweeps up your ashes while the slot machine "
                                + "plays a couple measures of a whimsical little electronic dirge.  "
                                + "Then the bot disposes of your ashes "
                                + "through the dedicated ash-disposal port in the back wall of the bar, "
                                + "where they drift down to join the ashes of previous unlucky gamblers."
                                + "\n\n"
                                + "You are dead.";
                        w.end();
                    }
                    else {
                        messageResult += "You win 5 quatloos!";
                    }
                }
                else {
                    messageResult =
                        "The symbols don't match.  So nothing much happens, "
                            + "except that the machine emits a sad electronic raspberry noise, "
                            + "and you lose another quatloo.";
                }
                message =
                    [
                        messageIntro,
                        "you insert a quatloo in the slot machine and pull the handle.  ",
                        "\n\n",
                        "The reels rotate for a while, and then each stops with a loud thunk.",
                        "\n\n",
                        "The symbols visible on the reels are: ", ,
                        "\n\n",
                        symbolsChosen.join("\n\n"),
                        "\n\n",
                        messageResult
                    ].join("");
                var itemQuatloosQuantityMax = 250; // todo
                if (itemQuatloos.quantity >= itemQuatloosQuantityMax) {
                    message +=
                        "\n\n";
                    "After it pays out one last time, a small status light "
                        + "on the slot machine lights up, reading 'out of order'.  "
                        + "What a punk, punking out like that "
                        + "just when you were on a roll.";
                    emplacementSlotMachine.deactivate();
                }
                ;
            }
        }
        u.messageEnqueue(message);
    }
    placePlanetSettlementRobotShopInterior_BuyRobot(u, w, p, c) {
        var message;
        var messageNotEnoughMoney = "The salesbeing looks at you sadly, and says, "
            + "'I'm afraid you don't have enough money "
            + "to purchase this robot.'  Then he shakes his head, "
            + "while maintaining eye contact, "
            + "perhaps trying to communicate that he blames "
            + "the current state of math education, "
            + "not you personally, for the error.";
        var robotName = "navigator";
        var emplacementRobot = p.emplacementByName(robotName);
        var emplacementRobotNavigatorName = emplacementRobot.name();
        if (emplacementRobotNavigatorName == robotName) {
            var agentPlayer = w.agentPlayer;
            var itemQuatloos = agentPlayer.itemByName("quatloo");
            var priceOfRobotInQuatloos = 250; // todo
            if (itemQuatloos.quantity < priceOfRobotInQuatloos) {
                message = messageNotEnoughMoney;
            }
            else {
                agentPlayer.itemRemoveQuantity(itemQuatloos, priceOfRobotInQuatloos);
                var agentRobot = Agent.fromNames(emplacementRobot.names);
                p.agentAdd(agentRobot);
            }
        }
        else {
            message = messageNotEnoughMoney;
        }
        u.messageEnqueue(message);
    }
    regionFriendlyShip_UpdateForTurn(u, w, p, c) {
        var turnsSoFar = w.turnsSoFar;
        if (turnsSoFar == 3) {
            u.messageEnqueue("In the distance, you can hear shouting, "
                + "then the sound of weapons fire, "
                + "then screaming, then silence.");
        }
        else if (turnsSoFar == 10) {
            u.messageEnqueue("You hear and feel a powerful explosion somewhere on board the ship.  "
                + "The lights flicker.  That's bad.  These are really expensive lights "
                + "that are guaranteed not to do that.");
        }
        else if (turnsSoFar == 20) {
            u.messageEnqueue("The force of another explosion being transferred "
                + "through the ship's frame "
                + "nearly knocks you off your feet.  "
                + "Some sparks shoot out of a panel, which is especially unsettling, "
                + "since you're pretty sure there's not even anything electrical behind that panel.");
        }
        else if (turnsSoFar == 30) {
            u.messageEnqueue("With another loud boom, the lights go completely out, "
                + "and stay out for a few seconds.  "
                + "Then they come back on.  But not all of them, "
                + "and not all the way, and not all the time.");
        }
        else if (turnsSoFar == 40) {
            u.messageEnqueue("You stagger as a titanic metallic groaning noise "
                + "echoes through the ship's halls.  "
                + "It sounds as if the ship is tearing itself apart, "
                + "which seems like a thing it might plausibly do in the next few minutes.");
        }
        else if (turnsSoFar == 50) {
            u.messageEnqueue("A series of sharp explosions makes the deck heave "
                + "under you, throwing you into the ceiling"
                + "by banking you off a wall, "
                + "and then slamming you back into the floor.");
        }
        else if (turnsSoFar == 60) {
            u.messageEnqueue("The rumbles, groaning, and explosions are getting so bad now "
                + "that it's getting hard to hear yourself think, "
                + "so you just have to hope that you are.  "
                + "Additionally, a pulsing, droning noise adds itself to the cacaphony.");
        }
        else if (turnsSoFar == 70) {
            u.messageEnqueue("The pulsing, droning noise is steadily rising in pitch.  "
                + "The pops, moans, and booms are steadily increasing in tempo.  "
                + "This symphony of destruction is clearly building up to something.");
        }
        else if (turnsSoFar == 80) {
            u.messageEnqueue("The pulsing, droning noise is now a ululating scream "
                + "that feels like it's trying simultaneously to claw its way into "
                + "and out of your skull."
                + "She cannae take much more o' this, Cap'n.");
        }
        else if (turnsSoFar == 90) {
            u.messageEnqueue("LOUD LOUD SO LOUD HOW CAN ANYTHING BE THIS LOUD");
        }
        else if (turnsSoFar == 100) {
            u.messageEnqueue("The ship tears itself into a thousand pieces, "
                + "with a sound louder than ears can hear.  "
                + "Luckily, the ear-shattering noise only lasts a moment, "
                + "because all the ship's air rushes out into the surrounding vaccuum."
                + "Luckier still, you don't die of asphixiation, because you're "
                + "sheared into seven separate pieces by shrapnel from the explosion first."
                + "\n\n"
                + "You are dead.");
            w.end();
        }
    }
    regionPlanetDesert_UpdateForTurn(u, w, p, c) {
        var stateName = "TurnsSinceLastDrink";
        var agentPlayer = w.agentPlayer;
        var turnsSinceLastDrink = agentPlayer.stateGroup.stateWithNameGetValue(stateName);
        if (turnsSinceLastDrink == 10) {
            u.messageEnqueue("You're getting thirsty.  This desert really takes it out of you.");
        }
        else if (turnsSinceLastDrink == 20) {
            u.messageEnqueue("You're getting very thirsty now.  "
                + "This desert is a monster.  "
                + "Some kind of... water-sucking... low-moisture... monster."
                + "Look, it's too hot to think of what kind of monster it is right now.");
        }
        else if (turnsSinceLastDrink == 30) {
            u.messageEnqueue("Hey!  I don't know if you were listening before, "
                + "but YOU ARE VERY VERY THIRSTY NOW.  "
                + "If you don't drink something very soon, "
                + "you will die of dehydration.");
        }
        else if (turnsSinceLastDrink == 40) {
            u.messageEnqueue("Welp, you're dying now.  Yes, right now.  Of dehydration,  "
                + "which is a pretty bad way to go, "
                + "or at least it seems that way to you."
                + "\n\n"
                + "I guess most ways to die are bad, though.  "
                + "It's all subjective.  "
                + "Some people say that drowning is the worst way to die, "
                + "but that actually sounds nice to you right now.  Go figure.  "
                + "Anyway: "
                + "\n\n"
                + "You are dead.");
            w.end();
        }
        turnsSinceLastDrink++;
        agentPlayer.stateGroup.stateWithNameSetToValue(stateName, turnsSinceLastDrink);
    }
}
class StateNames {
    static isEmpty() {
        return "isEmpty";
    }
    static isOpen() {
        return "isOpen";
    }
    static isSharpened() {
        return "isSharpened";
    }
    static isUnlocked() {
        return "isUnlocked";
    }
}
