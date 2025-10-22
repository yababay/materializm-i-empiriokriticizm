import { json } from "@sveltejs/kit"
import { checkConnection } from "$lib/server/db"

const client = await checkConnection()

const key = 'materializm-i-empiriokriticizm:tags'

export const GET = async () => {

    let tags = await client.sMembers(key)

    if(!tags.length) {
        tags = [
            'переход_на_личности',
            'навешивание_ярлыков',
            'искажение_слов',
            'доведение_до_абсурда',
            'манипуляция_эмоциями',
            'принуждение_оправдываться',
            'обесценивание_достижений',
            'демагогия',
            'апелляция_к_эмоциям',
            'отвлечение_внимания',
            'подмена_тезиса',
            'опровержение_крайней_точки_зрения',
            'ложные_доводы',
            'аргумент_к_невежеству',
            'аргумент_к_авторитету',
            'оскорбления_и_грубость',
            'принуждение',
            'одностороннее_освещение'
        ]
        await client.sAdd(key, tags)
    }

    return json(tags)
}

export const POST = async ({request}) => {
    const data = (await request.json()) as string[]
    if(data.length) await client.sAdd(key, data)
    return json(await client.sMembers(key))
}
