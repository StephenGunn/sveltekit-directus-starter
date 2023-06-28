import { useDirectus } from '@directus/sdk'
import { rest, readItems } from '@directus/sdk/rest'

import { DIRECTUS_URL } from '$env/static/private';

// Our "posts" collection
interface BlogPosts {
    id: number;
    title: string;
    content: string;
}

// Your Directus collection schema
interface Schema {
    posts: BlogPosts[];
}

const client = useDirectus<Schema>(DIRECTUS_URL).use(rest());
const posts = await client.request(readItems('posts')) as unknown as BlogPosts[]

export const load = async () => {
    return {
        posts
    }
};