// This is used for the $authorization derived store,
// just copy / paste each role's UUID and a string
// value to be referenced in the app on client side

// for serverside auth, you will want to pass the role
// from the individual load function

export const roles: {
    [keyof: string]: string
} = {
    admin: "35c85708-5c07-4f35-9896-cd55caedfca9",
    user:  "ff31ad08-6a65-4dbf-ada1-90a50229ae95"
}

// Setup some types
export type Role = keyof typeof roles | "public"

export const get_user_role = async (user?: User): Promise<Role> => {
    if (!user?.role) return "public"
    return Object.keys(roles).find(key => roles[key] === user.role) ?? "public"
}