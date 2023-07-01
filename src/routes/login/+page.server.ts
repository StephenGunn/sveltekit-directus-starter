import { auth, reset_sdk } from '$api/client.js'
import { error, redirect } from '@sveltejs/kit'
import type { Actions } from './$types.js'
import { handle_tokens } from '$api/handle_tokens.js'

// check to see if we already have auth tokens, if we do, refresh them and redirect to dashboard
export const load = async ({ cookies }) => {
    // quick escape
    if (!cookies.get('auth')) return {}
    
    // if there are tokens, handle them and then reset the api
    const refreshed = await handle_tokens(cookies)
    reset_sdk()

    // If our cookies are valid and we are authenticated, go to the dashboard
    // we can also control which roles do what later
    if(refreshed) throw redirect(307, "/dashboard")

    return {}
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
