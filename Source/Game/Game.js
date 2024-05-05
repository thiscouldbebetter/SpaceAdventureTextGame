"use strict";
class Game {
    static worldBuild() {
        var player = new Agent("self", "This is you.", null, // scriptUpdateForTurnName
        [
            Item.fromNameAndDescription("washrag", "This is a rag you use to clean things sometimes.")
        ], null // commands
        );
        var scriptsCustom = new Scripts();
        var places = Places.Instance()._All;
        var commands = Command.Instances()._All;
        var scriptsAll = new Array();
        var commandsAsScripts = commands.map((x) => x._scriptExecute);
        scriptsAll.push(...commandsAsScripts);
        scriptsAll.push(...scriptsCustom._All);
        var placeInitialName = Places.Instance().paxAeternaJanitorsCloset_Name();
        var returnValue = new World("Space_Quest", places, player, commands, scriptsAll, null, // turnsSoFar,
        placeInitialName);
        return returnValue;
    }
}
class Items {
}
class Places {
    constructor() {
        this.scripts = Scripts.Instance();
        this.PaxAeternaBridge = this.paxAeternaBridge();
        this.PaxAeternaJanitorsCloset = this.paxAeternaJanitorsCloset();
        this.PaxAeternaDockingBayAntechamber = this.paxAeternaDockingBayAntechamber();
        this.PaxAeternaDockingBayHangar = this.paxAeternaDockingBayHangar();
        this.PaxAeternaEngineeringDeckAft = this.paxAeternaEngineeringDeckAft();
        this.PaxAeternaEngineeringDeckAmidships = this.paxAeternaEngineeringDeckAmidships();
        this.PaxAeternaEngineeringDeckForward = this.paxAeternaEngineeringDeckForward();
        this.PaxAeternaEscapePod = this.paxAeternaEscapePod();
        this.PaxAeternaLibrary = this.paxAeternaLibrary();
        this.PaxAeternaUpperDeckHallAft = this.paxAeternaUpperDeckHallAft();
        this.PaxAeternaUpperDeckHallAmidships = this.paxAeternaUpperDeckHallAmidships();
        this.PaxAeternaUpperDeckHallForward = this.paxAeternaUpperDeckHallForward();
        this.PaxAeternaLowerDeckHallAft = this.paxAeternaLowerDeckHallAft();
        this.PaxAeternaLowerDeckHallAmidships = this.paxAeternaLowerDeckHallAmidships();
        this.PaxAeternaLowerDeckHallForward = this.paxAeternaLowerDeckHallForward();
        this.DeepSpaceEscapePod = this.deepSpaceEscapePod();
        this.Ekkis2CavernsBarrier = this.ekkis2CavernsBarrier();
        this.Ekkis2CavernsDrips = this.ekkis2CavernsDrips();
        this.Ekkis2CavernsElevator = this.ekkis2CavernsElevator();
        this.Ekkis2CavernsGeyser = this.ekkis2CavernsGeyser();
        this.Ekkis2CavernsGrating = this.ekkis2CavernsGrating();
        this.Ekkis2CavernsPool = this.ekkis2CavernsPool();
        this.Ekkis2CavernsProjectionRoom = this.ekkis2CavernsProjectionRoom();
        this.Ekkis2CavernsSteamworks = this.ekkis2CavernsSteamworks();
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
        this.Ekkis2CliffsTopSouth = this.ekkis2CliffsTopSouth();
        this.Ekkis2CliffsTopSoutheast = this.ekkis2CliffsTopSoutheast();
        this.Ekkis2CliffsTopSouthwest = this.ekkis2CliffsTopSouthwest();
        this.Ekkis2DesertCrashSite = this.ekkis2DesertCrashSite();
        this.Ekkis2DesertDeep = this.ekkis2DesertDeep();
        this.Ekkis2DesertEscapePodInterior = this.ekkis2DesertEscapePodInterior();
        this.Ekkis2DesertNorth = this.ekkis2DesertNorth();
        this.Ekkis2DesertSouth = this.ekkis2DesertSouth();
        this.Ekkis2DesertWest = this.ekkis2DesertWest();
        this.Ekkis2FartingNoiseBarFront = this.ekkis2FartingNoiseBarFront();
        this.Ekkis2FartingNoiseBarInterior = this.ekkis2FartingNoiseBarInterior();
        this.Ekkis2FartingNoiseBarRear = this.ekkis2FartingNoiseBarRear();
        this.Ekkis2FartingNoiseDroidsBWeFront = this.ekkis2FartingNoiseDroidsBWeFront();
        this.Ekkis2FartingNoiseDroidsBWeInterior = this.ekkis2FartingNoiseDroidsBWeInterior();
        this.Ekkis2FartingNoiseDroidsBWeWest = this.ekkis2FartingNoiseDroidsBWeWest();
        this.Ekkis2FartingNoiseNorthOfTinysUsedShips = this.ekkis2FartingNoiseNorthOfTinysUsedShips();
        this.Ekkis2FartingNoiseTinysUsedShips = this.ekkis2FartingNoiseTinysUsedShips();
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
        this.VenipositorStarGeneratorChamber = this.venipositorStarGeneratorChamber();
        this.VenipositorStarGeneratorChamberCatwalk = this.venipositorStarGeneratorChamberCatwalk();
        this.VenipositorUpperDeckHallAft = this.venipositorUpperDeckHallAft();
        this.VenipositorUpperDeckHallAmidships = this.venipositorUpperDeckHallAmidships();
        this.VenipositorUpperDeckHallFore = this.venipositorUpperDeckHallFore();
        this.VenipositorVentilationShaft1 = this.venipositorVentilationShaft1();
        this.VenipositorVentilationShaft2 = this.venipositorVentilationShaft2();
        this.VenipositorVentilationShaft3 = this.venipositorVentilationShaft3();
        this.VenipositorVentilationShaft4 = this.venipositorVentilationShaft4();
        this._All =
            [
                this.PaxAeternaBridge,
                this.PaxAeternaDockingBayAntechamber,
                this.PaxAeternaDockingBayHangar,
                this.PaxAeternaEngineeringDeckAft,
                this.PaxAeternaEngineeringDeckAmidships,
                this.PaxAeternaEngineeringDeckForward,
                this.PaxAeternaEscapePod,
                this.PaxAeternaJanitorsCloset,
                this.PaxAeternaLibrary,
                this.PaxAeternaLowerDeckHallAft,
                this.PaxAeternaLowerDeckHallAmidships,
                this.PaxAeternaLowerDeckHallForward,
                this.PaxAeternaUpperDeckHallAft,
                this.PaxAeternaUpperDeckHallAmidships,
                this.PaxAeternaUpperDeckHallForward,
                this.DeepSpaceEscapePod,
                this.Ekkis2CavernsBarrier,
                this.Ekkis2CavernsDrips,
                this.Ekkis2CavernsElevator,
                this.Ekkis2CavernsGeyser,
                this.Ekkis2CavernsGrating,
                this.Ekkis2CavernsPool,
                this.Ekkis2CavernsProjectionRoom,
                this.Ekkis2CavernsSteamworks,
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
                this.Ekkis2CliffsTopSouth,
                this.Ekkis2CliffsTopSoutheast,
                this.Ekkis2CliffsTopSouthwest,
                this.Ekkis2DesertCrashSite,
                this.Ekkis2DesertDeep,
                this.Ekkis2DesertEscapePodInterior,
                this.Ekkis2DesertNorth,
                this.Ekkis2DesertSouth,
                this.Ekkis2DesertWest,
                this.Ekkis2FartingNoiseBarFront,
                this.Ekkis2FartingNoiseBarInterior,
                this.Ekkis2FartingNoiseBarRear,
                this.Ekkis2FartingNoiseDroidsBWeFront,
                this.Ekkis2FartingNoiseDroidsBWeInterior,
                this.Ekkis2FartingNoiseDroidsBWeWest,
                this.Ekkis2FartingNoiseNorthOfTinysUsedShips,
                this.Ekkis2FartingNoiseTinysUsedShips,
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
                this.VenipositorStarGeneratorChamber,
                this.VenipositorStarGeneratorChamberCatwalk,
                this.VenipositorUpperDeckHallAft,
                this.VenipositorUpperDeckHallAmidships,
                this.VenipositorUpperDeckHallFore,
                this.VenipositorVentilationShaft1,
                this.VenipositorVentilationShaft2,
                this.VenipositorVentilationShaft3,
                this.VenipositorVentilationShaft4
            ];
    }
    static Instance() {
        if (Places._instance == null) {
            Places._instance = new Places();
        }
        return Places._instance;
    }
    emplacement(name) {
        return Emplacement.fromNameAndDescription(name, name);
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
        return new Portal(name, null, placeDestinationName);
    }
    // Places.
    paxAeternaBridge() {
        return this.place2(this.paxAeternaBridge_Name(), "This is the command bridge of the starship PaxAeterna.  "
            + "A large transparent hemispherical dome arches overhead, "
            + "showing the brilliantly shining surrounding stars."
            + "Banks of mostly incomprehensible controls "
            + "line the circular wall, with the nearby seats "
            + "either empty or filled with the slumped bodies of dead crew."
            + "There's several bodies scattered on the floor, as well.  "
            + "A prominent pedestal in the center "
            + "formerly held the Star Generator, but now stands vacant.");
    }
    paxAeternaBridge_Name() {
        return "Pax Aeterna - Bridge";
    }
    paxAeternaDockingBayAntechamber() {
        return this.place3(this.paxAeternaDockingBayAntechamber_Name(), "This is the antechamber of the Pax Aeterna's docking bay.  "
            + "A large airlock door leads to the hangar.  "
            + "A control console occupies one wall, while "
            + "on the opposite wall are two closets, with a pair of "
            + " buttons at chest height between them. "
            + " An elevator leads back to the engineering deck.", [
            this.portal("airlock", this.paxAeternaDockingBayHangar_Name()),
            this.portal("elevator", this.paxAeternaEngineeringDeckAft_Name()),
            this.emplacement("controls"),
            this.emplacement("hatch")
        ]);
    }
    paxAeternaDockingBayAntechamber_Name() {
        return "Pax Aeterna - Docking Bay - Antechamber";
    }
    paxAeternaDockingBayHangar() {
        return this.place3(this.paxAeternaDockingBayHangar_Name(), "This is the Pax Aeterna's docking bay hangar.  "
            + "Though its floor is easily large enough to accomodate "
            + "a 20-passenger luxury yacht, it is currently empty "
            + "except for a relatively small hatch in the floor "
            + "and a control console near the airlock door leading back to the antechamber."
            + "A similarly gigantic pair of doors at the far end of the bay "
            + " allows ships to enter and depart when open, "
            + " and keeps everything safely sheltered when closed.", [
            this.portal("door", this.paxAeternaDockingBayAntechamber_Name()),
            this.emplacement("controls"),
            this.emplacement("hatch")
        ]);
    }
    paxAeternaDockingBayHangar_Name() {
        return "Pax Aeterna - Docking Bay - Hangar";
    }
    paxAeternaEngineeringDeckAft() {
        return this.place3(this.paxAeternaEngineeringDeckAft_Name(), "This is the aft end of the Pax Aeterna's engineering deck."
            + "A passage to fore leads back to the rest of the deck.  "
            + "In the aft wall is an elevator door, and next to that "
            + "is a small panel with a slot in it.", [
            this.portal("elevator", this.paxAeternaDockingBayAntechamber_Name()),
            this.portal("forward", this.paxAeternaEngineeringDeckAmidships_Name()),
            this.emplacement("slot")
        ]);
    }
    paxAeternaEngineeringDeckAft_Name() {
        return "Pax Aeterna - Engineering Deck - Aft";
    }
    paxAeternaEngineeringDeckAmidships() {
        return this.place3(this.paxAeternaEngineeringDeckAmidships_Name(), "This is the middle of the Pax Aeterna's engineering deck."
            + "To fore and aft are the other sections of the deck.  "
            + "Three large transparent domes on the floor cover the tops of "
            + "the ship's reactor tubes.  These domes are currently pulsing "
            + "an unsettling reddish-orange, accompanied by a loud "
            + "and ominous droning sound.  A thick window "
            + "looks down over the ship's docking bay, with a control console "
            + "running beneath that window.  The bodies of two crewmen lie on the floor.", [
            this.portal("aft", this.paxAeternaEngineeringDeckAft_Name()),
            this.portal("forward", this.paxAeternaEngineeringDeckForward_Name()),
            this.emplacement("controls"),
            this.emplacement("dome"),
            this.emplacement("window"),
            this.emplacement("body").commandAdd(new Command(["search body"], Scripts.Instance().EmplacementBodyEmptySearch.name))
        ]);
    }
    paxAeternaEngineeringDeckAmidships_Name() {
        return "Pax Aeterna - Engineering Deck - Aft";
    }
    paxAeternaEngineeringDeckForward() {
        return this.place3(this.paxAeternaEngineeringDeckForward_Name(), "This is the fore end of the Pax Aeterna's engineering deck."
            + "The rest of the deck lies to aft.  "
            + "At the fore end, an door opens on an elevator back to the other decks.", [
            this.portal("elevator", this.paxAeternaLowerDeckHallForward_Name()),
            this.portal("aft", this.paxAeternaEngineeringDeckAmidships_Name()),
            this.emplacement("slot")
        ]);
    }
    paxAeternaEngineeringDeckForward_Name() {
        return "Pax Aeterna - Engineering Deck - Forward";
    }
    paxAeternaEscapePod() {
        return this.place3(this.paxAeternaEscapePod_Name(), "This is the interior of one of the Pax Aeterna's escape pods."
            + "Through its front window, you can see the doors of hangar bay."
            + "Beneath the window is a console with various controls, "
            + "including a throttle, a monitor screen, and some buttons. "
            + "A padded seat with safety belts fills the center of the pod's cabin.  "
            + "A gull-wing door in the left wall of the pod allows entry and exit.  "
            + "Opposite the door, on the starboard wall, a survival kit is mounted.", [
            this.portal("door", this.paxAeternaDockingBayHangar_Name()),
            this.emplacement("autonav button"),
            this.emplacement("buttons"),
            this.emplacement("console"),
            this.emplacement("don't button"),
            this.emplacement("monitor screen"),
            this.emplacement("safety belt"),
            this.emplacement("survival kit"),
            this.emplacement("throttle")
        ]);
    }
    paxAeternaEscapePod_Name() {
        return "Pax Aeterna - Escape Pod";
    }
    paxAeternaJanitorsCloset() {
        return this.place4(this.paxAeternaJanitorsCloset_Name(), "This office/supply closet/quarters, "
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
            + "(You tried sleeping out there once, but someone got mad.)", this.scripts.PlacePaxAeternaJanitorsClosetUpdate.name, [
            this.portal("door", this.paxAeternaUpperDeckHallAmidships_Name()),
        ]);
    }
    paxAeternaJanitorsCloset_Name() {
        return "Pax Aeterna - Maintenance Specialist (Sanitation Grade)'s Office/Supply Closet/Quarters";
    }
    paxAeternaLibrary() {
        return this.place3(this.paxAeternaLibrary_Name(), "This is the Pax Aeterna's library.  "
            + "Doors in the fore and aft walls lead to hallways.  "
            + "The high walls are occupied almost completely with narrow shelves, "
            + "and the shelves are occupied almost completely "
            + "with row after row of data cartridges.  "
            + "A spacious round table ringed with comfortable seats and cartridge readers "
            + "fills a pit in the center of the room.  "
            + "On one wall is a control console with a keyboard and screen, "
            + "a spiderlike droid clinging to the wall just above it."
            + "A man wearing a scientist's smock lies face-down "
            + " on the floor in front of the console. ", [
            this.portal("forward", this.paxAeternaUpperDeckHallForward_Name()),
            this.portal("aft", this.paxAeternaUpperDeckHallAmidships_Name()),
            this.emplacement("console"),
            this.emplacement("table"),
            this.emplacement("man")
        ]);
    }
    paxAeternaLibrary_Name() {
        return "Pax Aeterna - Library";
    }
    paxAeternaLowerDeckHallAft() {
        return this.place3(this.paxAeternaLowerDeckHallAft_Name(), "This is a hallway in the starship Pax Aeterna.  "
            + "The hall continues to forward.  "
            + "There is a door here leading to an elevator.", [
            this.portal("aft", this.paxAeternaLowerDeckHallAmidships_Name()),
            this.emplacement("body").commandAdd(new Command(["search body"], Scripts.Instance().EmplacementBodyEmptySearch.name))
        ]);
    }
    paxAeternaLowerDeckHallAft_Name() {
        return "Pax Aeterna - Lower Deck - Hall - Aft";
    }
    paxAeternaLowerDeckHallAmidships() {
        return this.place3(this.paxAeternaLowerDeckHallAmidships_Name(), "This is a hallway in the starship Pax Aeterna.  "
            + "The hall continues to forward and to aft.  "
            + "In the middle is a door leading to the "
            + "office/supply closet/quarters "
            + "of the Maintenance Specialist (Sanitation Grade)"
            + "which is where you, our hero, came in to this story.", [
            this.portal("closet", this.paxAeternaJanitorsCloset_Name()),
            this.portal("forward", this.paxAeternaLowerDeckHallForward_Name()),
            this.portal("aft", this.paxAeternaLowerDeckHallAft_Name())
        ]
        // Scripts.Instance().PlacePaxAeternaLowerDeckHallAmidshipsUpdate.name
        );
    }
    paxAeternaLowerDeckHallAmidships_Name() {
        return "Pax Aeterna - Lower Deck - Hall - Amidships";
    }
    paxAeternaLowerDeckHallForward() {
        return this.place3(this.paxAeternaLowerDeckHallAft_Name(), "This is a hallway in the starship Pax Aeterna.  "
            + "The hall ends in a door to aft.  "
            + "The body of a dead crewman lies crumpled "
            + "against the bulkhead at the forward end of the hall.", [
            this.portal("aft", this.paxAeternaLibrary_Name()),
            this.emplacement("body").commandAdd(new Command(["search body"], Scripts.Instance().EmplacementBodyEmptySearch.name))
        ]);
    }
    paxAeternaLowerDeckHallForward_Name() {
        return "Pax Aeterna - Lower Deck - Hall - Forward";
    }
    paxAeternaUpperDeckHallAft() {
        return this.place3(this.paxAeternaUpperDeckHallAft_Name(), "This is a hallway in the starship Pax Aeterna.  "
            + "The hall continues to forward.  "
            + "There is a door here leading to an elevator.", [
            this.portal("aft", this.paxAeternaUpperDeckHallAmidships_Name()),
            this.emplacement("body").commandAdd(new Command(["search body"], Scripts.Instance().EmplacementBodyEmptySearch.name))
        ]);
    }
    paxAeternaUpperDeckHallAft_Name() {
        return "Pax Aeterna - Upper Deck - Hall - Aft";
    }
    paxAeternaUpperDeckHallAmidships() {
        return this.place4(this.paxAeternaUpperDeckHallAmidships_Name(), "This is a hallway in the starship Pax Aeterna.  "
            + "The hall ends in a door to forward, and continues to aft.  "
            + "In the middle is a door leading to the office/supply closet/quarters "
            + "of the Maintenance Specialist (Sanitation Grade), "
            + "which is where you, our hero, came in to this story.", this.scripts.PlacePaxAeternaUpperDeckHallAmidshipsUpdate.name, [
            this.portal("closet", this.paxAeternaJanitorsCloset_Name()),
            this.portal("forward", this.paxAeternaLibrary_Name()),
            this.portal("aft", this.paxAeternaUpperDeckHallAft_Name())
        ]);
    }
    paxAeternaUpperDeckHallAmidships_Name() {
        return "Pax Aeterna - Upper Deck - Hall - Amidships";
    }
    paxAeternaUpperDeckHallForward() {
        return this.place3(this.paxAeternaUpperDeckHallForward_Name(), "This is a hallway in the starship Pax Aeterna.  "
            + "The hall continues to aft.  "
            + "The body of a dead crewman lies crumpled "
            + "against the bulkhead at the forward end of the hall.", [
            this.portal("aft", this.paxAeternaUpperDeckHallAmidships_Name()),
            this.emplacement("body").commandAdd(new Command(["search body"], Scripts.Instance().EmplacementBodyKeycardSearch.name))
        ]);
    }
    paxAeternaUpperDeckHallForward_Name() {
        return "Pax Aeterna - Upper Deck - Hall - Forward";
    }
    deepSpaceEscapePod() {
        return this.place3(this.deepSpaceEscapePod_Name(), "This is the interior of one of the Pax Aeterna's escape pods."
            + "Through its front window, you can see deep space.  "
            + "Beneath the window is a console with various controls, "
            + "including a throttle, a monitor screen, and some buttons. "
            + "A padded seat with safety belts fills the center of the pod's cabin.  "
            + "A gull-wing door in the left wall of the pod allows entry and exit.  "
            + "Opposite the door, on the starboard wall, a survival kit is mounted.", [
            this.portal("door", this.paxAeternaDockingBayHangar_Name()),
            this.emplacement("autonav button"),
            this.emplacement("buttons"),
            this.emplacement("console"),
            this.emplacement("don't button"),
            this.emplacement("monitor screen"),
            this.emplacement("safety belt"),
            this.emplacement("survival kit"),
            this.emplacement("throttle")
        ]);
    }
    deepSpaceEscapePod_Name() {
        return "Deep Space - Escape Pod";
    }
    ekkis2CavernsBarrier() {
        return this.place3(this.ekkis2CavernsBarrier_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis2.  "
            + "The path to the west is blocked by several closely spaced "
            + "and intensely bright beams of light,"
            + "which are emitted from small round ports the rock walls, "
            + "and which pass into similar ports on the other side.  "
            + "A passage leads back to the east.", [
            this.portal("east", this.ekkis2CavernsPool_Name()),
            this.portal("west", this.ekkis2CavernsGeyser_Name())
        ]);
    }
    ekkis2CavernsBarrier_Name() { return "Ekkis II - Caverns - Barrier"; }
    ekkis2CavernsDrips() {
        return this.place3(this.ekkis2CavernsDrips_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis2.  "
            + "The passage runs to the east, where drips of a clear liquid "
            + "fall intermittently from the ceiling.  "
            + "Each drip passes into a small, precise hole in the floor "
            + "that appears as if it were made to fit it."
            + "A passage leads back to the west.", [
            this.portal("east", this.ekkis2CavernsProjectionRoom_Name()),
            this.portal("west", this.ekkis2CavernsBarrier_Name())
        ]);
    }
    ekkis2CavernsDrips_Name() { return "Ekkis II - Caverns - Drips"; }
    ekkis2CavernsElevator() {
        return this.place3(this.ekkis2CavernsElevator_Name(), "You stand at the bottom of the elevator that brought you down "
            + "from the cliffs of Ekkis2 to a cool, dark, rocky cavern.  "
            + "The elevator door lies at the east side of the passage.  "
            + "From there, the passage runs to the west.", [
            this.portal("west", this.ekkis2CavernsGrating_Name())
        ]);
    }
    ekkis2CavernsElevator_Name() { return "Ekkis II - Caverns - Elevator"; }
    ekkis2CavernsGeyser() {
        return this.place3(this.ekkis2CavernsGeyser_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis2.  "
            + "The passage to the west ends abruptly in a solid rock wall."
            + "Nearby, a small geyser shoots wetly and steamily out of a hole "
            + " in the top of a stalagmite."
            + "Another passage leads back east.", [
            this.portal("west", this.ekkis2CavernsPool_Name()),
            this.portal("east", this.ekkis2CavernsGrating_Name())
        ]);
    }
    ekkis2CavernsGeyser_Name() { return "Ekkis II - Caverns - Geyser"; }
    ekkis2CavernsGrating() {
        return this.place3(this.ekkis2CavernsGrating_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis2, "
            + "in a passage running from east to west."
            + "In the floor leading to the west, a thick metal grating "
            + "perforated with holes about 10 centimeters wide "
            + "stretches from wall to wall across the entire passage. ", [
            this.portal("west", this.ekkis2CavernsGeyser_Name()),
            this.portal("east", this.ekkis2CavernsElevator_Name())
        ]);
    }
    ekkis2CavernsGrating_Name() { return "Ekkis II - Caverns - Grating"; }
    ekkis2CavernsPool() {
        return this.place3(this.ekkis2CavernsPool_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis2. "
            + "You stand on a wide ledge that runs south, back through a hidden doorway, "
            + " where a plugged geyser steams fitfully.  To the west, the ledge runs "
            + "through dark natural stone columns and on into the darkness.  "
            + "Far below the ledge is a pool of clear liquid, "
            + "with drips falling from holes in the ceiling to fill it.  "
            + "A passage leads back to the east.", [
            this.portal("west", this.ekkis2CavernsBarrier_Name()),
            this.portal("east", this.ekkis2CavernsGeyser_Name())
        ]);
    }
    ekkis2CavernsPool_Name() { return "Ekkis II - Caverns - Pool"; }
    ekkis2CavernsProjectionRoom() {
        return this.place3(this.ekkis2CavernsProjectionRoom_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis2. "
            + "This space is completely dark at the moment.  Earlier, it was lit only "
            + "by a holographic projection of a triangular-headed alien.  "
            + "A passage leads back to the east.", [
            this.portal("east", this.ekkis2CavernsBarrier_Name()),
            this.portal("west", this.ekkis2CavernsSteamworks_Name())
        ]);
    }
    ekkis2CavernsProjectionRoom_Name() { return "Ekkis II - Caverns - Projection Room"; }
    ekkis2CavernsSteamworks() {
        return this.place3(this.ekkis2CavernsSteamworks_Name(), "You are in a cavern deep beneath the desert of the planet Ekkis2. "
            + "Arrays of giant metal pistons pump noisily away, leaking wisps of steam. "
            + "A computer console with a monitor and standard data cartridge slot "
            + "stands against the north wall.  Above it is a catwalk where members "
            + "of a gray-skinned, large-eyed, triangular-headed alien species "
            + "busily operate various inscrutable control systems."
            + "To the west is a small, garage-like space, with a door at the end "
            + "that appears to open onto a large elevator platform.", [
            this.portal("east", this.ekkis2CavernsProjectionRoom_Name()),
        ]);
    }
    ekkis2CavernsSteamworks_Name() { return "Ekkis II - Caverns - Steamworks"; }
    ekkis2CliffsBottomNorth() {
        return this.place3(this.ekkis2CliffsBottomNorth_Name(), "You stand on the sand of the Ekkis2 desert, just to the south  "
            + "of a steep stone cliff running from west to east. ", [
            this.portal("south", this.ekkis2CliffsBottomSouth_Name()),
            this.portal("west", this.ekkis2CliffsBottomNorthwestEastSide_Name()),
            this.portal("east", this.ekkis2CliffsBottomNortheast_Name())
        ]);
    }
    ekkis2CliffsBottomNorth_Name() { return "Ekkis II - Cliffs - North"; }
    ;
    ekkis2CliffsBottomNortheast() {
        return this.place3(this.ekkis2CliffsBottomNortheast_Name(), "You stand on the sand of the Ekkis2 desert, just to the south  "
            + "of a steep stone cliff running from the west "
            + "and ending just to the east.  "
            + "Above, on the clifftop, two large stone pillars stand about four meters "
            + "apart from each other.  As they rise, they bend toward each other like horns, "
            + "with jagged, broken tops.  "
            + "\n\n"
            + "To the east, the sand stretches away as far as you can see.", [
            this.portal("south", this.ekkis2CliffsBottomSouth_Name()),
            this.portal("west", this.ekkis2CliffsBottomNorthwestEastSide_Name()),
            this.portal("east", this.ekkis2DesertDeep_Name())
        ]);
    }
    ekkis2CliffsBottomNortheast_Name() { return "Ekkis II - Cliffs - Northeast"; }
    ;
    ekkis2CliffsBottomNorthwestEastSide() {
        return this.place3(this.ekkis2CliffsBottomNorthwestEastSide_Name(), "You stand on the sand of the Ekkis2 desert, at the base  "
            + "of a sheer stone cliff that curves away to the south and east.  ", [
            this.portal("south", this.ekkis2CliffsBottomNorth_Name()),
            this.portal("east", this.ekkis2CliffsBottomSouthwest_Name())
        ]);
    }
    ekkis2CliffsBottomNorthwestEastSide_Name() { return "Ekkis II - Cliffs - Northwest - East Side"; }
    ;
    ekkis2CliffsBottomNorthwestWestSide() {
        return this.place3(this.ekkis2CliffsBottomNorthwestWestSide_Name(), "You stand on the sand of the Ekkis2 desert, at the base  "
            + "of a sheer stone cliff that curves away to the south and east,  "
            + "and which blocks passage to the east.  "
            + "The site where your escape pod crashed is to the west."
            + "To the south, more cliffs are visible. "
            + " The desert stretches away to the north, and west.", [
            this.portal("south", this.ekkis2CliffsBottomSouth_Name()),
            this.portal("west", this.ekkis2DesertCrashSite_Name()),
            this.emplacement("hole"
            // "This is a hole in the side of the cliff face, "
            // + "about 40 centimeters in diameter.  Its interior is "
            // + "deeply shadowed, making it impossible to see what, "
            // + "if anything, might be inside it."
            )
        ]);
    }
    ekkis2CliffsBottomNorthwestWestSide_Name() {
        return "Ekkis II - Cliffs - Northwest - West Side";
    }
    ;
    ekkis2CliffsBottomSouth() {
        return this.place3(this.ekkis2CliffsBottomSouth_Name(), "todo", [
            this.portal("east", this.ekkis2CliffsBottomSoutheast_Name()),
            this.portal("north", this.ekkis2CliffsBottomNorth_Name()),
            this.portal("west", this.ekkis2CliffsBottomSouthwest_Name()),
        ]);
    }
    ekkis2CliffsBottomSouth_Name() { return "Ekkis II - Cliffs - South"; }
    ;
    ekkis2CliffsBottomSoutheast() {
        return this.place3(this.ekkis2CliffsBottomSoutheast_Name(), "You stand on a clear stretch of sand amid a formation of stone cliffs.  "
            + "The sandy surface of the desert runs to the north and to the west. "
            + "To the east is a tall, confused jumble of rocks, "
            + " in which a large, shadowy cave mouth opens."
            + "On the west side of the clearing, a stone slope rises jaggedly "
            + "upward between jutting upright stones, climbing as it runs northward.", [
            this.portal("north", this.ekkis2CliffsBottomSouth_Name()),
            this.portal("west", this.ekkis2CliffsBottomSouth_Name()),
            this.portal("east", this.ekkis2CliffsCaveInterior_Name()),
            this.portal("slope", this.ekkis2CliffsTopNortheast_Name())
        ]);
    }
    ekkis2CliffsBottomSoutheast_Name() { return "Ekkis II - Cliffs - Southeast"; }
    ;
    ekkis2CliffsBottomSouthwest() {
        return this.place3(this.ekkis2CliffsBottomSouthwest_Name(), "todo", [
            this.portal("east", this.ekkis2CliffsBottomSouth_Name()),
            this.portal("north", this.ekkis2CliffsBottomNorthwestEastSide_Name())
        ]);
    }
    ekkis2CliffsBottomSouthwest_Name() { return "Ekkis II - Cliffs - Southwest"; }
    ;
    ekkis2CliffsCaveInterior() {
        return this.place3(this.ekkis2CliffsCaveInterior_Name(), "This is a cool, dark cave.  Mossy vegetation clings to the rocks.  "
            + "To the west the cave opens out into the blazing daylight "
            + "of the Ekkis2 desert.", [
            this.portal("west", this.ekkis2CliffsBottomSoutheast_Name()),
        ]);
    }
    ekkis2CliffsCaveInterior_Name() { return "Ekkis II - Cliffs - Cave - Interior"; }
    ekkis2CliffsTopNorth() {
        return this.place3(this.ekkis2CliffsTopNorth_Name(), "You stand atop a cliff rising from the desert of the planet Ekkis2.", [
            this.portal("east", this.ekkis2CliffsBottomNortheast_Name()),
            this.portal("south", this.ekkis2CliffsBottomSouth_Name()),
            this.portal("west", this.ekkis2CliffsBottomNorthwestWestSide_Name())
        ]);
    }
    ekkis2CliffsTopNorth_Name() { return "Ekkis II - Cliffs - Top - North"; }
    ekkis2CliffsTopNortheast() {
        return this.place3(this.ekkis2CliffsTopNortheast_Name(), "You stand atop a cliff rising from the desert of the planet Ekkis2.  "
            + "A pair of bent stone columns rises, bending toward each other like horns.", [
            this.portal("south", this.ekkis2CliffsBottomSoutheast_Name()),
            this.portal("west", this.ekkis2CliffsBottomNorth_Name())
        ]);
    }
    ekkis2CliffsTopNortheast_Name() { return "Ekkis II - Cliffs - Top - Northeast"; }
    ekkis2CliffsTopNorthwest() {
        return this.place3(this.ekkis2CliffsTopNorthwest_Name(), "You stand atop a cliff rising from the desert of the planet Ekkis2.", [
            this.portal("east", this.ekkis2CliffsBottomNorth_Name()),
            this.portal("south", this.ekkis2CliffsBottomSouthwest_Name())
        ]);
    }
    ekkis2CliffsTopNorthwest_Name() { return "Ekkis II - Cliffs - Top - Northwest"; }
    ekkis2CliffsTopSouth() {
        return this.place3(this.ekkis2CliffsTopSouth_Name(), "You stand atop a cliff rising from the desert of the planet Ekkis2.", [
            this.portal("east", this.ekkis2CliffsBottomSoutheast_Name()),
            this.portal("north", this.ekkis2CliffsBottomNorth_Name()),
            this.portal("west", this.ekkis2CliffsBottomSouthwest_Name())
        ]);
    }
    ekkis2CliffsTopSouth_Name() { return "Ekkis II - Cliffs - Top - South"; }
    ekkis2CliffsTopSoutheast() {
        return this.place3(this.ekkis2CliffsTopSoutheast_Name(), "You stand atop a cliff rising from the desert of the planet Ekkis2.", [
            this.portal("north", this.ekkis2CliffsBottomNortheast_Name()),
            this.portal("west", this.ekkis2CliffsBottomSouth_Name())
        ]);
    }
    ekkis2CliffsTopSoutheast_Name() { return "Ekkis II - Cliffs - Top - Southeast"; }
    ekkis2CliffsTopSouthwest() {
        return this.place3(this.ekkis2CliffsTopSouthwest_Name(), "You stand atop a cliff rising from the desert of the planet Ekkis2", [
        // todo
        ]);
    }
    ekkis2CliffsTopSouthwest_Name() { return "Ekkis II - Cliffs - Top - Southwest"; }
    ekkis2DesertCrashSite() {
        return this.place3(this.ekkis2DesertCrashSite_Name(), "Your escape pod has crashed in the middle of the desert "
            + "of the planet Ekkis2, rendering it completely inoperable.  "
            + "Its structural frame is severely bent, and the door unclosable.  "
            + "The forward window has shattered, "
            + "scattering shards of highly reflective glass over the sand "
            + "in front of the pod."
            + "\n\n"
            + "The desert stretches away as far as the eye can see to the "
            + "north, west, and south.  A maze of rocky cliffs rises to the east.", []);
    }
    ekkis2DesertCrashSite_Name() { return "Ekkis II - Desert - Crash Site"; }
    ekkis2DesertDeep() {
        return this.place3(this.ekkis2DesertDeep_Name(), "You stand in the trackless desert of the planet Ekkis2, "
            + "The featureless sand stretches away in every direction.", []
        // Scripts.placeEkkis2DesertDeepUpdate.name
        );
    }
    ekkis2DesertDeep_Name() { return "Ekkis II - Desert - Deep Desert"; }
    ekkis2DesertEscapePodInterior() {
        return this.place3(this.ekkis2DesertEscapePodInterior_Name(), "You sit inside your escape pod where it has crashed on the surface "
            + "of the desert planet Ekkis2.  The pod's controls are dark and silent. "
            + "The forward window was shattered in the crash.  "
            + "Through the web of cracks and gaps, the yellow "
            + "sand of the desert stretches away before you, seemingly forever.  "
            + "The door of the pod is open, and, due to structural damage "
            + "incurred during the crash, cannot be closed.  The hot, dry "
            + "desert air floods the pod, causing you to sweat profusely.", [
            this.portal("door", this.ekkis2DesertCrashSite_Name())
        ]);
    }
    ekkis2DesertEscapePodInterior_Name() { return "Ekkis II - Desert - Escape Pod Interior"; }
    ekkis2DesertNorth() {
        return this.place3(this.ekkis2DesertNorth_Name(), "You stand in the trackless desert of the planet Ekkis2, "
            + "just north of the wreck of your crashed escape pod.  "
            + "The featureless sand stretches away in every other direction.", [
            this.portal("south", this.ekkis2DesertCrashSite_Name()),
            this.portal("north", this.ekkis2DesertDeep_Name()),
            this.portal("east", this.ekkis2DesertDeep_Name()),
            this.portal("west", this.ekkis2DesertDeep_Name()),
        ]);
    }
    ekkis2DesertNorth_Name() { return "Ekkis II - Desert - North of Crash Site"; }
    ekkis2DesertSouth() {
        return this.place3(this.ekkis2DesertSouth_Name(), "You stand in the trackless desert of the planet Ekkis2, "
            + "just south of the wreck of your crashed escape pod.  "
            + "The featureless sand stretches away in every other direction.", [
            this.portal("north", this.ekkis2DesertCrashSite_Name()),
            this.portal("south", this.ekkis2DesertDeep_Name()),
            this.portal("east", this.ekkis2DesertDeep_Name()),
            this.portal("west", this.ekkis2DesertDeep_Name()),
        ]);
    }
    ekkis2DesertSouth_Name() { return "Ekkis II - Desert - South of Crash Site"; }
    ekkis2DesertWest() {
        return this.place3(this.ekkis2DesertWest_Name(), "You stand in the trackless desert of the planet Ekkis2, "
            + "just west of the wreck of your crashed escape pod.  "
            + "The featureless sand stretches away in every other direction.", [
            this.portal("east", this.ekkis2DesertCrashSite_Name()),
            this.portal("north", this.ekkis2DesertDeep_Name()),
            this.portal("south", this.ekkis2DesertDeep_Name()),
            this.portal("west", this.ekkis2DesertDeep_Name()),
        ]);
    }
    ekkis2DesertWest_Name() { return "Ekkis II - Desert - West of Crash Site"; }
    ekkis2FartingNoiseBarFront() {
        return this.place3(this.ekkis2FartingNoiseBarFront_Name(), "You stand in the tiny settlement named, "
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
            this.portal("north", this.ekkis2FartingNoiseDroidsBWeWest_Name()),
            this.portal("west", this.ekkis2FartingNoiseTinysUsedShips_Name()),
            this.portal("east", this.ekkis2FartingNoiseBarRear_Name()),
            this.portal("south", this.ekkis2DesertDeep_Name())
        ]);
    }
    ekkis2FartingNoiseBarFront_Name() { return "Ekkis II - [Farting Noise] - Bar - Front"; }
    ekkis2FartingNoiseBarInterior() {
        return this.place3(this.ekkis2FartingNoiseBarInterior_Name(), "You stand inside the [Farting Noise] bar.  "
            + "On a small stage, a band of garishly dressed bipeds loudly plays "
            + "what you can only assume is a song, "
            + "and that you can only assume to be one of their hits.  "
            + "A bar runs along the opposite wall, where a harried bartender "
            + "delivers drinks to patrons seated on stools, "
            + "some of whom are engaged in conversation, or at least reciprocal bluster.  "
            + "A cabinet housing some sort of video gambling machine stands in the back.  "
            + "A squat cleaning robot busily sweeps the floor around the machine, "
            + "and periodically empties a load of its sweepings into a hatch in the back wall.", [
            this.portal("north", this.ekkis2FartingNoiseDroidsBWeWest_Name()),
            this.portal("west", this.ekkis2FartingNoiseTinysUsedShips_Name()),
            this.portal("east", this.ekkis2FartingNoiseBarRear_Name()),
            this.portal("south", this.ekkis2DesertDeep_Name()),
            this.emplacement("band"),
            this.emplacement("bar"),
            this.emplacement("heap"),
            this.emplacement("machine"),
            this.emplacement("bartender"),
            this.emplacement("patrons")
        ]);
    }
    ekkis2FartingNoiseBarInterior_Name() { return "Ekkis II - [Farting Noise] - Bar - Interior"; }
    ekkis2FartingNoiseBarRear() {
        return this.place3(this.ekkis2FartingNoiseBarRear_Name(), "You stand behind the [Farting Noise] bar.  "
            + "It is somewhat secluded here."
            + "Force-fields block access to the surrounding desert to the east and south.  "
            + "You can see another, larger building to the north.  "
            + "At irregular intervals, a hatch in the back wall of the bar opens "
            + "and expels some fine white powder, "
            + "which settles onto a larger heap of powder below.", [
            this.portal("north", this.ekkis2FartingNoiseDroidsBWeWest_Name()),
            this.portal("west", this.ekkis2FartingNoiseTinysUsedShips_Name()),
            this.portal("east", this.ekkis2FartingNoiseBarRear_Name()),
            this.emplacement("heap")
        ]);
    }
    ekkis2FartingNoiseBarRear_Name() { return "Ekkis II - [Farting Noise] - Bar - Rear"; }
    ekkis2FartingNoiseDroidsBWeFront() {
        return this.place3(this.ekkis2FartingNoiseDroidsBWeFront_Name(), "You stand in the desert settlement of [Farting Noise], "
            + "to the south of the entrance of a domed building "
            + "bearing the sign 'Droids-B-We'.", [
        // todo
        ]);
    }
    ekkis2FartingNoiseDroidsBWeFront_Name() { return "Ekkis II - Droids-B-We - Front"; }
    ekkis2FartingNoiseDroidsBWeInterior() {
        return this.place3(this.ekkis2FartingNoiseDroidsBWeInterior_Name(), "You stand inside the [Farting Noise] branch of 'Droids-B-We'. "
            + "Various inactive robots are displayed on pedestals, "
            + "each bearing a more-or-less conspicious price tag.  "
            + "A salesbeing watches you idly, perhaps waiting to see if you require assistance.  "
            + "In the south wall is the door leading back outside.", [
        // todo
        ]);
    }
    ekkis2FartingNoiseDroidsBWeInterior_Name() { return "Ekkis II - Droids-B-We - Interior"; }
    ekkis2FartingNoiseDroidsBWeWest() {
        return this.place3(this.ekkis2FartingNoiseDroidsBWeWest_Name(), "You stand in the desert settlement of [Farting Noise], "
            + "to the west of a large domed building.  "
            + "A smaller domed building housing a bar lies to the south. "
            + "Further to the west you see a spaceship standing "
            + "at the northern edge of a brightly decorated lot containing several more ships."
            + "A force field blocks access to the open desert to the north. ", [
        // todo
        ]);
    }
    ekkis2FartingNoiseDroidsBWeWest_Name() { return "Ekkis II - Droids-B-We - West"; }
    ekkis2FartingNoiseNorthOfTinysUsedShips() {
        return this.place3(this.ekkis2FartingNoiseNorthOfTinysUsedShips_Name(), "You stand in the desert settlement of [Farting Noise].  "
            + "You see a spaceship standing here, and, to the south,"
            + "a brightly decorated lot containing several more ships."
            + " To the east, you see a large domed building. "
            + "A smaller domed building with a sign that says 'Bar' lies to the southeast. "
            + "A force field blocks access to the open desert to the north and west.", [
        // todo
        ]);
    }
    ekkis2FartingNoiseNorthOfTinysUsedShips_Name() {
        return "Ekkis II - [Farting Noise] - North of Tiny's Used Ships";
    }
    ekkis2FartingNoiseTinysUsedShips() {
        return this.place3(this.ekkis2FartingNoiseNorthOfTinysUsedShips_Name(), "You stand in the desert settlement of [Farting Noise], "
            + "in a sandy lot brighly decorated with colorful pennants "
            + " strung along lines, and containing several ships in various states of wear."
            + "Just to the north you see another ship standing by itself."
            + "At one edge of the lot is a small cubical building "
            + "bearing a sign that says, 'Tiny's Used Ships'."
            + "A domed building with a sign that says 'Bar' stands to the east. "
            + "A larger domed building stands to the northeast. "
            + "A force field blocks access to the open desert to the south and west. ", [
        // todo
        ]);
    }
    ekkis2FartingNoiseTinysUsedShips_Name() {
        return "Ekkis II - [Farting Noise] - Tiny's Used Ships";
    }
    venipositorAirlockAntechamber() {
        return this.place3(this.venipositorAirlockAntechamber_Name(), "This is the antechamber of an airlock on the Venipositor.", [
        // todo
        ]);
    }
    venipositorAirlockAntechamber_Name() { return "Venipositor - Airlock - Antechamber"; }
    venipositorAirlockChamber() {
        return this.place3(this.venipositorAirlockChamber_Name(), "This is the interior of one of the Venipositor's airlocks."
            + "Doors at either end lead into and out of the Venipositor", [
            this.portal("in", this.venipositorAirlockAntechamber_Name()),
            this.portal("out", this.venipositorAirlockExterior_Name())
        ]);
    }
    venipositorAirlockChamber_Name() { return "Venipositor - Airlock - Chamber"; }
    venipositorAirlockExterior() {
        return this.place3(this.venipositorAirlockExterior_Name(), "This is the exterior of the Venipositor, near an airlock door.  "
            + "The boundless sweep of space spreads out in all directions.", [
            this.portal("door", this.venipositorAirlockChamber_Name()),
        ]);
    }
    venipositorAirlockExterior_Name() { return "Venipositor - Exterior - Airlock Door"; }
    venipositorArmory() {
        return this.place3(this.venipositorArmory_Name(), "This is the armory of the Venipositor."
            + "At the aft end high counter, with a robot standing watch behind it, "
            + "blocks the path to the weapon racks.  A door to forward leads back "
            + "out onto the catwalk above the Star Generator chamber.", [
            this.portal("forward", this.venipositorStarGeneratorChamberCatwalk_Name())
        ]);
    }
    venipositorArmory_Name() { return "Venipositor - Armory"; }
    venipositorLaundry() {
        return this.place3(this.venipositorLaundry_Name(), "This is a laundry room on the Venipositor.", [
        // todo
        ]);
    }
    venipositorLaundry_Name() { return "Venipositor - Laundry"; }
    venipositorLowerDeckHallAft() {
        return this.place3(this.venipositorLowerDeckHallAft_Name(), "This is the aft end of a hallway on the lower deck of the Venipositor.", [
            this.portal("forward", this.venipositorLowerDeckHallAmidships_Name())
        ]);
    }
    venipositorLowerDeckHallAft_Name() { return "Venipositor - Hall - Lower Deck - Aft"; }
    venipositorLowerDeckHallAmidships() {
        return this.place3(this.venipositorLowerDeckHallAmidships_Name(), "This is the amidships section of a hallway on the lower deck of the Venipositor.", [
            this.portal("aft", this.venipositorLowerDeckHallAft_Name()),
            this.portal("forward", this.venipositorLowerDeckHallFore_Name())
        ]);
    }
    venipositorLowerDeckHallAmidships_Name() { return "Venipositor - Hall - Lower Deck - Amidships"; }
    venipositorLowerDeckHallFore() {
        return this.place3(this.venipositorLowerDeckHallFore_Name(), "This is the forward end of a hallway on the lower deck of the Venipositor.", [
            this.portal("aft", this.venipositorLowerDeckHallAmidships_Name()),
        ]);
    }
    venipositorLowerDeckHallFore_Name() { return "Venipositor - Hall - Lower Deck - Forward"; }
    venipositorNearbySpace() {
        return this.place3(this.venipositorNearbySpace_Name(), "You are in your ship, hovering nearby the Venipositor.", [
            this.portal("out", this.venipositorAirlockExterior_Name()),
        ]);
    }
    venipositorNearbySpace_Name() { return "Venipositor - Nearby Space"; }
    venipositorShuttleBay() {
        return this.place3(this.venipositorShuttleBay_Name(), "This is the shuttle bay of the Venipositor.", [
        // todo
        ]);
    }
    venipositorShuttleBay_Name() { return "Venipositor - Shuttle Bay"; }
    venipositorStarGeneratorChamber() {
        return this.place3(this.venipositorStarGeneratorChamber_Name(), "This is a cavernous room on the Venipositor.  "
            + "The Star Generator is mounted on a pedestal, "
            + "with an armed guard standing nearby.  "
            + "A catwalk runs overhead.", [
        // todo
        ]);
    }
    venipositorStarGeneratorChamber_Name() { return "Venipositor - Star Generator Chamber"; }
    venipositorStarGeneratorChamberCatwalk() {
        return this.place3(this.venipositorStarGeneratorChamberCatwalk_Name(), "You are standing on a railed catwalk above a "
            + " cavernous chamber on the Venipositor.  "
            + "On the floor, far below, the Star Generator"
            + "is mounted on a pedestal, "
            + "with an armed guard standing nearby.  "
            + "The catwalk runs fore and aft.", [
            this.portal("aft", this.venipositorArmory_Name()),
            this.portal("forward", "todo"),
        ]);
    }
    venipositorStarGeneratorChamberCatwalk_Name() { return "Venipositor - Star Generator Chamber - Catwalk"; }
    venipositorUpperDeckHallAft() {
        return this.place3(this.venipositorUpperDeckHallAft_Name(), "This is the aft end of a hallway on the upper deck of the Venipositor.", [
            this.portal("forward", this.venipositorUpperDeckHallAmidships_Name()),
        ]);
    }
    venipositorUpperDeckHallAft_Name() { return "Venipositor - Hall - Upper Deck - Aft"; }
    venipositorUpperDeckHallAmidships() {
        return this.place3(this.venipositorUpperDeckHallAmidships_Name(), "This is the amidships section of a hallway "
            + "on the upper deck of the Venipositor.", [
            this.portal("aft", this.venipositorUpperDeckHallAft_Name()),
            this.portal("forward", this.venipositorUpperDeckHallFore_Name()),
        ]);
    }
    venipositorUpperDeckHallAmidships_Name() { return "Venipositor - Hall - Upper Deck - Amidships"; }
    venipositorUpperDeckHallFore() {
        return this.place3(this.venipositorUpperDeckHallFore_Name(), "This is the forward end of a hallway on the upper deck of the Venipositor.", [
            this.portal("aft", this.venipositorUpperDeckHallAmidships_Name()),
        ]);
    }
    venipositorUpperDeckHallFore_Name() { return "Venipositor - Hall - Upper Deck - Forward"; }
    venipositorVentilationShaft1() {
        return this.place3(this.venipositorVentilationShaft1_Name(), "This is a ventilation shaft on the Venipositor.  "
            + "A short side branch leads to a vent cover.", [
            this.portal("back", this.venipositorVentilationShaft4_Name()),
            this.portal("forward", this.venipositorVentilationShaft1_Name()),
            this.portal("vent", this.venipositorAirlockAntechamber_Name())
        ]);
    }
    venipositorVentilationShaft1_Name() { return "Venipositor - Ventilation Shaft - 1"; }
    venipositorVentilationShaft2() {
        return this.place3(this.venipositorVentilationShaft2_Name(), "This is a ventilation shaft on the Venipositor.  "
            + "A short side branch leads to a vent cover.", [
            this.portal("back", this.venipositorVentilationShaft1_Name()),
            this.portal("forward", this.venipositorVentilationShaft3_Name()),
            this.portal("vent", this.venipositorLaundry_Name())
        ]);
    }
    venipositorVentilationShaft2_Name() { return "Venipositor - Ventilation Shaft - 2"; }
    venipositorVentilationShaft3() {
        return this.place3(this.venipositorVentilationShaft3_Name(), "This is a featureless stretch of ventilation shaft on the Venipositor.", [
            this.portal("back", this.venipositorVentilationShaft2_Name()),
            this.portal("forward", this.venipositorVentilationShaft4_Name())
        ]);
    }
    venipositorVentilationShaft3_Name() { return "Venipositor - Ventilation Shaft - 3"; }
    venipositorVentilationShaft4() {
        return this.place3(this.venipositorVentilationShaft4_Name(), "This is a featureless stretch of ventilation shaft on the Venipositor.", [
            this.portal("back", this.venipositorVentilationShaft3_Name()),
            this.portal("forward", this.venipositorVentilationShaft1_Name())
        ]);
    }
    venipositorVentilationShaft4_Name() { return "Venipositor - Ventilation Shaft - 4"; }
}
class Scripts {
    constructor() {
        var s = (a, b) => new Script(a, b);
        this.AgentSarienTalkTo = s("AgentSarienTalkTo", this.agentSarienTalkTo);
        this.EmplacementBodyEmptySearch = s("EmplacementBodyEmptySearch", this.emplacementBodyEmptySearch);
        this.EmplacementBodyKeycardSearch = s("EmplacementBodyKeycardSearch", this.emplacementBodyKeycardSearch);
        this.ItemKeycardUse = s("ItemKeycardUse", this.itemKeycardUse);
        this.PlacePaxAeternaJanitorsClosetUpdate = s("PlacePaxAeternaJanitorsClosetUpdate", this.placePaxAeternaJanitorsClosetUpdate);
        this.PlacePaxAeternaUpperDeckHallAmidshipsUpdate = s("PlacePaxAeternaUpperDeckHallAmidshipsUpdate", this.placePaxAeternaUpperDeckHallAmidshipsUpdate);
        this.Todo = s("Todo", this.todo);
        this._All =
            [
                this.AgentSarienTalkTo,
                this.EmplacementBodyEmptySearch,
                this.EmplacementBodyKeycardSearch,
                this.ItemKeycardUse,
                this.PlacePaxAeternaJanitorsClosetUpdate,
                this.PlacePaxAeternaUpperDeckHallAmidshipsUpdate,
                this.Todo
            ];
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
    placePaxAeternaJanitorsClosetUpdate(u, w, p) {
        if (p.hasBeenVisited() == false) {
            p.visit();
            var messageLines = [
                "Space Quest Clone",
                "\n\n",
                "You are jolted awake to find yourself ",
                "in the office/supply closet/quarters ",
                "of the Maintenance Specialist (Sanitation Grade) ",
                "of the starship Pax Aeterna, ",
                "currently on an urgent mission to...",
                "\n\n",
                "...something or other, ",
                "you weren't really listening when they said.  ",
                "Probably they're in the process of saving something or other; ",
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
    placePaxAeternaUpperDeckHallAmidshipsUpdate(u, w, p) {
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
            u.messageEnqueue(p.description);
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
