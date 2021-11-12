import fs from 'fs';
const toIgnore = ["global.d.ts","hooks.ts","hooks.js","megastore.ts"];

export default function svelteMegaStore () {
    
    return {
      name: 'svelte-mega-store', // this name will show up in warnings and errors
      buildStart () {
        console.log("buildStart")
        return null; // other ids should be handled as usually
      },
      handleHotUpdate(){
        console.log("HMR Update")
        //buildMegaStore();
        return null;
      }
    };
  }

	async function buildMegaStore(){
		let tree = await buildTree("./src",[]);
    for await (const file of tree) {
        let fileContents = fs.readFileSync(`${file.path}/${file.name}`).toString(); 
        let stores = fileContents.matchAll(/export\s+const\s+(?<varName>.*?)(:Writable<(.*?)>)*\s*=\s*(?<type>readable|writable)\(.*?\);/g);
        for(let store of stores){
            if(store.groups){
                let {varName} = store.groups;
                if(varName){
                    file.vars = (file.vars) ? [...file.vars,varName] : [varName];
                }
            }
        }
    }
    tree = tree.filter((f)=>f.vars);
    let vars = tree.flatMap((t)=>t.vars);

// 		fs.writeFileSync('./src/lib/megastore/megastore.svelte',
// `<script lang="ts">
//     import StoreWatcher from './StoreWatcher.svelte';
//     import megastore from './megastore/;
//     ${tree.map((f)=>`import {${f.vars.join(',')}} from '${resolvePath(f.path)}${fileWithoutExtension(f.name)}'`).join(`\r\n\t`)}
// </script>

// ${tree.map((f)=>`${f.vars.map((v)=>`<StoreWatcher store={${v}} name="${v}" path="${f.path}" file="${f.name}"/>`).join('\r\n')}`).join(`\r\n`)}`);

fs.writeFileSync('./src/lib/megastore/megastore.ts',
`import { writable } from 'svelte/store';
import type { Writable, Readable } from 'svelte/store';
${tree.map((f)=>`import {${f.vars.join(',')}} from '${resolvePath(f.path)}${fileWithoutExtension(f.name)}'`).join(`\r\n`)}

export const megastore:TMegastore = writable({
    ${tree.map((b)=>b.vars.map((v)=>`${v}:{
      history:[],
      store:${v},
      storeName:"${v}",
      fileName:"${b.name}",
      path:"${b.path}"
    }`).join(',\r\n\t')).join(',\r\n\t')}
});

export type TStoreName = ${vars.map(v=>`"${v}"`).join("|")}
interface IStore {
  history:{ time:Date, value:any}[],
  store:Writable<any>|Readable<any>,
  storeName:TStoreName,
  fileName:string,
  path:string
}
type TMegastore = Writable<{[key in TStoreName]:IStore}>;
`)
}

	async function buildTree(path,tree){
    let pathChunks = path.split('/');
    let files = fs.readdirSync(path,{'withFileTypes':true}).filter((d)=>d.isFile()==true);
    let dirs = fs.readdirSync(path,{'withFileTypes':true}).filter((d)=>d.isDirectory()==true);
    let meaningfulFiles = files.filter((f)=>
        !toIgnore.includes(f.name) && !f.name.includes(".d.ts") &&
        (f.name.includes('.ts') || f.name.includes('.svelte'))
    )
    if(meaningfulFiles.length){
        tree = [...tree,...meaningfulFiles.map((f)=>{return {name:f.name,path:path}})];
    }
    if(dirs.length){
        for (const dir of dirs) {
            const newTreeBranch = await buildTree(`${pathChunks.join('/')}/${dir.name}`,tree);
            tree = [...new Set([...tree,...newTreeBranch])];
        }
    }
    return tree;
  }

  function resolvePath(path){
    const toIgnore = ['src','.'];
    const chunks = path.split('/').filter((p)=>!toIgnore.includes(p));
    return `./../../${chunks.join('/')}${(chunks.length) ? "/" : ''}`
  }

  function fileWithoutExtension(fileName){
    let chunks = fileName.split('.');
    chunks.pop();
    return chunks.join('.');
  }