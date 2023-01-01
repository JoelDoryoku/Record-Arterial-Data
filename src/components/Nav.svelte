<script>
    function addEntry() {
        if (window.location.href.match('/create/')) {
            document.form.requestSubmit();
        } else {
            window.location.href = '/Record-Arterial-Data/create/';
        }
    }
</script>

<header class="fixed bottom-0 left-0 bg-neutral-800 w-screen text-white border-white border-t-2">
    <nav>
        <ul class="relative h-12">
            <li class="rounded-full bg-green-500 w-14 h-14 fixed text-white left-2/4 -translate-x-2/4 bottom-5 border-2 border-white text-center text-4xl p-px" on:click={addEntry}>+</li>
        </ul>
    </nav>
</header>