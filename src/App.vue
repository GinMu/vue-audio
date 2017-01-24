<template>
  <div id="app">
    <div class="loop">
      <input type="checkbox" name="loop" v-model="loop" id="loop">
      <label for="loop">循环播放</label>
    </div>
    <vue-audio :source="source" :time="time" :loop="loop"></vue-audio>
    <vue-audio :source="source1" :time="time1" :loop="loop"></vue-audio>
  </div>
</template>

<script>
import vueAudio from './components/audio'
export default {
  name: 'app',
  components: {
    vueAudio
  },
  data () {
    return {
      source: 'http://file.kuyinyun.com/group2/M00/D0/F3/rBBGelaCOEiAW5kvAB35TVrIADs055.mp3',
      source1: 'http://file.kuyinyun.com/group2/M00/61/1A/rBBGelcTAZCAcQ4cAAcmErMReH4964.mp3',
      time: '0:48',
      time1: '0:22',
      loop: false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.loop {
  margin-bottom: 10px;
}
</style>
