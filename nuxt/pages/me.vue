<script setup lang="ts">
// Get all request headers
const requestHeaders = useRequestHeaders();
console.info({ requestHeaders });

// Set the a custom response header
const responseHeader = useResponseHeader('x-dki');
responseHeader.value = 'is-awesome';
</script>

<template>
  <div>
    <h1>Me</h1>
    <NuxtLink to="/signup"> Signup </NuxtLink>
    <NuxtLink to="/signin"> Signin </NuxtLink>
  </div>
</template>
