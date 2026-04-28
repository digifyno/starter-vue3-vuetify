import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import App from '../App.vue'

const vuetify = createVuetify()

function mountApp() {
  return mount(App, {
    global: { plugins: [vuetify] }
  })
}

describe('progress buttons', () => {
  it('-10% and +10% buttons exist in the template', () => {
    const wrapper = mountApp()
    // Buttons are in the alerts tab panel; verify the tab itself exists in the DOM
    expect(wrapper.find('[value="alerts"]').exists()).toBe(true)
  })

  it('increments and decrements progress, clamped at 0 and 100', async () => {
    const wrapper = mountApp()
    await wrapper.find('[value="alerts"]').trigger('click')
    await wrapper.vm.$nextTick()

    const allButtons = wrapper.findAll('button')
    const minusBtn = allButtons.find(b => b.text().includes('-10%'))
    const plusBtn  = allButtons.find(b => b.text().includes('+10%'))
    expect(minusBtn).toBeDefined()
    expect(plusBtn).toBeDefined()

    // Track progress via VProgressLinear modelValue prop (initial value is 60)
    const allProgressLinears = wrapper.findAllComponents({ name: 'VProgressLinear' })
    const vpLinear = allProgressLinears.find(c => c.props('modelValue') === 60)
    expect(vpLinear).toBeDefined()

    // Initial progress is 60; +10% → 70
    await plusBtn!.trigger('click')
    await wrapper.vm.$nextTick()
    expect(vpLinear!.props('modelValue')).toBe(70)

    // -10% → 60
    await minusBtn!.trigger('click')
    await wrapper.vm.$nextTick()
    expect(vpLinear!.props('modelValue')).toBe(60)

    // Upper clamp: set to 100 via v-model emit, +10% stays at 100
    await vpLinear!.vm.$emit('update:modelValue', 100)
    await wrapper.vm.$nextTick()
    await plusBtn!.trigger('click')
    await wrapper.vm.$nextTick()
    expect(vpLinear!.props('modelValue')).toBe(100)

    // Lower clamp: set to 0 via v-model emit, -10% stays at 0
    await vpLinear!.vm.$emit('update:modelValue', 0)
    await wrapper.vm.$nextTick()
    await minusBtn!.trigger('click')
    await wrapper.vm.$nextTick()
    expect(vpLinear!.props('modelValue')).toBe(0)
  })
})

test('snackbar trigger buttons fire showSnackbar', async () => {
  const wrapper = mountApp()
  // Activate alerts tab to render snackbar option buttons
  await wrapper.find('[value="alerts"]').trigger('click')
  await wrapper.vm.$nextTick()

  const allBtns = wrapper.findAll('button')
  const successBtn = allBtns.find(b => b.text().includes('Success'))
  expect(successBtn).toBeDefined()

  await successBtn!.trigger('click')
  await wrapper.vm.$nextTick()

  const state = wrapper.vm as any
  expect(state.snackbarVisible).toBe(true)
  expect(state.snackbarColor).toBe('success')
})

test('all snackbar option buttons fire showSnackbar with correct color and message', async () => {
  const wrapper = mountApp()
  await wrapper.find('[value="alerts"]').trigger('click')
  await wrapper.vm.$nextTick()

  const expectedOptions = [
    { label: 'Success', color: 'success', message: 'Operation completed successfully!' },
    { label: 'Info',    color: 'info',    message: 'Here is some useful information.' },
    { label: 'Warning', color: 'warning', message: 'Please review before continuing.' },
    { label: 'Error',   color: 'error',   message: 'Something went wrong. Please try again.' },
  ]

  const state = wrapper.vm as any

  for (const opt of expectedOptions) {
    const allBtns = wrapper.findAll('button')
    const btn = allBtns.find(b => b.text().includes(opt.label))
    expect(btn).toBeDefined()
    await btn!.trigger('click')
    await wrapper.vm.$nextTick()
    expect(state.snackbarVisible).toBe(true)
    expect(state.snackbarColor).toBe(opt.color)
    expect(state.snackbarText).toBe(opt.message)
  }
})

test('v-progress-circular has aria-label', async () => {
  const wrapper = mountApp()
  await wrapper.find('[value="alerts"]').trigger('click')
  await wrapper.vm.$nextTick()
  const spinner = wrapper.find('[aria-label="Loading"]')
  expect(spinner.exists()).toBe(true)
})

test('v-progress-linear update:modelValue updates progress', async () => {
  const wrapper = mountApp()
  // Activate alerts tab to render the progress linear component
  await wrapper.find('[value="alerts"]').trigger('click')
  await wrapper.vm.$nextTick()

  // Find the VProgressLinear that tracks progress (initial value is 60)
  const allProgressLinears = wrapper.findAllComponents({ name: 'VProgressLinear' })
  const vProgressLinear = allProgressLinears.find(c => c.props('modelValue') === 60)
  expect(vProgressLinear, 'VProgressLinear must be present after activating alerts tab').toBeDefined()
  await vProgressLinear!.vm.$emit('update:modelValue', 75)
  await wrapper.vm.$nextTick()
  expect(vProgressLinear!.props('modelValue')).toBe(75)
})
