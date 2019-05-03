// External Dependencies.
import * as fs from 'fs'
import * as Handlebars from 'handlebars'
import * as core from 'club-hub-core'
import * as JSDOM from 'jsdom'

// Drivers Club Specific Emails.
import * as CarClub from './clubs/dc-otto/mailer/index'
export { CarClub }

// Models
import { EventInfo } from './models/event';
import { RichContent } from './models/rich'

import { ConfirmationInfo } from './models/confirmation'
export { ConfirmationInfo }

// Transform 
import * as transform from './transform/transform'
export { transform }

import * as constants from './transform/constants'
import { WelcomeContent } from './models/welcome';
export { constants } 


/**
 * Compiles a new event email.
 * @param event The ClubHub event for the email. 
 * @param club The ClubHub club to which the email is associated.
 */
export const CompileGenericEmail = (content: string, club: core.Club.Model): Promise<string> => {
    // Transform our event Info
    const eventInfo: RichContent = transform.BuildGenericContent(content, club)

    // Compile the template and return the promise.
    const path: string = `${__dirname}/templates/generic.html`
    return CompileEmail(path, eventInfo, club)
}

/**
 * Compiles a new event email.
 * @param event The ClubHub event for the email. 
 * @param club The ClubHub club to which the email is associated.
 * @param link The ClubHub club to which the email is associated.
 */
export const CompileEventEmail = (event: core.Event.Model, club: core.Club.Model, link: string): Promise<string> => {
    // Transform our event Info
    const eventInfo: EventInfo = transform.BuildEventContent(event, club, link)
    
    // Compile the template and return the promise.
    const path: string = `${__dirname}/templates/event.html`
    return CompileEmail(path, eventInfo, club)
}

/**
 * Compiles a new event email.
 * @param event The ClubHub post for the email. 
 * @param club The ClubHub club to which the email is associated.
 */
export const CompilePostEmail = (post: core.Post.Model, club: core.Club.Model, link: string): Promise<string> => {
    // Transform our post Info
    const postInfo: RichContent = transform.BuildPostContent(post, club, link)

    // Compile the template and return the promise.
    const path: string = `${__dirname}/templates/post.html`
    return CompileEmail(path, postInfo, club)
}

/**
 * Compiles a new event email.
 * @param event The ClubHub event for the email. 
 * @param club The ClubHub club to which the email is associated.
 */
export const CompileConfirmationEmail = (reservation: core.Event.Reservation, event: core.Event.Model, group: core.Calendar.Group, club: core.Club.Model, url: string): Promise<string> => {
    // Transform our event Info
    const confirmationInfo: ConfirmationInfo = transform.BuildConfirmationContent(reservation, event, group, club, url)
    
    // Compile the template and return the promise.
    const path: string = `${__dirname}/templates/confirmation.html`
    return CompileEmail(path, confirmationInfo, club)
}

/**
 * Compiles a new welcome email.
 * @param event The ClubHub user for the email. 
 * @param club The ClubHub club to which the email is associated.
 */
export const CompileWelcomeEmail = (user: core.User.Model, club: core.Club.Model, inviteLink: string): Promise<string> => {
    // Transform our event Info
    const welcomeInfo: WelcomeContent = transform.BuildWelcomeContent(user, club, inviteLink)
    
    // Compile the template and return the promise.
    const path: string = `${__dirname}/templates/welcome.html`
    return CompileEmail(path, welcomeInfo, club)
}


export const CompileServiceEmail = (info: ConfirmationInfo, club: core.Club.Model) => {
    // Compile the template and return the promise.
    const path: string = `${__dirname}/templates/confirmation.html`
    return CompileEmail(path, info, club)
}

/**
 * Compiles an email at the supplied path with the supplied data. 
 * @param path The path of the email template. 
 * @param data The data to compile.
 */
const CompileEmail = (path: string, info: any, club: core.Club.Model): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(path, {encoding: 'utf8'}, (err: NodeJS.ErrnoException, data: string) => {
            if (err) {
                return reject(err)
			}
			try {
                // Replace color values. 
                const primaryUpdated = data.replace("var(--primary-color)", club.clubSettings.primaryColor);
                const secondaryUpdated = primaryUpdated.replace("var(--secondary-color)", club.clubSettings.secondaryColor);
                const template = Handlebars.compile(secondaryUpdated);
				resolve(template(info))
			} catch (e) {
				reject(e)
			}
        })    
    });
}
