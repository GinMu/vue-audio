<template lang="html">
  <div class="player" @click="startPlay">
    <svg class="progress" width="40px" height="40px">
      <path></path>
    </svg>
    <a :class="currentState" href="javascript:void(0)">
      <audio preload="none" :src="source" :duration="time">
      </audio>
      <p class="time" v-text="currentTime ? currentTime : time"></p>
    </a>
  </div>
</template>

<script>
import * as constant from './constant'
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
    }
  },
  mounted () {},
  methods: {
    startPlay (e) {
      let target = e.target.parentNode
      let audio = target.querySelector('audio')
      audio.addEventListener('timeupdate', this._progess)
      audio.addEventListener('ended', this._end)
      if (audio.paused || audio.ended) {
        this.currentState = constant.PLAY_CLASS
        audio.play()
      } else {
        this.currentState = constant.PAUSE_CLASS
        audio.pause()
      }
    },
    _progess (e) {
      let target = e.target
      let currentTime = target.currentTime
      let duration = target.duration
      let percent = (100 / duration * currentTime).toFixed(1)
      this.currentTime = percent + '%'
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
      path.setAttribute('fill', 'none')
      path.setAttribute('stroke', '#007aff')
      path.setAttribute('stroke-width', 2)
    },
    _end (e) {
      this.currentTime = ''
      this.currentState = constant.PAUSE_CLASS
    }
  }
}
</script>

<style lang="sass" src='./audio.scss'>Error: Source sample is missing.</style>
