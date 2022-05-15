<template>
  <div class="home">
    <div id="app">
      <div v-if="loading" class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      <div id="product-list">
        <div>
          <ProductSummary :products="products" />
        </div>
      </div>
      <div id="loadImage-wrap">
        <img id="loadImage" />
        <img id="loadImage2" />
        <img id="loadImage3" />
        <img id="loadImage4" />
        <img id="loadImage5" />
      </div>

    </div>
  </div>
</template>

<script>
import ProductSummary from "../components/ProductSummary.vue";
import * as Sentry from "@sentry/vue";

// importing massive json dumps so slow down performance
import testimonials from '../components/testimonials/testimonials.json'

const employees = [Jane, Lily, Keith, Mason, Emma, Noah];

const transaction = Sentry.startTransaction({ name: "Load Testimonials" });

Sentry.configureScope(scope => scope.setSpan(transaction));

// performing unnecessary operations to further slow down performance
const testimonialArray = []

testimonials.forEach(eachTestimonial => {
  testimonialArray.push(eachTestimonial)
})

// registering and rendering only the first five items of the entire dump
const renderedTestimonials = [];
for (let i=0; i<=4; i++) {
  renderedTestimonials.push(testimonialArray[i])
}
console.log(renderedTestimonials)
transaction.finish();


const HELLO = "Hello ";

//Required for distributed tracing outside of localhost
const tracingOrigins = ['localhost', 'empowerplant.io', 'run.app', 'appspot.com', /^\//];
const env = "dev";


export default {
  name: "app",
  components: {
    ProductSummary
  },
  data: function() {
    return { 
      products: [],
      loading: true 
    };
  },
  async created() {
    // Do this or the trace won't include the backend transaction
    const transaction = Sentry.getCurrentHub().getScope().getTransaction();
    let span = {};
    if (transaction) {
      span = transaction.startChild({
        op: "http_request",
        description: "load_products",
    })}
    console.log("getProducts...");

    try {
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("https://application-monitoring-flask-dot-sales-engineering-sf.appspot.com/products", requestOptions)
        .then(response => response.text())
        .then(result => {this.products = JSON.parse(result); this.loading = false; console.log(this.loading)})
        .catch(error => {
          console.log('error', error);
        });
    } catch (ex) {
      console.log(ex);
    }

    transaction.finish();

  },
}

</script>

<style>
@media (min-width: 1px) {
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  .lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  }
  .lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #dfc;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  .lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }

}
</style>