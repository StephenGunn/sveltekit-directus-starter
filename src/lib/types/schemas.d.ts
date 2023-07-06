

/*
    Directus Collections, add your collections here as you create them
*/
interface Schema {
    posts: BlogPost
    comments: Comment
}

/*
    Individual Collections
*/
interface User {
    id?: string
    first_name?: string
    last_name?: string
    role?: string
    avatar?: string
    location?: string,
    authorization: unknown
}

interface BlogPost {
    id: number
    title: string
    content: string
    comments: Comment[]
}

interface Comment {
    content: string
    
}

