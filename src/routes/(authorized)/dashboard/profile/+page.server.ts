import { error, fail } from '@sveltejs/kit'
import type { Actions } from './$types.js'
import { handle_tokens } from '$api/handle_session.js'
import { DIRECTUS_URL } from '$env/static/private'


export const actions = {
    default: async ({ request, locals }) => {
        // grab our data from the response
        const data = await request.formData()
        const first_name = data.get('first_name')
        const last_name  = data.get('last_name')
        const location   = data.get('location')

        // some basic validation
        if (!first_name && !last_name) return fail(400, { first_name, last_name, missing: true })

        // individual validation
        if (!first_name) return fail(400, { first_name, missing: true })
        if (!last_name)  return fail(400, { last_name, missing: true })

        try {
            // update profile
            await (await fetch(`${DIRECTUS_URL}/users/me`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${locals.access_token}`
                },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    location
                })
            })).json()

            return {
                success: true
            }

        } catch (err) {
            // TODO: improve this error handling later
            console.log(err)

            // send back a non-descript error
            throw error(401)
        }

    }
} satisfies Actions