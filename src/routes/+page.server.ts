/*import { checkConnection } from '$lib/server/db'

const client = await checkConnection()
const keys = (await client.keys('*:paragraph:*')).sort() as string[]

export const load = async ({ cookies }) => {
    //cookies.delete('current', {path: '/'})
    const [ first ] = keys
    let current = cookies.get('current') ||  first
    const sentences = await client.lRange(current, 0, 1000)
    cookies.set('current', current, {path: '/'})
    return { sentences }
}*/

export const csr = true

export const actions = {
    default: async ({ request, cookies }) => {

        /*const data = await request.formData()
        const ranges = []
        for (const [key, value] of data.entries()){
            if(!key.startsWith('range_')) continue
            ranges.push(value.toString())
        }

        const current = cookies.get('current')
        const key = current?.replace(':paragraph:', ':ranges:')
        await client.del(key)
        await client.rPush(key, ranges)

        const i = keys.findIndex(el => el === current) + 1
        cookies.set('current', keys[i], {path: '/'})
        console.log('saved', key)*/
        return {ok: true}
    }
}
