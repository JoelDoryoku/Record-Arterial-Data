<script>
    import { allData } from "./store";

    let datos = [];

    if ($allData.length > 0) {
        datos = $allData.split(';');
        datos.pop();
        datos.reverse();
    }
</script>

<section class="pt-4">
    <hgroup>
        <h2>Últimas entradas</h2>
        <hr>
    </hgroup>
    <section id="registros" class="grid">
        {#each datos as data}
            <article class="mt-0">
                <hgroup>
                    <h3>{data.split(',')[0]}</h3>
                </hgroup>
                <div class="datos-registro grid">
                    <p><b>Presión Sistólica:</b> {data.split(',')[1]}</p>
                    <p><b>Presión Diastólica:</b> {data.split(',')[2]}</p>
                    <p><b>Pulsaciones por minuto:</b> {data.split(',')[3]}</p>
                </div>
            </article>
        {/each}
    </section>
</section>