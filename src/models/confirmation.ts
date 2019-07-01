import { ClubInfo } from './club'

export interface ConfirmationInfo {
    title: string,
    subtitle: string,
    icon: string,
    info: string,
    url: string
    club: ClubInfo
}