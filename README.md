# vue-audio

> A simple audio player based on Vue 2.x which supports single, loop, order, circulation, and random mode

* [demo](https://ginmu.github.io/vue-audio/)

# Options

Here list Props on swipe component

| Option | Description |
| ----- | ----- |
| source | String(required:true) - src of audio. |
| time | String(default: '') - time of audio. |
| mode | Number (default:0) - player mode. |
| index | Number (default:0, required: true) - the current audio index in the playlist.  |
| preload | String (default:'none') |
| autoplay | Boolean (default:false) |
| muted | Boolean (default:false) |
| svgOptions | Object (default:{ width: 40, height: 40, fill: 'none', stroke: '#007aff', strokeWidth: 2 }) |



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```
