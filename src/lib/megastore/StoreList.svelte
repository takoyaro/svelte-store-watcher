<script lang="ts">
    import type {TStoreName} from './megastore';
    import StoreWatcher from './StoreWatcher.svelte';
    import {megastore} from './megastore';

    $:StoreNames = Object.keys($megastore) as TStoreName[];

</script>

{#each StoreNames as storeKey}
    <StoreWatcher store={$megastore[storeKey].store} name={storeKey} path={$megastore[storeKey].path} file={$megastore[storeKey].fileName}/>
{/each}