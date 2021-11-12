import { writable } from 'svelte/store';
import type { Writable, Readable } from 'svelte/store';
import {rootStore} from './../../rootstore'
import {myBoolStore,myStringStore,myReadableStore,myHotReloadedStore,mySecondHotReloadedStore} from './../../routes/stores'

export const megastore:TMegastore = writable({
    rootStore:{
      history:[],
      store:rootStore,
      storeName:"rootStore",
      fileName:"rootstore.ts",
      path:"./src"
    },
	myBoolStore:{
      history:[],
      store:myBoolStore,
      storeName:"myBoolStore",
      fileName:"stores.ts",
      path:"./src/routes"
    },
	myStringStore:{
      history:[],
      store:myStringStore,
      storeName:"myStringStore",
      fileName:"stores.ts",
      path:"./src/routes"
    },
	myReadableStore:{
      history:[],
      store:myReadableStore,
      storeName:"myReadableStore",
      fileName:"stores.ts",
      path:"./src/routes"
    },
	myHotReloadedStore:{
      history:[],
      store:myHotReloadedStore,
      storeName:"myHotReloadedStore",
      fileName:"stores.ts",
      path:"./src/routes"
    },
	mySecondHotReloadedStore:{
      history:[],
      store:mySecondHotReloadedStore,
      storeName:"mySecondHotReloadedStore",
      fileName:"stores.ts",
      path:"./src/routes"
    }
});

export type TStoreName = "rootStore"|"myBoolStore"|"myStringStore"|"myReadableStore"|"myHotReloadedStore"|"mySecondHotReloadedStore"
interface IStore {
  history:{ time:Date, value:any}[],
  store:Writable<any>|Readable<any>,
  storeName:TStoreName,
  fileName:string,
  path:string
}
type TMegastore = Writable<{[key in TStoreName]:IStore}>;
