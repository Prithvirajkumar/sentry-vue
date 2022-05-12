<template>
  <div>
   <button class="event-button" @click="onClick()">{{ title }}</button>  
  </div>
</template>

<script>
export default {
  name: "EventButton",
  props: {
    title: String,
    onClick: Function
  }
};
</script>

<style scoped>
.event-button {
  height: 60px;
  width: 600px;
  background-color: #6c5fc7;
  color: white;
  margin-top: 0.6rem;
  font-size: 1.2rem;
  font-weight: bold;
}

.event-button:hover {
  background-color: #5243bd;
  border-color: #4e3fb4;
}
</style>
