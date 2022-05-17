<script setup>
import { RouterLink, RouterView } from "vue-router";

// importing massive json dumps so slow down performance
import testimonials from './components/testimonials/testimonials.json'
import testimonials2 from './components/testimonials/testimonials2.json'

// performing unnecessary operations to further slow down performance
const testimonialArray = []

testimonials.forEach(eachTestimonial => {
  testimonialArray.push(eachTestimonial)
})

testimonials2.forEach(eachTestimonial => {
  testimonialArray.push(eachTestimonial)
})

// registering and rendering only the first five items of the entire dump
const renderedTestimonials = [];
for (let i=0; i<=4; i++) {
  renderedTestimonials.push(testimonialArray[i])

}
console.log(renderedTestimonials)
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />
    <img
      alt="Sentry logo"
      class="logo"
      src="@/assets/sentry-logo.png"
      width="125"
      height="125"
    />
  </header>
    <div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/subscribe">Subscribe</RouterLink>
        <!-- <RouterLink to="/trigger">Manually Trigger Errors</RouterLink> -->
      </nav>
    </div>
  <RouterView />
</template>

<style>
@import "@/assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  display: flex;
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

</style>
