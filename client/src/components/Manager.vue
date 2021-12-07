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

            <v-btn
              id="btnDelete"
              v-b-modal.deleteModal
              class="float-right"
              style="color: white; margin-left: 5px; margin-top: 10px;"
              color="#dc3545"
              :disabled="checkedObjects.length == 0"
              small
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

            <v-btn
              id="btnMove"
              class="float-right"
              v-b-modal.moveModal
              :disabled="checkedObjects.length == 0"
              style="margin-left: 5px; margin-top: 10px;"
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
              class="float-right"
              style="color: white; margin-left: 5px;"
              color="#835be3"
              small
              id="btnViewFile"
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
              class="float-right"
              style="color: white;"
              color="#007bff"
              small
              id="btnNewFolder"
              v-b-modal.folderModal
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                style="margin-right: 10px;"
                class="bi bi-folder-plus"
                viewBox="0 0 16 16"
              >
                <path
                  d="M.5 3l.04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z"
                />
                <path
                  d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z"
                />
              </svg>
              New Folder</v-btn
            >

            <v-btn
              class="float-right"
              id="downloadMulti"
              small
              color="#3a5582"
              style="color: white; margin-top: 10px; margin-right: 5px;"
              @click="extract()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style="margin-right: 7px; margin-left: -3px;"
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

            <v-btn
              id="btnDownload"
              small
              color="#8fe8c2"
              @click="downloadCheckedObjects()"
              class="float-right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style="margin-right: 10px; margin-top: 3px;"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-cloud-download"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"
                />
                <path
                  d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"
                />
              </svg>
              Download</v-btn
            >
          </div>
        </div>

        <vue-dropzone
          ref="myVueDropzone"
          id="myDropzone"
          :options="dropzoneOptions"
        ></vue-dropzone>

        <div class="row">
          <div class="col-md-3">
            <table
              id="exampleTr"
              class="display col-md-12"
              style="border: 2px solid #e5e5e5; margin-top: 10px; max-height: 400px; overflow-y: scroll;"
            >
              <tbody>
                <tr v-for="alias in folders" :key="alias" id="trDirectories">
                  <div id="explorerSpan" v-on:click="selectSwitch(alias)">
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
                    {{ alias.substring(8) }}
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
                <!-- FOLDERS - RIGHT HAND TABLE--------------->
                <tr
                  id="entries"
                  v-for="alias2 in files"
                  :key="alias2.name"
                  @click="
                    selectSwitchFiles(alias2.paths, alias2.names, alias2.is_dir)
                  "
                >
                  <div id="explorerSpan2" v-if="alias2.is_dir == true">
                    <input
                      id="myCheckbox2"
                      type="checkbox"
                      style=" margin-left: 10px; padding: 10px;"
                      @click.stop="toggleFile(alias2.paths)"
                    />

                    <svg
                      v-if="alias2.is_dir == true"
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
                      v-if="alias2.is_dir == false"
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

                    <span id="fileName">{{ alias2.names }}</span>
                    <span
                      style="margin-right: 10px; font-family:'consolas'; font-size: 14px;"
                      class="float-right"
                      ><i>{{ alias2.the_time }}</i></span
                    >
                    <span
                      id="isDir"
                      style="display: none; margin-right: 10px; font-family:'consolas'; font-size: 13px;"
                      class="float-right"
                      ><i>{{ alias2.is_dir }}</i></span
                    >
                  </div>
                </tr>

                <!-- FILES - RIGHT HAND TABLE ------------------------------>

                <tr
                  id="entries"
                  v-for="alias2 in files"
                  :key="alias2.name"
                  v-on:click="
                    selectSwitchFiles(alias2.paths, alias2.names, alias2.is_dir)
                  "
                >
                  <div id="explorerSpan2" v-if="alias2.is_dir == false">
                    <label style="width: 100%; cursor: pointer;">
                      <input
                        id="myCheckbox"
                        type="checkbox"
                        style=" margin-left: 10px; padding: 10px;"
                        @click="toggleFile(alias2.paths)"
                      />

                      <svg
                        v-if="alias2.is_dir == true"
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
                          alias2.is_dir == false &&
                            alias2.fileExt !== '.zip' &&
                            alias2.fileExt !== '.7z' &&
                            alias2.fileExt !== '.mp4' &&
                            alias2.fileExt !== '.webm' &&
                            alias2.fileExt !== '.mpeg' &&
                            alias2.fileExt !== '.wmv' &&
                            alias2.fileExt !== '.mov' &&
                            alias2.fileExt !== '.avi' &&
                            alias2.fileExt !== '.pdf' &&
                            alias2.fileExt !== '.docx' &&
                            alias2.fileExt !== '.png' &&
                            alias2.fileExt !== '.PNG' &&
                            alias2.fileExt !== '.jpg' &&
                            alias2.fileExt !== '.jpeg'
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
                          alias2.fileExt == '.png' ||
                            alias2.fileExt == '.PNG' ||
                            alias2.fileExt == '.jpg' ||
                            alias2.fileExt == 'jpeg'
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
                        v-if="alias2.fileExt == '.docx'"
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
                        v-if="alias2.fileExt == '.pdf'"
                        style="color: #be2e31; margin-right: 10px; margin-left: 10px; margin-top: -5px;"
                        class="fa fa-file-pdf-o"
                        aria-hidden="true"
                      ></i>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style="color: #d28445; margin-right: 10px; margin-left: 10px; margin-top: -5px;"
                        v-if="
                          alias2.fileExt == '.mp4' ||
                            alias2.fileExt == '.webm' ||
                            alias2.fileExt == '.mpeg' ||
                            alias2.fileExt == '.wmv' ||
                            alias2.fileExt == '.mov' ||
                            alias2.fileExt == '.avi'
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
                        v-if="
                          alias2.fileExt == '.zip' || alias2.fileExt == '.7z'
                        "
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

                      <span id="fileName">{{ alias2.names }}</span>
                      <span
                        style="margin-right: 10px; font-family:'consolas'; font-size: 13px;"
                        class="float-right"
                        ><i>{{ alias2.the_time }}</i></span
                      >
                      <span
                        id="isDir"
                        style="display: none; margin-right: 10px; font-family:'consolas'; font-size: 13px;"
                        class="float-right"
                        ><i>{{ alias2.is_dir }}</i></span
                      >
                      <span
                        id="isDir"
                        style="display: none; margin-right: 10px; font-family:'consolas'; font-size: 13px;"
                        class="float-right"
                        ><i>{{ alias2.fileExt }}</i></span
                      >
                    </label>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- New Folder Modal -->
        <b-modal
          ref="folderModal"
          id="folderModal"
          hide-footer
          title="New Folder"
        >
          <v-text-field
            class="col-md-8 mx-auto"
            label="Folder Name"
            v-model="folderName"
            hide-details="auto"
            autofocus
          ></v-text-field>

          <div class="float-right mt-5">
            <v-btn small @click="hideFolderModal()">Cancel</v-btn>
            <v-btn
              small
              style="background-color: #8fe8c2; margin-left: 10px;"
              @click="newFolder()"
              :disabled="folderName.length == 0"
            >
              Add Folder</v-btn
            >
          </div>
        </b-modal>

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
              <li v-for="alias5 in checkedObjects" :key="alias5">
                <p>
                  <b>- {{ alias5.substring(8) }}</b>
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
                      v-for="alias3 in folders"
                      :key="alias3"
                      id="trDirectories"
                    >
                      <div
                        id="explorerSpan"
                        v-on:click="selectSwitchMove(alias3)"
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
                        {{ alias3.substring(8) }}
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
                      v-on:click="selectSwitchMove(file.paths)"
                    >
                      <div id="explorerSpan2" v-if="file.is_dir == true">
                        <svg
                          v-if="file.is_dir == true"
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
              @click="moveFile()"
              >Move</v-btn
            >
          </div>
        </b-modal>

        <b-modal
          ref="deleteModal"
          id="deleteModal"
          hide-footer
          scrollable
          title="Delete"
        >
          <div class="d-block text-center">
            <svg
              style="text-align: center; color: #dc3545;"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="currentColor"
              class="bi bi-exclamation-triangle"
              viewBox="0 0 16 16"
            >
              <path
                d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"
              />
              <path
                d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"
              />
            </svg>
            <p style="text-align: center; margin-top: 10px;">
              Are you sure you want to delete the following?
            </p>
            <div class="mx-auto col-md-12">
              <ul
                style="list-style: none; margin-top: -10px; padding-left: 10px; padding-bottom: 10px; text-align: left; font-size: 14px; font-family: consolas;"
              >
                <b
                  ><li v-for="alias4 in checkedObjects" :key="alias4">
                    - {{ alias4.substring(8) }}
                  </li></b
                >
              </ul>
            </div>
            <div class="float-right">
              <v-btn small style="margin-top: 20px;" @click="hideDeleteModal()"
                >Cancel</v-btn
              >
              <v-btn
                small
                style="margin-top: 20px; background-color: #dc3545; color: white; margin-left: 10px;"
                @click="deleteFile()"
                >Delete</v-btn
              >
            </div>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import axios from "axios";
import $ from "jquery";

import DownloadService from "../services/DownloadService.js";
import ExtractionService from "../services/ExtractionService.js";

var _downloadService = new DownloadService();
var _extractionService = new ExtractionService();

export default {
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      dropzoneOptions: {
        url: "http://localhost:5000/upload",
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
      picked_File: "./files/A1_Main/no_file_selected.txt",
      fileSize: [],
      searchTyped: "",
      checkedObjects: [],
      currentDir: "",
    };
  },

  mounted() {
    this.getFolders();
    this.updateTable("./files/A1_Main");
  },

  methods: {
    hideFolderModal() {
      this.$refs["folderModal"].hide();
	  this.folderName = "";
    },

    hideMoveModal() {
      this.$refs["moveModal"].hide();
      $("#fileTable input:checkbox").prop("checked", false);
      this.checkedObjects = [];
      this.moveDestination = "No Folder Selected";
    },

    hideDeleteModal() {
      this.$refs["deleteModal"].hide();
      $("#fileTable input:checkbox").prop("checked", false);
      this.checkedObjects = [];
    },

    newFolder() {
      axios
        .post("http://localhost:5000/newFolder", {
          current_path: this.picked,
          folder_name: this.folderName,
        })
        .then((res) => {
          this.getFolders();
          this.updateTable(this.picked);
		  this.hideFolderModal();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updateTable(path) {
      axios
        .post("http://localhost:5000/getAllFilesFromSelectedFolder", {
          path_name: path,
        })
        .then((res) => {
          this.files = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // Lists the contents of a selected main directory
    selectSwitch: function(e) {
      $("#exampleTr tr").each(function(a, b) {
        $(b).click(function() {
          $("#exampleTr tr").css("background", "#ffffff");
          $(this).css("background", "#f9fbfc");
        });
      });

      $("#fileTable input:checkbox").prop("checked", false);
      this.checkedObjects = [];

      this.picked = e;
      axios
        .post("http://localhost:5000/getAllFilesFromSelectedFolder", {
          path_name: this.picked,
        })
        .then((res) => {
          this.files = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // Lists subdirectories when moving objects
    selectSwitchMove: function(e) {
      this.moveDestination = e;
      axios
        .post("http://localhost:5000/getAllFilesFromSelectedFolder", {
          path_name: e,
        })
        .then((res) => {
          this.files = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // Checks or unchecks an object and adds the path to the "checkedObjects" array.
    // Passes checked objects to the server via /sendZips
    toggleFile(file) {
      var $this = this;
      var selected = $this.checkedObjects;

      if (selected.includes(file)) {
        selected.splice(selected.indexOf(file), 1);
      } else {
        selected.push(file);
      }

      axios
        .post("http://localhost:5000/sendZips", {
          sentZip: this.checkedObjects,
        })
        .then((res) => {
          this.checkedObjects = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // Gets a list of all 'top-level' folders
    getFolders() {
      axios
        .post(`http://localhost:5000/getAllMainFolders`)
        .then((response) => {
          this.folders = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // Passes selected objects to the server. If the file is a directory (isDir == true), gets a list
    // of all objects within that directory
    selectSwitchFiles: function(path, fileName, isDir) {
      this.picked_File = fileName;
      axios
        .post("http://localhost:5000/sendPath", {
          sent_path: path,
          sent_file_name: fileName,
        })
        .then((res) => {
          this.picked = res.data.full_path;
          this.currentDir = res.data.the_dir;
          if (isDir == true) {
            $("#fileTable input:checkbox").prop("checked", false);
            axios
              .post("http://localhost:5000/getAllFilesFromSelectedFolder", {
                path_name: this.picked,
              })
              .then((res) => {
                this.files = res.data;
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
    },

    // View a selected file in a new tab, if applicable
    viewFile() {
      axios
        .get("http://localhost:5000/view", {})
        .then((res) => {
          window.open("http://localhost:5000/view");
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // Uncheck all objects and clear the checkedObjects array
    clearSelects() {
      this.checkedObjects = [];
      $("#fileTable input:checkbox").prop("checked", false);
    },

    // Resets current path as the 'root' directory, used
    // when creating new 'top-level' directories
    setFolderAsMain() {
      this.picked = "./files/";
    },

    // Moves the user back a level
    prevDir() {
      if (this.picked == "./files") {
        console.log("end of FS");
      } else if (this.picked == "./files") {
        console.log("end of FS");
      } else {
        this.picked = this.picked.substr(0, this.picked.lastIndexOf("/"));

        axios
          .post("http://localhost:5000/getAllFilesFromSelectedFolder", {
            path_name: this.picked,
          })
          .then((res) => {
            this.files = res.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    // Deletes any checked objects in the checkedObjects array
    deleteFile() {
      this.$refs["deleteModal"].hide();
      axios
        .post("http://localhost:5000/delete", {
          sent_path: this.checkedObjects,
        })
        .then((res) => {
          this.checkedObjects = [];
          $("#fileTable input:checkbox").prop("checked", false);
          this.getFolders();
          this.updateTable(this.currentDir);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    downloadCheckedObjects() {
      if (this.checkedObjects.length == 1) {
        _downloadService.downloadSingleFile(this.picked_File);
      }
      if (this.checkedObjects.length > 1) {
        _downloadService.downloadMultiple();
      }
    },

    async extract() {
     await _extractionService.extract(this.picked).then((res) =>{
		  this.updateTable(this.currentDir)
	 })
    },

    // Move all checked objects to a specified directory (the movePicked array)
    moveFile() {
      axios
        .post("http://localhost:5000/movefile", {
          org_path: this.checkedObjects,
          dest_path: this.moveDestination,
          file_name: this.checkedObjects,
        })
        .then((res) => {
          this.checkedObjects = [];
          $("#fileTable input:checkbox").prop("checked", false);
          this.updateTable(this.moveDestination);
          this.hideMoveModal();
        })
        .catch((err) => {
          window.alert("Problem detected:" + res.status);
        });
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

#myDropzone {
  margin-top: 15px;
}

#btnNewFolder {
  margin-top: 10px;
}

#btnViewFile {
  margin-top: 10px;
}

#btnDownload {
  margin-top: 10px;
  margin-right: 5px;
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
