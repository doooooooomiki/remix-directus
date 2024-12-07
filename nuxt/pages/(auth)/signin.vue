<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});
</script>

<template>
  <div>
    <h1>Signin</h1>
    <div>
      <a
        href="https://edit.cottoncottage.shop/auth/login/google?redirect=https://campus.cottoncottage.shop/signin"
      >
        Continue with Google
      </a>
    </div>
  </div>
</template>
