<template>
  <div class="coze-chat">
    <div class="chat-messages" ref="messagesContainer">
      <div v-for="msg in messages" :key="msg.id" :class="['message', msg.role]">
        {{ msg.content }}
      </div>
    </div>
    <div class="chat-input">
      <input v-model="inputMessage" @keyup.enter="sendMessage" placeholder="输入消息...">
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script>
import { CozeApiClient } from '@/api/coze';

export default {
  name: 'CozeChat',
  data() {
    return {
      client: null,
      messages: [],
      inputMessage: '',
    }
  },
  created() {
    this.client = new CozeApiClient(process.env.VUE_APP_COZE_TOKEN);
  },
  methods: {
    async sendMessage() {
      if (!this.inputMessage.trim()) return;
      
      const userMessage = {
        role: 'user',
        content: this.inputMessage,
        id: Date.now()
      };
      
      this.messages.push(userMessage);
      this.inputMessage = '';

      try {
        const response = await this.client.chat(userMessage.content);
        const reader = response.body.getReader();
        let partialMessage = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const text = new TextDecoder().decode(value);
          const events = text.split('\n\n');
          
          for (const event of events) {
            if (event.startsWith('data:')) {
              const data = JSON.parse(event.slice(5));
              if (data.content) {
                partialMessage += data.content;
              }
            }
          }
        }

        this.messages.push({
          role: 'assistant',
          content: partialMessage,
          id: Date.now()
        });
      } catch (error) {
        console.error('发送消息失败:', error);
      }
    }
  }
}
</script>

<style scoped>
.coze-chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message {
  margin: 10px 0;
  padding: 10px;
  border-radius: 8px;
}

.user {
  background: #e3f2fd;
  margin-left: 20%;
}

.assistant {
  background: #f5f5f5;
  margin-right: 20%;
}

.chat-input {
  display: flex;
  padding: 20px;
  gap: 10px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #1565c0;
}
</style>
