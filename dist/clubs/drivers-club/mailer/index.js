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
exports.buildEventEmails = (message, user, event) => __awaiter(this, void 0, void 0, function* () {
    const methodName = '[buildEventEmails] -';
    switch (message.messageType.templateID) {
        case core.Message.MessageTemplateID.Rsvp:
            return yield exports.buildRSVPEmail(user, event);
            break;
        case core.Message.MessageTemplateID.UnRsvp:
            return yield exports.sendMemberUnRSVPEmail(user, event);
            break;
        case core.Message.MessageType.publicRSVP:
            return yield exports.sendPublicRSVPEmail(user, event, false);
            break;
        default:
            throw new Error(`${methodName} received an unsupported message templateID: ${message.messageType.templateID}`);
    }
});
exports.buildFormEmail = (message, user, club, form, password) => __awaiter(this, void 0, void 0, function* () {
    const methodName = '[buildFormEmail] -';
    switch (message.messageType.templateID) {
        case core.Message.MessageTemplateID.Rsvp:
            return yield exports.sendMembershipApplicationEmail(form);
            break;
        case core.Message.MessageTemplateID.Rsvp:
            return yield exports.sendMembershipInquiryEmail(form);
            break;
        case core.Message.MessageTemplateID.Rsvp:
            return yield exports.sendMembershipInquiryResponseEmail(form);
            break;
        case core.Message.MessageTemplateID.Rsvp:
            return yield exports.buildWelcomeEmail(user, club, user.password);
            break;
        default:
            throw new Error(`${methodName} received invalid email template ID of: ${message.templateID}`);
    }
});
exports.buildServiceEmails = (message, user, provider, reservation) => __awaiter(this, void 0, void 0, function* () {
    return yield exports.buildServiceRequestEmail(user, provider, reservation);
});
exports.buildWelcomeEmail = (member, club, password) => __awaiter(this, void 0, void 0, function* () {
    return templates.WelcomeEmailTemplate(member, club, password);
});
exports.sendMembershipApplicationEmail = (memberInfo) => __awaiter(this, void 0, void 0, function* () {
    return templates.MembershipApplicationTemplate(memberInfo);
});
exports.sendMembershipInquiryEmail = (memberInfo) => __awaiter(this, void 0, void 0, function* () {
    return templates.MembershipInquiryTemplate(memberInfo);
});
exports.sendMembershipInquiryResponseEmail = (memberInfo) => __awaiter(this, void 0, void 0, function* () {
    return templates.MembershipInquiryResponseTemplate(memberInfo);
});
exports.buildServiceRequestEmail = (member, provider, reservation) => __awaiter(this, void 0, void 0, function* () {
    return templates.ServiceRequestTemplate(member, provider, reservation);
});
exports.sendProviderRequestEmail = (provider) => __awaiter(this, void 0, void 0, function* () {
    return templates.NewProviderTemplate(provider);
});
exports.buildRSVPEmail = (member, event) => __awaiter(this, void 0, void 0, function* () {
    return templates.RsvpTemplate(member, event);
});
exports.sendMemberUnRSVPEmail = (member, event) => __awaiter(this, void 0, void 0, function* () {
    const methodName = '[sendMemberUnRSVPEmail] -';
    return templates.UnRsvpTemplate(member, event);
});
exports.sendPublicRSVPEmail = (member, event, plusOne) => __awaiter(this, void 0, void 0, function* () {
    return templates.PublicRsvpTemplate(member, event, plusOne);
});
