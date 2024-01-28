export function ValidateEmail(email: string) {
    const EmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return EmailRegex.test(email.toLowerCase())
}


export function PrependBackendURI(url: string) {
    const BackendURL = "http://127.0.0.1:8000"
    return `${BackendURL}${url}`
}