<template>
  <div id="app">
    <div class="parameter">
      <input type="radio" name="single" :value="single_play" v-model="type" id="single">
      <label for="single">单曲播放</label>
      <input type="radio" name="loop" :value="single_cicle" v-model="type" id="loop">
      <label for="loop">单曲循环</label>
      <input type="radio" name="order" :value="order_play" v-model="type" id="order">
      <label for="order">顺序播放</label>
      <input type="radio" name="listing" :value="listing_cicle" v-model="type" id="listing">
      <label for="listing">列表循环</label>
    </div>
    <div class="audio-container">
      <vue-audio v-for="(list, index) of lists" :source="list.source" :time="list.time" :index="index" :type="type"></vue-audio>
    </div>
  </div>
</template>

<script>
import vueAudio from './components/audio'
import * as constant from './components/constant'
export default {
  name: 'app',
  components: {
    vueAudio
  },
  data () {
    return {
      lists: [{
        source: 'http://file.kuyinyun.com/group2/M00/D0/F3/rBBGelaCOEiAW5kvAB35TVrIADs055.mp3',
        time: '0:48'
      }, {
        source: 'http://file.kuyinyun.com/group2/M00/61/1A/rBBGelcTAZCAcQ4cAAcmErMReH4964.mp3',
        time: '0:22'
      }],
      type: constant.SINGLE_PLAY,
      single_play: constant.SINGLE_PLAY,
      single_cicle: constant.SINGLE_CICLE,
      order_play: constant.ORDER_PLAY,
      listing_cicle: constant.LISTING_CICLE
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

.parameter {
  margin-bottom: 10px;
}
</style>
