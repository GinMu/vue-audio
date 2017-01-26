import Vue from 'vue'
import App from 'src/App'

const vm = new Vue({
  el: document.createElement('div'),
  render: (h) => h(App)
})

describe('App.vue', () => {
  it('should render correct document', () => {
    expect(vm.$el.querySelector('[for="single"]').textContent)
      .to.equal('single-play')

    expect(vm.$el.querySelector('[for="loop"]').textContent)
      .to.equal('single-cicle')

    expect(vm.$el.querySelector('[for="order"]').textContent)
      .to.equal('order-play')

    expect(vm.$el.querySelector('[for="listing"]').textContent)
      .to.equal('listing-cicle')

    expect(vm.$el.querySelector('[for="random"]').textContent)
      .to.equal('random-play')

    expect(vm.$el.getElementsByClassName('vue-audio').length)
      .to.equal(4)
  })
})

// describe('single play', function () {
//   let audios = vm.$el.getElementsByClassName('player')[0]
//   before(function () {
//     audios.click()
//   })
//
//   it('audio should be played', function (done) {
//     expect(audios.querySelector('a').className)
//       .to.equal('pause')
//   })
// })
