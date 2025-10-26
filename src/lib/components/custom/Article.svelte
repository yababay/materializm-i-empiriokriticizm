<script lang="ts">

    import './article.scss'

</script>

<article>
    <slot />
</article>

<style lang="scss">
    article {
        height: 100vh;
        padding: 1rem;
        min-width: 80ch;
        overflow-y: scroll;
    }
</style>
