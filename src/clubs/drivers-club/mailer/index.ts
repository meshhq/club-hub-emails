// External Dependencies
import * as core from 'club-hub-core'

// Internal Dependencies
import * as templates from './templates'


//--------------------------------------------------
// ONBOARDING EMAILS
//--------------------------------------------------

export const buildEmailTemplate = 
async (message: core.Message.Model, user: core.User.Model, club: core.Club.Model, event: core.Event.Model, provider?: core.Calendar.Model, reservation?: core.Event.Reservation, form?: any, password?: string): Promise<string> => {
	const methodName = '[buildEmailTemplate] -'

	switch (message.templateID) {

		// RSVP Email.
		case core.Message.MessageType.createRSVP:
			return await buildRSVPEmail(user, event)
			break
		case core.Message.MessageType.unRSVP:
			return await sendMemberUnRSVPEmail(user, event)
			break
		case core.Message.MessageType.publicRSVP:
			return await sendPublicRSVPEmail(user, event, false)
			break

		// Form Emails.
		case core.Message.MessageType.memberApplication:
			return await sendMembershipApplicationEmail(user)
			break
		case core.Message.MessageType.memberInquiry:
			return await sendMembershipInquiryEmail(user)
			break
		case core.Message.MessageType.memberInquiryRes:
			return await sendMembershipInquiryResponseEmail(user)
			break
		case core.Message.MessageType.welcomeEmail:
			return await buildWelcomeEmail(user, club, user.password)
			break

		// Service Emails.
		case core.Message.MessageType.serviceRequest:
			return await buildServiceRequestEmail(user, provider, reservation)
			break
		
		default:
			throw new Error(`${methodName} received invalid email template ID of: ${message.templateID}`)
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
export const sendMembershipApplicationEmail = async (memberInfo: any): Promise<string> => {
	return templates.MembershipApplicationTemplate(memberInfo)
}

/**
 * Sends an email to the Drivers Club admin with membership inquiry information.
 * @param memberInfo Form information.
 */
export const sendMembershipInquiryEmail = async (memberInfo: any): Promise<string> => {
	return templates.MembershipInquiryTemplate(memberInfo)
}

/**
 * Sends a response email to perspective member letting them know their application is being reviewed.
 * @param memberInfo Form information.
 */
export const sendMembershipInquiryResponseEmail = async (memberInfo: any): Promise<string> => {
	return templates.MembershipInquiryResponseTemplate(memberInfo)
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
export const buildServiceRequestEmail = async (member: core.User.Model, provider: core.Calendar.Model, reservation: core.Event.Reservation): Promise<string> => {
	return templates.ServiceRequestTemplate(member, provider, reservation)
}

/**
 * Sends an email to an admin letting them know a member wants a service provider added.
 * @param provider Calendar model.
 */
export const sendProviderRequestEmail = async (provider: core.Calendar.Model): Promise<string> => {
	return templates.NewProviderTemplate(provider)
}

//--------------------------------------------------
// RSVP EMAIL
//--------------------------------------------------

/**
 * Sends an email to admin letting them know a member has RSVP'd.
 * @param member User model.
 * @param event Event model.
 */
export const buildRSVPEmail = async (member: core.User.Model, event: core.Event.Model): Promise<string> => {
	return templates.RsvpTemplate(member, event)
}

/**
 * Sends an email to DC admin letting them know a member has UnRsvp'd
 * @param member User model.
 * @param event Event model.
 */
export const sendMemberUnRSVPEmail = async (member: core.User.Model, event: core.Event.Model): Promise<string> => {
	const methodName = '[sendMemberUnRSVPEmail] -'
	return templates.UnRsvpTemplate(member, event)
}

/**
 * Sends an email to an admin with contact information 
 * for a public member that wants to RSVP for an event.
 * @param memberName string
 * @param memberEmail string
 * @param plusOne Boolean.
 * @param event Event model.
 */
export const sendPublicRSVPEmail = async (member: core.User.Model, event: core.Event.Model, plusOne: boolean,): Promise<string> => {
	return templates.PublicRsvpTemplate(member, event, plusOne)
}
