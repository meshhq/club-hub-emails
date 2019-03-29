"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Handlebars = require("handlebars");
const CarClub = require("./clubs/dc-otto/mailer/index");
exports.CarClub = CarClub;
const transform = require("./transform/transform");
exports.CompileGenericEmail = (content, club) => {
    const eventInfo = transform.BuildGenericContent(content, club);
    const path = `${__dirname}/templates/generic.html`;
    return CompileEmail(path, eventInfo);
};
exports.CompileEventEmail = (event, club, link) => {
    const eventInfo = transform.BuildEventContent(event, club, link);
    const path = `${__dirname}/templates/event.html`;
    return CompileEmail(path, eventInfo);
};
exports.CompilePostEmail = (post, club, link) => {
    const postInfo = transform.BuildPostContent(post, club, link);
    const path = `${__dirname}/templates/post.html`;
    return CompileEmail(path, postInfo);
};
exports.CompileConfirmationEmail = (reservation, event, group, club) => {
    const confirmationInfo = transform.BuildConfirmationContent(reservation, event, group, club);
    const path = `${__dirname}/templates/confirmation.html`;
    return CompileEmail(path, confirmationInfo);
};
const CompileEmail = (path, info) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
            if (err) {
                return reject(err);
            }
            try {
                console.log("Data", data);
                const template = Handlebars.compile(data);
                console.log("Template", template);
                resolve(template(info));
            }
            catch (e) {
                reject(e);
            }
        });
    });
};
