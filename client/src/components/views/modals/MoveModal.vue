<template>
  <div>
    <v-dialog v-model="dialog" width="600" transition="dialog-top-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="moveBtn"
          color="#ffb10a"
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
            class="bi bi-folder-symlink"
            viewBox="0 0 16 16"
          >
            <path
              d="m11.798 8.271-3.182 1.97c-.27.166-.616-.036-.616-.372V9.1s-2.571-.3-4 2.4c.571-4.8 3.143-4.8 4-4.8v-.769c0-.336.346-.538.616-.371l3.182 1.969c.27.166.27.576 0 .742z"
            />
            <path
              d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm.694 2.09A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09l-.636 7a1 1 0 0 1-.996.91H2.826a1 1 0 0 1-.995-.91l-.637-7zM6.172 2a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z"
            />
          </svg>
          Move
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Move
        </v-card-title>

        <div class="d-block text-center">
          <ul class="listToMove">
            <li v-for="selectedObject in selectedObjects" :key="selectedObject">
              <p>
                <b>- {{ selectedObject.substring(8) }}</b>
              </p>
            </li>
          </ul>
        </div>

          <div class="row">
            <div class="col-md-6">
              <table class="tableMove">
                <tbody>
                  <tr
                    v-for="folder in folders"
                    :key="folder"
                    class="trDirectories"
                  >
                    <div
                      class="explorerSpan"
                      v-on:click="sendMoveActionPaths(folder)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style="margin-right: 10px;"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-folder"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M.54 3.87L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"
                        />
                      </svg>
                      {{ folder.substring(8) }}
                    </div>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="col-md-6">
              <table class="fileTable display col-md-12">
                <tbody>
                  <tr
                    class="entries"
                    v-for="file in files"
                    :key="file.name"
                    v-on:click="sendMoveActionPaths(file.paths)"
                  >
                    <div class="explorerSpan" v-if="file.isDir == true">
                      <svg
                        v-if="file.isDir == true"
                        xmlns="http://www.w3.org/2000/svg"
                        style="margin-right: 10px; margin-left: 10px;"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-folder"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4H2.19zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707z"
                        />
                      </svg>
                      <span class="fileName">{{ file.names }}</span>
                    </div>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        <p class="chipMoveDest">
          <v-chip outlined text color="#1d5df9"
            ><span>Destination: </span>{{ destinationPath }}</v-chip
          >
        </p>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="#ffb10a"
            @click="move(), (dialog = false)"
            :disabled="destinationPath == 'No Folder Selected'"
          >
            Move
          </v-btn>
          <v-btn class="cancelBtn" @click="cancel(), (dialog = false)">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ExplorerService from "../../../services/ExplorerService";

var _explorerService = new ExplorerService();

export default {
  props: ['selectedObjects', 'files', 'folders'],
  data() {
    return {
      dialog: false,
      folderName: '',
      destinationPath: 'No Folder Selected',
    };
  },
  methods: {
    sendMoveActionPaths: async function(destinationPath) {
      this.destinationPath = destinationPath;
      this.files = await _explorerService.getContentsFromSelected(
        destinationPath
      );
    },

    move() {
      this.$emit('move', this.destinationPath);
    },

    cancel() {
      this.destinationPath = 'No Folder Selected';
    },
  },
};
</script>

<style>
.cancelBtn {
  margin-left: 8px;
}

.listToMove {
  list-style: none;
  padding-left: 10px;
  padding-bottom: 10px;
  text-align: left;
  font-size: 14px;
  font-family: consolas;
}

.fileTable {
  overflow-y: scroll;
  border: 2px solid #e5e5e5;
  margin-top: 10px;
}

.tableMove {
  border: 2px solid #e5e5e5;
  margin-top: 10px;
  height: 150px;
  overflow-y: scroll;
}

.chipMoveDest {
  font-family: "consolas";
  margin-top: 10px;
}
</style>
