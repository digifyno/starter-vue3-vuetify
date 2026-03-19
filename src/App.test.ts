import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import App from './App.vue'

const vuetify = createVuetify()

test('App mounts without error', () => {
  const wrapper = mount(App, {
    global: { plugins: [vuetify] }
  })
  expect(wrapper.exists()).toBe(true)
})
