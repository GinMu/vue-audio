# vue-audio

> A simple audio player based on Vue 2.x which supports single, loop, order, circulation, and random mode

* [demo](https://ginmu.github.io/vue-audio/)

##audio component props

| props | description | type | default | required | values
| :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| source | src of audio | string | "" | true | |
| index | the current audio index in the playlist | number | 0 | true | |
| mode | player mode | number | 0 | false | 0:single、1:order、2:loop、3:circulation、4:random |
| preload | | string | 'none' | false | "none"、 "auto"、 "metadata" |
| autoplay | | boolean | false | false | |
| muted | | boolean | false | false | |

 

##Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```


