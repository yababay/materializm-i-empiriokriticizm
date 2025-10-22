<script lang="ts">
    import { onMount } from 'svelte'
    import { writable, derived } from 'svelte/store'
    import Autocomplete from './autocomplete.js'

    export let 
    tags: string[] = [],
    url: string = '/tags.json',
    separator: string = ' '

    export const reset = async (p?: HTMLDivElement) => {
        const body = JSON.stringify($reactiveTags)
        if(p) p.dataset['tags'] = body
        const update = await fetch('/api/tags', { method: 'post', headers: {'Content-Type': 'application/json'}, body }).then(res => res.json())
        if(autocomplete) autocomplete.setData(update)
        $reactiveTags = []
    }

    export const restore = (tags: string[]) => {
        $reactiveTags = tags
    }
    
    const reactiveTags = writable(Array.isArray(tags) && tags.length && tags.sort() || [])
    const badgesHtml = derived(reactiveTags, (tags) => tags.map(tag => `<span style="cursor: pointer" class="badge text-bg-primary tag-badge">${tag}</span>`))

    let badges: HTMLParagraphElement, input: HTMLInputElement, hidden: HTMLInputElement
    
    const tagsListener = (tag: string, del: boolean = false) => {
        const current = $reactiveTags
        const sorted = [...new Set([...current, tag])].sort()
        const update = del ? current.filter(t => t !== tag) : sorted
        $reactiveTags = update
    }

    const updateTags = () =>  {
        tagsListener(input.value.trim())
        input.value = ''
    }

    function tagUp(e: KeyboardEvent){
        if(e.code !== 'ArrowUp') return
        updateTags()
    }

    let autocomplete: Autocomplete

    onMount(() => {
        const settings = {
            onSelectItem: () => {
                updateTags()
            }
        }
        autocomplete = Reflect.construct(Autocomplete, [input, settings])
        reactiveTags.subscribe(tags => {
            hidden.value = tags.join(separator)
        })

        badgesHtml.subscribe(tags => {
            badges.innerHTML = tags.join('&nbsp;')
            for(const badge of badges.childNodes){
                if(!(badge instanceof HTMLSpanElement)) continue
                badge.addEventListener('click', () => {
                    const update = $reactiveTags.filter(tag => tag !== badge.textContent)
                    $reactiveTags = update
                })
            }
        })
    })

</script>

<div class="d-flex flex-column justify-content-end wrapper align-items-center m-3">

    <p bind:this={badges} class="text-center w-100 ps-3 pe-3"></p>
    <input name="tags" type="hidden" bind:this={hidden}>

    <div class="w-50">
        <input
            data-server={url}
            type="text"
            class="form-control w-100"
            placeholder="выберите или введите тэги"
            bind:this={input}
            on:keydown={tagUp}
        />
    </div>
</div>

<style lang="scss">
    .wrapper {
        height: 80px;
        width: 80ch;
    }

    input::placeholder {
        text-align: center;
    }
</style>