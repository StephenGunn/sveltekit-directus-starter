import { api } from '$api/client.js'
import { redirect, fail } from '@sveltejs/kit'
import type { Actions } from './$types.js'
import { set_cookies } from '$api/cookies.js'
import { get_user } from '$api/users.js'

// check to see if we already have access tokens
export const load = async ({ locals, url }) => {
    // If we have a supplied access token from our hooks.server.ts
    // we can redirect to the dashboard
    if (locals.access_token) throw redirect(307, "/dashboard")
    
    // send our redirect target to the frontend
    return {
        target: url.searchParams.get("redirect") ?? "/dashboard"
    }
}

export const actions = {
    default: async ({ request, cookies }) => {
        // grab our data from the response
        const data = await request.formData()
        const email = data.get('email') as string
        const password = data.get('password') as string

        // check for email && password
        if(!email || !password) return fail(406, {error: true})

        // attempt to login
        const login = await api.login(email, password) as AuthTokens

        const { user } = await get_user(login.access_token)

        // make sure the login worked.
        if (!login || !user) return fail(406, {error: true})

        // set our cookies 
        const cookies_set = await set_cookies(cookies, login, user)

        // double check to make sure our cookies are set
        if (!cookies_set) return fail(406, { error: true })

        // return something to let our frontend know the login attempt was successful
        return {
            user
        }
    }
} satisfies Actions
