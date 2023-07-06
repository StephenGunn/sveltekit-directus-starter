import type { Cookies } from "@sveltejs/kit"
import { dev } from "$app/environment"

export const set_cookies = async (cookies: Cookies, tokens: AuthTokens, user?: User): Promise<boolean> => {
    // double check to make sure we have our tokens
    if (!tokens || !tokens.access_token || !tokens.refresh_token) return false

    // set our access token
    cookies.set('access_token', tokens.access_token, {
        path: '/',
        expires: new Date(tokens.expires_at ?? (Date.now() + (tokens.expires ?? 0)))
    })

    // return our auth object as a cookie
    cookies.set('refresh_token', tokens.refresh_token, {
        path: '/'
    })

    // save the role UUID in a cookie for serverside role verification
    if (user) {
        const encoded_user = JSON.stringify(user)

        cookies.set('user', encoded_user, {
            path: "/"
        })
    } 

    return true
}

export const clear_cookies = (cookies: Cookies): void => {
    // clear our access token cookie
    cookies.set('access_token', "", {
        path: '/',
        maxAge: 0
    })

    // clear our refresh token cookie
    cookies.set('refresh_token', "", {
        path: '/',
        maxAge: 0
    })

    // clear our role cookie
    cookies.set('user', "", {
        path: '/',
        maxAge: 0
    })

    if(dev) console.log("Cookies have been cleared.")
}