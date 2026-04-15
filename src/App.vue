<template>
  <v-app>
    <v-app-bar
      flat
      border="bottom"
    >
      <v-app-bar-title>Vue 3 + Vuetify Starter</v-app-bar-title>
      <template #append>
        <v-btn
          :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="toggleTheme"
        />
      </template>
    </v-app-bar>
    <v-main>
      <HeroCard />

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
          <v-window-item value="cards">
            <CardGrid />
          </v-window-item>

          <v-window-item value="alerts">
            <AlertsPanel @show-snackbar="onShowSnackbar" />
          </v-window-item>

          <v-window-item value="forms">
            <ContactForm @form-submitted="onFormSubmitted" />
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
import { ref, computed } from 'vue'
import { useTheme } from 'vuetify'
import HeroCard from './components/HeroCard.vue'
import CardGrid from './components/CardGrid.vue'
import AlertsPanel from './components/AlertsPanel.vue'
import ContactForm from './components/ContactForm.vue'

// --- Theme ---
const theme = useTheme()
const isDark = computed(() => theme.global.current.value.dark)
function toggleTheme(): void {
  theme.global.name.value = isDark.value ? 'light' : 'dark'
}

// --- Navigation ---
const activeTab = ref<string>('cards')

// --- Snackbar ---
const snackbarVisible = ref<boolean>(false)
const snackbarText    = ref<string>('')
const snackbarColor   = ref<string>('success')

function showSnackbar(color: string, message: string): void {
  snackbarColor.value   = color
  snackbarText.value    = message
  snackbarVisible.value = true
}

function onShowSnackbar({ color, message }: { color: string; message: string }): void {
  showSnackbar(color, message)
}

function onFormSubmitted({ firstName }: { firstName: string }): void {
  showSnackbar('success', `Thanks, ${firstName}! Your message has been sent.`)
}

defineExpose({
  isDark,
  toggleTheme,
  activeTab,
  snackbarVisible,
  snackbarColor,
  snackbarText,
  showSnackbar,
})
</script>

