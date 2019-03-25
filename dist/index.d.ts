import * as core from 'club-hub-core';
import * as CarClub from './clubs/dc-otto/mailer/index';
export { CarClub };
export declare const CompileGenericEmail: (content: string, club: core.Club.Model) => Promise<string>;
export declare const CompileEventEmail: (event: core.Event.Model, club: core.Club.Model, link: string) => Promise<string>;
export declare const CompilePostEmail: (post: core.Post.Model, club: core.Club.Model, link: string) => Promise<string>;
export declare const CompileConfirmationEmail: (reservation: core.Event.Reservation, event: core.Event.Model, group: core.Calendar.Group, club: core.Club.Model) => Promise<string>;
