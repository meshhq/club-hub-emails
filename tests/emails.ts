import * as assert from 'assert'
import * as core from 'club-hub-core'
import * as dotenv from 'dotenv'

// Factories
import { NewEventObj } from './factories/event'
import { NewPostObj } from './factories/post'
import { NewClubObj } from './factories/club'

// Emails 
import * as emails from '../src/index'

// Service
import SESService from '../src/services/ses'

// Set Environment Variables
dotenv.config()

const sender = 'kevin@meshstudio.io'
const recipient = 'tayhalla@gmail.com'
let emailToSend: string

describe('Emails', function () {
	describe('Events', function () {
		it('should build an event email', async function () {
			const event: core.Event.Model = NewEventObj()
			const club: core.Club.Model = NewClubObj()
			const email: string = await emails.CompileConfirmationEmail({} as any, event, {} as any, club, '')
			assert(email)
		})
	})

	describe('Posts', function () {
		it('should build an post email', async function () {
			const post: core.Post.Model = NewPostObj()
			const club: core.Club.Model = NewClubObj()
			const email: string = await emails.CompilePostEmail(post, club, '')
			assert(email)
		})
	})

	describe('InvalidEmail', function () {
		it('should build an invalid email notification', async function () {
			const club: core.Club.Model = NewClubObj()
			const email: string = await emails.CompileInvalidEmailAdminNotification('Taylor', 'taylor@whodis.com', club)
			console.log(email)
			assert(email)
			emailToSend = email
		})
	})

	describe.skip('Send Email', function () {
		it('should build an event email', async function () {
			const response = await SESService.sendHTMLEmail(sender, [recipient], ['tayhalla@gmail.com'], [], `Test Send`, emailToSend)
			console.log("Response", response)
		});
	});
})
