<template>
    <div>Users</div>
    <span v-for="doc in formattedDocuments" :key="doc.id" class="single">
        <span class="dot" :style="{'background-color':doc.color}" @click="handleClick(doc.name)">
            <router-link class="link" :to="{ name: `Chatroom`, params: { id: doc.name}}">
                {{ doc.name.charAt(0).toUpperCase() }}
            </router-link>
        </span>
    </span>
    <div></div>
</template>

<script>
import getCollection from '../composables/getCollection'
import getUser from '@/composables/getUser';
import createPath from '@/composables/createPath';
import { computed } from 'vue';
export default {
    props:['id'],
    setup(props){
        const { user } = getUser();
        const path = createPath(props.id, user.value.displayName);
        const { error, documents } = getCollection(path);
        const formattedDocuments = computed(() => {
            if(documents.value){
                return [...new Map(documents.value.map(item => [item['name'], item])).values()];
            }
        })

        const handleClick = (x) => {
            console.log("click",x);
        }

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
.link{
    text-decoration: none;
}
</style>