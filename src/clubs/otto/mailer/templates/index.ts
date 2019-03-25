import * as Factory from 'factory'
import * as Faker from 'faker'
import { Event, Member, ServiceData, Service } from '../../firebase/types'
import { dateFromTimestamp, DateInterface } from '../../helpers/dateHelper'
import {NewMemberRegistrationForm, NewProviderInfo, ApplicationInformation, MemberInquiryForm, VehicleInfo} from '../../interfaces/firebase'
import { DRIVERS_CLUB_WEB_URL } from '../../constants'

//------------------------------------------------------
// NEW RSVP TEMPLATE
//------------------------------------------------------

const membershipInquiryTemplate = (memberInfo: MemberInquiryForm) => {
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
				${bulletLine('Desired Membership', memberInfo.membership.label)}
			</li>
		</ul>
		<p>Thanks,</p>
		<p>Your friends at Otto Car Club</p>
		`
	return message
}

const membershipInquiryResponseTemplate = (memberInfo: MemberInquiryForm) => {
    const message = `
		<p>Dear ${memberInfo.firstName},</p>
		<p>Thank you for contacting Otto Car Club regarding ${memberInfo.membership} membership!</p>
		<p>We would like to learn more about your automotive passions.</p>
		<p>Please click <a href="https://app.ottocarclub.com/application">this link</a> to begin the formal application process.</p>
		<p>Sincerely,</p>
		<p>Amanda Friedman</p>
		<p>General Manager</p>
		`
	return message
}

const rsvpTemplate = (member: Member, event: Event) => {
    const fullName = `${member.firstName} ${member.lastName}`
	const message = `
		<p> Hi there!</p>
		<p>A Otto Car Club member has RSVP'd to an event. Details below:</p>
		<p style='font-weight:bold; display:inline;'>Member Info</p>
		<ul>
			<li>
				${bulletLine('Name:', fullName)}
			</li>
			<li>
				${bulletLine('Email:', member.email)}
			</li>
			<li>
				${bulletLine('Phone:', member.phoneNumber)}
			</li>
		</ul>
		<p style='font-weight:bold; display:inline;'>Event Info</p>
		<ul>
			<li>
				${bulletLine('Event:', event.name)}
			</li>
			<li>
				${bulletLine('Price', event.price)}
			</li>
			<li>
				${bulletLine('ID', event.id)}
			</li>
		</ul>
			
		<p>Thanks,</p>
		<p>Your friends at Otto Car Club</p>
		`
    return message
}

const unRsvpTemplate = (member: Member, event: Event) => {
    const fullName = `${member.firstName} ${member.lastName}`
	const message = `
		<p> Hi there!</p>
		<p>A Otto Car Club member has cancelled their RSVP to an event. Details below:</p>
		<p style='font-weight:bold; display:inline;'>Member Info</p>
		<ul>
			<li>
				${bulletLine('Name:', fullName)}
			</li>
			<li>
				${bulletLine('Email:', member.email)}
			</li>
			<li>
				${bulletLine('Phone:', member.phoneNumber)}
			</li>
		</ul>
		<p style='font-weight:bold; display:inline;'>Event Info</p>
		<ul>
			<li>
				${bulletLine('Event:', event.name)}
			</li>
			<li>
				${bulletLine('Price', event.price)}
			</li>
			<li>
				${bulletLine('ID', event.id)}
			</li>
		</ul>
			
		<p>Thanks,</p>
		<p>Your friends at Otto Car Club</p>
		`
    return message
}

const serviceRequestTemplate = (serviceData: ServiceData) => {
    const fullName = `${serviceData.member.firstName} ${serviceData.member.lastName}`
    const date: DateInterface = dateFromTimestamp(serviceData.service.date)
    const message = `
		<p> Hi there!</p>
		<p>A Otto Car Club member has submitted a new service request. Details below:</p>
		<p style='font-weight:bold; display:inline;'>Provider Info</p>
		<ul>
			<li>
				${bulletLine('Name:', serviceData.provider.companyName)}
			</li>
			<li>
				${bulletLine('Email', serviceData.provider.email)}
			</li>
			<li>
				${bulletLine('Phone', serviceData.provider.phoneNumber)}
			</li>
		</ul>
		<p style='font-weight:bold; display:inline;'>Member Info</p>
		<ul>
			<li>
				${bulletLine('Name:', fullName)}
			</li>
			<li>
				${bulletLine('Email', serviceData.member.email)}
			</li>
			<li>
				${bulletLine('Phone', serviceData.member.phoneNumber)}
			</li>
		</ul>
		<p style='font-weight:bold; display:inline;'>Service Info</p>
		<ul>
			<li>
				${bulletLine('Vehicle:', serviceData.vehicle.model)}
			</li>
			<li>
				${bulletLine('Vin:', serviceData.vehicle.vin)}
			</li>
			<li>
				${bulletLine('Date', date.fullDate)}
			</li>
			<li>
				${bulletLine('Notes', serviceData.service.notes)}
			</li>
		</ul>
			
		<p>Thanks,</p>
		<p>Your friends at Otto Car Club</p>
		`
    return message
}

const membershipApplicationTemplate = (memberInfo: ApplicationInformation) => {
    const message = `
		<p> Hi there!</p>
		<p>A prospective member has completed the new member request form. Details below:</p>
		<p style='font-weight:bold; display:inline;'>Member Info</p>
		<ul>
			<li>
				${bulletLine('Name:', `${memberInfo.firstName} ${memberInfo.lastName}`)}
			</li>
			<li>
				${bulletLine('Occupation', memberInfo.occupation)}
			</li>
			<li>
				${bulletLine('Date of birth', memberInfo.dob)}
			</li>
			<li>
				${bulletLine('Gender', memberInfo.gender)}
			</li>
			<li>
				${bulletLine('Address', `${memberInfo.city} ${memberInfo.state} ${memberInfo.zip}`)}
			</li>
			<li>
				${bulletLine('Email', memberInfo.email)}
			</li>
			<li>
				${bulletLine('Phone', memberInfo.phone)}
			</li>
			<li>
				${bulletLine('Referral', memberInfo.referral)}
			</li>
			<li>
				${bulletLine('Favorite automotive activity', memberInfo.activity)}
			</li>
			<li>
				${bulletLine('Membership type', memberInfo.membershipType)}
			</li>
			<li>
				${bulletLine('Member spends free time doing', memberInfo.freeTime)}
			</li>
			<li>
				${bulletLine('Additional memberships', `${memberInfo.otherMemberships}`)}
			</li>
			<li>
				${bulletLine('Additional member information', `${memberInfo.otherInfo}`)}
			</li>
		</ul>
		<div>
			Vehicle List:
			${buildVehicleList(memberInfo.vehicles)}
		</div>
		<p>Thanks,</p>
		<p>Your friends at Otto Car Club</p>
		`
    return message
}

const newProviderTemplate = (provider: NewProviderInfo) => {
    const message = `
		<p> Hi there!</p>
		<p>A member has submitted a request to add a new Otto Car Club provider. Details below:</p>
		<p style='font-weight:bold; display:inline;'>Provider Info</p>
		<ul>
			<li>
				${bulletLine('Name:', provider.companyName)}
			</li>
			<li>
				${bulletLine('Contact', provider.contactName)}
			</li>
			<li>
				${bulletLine('Email',provider.email)}
			</li>
			<li>
				${bulletLine('Phone', provider.phoneNumber)}
			</li>
			<li>
				${bulletLine('Street', provider.street)}
			</li>
			<li>
				${bulletLine('City', provider.city)}
			</li>
			<li>
				${bulletLine('State', provider.state)}
			</li>
			<li>
				${bulletLine('Zip', provider.zip)}
			</li>
		</ul>
		<p>Thanks,</p>
		<p>Your friends at Otto Car Club</p>
		`
    return message
}

const welcomeEmailTemplate = (member: Member, password: string) => {
    const message = `
		<p>Hi ${member.firstName} and welcome to Otto Car Club!
		<p>Your new Otto Car Club account has been created. This gives you access to the Otto Car Club web and mobile apps!</p>
		<p>Please follow the url: ${DRIVERS_CLUB_WEB_URL} to login. Your username is: ${member.email}, your temporary password is: ${password}.</p>
			
		<p>To change your password, please use the "Forgot Password" link on the login screen. An email will then be sent to you with instructions on resetting the password.</p>
		<p>Please send an email to info@ottocarclub.club if you have any questions!</p>
		<p>Best,</p> 
		<p>The Otto Car Club team.</p>
		`
    return message
}

const publicRsvpTemplate = (memberName: string, memberEmail: string, plusOne: boolean, event: any) => {
    const plusOneText = plusOne ? 'Yes' : 'No'
    const message = `
		<p> Hi there!</p>
		<p>A public person has RSVP'd to an event. Details below:</p>
		<p style='font-weight:bold; display:inline;'>Member Info</p>
		<ul>
			<li>
				${bulletLine('Name:', memberName)}
			</li>
			<li>
				${bulletLine('Email:', memberEmail)}
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
				${bulletLine('Price', event.price)}
			</li>
			<li>
				${linkLine('Event', event.id)}
			</li>
		</ul>
			
		<p>Thanks,</p>
		<p>Your friends at Otto Car Club</p>
		`
    return message
}

const bulletLine = (boldText: string, text: string): string => {
    return `<p style='font-weight:bold; display:inline;'>${boldText}</p> <p style='display:inline;'>${text}</p>`
}

const linkLine = (boldText: string, id: string): string => {
    return `<p style='font-weight:bold; display:inline;'>${boldText}</p> <a href="app.ottocarclub.com/events/${id}" style='display:inline;'>Event Link</a>`
}

const regularText = (text: string): string => {
    return `<p>${text}</p>`
}

const buildVehicleList = (vehicleList: VehicleInfo[]) => {
    if (!vehicleList) {
        return
    }
	return vehicleList.map((vehicle: VehicleInfo) => {
		return (
			`
				<ul>
					<li>${bulletLine('Year', vehicle.year)}</li>
					<li>${bulletLine('Model', vehicle.model)}</li>
					<li>${bulletLine('Make', vehicle.make)}</li>
					<li>${bulletLine('Notes', vehicle.notes)}</li>
				</ul>
			`
		)
	})
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