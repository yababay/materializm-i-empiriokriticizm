import { createClient, type RedisClientType } from 'redis'
import { REDIS_PORT, REDIS_PREFIX } from '$env/static/private'

let client: RedisClientType

const url = `redis://localhost:${REDIS_PORT}`

export const checkConnection = async (): Promise<RedisClientType> => {
    if(!client) client = createClient({url})
    if(client.isOpen) return client
    await client.connect()
    return client
}

export const getKey = (postfix: string) => `${REDIS_PREFIX}:${postfix}`
