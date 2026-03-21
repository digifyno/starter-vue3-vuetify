import { readFileSync } from 'fs'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import App from './App.vue'

const vuetify = createVuetify()

function mountApp() {
  return mount(App, {
    global: { plugins: [vuetify] }
  })
}

test('App mounts without error', () => {
  const wrapper = mountApp()
  expect(wrapper.exists()).toBe(true)
})

test('renders with Vuetify v-app wrapper', () => {
  const wrapper = mountApp()
  expect(wrapper.find('.v-application').exists()).toBe(true)
})

test('external links have rel=noopener noreferrer', () => {
  const wrapper = mountApp()
  const externalLinks = wrapper.findAll('a[target="_blank"]')
  expect(externalLinks.length).toBeGreaterThan(0)
  for (const link of externalLinks) {
    const rel = link.attributes('rel') ?? ''
    expect(rel).toContain('noopener')
    expect(rel).toContain('noreferrer')
  }
})

test('index.html contains CSP meta tag', () => {
  const html = readFileSync('index.html', 'utf-8')
  expect(html).toContain('Content-Security-Policy')
  expect(html).toContain('unsafe-inline')
  expect(html).toContain('data:')
})
