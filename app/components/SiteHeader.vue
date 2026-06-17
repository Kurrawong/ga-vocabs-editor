<script setup lang="ts">
const site = useSiteConfig()
const { navLinks } = useNavigation()
</script>

<template>
  <UHeader class="border-b border-default">
    <template #left>
      <NuxtLink to="/" class="flex items-center gap-3">
        <img
          :src="site.logo"
          :alt="site.name"
          class="h-10 w-auto ga-logo"
        />
        <span class="font-bold text-lg text-highlighted leading-tight whitespace-nowrap">{{ site.name }}</span>
      </NuxtLink>
    </template>

    <UNavigationMenu :items="navLinks" :ui="{ content: 'z-[60]' }" />

    <template #right>
      <UButton
        to="/search"
        icon="i-heroicons-magnifying-glass"
        color="neutral"
        variant="ghost"
        aria-label="Search vocabularies"
      />
      <GitHubAuthButton />
      <UColorModeButton variant="ghost" />
    </template>

    <template #body>
      <UNavigationMenu :items="navLinks" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
