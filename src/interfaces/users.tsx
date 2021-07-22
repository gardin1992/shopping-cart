export interface IUserLogin {
    email?: string,
    password?: string,
}

export interface IUserRegister {
    name?: string,
    email?: string,
    password?: string,
    repassword?: string,
    //
    postalCode?: string,
    streetName?: string,
    streetNumber?: string,
    neighborhood?: string,
    state?: string,
    city?: string,
}