
/*
    Directus Collections, add your collections here as you create them
*/
interface Schema {
    posts: BlogPost[]
    comments: Comment[]
}

/*
    Individual Collections
*/
interface User {
    id: string
    first_name: string
    last_name: string
    role?: string
    avatar: string
    location: string
    authorization: import("$api/roles.js").Role
}
// for updating the user's profile
interface IncomingUser {
    id?: string
    first_name?: string
    last_name?: string
    role?: string
    avatar?: string
    location?: string
}

interface BlogPost {
    date_created: string
    id: number
    title: string
    content: string
    comments: Comment[]
}

interface Comment {
    content: string
    user_created: User
}

/*
    Auth
*/

interface AuthTokens {
    access_token: string
    expires: number
    refresh_token: string
    expires_at: number
}