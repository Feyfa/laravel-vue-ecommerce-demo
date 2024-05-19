<template>
  <!-- shelf you want toy car -->
  <div class="product-list">
    <ul>
      <li class="product-item" v-for="product in products" :key="product.id">
        <span class="product-name">{{ product.name }}</span>
        <div class="action-links">
          <router-link class="details-link" :to="{name: 'ProductDetails', params: {id: product.id}}">Details</router-link>
          <router-link class="edit-link" :to="{name: 'EditProduct', params: {id: product.id}}">Edit</router-link>
          <button class="delete-button" @click="deleteProduct(product.id)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import axios from '@/axios';

export default {
  data() {
    return {
      products: [],
    }
  },

  mounted() {
    this.created();
  },

  methods: {
    async deleteProduct(id) {
      try {
        await axios.delete(`/products/${id}`);

        this.products = this.products.filter(product => product.id !== id);
      } 
      catch (error) {
        console.error(error);
      }
    },

    async created() {
      try {
        const response = await axios.get('/products');
        
        this.products = response.data;
      } 
      catch (error) {
        console.error(error);
      }
    }
  }
}

</script>


<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul {
    background-color: #f8f8f8;
    padding: 1rem;
  }

  li {
    border-bottom: 1px solid #ccc;
    padding: .8rem .5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  span {
    font-weight: 600;
  }

  button, .edit-link, .details-link {
    border: 1px solid #444;
    border-radius: .2rem;
    padding: .3rem .6rem;
    background-color: rgb(236, 69, 64);
    color: white;
    cursor: pointer;
  }

  .edit-link {
    background-color: rgb(27, 201, 42);
    padding: .2rem .6rem;
    margin-right: .7rem
  }

  .details-link {
    background-color: rgb(214, 185, 19);
    padding: .2rem .6rem;
    margin-right: .7rem
  }
</style>

