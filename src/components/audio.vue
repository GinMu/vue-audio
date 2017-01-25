<template lang="html">
  <div class="player" @click.stop.prevent="startPlay">
    <svg class="progress" :width="svgOptions.width" :height="svgOptions.height">
      <path :fill="svgOptions.fill" :stroke="svgOptions.stroke" :stroke-width="svgOptions.strokeWidth"></path>
    </svg>
    <a :class="currentState" href="javascript:void(0)">
      <audio preload="auto" :src="source" :duration="time" :loop="loop" @ended="_end" @playing="_playing" @pause="_pause" @error="_error" @timeupdate="_timeupdate" @waiting="_waiting">
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
      progress: ''
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
      default: constant.SINGLE_PLAY
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
    _playing (e) {
      this.currentState = constant.PLAY_CLASS
      this._stopOther(e.target.parentNode.parentNode)
    },
    _pause () {
      this.currentState = constant.PAUSE_CLASS
    },
    _waiting () {
      this.currentState = constant.LOAD_CLASS
    },
    _end () {
      // 单曲循环不会触发ended事件
      this.progress = ''
      this._pause()
      this._typeControl()
    },
    _error (e) {
      console.log(e)
    },
    _typeControl () {
      // 单曲播放
      if (this.type === constant.SINGLE_PLAY) {
        return
      }
      let index = this.index
      let nextIndex
      // 顺序播放
      if (this.type === constant.ORDER_PLAY && index < this.audios.length - 1) {
        nextIndex = index + 1
        this.audios[nextIndex].play()
        return
      }

      // 列表循环
      if (this.type === constant.LISTING_CICLE) {
        if (index === this.audios.length - 1) {
          nextIndex = 0
        } else {
          nextIndex = index + 1
        }
        this.audios[nextIndex].play()
        return
      }

      // 随机播放
      if (this.type === constant.RANDOM_PLAY) {
        let audios = []
        for (let i = 0; i < this.audios.length; i++) {
          if (index !== i) {
            audios.push(this.audios[i])
          }
        }
        nextIndex = Math.floor(audios.length * Math.random())
        audios[nextIndex].play()
      }
    },
    _stopOther (target) {
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

<style lang="sass" src='./audio.scss' scoped>Error: Source sample is missing.</style>
