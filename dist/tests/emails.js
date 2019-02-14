"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const event_1 = require("./factories/event");
const club_1 = require("./factories/club");
const emails = require("../src/index");
describe('Emails', function () {
    describe('Events', function () {
        it('should build an event email', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const event = event_1.NewEventObj();
                const club = club_1.NewClubObj();
                const email = yield emails.CompileEventEmail(event, club);
                assert(email);
            });
        });
    });
});
