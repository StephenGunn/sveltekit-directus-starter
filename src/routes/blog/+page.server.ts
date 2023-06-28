import { useDirectus } from '@directus/sdk'
import { rest } from '@directus/sdk/rest'
import { readItem } from '@directus/sdk/rest/commands';

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
const posts = await client.request(readItem('posts', 5));

console.log(posts)

export const load = async () => {
    return {
        success: true
    }
};