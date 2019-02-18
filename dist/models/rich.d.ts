import { ClubInfo } from './club';
export interface RichContent {
    name?: string;
    imageURL?: string;
    content: string;
    url?: string;
    cta?: string;
    unsubscribeURL: string;
    clubInfo: ClubInfo;
}
