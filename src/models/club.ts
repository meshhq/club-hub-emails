export interface ClubInfo {
    name: string 
    domain: string
    logoURL: string,
    twitterURL?: string,
    facebookURL?: string,
    instagramURL?: string,
    address: AddressInfo
}

export interface AddressInfo {
    street: string,
    city: string,
    state: string,
    zip: string
}

