<template>
  <div id="app">
    <div class="parameter">
      <input type="radio" name="single" :value="single_mode" v-model="mode" id="single">
      <label for="single">single</label>
      <input type="radio" name="loop" :value="loop_mode" v-model="mode" id="loop">
      <label for="loop">loop</label>
      <input type="radio" name="order" :value="order_mode" v-model="mode" id="order">
      <label for="order">order</label>
      <input type="radio" name="listing" :value="circulation_mode" v-model="mode" id="circulation">
      <label for="circulation">circulation</label>
      <input type="radio" name="random" :value="random_mode" v-model="mode" id="random">
      <label for="random">random</label>
    </div>
    <div class="audio-container">
      <vue-audio v-for="(list, index) of lists" :source="list.source" :time="list.time" :index="index" :mode="mode"></vue-audio>
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
        source: 'http://file.kuyinyun.com/group2/M00/EF/C0/rBBGelUPiWiACpYhAAQfE72-jHE679.mp3',
        time: '0:16'
      }, {
        source: 'http://file.kuyinyun.com/group2/M00/61/1A/rBBGelcTAZCAcQ4cAAcmErMReH4964.mp3',
        time: '0:22'
      }, {
        source: 'http://file.kuyinyun.com/group1/M00/94/83/rBBGdFYkXFuAYuTRAA2ax4_NmEk387.mp3',
        time: '0:55'
      }, {
        source: 'http://file.kuyinyun.com/group2/M00/84/DF/rBBGelZL7EuAKFL_ABiwByGtPBo792.mp3',
        time: '0:33'
      }],
      mode: constant.SINGLE,
      single_mode: constant.SINGLE,
      loop_mode: constant.LOOP,
      order_mode: constant.ORDER,
      circulation_mode: constant.CIRCULATION,
      random_mode: constant.RANDOM
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
