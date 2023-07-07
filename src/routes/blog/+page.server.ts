import { api } from '$api/client.js';
import { readItems, withToken } from '@directus/sdk/rest';
import { error } from '@sveltejs/kit'

export const load = async ({locals}) => {

    // if we are logged in, get the blog posts with the comments
    if (locals.access_token) {
        const posts = await api.request(withToken(locals.access_token, readItems('posts', {
            fields: [
                'date_created',
                'id',
                'title',
                'content',
                'comments.*.*'
            ],
            sort: ['-date_created']
        })))
        return { posts }
    }

    // if we are not logged in, don't get the comments.
    const posts = await api.request(readItems('posts', {
        fields: [
            'date_created',
            'id',
            'title',
            'content',
        ],
        sort: ['-date_created']
    }))
    return { posts }
    
};