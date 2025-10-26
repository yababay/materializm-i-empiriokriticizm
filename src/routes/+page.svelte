<script>
    import { markdownByPath } from "$lib/assets/md";


    import Article from "$lib/components/custom/Article.svelte";

</script>

<Article>
    {@html markdownByPath('intro')}
</Article>
