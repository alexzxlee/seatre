<template>
  <div class="product-list">
    <div class="product" v-for="product in products" :key="product.id">
      <img :src="product.image" :alt="product.name" />
      <h2>{{ product.name }}</h2>
      <p>{{ product.price }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const products = ref([]);

onMounted(async () => {
  // Fetch products from an API or use static data
  products.value = [
    { id: 1, name: 'Product 1', price: '$10', image: '/logo.png' },
    { id: 2, name: 'Product 2', price: '$20', image: '/logo.png' },
    { id: 3, name: 'Product 3', price: '$30', image: '/logo.png' },
  ];
});
</script>

<style scoped>
.product-list {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin: 2rem;
}

.product {
  border: 1px solid #ccc;
  padding: 1rem;
  text-align: center;
}

.product img {
  max-width: 100px;
  margin-bottom: 1rem;
}
</style>