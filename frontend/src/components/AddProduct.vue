<template>
  <form @submit.prevent="submitForm" class="add-product-form">
    <input type="text" class="input-field" v-model="name" placeholder="Product Name">
    <p v-if="errors.name" class="error">{{ errors.name }}</p>

    <input type="text" class="input-field" v-model="description" placeholder="Product Description">
    <p v-if="errors.description" class="error">{{ errors.description }}</p>

    <input type="number" step="0.01" class="input-field" v-model="price" placeholder="Price">
    <p v-if="errors.price" class="error">{{ errors.price }}</p>

    <button type="submit" class="submit-button">Add Product</button>
  </form>
</template>

<script>

import axios from '@/axios';

export default {
  data() {
    return {
      name: '',
      description: '',
      price: '',
      errors: {},
    }
  },

  methods: {
    validateInput() {
      const errors = {};

      if(!this.name) errors.name = 'Name is required';
      if(!this.description) errors.description = 'Description is required';
      if(!this.price || isNaN(this.price)) errors.price = 'Price is required and must be a number';

      return errors;
    },

    async submitForm() {
      const errors = this.validateInput();
      
      if(Object.keys(errors).length > 0){
        this.errors = errors;
        return 
      }

      try {
        await axios.post('/products', {
          name: this.name,
          description: this.description,
          price: this.price,
        });  

        // ini seperti redirect,
        // jadi dipaksa masuk ke route ini
        this.$router.push('/'); // product-list
      } 
      catch (error) {
        console.error(error);
      }
    }
  }
}

</script>

<style scoped>
  .error{
    color: red;
  }
  .add-product-form {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f7f7f7;
    border-radius: 8px;
  }
  .input-field {
    display: block;
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    font-size: 1em;
  }
  .submit-button {
    padding: 10px 20px;
    border: 1px solid #444;
    background-color: #4CAF50;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  .submit-button:hover {
    background-color: #45a049;
  }
  p {
    text-align: start;  
  }
</style>