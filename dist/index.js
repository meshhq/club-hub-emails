"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Handlebars = require("handlebars");
const transform = require("./transform/transform");
exports.CompileGenericEmail = (content, club) => {
    const eventInfo = transform.BuildGenericContent(content, club);
    const path = `${__dirname}/templates/generic.html`;
    return CompileEmail(path, eventInfo);
};
exports.CompileEventEmail = (event, club) => {
    const eventInfo = transform.BuildEventContent(event, club);
    const path = `${__dirname}/templates/rich.html`;
    return CompileEmail(path, eventInfo);
};
exports.CompilePostEmail = (post, club) => {
    const postInfo = transform.BuildPostContent(post, club);
    const path = `${__dirname}/templates/rich.html`;
    return CompileEmail(path, postInfo);
};
exports.CompileConfirmationEmail = (event, club) => {
    const confirmationInfo = transform.BuildConfirmationContent(event, club);
    const path = `${__dirname}/templates/confirmation.html`;
    return CompileEmail(path, confirmationInfo);
};
const CompileEmail = (path, data) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
            if (err) {
                return reject(err);
            }
            const template = Handlebars.compile(data);
            resolve(template(data));
        });
    });
};
