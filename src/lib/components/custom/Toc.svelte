<script lang="ts">

    import { markdownByPath } from '$lib/assets/md'
    import { onMount } from 'svelte'

    export let tagger = false

    onMount(() => {
        const lis = document.querySelectorAll('#toc li') as NodeListOf<HTMLLIElement>
        for(const li of lis) {
            li.classList.add('list-group-item')
        }
    })

</script>

<h5 class="ms-3 mt-5 mb-3">Содержание</h5>

<ul class="list-group w-100" id="toc">

    {#if !tagger}
        {@html markdownByPath('table-of-content')}
    {:else}    
        {@html markdownByPath('table-of-taggers')}
    {/if}

</ul>
