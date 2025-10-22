<script lang="ts">

    import Article from '$lib/components/custom/Article.svelte'
    import Submit from '$lib/components/Submit.svelte'
    import Tags from '$lib/components/tags/index.svelte'
    import { onMount } from 'svelte';

    let article: HTMLDivElement
    let current: HTMLDivElement
    let owner: HTMLParagraphElement | undefined = undefined
    let tags: Tags

    onMount(() => {
        document.addEventListener('selectionchange', () => {
        const selection = window.getSelection();
            if(!(selection && selection.toString().length > 0)) return
            const text = selection.focusNode as Node
            const parent = text.parentElement as HTMLParagraphElement
            if(!(current && parent)) return
            current.textContent = parent.textContent
            owner = parent
            tags.reset()
        });
    })

    const submit = async (e: SubmitEvent) => {
        e.preventDefault()
        tags.reset(owner ? owner : undefined)
        if(!owner) return
        const paragraphs = document.querySelectorAll('article p') as NodeListOf<HTMLParagraphElement>
        let id = 2000001
        for(const paragraph of paragraphs) {
            if(paragraph !== owner){ 
                id++
                continue
            }
            const content = owner.textContent.trim()
            if(!content) break
            const { dataset } = paragraph
            if(!dataset) break
            const { tags } = dataset
            if(!(tags && tags.length)) break
            const arr = JSON.parse(tags)
            const body = JSON.stringify({id, tags: arr, content })
            const res = await fetch('/api/paragraph', { method: 'post', headers: {'Content-Type': 'application/json'}, body })
            if(res.status !== 200) throw 'bad status'
            break
        }
        current.textContent = ''
        owner = undefined
    }
</script>

<form method="post" on:submit={submit}>
    <div class="row h-100">
        <div class="col-6 d-flex flex-column align-items-center justify-content-center">
            <div class="alert alert-light ps-5" role="alert" bind:this={current}>
            </div>
            <Tags url="/api/tags" bind:this={tags}/>
            <Submit />
        </div>
        <div class="col-6 pe-5" bind:this={article}>
            <Article />
        </div>
    </div>
</form>

<style lang="scss">
    .alert {
        width: 60ch;
    }
</style>