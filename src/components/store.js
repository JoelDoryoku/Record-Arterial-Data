import { writable } from 'svelte/store';

let stored = localStorage.storedData;

export let allData = writable(stored || []);