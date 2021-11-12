import type {Writable} from 'svelte/store';
import {writable,readable} from 'svelte/store';

export const myBoolStore:Writable<boolean> = writable(false);
export const myStringStore = writable("");
export const myReadableStore = readable({name:"Jimmy",age:35,favoriteDrinks:["Coffee","Nihonshu","Umeshu"]});
export const myHotReloadedStore = writable({hot:"reloaded"});
export const mySecondHotReloadedStore = writable({superhot:"reloaded"});