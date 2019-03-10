"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("club-hub-core");
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
exports.BuildConfirmationContent = (reservation, event, group, club) => {
    let title;
    let subtitle;
    let info;
    let icon;
    var timeOptions = { hour: 'numeric', minute: 'numeric' };
    const time = event.start.toLocaleDateString("en-US", timeOptions);
    var dayOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    const day = event.start.toLocaleDateString("en-US", dayOptions);
    if (group.name === core.Calendar.CalendarGroupName.Golf) {
        title = 'Tee Time Confirmation';
        subtitle = `Your tee time at ${club.name} has been confirmed.`;
        info = `${reservation.participants.length} golfers on ${day} at ${time}.`;
        icon = 'fas fa-golf-ball';
    }
    else if (group.name === 'Dining Room') {
        title = 'Dining Confirmation';
        subtitle = `Your dining reservation at ${club.name} has been confirmed.`;
        info = `${reservation.participants.length} diners on ${day} at ${time}.`;
        icon = 'fas fa-utensils';
    }
    else if (group.name === 'Service Providers') {
        title = 'Vehicle Service Confirmation';
        subtitle = `Your vehicle service reservation with ${club.name} has been confirmed.`;
        info = `${reservation.participants.length} vehicle on ${day} at ${time}.`;
        icon = 'fas fa-car';
    }
    const confirmationInfo = {
        title: title,
        subtitle: subtitle,
        icon: icon,
        info: info,
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
