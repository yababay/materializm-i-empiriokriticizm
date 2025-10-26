<script lang="ts">

    import { markdownByPath } from '$lib/assets/md';
    import Article from '$lib/components/custom/Article.svelte'

    export let data: { slug: string }
    
    const { slug } = data

</script>

<Article>
    {@html markdownByPath(slug)}
</Article>