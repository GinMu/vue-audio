<template lang="html">
  <div class="player" @click.stop.prevent="startPlay">
    <svg class="progress" :width="svgOptions.width" :height="svgOptions.height">
      <path :fill="svgOptions.fill" :stroke="svgOptions.stroke" :stroke-width="svgOptions.strokeWidth"></path>
    </svg>
    <a :class="currentState" href="javascript:void(0)">
      <audio preload="auto" :index="index" :src="source" :duration="time" :loop="loop" @ended="_end" @play="_play" @pause="_pause" @error="_error" @timeupdate="_timeupdate">
      </audio>
      <p class="time" v-text="time"></p>
    </a>
  </div>
</template>

<script>
import * as constant from './constant'
let currentTarget
export default {
  data () {
    return {
      currentTime: '',
      currentState: constant.PAUSE_CLASS,
      audios: []
    }
  },
  props: {
    source: {
      type: String,
      default: ''
    },
    time: {
      type: String,
      default: ''
    },
    type: {
      type: Number,
      default: constant.ORDER_PLAY
    },
    index: {
      type: Number,
      default: 0
    },
    svgOptions: {
      type: Object,
      default () {
        return {
          width: '40px',
          height: '40px',
          fill: 'none',
          stroke: '#007aff',
          strokeWidth: '2'
        }
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.audios = document.getElementsByTagName('audio')
    })
  },
  computed: {
    loop () {
      return this.type === constant.SINGLE_CICLE
    }
  },
  methods: {
    startPlay (e) {
      let target = e.currentTarget
      this._singlePlay(target)
      let audio = target.querySelector('audio')
      if (audio.paused || audio.ended) {
        audio.play()
      } else {
        audio.pause()
      }
    },
    _timeupdate (e) {
      let target = e.target
      let currentTime = target.currentTime
      let duration = target.duration
      let percent = (100 / duration * currentTime).toFixed(1)
      if (isNaN(percent) || percent === '0.0') {
        percent = 0
      }
      target.nextElementSibling.innerText = percent === 0 ? e.target.getAttribute('duration') : percent + '%'
      let svg = target.parentNode.previousElementSibling
      if (percent > 100) {
        percent = 100
      }
      let radius = 19
      let centerX = svg.width.animVal.value / 2
      let centerY = svg.height.animVal.value / 2
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
    _play (e) {
      e.target.parentNode.className = constant.PLAY_CLASS
    },
    _pause (e) {
      e.target.parentNode.className = constant.PAUSE_CLASS
    },
    _end (e) {
      let target = e.target
      this._pause(e)
      target.nextElementSibling.innerText = target.getAttribute('duration')
      let index = parseInt(target.getAttribute('index'))
      if (index >= this.audios.length - 1) {
        return
      }
      this.audios[index + 1].play()
    },
    _error (e) {
      console.log(e)
    },
    _singlePlay (target) {
      if (currentTarget && currentTarget !== target) {
        let audio = currentTarget.querySelector('audio')
        audio.pause()
        if (audio.currentTime > 0) {
          audio.currentTime = 0
        }
      }
      currentTarget = target
    }
  }
}
</script>

<style lang="sass" src='./audio.scss'>Error: Source sample is missing.</style>
