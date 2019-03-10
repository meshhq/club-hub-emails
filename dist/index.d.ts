import * as core from 'club-hub-core';
import * as DCEmails from './clubs/drivers-club/mailer/index';
export { DCEmails };
export declare const CompileGenericEmail: (content: string, club: core.Club.Model) => Promise<string>;
export declare const CompileEventEmail: (event: core.Event.Model, club: core.Club.Model) => Promise<string>;
export declare const CompilePostEmail: (post: core.Post.Model, club: core.Club.Model) => Promise<string>;
export declare const CompileConfirmationEmail: (reservation: core.Event.Reservation, event: core.Event.Model, group: core.Calendar.CalendarGroup, club: core.Club.Model) => Promise<string>;
