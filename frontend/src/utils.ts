export function ValidateEmail(email: string) {
    const EmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return EmailRegex.test(email.toLowerCase())
}