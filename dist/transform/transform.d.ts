import * as core from 'club-hub-core';
import { EventInfo } from '../models/event';
import { RichContent } from '../models/rich';
import { WelcomeContent } from '../models/welcome';
import { InvalidEmail } from '../models/invalidEmail';
import { ConfirmationInfo } from '../models/confirmation';
import { ClubInfo } from '../models/club';
export declare const BuildGenericContent: (content: string, club: core.Club.Model) => RichContent;
export declare const BuildEventContent: (event: core.Event.Model, club: core.Club.Model, link: string) => EventInfo;
export declare const BuildWelcomeContent: (user: core.User.Model, club: core.Club.Model, inviteLink: string) => WelcomeContent;
export declare const BuildInvalidEmailAdminNotificationContent: (clubName: string, invalidEmail: string, club: core.Club.Model) => InvalidEmail;
export declare const CompileResetPasswordInvalidEmail: (post: core.Post.Model, club: core.Club.Model, link: string) => RichContent;
export declare const BuildPostContent: (post: core.Post.Model, club: core.Club.Model, link: string) => RichContent;
export declare const BuildConfirmationContent: (reservation: core.Event.Reservation, event: core.Event.Model, group: core.Calendar.Group, club: core.Club.Model, url: string) => ConfirmationInfo;
export declare const BuildClubInfo: (club: core.Club.Model) => ClubInfo;
