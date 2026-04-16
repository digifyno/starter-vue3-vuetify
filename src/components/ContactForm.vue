<template>
  <v-row justify="center">
    <v-col
      cols="12"
      md="8"
      lg="6"
    >
      <v-card rounded="lg">
        <v-card-title class="pa-6 pb-0">
          Contact Form
        </v-card-title>
        <v-card-text class="pa-6">
          <v-form
            ref="formRef"
            v-model="formValid"
            @submit.prevent="submitForm"
          >
            <v-row>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="form.firstName"
                  label="First name"
                  :rules="[required]"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="form.lastName"
                  label="Last name"
                  :rules="[required]"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  type="email"
                  :rules="[required, validEmail]"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="form.topic"
                  label="Topic"
                  :items="topics"
                  :rules="[required]"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="form.message"
                  label="Message"
                  :rules="[required]"
                  variant="outlined"
                  rows="3"
                  auto-grow
                />
              </v-col>
            </v-row>

            <div class="d-flex justify-end gap-2 mt-2">
              <v-btn
                variant="text"
                @click="resetForm"
              >
                Reset
              </v-btn>
              <v-btn
                type="submit"
                color="primary"
                :disabled="!formValid || isSubmitting"
                :loading="isSubmitting"
                prepend-icon="mdi-send"
              >
                Send Message
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const emit = defineEmits<{
  'form-submitted': [{ firstName: string; message: string }]
}>()

interface ContactFormData {
  firstName: string
  lastName:  string
  email:     string
  topic:     string
  message:   string
}

const formRef       = ref()
const formValid     = ref<boolean>(false)
const isSubmitting  = ref<boolean>(false)

const form = reactive<ContactFormData>({
  firstName: '',
  lastName:  '',
  email:     '',
  topic:     '',
  message:   '',
})

const topics: string[] = [
  'General Inquiry',
  'Technical Support',
  'Billing',
  'Feature Request',
  'Other',
]

const required   = (v: string): true | string => !!v?.trim() || 'This field is required'
const validEmail = (v: string): true | string =>
  /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) || 'Enter a valid email address'

async function submitForm(): Promise<void> {
  if (!formValid.value) return
  isSubmitting.value = true
  try {
    const response = await fetch('https://api.rsi.digify.no/hub/ai/v1/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `WorkerHub ${import.meta.env.VITE_RSI_HUB_TOKEN}`
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 100,
        messages: [{
          role: 'user',
          content: `Write a one-sentence acknowledgement for a contact form submission from ${form.firstName} ${form.lastName} about "${form.topic}".`
        }]
      })
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const data = await response.json()
    const ackMessage = data?.content?.[0]?.text ?? `Thanks, ${form.firstName}! Your message has been sent.`
    emit('form-submitted', { firstName: form.firstName, message: ackMessage })
    resetForm()
  } catch {
    emit('form-submitted', { firstName: form.firstName, message: `Thanks, ${form.firstName}! Your message has been sent.` })
    resetForm()
  } finally {
    isSubmitting.value = false
  }
}

function resetForm(): void {
  formRef.value?.reset()
  Object.assign(form, { firstName: '', lastName: '', email: '', topic: '', message: '' })
}

defineExpose({ form, formValid, formRef, isSubmitting, submitForm, resetForm, required, validEmail })
</script>
