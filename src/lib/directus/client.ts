import { DIRECTUS_URL } from '$env/static/private';
import { useDirectus, authentication } from '@directus/sdk'
import { rest } from '@directus/sdk/rest'

// It's so simple we almost don't need to abstract it
export const api = useDirectus<Schema>(DIRECTUS_URL).use(rest()).use(authentication('json', {
    autoRefresh: false
}))



