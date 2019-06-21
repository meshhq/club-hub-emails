import { ClubInfo } from './club'

export interface WelcomeContent {
    firstName: string
    inviteLink: string
    iosAppURL: string
    androidAppURL: string
    iosBadgeURL: string 
    androidBadgeURL: string
    clubhubSupportURL: string
    unsubscribeURL: string
    club: ClubInfo
    loginURL: string
}
