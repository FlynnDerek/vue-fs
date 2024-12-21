<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item
      @click="navigate(directory)"
      v-for="directory in directories"
      :key="directory"
      class="breadcrumb"
      ><a>{{ directory }}</a></el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script>
export default {
  props: ["currentPath"],
  computed: {
    directories() {
      return this.currentPath.replace("./", "").split("/");
    },
  },
  methods: {
    navigate(directory) {
      let path = ".";

      // build path
      for (let i = 0; i < this.directories.length; i++) {
        if (this.directories[i] !== directory) {
          path += `/${this.directories[i]}`;
        } else {
          path += `/${directory}`;
          break;
        }
      }

      this.$emit("selectedBreadcrumb", path);
    },
  },
};
</script>
