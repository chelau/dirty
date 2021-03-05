import { writable, get } from 'svelte/store';
import { localStorage } from './stores.js'

export const teams = writable([]);


export function saveTeamsToLocalStorage() {
    get(localStorage).setItem('teams', JSON.stringify(get(teams)));
}