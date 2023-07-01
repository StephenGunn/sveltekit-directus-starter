// token refresh logic
import { auth, api } from "$api/client.js"
import type { Cookies } from "@sveltejs/kit"
import { dev } from '$app/environment'

export const handle_tokens = async (cookies: Cookies): Promise<boolean> => {
    // TODO: I NEED A WAY TO MAKE THE API FORGET.. A ZERO OUT COMMAND
    // if no cookies at all, redirect to login page
    if (!cookies.get('auth')) return  false

    // if we have tokens, try to refresh them
    const tokens: AuthTokens = JSON.parse(cookies.get('auth') ?? '')

    // be doubly sure we have tokens, make typescript happy
    if (!tokens.access_token) return false 

    // if the tokens are good, setup the api and return true
    if ((tokens.expires_at ?? 0) > Date.now()) {
        api.setToken(tokens.access_token)
        return true
    }

    // try catch for refreshing the tokens, if this fails
    // we will nuke the auth cookie
    try { // if we need to refresh, set the tokens in the api
        api.setToken(tokens.access_token)

        // get new tokens object
        // does this give the API new tokens?
        const new_tokens = await auth.refresh() as AuthTokens

        // pass the new token to the api
        if(new_tokens.access_token) api.setToken(new_tokens.access_token)

        // some logging for dev
        if (new_tokens && dev) {
            console.log("Auth cookies refreshed:")
            console.log(new_tokens)
        }

        // if we passed all our checks, set our auth cookies
        // and redirect to the dashboard page
        cookies.set('auth', JSON.stringify(new_tokens), {
            path: '/'
        })

        // if this whole thing worked, return true
        return true
    }
    catch (err) {
        // some logging for dev
        if (dev) {
            console.log("There was an error trying to refresh tokens with Directus:", err)
            console.log("We are going to nuke the auth cookie and move on")
        }

        // cookie nuke
        cookies.set('auth', "", {
            maxAge: 0
        })
        return false
    }
}