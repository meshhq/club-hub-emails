import * as core from 'club-hub-core';
import { EventInfo } from './models/event';
import { ConfirmationInfo } from './models/confirmation';
import { ClubInfo } from './models/club';
export declare const BuildEventInfo: (event: core.Event.Model, club: core.Club.Model) => EventInfo;
export declare const BuildConfirmationInfo: (event: core.Event.Model, club: core.Club.Model) => ConfirmationInfo;
export declare const BuildClubInfo: (club: core.Club.Model) => ClubInfo;
