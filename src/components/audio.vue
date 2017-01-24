<template lang="html">
  <div class="player" @click.stop.prevent="startPlay">
    <svg class="progress" :width="svgOptions.width" :height="svgOptions.height">
      <path :fill="svgOptions.fill" :stroke="svgOptions.stroke" :stroke-width="svgOptions.strokeWidth"></path>
    </svg>
    <a :class="currentState" href="javascript:void(0)">
      <audio preload="auto" :src="source" :duration="time" :loop="loop">
      </audio>
      <p class="time">{{time}}</p>
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
      currentState: constant.PAUSE_CLASS
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
    loop: {
      type: Boolean,
      default: false
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
  mounted () {},
  methods: {
    startPlay (e) {
      let target = e.currentTarget
      this._singlePlay(target)
      let audio = target.querySelector('audio')
      audio.addEventListener('error', this._error)
      audio.addEventListener('play', this._play)
      if (audio.paused || audio.ended) {
        target.querySelector('a').className = constant.PLAY_CLASS
        audio.play()
      } else {
        target.querySelector('a').className = constant.PAUSE_CLASS
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
    _end (e) {
      let target = e.target
      target.nextElementSibling.innerText = target.getAttribute('duration')
      target.parentNode.className = constant.PAUSE_CLASS
    },
    _error (e) {
      console.log(e)
    },
    _play (e) {
      let audio = e.target
      audio.addEventListener('timeupdate', this._timeupdate)
      audio.addEventListener('ended', this._end)
    },
    _singlePlay (target) {
      if (currentTarget && currentTarget !== target) {
        currentTarget.querySelector('a').className = constant.PAUSE_CLASS
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
