import { json } from "@sveltejs/kit"
import { checkConnection } from "$lib/server/db"

const client = await checkConnection()

export const GET = async ({params}) => {
    const { id }= params
    return json(await client.sMembers(`materializm-i-empiriokriticizm:${id}:tags`))
}
