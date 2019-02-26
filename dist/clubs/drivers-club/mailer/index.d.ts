import * as core from 'club-hub-core';
export declare const buildWelcomeEmail: (member: core.User.Model, club: core.Club.Model, password: string) => string;
export declare const buildRSVPEmail: (member: core.User.Model, event: core.Event.Model) => string;
export declare const sendPublicRSVPEmail: (memberName: string, memberEmail: string, plusOne: boolean, event: any) => string;
export declare const sendProviderRequestEmail: (provider: core.Calendar.Model) => string;
