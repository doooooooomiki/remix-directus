<script setup lang="ts">
const route = useRoute();
const { data: user } = await useFetch<Record<any, string>>(
  `/api/users/${route.params.id}`
);
</script>

<template>
  <p>{{ user?.fname }}</p>
  <p>{{ user?.lname }}</p>
  <NuxtLink to="/me"> Me </NuxtLink>
  <NuxtLink to="/users"> Users </NuxtLink>
</template>
