import { ClubInfo } from './club';
export interface EventInfo {
    name: string;
    imageURL: string;
    content: string;
    url: string;
    unsubscribeURL: string;
    clubInfo: ClubInfo;
}
