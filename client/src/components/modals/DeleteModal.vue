<template>
  <div>
    <v-dialog v-model="dialog" width="600" transition="dialog-top-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="deleteBtn"
          color="#dc3545"
          small
          v-bind="attrs"
          v-on="on"
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
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Delete
        </v-card-title>

        <v-card-text>
          Are you sure you want to delete the following?
        </v-card-text>

        <div class="mx-auto col-md-12">
          <ul class="listToDelete">
            <b
              ><li
                v-for="selectedObject in selectedObjects"
                :key="selectedObject"
              >
                - {{ selectedObject.substring(8) }}
              </li></b
            >
          </ul>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="deleteBtn" color="#dc3545" @click="_delete(), dialog = false">
            Delete
          </v-btn>
          <v-btn class="cancelBtn" @click="dialog = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["selectedObjects"],
  created: function() {
    console.log("data from parent component:");
    console.log(this.selectedObjects);
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
	_delete() {
		this.$emit('delete');
		this.dialog = false;
	}

  }
};
</script>

<style>
.deleteBtn {
  color: white !important;
}

.cancelBtn {
	margin-left: 8px;
}

.listToDelete {
  list-style: none;
  margin-top: -10px;
  padding-left: 10px;
  padding-bottom: 10px;
  text-align: left;
  font-size: 14px;
  font-family: consolas;
}
</style>
