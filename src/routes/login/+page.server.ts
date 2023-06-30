import { auth, api } from '$api/client.js'
import { error, redirect } from '@sveltejs/kit'
import type { Actions } from './$types.js'
import { dev } from '$app/environment'

// check to see if we already have auth tokens, if we do, refresh them and redirect to dashboard
export const load = async ({ cookies }) => {
    // quick escape
    if(!cookies.get('auth')) return {}

    // if we have tokens, try to refresh them
    const tokens: AuthTokens = JSON.parse(cookies.get('auth') ?? '')
    
    // be doubly sure we have tokens, make typescript happy
    if (!tokens.access_token) return {};
    api.setToken(tokens.access_token);

    // get new tokens object
    const refreshed = await auth.refresh()

    if(refreshed && dev) {
        console.log("Auth cookies refreshed from /login/+page.server.ts:")
        console.log(refreshed)
    }

    // if we can't refresh, zero out the cookies and continue to the login page
    if(!refreshed) {
        cookies.set('auth', "", {
            maxAge: 0
        })
    }

    // if we passed all our checks, set our auth cookies
    // and redirect to the dashboard page
    cookies.set('auth', JSON.stringify(refreshed), {
        path: '/'
    })

    throw redirect(307, "/dashboard")
}

export const actions = {
    default: async ({ request, cookies }) => {
        // grab our data from the response
        const data = await request.formData()
        const email = data.get('email') as string
        const password = data.get('password') as string

        // check for email && password
        if(!email || !password) throw error(406)

        try {
            // attempt to login
            const login = await auth.login(email, password) as AuthTokens

            // return our auth object as a cookie
            cookies.set('auth', JSON.stringify(login), {
                path: '/'
            })

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
