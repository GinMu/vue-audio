<template lang="html">
  <div class="player" @click.stop.prevent="startPlay">
    <svg class="progress" :width="svgOptions.width" :height="svgOptions.height">
      <path :fill="svgOptions.fill" :stroke="svgOptions.stroke" :stroke-width="svgOptions.strokeWidth" :d="d"></path>
    </svg>
    <a :class="currentState" href="javascript:void(0)">
      <audio class="vue-audio" :muted="muted" :autoplay="autoplay" :preload="preload" :src="source" :loop="loop" @ended="_ended" @playing="_playing" @pause="_pause" @error="_error" @timeupdate="_timeupdate" @waiting="_waiting">
      </audio>
      <p class="time" v-text="currentProgress"></p>
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
      audios: [],
      progress: '',
      d: ''
    }
  },
  props: {
    source: {
      type: String,
      required: true,
      validator: function (value) {
        return value
      }
    },
    time: {
      type: String,
      default: ''
    },
    mode: {
      type: Number,
      default: constant.SINGLE
    },
    index: {
      type: Number,
      default: 0,
      required: true
    },
    preload: {
      type: String,
      default: 'none',
      validator: function (value) {
        return value === 'none' || value === 'auto' || value === 'metadata'
      }
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    muted: {
      type: Boolean,
      default: false
    },
    svgOptions: {
      type: Object,
      default () {
        return {
          width: 40,
          height: 40,
          fill: 'none',
          stroke: '#007aff',
          strokeWidth: 2
        }
      }
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.audios = document.getElementsByClassName('vue-audio')
    })
  },
  computed: {
    loop () {
      return this.mode === constant.LOOP
    },
    currentProgress () {
      return this.progress || this.time
    }
  },
  methods: {
    startPlay (e) {
      let target = e.currentTarget
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
      this.progress = percent === 0 ? '' : percent + '%'
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
      this.d = d
    },
    _playing (e) {
      this.currentState = constant.PLAY_CLASS
      this._stopOther(e.path[2])
    },
    _pause () {
      this.currentState = constant.PAUSE_CLASS
    },
    _waiting () {
      this.currentState = constant.LOAD_CLASS
    },
    _ended () {
      // it doesn't trigger end event when the mode is loop
      this.progress = ''
      this._pause()
      this._typeControl()
    },
    _error (e) {
      console.log(e)
    },
    _typeControl () {
      // single mode
      if (this.mode === constant.SINGLE) {
        return
      }
      let index = this.index
      let nextIndex
      // order mode
      if (this.mode === constant.ORDER && index < this.audios.length - 1) {
        nextIndex = index + 1
        this.audios[nextIndex].play()
        return
      }

      // circulation mode
      if (this.mode === constant.CIRCULATION) {
        if (index === this.audios.length - 1) {
          nextIndex = 0
        } else {
          nextIndex = index + 1
        }
        this.audios[nextIndex].play()
        return
      }

      // random mode
      if (this.mode === constant.RANDOM) {
        nextIndex = Math.floor((this.audios.length - 1) * Math.random())
        if (nextIndex >= index) {
          nextIndex += 1
        }
        this.audios[nextIndex].play()
      }
    },
    _stopOther (target) {
      // stop other audio which is playing
      if (currentTarget && currentTarget !== target) {
        let audio = currentTarget.querySelector('audio')
        audio.pause()
        audio.currentTime = 0
      }
      currentTarget = target
    }
  }
}
</script>

<style lang="sass" src='./audio.scss' scoped>Error: Source sample is missing.</style>
