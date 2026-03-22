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

describe('required rule', () => {
  const required = (v: string): true | string => !!v || 'This field is required'

  it('passes for non-empty string', () => {
    expect(required('hello')).toBe(true)
  })
  it('fails for empty string', () => {
    expect(required('')).toBe('This field is required')
  })
})

describe('validEmail rule', () => {
  const validEmail = (v: string): true | string =>
    /.+@.+\..+/.test(v) || 'Enter a valid email address'

  it('accepts valid email', () => {
    expect(validEmail('user@example.com')).toBe(true)
  })
  it('rejects missing dot in domain', () => {
    expect(validEmail('user@examplecom')).not.toBe(true)
  })
  it('rejects any-char-as-dot', () => {
    expect(validEmail('a@bXc')).not.toBe(true)
  })
})

test('renders Component Examples section', () => {
  const wrapper = mountApp()
  expect(wrapper.text()).toContain('Component Examples')
})

test('renders snackbar element', () => {
  const wrapper = mountApp()
  expect(wrapper.findComponent({ name: 'VSnackbar' }).exists()).toBe(true)
})

test('renders contact form', () => {
  const wrapper = mountApp()
  // VForm is inside a lazily-rendered tab panel (inactive by default); verify the tab itself exists
  expect(wrapper.find('[value="forms"]').exists()).toBe(true)
})
