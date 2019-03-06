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
    switch (message.content.type) {
        case core.Message.Type.Rsvp:
            return yield exports.buildRSVPEmail(user, event);
        case core.Message.Type.UnRsvp:
            return yield exports.sendMemberUnRSVPEmail(user, event);
        default:
            throw new Error(`${methodName} received an unsupported message type: ${message.content.type}`);
    }
});
exports.buildOnboardingEmail = (message, user, club, password) => __awaiter(this, void 0, void 0, function* () {
    const methodName = '[buildOnboardingEmail] -';
    switch (message.content.type) {
        case core.Message.Type.Welcome:
            return yield exports.buildWelcomeEmail(user, club, password);
        default:
            throw new Error(`${methodName} received an unsupported message type: ${message.content.type}`);
    }
});
exports.buildFormEmail = (message, form, event) => __awaiter(this, void 0, void 0, function* () {
    const methodName = '[buildFormEmail] -';
    switch (message.content.type) {
        case core.Message.Type.Application:
            return yield exports.sendMembershipApplicationEmail(form);
        case core.Message.Type.MembershipInquiry:
            return yield exports.sendMembershipInquiryEmail(form);
        case core.Message.Type.MembershipInquiryRes:
            return yield exports.sendMembershipInquiryResponseEmail(form);
        case core.Message.Type.PublicRsvp:
            return yield exports.sendPublicRSVPEmail(event, form);
        case core.Message.Type.NewProviderRequest:
            return yield exports.sendProviderRequestEmail(form);
        default:
            throw new Error(`${methodName} received an unsupported message type: ${message.content.type}`);
    }
});
exports.buildServiceEmails = (message, user, provider, event, reservation) => __awaiter(this, void 0, void 0, function* () {
    const methodName = '[buildServiceEmails] -';
    switch (message.content.type) {
        case core.Message.Type.ServiceRequest:
            return exports.buildServiceRequestEmail(user, provider, event, reservation);
        case core.Message.Type.NewProviderRequest:
            return exports.sendProviderRequestEmail(provider);
        default:
            throw new Error(`${methodName} received an unsupported message type: ${message.content.type}`);
    }
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
exports.buildServiceRequestEmail = (member, provider, event, reservation) => __awaiter(this, void 0, void 0, function* () {
    return templates.ServiceRequestTemplate(member, provider, event, reservation);
});
exports.sendProviderRequestEmail = (form) => __awaiter(this, void 0, void 0, function* () {
    return templates.NewProviderTemplate(form);
});
exports.buildRSVPEmail = (member, event) => __awaiter(this, void 0, void 0, function* () {
    return templates.RsvpTemplate(member, event);
});
exports.sendMemberUnRSVPEmail = (member, event) => __awaiter(this, void 0, void 0, function* () {
    const methodName = '[sendMemberUnRSVPEmail] -';
    return templates.UnRsvpTemplate(member, event);
});
exports.sendPublicRSVPEmail = (event, form) => __awaiter(this, void 0, void 0, function* () {
    return templates.PublicRsvpTemplate(event, form);
});
