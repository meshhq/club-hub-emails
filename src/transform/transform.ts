import * as core from 'club-hub-core'

import { EventInfo } from '../models/event'
import { ConfirmationInfo } from '../models/confirmation'
import { AddressInfo } from '../models/club'
import { ClubInfo } from '../models/club'

/**
 * Builds an EventInfo object that can be used to build an email.
 * @param event The event for the email.
 * @param club The club for the email.
 */
export const BuildEventInfo = (event: core.Event.Model, club: core.Club.Model) => {
    const eventInfo: EventInfo = {
        name: event.name,
        imageURL: event.photoURL,
        content: event.description, 
        url: 'www.tryclubhub.com',
        unsubscribeURL: "www.tryclubhub.com",
        clubInfo: BuildClubInfo(club)
    }
    return eventInfo
}

/**
 * Builds a ConfirmationInfo object that can be used to build an email.
 * @param event The event for the email.
 * @param club The club for the email.
 */
export const BuildConfirmationInfo = (event: core.Event.Model, club: core.Club.Model) => {
    const confirmationInfo: ConfirmationInfo = {
        title: event.name,
        subtitle: "",
        info: "",
        url: 'www.tryclubhub.com',
        unsubscribeURL: "www.tryclubhub.com",
        clubInfo: BuildClubInfo(club)
    }
    return confirmationInfo
}

/**
 * Builds a ClubInfo object that can be used to build an email.
 * @param club The club for the email.
 */
export const BuildClubInfo = (club: core.Club.Model) => {
    const addressInfo: AddressInfo = {
        street: club.locations[0].address1,
        city: club.locations[0].city,
        state: club.locations[0].state,
        zip: club.locations[0].zip,
    }

    const clubInfo: ClubInfo = {
        name: club.name,
        domain: club.domain,
        logoURL: club.photoURL,
        address: addressInfo
    }
    return clubInfo
}