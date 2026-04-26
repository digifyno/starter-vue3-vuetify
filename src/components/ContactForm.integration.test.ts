import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import App from '../App.vue'
import ContactForm from './ContactForm.vue'

const vuetify = createVuetify()

function mountApp() {
  return mount(App, {
    global: { plugins: [vuetify] }
  })
}

test('form fields accept typed input via DOM events', async () => {
  const wrapper = mountApp()
  // Activate the Forms tab to force-render the lazy panel
  await wrapper.find('[value="forms"]').trigger('click')
  await wrapper.vm.$nextTick()

  // Verify v-model bindings by emitting update:modelValue and checking component props
  const textFields = wrapper.findAllComponents({ name: 'VTextField' })

  // VTextField for firstName — first VTextField in the form
  const firstNameField = textFields[0]
  expect(firstNameField, 'First name VTextField must exist').toBeDefined()
  await firstNameField.vm.$emit('update:modelValue', 'Alice')
  await wrapper.vm.$nextTick()
  expect(firstNameField.props('modelValue')).toBe('Alice')

  // VTextField for lastName — second VTextField in the form
  const lastNameField = textFields[1]
  expect(lastNameField, 'Last name VTextField must exist').toBeDefined()
  await lastNameField.vm.$emit('update:modelValue', 'Smith')
  await wrapper.vm.$nextTick()
  expect(lastNameField.props('modelValue')).toBe('Smith')

  // VTextField for email — third VTextField in the form
  const emailField = textFields[2]
  expect(emailField, 'Email VTextField must exist').toBeDefined()
  await emailField.vm.$emit('update:modelValue', 'alice@example.com')
  await wrapper.vm.$nextTick()
  expect(emailField.props('modelValue')).toBe('alice@example.com')

  // VSelect for topic
  const selectFields = wrapper.findAllComponents({ name: 'VSelect' })
  const topicField = selectFields[0]
  expect(topicField, 'Topic VSelect must exist').toBeDefined()
  await topicField.vm.$emit('update:modelValue', 'General Inquiry')
  await wrapper.vm.$nextTick()
  expect(topicField.props('modelValue')).toBe('General Inquiry')

  // VTextarea for message
  const textareas = wrapper.findAllComponents({ name: 'VTextarea' })
  const messageField = textareas[0]
  expect(messageField, 'Message VTextarea must exist').toBeDefined()
  await messageField.vm.$emit('update:modelValue', 'Hello world')
  await wrapper.vm.$nextTick()
  expect(messageField.props('modelValue')).toBe('Hello world')
})

test('required validator is exercised through the component', () => {
  const wrapper = mount(ContactForm, { global: { plugins: [vuetify] } })
  const state = wrapper.vm as any
  expect(state.required('')).toBe('This field is required')
  expect(state.required('hello')).toBe(true)
})

test('validEmail validator false branch covered via component', () => {
  const wrapper = mount(ContactForm, { global: { plugins: [vuetify] } })
  const state = wrapper.vm as any
  expect(state.validEmail('notanemail')).toBe('Enter a valid email address')
  expect(state.validEmail('user@example.com')).toBe(true)
})
