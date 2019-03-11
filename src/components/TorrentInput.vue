<template>
      <div class="home">
  <!--  <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="file-selector">
    <form id="file-selector-form">
        <div class="wrapper-file-picker" data-text="Select your file">
        <input v-on:change="populate" id="file-picker" class="file-picker" name="file-picker" type="file" value="" multiple>
        <span v-on:click="getFileDetails" id="button-download-torrent" class="button-download-torrent">Download</span>
        </div>
</form>
</div>
  </div>
</template>
<script>
const { ipcRenderer } = require('electron')
export default {
  name: 'HeroSection',
  methods: {
    populate (event) {
      event.srcElement.parentElement.dataset.text = [...event.target.files].map(({ name }) => (name))
      event.srcElement.parentElement.className += ' wrapper-file-picker-change'
    },
    async getFileDetails (event) {
      event.preventDefault()
      const files = await [...document.getElementById('file-picker').files]
      const filesformatted = files.map(({ path: pathName }) => ({
        pathName
      }))
      ipcRenderer.send('files', filesformatted)
    }
  }
}
</script>
<style lang="scss">
.home {
  .file-selector {
    margin: 1em;
    @import '@/scss/elements/_filepicker.scss';
}
}
</style>
