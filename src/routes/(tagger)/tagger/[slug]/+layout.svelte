<script lang="ts">
	import favicon from '$lib/assets/favicon.svg'
    import Toc from '$lib/components/custom/Toc.svelte';
	import Bare from '$lib/components/layout/Bare.svelte'

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Bare title="Работа с тэгами">
	<section class="w-100 h-100 position-relative">
			<a href="/" title="На главную" class="position-absolute" id="nav"><span class="bi bi-house"></span></a>
		<div class="row w-100">
			<div class="col-4">
				<Toc />
			</div>
			<div class="col-8">{@render children?.()}</div>
		</div>
	</section>
</Bare>
