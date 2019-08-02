"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Factory = require("factory.ts");
const Faker = require("faker");
const core = require("club-hub-core");
const location_1 = require("./submodels/location");
const clubFactory = Factory.makeFactory({
    name: Factory.each((i) => Faker.name.title()),
    locations: [location_1.NewLocationObj()],
    userGroups: [],
    type: core.Club.Type.Golf,
    tzid: '',
    lat: '',
    lon: '',
    image: {},
    clubSettings: {
        primaryColor: '#fead0d'
    }
});
const newClubObj = () => {
    return clubFactory.build({});
};
exports.NewClubObj = newClubObj;