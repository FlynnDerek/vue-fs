<template>
  <div id="app">
    <Manager msg="Vue-fs" />
  </div>
</template>

<script>
import Manager from "./components/Manager.vue";

export default {
  name: "App",
  components: {
    Manager,
  },
};
</script>

<style>
#app {
  height: 100vh;
  width: 100vw;
}
</style>
