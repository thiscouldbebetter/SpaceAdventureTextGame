"use strict";
class Game {
    static worldBuild() {
        var player = new Agent("self", "This is you.", null, // scriptUpdateForTurnName
        [
            Item.fromNameAndDescription("washrag", "This is a rag you use to clean things sometimes.")
        ], null // commands
        );
        var scriptsCustom = new Scripts();
        var places = new Places();
        var commands = Command.Instances()._All;
        var scriptsAll = new Array();
        var commandsAsScripts = commands.map((x) => x._scriptExecute);
        scriptsAll.push(...commandsAsScripts);
        scriptsAll.push(...scriptsCustom._All);
        var placeInitialName = Places.paxAeternaJanitorsCloset_Name();
        var returnValue = new World("Space_Adventure_Game", places._All, player, commands, scriptsAll, null, // turnsSoFar,
        placeInitialName);
        return returnValue;
    }
}
class Items {
}
class Places {
    constructor() {
        this.scripts = Scripts.Instance();
        // Places.
        // Places - Pax Aeterna.
        // Pax Aeterna - Upper Deck.
        this.PaxAeternaJanitorsCloset = this.paxAeternaJanitorsCloset();
        this.PaxAeternaUpperDeckHallAmidships = this.paxAeternaUpperDeckHallAmidships();
        this.PaxAeternaLibrary = this.paxAeternaLibrary();
        this.PaxAeternaUpperDeckHallAft = this.paxAeternaUpperDeckHallAft();
        this.PaxAeternaUpperDeckHallForward = this.paxAeternaUpperDeckHallForward();
        this.PaxAeternaBridge = this.paxAeternaBridge();
        // Pax Aeterna - Lower Deck.
        this.PaxAeternaLowerDeckHallAft = this.paxAeternaLowerDeckHallAft();
        this.PaxAeternaLowerDeckHallAmidships = this.paxAeternaLowerDeckHallAmidships();
        this.PaxAeternaLowerDeckHallForward = this.paxAeternaLowerDeckHallForward();
        // Pax Aeterna - Engineering Deck.
        this.PaxAeternaEngineeringDeckAft = this.paxAeternaEngineeringDeckAft();
        this.PaxAeternaEngineeringDeckAmidships = this.paxAeternaEngineeringDeckAmidships();
        this.PaxAeternaEngineeringDeckForward = this.paxAeternaEngineeringDeckForward();
        // Pax Aeterna - Docking Bay.
        this.PaxAeternaDockingBayAntechamber = this.paxAeternaDockingBayAntechamber();
        this.PaxAeternaDockingBayHangar = this.paxAeternaDockingBayHangar();
        this.PaxAeternaEscapePod = this.paxAeternaEscapePod();
        // Ekkis 2.
        this.Ekkis2DesertCrashSite = this.ekkis2DesertCrashSite();
        this.Ekkis2DesertDeep = this.ekkis2DesertDeep();
        this.Ekkis2DesertNorth = this.ekkis2DesertNorth();
        this.Ekkis2DesertSouth = this.ekkis2DesertSouth();
        this.Ekkis2DesertWest = this.ekkis2DesertWest();
        this.Ekkis2CliffsBottomNorth = this.ekkis2CliffsBottomNorth();
        this.Ekkis2CliffsBottomNortheast = this.ekkis2CliffsBottomNortheast();
        this.Ekkis2CliffsBottomNorthwestEastSide = this.ekkis2CliffsBottomNorthwestEastSide();
        this.Ekkis2CliffsBottomNorthwestWestSide = this.ekkis2CliffsBottomNorthwestWestSide();
        this.Ekkis2CliffsBottomSouth = this.ekkis2CliffsBottomSouth();
        this.Ekkis2CliffsBottomSoutheast = this.ekkis2CliffsBottomSoutheast();
        this.Ekkis2CliffsBottomSouthwest = this.ekkis2CliffsBottomSouthwest();
        this.Ekkis2CliffsCaveInterior = this.ekkis2CliffsCaveInterior();
        this.Ekkis2CliffsTopNorth = this.ekkis2CliffsTopNorth();
        this.Ekkis2CliffsTopNortheast = this.ekkis2CliffsTopNortheast();
        this.Ekkis2CliffsTopNorthwest = this.ekkis2CliffsTopNorthwest();
        this.Ekkis2CliffsTopSouthEastSide = this.ekkis2CliffsTopSouthEastSide();
        this.Ekkis2CliffsTopSouthWestSide = this.ekkis2CliffsTopSouthWestSide();
        this.Ekkis2CliffsTopSouthwest = this.ekkis2CliffsTopSouthwest();
        this.Ekkis2CavernsBarrier = this.ekkis2CavernsBarrier();
        this.Ekkis2CavernsDrips = this.ekkis2CavernsDrips();
        this.Ekkis2CavernsElevator = this.ekkis2CavernsElevator();
        this.Ekkis2CavernsGeyser = this.ekkis2CavernsGeyser();
        this.Ekkis2CavernsGrating = this.ekkis2CavernsGrating();
        this.Ekkis2CavernsPool = this.ekkis2CavernsPool();
        this.Ekkis2CavernsProjectionRoom = this.ekkis2CavernsProjectionRoom();
        this.Ekkis2CavernsSteamworks = this.ekkis2CavernsSteamworks();
        this.Ekkis2FartingNoiseBarFront = this.ekkis2FartingNoiseBarFront();
        this.Ekkis2FartingNoiseBarInterior = this.ekkis2FartingNoiseBarInterior();
        this.Ekkis2FartingNoiseBarRear = this.ekkis2FartingNoiseBarRear();
        this.Ekkis2FartingNoiseRobotShopFront = this.ekkis2FartingNoiseRobotShopFront();
        this.Ekkis2FartingNoiseRobotShopInterior = this.ekkis2FartingNoiseRobotShopInterior();
        this.Ekkis2FartingNoiseRobotShopWest = this.ekkis2FartingNoiseRobotShopWest();
        this.Ekkis2FartingNoiseNorthOfUsedShipLot = this.ekkis2FartingNoiseNorthOfUsedShipLot();
        this.Ekkis2FartingNoiseUsedShipLot = this.ekkis2FartingNoiseUsedShipLot();
        // Venipositor.
        this.VenipositorAirlockAntechamber = this.venipositorAirlockAntechamber();
        this.VenipositorAirlockChamber = this.venipositorAirlockChamber();
        this.VenipositorAirlockExterior = this.venipositorAirlockExterior();
        this.VenipositorArmory = this.venipositorArmory();
        this.VenipositorLaundry = this.venipositorLaundry();
        this.VenipositorLowerDeckHallAft = this.venipositorLowerDeckHallAft();
        this.VenipositorLowerDeckHallAmidships = this.venipositorLowerDeckHallAmidships();
        this.VenipositorLowerDeckHallFore = this.venipositorLowerDeckHallFore();
        this.VenipositorNearbySpace = this.venipositorNearbySpace();
        this.VenipositorShuttleBay = this.venipositorShuttleBay();
        this.VenipositorStellarJuvenatorChamber = this.venipositorStellarJuvenatorChamber();
        this.VenipositorStellarJuvenatorChamberCatwalk = this.venipositorStellarJuvenatorChamberCatwalk();
        this.VenipositorUpperDeckHallAft = this.venipositorUpperDeckHallAft();
        this.VenipositorUpperDeckHallAmidships = this.venipositorUpperDeckHallAmidships();
        this.VenipositorUpperDeckHallFore = this.venipositorUpperDeckHallFore();
        this.VenipositorVentilationShaft1 = this.venipositorVentilationShaft1();
        this.VenipositorVentilationShaft2 = this.venipositorVentilationShaft2();
        this.VenipositorVentilationShaft3 = this.venipositorVentilationShaft3();
        this.VenipositorVentilationShaft4 = this.venipositorVentilationShaft4();
        this._All =
            [
                // Pax Aeterna - Upper Deck.
                this.PaxAeternaJanitorsCloset,
                this.PaxAeternaUpperDeckHallAmidships,
                this.PaxAeternaLibrary,
                this.PaxAeternaUpperDeckHallForward,
                this.PaxAeternaUpperDeckHallAft,
                this.PaxAeternaBridge,
                // Pax Aeterna - Lower Deck.
                this.PaxAeternaLowerDeckHallAft,
                this.PaxAeternaLowerDeckHallAmidships,
                this.PaxAeternaLowerDeckHallForward,
                // Pax Aeterna - Engineering Deck.
                this.PaxAeternaEngineeringDeckAft,
                this.PaxAeternaEngineeringDeckAmidships,
                this.PaxAeternaEngineeringDeckForward,
                // Pax Aeterna - Docking Bay.
                this.PaxAeternaDockingBayAntechamber,
                this.PaxAeternaDockingBayHangar,
                this.PaxAeternaEscapePod,
                // Ekkis 2 - Desert.
                this.Ekkis2DesertCrashSite,
                this.Ekkis2DesertDeep,
                this.Ekkis2DesertNorth,
                this.Ekkis2DesertSouth,
                this.Ekkis2DesertWest,
                // Ekkis 2 - Cliffs.
                this.Ekkis2CliffsBottomNorth,
                this.Ekkis2CliffsBottomNortheast,
                this.Ekkis2CliffsBottomNorthwestEastSide,
                this.Ekkis2CliffsBottomNorthwestWestSide,
                this.Ekkis2CliffsBottomSouth,
                this.Ekkis2CliffsBottomSoutheast,
                this.Ekkis2CliffsBottomSouthwest,
                this.Ekkis2CliffsCaveInterior,
                this.Ekkis2CliffsTopNorth,
                this.Ekkis2CliffsTopNortheast,
                this.Ekkis2CliffsTopNorthwest,
                this.Ekkis2CliffsTopSouthEastSide,
                this.Ekkis2CliffsTopSouthWestSide,
                this.Ekkis2CliffsTopSouthwest,
                // Ekkis 2 - Caverns.
                this.Ekkis2CavernsProjectionRoom,
                this.Ekkis2CavernsSteamworks,
                this.Ekkis2CavernsBarrier,
                this.Ekkis2CavernsDrips,
                this.Ekkis2CavernsElevator,
                this.Ekkis2CavernsGeyser,
                this.Ekkis2CavernsGrating,
                this.Ekkis2CavernsPool,
                // Ekkis 2 - Village of [Farting Noise].
                this.Ekkis2FartingNoiseBarFront,
                this.Ekkis2FartingNoiseBarInterior,
                this.Ekkis2FartingNoiseBarRear,
                this.Ekkis2FartingNoiseRobotShopFront,
                this.Ekkis2FartingNoiseRobotShopInterior,
                this.Ekkis2FartingNoiseRobotShopWest,
                this.Ekkis2FartingNoiseNorthOfUsedShipLot,
                this.Ekkis2FartingNoiseUsedShipLot,
                // Venipositor.
                this.VenipositorAirlockAntechamber,
                this.VenipositorAirlockChamber,
                this.VenipositorAirlockExterior,
                this.VenipositorArmory,
                this.VenipositorLaundry,
                this.VenipositorLowerDeckHallAft,
                this.VenipositorLowerDeckHallAmidships,
                this.VenipositorLowerDeckHallFore,
                this.VenipositorNearbySpace,
                this.VenipositorShuttleBay,
                this.VenipositorStellarJuvenatorChamber,
                this.VenipositorStellarJuvenatorChamberCatwalk,
                this.VenipositorUpperDeckHallAft,
                this.VenipositorUpperDeckHallAmidships,
                this.VenipositorUpperDeckHallFore,
                this.VenipositorVentilationShaft1,
                this.VenipositorVentilationShaft2,
                this.VenipositorVentilationShaft3,
                this.VenipositorVentilationShaft4
            ];
    }
    emplacement(name) {
        return Emplacement.fromNameAndDescription(name, name);
    }
    emplacement2(name, description) {
        return Emplacement.fromNameAndDescription(name, description);
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
    portal(name, placeDestinationName) {
        return Portal.fromNameAndPlaceDestinationName(name, placeDestinationName);
    }
    portal_WithScript(name, scriptUseName) {
        return new Portal(name, null, null, scriptUseName);
    }
    // Places.
    // Places - Pax Aeterna.
    paxAeternaBridge() {
        return this.place2(Places.paxAeternaBridge_Name(), "This is the command bridge of the starship Pax Aeterna.  "
            + "A large transparent hemispherical dome arches overhead, "
            + "showing the brilliantly shining surrounding stars."
            + "Banks of mostly incomprehensible controls "
            + "line the circular wall, with the nearby seats "
            + "either empty or filled with the slumped bodies of dead crew."
            + "There's several bodies scattered on the floor, as well.  "
            + "A prominent pedestal in the center "
            + "formerly held the Stellar Juvenator, but now stands vacant.");
    }
    static paxAeternaBridge_Name() {
        return "Pax Aeterna - Bridge";
    }
    paxAeternaDockingBayAntechamber() {
        return this.place3(Places.paxAeternaDockingBayAntechamber_Name(), "This is the antechamber of the Pax Aeterna's docking bay.  "
            + "A large airlock door leads to the hangar.  "
            + "A control console occupies one wall, while "
            + "on the opposite wall are two closets, with a pair of "
            + " buttons at chest height between them. "
            + " An elevator leads back to the engineering deck.", [
            this.portal("airlock", Places.paxAeternaDockingBayHangar_Name()),
            this.portal("elevator", Places.paxAeternaEngineeringDeckAft_Name()),
            this.emplacement("controls"),
            this.emplacement("hatch")
        ]);
    }
    static paxAeternaDockingBayAntechamber_Name() {
        return "Pax Aeterna - Docking Bay - Antechamber";
    }
    paxAeternaDockingBayHangar() {
        return this.place3(Places.paxAeternaDockingBayHangar_Name(), "This is the Pax Aeterna's docking bay hangar.  "
            + "Though its floor is easily large enough to accomodate "
            + "a 20-passenger luxury yacht, it is currently empty "
            + "except for a relatively small hatch in the floor "
            + "and a control console near the airlock door leading back to the antechamber."
            + "A similarly gigantic pair of doors at the far end of the bay "
            + " allows ships to enter and depart when open, "
            + " and keeps everything safely sheltered when closed.", [
            this.portal("airlock", Places.paxAeternaDockingBayAntechamber_Name()),
            this.portal("pod", Places.paxAeternaEscapePod_Name()),
            this.emplacement("controls"),
            this.emplacement("hatch"),
            this.emplacement("pod"),
        ]);
    }
    static paxAeternaDockingBayHangar_Name() {
        return "Pax Aeterna - Docking Bay - Hangar";
    }
    paxAeternaEngineeringDeckAft() {
        return this.place3(Places.paxAeternaEngineeringDeckAft_Name(), "This is the aft end of the Pax Aeterna's engineering deck."
            + "A passage to fore leads back to the rest of the deck.  "
            + "In the aft wall is an elevator door, and next to that "
            + "is a small panel with a slot in it.", [
            this.portal("elevator", Places.paxAeternaDockingBayAntechamber_Name()),
            this.portal("forward", Places.paxAeternaEngineeringDeckAmidships_Name()),
            this.emplacement("slot")
        ]);
    }
    static paxAeternaEngineeringDeckAft_Name() {
        return "Pax Aeterna - Engineering Deck - Aft";
    }
    paxAeternaEngineeringDeckAmidships() {
        return this.place3(Places.paxAeternaEngineeringDeckAmidships_Name(), "This is the middle of the Pax Aeterna's engineering deck."
            + "To fore and aft are the other sections of the deck.  "
            + "Three large transparent domes on the floor cover the tops of "
            + "the ship's reactor tubes.  These domes are currently pulsing "
            + "an unsettling reddish-orange, accompanied by a loud "
            + "and ominous droning sound.  A thick window "
            + "looks down over the ship's docking bay, with a control console "
            + "running beneath that window.  The bodies of two crewmen lie on the floor.", [
            this.portal("aft", Places.paxAeternaEngineeringDeckAft_Name()),
            this.portal("forward", Places.paxAeternaEngineeringDeckForward_Name()),
            this.emplacement("controls"),
            this.emplacement("dome"),
            this.emplacement("window"),
            this.emplacement("body").commandAdd(new Command(["search body"], this.scripts.emplacementBodyEmptySearch.name))
        ]);
    }
    static paxAeternaEngineeringDeckAmidships_Name() {
        return "Pax Aeterna - Engineering Deck - Aft";
    }
    paxAeternaEngineeringDeckForward() {
        return this.place3(Places.paxAeternaEngineeringDeckForward_Name(), "This is the fore end of the Pax Aeterna's engineering deck."
            + "The rest of the deck lies to aft.  "
            + "At the fore end, an door opens on an elevator back to the other decks.", [
            this.portal("elevator", Places.paxAeternaLowerDeckHallForward_Name()),
            this.portal("aft", Places.paxAeternaEngineeringDeckAmidships_Name()),
            this.emplacement("slot")
        ]);
    }
    static paxAeternaEngineeringDeckForward_Name() {
        return "Pax Aeterna - Engineering Deck - Forward";
    }
    paxAeternaEscapePod() {
        return this.place3(Places.paxAeternaEscapePod_Name(), "This is the interior of one of the Pax Aeterna's escape pods."
            + "A padded seat with safety belts completely occupies the floor of the pod's cabin.  "
            + "Beneath the window is a console with various controls, "
            + "including a throttle, a monitor screen, and some buttons. "
            + "A gull-wing door in the left wall of the pod allows entry and exit.  "
            + "Opposite the door, on the starboard wall, is a mounting for a survival kit.  "
            + "Above the control console is a large window, through which "
            + "the pod's surroundings can be seen.", [
            this.portal_WithScript("door", this.scripts.placePaxAeternaEscapePod_GoDoor.name),
            this.emplacement("autonav button").commandAdd(new Command(["press autonav", "press autonav button"], this.scripts.placePaxAeternaEscapePod_PressAutonavButton.name)),
            this.emplacement("buttons"),
            this.emplacement("console"),
            this.emplacement("don't button"),
            this.emplacement("launch button").commandAdd(new Command(["press launch", "press launch button"], this.scripts.placePaxAeternaEscapePod_PressLaunchButton.name)),
            this.emplacement("monitor screen"),
            this.emplacement("safety belt"),
            this.emplacement("survival kit"),
            this.emplacement("throttle")
        ]);
    }
    static paxAeternaEscapePod_Name() {
        return "Pax Aeterna - Escape Pod";
    }
    paxAeternaJanitorsCloset() {
        return this.place4(Places.paxAeternaJanitorsCloset_Name(), "This office/supply closet/quarters, "
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
            + "(You tried sleeping out there once, but someone got mad.)", this.scripts.placePaxAeternaJanitorsCloset_Update.name, [
            this.portal("door", Places.paxAeternaUpperDeckHallAmidships_Name()),
        ]);
    }
    static paxAeternaJanitorsCloset_Name() {
        return "Pax Aeterna - Maintenance Specialist (Sanitation Grade)'s Office/Supply Closet/Quarters";
    }
    paxAeternaLibrary() {
        return this.place3(Places.paxAeternaLibrary_Name(), "This is the Pax Aeterna's library.  "
            + "Doors in the fore and aft walls lead to hallways.  "
            + "\n\n"
            + "The high walls are occupied almost completely with narrow shelves, "
            + "and the shelves are occupied almost completely "
            + "with row after row of plastic cartridges containing magnetic data tape.  "
            + "(The fleet tried a solid-state, full-digital data storage system for a while, "
            + " but it was agreed that it just didn't give the same rich tones.)"
            + "\n\n"
            + "A spacious round table ringed with comfortable seats and cartridge readers "
            + "fills a pit in the center of the room.  "
            + "On one wall is a control console with a keyboard and screen, "
            + "a spiderlike cartridge-retrieval robot clinging to the wall just above it."
            + "\n\n"
            + "A man wearing a scientist's smock lies face-down "
            + "on the floor in front of the console. ", [
            this.portal("forward", Places.paxAeternaUpperDeckHallForward_Name()),
            this.portal("aft", Places.paxAeternaUpperDeckHallAmidships_Name()),
            this.emplacement2("console", "If the title of a desired data cartridge is typed "
                + "on the console's keyboard, "
                + "the retrieval robot will retrieve that cartridge from the stacks "
                + "and drop it into the cartidge hopper below the console. "
                + "From there, the cartridge can be slotted into a reader "
                + "and its contents displayed to screen.  "
                + "It's a complicated system, to be sure, "
                + "but that sixteen hours of training you took was probably enough.").commandAdd(new Command(["type", "enter"], this.scripts.placePaxAeternaLibrary_Type.name)),
            this.emplacement2("table", "The table bears several cartridge readers, "
                + "and provides a comfortable place "
                + "for the more literate members of the crew to research data tapes."
                + "\n\n"
                + "You, on the other hand, have only used it once,"
                + "as an improvised playfield for a game of Vir-Naki Caroms "
                + "with the cartridge-retrieval bot, "
                + "but they made you stop before you could "
                + "figure out how to detach the bot from the shelves, "
                + "much less get a nice volley going."),
            this.emplacement2("reader", "The cartridge reader sitting atop the table "
                + "has a slot to insert a data cartridge into, "
                + "and a screen to display the cartridge's contents."),
            this.emplacement2("man", "He's not moving in any perceptible way.  "
                + "You can't tell from here if he's even breathing, "
                + "which is the most important kind of moving.").commandAdd(new Command(["search body", "search man", "talk to man"], this.scripts.placePaxAeternaLibrary_TalkToMan.name))
        ]);
    }
    static paxAeternaLibrary_Name() {
        return "Pax Aeterna - Library";
    }
    paxAeternaLowerDeckHallAft() {
        return this.place3(Places.paxAeternaLowerDeckHallAft_Name(), "This is a hallway on the lower deck of the starship Pax Aeterna.  "
            + "The hall continues to forward, and ends in a bulkhead to aft.  "
            + "There is a door here opening to an elevator.", [
            this.portal("forward", Places.paxAeternaLowerDeckHallAmidships_Name()),
            this.portal("elevator", Places.paxAeternaUpperDeckHallAft_Name()),
            this.emplacement("body").commandAdd(new Command(["search body"], this.scripts.emplacementBodyEmptySearch.name))
        ]);
    }
    static paxAeternaLowerDeckHallAft_Name() {
        return "Pax Aeterna - Lower Deck - Hall - Aft";
    }
    paxAeternaLowerDeckHallAmidships() {
        return this.place3(Places.paxAeternaLowerDeckHallAmidships_Name(), "This is a hallway on the lower deck of the starship Pax Aeterna.  "
            + "The hall continues to forward and to aft.", [
            this.portal("forward", Places.paxAeternaLowerDeckHallForward_Name()),
            this.portal("aft", Places.paxAeternaLowerDeckHallAft_Name())
        ]);
    }
    static paxAeternaLowerDeckHallAmidships_Name() {
        return "Pax Aeterna - Lower Deck - Hall - Amidships";
    }
    paxAeternaLowerDeckHallForward() {
        return this.place3(Places.paxAeternaLowerDeckHallForward_Name(), "This is a hallway on the lower deck of the starship Pax Aeterna.  "
            + "The hall continues to aft, and ends in a bulkhead to forward.  "
            + "There is a door here opening on an elevator.", [
            this.portal("aft", Places.paxAeternaLowerDeckHallAmidships_Name()),
            this.portal("elevator", Places.paxAeternaEngineeringDeckForward_Name()),
            this.emplacement("body").commandAdd(new Command(["search body"], this.scripts.emplacementBodyEmptySearch.name))
        ]);
    }
    static paxAeternaLowerDeckHallForward_Name() {
        return "Pax Aeterna - Lower Deck - Hall - Forward";
    }
    paxAeternaUpperDeckHallAft() {
        return this.place3(Places.paxAeternaUpperDeckHallAft_Name(), "This is a hallway on the upper deck the starship Pax Aeterna.  "
            + "The hall continues to forward, and ends in a bulkhead to aft.  "
            + "There is a door here opening on an elevator.", [
            this.portal("forward", Places.paxAeternaUpperDeckHallAmidships_Name()),
            this.portal("elevator", Places.paxAeternaLowerDeckHallAft_Name()),
            this.emplacement("body").commandAdd(new Command(["search body"], this.scripts.emplacementBodyEmptySearch.name))
        ]);
    }
    static paxAeternaUpperDeckHallAft_Name() {
        return "Pax Aeterna - Upper Deck - Hall - Aft";
    }
    paxAeternaUpperDeckHallAmidships() {
        return this.place4(Places.paxAeternaUpperDeckHallAmidships_Name(), "This is a hallway on the upper deck of the starship Pax Aeterna.  "
            + "The hall ends in a door to forward, and continues to aft.  "
            + "In the middle is a door leading to the office/supply closet/quarters "
            + "of the Maintenance Specialist (Sanitation Grade), "
            + "which is where you, our hero, came in to this story.", this.scripts.placePaxAeternaUpperDeckHallAmidships_Update.name, [
            this.portal("closet", Places.paxAeternaJanitorsCloset_Name()),
            this.portal("forward", Places.paxAeternaLibrary_Name()),
            this.portal("aft", Places.paxAeternaUpperDeckHallAft_Name())
        ]);
    }
    static paxAeternaUpperDeckHallAmidships_Name() {
        return "Pax Aeterna - Upper Deck - Hall - Amidships";
    }
    paxAeternaUpperDeckHallForward() {
        return this.place3(Places.paxAeternaUpperDeckHallForward_Name(), "This is a hallway on the upper deck of the starship Pax Aeterna.  "
            + "The hall ends in a bulkhead to forward and a door to aft.  "
            + "The body of a dead crewman lies crumpled "
            + "against the bulkhead at the forward end of the hall.", [
            this.portal("aft", Places.paxAeternaLibrary_Name()),
            this.emplacement("body").commandAdd(new Command(["search body"], this.scripts.emplacementBodyKeycardSearch.name))
        ]);
    }
    static paxAeternaUpperDeckHallForward_Name() {
        return "Pax Aeterna - Upper Deck - Hall - Forward";
    }
    // Places - Ekkis 2.
    // Places - Ekkis 2 - Desert.
    ekkis2DesertCrashSite() {
        return this.place3(Places.ekkis2DesertCrashSite_Name(), "Your escape pod has crashed in the middle of the desert "
            + "of the planet Ekkis2, rendering it completely inoperable.  "
            + "Its structural frame is severely bent, and the door unclosable.  "
            + "The forward window has shattered, "
            + "scattering shards of highly reflective glass over the sand "
            + "in front of the pod."
            + "\n\n"
            + "The desert stretches away as far as the eye can see to the "
            + "north, west, and south.  A maze of rocky cliffs rises to the east.", [
            this.portal("pod", Places.paxAeternaEscapePod_Name()),
            this.portal("east", Places.ekkis2CliffsBottomNorthwestWestSide_Name())
        ]);
    }
    static ekkis2DesertCrashSite_Name() { return "Ekkis II - Desert - Crash Site"; }
    ekkis2DesertDeep() {
        return this.place3(Places.ekkis2DesertDeep_Name(), "You stand in the trackless desert of the planet Ekkis2, "
            + "The featureless sand stretches away in every direction.", []
        // Scripts.placeEkkis2DesertDeepUpdate.name
        );
    }
    static ekkis2DesertDeep_Name() { return "Ekkis II - Desert - Deep Desert"; }
    ekkis2DesertNorth() {
        return this.place3(Places.ekkis2DesertNorth_Name(), "You stand in the trackless desert of the planet Ekkis2, "
            + "just north of the wreck of your crashed escape pod.  "
            + "The featureless sand stretches away in every other direction.", [
            this.portal("south", Places.ekkis2DesertCrashSite_Name()),
            this.portal("north", Places.ekkis2DesertDeep_Name()),
            this.portal("east", Places.ekkis2DesertDeep_Name()),
            this.portal("west", Places.ekkis2DesertDeep_Name()),
        ]);
    }
    static ekkis2DesertNorth_Name() { return "Ekkis II - Desert - North of Crash Site"; }
    ekkis2DesertSouth() {
        return this.place3(Places.ekkis2DesertSouth_Name(), "You stand in the trackless desert of the planet Ekkis2, "
            + "just south of the wreck of your crashed escape pod.  "
            + "The featureless sand stretches away in every other direction.", [
            this.portal("north", Places.ekkis2DesertCrashSite_Name()),
            this.portal("south", Places.ekkis2DesertDeep_Name()),
            this.portal("east", Places.ekkis2DesertDeep_Name()),
            this.portal("west", Places.ekkis2DesertDeep_Name()),
        ]);
    }
    static ekkis2DesertSouth_Name() { return "Ekkis II - Desert - South of Crash Site"; }
    ekkis2DesertWest() {
        return this.place3(Places.ekkis2DesertWest_Name(), "You stand in the trackless desert of the planet Ekkis2, "
            + "just west of the wreck of your crashed escape pod.  "
            + "The featureless sand stretches away in every other direction.", [
            this.portal("east", Places.ekkis2DesertCrashSite_Name()),
            this.portal("north", Places.ekkis2DesertDeep_Name()),
            this.portal("south", Places.ekkis2DesertDeep_Name()),
            this.portal("west", Places.ekkis2DesertDeep_Name()),
        ]);
    }
    static ekkis2DesertWest_Name() {
        return "Ekkis II - Desert - West of Crash Site";
    }
    // Places - Ekkis 2 - Cliffs.
    ekkis2CliffsBottomNorth() {
        return this.place3(Places.ekkis2CliffsBottomNorth_Name(), "You stand on the sand of the Ekkis2 desert, just to the south  "
            + "of a steep stone cliff running from west to east. ", [
            this.portal("south", Places.ekkis2CliffsBottomSouth_Name()),
            this.portal("west", Places.ekkis2CliffsBottomNorthwestEastSide_Name()),
            this.portal("east", Places.ekkis2CliffsBottomNortheast_Name())
        ]);
    }
    static ekkis2CliffsBottomNorth_Name() {
        return "Ekkis II - Cliffs - Bottom - North";
    }
    ekkis2CliffsBottomNortheast() {
        return this.place3(Places.ekkis2CliffsBottomNortheast_Name(), "You stand on the sand of the Ekkis2 desert, just to the south  "
            + "of a steep stone cliff running from the west "
            + "and ending just to the east.  "
            + "Above, on the clifftop, two large stone pillars stand about four meters "
            + "apart from each other.  As they rise, they bend toward each other like horns, "
            + "with jagged, broken tops.  "
            + "\n\n"
            + "To the east, the sand stretches away as far as you can see.", [
            this.portal("south", Places.ekkis2CliffsBottomSoutheast_Name()),
            this.portal("west", Places.ekkis2CliffsBottomNorthwestEastSide_Name()),
            this.portal("east", Places.ekkis2DesertDeep_Name())
        ]);
    }
    static ekkis2CliffsBottomNortheast_Name() {
        return "Ekkis II - Cliffs - Bottom - Northeast";
    }
    ;
    ekkis2CliffsBottomNorthwestEastSide() {
        return this.place3(Places.ekkis2CliffsBottomNorthwestEastSide_Name(), "You stand on the sand of the Ekkis2 desert, at the base  "
            + "of a sheer stone cliff that curves away to the south and east.  ", [
            this.portal("east", Places.ekkis2CliffsBottomNorth_Name()),
            this.portal("south", Places.ekkis2CliffsBottomSouthwest_Name())
        ]);
    }
    static ekkis2CliffsBottomNorthwestEastSide_Name() {
        return "Ekkis II - Cliffs - Bottom - Northwest - East Side";
    }
    ekkis2CliffsBottomNorthwestWestSide() {
        return this.place3(Places.ekkis2CliffsBottomNorthwestWestSide_Name(), "You stand on the sand of the Ekkis2 desert, at the base  "
            + "of a sheer stone cliff that curves away to the south and east,  "
            + "and which blocks passage to the east.  "
            + "The site where your escape pod crashed is to the west."
            + "To the south, more cliffs are visible. "
            + " The desert stretches away to the north, and west.", [
            this.portal("south", Places.ekkis2CliffsBottomSouthwest_Name()),
            this.portal("west", Places.ekkis2DesertCrashSite_Name()),
            this.emplacement("hole"
            // "This is a hole in the side of the cliff face, "
            // + "about 40 centimeters in diameter.  Its interior is "
            // + "deeply shadowed, making it impossible to see what, "
            // + "if anything, might be inside it."
            )
        ]);
    }
    static ekkis2CliffsBottomNorthwestWestSide_Name() {
        return "Ekkis II - Cliffs - Bottom - Northwest - West Side";
    }
    ekkis2CliffsBottomSouth() {
        return this.place3(Places.ekkis2CliffsBottomSouth_Name(), "You stand on the desert of Ekkis II, "
            + "in a area surrounded by a system of cliffs.  "
            + "In the shelter afforded by the cliffs, "
            + "some stunted greenery actually manages to cling to life.  "
            + "Overhead, a weathered stone arch bridges the tops of the cliffs "
            + "to the east with those to the west.  "
            + "Surface paths between cliff bases run to the west, north, and east.", [
            this.portal("east", Places.ekkis2CliffsBottomSoutheast_Name()),
            this.portal("north", Places.ekkis2CliffsBottomNorth_Name()),
            this.portal("west", Places.ekkis2CliffsBottomSouthwest_Name()),
        ]);
    }
    static ekkis2CliffsBottomSouth_Name() {
        return "Ekkis II - Cliffs - Bottom - South";
    }
    ekkis2CliffsBottomSoutheast() {
        return this.place3(Places.ekkis2CliffsBottomSoutheast_Name(), "You stand on a clear stretch of sand amid a formation of stone cliffs.  "
            + "The sandy surface of the desert runs to the north and to the west. "
            + "To the east is a tall, confused jumble of rocks, "
            + " in which a large, shadowy cave mouth opens."
            + "On the west side of the clearing, a stone slope rises jaggedly "
            + "upward between jutting upright stones, climbing as it runs northward.", [
            this.portal("north", Places.ekkis2CliffsBottomSouth_Name()),
            this.portal("west", Places.ekkis2CliffsBottomSouth_Name()),
            this.portal("east", Places.ekkis2CliffsCaveInterior_Name()),
            this.portal("up", Places.ekkis2CliffsTopSouthEastSide_Name())
        ]);
    }
    static ekkis2CliffsBottomSoutheast_Name() {
        return "Ekkis II - Cliffs - Bottom - Southeast";
    }
    ekkis2CliffsBottomSouthwest() {
        return this.place3(Places.ekkis2CliffsBottomSouthwest_Name(), "todo", [
            this.portal("east", Places.ekkis2CliffsBottomSouth_Name()),
            this.portal("north", Places.ekkis2CliffsBottomNorthwestEastSide_Name())
        ]);
    }
    static ekkis2CliffsBottomSouthwest_Name() { return "Ekkis II - Cliffs - Bottom - Southwest"; }
    ;
    ekkis2CliffsCaveInterior() {
        return this.place3(Places.ekkis2CliffsCaveInterior_Name(), "This is a cool, dark cave.  Mossy vegetation clings to the rocks.  "
            + "To the west the cave opens out into the blazing daylight "
            + "of the Ekkis2 desert.", [
            this.portal("west", Places.ekkis2CliffsBottomSoutheast_Name()),
        ]);
    }
    static ekkis2CliffsCaveInterior_Name() {
        return "Ekkis II - Cliffs - Cave - Interior";
    }
    ekkis2CliffsTopNorth() {
        return this.place3(Places.ekkis2CliffsTopNorth_Name(), "You stand atop a rocky cliff rising from the desert "
            + "of the planet Ekkis2.  "
            + "The top of the cliff continues to the west and east.", [
            this.portal("east", Places.ekkis2CliffsTopNortheast_Name()),
            this.portal("west", Places.ekkis2CliffsTopNorthwest_Name())
        ]);
    }
    static ekkis2CliffsTopNorth_Name() {
        return "Ekkis II - Cliffs - Top - North";
    }
    ekkis2CliffsTopNortheast() {
        return this.place3(Places.ekkis2CliffsTopNortheast_Name(), "You stand on the end of a cliff "
            + "rising from the desert of the planet Ekkis2.  "
            + "A pair of leaning stone columns rises from the clifftop here, "
            + "bending toward each other like horns.  "
            + "The top of the cliff runs back toward the west.", [
            this.portal("west", Places.ekkis2CliffsTopNorth_Name()),
            this.portal("columns", Places.ekkis2CavernsElevator_Name())
        ]);
    }
    static ekkis2CliffsTopNortheast_Name() { return "Ekkis II - Cliffs - Top - Northeast"; }
    ekkis2CliffsTopNorthwest() {
        return this.place3(Places.ekkis2CliffsTopNorthwest_Name(), "You stand atop a cliff rising from the desert of the planet Ekkis2.  "
            + "The path along the clifftop curves from the south to the east.  "
            + "Some jagged peaks jut upward along the northern edge of the cliff.", [
            this.portal("east", Places.ekkis2CliffsTopNorth_Name()),
            this.portal("south", Places.ekkis2CliffsTopSouthwest_Name())
        ]);
    }
    static ekkis2CliffsTopNorthwest_Name() {
        return "Ekkis II - Cliffs - Top - Northwest";
    }
    ekkis2CliffsTopSouthEastSide() {
        return this.place3(Places.ekkis2CliffsTopSouthEastSide_Name(), "You stand atop a cliff rising from the desert of the planet Ekkis2.  "
            + "To the east, a downward slope curves southward "
            + "back to the desert surface. "
            + "To the west, the cliff top rises and then falls "
            + "in an weathered stone arch, "
            + "which serves as a natural bridge to the clifftop on the other side."
            + "Below the arch is a slightly greener patch of desert "
            + "sheltered by the surrounding cliffs.", [
            this.portal("east", Places.ekkis2CliffsBottomSoutheast_Name()),
            this.portal("west", Places.ekkis2CliffsTopSouthWestSide_Name())
        ]);
    }
    static ekkis2CliffsTopSouthEastSide_Name() {
        return "Ekkis II - Cliffs - Top - Arch - East Side";
    }
    ekkis2CliffsTopSouthWestSide() {
        return this.place3(Places.ekkis2CliffsTopSouthWestSide_Name(), "You stand atop a cliff rising from the desert of the planet Ekkis2.  "
            + "To the east, the cliff top rises and then falls "
            + "in an weathered stone arch, "
            + "which serves as a natural bridge to the clifftop on the other side,"
            + "and from there down a slope to the desert surface."
            + "Below the arch is a slightly greener patch of desert "
            + "sheltered by the surrounding cliffs.", [
            this.portal("east", Places.ekkis2CliffsTopSouthEastSide_Name()),
            this.portal("west", Places.ekkis2CliffsTopSouthwest_Name())
        ]);
    }
    static ekkis2CliffsTopSouthWestSide_Name() {
        return "Ekkis II - Cliffs - Top - Arch - West Side";
    }
    ekkis2CliffsTopSouthwest() {
        return this.place3(Places.ekkis2CliffsTopSouthwest_Name(), "You stand atop a cliff rising from the desert of the planet Ekkis2.  "
            + "The path along the clifftop curves "
            + "from the east, where a natural stone bridge "
            + "arches over the desert surface, "
            + "and continues to the north.", [
            this.portal("north", Places.ekkis2CliffsTopNorthwest_Name()),
            this.portal("east", Places.ekkis2CliffsTopSouthWestSide_Name())
        ]);
    }
    static ekkis2CliffsTopSouthwest_Name() {
        return "Ekkis II - Cliffs - Top - Southwest";
    }
    // Places - Ekkis 2 - Caverns.
    ekkis2CavernsBarrier() {
        return this.place3(Places.ekkis2CavernsBarrier_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis2.  "
            + "The path to the west is blocked by several closely spaced "
            + "and intensely bright beams of light,"
            + "which are emitted from small round ports the rock walls, "
            + "and which pass into similar ports on the other side.  "
            + "Beyond this barrier, the path rises up and curves to the right "
            + "in a rough semicircle, leading along a higher path back to the east."
            + "A passage leads back to the east.", [
            this.portal("east", Places.ekkis2CavernsPool_Name()),
            this.portal("west", Places.ekkis2CavernsDrips_Name())
        ]);
    }
    static ekkis2CavernsBarrier_Name() {
        return "Ekkis II - Caverns - Barrier";
    }
    ekkis2CavernsDrips() {
        return this.place3(Places.ekkis2CavernsDrips_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis2.  "
            + "The passage runs to the east, where drips of a clear liquid "
            + "fall intermittently from the ceiling.  "
            + "Each drip passes into a small, precise hole in the floor "
            + "that appears as if it were made to fit it."
            + "A passage leads back to the west, "
            + "curving left in a rough semicircle back down to the level below.", [
            this.portal("east", Places.ekkis2CavernsProjectionRoom_Name()),
            this.portal("west", Places.ekkis2CavernsBarrier_Name())
        ]);
    }
    static ekkis2CavernsDrips_Name() {
        return "Ekkis II - Caverns - Drips";
    }
    ekkis2CavernsElevator() {
        return this.place3(Places.ekkis2CavernsElevator_Name(), "You stand at the bottom of the elevator that brought you down "
            + "from the cliffs of Ekkis2 to a cool, dark, rocky cavern.  "
            + "The elevator door lies at the east side of the passage.  "
            + "From there, the passage runs to the west.", [
            this.portal("west", Places.ekkis2CavernsGrating_Name())
        ]);
    }
    static ekkis2CavernsElevator_Name() {
        return "Ekkis II - Caverns - Elevator";
    }
    ekkis2CavernsGeyser() {
        return this.place3(Places.ekkis2CavernsGeyser_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis2.  "
            + "The passage to the west ends abruptly in a solid rock wall."
            + "Nearby, a small geyser shoots wetly and steamily out of a hole "
            + " in the top of a stalagmite."
            + "Another passage leads back east.", [
            this.portal("west", Places.ekkis2CavernsPool_Name()),
            this.portal("east", Places.ekkis2CavernsGrating_Name())
        ]);
    }
    static ekkis2CavernsGeyser_Name() {
        return "Ekkis II - Caverns - Geyser";
    }
    ekkis2CavernsGrating() {
        return this.place3(Places.ekkis2CavernsGrating_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis2, "
            + "in a passage running from east to west."
            + "In the floor leading to the west, a thick metal grating "
            + "perforated with holes about 10 centimeters wide "
            + "stretches from wall to wall across the entire passage. ", [
            this.portal("west", Places.ekkis2CavernsGeyser_Name()),
            this.portal("east", Places.ekkis2CavernsElevator_Name())
        ]);
    }
    static ekkis2CavernsGrating_Name() {
        return "Ekkis II - Caverns - Grating";
    }
    ekkis2CavernsPool() {
        return this.place3(Places.ekkis2CavernsPool_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis2. "
            + "You stand on a wide ledge that runs south, back through a hidden doorway, "
            + " where a plugged geyser steams fitfully.  To the west, the ledge runs "
            + "through dark natural stone columns and on into the darkness.  "
            + "Far below the ledge is a pool of clear liquid, "
            + "with drips falling from holes in the ceiling to fill it.  "
            + "A passage leads back to the east.", [
            this.portal("west", Places.ekkis2CavernsBarrier_Name()),
            this.portal("east", Places.ekkis2CavernsGeyser_Name())
        ]);
    }
    static ekkis2CavernsPool_Name() {
        return "Ekkis II - Caverns - Pool";
    }
    ekkis2CavernsProjectionRoom() {
        return this.place3(Places.ekkis2CavernsProjectionRoom_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis2. "
            + "This space is completely dark at the moment.  Earlier, it was lit only "
            + "by a holographic projection of a triangular-headed alien.  "
            + "A passage leads back to the east.", [
            this.portal("west", Places.ekkis2CavernsDrips_Name()),
            this.portal("north", Places.ekkis2CavernsSteamworks_Name())
        ]);
    }
    static ekkis2CavernsProjectionRoom_Name() {
        return "Ekkis II - Caverns - Projection Room";
    }
    ekkis2CavernsSteamworks() {
        return this.place3(Places.ekkis2CavernsSteamworks_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis2. "
            + "Arrays of giant metal pistons pump noisily away, leaking wisps of steam. "
            + "A computer console with a monitor and standard data cartridge slot "
            + "stands against the north wall.  Above it is a catwalk where members "
            + "of a gray-skinned, large-eyed, triangular-headed alien species "
            + "busily operate various inscrutable control systems."
            + "To the west is a small, garage-like space, with a door at the end "
            + "that appears to open onto a large elevator platform.", [
            this.portal("east", Places.ekkis2CavernsProjectionRoom_Name()),
            this.portal("skimmer", Places.ekkis2FartingNoiseBarFront_Name())
        ]);
    }
    static ekkis2CavernsSteamworks_Name() { return "Ekkis II - Caverns - Steamworks"; }
    // Places - Ekkis 2 - Village of [Farting Noise].
    ekkis2FartingNoiseBarFront() {
        return this.place3(Places.ekkis2FartingNoiseBarFront_Name(), "You stand in the tiny settlement named, "
            + " as near as you can make out from the signs in Universal Phonospeak, "
            + "[Farting Noise].  "
            + "In the natives' defense, maybe their farts sound completely different from yours."
            + "\n\n"
            + "To the east stands a concrete igloo with an arched entrance, "
            + "above which is a lighted sign that reads "
            + "'Poot-Poot-P-Phttt' in Universal Phonospeak,"
            + "followed by 'BAR' in "
            + "several of the more common, less aspirated, languages of this sector of space."
            + "\n\n"
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
            + "that protects this settlement from the native predatory sand-swimmers.", [
            this.portal("north", Places.ekkis2FartingNoiseRobotShopWest_Name()),
            this.portal("west", Places.ekkis2FartingNoiseUsedShipLot_Name()),
            this.portal("east", Places.ekkis2FartingNoiseBarRear_Name()),
            this.portal("south", Places.ekkis2DesertDeep_Name()),
            this.portal("bar", Places.ekkis2FartingNoiseBarInterior_Name())
        ]);
    }
    static ekkis2FartingNoiseBarFront_Name() {
        return "Ekkis II - [Farting Noise] - Bar - Front";
    }
    ekkis2FartingNoiseBarInterior() {
        return this.place3(Places.ekkis2FartingNoiseBarInterior_Name(), "You stand inside the [Farting Noise] bar.  "
            + "On a small stage, a band of garishly dressed bipeds loudly plays "
            + "what you can only assume is a song, "
            + "and that you can only further assume to be one of their hits.  "
            + "A bar runs along the opposite wall, where a harried bartender "
            + "delivers drinks to patrons seated on stools, "
            + "some of whom are engaged in conversation, or at least reciprocal bluster.  "
            + "A cabinet housing some sort of video gambling machine stands in the back.  "
            + "A squat cleaning robot busily sweeps the floor around the machine, "
            + "and periodically empties a load of its sweepings into a hatch in the back wall.", [
            this.portal("outside", Places.ekkis2FartingNoiseBarFront_Name()),
            this.emplacement("band"),
            this.emplacement("bar"),
            this.emplacement("heap"),
            this.emplacement("machine"),
            this.emplacement("bartender"),
            this.emplacement("patrons")
        ]);
    }
    static ekkis2FartingNoiseBarInterior_Name() {
        return "Ekkis II - [Farting Noise] - Bar - Interior";
    }
    ekkis2FartingNoiseBarRear() {
        return this.place3(Places.ekkis2FartingNoiseBarRear_Name(), "You stand behind the [Farting Noise] bar.  "
            + "It is somewhat secluded here."
            + "Force-fields block access to the surrounding desert to the east and south.  "
            + "You can see another, larger building to the north.  "
            + "At irregular intervals, a hatch in the back wall of the bar opens "
            + "and expels some fine white powder, "
            + "which settles onto a larger heap of powder below.", [
            this.portal("north", Places.ekkis2FartingNoiseRobotShopWest_Name()),
            this.portal("west", Places.ekkis2FartingNoiseUsedShipLot_Name()),
            this.portal("east", Places.ekkis2FartingNoiseBarRear_Name()),
            this.emplacement("heap")
        ]);
    }
    static ekkis2FartingNoiseBarRear_Name() {
        return "Ekkis II - [Farting Noise] - Bar - Rear";
    }
    ekkis2FartingNoiseRobotShopFront() {
        return this.place3(Places.ekkis2FartingNoiseRobotShopFront_Name(), "You stand in the desert settlement of [Farting Noise], "
            + "to the south of the entrance of a domed building "
            + "bearing the sign 'Buy, Robot'.", [
            this.portal("west", Places.ekkis2FartingNoiseRobotShopWest_Name()),
            this.portal("door", Places.ekkis2FartingNoiseRobotShopInterior_Name()),
        ]);
    }
    static ekkis2FartingNoiseRobotShopFront_Name() {
        return "Ekkis II - Buy, Robot - Front";
    }
    ekkis2FartingNoiseRobotShopInterior() {
        return this.place3(Places.ekkis2FartingNoiseRobotShopInterior_Name(), "You stand inside the [Farting Noise] branch of 'Buy, Robot'. "
            + "Various inactive robots are displayed on pedestals, "
            + "each bearing a more-or-less conspicious price tag.  "
            + "A salesbeing watches you idly, perhaps waiting to see if you require assistance.  "
            + "In the south wall is the door leading back outside.", [
            this.portal("outside", Places.ekkis2FartingNoiseRobotShopFront_Name())
        ]);
    }
    static ekkis2FartingNoiseRobotShopInterior_Name() {
        return "Ekkis II - Buy, Robot - Interior";
    }
    ekkis2FartingNoiseRobotShopWest() {
        return this.place3(Places.ekkis2FartingNoiseRobotShopWest_Name(), "You stand in the desert settlement of [Farting Noise], "
            + "to the west of a large domed building.  "
            + "To the east, you can see the building's entrance, "
            + "over which is a sign reading 'Buy, Robot'.  "
            + "A smaller domed building housing a bar lies to the south. "
            + "Further to the west, you see a spaceship standing "
            + "at the northern edge of a brightly decorated lot containing several more ships."
            + "A force field blocks access to the open desert to the north. ", [
            this.portal("south", Places.ekkis2FartingNoiseBarFront_Name()),
            this.portal("east", Places.ekkis2FartingNoiseRobotShopFront_Name()),
            this.portal("west", Places.ekkis2FartingNoiseNorthOfUsedShipLot_Name())
        ]);
    }
    static ekkis2FartingNoiseRobotShopWest_Name() {
        return "Ekkis II - Buy, Robot - West";
    }
    ekkis2FartingNoiseNorthOfUsedShipLot() {
        return this.place3(Places.ekkis2FartingNoiseNorthOfUsedShipLot_Name(), "You stand in the desert settlement of [Farting Noise].  "
            + "You see a spaceship standing here, and, to the south,"
            + "a brightly decorated lot containing several more ships."
            + " To the east, you see a large domed building. "
            + "A smaller domed building with a sign that says 'Bar' lies to the southeast. "
            + "A force field blocks access to the open desert to the north and west.", [
            this.portal("east", Places.ekkis2FartingNoiseRobotShopWest_Name()),
            this.portal("south", Places.ekkis2FartingNoiseUsedShipLot_Name())
        ]);
    }
    static ekkis2FartingNoiseNorthOfUsedShipLot_Name() {
        return "Ekkis II - [Farting Noise] - North of Non-Gelatinous George's Used Ships";
    }
    ekkis2FartingNoiseUsedShipLot() {
        return this.place3(Places.ekkis2FartingNoiseNorthOfUsedShipLot_Name(), "You stand in the desert settlement of [Farting Noise], "
            + "in a sandy lot brighly decorated with colorful pennants "
            + " strung along lines, and containing several ships in various states of wear."
            + "Just to the north you see another ship standing by itself."
            + "At one edge of the lot is a small cubical building "
            + "bearing a sign that says, 'Non-Gelatinous George's Used Ships'."
            + "A domed building with a sign that says 'Bar' stands to the east. "
            + "A larger domed building stands to the northeast. "
            + "A force field blocks access to the open desert to the south and west. ", [
            this.portal("east", Places.ekkis2FartingNoiseBarFront_Name()),
            this.portal("north", Places.ekkis2FartingNoiseNorthOfUsedShipLot_Name())
        ]);
    }
    static ekkis2FartingNoiseUsedShipLot_Name() {
        return "Ekkis II - [Farting Noise] - Non-Gelatinous George's Used Ships";
    }
    // Places - Venipositor.
    venipositorAirlockAntechamber() {
        return this.place3(Places.venipositorAirlockAntechamber_Name(), "This is the antechamber of an airlock on the Venipositor.", [
        // todo
        ]);
    }
    static venipositorAirlockAntechamber_Name() {
        return "Venipositor - Airlock - Antechamber";
    }
    venipositorAirlockChamber() {
        return this.place3(Places.venipositorAirlockChamber_Name(), "This is the interior of one of the Venipositor's airlocks."
            + "Doors at either end lead into and out of the Venipositor", [
            this.portal("in", Places.venipositorAirlockAntechamber_Name()),
            this.portal("out", Places.venipositorAirlockExterior_Name())
        ]);
    }
    static venipositorAirlockChamber_Name() { return "Venipositor - Airlock - Chamber"; }
    venipositorAirlockExterior() {
        return this.place3(Places.venipositorAirlockExterior_Name(), "This is the exterior of the Venipositor, near an airlock door.  "
            + "The boundless sweep of space spreads out in all directions.", [
            this.portal("door", Places.venipositorAirlockChamber_Name()),
        ]);
    }
    static venipositorAirlockExterior_Name() {
        return "Venipositor - Exterior - Airlock Door";
    }
    venipositorArmory() {
        return this.place3(Places.venipositorArmory_Name(), "This is the armory of the Venipositor."
            + "At the aft end high counter, with a robot standing watch behind it, "
            + "blocks the path to the weapon racks.  A door to forward leads back "
            + "out onto the catwalk above the Stellar Juvenator chamber.", [
            this.portal("forward", Places.venipositorStellarJuvenatorChamberCatwalk_Name())
        ]);
    }
    static venipositorArmory_Name() {
        return "Venipositor - Armory";
    }
    venipositorLaundry() {
        return this.place3(Places.venipositorLaundry_Name(), "This is a laundry room on the Venipositor.", [
        // todo
        ]);
    }
    static venipositorLaundry_Name() {
        return "Venipositor - Laundry";
    }
    venipositorLowerDeckHallAft() {
        return this.place3(Places.venipositorLowerDeckHallAft_Name(), "This is the aft end of a hallway on the lower deck of the Venipositor.", [
            this.portal("forward", Places.venipositorLowerDeckHallAmidships_Name())
        ]);
    }
    static venipositorLowerDeckHallAft_Name() { return "Venipositor - Hall - Lower Deck - Aft"; }
    venipositorLowerDeckHallAmidships() {
        return this.place3(Places.venipositorLowerDeckHallAmidships_Name(), "This is the amidships section of a hallway on the lower deck of the Venipositor.", [
            this.portal("aft", Places.venipositorLowerDeckHallAft_Name()),
            this.portal("forward", Places.venipositorLowerDeckHallFore_Name())
        ]);
    }
    static venipositorLowerDeckHallAmidships_Name() { return "Venipositor - Hall - Lower Deck - Amidships"; }
    venipositorLowerDeckHallFore() {
        return this.place3(Places.venipositorLowerDeckHallFore_Name(), "This is the forward end of a hallway on the lower deck of the Venipositor.", [
            this.portal("aft", Places.venipositorLowerDeckHallAmidships_Name()),
        ]);
    }
    static venipositorLowerDeckHallFore_Name() { return "Venipositor - Hall - Lower Deck - Forward"; }
    venipositorNearbySpace() {
        return this.place3(Places.venipositorNearbySpace_Name(), "You are in your ship, hovering nearby the Venipositor.", [
            this.portal("out", Places.venipositorAirlockExterior_Name()),
        ]);
    }
    static venipositorNearbySpace_Name() { return "Venipositor - Nearby Space"; }
    venipositorShuttleBay() {
        return this.place3(Places.venipositorShuttleBay_Name(), "This is the shuttle bay of the Venipositor.", [
        // todo
        ]);
    }
    static venipositorShuttleBay_Name() { return "Venipositor - Shuttle Bay"; }
    venipositorStellarJuvenatorChamber() {
        return this.place3(Places.venipositorStellarJuvenatorChamber_Name(), "This is a cavernous room on the Venipositor.  "
            + "The Stellar Juvenator is mounted on a pedestal, "
            + "with an armed guard standing nearby.  "
            + "A catwalk runs overhead.", [
        // todo
        ]);
    }
    static venipositorStellarJuvenatorChamber_Name() { return "Venipositor - Stellar Juvenator Chamber"; }
    venipositorStellarJuvenatorChamberCatwalk() {
        return this.place3(Places.venipositorStellarJuvenatorChamberCatwalk_Name(), "You are standing on a railed catwalk above a "
            + " cavernous chamber on the Venipositor.  "
            + "On the floor, far below, the Stellar Juvenator"
            + "is mounted on a pedestal, "
            + "with an armed guard standing nearby.  "
            + "The catwalk runs fore and aft.", [
            this.portal("aft", Places.venipositorArmory_Name()),
            this.portal("forward", "todo"),
        ]);
    }
    static venipositorStellarJuvenatorChamberCatwalk_Name() { return "Venipositor - Stellar Juvenator Chamber - Catwalk"; }
    venipositorUpperDeckHallAft() {
        return this.place3(Places.venipositorUpperDeckHallAft_Name(), "This is the aft end of a hallway on the upper deck of the Venipositor.", [
            this.portal("forward", Places.venipositorUpperDeckHallAmidships_Name()),
        ]);
    }
    static venipositorUpperDeckHallAft_Name() { return "Venipositor - Hall - Upper Deck - Aft"; }
    venipositorUpperDeckHallAmidships() {
        return this.place3(Places.venipositorUpperDeckHallAmidships_Name(), "This is the amidships section of a hallway "
            + "on the upper deck of the Venipositor.", [
            this.portal("aft", Places.venipositorUpperDeckHallAft_Name()),
            this.portal("forward", Places.venipositorUpperDeckHallFore_Name()),
        ]);
    }
    static venipositorUpperDeckHallAmidships_Name() { return "Venipositor - Hall - Upper Deck - Amidships"; }
    venipositorUpperDeckHallFore() {
        return this.place3(Places.venipositorUpperDeckHallFore_Name(), "This is the forward end of a hallway on the upper deck of the Venipositor.", [
            this.portal("aft", Places.venipositorUpperDeckHallAmidships_Name()),
        ]);
    }
    static venipositorUpperDeckHallFore_Name() { return "Venipositor - Hall - Upper Deck - Forward"; }
    venipositorVentilationShaft1() {
        return this.place3(Places.venipositorVentilationShaft1_Name(), "This is a ventilation shaft on the Venipositor.  "
            + "A short side branch leads to a vent cover.", [
            this.portal("back", Places.venipositorVentilationShaft4_Name()),
            this.portal("forward", Places.venipositorVentilationShaft1_Name()),
            this.portal("vent", Places.venipositorAirlockAntechamber_Name())
        ]);
    }
    static venipositorVentilationShaft1_Name() { return "Venipositor - Ventilation Shaft - 1"; }
    venipositorVentilationShaft2() {
        return this.place3(Places.venipositorVentilationShaft2_Name(), "This is a ventilation shaft on the Venipositor.  "
            + "A short side branch leads to a vent cover.", [
            this.portal("back", Places.venipositorVentilationShaft1_Name()),
            this.portal("forward", Places.venipositorVentilationShaft3_Name()),
            this.portal("vent", Places.venipositorLaundry_Name())
        ]);
    }
    static venipositorVentilationShaft2_Name() { return "Venipositor - Ventilation Shaft - 2"; }
    venipositorVentilationShaft3() {
        return this.place3(Places.venipositorVentilationShaft3_Name(), "This is a featureless stretch of ventilation shaft on the Venipositor.", [
            this.portal("back", Places.venipositorVentilationShaft2_Name()),
            this.portal("forward", Places.venipositorVentilationShaft4_Name())
        ]);
    }
    static venipositorVentilationShaft3_Name() { return "Venipositor - Ventilation Shaft - 3"; }
    venipositorVentilationShaft4() {
        return this.place3(Places.venipositorVentilationShaft4_Name(), "This is a featureless stretch of ventilation shaft on the Venipositor.", [
            this.portal("back", Places.venipositorVentilationShaft3_Name()),
            this.portal("forward", Places.venipositorVentilationShaft1_Name())
        ]);
    }
    static venipositorVentilationShaft4_Name() { return "Venipositor - Ventilation Shaft - 4"; }
}
class Scripts {
    constructor() {
        var scriptMethods = [
            this.agentSarienTalkTo,
            this.emplacementBodyEmptySearch,
            this.emplacementBodyKeycardSearch,
            this.itemCartridgeUse,
            this.itemKeycardUse,
            this.placePaxAeternaEscapePod_GoDoor,
            this.placePaxAeternaEscapePod_PressAutonavButton,
            this.placePaxAeternaEscapePod_PressLaunchButton,
            this.placePaxAeternaJanitorsCloset_Update,
            this.placePaxAeternaLibrary_TalkToMan,
            this.placePaxAeternaLibrary_Type,
            this.placePaxAeternaUpperDeckHallAmidships_Update,
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
    agentSarienTalkTo(u, w, p, agent) {
        var message = "The Sarien's only response is to disintegrate you.";
        w.isOver = true;
        u.messageEnqueue(message);
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
            var itemKeycard = Item.fromNameAndDescription("keycard", "This is an access keycard for the starship PaxAeterna.");
            place.itemAdd(itemKeycard);
            var emplacementBody = place.emplacements.find(x => x.name == "body");
            emplacementBody.commands.length = 0;
        }
        u.messageEnqueue(message);
    }
    itemCartridgeUse(u, w, p, c) {
        var message;
        if (p.emplacementByName("reader") == null) {
            message = "There is no cartridge reader here.";
        }
        else {
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
    itemKeycardUse(u, w, p, i, target) {
        var message;
        if (target == null) {
            message = "The keycard must be used on something.";
        }
        else if (target.name != "slot") {
            message = "The keycard will only fit in an appropriately sized slot.";
        }
        else if (target.stateGroup.valueGetByName(StateNames.isOpen())) {
            message = "There's no need to use the keycard again, the door is already open.";
            target.stateGroup.stateWithNameSetToValue(StateNames.isOpen(), true);
        }
        else {
            message = "You insert the keycard into the slot.  The adjacent door opens.";
            target.stateGroup.stateWithNameSetToValue(StateNames.isOpen(), true);
        }
        u.messageEnqueue(message);
    }
    placePaxAeternaEscapePod_GoDoor(u, w, place, portalDoor) {
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
    placePaxAeternaEscapePod_PressAutonavButton(u, w, p, c) {
        var messageLines = [
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
            Places.ekkis2DesertCrashSite_Name();
    }
    placePaxAeternaEscapePod_PressLaunchButton(u, w, p, c) {
        var messageLines = [
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
    placePaxAeternaJanitorsCloset_Update(u, w, p, c) {
        if (p.hasBeenVisited() == false) {
            p.visit();
            var messageLines = [
                "Space Adventure Game Clone",
                "\n\n",
                "You are jolted awake to find yourself ",
                "in the office/supply closet/quarters ",
                "of the Maintenance Specialist (Sanitation Grade) ",
                "of the starship Pax Aeterna, ",
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
    placePaxAeternaLibrary_TalkToMan(u, w, p, c) {
        var stateScientistIsDeadName = "ScientistIsDead";
        var scientistIsDead = p.stateWithNameIsTrue(stateScientistIsDeadName);
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
            p.stateWithNameSetToTrue(stateScientistIsDeadName);
        }
        u.messageEnqueue(message);
    }
    placePaxAeternaLibrary_Type(u, w, p, c) {
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
            p.itemAdd(Item.fromNameAndDescription("cartridge", "A label printed on this data cartridge reads 'Astral Bodies'.").commandAdd(new Command([
                "put cartridge in reader",
                "put cartridge in slot",
                "use cartridge on reader"
            ], Scripts.Instance().itemCartridgeUse.name)));
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
    placePaxAeternaUpperDeckHallAmidships_Update(u, w, p, c) {
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
    todo(u, w, p, i, target) {
        u.messageEnqueue("todo");
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
