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
exports.buildEmailTemplate = (message, user, club, event, provider, reservation, form, password) => __awaiter(this, void 0, void 0, function* () {
    const methodName = '[buildEmailTemplate] -';
    switch (message.templateID) {
        case core.Message.MessageType.createRSVP:
            return yield exports.buildRSVPEmail(user, event);
            break;
        case core.Message.MessageType.unRSVP:
            return yield exports.sendMemberUnRSVPEmail(user, event);
            break;
        case core.Message.MessageType.publicRSVP:
            return yield exports.sendPublicRSVPEmail(user, event, false);
            break;
        case core.Message.MessageType.memberApplication:
            return yield exports.sendMembershipApplicationEmail(user);
            break;
        case core.Message.MessageType.memberInquiry:
            return yield exports.sendMembershipInquiryEmail(user);
            break;
        case core.Message.MessageType.memberInquiryRes:
            return yield exports.sendMembershipInquiryResponseEmail(user);
            break;
        case core.Message.MessageType.welcomeEmail:
            return yield exports.buildWelcomeEmail(user, club, user.password);
            break;
        case core.Message.MessageType.serviceRequest:
            return yield exports.buildServiceRequestEmail(user, provider, reservation);
            break;
        default:
            throw new Error(`${methodName} received invalid email template ID of: ${message.templateID}`);
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
