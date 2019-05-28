import * as assert from 'assert'
import * as core from 'club-hub-core'
import * as dotenv from 'dotenv'

// Factories
import { NewEventObj } from './factories/event'
import { NewClubObj } from './factories/club'

// Emails 
import * as emails from '../src/index'

// Service
import SESService from '../src/services/ses'

// Set Environment Variables
dotenv.config()

const sender = 'kevin@meshstudio.io'
const recipient = 'meshkevin@outlook.com'

describe('Emails', function () {
	describe('Events', function () {
		it('should build an event email', async function () {
			const event: core.Event.Model = NewEventObj()
			const club: core.Club.Model = NewClubObj()
			const email: string = await emails.CompileConfirmationEmail({} as any, event, {} as any, club, '')
			assert(email)
		})
	})

	describe('Send Email', function () {
		it('should build an event email', async function () {
			const event: core.Event.Model = NewEventObj()
			const club: core.Club.Model = NewClubObj()
			const email: string = await emails.CompileEventEmail(event, club, '')
			const response = await SESService.sendHTMLEmail(sender, [recipient], ['kcoleman731@gmail.com', sender], [], `New Event: ${event.name}`, email)
			console.log("Response", response)
		});
	});
})
