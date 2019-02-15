import * as fs from 'fs'
import * as Handlebars from 'handlebars'
import * as core from 'club-hub-core'

// Transform 
import * as transform from './transform/transform'

// Models
import { EventInfo } from './models/event'
import { ConfirmationInfo } from './models/confirmation'

/**
 * Compiles a new event email.
 * @param event The ClubHub event for the email. 
 * @param club The ClubHub club to which the email is associated.
 */
export const CompileEventEmail = (event: core.Event.Model, club: core.Club.Model): Promise<string> => {
    // Transform our event Info
    const eventInfo: EventInfo = transform.BuildEventInfo(event, club)

    // Compile the template and return the promise.
    const path: string = `${__dirname}/templates/event.html`
    return CompileEmail(path, eventInfo)
}

/**
 * Compiles a new event email.
 * @param event The ClubHub event for the email. 
 * @param club The ClubHub club to which the email is associated.
 */
export const CompileConfirmationEmail = (event: core.Event.Model, club: core.Club.Model): Promise<string> => {
    // Transform our event Info
    const confirmationInfo: ConfirmationInfo = transform.BuildConfirmationInfo(event, club)

    // Compile the template and return the promise.
    const path: string = `${__dirname}/templates/confirmation.html`
    return CompileEmail(path, confirmationInfo)
}

/**
 * Compiles an email at the supplied path with the supplied data. 
 * @param path The path of the email template. 
 * @param data The data to compile.
 */
const CompileEmail = (path: string, data: any): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(path, {encoding: 'utf8'}, (err: NodeJS.ErrnoException, data: string) => {
            if (err) {
                return reject(err)
            }
            const template = Handlebars.compile(data);
            resolve(template(data))
        })    
    });
}
