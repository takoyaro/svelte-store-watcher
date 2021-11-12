<script lang="ts">
    import StoreWatcher from './StoreWatcher.svelte';
    import {rootStore} from './../../rootstore'
	import {myBoolStore,myStringStore,myReadableStore,myHotReloadedStore} from './../../routes/stores'
</script>

<StoreWatcher store={rootStore} name="rootStore" path="./src" file="rootstore.ts"/>
<StoreWatcher store={myBoolStore} name="myBoolStore" path="./src/routes" file="stores.ts"/>
<StoreWatcher store={myStringStore} name="myStringStore" path="./src/routes" file="stores.ts"/>
<StoreWatcher store={myReadableStore} name="myReadableStore" path="./src/routes" file="stores.ts"/>
<StoreWatcher store={myHotReloadedStore} name="myHotReloadedStore" path="./src/routes" file="stores.ts"/>