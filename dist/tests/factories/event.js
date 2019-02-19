"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Factory = require("factory.ts");
const Faker = require("faker");
const location_1 = require("./submodels/location");
const reservation = {
    creator: "",
    participants: []
};
const EventFactory = Factory.makeFactory({
    calendarID: "",
    clubID: "",
    description: Factory.each((i) => Faker.lorem.words(10)),
    location: location_1.NewLocationObj(),
    name: Factory.each((i) => Faker.lorem.word()),
    photoURL: Factory.each((i) => Faker.internet.url()),
    remoteID: Factory.each((i) => Faker.random.uuid()),
    price: Factory.each((i) => Faker.random.number({
        min: 50.00,
        max: 150.00
    })),
    shortLink: undefined,
    richContent: { html: '<p>Howdy</p>' },
    reservations: [reservation]
});
const newEventObj = () => {
    return EventFactory.build({});
};
exports.NewEventObj = newEventObj;
