<script lang="ts">

    import showdown from 'showdown'
    import MATERIALIZM_I_EMPIRIOCRITICIZM from '$lib/assets/Ilxin_Vl._Materializm_i_empiriokriticizm?raw'

    const converter = new showdown.Converter()

</script>

<article>{@html converter.makeHtml(MATERIALIZM_I_EMPIRIOCRITICIZM)}</article>
