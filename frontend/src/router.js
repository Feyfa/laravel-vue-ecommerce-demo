import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import AddProduct from "./components/AddProduct.vue";
import ProductList from "./components/ProductList.vue";
import EditProduct from "./components/EditProduct.vue";
import ProductDetails from "./components/ProductDetails.vue";

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    // jika true maka yang bisa akses ini adalah orang yang belum login 
    meta: { public: true } 
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    // jika true maka yang bisa akses ini adalah orang yang belum login 
    meta: { public: true }
  },
  {
    path: '/add-product',
    name: 'AddProduct',
    component: AddProduct,
    // jika false maka yang bisa akses ini adalah orang yang sudah login 
    meta: { public: false } 
  },
  {
    path: '/edit-product/:id',
    name: 'EditProduct',
    component: EditProduct,
    // jika false maka yang bisa akses ini adalah orang yang sudah login 
    meta: { public: false } 
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    // jika false maka yang bisa akses ini adalah orang yang sudah login 
    meta: { public: false } 
  },
  {
    path: '/',
    name: 'ProductList',
    component: ProductList,
    // jika false maka yang bisa akses ini adalah orang yang sudah login 
    meta: { public: false } 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  // !!localStorage.getItem('token'), jika ada value nya maka true, jika tidak ada value nya maka false
  const isAuthenticated = !!localStorage.getItem('token');

  (!to.meta.public && !isAuthenticated) ? next({name: 'Login'}) : next() ;

});

export default router;