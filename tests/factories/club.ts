import * as Factory from 'factory.ts'
import * as Faker from 'faker'
import * as core from 'club-hub-core'

import { NewLocationObj } from './submodels/location'

const clubFactory = Factory.makeFactory<core.Club.Model>({
	name: Factory.each((i) => Faker.name.title()),
	photoURL: 'https://s3-us-west-2.amazonaws.com/clubhubs3/assets/clubhub_logo.png',
	locations: [NewLocationObj()],
	userGroups: [],
	type: core.Club.Type.Golf,
	tzid: '',
	lat: '',
	lon: ''
})

const newClubObj = (): core.Club.Model => {
	return clubFactory.build({})
}

export { newClubObj as NewClubObj }
