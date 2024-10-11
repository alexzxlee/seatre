<script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');
const token = ref('');

/**
 * useFetch: This is a Nuxt.js Composition API hook that returns an object with data and error properties. Available in Nuxt 3 as a Composition API hook if you want a more reactive approach with built-in handling for loading states and errors.
 * @param {string} url - The URL to fetch data from.
 * @returns {Object} - An object containing the fetched data and any error encountered.
 * @property {Ref<any>} data - A ref that holds the fetched data.
 * @property {Ref<Error | null>} error - A ref that holds any error encountered during the fetch.
 *
 * $fetch: This is a Nuxt.js utility for making HTTP requests. It returns a promise that resolves to the response data directly, not an object with data and error properties. Since $fetch returns the response data directly, you don't need to destructure data and error. Available in both Nuxt 2 (via modules) and Nuxt 3 (built-in) if you prefer a straightforward approach for making HTTP requests and handling the response directly.
 */
const login = async () => {
  const { data, error } = await useFetch('http://localhost:3001/login', {
    method: 'POST',
    body: { username: username.value, password: password.value },
  });

  if (data.value) {
    token.value = data.value.token;
    localStorage.setItem('jwt', token.value); // Store token for future requests
    console.log('Login successful');
  } else {
    console.error('Login failed', error.value);
  }
};
</script>

<template>
  <div>
    <input v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="login">Login</button>
  </div>
</template>