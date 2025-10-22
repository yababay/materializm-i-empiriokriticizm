import { checkConnection } from "$lib/server/db"

const client = await checkConnection()

export const POST = async ({request}) => {
    const data = (await request.json()) as { id: number, content: string, tags: string[] }
    const { id, content, tags } = data
    let key = `materializm-i-empiriokriticizm:${id}:paragraph`
    console.log(key)
    await client.set(key, content)
    key = key.replace(':paragraph', ':tags')
    await client.sAdd(key, tags)
    return new Response()
}