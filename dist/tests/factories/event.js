"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Factory = require("factory.ts");
const Faker = require("faker");
const location_1 = require("./submodels/location");
const reservation = {
    creator: "",
    owner: "",
    participants: []
};
const EventFactory = Factory.makeFactory({
    calendarID: "",
    clubID: "",
    image: {},
    location: location_1.NewLocationObj(),
    name: Factory.each((i) => Faker.lorem.word()),
    remoteID: Factory.each((i) => Faker.random.uuid()),
    price: '20',
    shortLink: undefined,
    richContent: { html: '<p>Howdy</p>' },
    reservations: [reservation]
});
const newEventObj = () => {
    return EventFactory.build({});
};
exports.NewEventObj = newEventObj;
