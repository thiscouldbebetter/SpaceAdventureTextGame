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
}
class Tests {
    playFromStart() {
        var tea = ThisCouldBeBetter.TextAdventureEngine;
        var Universe = tea.Universe;
        var worldCreate = () => Game.worldBuild();
        var universe = Universe.fromWorldCreate(worldCreate);
        universe.initialize();
        var world = universe.world;
        Assert.isNotNull(world);
        var commandsToRunAsText = [
            // Start.
            // Pax Aeterna.
            // Upper deck.
            "go door",
            "go forward",
            "talk to man",
            "type astral bodies",
            "get cartridge",
            "put cartridge in reader",
            "go aft",
            "go aft",
            "go elevator",
            // Lower deck.
            "go forward",
            "go forward",
            "go elevator",
            // Engineering deck.
            "go aft",
            "go aft",
            "go elevator",
            // Docking bay.
            "go airlock",
            "go pod",
            // Escape pod.
            "press launch button",
            "press autonav button",
            // Ekkis II.
            "go door"
            // todo
        ];
        for (var i = 0; i < commandsToRunAsText.length; i++) {
            var commandText = commandsToRunAsText[i];
            world.updateForUniverseAndCommandText(universe, commandText);
        }
        var place = world.placeCurrent();
        Assert.areEqual("Ekkis II - Desert - Crash Site", place.name);
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
    () => tests.playFromStart()
]);
testFixture.run();
