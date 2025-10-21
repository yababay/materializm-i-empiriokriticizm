<script lang="ts">

    import Range from "$lib/components/custom/Range.svelte"

    export let data: { sentences: string[] }

    const { sentences } = data

</script>

{#each sentences as sentence, i}
    <tr>
        <td><Range min={0} max={5} name={'range_' + i} /></td>
        <td>{sentence}</td>
    </tr>
{/each}

<style lang="scss">
    tr {
        width: 151ch;
        td {
            &:first-child {
                width: 10ch;
            };
            &:last-child {
                max-width: 140ch;
                white-space: nowrap; /* Prevents text from wrapping to the next line */
                overflow: hidden; /* Hides any overflowing content */
                text-overflow: ellipsis; /* Displays an ellipsis to indicate truncated text */            
            }
        }
    }
</style>
