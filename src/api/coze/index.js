// Coze API 配置
const COZE_API_CONFIG = {
  baseURL: 'https://api.coze.cn/v3',
  botId: '7429205852169142307',
  userId: '2918520096325296'
}

// Coze API 客户端
export class CozeApiClient {
  constructor(token) {
    this.token = token;
  }

  async chat(message) {
    const response = await fetch(`${COZE_API_CONFIG.baseURL}/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bot_id: COZE_API_CONFIG.botId,
        user_id: COZE_API_CONFIG.userId,
        stream: true,
        auto_save_history: true,
        additional_messages: [{
          role: 'user',
          content: message,
          content_type: 'text'
        }]
      })
    });

    return response;
  }
}
