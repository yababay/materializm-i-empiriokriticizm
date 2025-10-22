<script lang="ts">

    import Article from '$lib/components/custom/Article.svelte'
    import Submit from '$lib/components/Submit.svelte'
    import Tags from '$lib/components/tags/index.svelte'
    import { onMount } from 'svelte';

    let article: HTMLDivElement
    let current: HTMLDivElement
    let owner: HTMLParagraphElement | undefined = undefined
    let tagger: Tags

    onMount(() => {
        document.addEventListener('selectionchange', async () => {
        const selection = window.getSelection();
            if(!(selection && selection.toString().length > 0)) return
            const text = selection.focusNode as Node
            const parent = text.parentElement as HTMLParagraphElement
            if(!(current && parent)) return
            current.textContent = parent.textContent
            owner = parent
            tagger.reset()
            const id = findParagraphId()
            const tags = (await fetch(`/api/tags/${id}`).then(res => res.json())) as string[]
            tagger.restore(tags)
        });
    })

    const findParagraphId = () => {
        const paragraphs = document.querySelectorAll('article p') as NodeListOf<HTMLParagraphElement>
        let id = 2000001
        for(const paragraph of paragraphs) {
            if(paragraph === owner) return id
        }
        throw 'paragraph is not found'
    }

    const submit = async (e: SubmitEvent) => {
        e.preventDefault()
        tagger.reset(owner ? owner : undefined)
        if(!owner) return
        let id = findParagraphId()
        const content = owner.textContent.trim()
        if(!content) return
        const { dataset } = owner
        if(!dataset) return
        const { tags } = dataset
        if(!(tags && tags.length)) return
        const arr = JSON.parse(tags)
        const body = JSON.stringify({id, tags: arr, content })
        const res = await fetch('/api/paragraph', { method: 'post', headers: {'Content-Type': 'application/json'}, body })
        if(res.status !== 200) throw 'bad status'
        current.textContent = ''
        owner = undefined
    }
</script>

<form method="post" on:submit={submit}>
    <div class="row h-100">
        <div class="col-6 d-flex flex-column align-items-center justify-content-center">
            <div class="alert alert-light ps-5" role="alert" bind:this={current}>
            </div>
            <Tags url="/api/tags" bind:this={tagger}/>
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