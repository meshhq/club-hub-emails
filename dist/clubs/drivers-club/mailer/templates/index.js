"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const welcomeEmailTemplate = (member, club, password) => {
    const message = `
		<p>Hi ${member.firstName} and welcome to Drivers Club!

		<p>Your new Drivers Club account has been created. This gives you access to the Drivers Club web and mobile apps!</p>

		<p>Please follow the url: ${club.domain} to login. Your username is: ${member.email}, your temporary password is: ${password}.</p>
			
		<p>To change your password, please use the "Forgot Password" link on the login screen. An email will then be sent to you with instructions on resetting the password.</p>

		<p>Please send an email to info@drivers.club if you have any questions!</p>

		<p>Best,</p> 

		<p>The Drivers Club team.</p>
	`;
    return message;
};
exports.WelcomeEmailTemplate = welcomeEmailTemplate;
const rsvpTemplate = (member, event) => {
    const fullName = `${member.firstName} ${member.lastName}`;
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
	`;
    return message;
};
exports.RsvpTemplate = rsvpTemplate;
const serviceRequestTemplate = (member, provider, reservation) => {
    const fullName = `${member.firstName} ${member.lastName}`;
};
exports.ServiceRequestTemplate = serviceRequestTemplate;
const newProviderTemplate = (provider) => {
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
        ${bulletLine('Email', provider.location.email)}
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
`;
    return message;
};
exports.NewProviderTemplate = newProviderTemplate;
const publicRsvpTemplate = (memberName, memberEmail, plusOne, event) => {
    const plusOneText = plusOne ? 'Yes' : 'No';
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

<p>Your friends at Drivers Club</p>
`;
    return message;
};
exports.PublicRsvpTemplate = publicRsvpTemplate;
const bulletLine = (boldText, text) => {
    return `<p style='font-weight:bold; display:inline;'>${boldText}</p> <p style='display:inline;'>${text}</p>`;
};
const linkLine = (boldText, id) => {
    return `<p style='font-weight:bold; display:inline;'>${boldText}</p> <a href="app.drivers.club/events/${id}" style='display:inline;'>Event Link</a>`;
};
const regularText = (text) => {
    return `<p>${text}</p>`;
};
