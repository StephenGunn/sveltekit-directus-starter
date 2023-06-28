import { useDirectus } from '@directus/sdk'
import { rest, readItems } from '@directus/sdk/rest'
import { DIRECTUS_URL } from '$env/static/private';

// Connect to Directus and get our data
const client = useDirectus<Schema>(DIRECTUS_URL).use(rest());
const posts = await client.request(readItems('posts', {
    fields: [
        'id',
        'title',
        'content'
    ]
}))

export const load = async () => {
    return {
        posts
    }
};