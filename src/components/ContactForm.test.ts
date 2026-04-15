import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import ContactForm from './ContactForm.vue'

const vuetify = createVuetify()

function mountContactForm() {
  return mount(ContactForm, {
    global: { plugins: [vuetify] }
  })
}

test('ContactForm mounts without error', () => {
  const wrapper = mountContactForm()
  expect(wrapper.exists()).toBe(true)
})

test('renders contact form heading', () => {
  const wrapper = mountContactForm()
  expect(wrapper.text()).toContain('Contact Form')
})

test('renders Send Message and Reset buttons', () => {
  const wrapper = mountContactForm()
  const buttons = wrapper.findAll('button')
  expect(buttons.find(b => b.text().includes('Send Message'))).toBeDefined()
  expect(buttons.find(b => b.text().includes('Reset'))).toBeDefined()
})

test('form fields start empty', () => {
  const wrapper = mountContactForm()
  const state = wrapper.vm as any
  expect(state.form.firstName).toBe('')
  expect(state.form.lastName).toBe('')
  expect(state.form.email).toBe('')
  expect(state.form.topic).toBe('')
  expect(state.form.message).toBe('')
})

test('required rule passes for non-empty string', () => {
  const wrapper = mountContactForm()
  const state = wrapper.vm as any
  expect(state.required('hello')).toBe(true)
})

test('required rule fails for empty string', () => {
  const wrapper = mountContactForm()
  const state = wrapper.vm as any
  expect(state.required('')).toBe('This field is required')
})

test('required rule fails for whitespace-only string', () => {
  const wrapper = mountContactForm()
  const state = wrapper.vm as any
  expect(state.required('   ')).toBe('This field is required')
})

test('validEmail passes for valid email', () => {
  const wrapper = mountContactForm()
  const state = wrapper.vm as any
  expect(state.validEmail('user@example.com')).toBe(true)
})

test('validEmail fails for invalid email', () => {
  const wrapper = mountContactForm()
  const state = wrapper.vm as any
  expect(state.validEmail('notanemail')).toBe('Enter a valid email address')
})

test('submitForm emits form-submitted with AI-generated message on success', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    json: vi.fn().mockResolvedValue({
      content: [{ text: 'Thank you for reaching out, Jane!' }]
    })
  }))
  const spy = vi.fn()
  const wrapper = mount(ContactForm, {
    global: { plugins: [vuetify] },
    props: { onFormSubmitted: spy },
  })
  const state = wrapper.vm as any
  state.form.firstName = 'Jane'
  state.form.lastName  = 'Doe'
  state.form.topic     = 'General Inquiry'
  state.formValid      = true
  await state.submitForm()
  await wrapper.vm.$nextTick()
  expect(spy).toHaveBeenCalledWith({ firstName: 'Jane', message: 'Thank you for reaching out, Jane!' })
  vi.unstubAllGlobals()
})

test('submitForm falls back to static message when fetch throws', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))
  const spy = vi.fn()
  const wrapper = mount(ContactForm, {
    global: { plugins: [vuetify] },
    props: { onFormSubmitted: spy },
  })
  const state = wrapper.vm as any
  state.form.firstName = 'Jane'
  state.formValid      = true
  await state.submitForm()
  await wrapper.vm.$nextTick()
  expect(spy).toHaveBeenCalledWith({ firstName: 'Jane', message: "Thanks, Jane! Your message has been sent." })
  vi.unstubAllGlobals()
})

test('isSubmitting is false after submitForm completes', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    json: vi.fn().mockResolvedValue({ content: [{ text: 'Thanks!' }] })
  }))
  const wrapper = mountContactForm()
  const state = wrapper.vm as any
  state.form.firstName = 'Jane'
  state.formValid      = true
  expect(state.isSubmitting).toBe(false)
  const promise = state.submitForm()
  await promise
  expect(state.isSubmitting).toBe(false)
  vi.unstubAllGlobals()
})

test('submitForm resets form fields after emit', async () => {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    json: vi.fn().mockResolvedValue({ content: [{ text: 'Thanks!' }] })
  }))
  const wrapper = mountContactForm()
  const state = wrapper.vm as any
  state.form.firstName = 'Jane'
  state.form.lastName  = 'Doe'
  state.form.email     = 'jane@example.com'
  state.form.topic     = 'General Inquiry'
  state.form.message   = 'Hello!'
  state.formValid      = true
  await state.submitForm()
  await wrapper.vm.$nextTick()
  expect(state.form.firstName).toBe('')
  expect(state.form.lastName).toBe('')
  expect(state.form.email).toBe('')
  expect(state.form.topic).toBe('')
  expect(state.form.message).toBe('')
  vi.unstubAllGlobals()
})

test('resetForm clears all fields', async () => {
  const wrapper = mountContactForm()
  const state = wrapper.vm as any
  state.form.firstName = 'Test'
  state.form.email     = 'test@example.com'
  state.resetForm()
  await wrapper.vm.$nextTick()
  expect(state.form.firstName).toBe('')
  expect(state.form.email).toBe('')
})
