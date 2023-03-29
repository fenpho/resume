<script setup>
import { Html5Qrcode } from "html5-qrcode"
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)

const scanNow = () => {
  const html5QrCode = new Html5Qrcode("reader");
  const qrCodeSuccessCallback = (decodedText, decodedResult) => {
  };
  const config = { fps: 10, qrbox: { width: 250, height: 250 } };

  html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback).catch(err => err);
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
    starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>

  <div id="reader"></div>
  <button class="scan" @click="scanNow">开始扫码</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
