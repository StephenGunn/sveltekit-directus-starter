/*
    Add your roles + ids here and get type safe roles in your app.
    It's better to just hard-code the roles so the lookup is instant.
    The roles object won't be exposed on the client, only the server.
*/

const roles = {
    admin: "35c85708-5c07-4f35-9896-cd55caedfca9",
    user: "ff31ad08-6a65-4dbf-ada1-90a50229ae95"
}

// Extract our role names from the roles object and add "public"
export type Role = keyof typeof roles | "public"

// return the user role
export const get_user_role = async (role?: string): Promise<Role> => {
    if (!role) return "public"
    return (Object.keys(roles) as (keyof typeof roles)[]).find((key) => {
        return roles[key] === role
    }) ?? "public"
}