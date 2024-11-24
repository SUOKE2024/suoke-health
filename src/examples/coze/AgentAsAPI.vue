<template>
  <div class="agent-as-api-demo">
    <h2>Coze Agent as API Demo</h2>
    <CozeChat />
  </div>
</template>

<script>
import CozeChat from '@/components/Chat/CozeChat.vue'

export default {
  name: 'AgentAsAPIDemo',
  components: {
    CozeChat
  }
}
</script>
