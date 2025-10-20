import { checkConnection } from '$lib/server/db'

const client = await checkConnection()
const keys = (await client.keys('*:paragraph:*'))

export const load = async () => {

}
