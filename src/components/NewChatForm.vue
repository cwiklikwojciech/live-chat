<template>
  <form>
    <textarea 
        placeholder="Type a message and hit entet to send..."
        v-model="message"
        @keypress.enter.prevent="handleSubmit"
    ></textarea>
    <div class="error">{{ error }}</div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import getUser from '@/composables/getUser';
import { timestamp } from '../firebase/config'
import useCollection from '@/composables/useCollection';
import createPath from '@/composables/createPath';

export default {
    props:['id'],
    setup(props){
        const { user } = getUser();
        const path = createPath(props.id, user.value.displayName);
        const { addDoc, error } = useCollection(path);
        const message = ref('');

        const handleSubmit = async () => {
            const chat = {
                name: user.value.displayName,
                message: message.value,
                createdAt: timestamp(),
                color: user.value.photoURL
            }

            
            await addDoc(chat);
            
            if(!error.value){
                message.value = '';
            }
        }

        return {message, handleSubmit, error}
    }
}
</script>

<style scoped>
  form{
    margin: 0;
  }
  textarea{
    width: 100%;
    max-width: 100%;
    margin-bottom: 6px;
    padding: 10px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    font-family: inherit;
    outline: none;
  }
</style>