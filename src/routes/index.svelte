<script lang="ts">
    import StoreList from '$lib/megastore/StoreList.svelte';
    import {rootStore} from './../rootstore';
  
</script>
<button on:click={()=>{rootStore.set(Math.floor(Math.random()*100).toString())}}>Update the rootStore with a random number</button>
<StoreList/>