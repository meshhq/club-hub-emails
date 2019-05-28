import * as Factory from 'factory.ts'
import * as Faker from 'faker'
import * as core from 'club-hub-core'
import { Types } from 'mongoose'

import { NewLocationObj } from './submodels/location'

const reservation: core.Event.Reservation = {
	creator: "" as unknown as Types.ObjectId,
	owner: "" as unknown as Types.ObjectId,
    participants: []
}

const EventFactory = Factory.makeFactory<core.Event.Model>({
	calendarID: "" as unknown as Types.ObjectId,
	clubID: "" as unknown as Types.ObjectId,
	image: {},
	location: NewLocationObj(),
	name: Factory.each((i) => Faker.lorem.word()),
	remoteID: Factory.each((i) => Faker.random.uuid()),
	price: '20',
	shortLink: undefined,
	richContent: {html: '<p>Howdy</p>'},
    reservations: [reservation]
})

const newEventObj = (): core.Event.Model => {
	return EventFactory.build({})
}

export { newEventObj as NewEventObj }