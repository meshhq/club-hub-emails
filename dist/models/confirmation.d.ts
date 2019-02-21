import { ClubInfo } from './club';
export interface ConfirmationInfo {
    title: string;
    subtitle: string;
    info: string;
    url: string;
    unsubscribeURL: string;
    clubInfo: ClubInfo;
}
