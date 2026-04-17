import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import HeroCard from './HeroCard.vue'

const vuetify = createVuetify()

function mountHeroCard() {
  return mount(HeroCard, { global: { plugins: [vuetify] } })
}

test('HeroCard mounts without error', () => {
  const wrapper = mountHeroCard()
  expect(wrapper.exists()).toBe(true)
})

test('renders app title', () => {
  const wrapper = mountHeroCard()
  expect(wrapper.text()).toContain('Vue 3 + Vuetify Starter')
})

test('renders four feature list items', () => {
  const wrapper = mountHeroCard()
  const items = wrapper.findAllComponents({ name: 'VListItem' })
  expect(items.length).toBe(4)
})

test('external link has rel=noopener noreferrer', () => {
  const wrapper = mountHeroCard()
  const link = wrapper.find('a[target="_blank"]')
  expect(link.exists()).toBe(true)
  const rel = link.attributes('rel') ?? ''
  expect(rel).toContain('noopener')
  expect(rel).toContain('noreferrer')
})

test('external link has aria-label', () => {
  const wrapper = mountHeroCard()
  const link = wrapper.find('a[target="_blank"]')
  const label = link.attributes('aria-label') ?? ''
  expect(label).toContain('Vuetify documentation')
})
