import * as Factory from 'factory.ts'
import * as Faker from 'faker'
import * as core from 'club-hub-core'
import { Types } from 'mongoose'

import { NewLocationObj } from './submodels/location'

const reservation: core.Event.Reservation = {
    creator: "" as unknown as Types.ObjectId,
    participants: []
}

const EventFactory = Factory.makeFactory<core.Event.Model>({
	calendarID: "" as unknown as Types.ObjectId,
	clubID: "" as unknown as Types.ObjectId,
	description: Factory.each((i) => Faker.lorem.words(10)),
	location: NewLocationObj(),
	name: Factory.each((i) => Faker.lorem.word()),
	photoURL: Factory.each((i) => Faker.internet.url()),
	remoteID: Factory.each((i) => Faker.random.uuid()),
	type: core.Club.defaultEventTypes[0],
	price: Factory.each((i) => Faker.random.number({
		min: 50.00,
		max: 150.00
	})),
	shortLink: undefined,
    reservations: [reservation],
    status: core.IShared.PublicationStatus.Draft
})

const newEventObj = (): core.Event.Model => {
	return EventFactory.build({})
}

export { newEventObj as NewEventObj }