import * as core from 'club-hub-core'

import { EventInfo } from '../models/event'
import { RichContent } from '../models/rich'
import { ConfirmationInfo } from '../models/confirmation'
import { ClubInfo } from '../models/club'

/**
 * Builds a RichContent object for an email.
 * @param content The HTML content for the email.
 * @param club The club for the email.
 */
export const BuildGenericContent= (content: string, club: core.Club.Model): RichContent => {
    const richContent: RichContent = {
        content: content, 
        unsubscribeURL: "www.tryclubhub.com",
        club: BuildClubInfo(club)
    }
    return richContent
}

/**
 * Builds a RichContent object for an email.
 * @param event The event for the email.
 * @param club The club for the email.
 */
export const BuildEventContent = (event: core.Event.Model, club: core.Club.Model): EventInfo => {
    const date = new Date(event.start)
    var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var timeOptions = { hour: 'numeric', minute: 'numeric' };
    const richContent: EventInfo = {
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
        club: BuildClubInfo(club)
    }
    return richContent
}

/**
 * Builds a RichContent object for a post.
 * @param event The post for the email.
 * @param club The club for the email.
 */
export const BuildPostContent = (post: core.Post.Model, club: core.Club.Model): RichContent => {
    const postInfo: RichContent = {
        name: post.title,
        photoURL: post.imageURL,
        content: post.richContent.html,
        url: 'www.tryclubhub.com',
        cta: 'View Post',
        unsubscribeURL: 'www.tryclubhub.com',
        club: BuildClubInfo(club),

    }
    return postInfo
}

/**
 * Builds a ConfirmationInfo object that can be used to build an email.
 * @param event The event for the email.
 * @param club The club for the email.
 */
export const BuildConfirmationContent = (reservation: core.Event.Reservation, event: core.Event.Model, group: core.Calendar.CalendarGroup, club: core.Club.Model) => {
    let title: string 
    let subtitle: string
    let info: string
    let icon: string 

    var timeOptions = { hour: 'numeric', minute: 'numeric' }
    const time = event.start.toLocaleDateString("en-US", timeOptions)

    var dayOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    const day = event.start.toLocaleDateString("en-US", dayOptions)
    
    if (group.name === core.Calendar.CalendarGroupName.Golf) {
        title = 'Tee Time Confirmation'
        subtitle = `Your tee time at ${club.name} has been confirmed.`
        info = `${reservation.participants.length} golfers on ${day} at ${time}.`
        icon = 'fas fa-golf-ball'
    } else if (group.name === 'Dining Room') {
        title = 'Dining Confirmation'
        subtitle = `Your dining reservation at ${club.name} has been confirmed.`
        info = `${reservation.participants.length} diners on ${day} at ${time}.`
        icon = 'fas fa-utensils'
    } else if (group.name === 'Service Providers') {
        title = 'Vehicle Service Confirmation'
        subtitle = `Your vehicle service reservation with ${club.name} has been confirmed.`
        info = `${reservation.participants.length} vehicle on ${day} at ${time}.`
        icon = 'fas fa-car'
    }
    
    const confirmationInfo: ConfirmationInfo = {
        title: title,
        subtitle: subtitle,
        icon: icon,
        info: info,
        url: 'www.tryclubhub.com',
        unsubscribeURL: 'www.tryclubhub.com',
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
        domain: club.domain,
        logoURL: club.photoURL,
        street: club.locations[0].address1,
        city: club.locations[0].city,
        state: club.locations[0].state,
        zip: club.locations[0].zip,
    }
    return clubInfo
}