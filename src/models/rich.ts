import { ClubInfo } from './club'

export interface RichContent {
    name?: string,
    photoURL?: string,
    content: string,
    url?: string,
    cta?: string,
    club: ClubInfo
}


