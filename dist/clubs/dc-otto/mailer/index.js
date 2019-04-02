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
const core = require("club-hub-core");
const templates = require("./templates");
exports.buildEventEmails = (action, club, user, event) => __awaiter(this, void 0, void 0, function* () {
    const methodName = '[buildEventEmails] -';
    switch (action.type) {
        case core.Action.Type.Rsvp:
            return yield exports.buildRSVPEmail(user, event, club);
        case core.Action.Type.UnRsvp:
            return yield exports.sendMemberUnRSVPEmail(user, event, club);
        default:
            throw new Error(`${methodName} received an unsupported message type: ${action.type}`);
    }
});
exports.buildOnboardingEmail = (action, user, club, invitation) => __awaiter(this, void 0, void 0, function* () {
    const methodName = '[buildOnboardingEmail] -';
    switch (action.type) {
        case core.Action.Type.Welcome:
            return yield exports.buildWelcomeEmail(user, club, invitation);
        default:
            throw new Error(`${methodName} received an unsupported message type: ${action.type}`);
    }
});
exports.buildFormEmail = (action, club, form, event) => __awaiter(this, void 0, void 0, function* () {
    const methodName = '[buildFormEmail] -';
    switch (action.type) {
        case core.Action.Type.Application:
            return yield exports.sendMembershipApplicationEmail(form, club);
        case core.Action.Type.MembershipInquiry:
            return yield exports.sendMembershipInquiryEmail(form, club);
        case core.Action.Type.MembershipInquiryRes:
            return yield exports.sendMembershipInquiryResponseEmail(form, club);
        case core.Action.Type.PublicRsvp:
            return yield exports.sendPublicRSVPEmail(event, form, club);
        case core.Action.Type.NewProviderRequest:
            return yield exports.sendProviderRequestEmail(form, club);
        default:
            throw new Error(`${methodName} received an unsupported message type: ${action.type}`);
    }
});
exports.buildServiceEmails = (action, club, user, provider, event, reservation) => __awaiter(this, void 0, void 0, function* () {
    const methodName = '[buildServiceEmails] -';
    switch (action.type) {
        case core.Action.Type.ServiceRequest:
            return exports.buildServiceRequestEmail(user, provider, event, reservation, club);
        case core.Action.Type.NewProviderRequest:
            return exports.sendProviderRequestEmail(provider, club);
        default:
            throw new Error(`${methodName} received an unsupported message type: ${action.type}`);
    }
});
exports.buildWelcomeEmail = (member, club, invitation) => __awaiter(this, void 0, void 0, function* () {
    return templates.WelcomeEmailTemplate(member, club, invitation);
});
exports.sendMembershipApplicationEmail = (memberInfo, club) => __awaiter(this, void 0, void 0, function* () {
    return (club.name === core.Constants.Clubs.DRIVERS_CLUB) ?
        templates.DcMembershipApplicationTemplate(memberInfo, club) :
        templates.OttoMembershipApplicationTemplate(memberInfo, club);
});
exports.sendMembershipInquiryEmail = (memberInfo, club) => __awaiter(this, void 0, void 0, function* () {
    return templates.MembershipInquiryTemplate(memberInfo, club);
});
exports.sendMembershipInquiryResponseEmail = (memberInfo, club) => __awaiter(this, void 0, void 0, function* () {
    return templates.MembershipInquiryResponseTemplate(memberInfo, club);
});
exports.buildServiceRequestEmail = (member, provider, event, reservation, club) => __awaiter(this, void 0, void 0, function* () {
    return templates.ServiceRequestTemplate(member, provider, event, reservation, club);
});
exports.sendProviderRequestEmail = (form, club) => __awaiter(this, void 0, void 0, function* () {
    return templates.NewProviderTemplate(form, club);
});
exports.buildRSVPEmail = (member, event, club) => __awaiter(this, void 0, void 0, function* () {
    return templates.RsvpTemplate(member, event, club);
});
exports.sendMemberUnRSVPEmail = (member, event, club) => __awaiter(this, void 0, void 0, function* () {
    const methodName = '[sendMemberUnRSVPEmail] -';
    return templates.UnRsvpTemplate(member, event, club);
});
exports.sendPublicRSVPEmail = (event, form, club) => __awaiter(this, void 0, void 0, function* () {
    return templates.PublicRsvpTemplate(event, form, club);
});
