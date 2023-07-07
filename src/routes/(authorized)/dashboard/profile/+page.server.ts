import { error, fail } from '@sveltejs/kit'
import type { Actions } from './$types.js'
import { DIRECTUS_URL } from '$env/static/private'

export const actions = {
    default: async ({ request, locals, cookies }) => {
        // grab our data from the response
        const form_data = await request.formData()
        const first_name =form_data.get('first_name')?.toString()
        const last_name = form_data.get('last_name')?.toString()
        const location = form_data.get('location')?.toString()

        // some basic validation
        if (!first_name && !last_name) return fail(400, { first_name, last_name, missing: true })

        // individual validation
        if (!first_name) return fail(400, { first_name, missing: true })
        if (!last_name) return fail(400, { last_name, missing: true })
        
        let body: IncomingUser = {
            first_name,
            last_name
        }

        if (location) {
            body.location = location
        }

        console.log(locals.access_token)

        // update profile
        await (await fetch(`${DIRECTUS_URL}/users/me`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${locals.access_token}`
            },
            body: JSON.stringify(body)
        })).json().catch((err) => {
            console.log(err)
            // send back a non-descript error
            throw error(401)
        })

        // delete our user cookie so that hooks has to request a new user object
        cookies.set('user', JSON.stringify({...locals.user, ...body}), {
            path: '/'
        })

        return {
            success: true
        }
    }
} satisfies Actions