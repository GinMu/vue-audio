<template>
  <div id="app">
    <vue-audio :source="source" :time="time"></vue-audio>
    <vue-audio :source="source" :time="time1"></vue-audio>
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
      source: 'http://file.kuyinyun.com/group2/M00/9A/6E/rBBGelZgIkmATL0JAAvWNGJ2mD0321.mp3',
      time: '0:48',
      time1: '0:49'
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
</style>
