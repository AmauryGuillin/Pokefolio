<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/sonner'
import 'vue-sonner/style.css'
</script>

<template>
  <header>
    <!-- <nav>
      <RouterLink to="/">Landing</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav> -->
  </header>
  <Toaster position="top-center" richColors />
  <RouterView />
</template>
