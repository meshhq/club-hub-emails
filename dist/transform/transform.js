"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildGenericContent = (content, club) => {
    const richContent = {
        content: content,
        unsubscribeURL: "www.tryclubhub.com",
        club: exports.BuildClubInfo(club)
    };
    return richContent;
};
exports.BuildEventContent = (event, club) => {
    const date = new Date(event.start);
    var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var timeOptions = { hour: 'numeric', minute: 'numeric' };
    const richContent = {
        name: event.name,
        subtitle: "New Club Event!",
        photoURL: event.photoURL,
        content: event.richContent.html,
        url: 'www.tryclubhub.com',
        cta: 'View Event',
        unsubscribeURL: 'www.tryclubhub.com',
        location: event.location.name,
        street: event.location.address1,
        date: date.toLocaleDateString("en-US", dateOptions),
        time: date.toLocaleDateString("en-US", timeOptions),
        club: exports.BuildClubInfo(club)
    };
    return richContent;
};
exports.BuildPostContent = (post, club) => {
    const postInfo = {
        name: post.title,
        photoURL: post.imageURL,
        content: post.richContent.html,
        url: 'www.tryclubhub.com',
        cta: 'View Post',
        unsubscribeURL: 'www.tryclubhub.com',
        club: exports.BuildClubInfo(club),
    };
    return postInfo;
};
exports.BuildConfirmationContent = (event, club) => {
    const confirmationInfo = {
        title: event.name,
        subtitle: "",
        info: "",
        url: 'www.tryclubhub.com',
        unsubscribeURL: 'www.tryclubhub.com',
        club: exports.BuildClubInfo(club)
    };
    return confirmationInfo;
};
exports.BuildClubInfo = (club) => {
    const clubInfo = {
        name: club.name,
        domain: club.domain,
        logoURL: club.photoURL,
        street: club.locations[0].address1,
        city: club.locations[0].city,
        state: club.locations[0].state,
        zip: club.locations[0].zip,
    };
    return clubInfo;
};
