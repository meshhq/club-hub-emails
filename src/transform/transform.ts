import * as core from 'club-hub-core'
import { oc } from 'ts-optchain'

import { EventInfo } from '../models/event'
import { RichContent } from '../models/rich'
import { WelcomeContent } from '../models/welcome'
import { InvalidEmail } from '../models/invalidEmail'
import { ConfirmationInfo } from '../models/confirmation'
import { ClubInfo } from '../models/club'

import * as constants from './constants'

/**
 * Builds a RichContent object for an email.
 * @param content The HTML content for the email.
 * @param club The club for the email.
 */
export const BuildGenericContent = (content: string, club: core.Club.Model): RichContent => {
    const richContent: RichContent = {
        content: content,
        club: BuildClubInfo(club)
    }
    return richContent
}

/**
 * Builds a RichContent object for an email.
 * @param event The event for the email.
 * @param club The club for the email.
 */
export const BuildEventContent = (event: core.Event.Model, club: core.Club.Model, link: string): EventInfo => {
    const date = new Date(event.start)
    var dateOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZone: club.tzid };
    var timeOptions = { hour: 'numeric', minute: 'numeric', timeZone: club.tzid }

    const imageURL = oc(event).images[0]({}).md
    const richContent: EventInfo = {
        name: event.name,
        subtitle: "New Club Event!",
        photoURL: imageURL,
        content: event.richContent.html,
        url: link,
        cta: 'View Event',
        location: event.location.name,
        street: event.location.address1,
        date: date.toLocaleDateString("en-US", dateOptions),
        time: date.toLocaleTimeString("en-US", timeOptions),
        club: BuildClubInfo(club)
    }
    return richContent
}

/**
 * Builds a welcomeContent object for a welcome email.
 * @param event The user for the email.
 * @param club The club for the email.
 */
export const BuildWelcomeContent = (user: core.User.Model, club: core.Club.Model, inviteLink: string): WelcomeContent => {
    const iosAppURL = oc(club).clubSettings.iosAppURL(constants.iOSAppURL)
    const androidAppURL = oc(club).clubSettings.androidAppURL(constants.AndroidAppURL)
    const unsubscribeURL = `${club.baseURL}/user/me`
    const welcomeContent: WelcomeContent = {
        firstName: user.firstName,
        inviteLink: inviteLink,
        loginURL: club.baseURL,
        iosAppURL: iosAppURL,
        androidAppURL: androidAppURL,
        iosBadgeURL: constants.iOSBadgeURL,
        androidBadgeURL: constants.AndroidBadgeURL,
        clubhubSupportURL: constants.ClubHubSupportURL,
        club: BuildClubInfo(club),
    }
    return welcomeContent
}

/**
 * Builds a welcomeContent object for a welcome email.
 * @param event The user for the email.
 * @param club The club for the email.
 */
 export const BuildInvalidEmailAdminNotificationContent = (clubName: string, invalidEmail: string, club: core.Club.Model): InvalidEmail => {
    const invalidEmailContent: InvalidEmail = {
        clubName,
        invalidEmail,
        club: BuildClubInfo(club),
    }
    return invalidEmailContent
}

/**
 * Builds a Riobject for a post.
 * @param event The post for the email.
 * @param club The club for the email.
 */
 export const CompileResetPasswordInvalidEmail = (post: core.Post.Model, club: core.Club.Model, link: string): RichContent => {
    const postInfo: RichContent = {
        name: post.title,
        photoURL: post.image.md,
        content: post.richContent.html,
        url: link,
        cta: 'View Post',
        club: BuildClubInfo(club),

    }
    return postInfo
}

/**
 * Builds a Riobject for a post.
 * @param event The post for the email.
 * @param club The club for the email.
 */
export const BuildPostContent = (post: core.Post.Model, club: core.Club.Model, link: string): RichContent => {
    const postInfo: RichContent = {
        name: post.title,
        photoURL: post.image.md,
        content: post.richContent.html,
        url: link,
        cta: 'View Post',
        club: BuildClubInfo(club),

    }
    return postInfo
}

/**
 * Builds a ConfirmationInfo object that can be used to build an email.
 * @param event The event for the email.
 * @param club The club for the email.
 */
export const BuildConfirmationContent = (reservation: core.Event.Reservation, event: core.Event.Model, group: core.Calendar.Group, club: core.Club.Model, url: string) => {
    let title: string
    let subtitle: string
    let info: string
    let icon: string

    var timeOptions = { hour: 'numeric', minute: 'numeric', timeZone: club.tzid }
    const time = new Date(event.start).toLocaleTimeString("en-US", timeOptions)

    var dayOptions = { weekday: 'long', month: 'long', day: 'numeric', timeZone: club.tzid };
    const day = new Date(event.start).toLocaleDateString("en-US", dayOptions)
    const participants = oc(reservation).participants.length(0)
    switch (group.name) {
        case core.Calendar.GroupName.TeeTimes:
            const golfers = participants > 1 ? 'golfers' : 'golfer'
            title = 'Tee Time Confirmation'
            subtitle = `Your Tee Time at ${club.name} has been confirmed.`
            info = `${reservation.participants.length} ${golfers} on ${day} at ${time}.`
            icon = constants.GolferEmoji
            break
        case core.Calendar.GroupName.Dining:
            const diners = participants > 1 ? 'diners' : 'diner'
            title = 'Dining Confirmation'
            subtitle = `Your dining reservation at ${club.name} has been confirmed.`
            info = `${reservation.participants.length} ${diners} on ${day} at ${time}.`
            icon = constants.DinnerEmoji
            break
        case core.Calendar.GroupName.Service:
            title = 'Vehicle Service Confirmation'
            subtitle = `Your vehicle service reservation at ${club.name} has been confirmed.`
            info = `${reservation.participants.length} vehicle on ${day} at ${time}.`
            icon = constants.RaceCarEmojiURL
            break
        default:
            title = 'Event Confirmation'
            subtitle = `Your RSVP for ${event.name} has been confirmed`
            info = `${event.name} takes place on ${day} at ${time}.`
            icon = constants.PartyEmoji
            break

    }

    const confirmationInfo: ConfirmationInfo = {
        title: title,
        subtitle: subtitle,
        icon: icon,
        info: info,
        url: url,
        club: BuildClubInfo(club)
    }
    return confirmationInfo
}


/**
 * Builds a ClubInfo object that can be used to build an email.
 * @param club The club for the email.
 */
export const BuildClubInfo = (club: core.Club.Model): ClubInfo => {
    const clubInfo: ClubInfo = {
        name: club.name,
        website: club.baseURL,
        shortName: club.shortName,
        baseURL: club.baseURL,
        logoURL: club.image.md,
        street: club.locations[0].address1,
        city: club.locations[0].city,
        state: club.locations[0].state,
        zip: club.locations[0].zip,
        unsubscribeURL: `${club.baseURL}/user/me`
    }
    return clubInfo
}