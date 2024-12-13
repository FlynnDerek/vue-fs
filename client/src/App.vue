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
	body {
		padding: 0 !important;
		margin: 0 !important;
	}

	#app {
		font-family: 'Roboto', sans-serif;
	}
</style>
