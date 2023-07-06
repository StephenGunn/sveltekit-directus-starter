import { api } from '$api/client.js';
import { handle_tokens } from '$api/handle_session.js';
import { readItems, withToken } from '@directus/sdk/rest';
import { error } from '@sveltejs/kit'

export const load = async () => {

    const posts = await api.request(withToken('', readItems('posts', {
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
};