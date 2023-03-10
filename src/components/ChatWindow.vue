<template>
    <div class="chat-window">
        <p>{{ formattedId }}</p>
        <div v-if="error">{{ error }}</div>
        <div v-if="documents" class="messages" ref="messages">
            <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
                <span class="created-at">{{ doc.createdAt }}</span>
                <span class="name">{{ doc.name }}</span>
                <span class="messages">{{ doc.message }}</span>
            </div>
        </div>  
    </div>
</template>

<script>
import getCollection from '../composables/getCollection'
import { formatDistanceToNow } from 'date-fns'
import { computed, ref, onUpdated } from '@vue/runtime-core';
import getUser from '@/composables/getUser';
import createPath from '@/composables/createPath';

export default {
    props:['id'],
    setup(props){
        const { user } = getUser();
        const path = createPath(props.id, user.value.displayName);
        const { error, documents } = getCollection(path);
        const messages = ref(null);

        onUpdated(() => {
          messages.value.scrollTop = messages.value.scrollHeight;
        })
        
        const formattedId = computed(() => {
            return path;
        })
 
        const formattedDocuments = computed(() => {
            if(documents.value){
                return documents.value.map(doc => {
                    let time = formatDistanceToNow(doc.createdAt.toDate());
                    return { ...doc, createdAt: time }
                })
            }
        })
        
        return { error, documents, formattedDocuments, scroll, messages ,formattedId }
    }
}
</script>

<style scoped>
  .chat-window {
    background: #fafafa;
    padding: 30px 20px;
    text-align: left;
  }
  .single {
    margin: 18px 0;
  }
  .created-at {
    display: block;
    color: #999;
    font-size: 12px;
    margin-bottom: 4px;
  }
  .name {
    font-weight: bold;
    margin-right: 6px;
  }
  .messages {
    max-height: 400px;
    overflow: auto;
  }
</style>