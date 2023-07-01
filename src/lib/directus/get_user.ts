import { DIRECTUS_URL } from "$env/static/private"
import type { Cookies } from "@sveltejs/kit"

export const get_user = async (cookies: Cookies): Promise<{
    success: boolean
    user?: User
}> => {
    // if no cookies at all, redirect to login page
    if (!cookies.get('auth')) return {
        success: false
    }

    // if we have tokens, try to refresh them
    const tokens: AuthTokens = JSON.parse(cookies.get('auth') ?? '')

    // be doubly sure we have tokens, make typescript happy
    if (!tokens.access_token) return {
        success: false
    }

    const { data }: { data: User } = await (await fetch(`${DIRECTUS_URL}/users/me`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${tokens.access_token}`
        }
    })).json()

    return {
        success: true,
        user: data
    }
}