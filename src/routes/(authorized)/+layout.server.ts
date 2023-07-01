import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad } from './$types.js'

export const load = (async ({ parent }) => {
    
    const { authorization } = await parent()

    if (authorization === "public") throw redirect(307, "/login")

}) satisfies LayoutServerLoad