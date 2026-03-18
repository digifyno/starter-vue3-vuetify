<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="6" lg="4">
            <v-card class="mx-auto" elevation="8">
              <v-card-title class="text-h4 text-center py-6 bg-gradient">
                <v-icon icon="mdi-vuetify" size="large" class="mr-2"></v-icon>
                Vue 3 + Vuetify Starter
              </v-card-title>
              
              <v-card-text class="pa-6">
                <v-list>
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check-circle" color="success"></v-icon>
                    </template>
                    <v-list-item-title>Vue 3 with Composition API</v-list-item-title>
                  </v-list-item>
                  
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check-circle" color="success"></v-icon>
                    </template>
                    <v-list-item-title>Vuetify 3 Material Design</v-list-item-title>
                  </v-list-item>
                  
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check-circle" color="success"></v-icon>
                    </template>
                    <v-list-item-title>TypeScript Support</v-list-item-title>
                  </v-list-item>
                  
                  <v-list-item>
                    <template v-slot:prepend>
                      <v-icon icon="mdi-check-circle" color="success"></v-icon>
                    </template>
                    <v-list-item-title>Vite for Fast HMR</v-list-item-title>
                  </v-list-item>
                </v-list>
                
                <v-divider class="my-4"></v-divider>
                
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
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// Your app logic here
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
