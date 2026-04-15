import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import AlertsPanel from './AlertsPanel.vue'

const vuetify = createVuetify()

function mountAlertsPanel() {
  return mount(AlertsPanel, {
    global: { plugins: [vuetify] }
  })
}

test('AlertsPanel mounts without error', () => {
  const wrapper = mountAlertsPanel()
  expect(wrapper.exists()).toBe(true)
})

test('renders four v-alert components', () => {
  const wrapper = mountAlertsPanel()
  const alerts = wrapper.findAllComponents({ name: 'VAlert' })
  expect(alerts.length).toBe(4)
})

test('renders snackbar trigger buttons', () => {
  const wrapper = mountAlertsPanel()
  const buttons = wrapper.findAll('button')
  const labels = ['Success', 'Info', 'Warning', 'Error']
  for (const label of labels) {
    expect(buttons.find(b => b.text().includes(label))).toBeDefined()
  }
})

test('progress starts at 60', () => {
  const wrapper = mountAlertsPanel()
  const state = wrapper.vm as any
  expect(state.progress).toBe(60)
})

test('+10% button increments progress', async () => {
  const wrapper = mountAlertsPanel()
  const state = wrapper.vm as any
  const plusBtn = wrapper.findAll('button').find(b => b.text().includes('+10%'))
  expect(plusBtn).toBeDefined()
  await plusBtn!.trigger('click')
  await wrapper.vm.$nextTick()
  expect(state.progress).toBe(70)
})

test('-10% button decrements progress', async () => {
  const wrapper = mountAlertsPanel()
  const state = wrapper.vm as any
  const minusBtn = wrapper.findAll('button').find(b => b.text().includes('-10%'))
  expect(minusBtn).toBeDefined()
  await minusBtn!.trigger('click')
  await wrapper.vm.$nextTick()
  expect(state.progress).toBe(50)
})

test('progress is clamped at 0', async () => {
  const wrapper = mountAlertsPanel()
  const state = wrapper.vm as any
  state.progress = 0
  const minusBtn = wrapper.findAll('button').find(b => b.text().includes('-10%'))
  await minusBtn!.trigger('click')
  await wrapper.vm.$nextTick()
  expect(state.progress).toBe(0)
})

test('progress is clamped at 100', async () => {
  const wrapper = mountAlertsPanel()
  const state = wrapper.vm as any
  state.progress = 100
  const plusBtn = wrapper.findAll('button').find(b => b.text().includes('+10%'))
  await plusBtn!.trigger('click')
  await wrapper.vm.$nextTick()
  expect(state.progress).toBe(100)
})

test('snackbar button emits show-snackbar event', async () => {
  const spy = vi.fn()
  const wrapper = mount(AlertsPanel, {
    global: { plugins: [vuetify] },
    props: { onShowSnackbar: spy },
  })
  const successBtn = wrapper.findAll('button').find(b => b.text().includes('Success'))
  expect(successBtn).toBeDefined()
  await successBtn!.trigger('click')
  await wrapper.vm.$nextTick()
  expect(spy).toHaveBeenCalledWith({ color: 'success', message: 'Operation completed successfully!' })
})

test('v-progress-circular has aria-label', () => {
  const wrapper = mountAlertsPanel()
  expect(wrapper.find('[aria-label="Loading"]').exists()).toBe(true)
})
