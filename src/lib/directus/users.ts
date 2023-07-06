import { DIRECTUS_URL } from "$env/static/private"
import { get_user_role } from "$api/roles.js"

export const get_user = async (access_token: string): Promise<{
    success: boolean
    user?: User
}> => {

    // do a quick check to make sure we have our access token
    if (!access_token) return {
        success: false
    }

    const { data }: { data: User } = await (await fetch(`${DIRECTUS_URL}/users/me`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })).json()



    // make sure we have our user data
    if (!data) {
        return {
            success: false
        }
    }

    return {
        success: true,
        user: {
            first_name: data.first_name,
            last_name: data.last_name,
            location: data.location,
            authorization: await get_user_role(data.user.role)
        }
    }
}