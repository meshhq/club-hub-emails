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
const dotenv = require("dotenv");
const event_1 = require("./factories/event");
const post_1 = require("./factories/post");
const club_1 = require("./factories/club");
const emails = require("../src/index");
const ses_1 = require("../src/services/ses");
dotenv.config();
const sender = 'kevin@meshstudio.io';
const recipient = 'tayhalla@gmail.com';
let emailToSend;
describe('Emails', function () {
    describe('Events', function () {
        it('should build an event email', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const event = event_1.NewEventObj();
                const club = club_1.NewClubObj();
                const email = yield emails.CompileConfirmationEmail({}, event, {}, club, '');
                assert(email);
            });
        });
    });
    describe('Posts', function () {
        it('should build an post email', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const post = post_1.NewPostObj();
                const club = club_1.NewClubObj();
                const email = yield emails.CompilePostEmail(post, club, '');
                assert(email);
            });
        });
    });
    describe('InvalidEmail', function () {
        it('should build an invalid email notification', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const club = club_1.NewClubObj();
                const email = yield emails.CompileInvalidEmailAdminNotification('Taylor', 'taylor@whodis.com', club);
                console.log(email);
                assert(email);
                emailToSend = email;
            });
        });
    });
    describe.skip('Send Email', function () {
        it('should build an event email', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield ses_1.default.sendHTMLEmail(sender, [recipient], ['tayhalla@gmail.com'], [], `Test Send`, emailToSend);
                console.log("Response", response);
            });
        });
    });
});
