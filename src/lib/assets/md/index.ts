import showdown from 'showdown'

const converter = new showdown.Converter()

import INTRO from './intro.md?raw'
import MATERIALIZM_I_EMPIRIOCRITICIZM from './Ilxin_Vl._Materializm_i_empiriokriticizm.md?raw'
import TABLE_OF_CONTENT from './table_of_content.md?raw'
import TABLE_OF_TAGGERS from './table_of_taggers.md?raw'

const articleByPath = (slug: string) => {

    switch(slug) {

        case 'intro':
            return INTRO

        case 'table-of-taggers':
            return TABLE_OF_TAGGERS

        case 'table-of-content':
            return TABLE_OF_CONTENT

        case 'materializm-i-empiriokriticizm':
            return MATERIALIZM_I_EMPIRIOCRITICIZM
        
        default:
            throw 'no such article'
    }
}

export const idBySlug = (slug: string) => {
    let id = -1
    switch(slug) {

        case 'materializm-i-empiriokriticizm':
            id = 2
            break
            
        default:
            throw 'no such article'
    }

    while (id < 1000000) id *= 10
    return id
}

export const markdownByPath = (slug: string) => converter.makeHtml(articleByPath(slug))
