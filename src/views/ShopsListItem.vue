<template>
  <div class="row">
    <div class="col-md-12">
    <div class="card card-container">
      <h4>Shop</h4>
          <div>
            <label><strong>Name:</strong></label> {{ shop.name }}
          </div>
          <div>
            <label><strong>Description:</strong></label> {{ shop.description }}
          </div>
          <div>
            <label><strong>Owners:</strong></label> {{ shop.owners }}
          </div>
    </div>
    </div>
    <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleEdit">
        <div class="form-group">
          <label for="shopname">Shop name</label>
          <input
            v-model="shop.name"
            type="text"
            class="form-control"
            name="shopname"
          />
        </div>
        <div class="form-group">
          <label for="desrciption">Description</label>
          <input
            v-model="shop.description"
            type="test"
            class="form-control"
            name="description"
          />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Update</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
        </div>
      </form>
    </div>
  </div>

    
  </div>
  
</template>

<script>

import ShopsService from '../services/shops.service';

export default {
  name: 'ShopsListItem',
  data() {
    return {
      name:'',
      shop: {},
      loading: false,
      message: '',
      error:''
    };
  },
  mounted() {
        // console.log( this.$router ); // this is the router object - useful for redirection to another page etc.
        console.log(this.$route); // useful for query and path params
        this.name = this.$route.params.name; // is a string and not a number
        this.loading = true;
        try {
          ShopsService.findByName(this.name)
          .then(response => {
            this.shop = response.data;
            console.log(response.data);
          });
            
        } catch (error) {
            this.error = error;
        } finally {
            this.loading = false;
        }
    },
  methods: {
    handleEdit(){
      try {
          ShopsService.updateShop(this.$route.params.name)
          .then(response => {
            this.shop = response.data;
            console.log(response.data);
          });
            
        } catch (error) {
            this.error = error;
        } finally {
            this.loading = false;
        }
    }
}
}
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>