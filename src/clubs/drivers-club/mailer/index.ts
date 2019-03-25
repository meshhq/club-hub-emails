// External Dependencies
import * as core from 'club-hub-core'

// Internal Dependencies
import * as templates from './templates'

/**
 * Returns email templates for an Event type message.
 * @param message Message document.
 * @param user User document.
 * @param event Event document.
 */
export const buildEventEmails = async (message: core.Message.Model, club: core.Club.Model, user: core.User.Model, event: core.Event.Model): Promise<string> => {
	const methodName = '[buildEventEmails] -'

	switch(message.content.type) {
		case core.Message.Type.Rsvp:
			return await buildRSVPEmail(user, event, club)
		case core.Message.Type.UnRsvp:
			return await sendMemberUnRSVPEmail(user, event, club)
		default:
			throw new Error(`${methodName} received an unsupported message type: ${message.content.type}`)
	}
}

/**
 * Returns an email template for an Onboarding type message.
 * @param message Message document.
 * @param user Requesting user.
 * @param club Club document.
 * @param password Temporary login password.
 * 
 */
export const buildOnboardingEmail = async (message: core.Message.Model, user: core.User.Model, club: core.Club.Model, password: string): Promise<string> => {
	const methodName = '[buildOnboardingEmail] -'

	switch(message.content.type) {
		case core.Message.Type.Welcome:
			return await buildWelcomeEmail(user, club, password)
		default:
			throw new Error(`${methodName} received an unsupported message type: ${message.content.type}`)
	}
}

/**
 * Returns an email template for a Form type message.
 * @param message Message document.
 * @param user Requesting user.
 * @param club Club document.
 * @param form The form submitted by the user.
 */
export const buildFormEmail = async (message: core.Message.Model, club: core.Club.Model, form: any, event?: core.Event.Model): Promise<string> => {
	const methodName = '[buildFormEmail] -'

	switch (message.content.type) {
		case core.Message.Type.Application:
			return await sendMembershipApplicationEmail(form, club)
		case core.Message.Type.MembershipInquiry:
			return await sendMembershipInquiryEmail(form, club)
		case core.Message.Type.MembershipInquiryRes:
			return await sendMembershipInquiryResponseEmail(form, club)
		case core.Message.Type.PublicRsvp:
			return await sendPublicRSVPEmail(event, form, club)
		case core.Message.Type.NewProviderRequest:
			return await sendProviderRequestEmail(form, club)
		default:
			throw new Error(`${methodName} received an unsupported message type: ${message.content.type}`)
	}
}

/**
 * Returns an email template for Service a service type message.
 * @param message Message document.
 * @param user 
 * @param provider 
 * @param reservation 
 */
export const buildServiceEmails = async (message: core.Message.Model, club: core.Club.Model, user: core.User.Model, provider: core.Calendar.Model, event: core.Event.Model, reservation?: core.Event.Reservation): Promise<string> => {
	const methodName = '[buildServiceEmails] -'

	switch (message.content.type) {
		case core.Message.Type.ServiceRequest:
			return buildServiceRequestEmail(user, provider, event, reservation, club)
		case core.Message.Type.NewProviderRequest:
			return sendProviderRequestEmail(provider, club)
		default:
			throw new Error(`${methodName} received an unsupported message type: ${message.content.type}`)
	}
}

/**
 * Sends a welcome email to a new member with temp password and login details.
 */
export const buildWelcomeEmail = async (member: core.User.Model, club: core.Club.Model, password: string): Promise<string> => {
	return templates.WelcomeEmailTemplate(member, club, password)
}

/**
 * Sends an email to the drivers club admin with the new member application info.
 * @param memberInfo Form information.
 */
export const sendMembershipApplicationEmail = async (memberInfo: any, club: core.Club.Model): Promise<string> => {
	return (club.name === core.Constants.Clubs.DRIVERS_CLUB) ?
		templates.DcMembershipApplicationTemplate(memberInfo, club) :
		templates.OttoMembershipApplicationTemplate(memberInfo, club)
}

/**
 * Sends an email to the Drivers Club admin with membership inquiry information.
 * @param memberInfo Form information.
 */
export const sendMembershipInquiryEmail = async (memberInfo: any, club: core.Club.Model): Promise<string> => {
	return templates.MembershipInquiryTemplate(memberInfo, club)
}

/**
 * Sends a response email to perspective member letting them know their application is being reviewed.
 * @param memberInfo Form information.
 */
export const sendMembershipInquiryResponseEmail = async (memberInfo: any, club: core.Club.Model): Promise<string> => {
	return templates.MembershipInquiryResponseTemplate(memberInfo, club)
}

//--------------------------------------------------
// SERVICE EMAILS
//--------------------------------------------------

/**
 * Notifies admin and provider that a new service request has been created.
 * @param member User model.
 * @param provider Calendar model.
 * @param reservation Reservation model (sub document of the event model).
 * 
 */
export const buildServiceRequestEmail = async (member: core.User.Model, provider: core.Calendar.Model, event: core.Event.Model, reservation: core.Event.Reservation, club: core.Club.Model): Promise<string> => {
	return templates.ServiceRequestTemplate(member, provider, event, reservation, club)
}

/**
 * Sends an email to an admin letting them know a member wants a service provider added.
 * @param provider Calendar model.
 */
export const sendProviderRequestEmail = async (form: any, club: core.Club.Model): Promise<string> => {
	return templates.NewProviderTemplate(form, club)
}

//--------------------------------------------------
// RSVP EMAIL
//--------------------------------------------------

/**
 * Sends an email to admin letting them know a member has RSVP'd.
 * @param member User model.
 * @param event Event model.
 */
export const buildRSVPEmail = async (member: core.User.Model, event: core.Event.Model, club: core.Club.Model): Promise<string> => {
	return templates.RsvpTemplate(member, event, club)
}

/**
 * Sends an email to DC admin letting them know a member has UnRsvp'd
 * @param member User model.
 * @param event Event model.
 */
export const sendMemberUnRSVPEmail = async (member: core.User.Model, event: core.Event.Model, club: core.Club.Model): Promise<string> => {
	const methodName = '[sendMemberUnRSVPEmail] -'
	return templates.UnRsvpTemplate(member, event, club)
}

/**
 * Sends an email to an admin with contact information 
 * for a public member that wants to RSVP for an event.
 * @param memberName string
 * @param memberEmail string
 * @param plusOne Boolean.
 * @param event Event model.
 */
export const sendPublicRSVPEmail = async (event: core.Event.Model, form: any, club: core.Club.Model): Promise<string> => {
	return templates.PublicRsvpTemplate(event, form, club)
}
