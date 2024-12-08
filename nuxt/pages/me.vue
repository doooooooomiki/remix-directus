<script setup lang="ts">
const { data: me } = await useFetch<Record<any, string>>(`/api/users/me`);
</script>

<template>
  <div>
    <h1>Me</h1>
    <NuxtLink to="/signup"> Signup </NuxtLink>
    <NuxtLink to="/signin"> Signin </NuxtLink>
    <ul>
      <li>{{ me?.fname }}</li>
      <li>{{ me?.lname }}</li>
      <li>{{ me?.email }}</li>
    </ul>
  </div>
</template>
