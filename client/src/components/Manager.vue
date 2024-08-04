<template>
  <div class="d-flex" id="wrapper">
    <div id="page-content-wrapper">
      <nav
        id="topBar"
        class="navbar navbar-expand-sm navbar-dark border-bottom"
      >
        <p id="pathReadout"><b>Path: </b> {{ picked }}</p>
        <p id="selectedReadout"><b>Checked Objects: </b>{{ checkedObjects }}</p>
      </nav>
      <div id="divFileManager" class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="col-md-5 p-0">
              <div class="col-md-10 float-left p-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style="position: absolute; margin-top: 17px; margin-left: 7px;"
                  width="14"
                  height="14"
                  fill="currentColor"
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                  />
                </svg>
                <input
                  class="form-control form-control-sm searchBar"
                  v-model="searchTyped"
                  type="text"
                  @keyup="searchTable()"
                  placeholder="Search by File Name or Type"
                />
              </div>
            </div>

			<div data-app class="btnDelete float-right">
				<DeleteModal :selectedObjects="checkedObjects" @delete="deleteSelections()" />
			</div>

            <v-btn
              class="btnMove float-right"
              v-b-modal.moveModal
              :disabled="checkedObjects.length == 0"
              color="#ffb10a"
              small
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

            <v-btn
              class="btnViewFile float-right"
              color="#835be3"
              small
              @click="viewFile()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style="margin-right: 10px;"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-eye"
                viewBox="0 0 16 16"
              >
                <path
                  d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                />
                <path
                  d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
                />
              </svg>
              View File</v-btn
            >

            <v-btn
              class="btnExtract float-right"
              small
              color="#3a5582"
              @click="extract()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style="margin-right: 7px;"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-file-arrow-up"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 11a.5.5 0 0 0 .5-.5V6.707l1.146 1.147a.5.5 0 0 0 .708-.708l-2-2a.5.5 0 0 0-.708 0l-2 2a.5.5 0 1 0 .708.708L7.5 6.707V10.5a.5.5 0 0 0 .5.5z"
                />
                <path
                  d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"
                /></svg
              >Extract</v-btn
            >

	
			<div data-app class="btnNewFolder float-right">
				<NewFolderModal :currentPath="picked" @createNewFolder="newFolder"/>
			</div>

            <v-btn
              small
              color="#8fe8c2"
              @click="download()"
              class="btnDownload float-right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                baseProfile="tiny"
                version="1.2"
                viewBox="0 0 422.1 329.5"
              >
                <path
                  stroke-width="5"
                  stroke-miterlimit="10"
                  d="M108.2 262.6L220 39c-44.1 0-84.5 24.9-104.2 64.4L4 327c44.2 0 84.5-24.9 104.2-64.4zM306.2 226.1L418 2.5c-44.1 0-84.5 24.9-104.2 64.4L202 290.5c44.2 0 84.5-24.9 104.2-64.4z"
                />
              </svg>
              Download</v-btn
            >
          </div>
        </div>

        <vue-dropzone
			id="dropZone"
          ref="dropZone"
          class="myDropzone"
          :options="dropzoneOptions"
        ></vue-dropzone>

        <div class="row">
          <div class="col-md-3">
            <table
              class="table display col-md-12"
              style="border: 2px solid #e5e5e5; margin-top: 10px; max-height: 400px; overflow-y: scroll;"
            >
              <tbody>
                <tr v-for="folder in folders" :key="folder" id="trDirectories">
                  <div id="explorerSpan" v-on:click="selectSwitch(folder)">
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

                  <div></div>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="col-md-9">
            <button id="btnBack" @click="prevDir()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style="color: #7f8997; margin-top: -13px;"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-left-short"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                />
              </svg>
            </button>

            <button id="btnClearSelect" @click="clearSelects()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style="color: #7f8997; margin-top: -13px;"
                width="12"
                height="12"
                fill="currentColor"
                class="bi bi-eraser"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"
                />
              </svg>
            </button>

            <table
              id="fileTable"
              class="display col-md-12"
              style="overflow-y: scroll; border: 2px solid #e5e5e5; margin-top: 10px;"
            >
              <tbody>
                <!-- NAVIGATOR PANE - RIGHT HAND TABLE--------------->
                <tr
                  id="entries"
                  v-for="file in files"
                  :key="file.name"
                  @click="
                    sendPaths(file.paths, file.names, file.isDir)
                  "
                >
                  <div id="explorerSpan2" v-if="file.isDir == true">
                    <input
                      id="checkbox"
                      type="checkbox"
                      style=" margin-left: 10px; padding: 10px;"
                      @click.stop="toggleFile(file.paths)"
                    />

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

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      v-if="file.isDir == false"
                      style="margin-right: 10px; margin-left: 10px; color: #007bff;"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-file-earmark"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
                      />
                    </svg>

                    <span id="fileName">{{ file.names }}</span>
                    <span
                      style="margin-right: 10px; font-family:'consolas'; font-size: 14px;"
                      class="float-right"
                      ><i>{{ file.dateTime }}</i></span
                    >
                    <span
                      id="isDir"
                      style="display: none; margin-right: 10px; font-family:'consolas'; font-size: 13px;"
                      class="float-right"
                      ><i>{{ file.isDir }}</i></span
                    >
                  </div>
                </tr>

                <!-- FILES - RIGHT HAND TABLE ------------------------------>

                <tr
                  id="entries"
                  v-for="file in files"
                  :key="file.name"
                  v-on:click="
                    sendPaths(file.paths, file.names, file.isDir)
                  "
                >
                  <div id="explorerSpan2" v-if="file.isDir == false">
                    <label style="width: 100%; cursor: pointer;">
                      <input
                        id="checkbox"
                        type="checkbox"
                        style=" margin-left: 10px; padding: 10px;"
                        @click="toggleFile(file.paths)"
                      />

                      <svg
                        v-if="file.isDir == true"
                        xmlns="http://www.w3.org/2000/svg"
                        style="margin-right: 10px; margin-left: 10px; margin-top: -5px;"
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

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        v-if="
                          file.isDir == false &&
                            file.fileExt !== '.zip' &&
                            file.fileExt !== '.7z' &&
                            file.fileExt !== '.mp4' &&
                            file.fileExt !== '.webm' &&
                            file.fileExt !== '.mpeg' &&
                            file.fileExt !== '.wmv' &&
                            file.fileExt !== '.mov' &&
                            file.fileExt !== '.avi' &&
                            file.fileExt !== '.pdf' &&
                            file.fileExt !== '.docx' &&
                            file.fileExt !== '.png' &&
                            file.fileExt !== '.PNG' &&
                            file.fileExt !== '.jpg' &&
                            file.fileExt !== '.jpeg'
                        "
                        style="margin-right: 10px; margin-left: 10px; color: #007bff; margin-top: -5px;"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-file-earmark"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
                        />
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style="color: #75b5aa; margin-right: 10px; margin-left: 10px; margin-top: -5px;"
                        v-if="
                          file.fileExt == '.png' ||
                            file.fileExt == '.PNG' ||
                            file.fileExt == '.jpg' ||
                            file.fileExt == 'jpeg'
                        "
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-file-image"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M8.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                        />
                        <path
                          d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v8l-2.083-2.083a.5.5 0 0 0-.76.063L8 11 5.835 9.7a.5.5 0 0 0-.611.076L3 12V2z"
                        />
                      </svg>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style="color: #295394; margin-right: 10px; margin-left: 10px; margin-top: -5px;"
                        v-if="file.fileExt == '.docx'"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-file-earmark-word-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM5.485 6.879l1.036 4.144.997-3.655a.5.5 0 0 1 .964 0l.997 3.655 1.036-4.144a.5.5 0 0 1 .97.242l-1.5 6a.5.5 0 0 1-.967.01L8 9.402l-1.018 3.73a.5.5 0 0 1-.967-.01l-1.5-6a.5.5 0 1 1 .97-.242z"
                        />
                      </svg>

                      <i
                        v-if="file.fileExt == '.pdf'"
                        style="color: #be2e31; margin-right: 10px; margin-left: 10px; margin-top: -5px;"
                        class="fa fa-file-pdf-o"
                        aria-hidden="true"
                      ></i>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style="color: #d28445; margin-right: 10px; margin-left: 10px; margin-top: -5px;"
                        v-if="
                          file.fileExt == '.mp4' ||
                            file.fileExt == '.webm' ||
                            file.fileExt == '.mpeg' ||
                            file.fileExt == '.wmv' ||
                            file.fileExt == '.mov' ||
                            file.fileExt == '.avi'
                        "
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-file-earmark-play"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M6 6.883v4.234a.5.5 0 0 0 .757.429l3.528-2.117a.5.5 0 0 0 0-.858L6.757 6.454a.5.5 0 0 0-.757.43z"
                        />
                        <path
                          d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"
                        />
                      </svg>

                      <svg
                        v-if="file.fileExt == '.zip' || file.fileExt == '.7z'"
                        style="color: #c09c0c; margin-right: 10px; margin-left: 10px; margin-top: -5px;"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-file-earmark-zip"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M5 7.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.11 0l-.929-.62a1 1 0 0 1-.415-1.074L5 8.438V7.5zm2 0H6v.938a1 1 0 0 1-.03.243l-.4 1.598.93.62.929-.62-.4-1.598A1 1 0 0 1 7 8.438V7.5z"
                        />
                        <path
                          d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1h-2v1h-1v1h1v1h-1v1h1v1H6V5H5V4h1V3H5V2h1V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
                        />
                      </svg>

                      <span id="fileName">{{ file.names }}</span>
                      <span
                        style="margin-right: 10px; font-family:'consolas'; font-size: 13px;"
                        class="float-right"
                        ><i>{{ file.dateTime }}</i></span
                      >
                      <span
                        id="isDir"
                        style="display: none; margin-right: 10px; font-family:'consolas'; font-size: 13px;"
                        class="float-right"
                        ><i>{{ file.isDir }}</i></span
                      >
                      <span
                        id="isDir"
                        style="display: none; margin-right: 10px; font-family:'consolas'; font-size: 13px;"
                        class="float-right"
                        ><i>{{ file.fileExt }}</i></span
                      >
                    </label>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Move items modal -->
        <b-modal
          ref="moveModal"
          id="moveModal"
          hide-footer
          scrollable
          title="Move"
        >
          <div class="d-block text-center">
            <ul
              style="list-style: none; padding-left: 10px; text-align: left; font-size: 14px; font-family: consolas;"
            >
              <li v-for="checkedObject in checkedObjects" :key="checkedObject">
                <p>
                  <b>- {{ checkedObject.substring(8) }}</b>
                </p>
              </li>
            </ul>
          </div>

          <div class="d-block">
            <div class="row">
              <div class="col-md-6">
                <table
                  id="tableMove"
                  style="border: 2px solid #e5e5e5; margin-top: 10px; max-height: 400px; overflow-y: scroll;"
                >
                  <tbody>
                    <tr
                      v-for="folder in folders"
                      :key="folder"
                      id="trDirectories"
                    >
                      <div
                        id="explorerSpan"
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
                <table
                  id="fileTable"
                  class="display col-md-12"
                  style="overflow-y: scroll; border: 2px solid #e5e5e5; margin-top: 10px;"
                >
                  <tbody>
                    <tr
                      id="entries"
                      v-for="file in files"
                      :key="file.name"
                      v-on:click="sendMoveActionPaths(file.paths)"
                    >
                      <div id="explorerSpan2" v-if="file.isDir == true">
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
                        <span id="fileName">{{ file.names }}</span>
                      </div>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <p style="font-size: 17px;">
            <v-chip id="chipMoveDest" outlined text color="#1d5df9"
              ><span id="destInner">Destination: </span
              >{{ moveDestination }}</v-chip
            >
          </p>
          <div class="float-right">
            <v-btn style="margin-top: 10px;" @click="hideMoveModal()"
              >Cancel</v-btn
            >
            <v-btn
              id="btnMoveClick"
              style="color: white; margin-top: 10px; margin-left: 10px;"
              color="#007bff"
              :disabled="moveDestination == 'No Folder Selected'"
              @click="move()"
              >Move</v-btn
            >
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import vue2Dropzone from "vue2-dropzone";
import DeleteModal from "./views/DeleteModal.vue"
import NewFolderModal from "./views/NewFolderModal.vue"
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import $ from "jquery";

import ActionService from "../services/ActionService"
import ExplorerService from '../services/ExplorerService';
import FileHelper from '../assets/helpers/FileHelper'

var _explorerService = new ExplorerService();
var _actionService = new ActionService();
var _fileHelper = new FileHelper();

export default {
  components: {
	DeleteModal,
	NewFolderModal,
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      dropzoneOptions: {
        url: `http://localhost:5000/upload`,
        thumbnailWidth: 150,
        maxFilesize: 10000,
        dictDefaultMessage: "Drag & Drop or Click to Upload",
        addRemoveLinks: true,
        dictRemoveFile: "Clear File",
        timeout: 10000000,
      },
      isSelected: 0,
      folderName: "",
      files: [],
      folders: [],
      picked: "./files",
      moveDestination: "No Folder Selected",
      pickedFile: "./files/A1_Main/no_file_selected.txt",
      fileSize: [],
      searchTyped: "",
      checkedObjects: [],
      currentDir: "",
    };
  },

  async mounted() {
    this.getFolders();
    await this.updateTable("./files/A1_Main");
  },

  methods: {
    hideMoveModal() {
      this.$refs["moveModal"].hide();
      $("#fileTable input:checkbox").prop("checked", false);
      this.checkedObjects = [];
      this.moveDestination = "No Folder Selected";
    },

	async newFolder(params) {
		await _actionService.newFolder(params.currentPath, params.folderName);
		await this.getFolders();
		await this.updateTable(params.currentPath);
    },

    async updateTable(path) {
      this.files = await _explorerService.getContentsFromSelected(path);
    },

    // Lists the contents of a selected main directory
     selectSwitch: async function(path) {
      $(".table tr").each(function(a, b) {
        $(b).click(function() {
          $(".table tr").css("background", "#ffffff");
          $(this).css("background", "#f9fbfc");
        });
      });

      $("#fileTable input:checkbox").prop("checked", false);
      this.checkedObjects = [];
      this.picked = path;
      await this.updateTable(this.picked);
    },

    async toggleFile(file) {
      var selected = this.checkedObjects;

      if (selected.includes(file)) {
        selected.splice(selected.indexOf(file), 1);
      } else {
        selected.push(file);
      }

	 this.checkedObjects = await _actionService.sendToZip(selected);
    },

    async getFolders() {
      this.folders = await _explorerService.getExplorerFolders()
    },

    sendPaths: async function(path, fileName, isDir) {
      this.pickedFile = fileName;
	  var response = await _explorerService.sendPath(path);

	  this.picked = response.data.path;
	  this.currentDir = response.data.directory;
	  if (isDir == true) {
		$("#fileTable input:checkbox").prop("checked", false);
		await this.updateTable(this.picked)
	  }
    },

	sendMoveActionPaths: async function(destinationPath) {
      this.moveDestination = destinationPath;
      await this.updateTable(destinationPath)
    },

    viewFile() {
    	_actionService.viewFile()
    },

    clearSelects() {
      this.checkedObjects = [];
      $("#fileTable input:checkbox").prop("checked", false);
    },

    setFolderAsMain() {
      this.picked = "./files/";
    },

    // Moves the user back a level
    async prevDir() {
      if (this.picked == "./files") {
        console.log("Your're in the root directory");
      } else if (this.picked == "./files") {
        console.log("Your're in the root directory");
      } else {
        this.picked = this.picked.substr(0, this.picked.lastIndexOf("/"));
        await this.updateTable(this.picked)
      }
    },

    async deleteSelections() {
      await _actionService.delete(this.checkedObjects)
	  .then(async () => {
		  this.checkedObjects = [];
          $("#fileTable input:checkbox").prop("checked", false);
          await this.getFolders();
          await this.updateTable(this.currentDir);
	  });
    },

    download() {
      if (
        this.checkedObjects.length == 1 &&
		_fileHelper.isAFile(this.checkedObjects.toString())
      ) {
        _actionService.downloadSingle(this.pickedFile);
      } else {
        _actionService.downloadMultiple();
      }
    },

    async extract() {
      await _actionService.extract(this.picked).then(async () => {
        await this.updateTable(this.currentDir);
      });
    },

    async move() {
		await _actionService.move(this.checkedObjects, this.moveDestination)
		.then(async () => {
	      this.checkedObjects = [];
          $("#fileTable input:checkbox").prop("checked", false);
          await this.updateTable(this.moveDestination);
          this.hideMoveModal();
		})
    },

    // Filters the right-hand table for given values
    searchTable() {
      var input, filter, table, tr, td, i, txtValue;
      input = this.searchTyped;
      filter = input.toUpperCase();
      table = document.getElementById("fileTable");
      tr = table.getElementsByTagName("tr");

      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("span")[0];
        if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
      }
    },
  },
};
</script>

<style>
#wrapper {
  overflow-x: hidden;
  overflow-y: hidden;
  border: none;
}

#topBar {
  background-color: #007bff;
  height: 50px;
}

#page-content-wrapper {
  min-width: 100vw;
}

.dropzone {
  margin-top: 15px;
}

.btnNewFolder {
  margin-top: 10px;
  color: white !important;
}

.btnViewFile {
  margin-top: 10px;
  margin-left: 5px;
  color: white !important;
}

.btnDownload {
  margin-top: 10px;
  margin-right: 5px;
}

.btnExtract {
  color: white !important;
  margin: 10px 0 0 5px;
}

.btnMove {
  margin-left: 5px;
  margin-top: 10px;
}

.btnDelete {
  color: white !important;
  margin-left: 5px;
  margin-top: 10px;
}

#explorerSpan {
  width: 95%;
  cursor: pointer;
  margin-left: 10px;
  height: 40px !important;
  line-height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#explorerSpan2 {
  width: 100% !important;
  cursor: pointer;
  margin-left: 10px;
  max-height: 40px;
  line-height: 40px;
  margin-left: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#explorerSpan2:hover {
  background-color: #f9fbfc;
  width: 100%;
}

#btnBack {
  position: absolute;
  height: 20px !important;
  width: 20px !important;
  margin-left: -18px;
  margin-top: 10px;
  border: 2px solid #e5e5e5;
  background-color: white;
  outline: none;
}

#btnBack:hover {
  background-color: #e5e5e5;
  transition: 0.5s ease;
}

#btnClearSelect {
  position: absolute;
  height: 20px !important;
  width: 20px !important;
  margin-left: -18px;
  margin-top: 34px;
  border: 2px solid #e5e5e5;
  outline: none;
}

#btnClearSelect:hover {
  background-color: #e5e5e5;
  transition: 0.5s ease;
}

.nopadding {
  padding: 0 !important;
  margin: 0 !important;
}

#trDirectories:hover {
  background-color: #f9fbfc;
  width: 100%;
}

#btnSettings:hover {
  background-color: #dddddd !important;
}

#btnManager:hover {
  background-color: #dddddd !important;
}

#btnStats:hover {
  background-color: #dddddd !important;
}

.dropzone {
  min-height: 90px !important;
  line-height: 0px;
}

.searchBar {
  width: 100%;
  height: 28px;
  margin-top: 10px;
  margin-bottom: 0px;
  border: 2px solid #dbdbdb;
  border-radius: 5px;
  color: black;
  padding-left: 25px;
  outline: none;
}

.searchBar::placeholder {
  color: rgb(73, 73, 73) !important;
  padding-left: 5px;
  font-family: "consolas";
}

#pathReadout {
  margin-left: 0px;
  margin-top: 2px;
  height: 20px;
  min-width: 400px;
  max-width: 900px;
  color: rgb(255, 255, 255);
  font-family: "consolas";
  font-size: 12px;
  position: absolute;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#selectedReadout {
  margin-left: 0px;
  margin-top: 32px;
  height: 20px;
  min-width: 400px;
  max-width: 900px;
  color: rgb(255, 255, 255);
  font-family: "consolas";
  font-size: 12px;
  position: absolute;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

table {
  width: 100%;
  border-spacing: 0;
}

thead,
tbody,
tr,
th,
td {
  display: block;
}

thead tr {
  /* fallback */
  width: 97%;
  /* minus scroll bar width */
  width: -webkit-calc(100% - 16px);
  width: -moz-calc(100% - 16px);
  width: calc(100% - 16px);
}

tr:after {
  /* clearing float */
  content: " ";
  display: block;
  visibility: hidden;
  clear: both;
}

tbody {
  height: 55vh;
  padding-bottom: 10px;
  overflow-y: auto;
  overflow-x: hidden;
}

tbody td,
thead th {
  width: 19%; /* 19% is less than (100% / 5 cols) = 20% */
  float: left;
}

.label {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: #394a56;
}

.label-text {
  margin-left: 16px;
}

#chipMovePicked {
  margin-top: 7px;
}

#chipMoveDest {
  font-family: "consolas";
  margin-top: 10px;
}

#destInner {
  font-weight: 600;
  padding-right: 7px;
}

#entries {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
}
</style>
