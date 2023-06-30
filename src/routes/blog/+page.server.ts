import { api } from '$api/client.js';
import { readItems } from '@directus/sdk/rest';

export const load = async ({cookies}) => {

    // since this is public only, we will null out the tokens
    api.setToken(null)
    const posts = await api.request(readItems('posts', {
        fields: [
            'id',
            'title',
            'content'
        ]
    }))
    return {
        posts
    }
};