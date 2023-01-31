<template>
    <div class="list row">
      <div class="col-md-8">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by name"
            v-model="name"/>
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button"
              @click="searchName"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <h4>Shops List</h4>
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(shop, index) in shops"
            :key="index"
            @click="setActiveShop(shop, index)"
          >
            {{ shop.name }}
          </li>
        </ul>
  
        <!--<button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
          Remove All
        </button>-->
      </div>
      <div class="col-md-6">
        <div v-if="currentShop">
          <h4>Shop</h4>
          <div>
            <label><strong>Name:</strong></label> {{ currentShop.name }}
          </div>
          <div>
            <label><strong>Description:</strong></label> {{ currentShop.description }}
          </div>
          <div>
            <label><strong>Owners:</strong></label> {{ currentShop.owners }}
          </div>
  
          <router-link :to="'/shops/' + currentShop.name" class="badge badge-warning">Edit</router-link>
        </div>
        <div v-else>
          <br />
          <p>Please click on a Shop...</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ShopsService from "../services/shops.service"
  
  export default {
    name: "ShopsList",
    data() {
      return {
        shops: [],
        currentShop: null,
        currentIndex: -1,
        name: ""
      };
    },
    methods: {
      retrieveShops() {
        ShopsService.getAll()
          .then(response => {
            this.shops = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      refreshList() {
        this.retrieveShops();
        this.currentTutorial = null;
        this.currentIndex = -1;
      },
  
      setActiveShop(shop, index) {
        this.currentShop = shop;
        this.currentIndex = shop ? index : -1;
      },
  
      removeAllTutorials() {
        ShopsService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      },
      
      searchName() {
        ShopsService.findByName(this.name)
          .then(response => {
            this.shops = response.data;
            this.setActiveShop(null);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    mounted() {
      this.retrieveShops();
    }
  };
  </script>
  
  <style>
  .list {
    text-align: left;
    max-width: 750px;
    margin: auto;
  }
  </style>
  