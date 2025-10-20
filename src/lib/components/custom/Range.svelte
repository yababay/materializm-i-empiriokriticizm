<script lang="ts">

    export 
        let name: string,
        step: number = 1,
        value: number = 0,
        min: number = 0,
        max: number = 100

    const id = `id-for-${name}`

</script>

<input type="range" class="form-range" {min} {max} {id} {name} {step} {value} data-checkid={id} >