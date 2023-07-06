import type { Handle } from '@sveltejs/kit'
import { directus_session } from '$api/handle_session.js'
import { sequence } from '@sveltejs/kit/hooks'

const standard = (async ({ event, resolve }) => {
    // your hooks go here.

    //
    return resolve(event)
}) satisfies Handle

const directus = (async ({ event, resolve }) => {
    await directus_session(event.cookies, event.locals)
    return resolve(event)
}) satisfies Handle

export const handle = sequence(directus, standard)