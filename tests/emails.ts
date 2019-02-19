import * as assert from 'assert'
import * as core from 'club-hub-core'

// Factories
import { NewEventObj } from './factories/event'
import { NewClubObj } from './factories/club'

// Emails 
import * as emails from '../src/index'

describe('Emails', function() {
	describe('Events', function() {
    	it('should build an event email', async function() {
			  const event: core.Event.Model = NewEventObj()
			  const club: core.Club.Model = NewClubObj()
			  const email: string = await emails.CompileEventEmail(event, club)
			  console.log("Email", email)
			  assert(email)
    	});
  	});
})