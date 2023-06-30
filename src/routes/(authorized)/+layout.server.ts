import { auth, api } from '$api/client.js'
import { redirect } from '@sveltejs/kit'
import { dev } from '$app/environment'
import type { LayoutServerLoad } from './$types.js'

export const load = (async ({ cookies }) => {
    // if no cookies at all, redirect to login page
    if (!cookies.get('auth')) throw redirect (307, '/login')

    // if we have tokens, try to refresh them
    const tokens: AuthTokens = JSON.parse(cookies.get('auth') ?? '')

    // be doubly sure we have tokens, make typescript happy
    if (!tokens.access_token) throw redirect(307, '/login')
    api.setToken(tokens.access_token)

    // get new tokens object
    const refreshed = await auth.refresh()

    // some logging for dev
    if (refreshed && dev) {
        console.log("Auth cookies refreshed from /dashboard/+layout.server.ts:")
        console.log(refreshed)
    }

    // if we can't refresh, throw the user to the login page
    if (!refreshed) throw redirect (307, '/login')

    // if we passed all our checks, set our auth cookies
    // and redirect to the dashboard page
    cookies.set('auth', JSON.stringify(refreshed), {
        path: '/'
    })
    
    return {
        success: true
    }
}) satisfies LayoutServerLoad