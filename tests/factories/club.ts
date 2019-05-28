import * as Factory from 'factory.ts'
import * as Faker from 'faker'
import * as core from 'club-hub-core'

import { NewLocationObj } from './submodels/location'

const clubFactory = Factory.makeFactory<core.Club.Model>({
	name: Factory.each((i) => Faker.name.title()),
	locations: [NewLocationObj()],
	userGroups: [],
	type: core.Club.Type.Golf,
	tzid: '',
	lat: '',
	lon: '',
	image: {},
	clubSettings: {
		primaryColor: '#fead0d'
	}
})

const newClubObj = (): core.Club.Model => {
	return clubFactory.build({})
}

export { newClubObj as NewClubObj }
