import { DIRECTUS_URL } from '$env/static/private';
import { useDirectus } from '@directus/sdk'
import { rest } from '@directus/sdk/rest'
import { authentication } from '@directus/sdk/auth'

export const api = useDirectus<Schema>(DIRECTUS_URL).use(rest())

export const auth = useDirectus(DIRECTUS_URL).use(
    authentication('json',
    {
        autoRefresh: false
    }
))


