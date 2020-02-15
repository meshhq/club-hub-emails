"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Factory = require("factory.ts");
const Faker = require("faker");
const locationFactory = Factory.makeFactory({
    name: Factory.each((i) => 'Clubhouse'),
    address1: Factory.each((i) => Faker.address.streetAddress()),
    city: Factory.each((i) => Faker.address.city()),
    state: Factory.each((i) => Faker.address.state()),
    zip: Factory.each((i) => Faker.address.zipCode()),
    contactName: Factory.each((i) => Faker.name.firstName()),
    phone: Factory.each((i) => Faker.phone.phoneNumber()),
    email: Factory.each((i) => Faker.internet.email())
});
const newLocationObj = () => {
    return locationFactory.build({});
};
exports.NewLocationObj = newLocationObj;
