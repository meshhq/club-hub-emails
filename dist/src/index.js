"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Handlebars = require("handlebars");
const CarClub = require("./clubs/dc-otto/mailer/index");
exports.CarClub = CarClub;
const transform = require("./transform/transform");
exports.transform = transform;
const constants = require("./transform/constants");
exports.constants = constants;
exports.CompileGenericEmail = (content, club) => {
    const eventInfo = transform.BuildGenericContent(content, club);
    const path = `${__dirname}/templates/generic.html`;
    return CompileEmail(path, eventInfo, club);
};
exports.CompileEventEmail = (event, club, link) => {
    const eventInfo = transform.BuildEventContent(event, club, link);
    const path = `${__dirname}/templates/event.html`;
    return CompileEmail(path, eventInfo, club);
};
exports.CompilePostEmail = (post, club, link) => {
    const postInfo = transform.BuildPostContent(post, club, link);
    const path = `${__dirname}/templates/post.html`;
    return CompileEmail(path, postInfo, club);
};
exports.CompileConfirmationEmail = (reservation, event, group, club, url) => {
    const confirmationInfo = transform.BuildConfirmationContent(reservation, event, group, club, url);
    const path = `${__dirname}/templates/confirmation.html`;
    return CompileEmail(path, confirmationInfo, club);
};
exports.CompileWelcomeEmail = (user, club, inviteLink) => {
    const welcomeInfo = transform.BuildWelcomeContent(user, club, inviteLink);
    const path = `${__dirname}/templates/welcome.html`;
    return CompileEmail(path, welcomeInfo, club);
};
exports.CompileInvalidEmailAdminNotification = (adminName, invalidEmail, club) => {
    const invalidEmailInfo = transform.BuildInvalidEmailAdminNotificationContent(adminName, invalidEmail, club);
    const path = `${__dirname}/templates/invalidEmail.html`;
    return CompileEmail(path, invalidEmailInfo, club);
};
exports.CompileServiceEmail = (info, club) => {
    const path = `${__dirname}/templates/confirmation.html`;
    return CompileEmail(path, info, club);
};
const CompileEmail = (path, info, club) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
            if (err) {
                return reject(err);
            }
            try {
                const primaryUpdated = data.replace("var(--primary-color)", club.clubSettings.primaryColor);
                const secondaryUpdated = primaryUpdated.replace("var(--secondary-color)", club.clubSettings.secondaryColor);
                const template = Handlebars.compile(secondaryUpdated);
                resolve(template(info));
            }
            catch (e) {
                reject(e);
            }
        });
    });
};
