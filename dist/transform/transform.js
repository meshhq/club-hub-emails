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
exports.BuildEventContent = (event, club, link) => {
    const date = new Date(event.start);
    var dateOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    var timeOptions = { hour: 'numeric', minute: 'numeric' };
    const richContent = {
        name: event.name,
        subtitle: "New Club Event!",
        photoURL: event.photoURL,
        content: event.richContent.html,
        url: link,
        cta: 'View Event',
        unsubscribeURL: 'www.tryclubhub.com',
        location: event.location.name,
        street: event.location.address1,
        date: date.toLocaleDateString("en-US", dateOptions),
        time: date.toLocaleTimeString("en-US", timeOptions),
        club: exports.BuildClubInfo(club)
    };
    return richContent;
};
exports.BuildPostContent = (post, club, link) => {
    const postInfo = {
        name: post.title,
        photoURL: post.imageURL,
        content: post.richContent.html,
        url: link,
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
    const time = new Date(event.start).toLocaleTimeString("en-US", timeOptions);
    var dayOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    const day = new Date(event.start).toLocaleDateString("en-US", dayOptions);
    const participants = reservation.participants.length;
    switch (group.name) {
        case core.Calendar.GroupName.TeeTimes:
            const golfers = participants > 1 ? 'golfers' : 'golfer';
            title = 'Tee Time Confirmation';
            subtitle = `Your Tee Time at ${club.name} has been confirmed.`;
            info = `${reservation.participants.length} ${golfers} on ${day} at ${time}.`;
            icon = '🏌';
            break;
        case core.Calendar.GroupName.Dining:
            const diners = participants > 1 ? 'diners' : 'diner';
            title = 'Dining Confirmation';
            subtitle = `Your dining reservation at ${club.name} has been confirmed.`;
            info = `${reservation.participants.length} ${diners} on ${day} at ${time}.`;
            icon = '🍽';
            break;
        case core.Calendar.GroupName.Service:
            title = 'Vehicle Service Confirmation';
            subtitle = `Your vehicle service reservation at ${club.name} has been confirmed.`;
            info = `${reservation.participants.length} vehicle on ${day} at ${time}.`;
            icon = '🏎';
            break;
        default:
            title = 'Event Confirmation';
            subtitle = `Your RSVP for ${event.name} has been confirmed`;
            info = `${event.name} takes place on ${day} at ${time}.`;
            icon = '🎉';
            break;
    }
    const confirmationInfo = {
        title: title,
        subtitle: subtitle,
        icon: icon,
        info: info,
        url: 'admin.tryclubhub.com',
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
