<template>
  <div class="container" :key="id">
    <Navbar/>
    <ChatWindow :id="id"/>
    <NewChatForm :id="id"/> 
  </div>
  <UsersDisplay :id="id" />
</template>

<script>
import NewChatForm from "../components/NewChatForm.vue"
import ChatWindow from "../components/ChatWindow.vue"
import UsersDisplay from "../components/UsersDisplay.vue"
import Navbar from '../components/Navbar.vue'
import getUser from '@/composables/getUser';
import { watch, onUpdated, computed } from '@vue/runtime-core';
import { useRouter } from 'vue-router';

export default {
  props:['id'],
  components: {Navbar,ChatWindow,NewChatForm,UsersDisplay},
  setup(props){
    const { user } = getUser();
    const router = useRouter();
    
    const id = computed(() => {
      return props.id
    })
  
    watch(user, () => {
      if(!user.value){
        router.push({ name: 'Welcome'})
      } 
    })

    return { id }
  }
}
</script>

<style >
 
</style>