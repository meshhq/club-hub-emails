import * as core from 'club-hub-core'

import { RichContent } from '../models/rich'
import { ConfirmationInfo } from '../models/confirmation'
import { AddressInfo } from '../models/club'
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
        clubInfo: BuildClubInfo(club)
    }
    return richContent
}

/**
 * Builds a RichContent object for an email.
 * @param event The event for the email.
 * @param club The club for the email.
 */
export const BuildEventContent = (event: core.Event.Model, club: core.Club.Model): RichContent => {
    const richContent: RichContent = {
        name: event.name,
        imageURL: event.photoURL,
        content: event.description, 
        url: 'www.tryclubhub.com',
        cta: 'View Event',
        unsubscribeURL: "www.tryclubhub.com",
        clubInfo: BuildClubInfo(club)
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
        imageURL: post.imageURL,
        content: post.html,
        url: 'www.tryclubhub.com',
        cta: 'View Post',
        unsubscribeURL: "www.tryclubhub.com",
        clubInfo: BuildClubInfo(club),

    }
    return postInfo
}

/**
 * Builds a ConfirmationInfo object that can be used to build an email.
 * @param event The event for the email.
 * @param club The club for the email.
 */
export const BuildConfirmationContent = (event: core.Event.Model, club: core.Club.Model) => {
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