"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Handlebars = require("handlebars");
const transform = require("./transform");
exports.CompileEventEmail = (event, club) => {
    const eventInfo = transform.BuildEventInfo(event, club);
    const path = `${__dirname}/../templates/event.html`;
    return CompileEmail(path, eventInfo);
};
exports.CompileConfirmationEmail = (event, club) => {
    const confirmationInfo = transform.BuildConfirmationInfo(event, club);
    const path = `${__dirname}/../templates/confirmation.html`;
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
