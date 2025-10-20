<script lang="ts">
	import favicon from '$lib/assets/favicon.svg'
	import Bare from '$lib/components/layout/Bare.svelte'
	import Table from '$lib/components/Table.svelte'

	let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Bare title="Оценка текста">
	<Table columns={['Токсичность', 'Предложение']}>
		{@render children?.()}
	</Table>
</Bare>
