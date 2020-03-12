// External Dependencies
import * as Factory from 'factory.ts'
import * as Faker from 'faker'

const locationFactory = Factory.makeFactory<any>({
	name: Factory.each((i) => 'Clubhouse'),
	address1: Factory.each((i) => Faker.address.streetAddress()),
	city: Factory.each((i) => Faker.address.city()),
	state: Factory.each((i) => Faker.address.state()),
	zip: Factory.each((i) => Faker.address.zipCode()),
	contactName: Factory.each((i) => Faker.name.firstName()),
	phone: Factory.each((i) => Faker.phone.phoneNumber()),
	email: Factory.each((i) => Faker.internet.email())
})

const newLocationObj = (): any => {
	return locationFactory.build({})
}

export { newLocationObj as NewLocationObj }