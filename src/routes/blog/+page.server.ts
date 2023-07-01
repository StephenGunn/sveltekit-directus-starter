import { api, reset_sdk } from '$api/client.js';
import { handle_tokens } from '$api/handle_tokens.js';
import { readItems } from '@directus/sdk/rest';
import { error } from '@sveltejs/kit'

export const load = async ({ cookies }) => {
    
    // handle our tokens and setup our cookies
    await handle_tokens(cookies)

    // wrap everything in a try catch block, so if Mr. SDK does some
    // weird shit we can reset him and be done!
    
    const posts = await api.request(readItems('posts', {
        fields: [
            'id',
            'title',
            'content'
        ]
    })).catch(() => {
        // in-case-of-weirdness.
        reset_sdk()
    })

    // make the SDK forget the tokens so it doesn't do anything weird.
    // no offence, BrainSlug
    reset_sdk()

    return {
        posts
    }
    
    throw error (500)
};