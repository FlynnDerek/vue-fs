<template>
  <div>
    <el-button
      color="#dc3545"
      @click="dialogVisible = true"
      :disabled="selectedObjects.length == 0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style="margin-right: 10px;"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-trash"
        viewBox="0 0 16 16"
      >
        <path
          d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
        />
        <path
          fill-rule="evenodd"
          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
        />
      </svg>
      Delete
    </el-button>

    <el-dialog
      title="Delete"
      v-model="dialogVisible"
      width="600"
      transition="dialog-top-transition"
    >
      <span class="deleteDescription">
        Are you sure you want to delete the following?
      </span>
      <el-space direction="vertical"></el-space>

        <ul class="listToDelete">
          <b
            ><li
              v-for="selectedObject in selectedObjects"
              :key="selectedObject"
            >
              - {{ selectedObject.substring(7) }}
            </li></b
          >
        </ul>
      <template #footer>
        <el-button color="#dc3545" @click="_delete(), (dialogVisible = false)">
          Delete
        </el-button>
        <el-button @click="dialogVisible = false">
          Cancel
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["selectedObjects"],
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    _delete() {
      this.$emit("delete");
    },
  },
};
</script>

<style>
.deleteDescription {
	display: block;
	text-align: center;
}

.listToDelete {
  list-style: none;
  padding: 10px;
  text-align: left;
  font-size: 14px;
  font-family: consolas;
}
</style>
