"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("club-hub-core");
const ts_optchain_1 = require("ts-optchain");
const constants = require("./constants");
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
    const images = ts_optchain_1.oc(event).images([{}]);
    const richContent = {
        name: event.name,
        subtitle: "New Club Event!",
        photoURL: images[0].md,
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
exports.BuildWelcomeContent = (user, club, inviteLink) => {
    const iosAppURL = ts_optchain_1.oc(club).clubSettings.iosAppURL(constants.iOSAppURL);
    const androidAppUDL = ts_optchain_1.oc(club).clubSettings.androidAppURL(constants.iOSAppURL);
    const unsubscribeURL = `${club.domain}/tryclubhub.com/user/me`;
    const welcomeContent = {
        firstName: user.firstName,
        inviteLink: inviteLink,
        iosAppURL: iosAppURL,
        androidAppURL: androidAppUDL,
        iosBadgeURL: constants.iOSBadgeURL,
        androidBadgeURL: constants.AndroidBadgeURL,
        clubhubSupportURL: constants.ClubHubSupportURL,
        unsubscribeURL: unsubscribeURL,
        club: exports.BuildClubInfo(club),
    };
    return welcomeContent;
};
exports.BuildPostContent = (post, club, link) => {
    const postInfo = {
        name: post.title,
        photoURL: post.image.md,
        content: post.richContent.html,
        url: link,
        cta: 'View Post',
        unsubscribeURL: 'www.tryclubhub.com',
        club: exports.BuildClubInfo(club),
    };
    return postInfo;
};
exports.BuildConfirmationContent = (reservation, event, group, club, url) => {
    let title;
    let subtitle;
    let info;
    let icon;
    var timeOptions = { hour: 'numeric', minute: 'numeric', timeZone: club.tzid };
    const time = new Date(event.start).toLocaleTimeString("en-US", timeOptions);
    var dayOptions = { weekday: 'long', month: 'long', day: 'numeric', timeZone: club.tzid };
    const day = new Date(event.start).toLocaleDateString("en-US", dayOptions);
    const participants = reservation.participants.length;
    switch (group.name) {
        case core.Calendar.GroupName.TeeTimes:
            const golfers = participants > 1 ? 'golfers' : 'golfer';
            title = 'Tee Time Confirmation';
            subtitle = `Your Tee Time at ${club.name} has been confirmed.`;
            info = `${reservation.participants.length} ${golfers} on ${day} at ${time}.`;
            icon = constants.GolferEmoji;
            break;
        case core.Calendar.GroupName.Dining:
            const diners = participants > 1 ? 'diners' : 'diner';
            title = 'Dining Confirmation';
            subtitle = `Your dining reservation at ${club.name} has been confirmed.`;
            info = `${reservation.participants.length} ${diners} on ${day} at ${time}.`;
            icon = constants.DinnerEmoji;
            break;
        case core.Calendar.GroupName.Service:
            title = 'Vehicle Service Confirmation';
            subtitle = `Your vehicle service reservation at ${club.name} has been confirmed.`;
            info = `${reservation.participants.length} vehicle on ${day} at ${time}.`;
            icon = constants.RaceCarEmojiURL;
            break;
        default:
            title = 'Event Confirmation';
            subtitle = `Your RSVP for ${event.name} has been confirmed`;
            info = `${event.name} takes place on ${day} at ${time}.`;
            icon = constants.PartyEmoji;
            break;
    }
    const confirmationInfo = {
        title: title,
        subtitle: subtitle,
        icon: icon,
        info: info,
        url: url,
        unsubscribeURL: 'www.tryclubhub.com',
        club: exports.BuildClubInfo(club)
    };
    return confirmationInfo;
};
exports.BuildClubInfo = (club) => {
    const clubInfo = {
        name: club.name,
        website: `https://${club.domain}.tryclubhub.com`,
        shortName: club.shortName,
        domain: club.domain,
        logoURL: club.image.md,
        street: club.locations[0].address1,
        city: club.locations[0].city,
        state: club.locations[0].state,
        zip: club.locations[0].zip,
    };
    return clubInfo;
};
