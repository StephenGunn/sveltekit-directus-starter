// token refresh logic
import { DIRECTUS_URL } from "$env/static/private"
import { set_cookies, clear_cookies } from "$api/cookies.js";
import type { Cookies } from "@sveltejs/kit"
import { get_user } from "./users.js"

export const directus_session = async (cookies: Cookies, locals: App.Locals): Promise<void> => {

    // check for no cookies
    if (!cookies) {
        locals = {}
        return
    }
    
    // get our token cookies
    const access_token  = cookies.get('access_token')
    const refresh_token = cookies.get('refresh_token')

    // handle our encrypted? user cookie
    let user_cookie: User | undefined
    if (cookies.get('user')) user_cookie = JSON.parse(cookies.get('user')!)
    
    console.log("user cookie", user_cookie)

    // if we have an access token, return it
    if (access_token && user_cookie) {
        locals.access_token = access_token,
        locals.user = user_cookie

        return
    }

    // if we don't have an access token, check for a refresh token
    if (!refresh_token) return

    // if we have an access token, but no user object, get the user data
    if (access_token && !user_cookie) {
        const { user } = await get_user(access_token)

        // if we don't get a user back, reset the locals and clear the cookies
        if (!user) {
            locals = {}
            clear_cookies(cookies)
        }
        
        // if all is well, return a access token and user object
        return 
    }

    // if we don't have an access_token but we do have a refresh token,
    // try to get a new set of tokens from Directus
    try {
        const { data } = await (await fetch(`${DIRECTUS_URL}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                refresh_token,
                mode: "json"
            })
        })).json() as { data: AuthTokens }

        // get the user with our new token
        const { user } = await get_user(data.access_token)

        // check to see if we're missing either access token or user
        if(!data.access_token || !user) throw new Error('missing our access token or user object')

        // Set our new cookies and return the new access token
        await set_cookies(cookies, data, user)

        // Set our locals
        locals.user = user
        locals.access_token = data.access_token

        return 
    } catch (err) {
        console.log(err)
        locals = {}
        clear_cookies(cookies)
        return
    }
}