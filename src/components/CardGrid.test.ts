import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import CardGrid from './CardGrid.vue'

const vuetify = createVuetify()

function mountCardGrid() {
  return mount(CardGrid, {
    global: { plugins: [vuetify] }
  })
}

test('CardGrid mounts without error', () => {
  const wrapper = mountCardGrid()
  expect(wrapper.exists()).toBe(true)
})

test('renders three feature cards', () => {
  const wrapper = mountCardGrid()
  const cards = wrapper.findAllComponents({ name: 'VCard' })
  expect(cards.length).toBe(3)
})

test('renders Vue 3 Composition API card', () => {
  const wrapper = mountCardGrid()
  expect(wrapper.text()).toContain('Vue 3 Composition API')
})

test('renders Vuetify 3 Components card', () => {
  const wrapper = mountCardGrid()
  expect(wrapper.text()).toContain('Vuetify 3 Components')
})

test('renders Vite 7 Tooling card', () => {
  const wrapper = mountCardGrid()
  expect(wrapper.text()).toContain('Vite 7 Tooling')
})

test('share buttons have card-specific aria-labels', () => {
  const wrapper = mountCardGrid()
  const shareButtons = wrapper.findAll('[aria-label^="Share "]')
  expect(shareButtons.length).toBe(3)
  expect(wrapper.find('[aria-label="Share Vue 3 Composition API"]').exists()).toBe(true)
  expect(wrapper.find('[aria-label="Share Vuetify 3 Components"]').exists()).toBe(true)
  expect(wrapper.find('[aria-label="Share Vite 7 Tooling"]').exists()).toBe(true)
})
