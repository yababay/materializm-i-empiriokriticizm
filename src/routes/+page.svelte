<script lang="ts">

    import Range from "$lib/components/custom/Range.svelte"

</script>

<tr>
    <td><Range min={0} max={5} name="range" /></td>
    <td>Среди них выделялся самый высокий, долговязый, с весьма серьезным лицом и с тросточкой, увенчанной старинным автомобильным клаксоном с резиновой черной «грушей». Он невозмутимо шагал с дымящейся трубкой в зубах, в коротких штанах с пуговичками пониже колен, в серых шерстяных чулках, в черных ботинках. В клетчатом пиджаке. Шею подпирал белоснежный твердый воротничок с детским шелковым бантом. </td>
</tr>

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
