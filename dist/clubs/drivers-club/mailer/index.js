"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templates = require("./templates");
exports.buildWelcomeEmail = (member, club, password) => {
    return templates.WelcomeEmailTemplate(member, club, password);
};
exports.buildRSVPEmail = (member, event) => {
    return templates.RsvpTemplate(member, event);
};
exports.sendPublicRSVPEmail = (memberName, memberEmail, plusOne, event) => {
    return templates.PublicRsvpTemplate(memberName, memberEmail, plusOne, event);
};
exports.sendProviderRequestEmail = (provider) => {
    return templates.NewProviderTemplate(provider);
};
