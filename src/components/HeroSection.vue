<template>
    <div class="main-content">
  <torrent-input></torrent-input>
  <torrent-information></torrent-information>
    </div>
</template>
<script>
import TorrentInput from '@/components/TorrentInput.vue'
import TorrentInformation from '@/components/TorrentInformation.vue'
export default {
  name: 'HeroSection',
  components: {
    TorrentInput,
    TorrentInformation
  }
}
</script>

<style lang="scss" scoped>
.main-content {
        display: grid;
    grid-template-rows: 15% 85%;
    justify-items: center;
    justify-content: center;
    align-items: center;
}
</style>
