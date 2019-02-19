"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildGenericContent = (content, club) => {
    const richContent = {
        content: content,
        unsubscribeURL: "www.tryclubhub.com",
        clubInfo: exports.BuildClubInfo(club)
    };
    return richContent;
};
exports.BuildEventContent = (event, club) => {
    const richContent = {
        name: event.name,
        imageURL: event.photoURL,
        content: event.richContent.html,
        url: 'www.tryclubhub.com',
        cta: 'View Event',
        unsubscribeURL: "www.tryclubhub.com",
        clubInfo: exports.BuildClubInfo(club)
    };
    return richContent;
};
exports.BuildPostContent = (post, club) => {
    const postInfo = {
        name: post.title,
        imageURL: post.imageURL,
        content: post.richContent.html,
        url: 'www.tryclubhub.com',
        cta: 'View Post',
        unsubscribeURL: "www.tryclubhub.com",
        clubInfo: exports.BuildClubInfo(club),
    };
    return postInfo;
};
exports.BuildConfirmationContent = (event, club) => {
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
