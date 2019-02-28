import * as core from 'club-hub-core'
import { Model } from 'mongoose';


//------------------------------------------------------
// ONBOARDING TEMPLATES
//------------------------------------------------------

const welcomeEmailTemplate = (member: core.User.Model, club: core.Club.Model, password: string) => {
    const message = `
		<p>Hi ${member.firstName} and welcome to Drivers Club!

		<p>Your new Drivers Club account has been created. This gives you access to the Drivers Club web and mobile apps!</p>

		<p>Please follow the url: ${club.domain} to login. Your username is: ${member.email}, your temporary password is: ${password}.</p>
			
		<p>To change your password, please use the "Forgot Password" link on the login screen. An email will then be sent to you with instructions on resetting the password.</p>

		<p>Please send an email to info@drivers.club if you have any questions!</p>

		<p>Best,</p> 

		<p>The Drivers Club team.</p>
	`
    return message
}

const membershipApplicationTemplate = (memberInfo: any) => {
    const message = `
		<p> Hi there!</p>

		<p>A prospective member has completed the new member request form. Details below:</p>

		<p style='font-weight:bold; display:inline;'>Member Info</p>
		<ul>
			<li>
				${bulletLine('Name:', memberInfo.name)}
			</li>
			<li>
				${bulletLine('Company', memberInfo.company)}
			</li>
			<li>
				${bulletLine('Address',memberInfo.address)}
			</li>
			<li>
				${bulletLine('Address', memberInfo.addressTwo)}
			</li>
			<li>
				${bulletLine('Address', `${memberInfo.city} ${memberInfo.state} ${memberInfo.zip}`)}
			</li>
			<li>
				${bulletLine('Email', memberInfo.email)}
			</li>
			<li>
				${bulletLine('Phone', memberInfo.phoneNumber)}
			</li>
			<li>
				${bulletLine('Social', memberInfo.socialMedia)}
			</li>
			<li>
				${bulletLine('Automotive Passion', memberInfo.automotivePassion)}
			</li>
			<li>
				${bulletLine('Referral', memberInfo.referral)}
			</li>
			<li>
				${bulletLine('Car Showcase', memberInfo.carShowcase)}
			</li>
			<li>
				${bulletLine('Plan', memberInfo.membershipPlan)}
			</li>
			<li>
				${bulletLine('Membership Type', `${memberInfo.membershipType}`)}
			</li>
		</ul>

		<p>Thanks,</p>

		<p>Your friends at Drivers Club</p>
	`
    return message
}

const membershipInquiryTemplate = (memberInfo: any) => {
    const message = `
		<p> Hi there!</p>

		<p>A prospective member has completed the membership inquiry form. Details below:</p>

		<p style='font-weight:bold; display:inline;'>Member Info</p>
		<ul>
			<li>
				${bulletLine('Name:', `${memberInfo.firstName} ${memberInfo.lastName}`)}
			</li>
			<li>
				${bulletLine('Email', memberInfo.email)}
			</li>
			<li>
				${bulletLine('Desired Membership', memberInfo.membership)}
			</li>
		</ul>

		<p>Thanks,</p>

		<p>Your friends at Drivers Club</p>
	`
    return message
}

const membershipInquiryResponseTemplate = (memberFormInfo: any) => {
    const message = `
		<p>Dear ${memberFormInfo.firstName},</p>

		<p>Thank you for contacting Drivers Club regarding ${memberFormInfo.membership} membership!</p>

		<p>We would like to learn more about your automotive passions.</p>

		<p>Please click <a href="https://app.drivers.club/application">this link</a> to begin the formal application process.</p>

		<p>Sincerely,</p>

		<p>Amanda Friedman</p>
		<p>General Manager</p>
	`
    return message
}

//------------------------------------------------------
// RSVP TEMPLATES
//------------------------------------------------------

const rsvpTemplate = (member: core.User.Model, event: core.Event.Model) => {
    const fullName = `${member.firstName} ${member.lastName}`
	const message = `
		<p> Hi there!</p>

		<p>A Drivers Club member has RSVP'd to an event. Details below:</p>

		<p style='font-weight:bold; display:inline;'>Member Info</p>
		<ul>
			<li>
				${bulletLine('Name:', fullName)}
			</li>
			<li>
				${bulletLine('Email:', member.email)}
			</li>
			<li>
				${bulletLine('Phone:', member.phone)}
			</li>
		</ul>

		<p style='font-weight:bold; display:inline;'>Event Info</p>
		<ul>
			<li>
				${bulletLine('Event:', event.name)}
			</li>
			<li>
				${bulletLine('ID', event._id.toString())}
			</li>
		</ul>
			
		<p>Thanks,</p>

		<p>Your friends at Drivers Club</p>
	`
    return message
}

const unRsvpTemplate = (member: core.User.Model, event: core.Event.Model) => {
	// Format the members name.
	const fullName = `${member.firstName} ${member.lastName}`
	const eventPrice = (event.price) ? event.price.toString() : 'Free'
	
	const message = `
		<p> Hi there!</p>

		<p>A Drivers Club member has cancelled their RSVP to an event. Details below:</p>

		<p style='font-weight:bold; display:inline;'>Member Info</p>
		<ul>
			<li>
				${bulletLine('Name:', fullName)}
			</li>
			<li>
				${bulletLine('Email:', member.email)}
			</li>
			<li>
				${bulletLine('Phone:', member.phone)}
			</li>
		</ul>

		<p style='font-weight:bold; display:inline;'>Event Info</p>
		<ul>
			<li>
				${bulletLine('Event:', event.name)}
			</li>
			<li>
				${bulletLine('Price', eventPrice)}
			</li>
			<li>
				${bulletLine('ID', event._id.toString())}
			</li>
		</ul>
			
		<p>Thanks,</p>

		<p>Your friends at Drivers Club</p>
	`
    return message
}

const publicRsvpTemplate = (member: core.User.Model, event: core.Event.Model, plusOne: boolean) => {
	// Format the members name.
	const fullName = `${member.firstName} ${member.lastName}`
	const plusOneText = plusOne ? 'Yes' : 'No'
	const eventPrice = (event.price) ? event.price.toString() : 'Free'
	
	const message = `
		<p> Hi there!</p>

		<p>A public person has RSVP'd to an event. Details below:</p>

		<p style='font-weight:bold; display:inline;'>Member Info</p>
		<ul>
			<li>
				${bulletLine('Name:', fullName)}
			</li>
			<li>
				${bulletLine('Email:', member.email)}
			</li>
			<li>
				${bulletLine('Plus One:', plusOneText)}
			</li>
		</ul>

		<p style='font-weight:bold; display:inline;'>Event Info</p>
		<ul>
			<li>
				${bulletLine('Event:', event.name)}
			</li>
			<li>
				${bulletLine('Price', eventPrice)}
			</li>
			<li>
				${linkLine('Event', event._id.toString())}
			</li>
		</ul>
			
		<p>Thanks,</p>

		<p>Your friends at Drivers Club</p>
	`
    return message
}

//------------------------------------------------------
// SERVICE TEMPLATES
//------------------------------------------------------

const serviceRequestTemplate = (member: core.User.Model, provider: core.Calendar.Model, reservation: core.Event.Reservation) => {
	// Format the members name.
	const fullName = `${member.firstName} ${member.lastName}`

	// Grab the vehicle information.
	const reservationMeta = reservation.meta as core.Event.CarReservationMeta
	const vehicle = member.meta.car.vehicles.find((vehicle: core.SubModels.CarMeta.Vehicle) => vehicle._id.toString() === reservationMeta.vehicleID.toString())
	
	// Format the date.
	const date = new Date() // TODO: Add in date logic.

    const message = `
		<p> Hi there!</p>

		<p>A Drivers Club member has submitted a new service request. Details below:</p>

		<p style='font-weight:bold; display:inline;'>Provider Info</p>
		<ul>
			<li>
				${bulletLine('Name:', provider.name)}
			</li>
			<li>
				${bulletLine('Email', provider.location.email)}
			</li>
			<li>
				${bulletLine('Phone', provider.location.phone)}
			</li>
		</ul>

		<p style='font-weight:bold; display:inline;'>Member Info</p>
		<ul>
			<li>
				${bulletLine('Name:', fullName)}
			</li>
			<li>
				${bulletLine('Email', member.email)}
			</li>
			<li>
				${bulletLine('Phone', member.phone)}
			</li>
		</ul>

		<p style='font-weight:bold; display:inline;'>Service Info</p>
		<ul>
			<li>
				${bulletLine('Vehicle:', vehicle.model)}
			</li>
			<li>
				${bulletLine('Date', date.toString())}
			</li>
			<li>
				${bulletLine('Notes',  reservation.meta.notes)}
			</li>
		</ul>
			
		<p>Thanks,</p>

		<p>Your friends at Drivers Club</p>
	`
    return message
}

const newProviderTemplate = (provider: core.Calendar.Model) => {
    const message = `
		<p> Hi there!</p>

		<p>A member has submitted a request to add a new Drivers Club provider. Details below:</p>

		<p style='font-weight:bold; display:inline;'>Provider Info</p>
		<ul>
			<li>
				${bulletLine('Name:', provider.name)}
			</li>
			<li>
				${bulletLine('Contact', provider.location.contactName)}
			</li>
			<li>
				${bulletLine('Email',provider.location.email)}
			</li>
			<li>
				${bulletLine('Phone', provider.location.phone)}
			</li>
			<li>
				${bulletLine('Street', provider.location.address1)}
			</li>
			<li>
				${bulletLine('City', provider.location.city)}
			</li>
			<li>
				${bulletLine('State', provider.location.state)}
			</li>
			<li>
				${bulletLine('Zip', provider.location.zip)}
			</li>
		</ul>

		<p>Thanks,</p>

		<p>Your friends at Drivers Club</p>
	`
    return message
}

//------------------------------------------------------
// TEMPLATE HELPERS
//------------------------------------------------------

const bulletLine = (boldText: string, text: string): string => {
    return `<p style='font-weight:bold; display:inline;'>${boldText}</p> <p style='display:inline;'>${text}</p>`
}

const linkLine = (boldText: string, id: string): string => {
    return `<p style='font-weight:bold; display:inline;'>${boldText}</p> <a href="app.drivers.club/events/${id}" style='display:inline;'>Event Link</a>`
}

const regularText = (text: string): string => {
    return `<p>${text}</p>`
}

export {rsvpTemplate as RsvpTemplate}
export {publicRsvpTemplate as PublicRsvpTemplate}
export {unRsvpTemplate as UnRsvpTemplate}
export {serviceRequestTemplate as ServiceRequestTemplate}
export {membershipApplicationTemplate as MembershipApplicationTemplate}
export {newProviderTemplate as NewProviderTemplate}
export {welcomeEmailTemplate as WelcomeEmailTemplate}
export {membershipInquiryTemplate as MembershipInquiryTemplate}
export {membershipInquiryResponseTemplate as MembershipInquiryResponseTemplate}
