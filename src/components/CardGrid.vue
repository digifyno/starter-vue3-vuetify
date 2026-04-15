<template>
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
            :aria-label="`Share ${card.title}`"
          />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
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
</script>
