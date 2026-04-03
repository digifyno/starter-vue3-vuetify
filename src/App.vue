<template>
  <v-app>
    <v-main>
      <!-- Existing hero card -->
      <v-container
        fluid
        class="py-6"
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="6"
            lg="4"
          >
            <v-card
              class="mx-auto"
              elevation="8"
            >
              <v-card-title class="text-h4 text-center py-6 bg-gradient">
                <v-icon
                  icon="mdi-vuetify"
                  size="large"
                  class="mr-2"
                />
                Vue 3 + Vuetify Starter
              </v-card-title>

              <v-card-text class="pa-6">
                <v-list>
                  <v-list-item>
                    <template #prepend>
                      <v-icon
                        icon="mdi-check-circle"
                        color="success"
                      />
                    </template>
                    <v-list-item-title>Vue 3 with Composition API</v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <template #prepend>
                      <v-icon
                        icon="mdi-check-circle"
                        color="success"
                      />
                    </template>
                    <v-list-item-title>Vuetify 3 Material Design</v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <template #prepend>
                      <v-icon
                        icon="mdi-check-circle"
                        color="success"
                      />
                    </template>
                    <v-list-item-title>TypeScript Support</v-list-item-title>
                  </v-list-item>

                  <v-list-item>
                    <template #prepend>
                      <v-icon
                        icon="mdi-check-circle"
                        color="success"
                      />
                    </template>
                    <v-list-item-title>Vite for Fast HMR</v-list-item-title>
                  </v-list-item>
                </v-list>

                <v-divider class="my-4" />

                <div class="text-center">
                  <v-btn
                    color="primary"
                    size="large"
                    href="https://vuetifyjs.com/en/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View Vuetify documentation (opens in new tab)"
                    prepend-icon="mdi-book-open-variant"
                  >
                    View Docs
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-divider />

      <!-- ============================================================
           COMPONENT EXAMPLES
           Demonstrates common Vuetify patterns for new projects.
           Each section is self-contained and removable independently.
           ============================================================ -->
      <v-container class="py-6">
        <h2 class="text-h5 mb-1">
          Component Examples
        </h2>
        <p class="text-body-2 text-medium-emphasis mb-4">
          Reference patterns for common Vuetify use cases.
        </p>

        <!-- Navigation example: v-tabs switch between demo sections -->
        <v-tabs
          v-model="activeTab"
          color="primary"
          class="mb-6"
        >
          <v-tab value="cards">
            <v-icon
              start
              icon="mdi-view-grid"
            />
            Card Grid
          </v-tab>
          <v-tab value="alerts">
            <v-icon
              start
              icon="mdi-bell"
            />
            Alerts
          </v-tab>
          <v-tab value="forms">
            <v-icon
              start
              icon="mdi-form-select"
            />
            Forms
          </v-tab>
        </v-tabs>

        <v-window v-model="activeTab">
          <!-- Card grid: v-row + v-col + v-card layout pattern -->
          <v-window-item value="cards">
            <v-row>
              <v-col
                v-for="card in featureCards"
                :key="card.title"
                cols="12"
                sm="6"
                md="4"
              >
                <v-card
                  rounded="lg"
                  height="100%"
                >
                  <v-card-item>
                    <template #prepend>
                      <v-avatar
                        :color="card.color"
                        variant="tonal"
                      >
                        <v-icon :icon="card.icon" />
                      </v-avatar>
                    </template>
                    <v-card-title>{{ card.title }}</v-card-title>
                    <v-card-subtitle>{{ card.subtitle }}</v-card-subtitle>
                  </v-card-item>
                  <v-card-text>{{ card.description }}</v-card-text>
                  <v-card-actions>
                    <v-btn
                      variant="text"
                      :color="card.color"
                    >
                      Learn more
                    </v-btn>
                    <v-spacer />
                    <v-btn
                      icon="mdi-share-variant"
                      variant="text"
                      aria-label="Share"
                    />
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>

          <!-- Alert and snackbar feedback patterns -->
          <v-window-item value="alerts">
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
                    @click="showSnackbar(opt.color, opt.message)"
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
          </v-window-item>

          <!-- Form example: v-text-field, v-select, v-textarea with validation -->
          <v-window-item value="forms">
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
          </v-window-item>
        </v-window>
      </v-container>
    </v-main>

    <!-- Snackbar: displayed above all content -->
    <v-snackbar
      v-model="snackbarVisible"
      :color="snackbarColor"
      :timeout="3000"
      location="bottom end"
    >
      {{ snackbarText }}
      <template #actions>
        <v-btn
          variant="text"
          @click="snackbarVisible = false"
        >
          Dismiss
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

// --- Navigation ---
const activeTab = ref<string>('cards')

// --- Card grid data ---
interface FeatureCard {
  title: string
  subtitle: string
  description: string
  icon: string
  color: string
}

const featureCards: FeatureCard[] = [
  {
    title: 'Vue 3 Composition API',
    subtitle: 'script setup + TypeScript',
    description:
      'Build reactive UIs with the latest Vue 3 patterns using <script setup> and full TypeScript support.',
    icon: 'mdi-vuejs',
    color: 'success',
  },
  {
    title: 'Vuetify 3 Components',
    subtitle: 'Material Design 3',
    description: 'Access 80+ production-ready components — auto-imported, tree-shaken, and fully typed.',
    icon: 'mdi-vuetify',
    color: 'primary',
  },
  {
    title: 'Vite 7 Tooling',
    subtitle: 'Lightning-fast HMR',
    description: "Near-instant dev server startup and hot module replacement powered by Vite's native ESM.",
    icon: 'mdi-lightning-bolt',
    color: 'warning',
  },
]

// --- Snackbar ---
const snackbarVisible = ref<boolean>(false)
const snackbarText    = ref<string>('')
const snackbarColor   = ref<string>('success')

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

function showSnackbar(color: string, message: string): void {
  snackbarColor.value   = color
  snackbarText.value    = message
  snackbarVisible.value = true
}

// --- Progress ---
const progress = ref<number>(60)

// --- Form ---
interface ContactForm {
  firstName: string
  lastName:  string
  email:     string
  topic:     string
  message:   string
}

const formRef   = ref()
const formValid = ref<boolean>(false)

const form = reactive<ContactForm>({
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
  showSnackbar('success', `Thanks, ${form.firstName}! Your message has been sent.`)
  resetForm()
}

function resetForm(): void {
  formRef.value?.reset()
  Object.assign(form, { firstName: '', lastName: '', email: '', topic: '', message: '' })
}
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #4a5cc7 0%, #764ba2 100%);
  color: white !important;
}
</style>
