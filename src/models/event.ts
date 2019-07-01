import { ClubInfo } from './club'

export interface EventInfo {
    name: string
    subtitle: string
    photoURL: string
    url: string
    cta: string
    location: string
    content: string
    street: string
    date: string
    time: string
    club: ClubInfo
}
