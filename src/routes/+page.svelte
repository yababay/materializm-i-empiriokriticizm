<script lang="ts">

    import Article from '$lib/components/custom/Article.svelte'
    import Submit from '$lib/components/Submit.svelte'
    import Tags from '$lib/components/tags/index.svelte'
    import { onMount } from 'svelte';

    let article: HTMLDivElement
    let current: HTMLDivElement
    let owner: HTMLParagraphElement | undefined = undefined
    let tagger: Tags

    const ID_PREFIX = 2000000

    onMount(() => {
        
        const i = +(localStorage.getItem('previous') || 1)
        const paragraphs = Array.from(document.querySelectorAll('article p') as NodeListOf<HTMLParagraphElement>)
        const prev = paragraphs[i]
        if(prev) prev.scrollIntoView()

        document.addEventListener('selectionchange', async () => {
        const selection = window.getSelection();
            if(!(selection && selection.toString().length > 0)) return
            const text = selection.focusNode as Node
            owner = text.parentElement as HTMLParagraphElement
            const id = findParagraphId()
            if(!(current && parent && id > 0)) return
            current.textContent = owner.textContent.replace(/\d+\ \(\d+\%\)$/, '')
            tagger.reset()
            const tags = (await fetch(`/api/tags/${id}`).then(res => res.json())) as string[]
            tagger.restore(tags)
        });
    })

    const findParagraphId = () => {
        const paragraphs = document.querySelectorAll('article p') as NodeListOf<HTMLParagraphElement>
        for(const paragraph of paragraphs){
            const badge = paragraph.querySelector('.badge')
            if(badge) paragraph.removeChild(badge)
            paragraph.classList.remove('current')
        }

        let count = 1
        for(const paragraph of paragraphs) {
            if(paragraph !== owner){
                count++
                continue
            }
            paragraph.classList.add('current')
            const badge = document.createElement('span')
            badge.classList.add('badge')
            // ============
            const article = document.querySelector('article');
            if(!article) throw 'no percentage'
            const percentage = Math.round(article.scrollTop / article.scrollHeight * 100)
            //console.log(`The element has been scrolled ${elementScrolledAmount} pixels. Height = ${}`);

            badge.textContent = `${count} (${percentage}%)`
            paragraph.appendChild(badge)
            localStorage.setItem('previous', count + '')
            return count + ID_PREFIX
        }
        return -1
    }

    const submit = async (e: SubmitEvent) => {
        e.preventDefault()
        tagger.reset(owner ? owner : undefined)
        if(!owner) return
        let id = findParagraphId()
        const content = current.textContent.trim()
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

<form method="post" on:submit={submit} class="position-relative">
    <div class="row h-100">
        <div class="col-6 d-flex flex-column align-items-center justify-content-center">
            <div class="alert alert-light ps-5" role="alert" bind:this={current}></div>
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