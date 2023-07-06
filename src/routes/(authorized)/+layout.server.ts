import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types.js'

export const load = (async ({ locals, url }) => {
    // redirect if the visitor doesn't have the proper auth
    if (locals.authorization === "public") throw redirect(307, "/login")

    
}) satisfies LayoutServerLoad