<template>
  <div class="container">
    <Navbar/>
    <ChatWindow />
    <NewChatForm /> 
  </div>
  <UsersDisplay />
</template>

<script>
import NewChatForm from "../components/NewChatForm.vue"
import ChatWindow from "../components/ChatWindow.vue"
import UsersDisplay from "../components/UsersDisplay.vue"
import Navbar from '../components/Navbar.vue'
import getUser from '@/composables/getUser';
import { watch } from '@vue/runtime-core';
import { useRouter } from 'vue-router';

export default {
  components: {Navbar,ChatWindow,NewChatForm,UsersDisplay},
  setup(){
    const { user } = getUser();
    const router = useRouter()
    
    watch(user, () => {
      if(!user.value){
        router.push({ name: 'Welcome'})
      } 
    })
  }
}
</script>

<style >
 
</style>