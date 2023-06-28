/*
    Directus Collections, add your collections here as you create them
*/
interface Schema {
    posts: BlogPosts
}

/*
    Individual Collections
*/
interface BlogPosts {
    id: number
    title: string
    content: string
}

