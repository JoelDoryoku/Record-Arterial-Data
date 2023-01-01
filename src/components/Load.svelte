<script>
    import { onMount } from "svelte";

    onMount(() => {
        setTimeout(() => {
            window.location.href = '/app/';
        }, 8000);
    });
</script>

<html lang="es">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        
    </head>

    <body class="m-0 p-0">
        <section class="bg-green-500 h-screen">
            <div class="bg-black h-0.5 fixed top-2/4" style="animation: loading 7s ease-in-out forwards;"></div>
        </section>
    </body>
</html>