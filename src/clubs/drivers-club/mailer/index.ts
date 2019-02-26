import * as core from 'club-hub-core'

import * as templates from './templates'


/**
 * Sends a welcome email to a new member with temp password and signin details.
 * @param mailOptions SendMailOptions.
 */
export const buildWelcomeEmail = (member: core.User.Model, club: core.Club.Model, password: string): string => {
	return templates.WelcomeEmailTemplate(member, club, password)
}

/**
 * Sends an email to specified member's.
 * @param mailOptions SendMailOptions.
 */
export const buildRSVPEmail = (member: core.User.Model, event: core.Event.Model): string => {
	return templates.RsvpTemplate(member, event)
}

//--------------------------------------------------
// SERVICE EMAILS
//--------------------------------------------------

// /**
//  * Notifies admin and provider that a new service request has been created.
//  * @param mailOptions SendMailOptions.
//  */
// export const buildServiceRequestEmail = (member: core.User.Model, provider: core.Calendar.Model, reservation: core.Event.Reservation): string => {
// 	return templates.ServiceRequestTemplate(member, provider, reservation)
// }

// //--------------------------------------------------
// // RSVP EMAIL
// //--------------------------------------------------

// /**
//  * Sends an email to specified member's.
//  * @param mailOptions SendMailOptions.
//  */
// export const sendMemberUnRSVPEmail = (member: core.User.Model, event: core.Event.Model): string => {
// 	const methodName = '[sendMemberUnRSVPEmail] -'
// 	return templates.UnRsvpTemplate(member, event)
// }

/**
 * Sends an email to an admin with contact information 
 * for a public member that wants to RSVP for an event.
 * @param mailOptions SendMailOptions.
 */
export const sendPublicRSVPEmail = (memberName: string, memberEmail: string, plusOne: boolean, event: any): string => {
	return templates.PublicRsvpTemplate(memberName, memberEmail, plusOne, event)
}

/**
 * Sends an email to specified member's.
 * @param mailOptions SendMailOptions.
 */
export const sendProviderRequestEmail = (provider: core.Calendar.Model): string => {
	return templates.NewProviderTemplate(provider)
}

// /**
//  * Sends an email to the drivers club admin with the new member info.
//  * @param mailOptions SendMailOptions.
//  */
// export const sendMembershipApplicationEmail = (memberInfo: ApplicationInformation): Promise<void> => {
// 	return templates.MembershipApplicationTemplate(memberInfo)
// }

// /**
//  * Sends an email to the Drivers Club admin with membership inquiry information.
//  * @param mailOptions SendMailOptions.
//  */
// export const sendMembershipInquiryEmail = (memberInfo: MemberInquiryForm): Promise<void> => {
// 	return templates.MembershipInquiryTemplate(memberInfo)
// }

// export const sendMembershipInquiryResponseEmail = (memberInfo: MemberInquiryForm) => {
// 	return templates.MembershipInquiryResponseTemplate(memberInfo)
// }