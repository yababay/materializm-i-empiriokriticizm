<script lang="ts">

    import './article.scss'
    import showdown from 'showdown'
    import MATERIALIZM_I_EMPIRIOCRITICIZM from '$lib/assets/Ilxin_Vl._Materializm_i_empiriokriticizm.md?raw'

    const converter = new showdown.Converter()

</script>

<article>
    {@html converter.makeHtml(MATERIALIZM_I_EMPIRIOCRITICIZM)}
</article>

<style lang="scss">
    article {
        height: 100vh;
        padding: 1rem;
        min-width: 80ch;
        overflow-y: scroll;
    }
</style>
