"use strict";
class Assert {
    static areEqual(expected, actual) {
        if (actual != expected) {
            throw new Error("Expected: '" + expected + "', but was: '" + actual + "'.");
        }
    }
    static isNotNull(objectToCheck) {
        if (objectToCheck == null) {
            throw new Error("Expected: not null, but was: null.");
        }
    }
    static isFalse(conditionToCheck) {
        if (conditionToCheck != false) {
            throw new Error("Expected: false, but was: not false.");
        }
    }
    static isTrue(conditionToCheck) {
        if (conditionToCheck != true) {
            throw new Error("Expected: true, but was: not true.");
        }
    }
}
class Tests {
    // Helpers.
    run(commandText) {
        this.world.updateForUniverseAndCommandText(this.universe, commandText);
    }
    universeAndWorldCreateAndSet() {
        var tea = ThisCouldBeBetter.TextAdventureEngine;
        var Universe = tea.Universe;
        var worldCreate = () => Game.worldBuild();
        var universe = Universe.fromWorldCreate(worldCreate);
        universe.initialize();
        var world = universe.world;
        Assert.isNotNull(world);
        this.universe = universe;
        this.world = world;
    }
    // Tests.
    die_FriendlyShip_EscapePodLaunchesIntoClosedBayDoors() {
        this.universeAndWorldCreateAndSet();
        var world = this.world;
        var run = this.run.bind(this);
        run("cheat goto 16"); // escape pod interior
        run("press launch button");
        Assert.isTrue(world.isOver);
    }
    die_FriendlyShip_Explodes() {
        this.universeAndWorldCreateAndSet();
        var world = this.world;
        var run = this.run.bind(this);
        var turnsWaitedSoFar = 0;
        var turnsToWait = 90;
        for (var turnsWaitedSoFar = 0; turnsWaitedSoFar < turnsToWait; turnsWaitedSoFar++) {
            run("wait");
        }
        Assert.isFalse(world.isOver);
        var turnsToWait = 10;
        for (var turnsWaitedSoFar = 0; turnsWaitedSoFar < turnsToWait; turnsWaitedSoFar++) {
            run("wait");
        }
        Assert.isTrue(world.isOver);
    }
    die_FriendlyShip_GoIntoAirlockWithNoSuit() {
        this.universeAndWorldCreateAndSet();
        var world = this.world;
        var run = this.run.bind(this);
        run("cheat goto 12"); // docking bay antechamber
        run("go airlock");
        Assert.isTrue(world.isOver);
    }
    die_PlanetCaverns_DrinkingFromStrangePool() {
        this.universeAndWorldCreateAndSet();
        var world = this.world;
        var run = this.run.bind(this);
        run("cheat goto 40"); // pool
        Assert.isFalse(world.isOver);
        run("drink pool");
        Assert.isTrue(world.isOver);
    }
    die_PlanetCaverns_EatenByMonsterUnderGrating() {
        this.universeAndWorldCreateAndSet();
        var world = this.world;
        var run = this.run.bind(this);
        run("cheat goto 37"); // east side of grating
        Assert.isFalse(world.isOver);
        run("go west");
        Assert.isTrue(world.isOver);
    }
    die_PlanetCaverns_MeltedByAcidDrips() {
        this.universeAndWorldCreateAndSet();
        var world = this.world;
        var run = this.run.bind(this);
        run("cheat goto 42"); // west side of drips
        Assert.isFalse(world.isOver);
        run("go east");
        // The westernmost set of drips
        // drips every other turn,
        // so wait at most one turn to die.
        run("wait");
        Assert.isTrue(world.isOver);
    }
    die_PlanetCaverns_WalkingThroughLaserBarrier() {
        this.universeAndWorldCreateAndSet();
        var world = this.world;
        var run = this.run.bind(this);
        run("cheat goto 41"); // barrier
        run("go barrier");
        Assert.isTrue(world.isOver);
    }
    die_PlanetCliffs_BridgeCollapses() {
        this.universeAndWorldCreateAndSet();
        var world = this.world;
        var run = this.run.bind(this);
        run("cheat goto 33"); // east side of bridge
        Assert.isFalse(world.isOver);
        run("go west");
        Assert.isFalse(world.isOver);
        run("go east");
        Assert.isFalse(world.isOver);
        run("go west");
        Assert.isFalse(world.isOver);
        run("go east");
        Assert.isFalse(world.isOver);
        run("go west");
        Assert.isTrue(world.isOver);
    }
    die_PlanetCliffs_LookInHole() {
        this.universeAndWorldCreateAndSet();
        var world = this.world;
        var run = this.run.bind(this);
        run("cheat goto 17"); // crash site
        run("go east");
        Assert.isFalse(world.isOver);
        run("look in hole");
        Assert.isTrue(world.isOver);
    }
    die_PlanetCliffs_EatenByCaveMonster() {
        this.universeAndWorldCreateAndSet();
        var world = this.world;
        var run = this.run.bind(this);
        run("cheat goto 29"); // cliff cave interior
        Assert.isFalse(world.isOver);
        var turnsForMonsterToKillPlayer = 3;
        for (var i = 0; i < turnsForMonsterToKillPlayer - 1; i++) {
            run("wait");
            Assert.isFalse(world.isOver);
        }
        run("wait");
        Assert.isTrue(world.isOver);
    }
    die_PlanetDesert_EscapePodCrashesWithNoSeatBelt() {
        this.universeAndWorldCreateAndSet();
        var world = this.world;
        var run = this.run.bind(this);
        run("cheat goto 10"); // engineering deck amidships
        run("press open bay doors button");
        run("cheat goto 16"); // escape pod interior
        run("press launch button");
        Assert.isFalse(world.isOver);
        run("press autonav button");
        Assert.isTrue(world.isOver);
    }
    die_PlanetDesert_OfThirst() {
        this.universeAndWorldCreateAndSet();
        var world = this.world;
        var run = this.run.bind(this);
        run("cheat goto 17"); // crash site
        var turnsWaitedSoFar = 0;
        var turnsToWait = 30;
        for (var turnsWaitedSoFar = 0; turnsWaitedSoFar < turnsToWait; turnsWaitedSoFar++) {
            run("wait");
        }
        Assert.isFalse(world.isOver);
        var turnsToWait = 20;
        for (var turnsWaitedSoFar = 0; turnsWaitedSoFar < turnsToWait; turnsWaitedSoFar++) {
            run("wait");
        }
        Assert.isTrue(world.isOver);
    }
    playFromStartToEnd() {
        this.universeAndWorldCreateAndSet();
        var world = this.world;
        var run = this.run.bind(this);
        // Start.
        // Pax Aeterna.
        // Upper deck.
        run("go door");
        run("go forward");
        run("talk to man");
        run("type astral bodies");
        run("get cartridge");
        run("go forward");
        run("search body");
        run("get keycard");
        run("go aft");
        run("go aft");
        run("go aft");
        run("go elevator");
        // Lower deck.
        run("go forward");
        run("go forward");
        run("go elevator");
        // Engineering deck.
        run("go aft");
        run("press open bay door button");
        run("go aft");
        run("go elevator");
        run("use keycard on slot");
        run("go elevator");
        // Docking bay.
        run("press left button");
        run("go left closet");
        run("get gadget");
        run("go out");
        run("press right button");
        run("go right closet");
        run("get spacesuit");
        run("go out");
        run("go airlock");
        run("go pod");
        Assert.areEqual(Places.friendlyShipDockingBayHangar_Name(), world.placeCurrent().name);
        run("push platform button");
        run("go pod");
        // Escape pod.
        run("put on safety harness");
        run("press launch button");
        run("press autonav button");
        // Pod crashes on planet.
        run("get survival kit");
        run("open survival kit");
        run("get canteen");
        run("get can of sham");
        run("take off safety harness");
        run("go door");
        // Ekkis II Wilderness.
        // crash site
        Assert.areEqual(Places.planetDesertCrashSite_Name(), world.placeCurrent().name);
        run("get glass");
        run("go east");
        // cliff bottoms, hole
        run("go south");
        run("go east");
        // beneath bridge
        run("go east");
        // bottom ramp, cave
        run("go cave");
        run("throw canteen at monster");
        run("get claw");
        run("go outside");
        run("go up");
        // bridge arch, east side
        run("go west");
        // bridge arch, west side
        run("go west");
        // cliff tops, west
        run("go north");
        // peak
        run("go east");
        // cliff tops, north
        run("go east");
        // cliff tops, northeast, columns
        run("go columns");
        // caverns
        // elevator
        run("get rock");
        run("go west");
        // grating, east side
        run("put can of sham on grating");
        run("go west");
        // grating, west side
        run("go west");
        // geyser
        run("put rock in geyser");
        run("go west");
        // pool
        run("go west");
        // barrier
        run("put glass in barrier");
        run("go west");
        // drips
        // west of drips
        Assert.areEqual(Places.planetCavernsDripsBefore_Name(), world.placeCurrent().name);
        // Wait for the right moment to pass the drips.
        // The drip sets stop, from west to east respectively,
        // every 2 turns, every 3 turns, and every 5 turns.
        // So they all stop dripping every 30 turns.
        // But the player must pass under on the
        // eighth, ninth, and tenth turns after that,
        // because 8 is divisible by 2, 9 by 3, and 10 by 5.
        while (world.turnsSoFar % 30 != 7) {
            run("wait");
        }
        run("go east");
        // drips 1
        Assert.areEqual(Places.planetCavernsDrips1_Name(), world.placeCurrent().name);
        run("go east");
        // drips 2
        Assert.areEqual(Places.planetCavernsDrips2_Name(), world.placeCurrent().name);
        run("go east");
        // drips 3
        Assert.areEqual(Places.planetCavernsDrips3_Name(), world.placeCurrent().name);
        run("go east");
        // east of drips
        Assert.areEqual(Places.planetCavernsDripsAfter_Name(), world.placeCurrent().name);
        run("turn on gadget");
        run("go east");
        // projection room
        run("go north");
        // steamworks
        Assert.areEqual(Places.planetCavernsSteamworks_Name(), world.placeCurrent().name);
        run("talk to alien");
        run("get skimmer key");
        run("insert key in skimmer");
        // Village of [Farting Noise].
        Assert.areEqual(Places.planetSettlementBarFront_Name(), world.placeCurrent().name);
        run("get skimmer key");
        run("go bar");
        run("go outside");
        // Sell the skimmer for 30 quatloos, a jetpack, and a coupon book.
        run("say yes");
        run("go bar");
        run("buy drink");
        run("buy drink");
        run("buy drink");
        // Hear the location of the enemy ship.
        var agentPlayer = world.agentPlayer;
        var itemQuatloos = agentPlayer.itemByName("quatloos");
        var place = world.placeCurrent();
        var emplacementSlotMachine = place.emplacementByName("slot machine");
        while (emplacementSlotMachine.activated()) {
            run("save gambling");
            var quatloosBeforeGambling = itemQuatloos.quantity;
            run("put quatloo in slot machine");
            var quatloosAfterGambling = itemQuatloos.quantity;
            var shouldRestore = (quatloosAfterGambling < quatloosBeforeGambling)
                || world.isOver;
            if (shouldRestore) {
                run("restore gambling");
            }
        }
        run("go out");
        run("go north");
        run("go east");
        run("go door");
        // robot shop
        run("buy pilot robot");
        run("go outside");
        run("go west");
        run("go west");
        // ship lot north
        Assert.areEqual(Places.planetSettlementNorthOfUsedShipLot_Name(), world.placeCurrent().name);
        run("go south");
        // ship lot
        run("talk to salesbeing");
        run("go north");
        // ship lot north
        run("look ship");
        run("buy ship");
        run("get in ship");
        run("press load button");
        run("press launch button");
        run("talk to robot");
        run("KL-5-6800");
        Assert.areEqual(Places.enemyShipAirlockExterior_Name(), world.placeCurrent().name);
    }
    survive_PlanetDesert_DrinkToPreventDyingOfThirst() {
        this.universeAndWorldCreateAndSet();
        var world = this.world;
        var run = this.run.bind(this);
        run("cheat goto 17"); // crash site
        run("cheat get dehydrated water");
        var turnsToWait = 30;
        for (var turnsWaitedSoFar = 0; turnsWaitedSoFar < turnsToWait; turnsWaitedSoFar++) {
            run("wait");
        }
        Assert.isFalse(world.isOver);
        run("drink dehydrated water");
        var turnsToWait = 20;
        for (var turnsWaitedSoFar = 0; turnsWaitedSoFar < turnsToWait; turnsWaitedSoFar++) {
            run("wait");
        }
        Assert.isFalse(world.isOver);
    }
}
class TestFixture {
    constructor(name, tests) {
        this.name = name;
        this.tests = tests;
    }
    run() {
        console.log("About to run tests in fixture '" + this.name + "'...");
        for (var i = 0; i < this.tests.length; i++) {
            var test = this.tests[i];
            test();
        }
        console.log("...all "
            + this.tests.length
            + " tests in fixture completed successfully.");
    }
}
var tests = new Tests();
var testFixture = new TestFixture("All Tests", [
    () => tests.die_FriendlyShip_EscapePodLaunchesIntoClosedBayDoors(),
    () => tests.die_FriendlyShip_Explodes(),
    () => tests.die_FriendlyShip_GoIntoAirlockWithNoSuit(),
    () => tests.die_PlanetCaverns_EatenByMonsterUnderGrating(),
    () => tests.die_PlanetCaverns_MeltedByAcidDrips(),
    () => tests.die_PlanetCaverns_WalkingThroughLaserBarrier(),
    () => tests.die_PlanetCliffs_BridgeCollapses(),
    () => tests.die_PlanetCliffs_LookInHole(),
    () => tests.die_PlanetCliffs_EatenByCaveMonster(),
    () => tests.die_PlanetDesert_EscapePodCrashesWithNoSeatBelt(),
    () => tests.die_PlanetDesert_OfThirst(),
    () => tests.playFromStartToEnd(),
    () => tests.survive_PlanetDesert_DrinkToPreventDyingOfThirst()
]);
testFixture.run();
