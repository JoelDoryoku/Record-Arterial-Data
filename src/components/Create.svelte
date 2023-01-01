<script>
    import { onMount } from "svelte";


    function goBack() {
        window.location.href = "/Record-Arterial-Data/";
    }

    function handleSubmit(e) {
        const formData = new FormData(e.target);
        let result = "";

        for (let field of formData) {
            const [key, value] = field;
            result += `${value},`;
        }

        if (localStorage.storedData === undefined) {
            localStorage.storedData = `${result};`;
        } else {
            localStorage.storedData += `${result};`;
        }

        openModal(document.getElementById("entry-added"));

        e.target.reset();
    }

    // Config
    const isOpenClass = 'modal-is-open';
    const openingClass = 'modal-is-opening';
    const closingClass = 'modal-is-closing';
    const animationDuration = 400; // ms
    let visibleModal = null;

    // Toggle modal
    const toggleModal = () => {
        const modal = document.getElementById("entry-added");
        (typeof(modal) != 'undefined' && modal != null)
            && isModalOpen(modal) ? closeModal(modal) : openModal(modal)
    }

    // Is modal open
    const isModalOpen = modal => {
        return modal.hasAttribute('open') && modal.getAttribute('open') != 'false' ? true : false;
    }

    // Open modal
    const openModal = modal => {
        if (isScrollbarVisible()) {
            document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);
        }
        document.documentElement.classList.add(isOpenClass, openingClass);
        setTimeout(() => {
            visibleModal = modal;
            document.documentElement.classList.remove(openingClass);
        }, animationDuration);
        modal.setAttribute('open', true);
    }

    // Close modal
    const closeModal = modal => {
        visibleModal = null;
        document.documentElement.classList.add(closingClass);
        setTimeout(() => {
            document.documentElement.classList.remove(closingClass, isOpenClass);
            document.documentElement.style.removeProperty('--scrollbar-width');
            console.log(modal);
            modal.removeAttribute('open');
        }, animationDuration);
    }

    // Get scrollbar width
    const getScrollbarWidth = () => {

        // Creating invisible container
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll'; // forcing scrollbar to appear
        outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
        document.body.appendChild(outer);

        // Creating inner element and placing it in the container
        const inner = document.createElement('div');
        outer.appendChild(inner);

        // Calculating difference between container's full width and the child width
        const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

        // Removing temporary elements from the DOM
        outer.parentNode.removeChild(outer);

        return scrollbarWidth;
    }

    // Is scrollbar visible
    const isScrollbarVisible = () => {
        return document.body.scrollHeight > screen.height;
    }

    onMount(() => {
        document.getElementById('fecha').valueAsDate = new Date();

        // Close with a click outside
        document.addEventListener('click', event => {
        if (visibleModal != null) {
            const modalContent = visibleModal.querySelector('article');
            const isClickInside = modalContent.contains(event.target);
            !isClickInside && closeModal(visibleModal);
        }
        });

        // Close with Esc key
        document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && visibleModal != null) {
            closeModal(visibleModal);
        }
        });
    });
</script>

<!--<button id="add-more" class="bg-orange-200 p-3 rounded-full h-14 w-14 border-2 border-white fixed bottom-5 right-1/4 translate-x-3/4">M</button>-->
<button
    on:click={goBack}
    id="return"
    class="bg-orange-200 p-3 rounded-full h-14 w-14 border-2 border-white fixed bottom-5 left-1/4 -translate-x-3/4"
    >&#10094;</button
>

<article>
    <form
        action="#"
        name="form"
        id="add-new-result"
        on:submit|preventDefault={handleSubmit}
    >
        <input
            type="date"
            id="fecha"
            name="fecha"
            placeholder="Fecha"
            required
            readonly
        />

        <div class="grid">
            <input
                type="number"
                id="ps"
                name="ps"
                placeholder="Presión Sistólica"
                required
            />
            <input
                type="number"
                id="ds"
                name="ds"
                placeholder="Presión Diastólica"
                required
            />
        </div>

        <input
            type="number"
            id="pm"
            name="pm"
            placeholder="Pulsaciones por minuto"
            required
        />
    </form>
</article>

<dialog id="entry-added">
    <article>
        <header>
            <a
            href="#close"
            aria-label="Close"
            class="close"
            data-target="entry-added"
            on:click={toggleModal}
            />
            Alerta
        </header>
        <p>¡Datos añadidos correctamente!</p>
        <footer>
            <a
                href="#confirm"
                role="button"
                data-target="entry-added"
                on:click={toggleModal}
            >
                Confirm
            </a>
        </footer>
    </article>
</dialog>
