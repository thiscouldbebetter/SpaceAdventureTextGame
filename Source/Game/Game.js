"use strict";
class Game {
    static worldBuild() {
        var player = new Agent("self", "This is you.", null, // scriptUpdateForTurnName
        [
            Item.fromNameAndDescription("locket", "This small copper locket contains a picture of your sweetie.")
        ], null // commands
        );
        var scriptsCustom = new Scripts();
        var p = (name, description, scriptName, objects) => Place.fromNameDescriptionScriptNameAndObjects(name, description, scriptName, objects);
        var portalDescription = "This is an exit.";
        var places = [
            Place.fromNameDescriptionScriptNameAndObjects("Arcadia - Hall - Upper Deck, Amidships", "This is a hallway in the spaceship Arcadia.  "
                + "The hall continues to forward and to aft.  "
                + "In the middle is a door leading to the janitor's closet, "
                + "which, if you remember, is where you came in to this story.", scriptsCustom.PlaceCenterRoomUpdate.name, [
                new Portal("closet", portalDescription, "Arcadia - Janitor's Closet"),
                new Portal("fore", portalDescription, "Arcadia - Hall - Upper Deck, Forward, Rear Section"),
                new Portal("aft", portalDescription, "Arcadia - Hall, Upper Deck, Aft")
            ]),
            Place.fromNameDescriptionScriptNameAndObjects("Spaceship Hall - Upper Deck, Forward, Rear Section", "This is a hallway in the spaceship Arcadia.  "
                + "A bulkhead blocks the path forward.  "
                + "There is a door in the aft bulkhead.  ", scriptsCustom.PlaceCenterRoomUpdate.name, [
                new Portal("aft", portalDescription, "Arcadia - Hall - Upper Deck, Amidships"),
                new Emplacement("dead crewman", "This is the body of a member of the Arcadia's crew, "
                    + "riddled with charred holes from laser fire.")
            ]),
        ];
        var commands = Command.Instances()._All;
        var scriptsAll = new Array;
        var commandsAsScripts = commands.map((x) => x._scriptExecute);
        scriptsAll.push(...commandsAsScripts);
        scriptsAll.push(...scriptsCustom._All);
        var returnValue = new World("Demo World", places, player, commands, scriptsAll, null, // turnsSoFar,
        null);
        return returnValue;
    }
}
class Scripts {
    constructor() {
        var s = (a, b) => new Script(a, b);
        this.AgentSarienTalkTo = s("AgentSarienTalkTo", this.agentSarienTalkTo);
        this.EmplacementDeadCrewpersonUse = s("EmplacementDeadCrewpersonUse", this.emplacementDeadCrewpersonUse);
        this.ItemKecyardUse = s("ItemKeycardUse", this.itemKeycardUse);
        this.PlaceStartUpdate = s("PlaceStartUpdate", this.placeStartUpdate);
        this._All =
            [
                this.AgentSarienTalkTo,
                this.EmplacementDeadCrewpersonUse,
                this.ItemKeycardUse,
                this.PlaceStartUpdate
            ];
    }
    agentSarienTalkTo(u, w, p, agent) {
        var message = "The Sarien's only response is to disintegrate you.";
        w.isOver = true;
        u.messageEnqueue(message);
    }
    emplacementDeadCrewpersonUse(u, w, place, emplacementDeadCrewperson, target) {
        var message;
        if (target != null) {
            message = "You can't use the crewperson's body on anything.";
        }
        else {
            message = "You find a keycard in the crewperson's pockets.";
            var itemKeycard = Item.fromNameAndDescription("keycard", "This is an access keycard for the starship Arcadia.");
            place.itemAdd(itemKeycard);
            emplacementDeadCrewpersonUse._scriptUseName = null;
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
    placeStartUpdate(u, w, p) {
        if (p.hasBeenVisited() == false) {
            var messageLines = [
                "You are napping, on duty, in the janitor's closet of the "
                    + "starship Arcadia when you are awakened by a loud klaxon."
                    + "You stagger out into the hallway, where unfortunately the "
                    + "klaxon is even louder, and joined by flashing red lights."
                    + "After a few moments, the klaxon and lights stop, "
                    + "and a relative silence settles over the ship, "
                    + "punctuated by the occasional rumble, explosion or laser blast"
                    + "in the distance."
                    + "\n\n"
                    + "Probably this is all fine."
                    + "\n"
            ];
            var message = messageLines.join("");
            u.messageEnqueue(message);
        }
    }
}
class StateNames {
    static isEmpty() {
        return "isEmpty";
    }
    static isSharpened() {
        return "isSharpened";
    }
    static isUnlocked() {
        return "isUnlocked";
    }
}
