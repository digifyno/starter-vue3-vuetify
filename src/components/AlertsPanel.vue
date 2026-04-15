<template>
  <v-row>
    <v-col
      cols="12"
      md="6"
    >
      <p class="text-subtitle-2 mb-3">
        Alert types (v-alert):
      </p>
      <v-alert
        type="success"
        title="Success"
        text="Changes saved successfully."
        class="mb-3"
      />
      <v-alert
        type="info"
        title="Info"
        text="A new version is available."
        class="mb-3"
      />
      <v-alert
        type="warning"
        title="Warning"
        text="Your session expires soon."
        class="mb-3"
      />
      <v-alert
        type="error"
        title="Error"
        text="Connection lost. Please retry."
      />
    </v-col>

    <v-col
      cols="12"
      md="6"
    >
      <p class="text-subtitle-2 mb-3">
        Trigger a snackbar (v-snackbar):
      </p>
      <div class="d-flex flex-wrap gap-2 mb-6">
        <v-btn
          v-for="opt in snackbarOptions"
          :key="opt.color"
          :color="opt.color"
          variant="tonal"
          @click="emit('show-snackbar', { color: opt.color, message: opt.message })"
        >
          {{ opt.label }}
        </v-btn>
      </div>

      <p class="text-subtitle-2 mb-3">
        Progress indicators:
      </p>
      <v-progress-linear
        v-model="progress"
        color="primary"
        rounded
        height="8"
        class="mb-3"
      />
      <div class="d-flex gap-2 mb-4">
        <v-btn
          size="small"
          variant="tonal"
          @click="progress = Math.max(0, progress - 10)"
        >
          -10%
        </v-btn>
        <v-btn
          size="small"
          variant="tonal"
          @click="progress = Math.min(100, progress + 10)"
        >
          +10%
        </v-btn>
      </div>
      <v-progress-circular
        indeterminate
        color="secondary"
        aria-label="Loading"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  'show-snackbar': [{ color: string; message: string }]
}>()

const progress = ref<number>(60)

interface SnackbarOption {
  color: string
  label: string
  message: string
}

const snackbarOptions: SnackbarOption[] = [
  { color: 'success', label: 'Success', message: 'Operation completed successfully!' },
  { color: 'info',    label: 'Info',    message: 'Here is some useful information.' },
  { color: 'warning', label: 'Warning', message: 'Please review before continuing.' },
  { color: 'error',   label: 'Error',   message: 'Something went wrong. Please try again.' },
]

defineExpose({ progress })
</script>
