<script setup>
import { ref } from 'vue';
const proxy = "https://frozen-hamlet-96080.herokuapp.com/"
const _score = ref("");
const id = () => {let s = _score.value.split('/'); return s[s.length - 1].trim();}
const urls = ref([]);
const loading = ref(true);
const landscape = ref(true);
const vb = ref('0 0 8.5 11')
async function getImages() {
  urls.value = []
  if (id().length === 0) return;
  let i = 0
  loading.value = true;
  while(loading.value) {
    let res = await fetch(`${proxy}https://musescore.com/api/jmuse?id=${id()}&index=${i}&type=img&v2=1`,
    {
    "headers": {
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Authorization": "8c022bdef45341074ce876ae57a48f64b86cdcf5",
    },
    "method": "GET",
    "mode": "cors"
});
    let url = (await res.json()).info.url;
    let res2 = await fetch(proxy + url);
    if(res2.ok) {
      urls.value.push(url);
    }
    else {loading.value = false;}
    i++;
  }
  console.log(urls.value)
}

function print() {
  window.print();
}

</script>

<template class="pages">
  <div class="controls">
    <p>Score URL</p>
    <input v-model="_score"/>
    <button :onclick="getImages">Grab!</button> <button :disabled="loading" :onclick="print">Print!</button>
  </div>
  <hr/>
  <div class="pages">
    <template v-for="url in urls">
      <svg :viewBox="landscape? '0 0 11 8.5':'0 0 8.5 11'" width=512px > 
        <image :href="url" :width="landscape ? '11' : '8.5'"/>
      </svg>
    </template>
  </div>

</template>

<style scoped>
.pages {
  display:block;
  justify-items: center;
}
hr {
  margin:2em;
  color:grey;
}
/*
img {
  width:512px;
}*/

@media print {
  .controls {
    display: none;
  }
  hr {
    display: none;
  }
  
  svg { 
  page-break-inside: avoid;
  page-break-after: always;
}
}
</style>
