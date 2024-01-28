export type LoginFields = {
    username: string,
    password: string,
}

export type LoginErrors = {
    username?: string,
    password?: string,
    detail?: string, 
}

export type RegisterFields = {
    username: string,
    email: string,
    password: string,
    password2: string,
}

export type RegisterErrors = {
    username?: string,
    email?: string,
    password?: string,
    password2?: string,
    details?: string,
}