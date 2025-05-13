export interface User {
    name: string
    email: string
    password: string
    handle: string
}

export interface RegisterUser extends User {
    confirmPassword: string
} 