<template>
  <div class="web-sdk-demo">
    <h2>Coze Web SDK Demo</h2>
    <div id="coze-container"></div>
  </div>
</template>

<script>
export default {
  name: 'WebSDKDemo',
  mounted() {
    // Web SDK implementation
    const script = document.createElement('script');
    script.src = 'https://cdn.coze.cn/sdk/latest/coze.js';
    document.head.appendChild(script);

    script.onload = () => {
      window.Coze.init({
        appId: process.env.VUE_APP_COZE_APP_ID,
        container: '#coze-container'
      });
    };
  }
}
</script>
