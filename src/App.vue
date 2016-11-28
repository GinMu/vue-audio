<template>
  <div id="app">
    <vue-audio :source="source" :time="time"></vue-audio>
    <vue-audio :source="source1" :time="time1"></vue-audio>
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
      source: 'http://dl.stream.qqmusic.qq.com/C200003BIyA14TxbEW.m4a?vkey=2C5E52CABDFE66720A0C3477DA1D1ACB0E8B75B45AC932D5C3AE56C3EC1D7E044B60F877F27962278FEC84C305937B9B8301A73EA7379124&guid=7746565523&fromtag=30',
      source1: 'http://file.kuyinyun.com/group2/M00/61/1A/rBBGelcTAZCAcQ4cAAcmErMReH4964.mp3',
      time: '05:30',
      time1: '0:22'
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
