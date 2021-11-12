<script lang="ts">
    import type { Writable, Readable } from "svelte/store";
    import type {TStoreName} from './megastore';
    import {megastore} from './megastore';

    export let store:Writable<any>|Readable<any>;
    export let name:TStoreName;
    export let path;
    export let file;
    
    store.subscribe((v)=>{
        $megastore[name].history.push({time:new Date(),value:v});
        $megastore[name].history = [...new Set($megastore[name].history)];
    })
    function formatStore(){
        const directTypes = ['bigint','boolean','number','symbol','undefined','function'];
        if(directTypes.includes(typeof $store)) return $store
        else if(typeof $store == 'string') return `"${$store}"`
        else return JSON.stringify($store);
    }

</script>

<div class="flex flex-col">
    <span><strong>{name}</strong><small>{path}/{file}</small></span>
    {#key $store}
        <pre>{formatStore()}</pre>
    {/key}
    {#key $megastore[name].history}
        <pre>
            {#each $megastore[name].history as historyEntry}
                {historyEntry.time} - {historyEntry.value}<br/>
            {/each}
        </pre>
    {/key}
</div>

<style>
    div{
        background-color:hsl(220deg,20%,90%);
        padding:0.5rem 1rem;
        margin: 1rem;
        border-radius:0.5rem;
        box-shadow: 0 0.1rem 0.5rem rgba(40,40,40,0.25);
    }
    pre{
        background-color:hsl(220deg,10%,95%);
        padding:0.5rem;
        border-radius:0.25rem;
    }
    span{
        width:100%;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size:smaller
    }
    .flex{
        display:flex;
    }
    .flex-col{
        flex-direction: column;
    }
</style>