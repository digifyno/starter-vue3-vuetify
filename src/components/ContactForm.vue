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
                :disabled="!formValid"
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
  'form-submitted': [{ firstName: string }]
}>()

interface ContactFormData {
  firstName: string
  lastName:  string
  email:     string
  topic:     string
  message:   string
}

const formRef   = ref()
const formValid = ref<boolean>(false)

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

function submitForm(): void {
  emit('form-submitted', { firstName: form.firstName })
  resetForm()
}

function resetForm(): void {
  formRef.value?.reset()
  Object.assign(form, { firstName: '', lastName: '', email: '', topic: '', message: '' })
}

defineExpose({ form, formValid, formRef, submitForm, resetForm, required, validEmail })
</script>
