<template>
    <div>Users</div>
    <span v-for="doc in formattedDocuments" :key="doc.id" class="single">
        <span class="dot" :style="{'background-color':doc.color}" @click="handleClick(doc.name)">
            {{ doc.name.charAt(0).toUpperCase() }}
        </span>
    </span>
    <div></div>
</template>

<script>
import getCollection from '../composables/getCollection'
import getUser from '@/composables/getUser';
import { computed } from 'vue';
export default {
    setup(){
        const { error, documents } = getCollection('messages');
      
        const formattedDocuments = computed(() => {
            if(documents.value){
                console.log([...new Map(documents.value.map(item => [item['name'], item])).values()]);
                return [...new Map(documents.value.map(item => [item['name'], item])).values()];
            }
        })

        const handleClick = (x) => {
            console.log("click",x);
        }
        
        console.log(formattedDocuments);

        return { formattedDocuments, handleClick }
    }
}
</script>

<style>
.dot {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  display: inline-block;
  margin: 3px;
  font-size: 40px;
}
</style>