"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildEventInfo = (event, club) => {
    const eventInfo = {
        name: event.name,
        imageURL: event.photoURL,
        content: event.description,
        url: 'www.tryclubhub.com',
        unsubscribeURL: "www.tryclubhub.com",
        clubInfo: exports.BuildClubInfo(club)
    };
    return eventInfo;
};
exports.BuildConfirmationInfo = (event, club) => {
    const confirmationInfo = {
        title: event.name,
        subtitle: "",
        info: "",
        url: 'www.tryclubhub.com',
        unsubscribeURL: "www.tryclubhub.com",
        clubInfo: exports.BuildClubInfo(club)
    };
    return confirmationInfo;
};
exports.BuildClubInfo = (club) => {
    const addressInfo = {
        street: club.locations[0].address1,
        city: club.locations[0].city,
        state: club.locations[0].state,
        zip: club.locations[0].zip,
    };
    const clubInfo = {
        name: club.name,
        domain: club.domain,
        logoURL: club.photoURL,
        address: addressInfo
    };
    return clubInfo;
};
