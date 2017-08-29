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
      <vue-audio v-for="(list, index) of lists"
                  :source="list.source"
                  :index="index"
                  :mode="mode"
                  :key="index"
                  @timeupdate="timeupdate"
                  @playing="playing"
                  @pause="pause"
                  @ended="ended"
                  @waiting="waiting"
                  @error="error">
        <div class="player">
          <svg class="progress" :width="svgOptions.width" :height="svgOptions.height">
            <path :fill="svgOptions.fill" :stroke="svgOptions.stroke" :stroke-width="svgOptions.strokeWidth"></path>
          </svg>
          <a class="play" href="javascript:void(0)">
          </a>
        </div>
      </vue-audio>
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
      random_mode: constant.RANDOM,
      svgOptions: {
        width: 40,
        height: 40,
        fill: 'none',
        stroke: '#007aff',
        strokeWidth: 2
      }
    }
  },
  methods: {
    timeupdate (e) {
      let target = e.target
      let currentTime = target.currentTime
      let duration = target.duration
      let percent = (100 / duration * currentTime).toFixed(1)
      if (isNaN(percent) || percent === '0.0') {
        percent = 0
      }
      let svg = target.parentNode.querySelector('svg')
      if (percent > 100) {
        percent = 100
      }
      let centerX = this.svgOptions.width / 2
      let centerY = this.svgOptions.height / 2
      let radius = centerX - this.svgOptions.strokeWidth / 2
      let startX = centerX
      let startY = centerY - radius
      let xAxisRotation = 0
      let sweepFlag = 1
      let circ = Math.PI * 2
      let largeArcFlag = 0
      if (percent * circ / 100 >= Math.PI) {
        largeArcFlag = 1
      }
      let endX = centerX + radius * Math.sin(circ * percent / 100)
      let endY = centerY - radius * Math.cos(circ * percent / 100)
      let d = 'M' + startX + ',' + startY + ' ' + 'A' + radius + ',' + radius + ' ' + xAxisRotation + ' ' + largeArcFlag + ' ' + sweepFlag + ' ' + endX + ',' + endY
      let path = svg.querySelector('path')
      path.setAttribute('d', d)
    },
    playing (e) {
      let ele = e.path ? e.path[1] : e.target.parentElement
      ele.querySelector('a').className = constant.PLAY_CLASS
    },
    pause (e) {
      let ele = e.path ? e.path[1] : e.target.parentElement
      ele.querySelector('a').className = constant.PAUSE_CLASS
    },
    ended (e) {
      let ele = e.path ? e.path[1] : e.target.parentElement
      ele.querySelector('a').className = constant.PAUSE_CLASS
    },
    waiting (e) {
      let ele = e.path ? e.path[1] : e.target.parentElement
      ele.querySelector('a').className = constant.LOAD_CLASS
    },
    error (e) {
      console.log(e)
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
<style lang="sass" src='./components/audio.scss' scoped>Error: Source sample is missing.</style>
