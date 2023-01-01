<script>
    import { onMount } from "svelte";
    import bb, { line } from "billboard.js";
    import { allData } from "./store";

    let datos = [];

    if ($allData.length > 0) {
        datos = $allData.split(';');
        datos.pop();
        datos = datos.slice(Math.max(datos.length - 10, 0));
    }

    let columnas = [
        calcularMedia("fecha", datos, 0),
        calcularMedia("pSistolica", datos, 1),
        calcularMedia("pDiastolica", datos, 2),
        calcularMedia("pXMinuto", datos, 3)
    ];

    onMount(() => {
        var chart = bb.generate({
            data: {
                xs: {
                    pSistolica: "fecha",
                    pDiastolica: "fecha",
                    pXMinuto: "fecha"
                },
                columns: columnas,
                type: line(),
            },
            bindto: "#multipleXYLineChart"
        });
    });

    function calcularMedia(nombre, array, posicion) {
        let result = [nombre], fechas = [];
        let cantFechaRepetida = 0, totalDatos = 0;
        let fechaAnterior = '';

        for (let i = 0; i < array.length; i++) {
            let data = array[i].split(',')[posicion];
            let fecha = array[i].split(',')[0];

            switch (posicion) {
                case 0:
                    if (!fechas.includes(fecha)) {
                        fechas.push(fecha);
                        result.push(fechas.length);
                    }
                    break;
                    
                case 1:
                case 2:
                case 3:
                    data = parseInt(data);

                    if (fecha !== fechaAnterior && fechaAnterior !== '') {
                        let media = totalDatos / cantFechaRepetida;
                        result.push(media);
                        
                        cantFechaRepetida = 1;
                        totalDatos = data;
                    } else {
                        cantFechaRepetida++;
                        totalDatos += data;
                    }
                    
                    fechaAnterior = fecha;
                    break;
            }
        }

        if (posicion != 0 && array.length != 0) {
            let media = totalDatos / cantFechaRepetida;
            result.push(media);
        }

        return result;
    }
</script>

<section class="pt-4">
    <hgroup>
        <h2>Gráfico de datos</h2>
        <hr>
    </hgroup>
    <div id="multipleXYLineChart"></div>
</section>