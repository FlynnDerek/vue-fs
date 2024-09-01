<template>
  <div class="wrapper">
    <nav class="topBar navbar navbar-expand-sm navbar-dark border-bottom">
      <p class="pathReadout"><b>Path: </b> {{ picked }}</p>
      <p class="selectedReadout">
        <b>Checked Objects: </b>{{ checkedObjects }}
      </p>
    </nav>
    <div class="container-fluid">
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
            <DeleteModal
              :selectedObjects="checkedObjects"
              @delete="deleteSelections()"
            />
          </div>

          <div data-app class="btnDelete float-right">
            <MoveModal
              :selectedObjects="checkedObjects"
              :files="files"
              :folders="folders"
              @move="move"
            />
          </div>

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
            <NewFolderModal
              :currentPath="picked"
              @createNewFolder="newFolder"
            />
          </div>

          <v-btn
            small
            color="#8fe8c2"
            @click="download()"
            class="btnDownload float-right"
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
        id="dropZone"
        ref="dropZone"
        class="myDropzone"
        :options="dropzoneOptions"
        @vdropzone-success="updateOnFileUpload"
      ></vue-dropzone>

      <div class="row">
        <div class="col-md-3">
          <table class="tblFiles table display col-md-12">
            <tbody class="tableHeight">
              <tr v-for="folder in folders" :key="folder" class="trDirectories">
                <div class="explorerSpan" v-on:click="selectSwitch(folder)">
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
          <button class="btnBack" @click="prevDir()">
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

          <button class="btnClearSelect" @click="clearSelects()">
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

          <table class="tblFiles display col-md-12">
            <tbody class="tableHeight">
              <!-- NAVIGATOR PANE - RIGHT HAND TABLE--------------->
              <tr
                class="entries"
                v-for="file in files"
                :key="file.name"
                @click="sendPaths(file.paths, file.names, file.isDir)"
              >
                <div class="explorerSpan2" v-if="file.isDir == true">
                  <input
                    class="checkbox"
                    type="checkbox"
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

                  <span>{{ file.names }}</span>
                  <span class="tblRowDateTime float-right"
                    ><i>{{ file.dateTime }}</i></span
                  >
                </div>
              </tr>

              <!-- FILES - RIGHT HAND TABLE ------------------------------>

              <tr
                class="entries"
                v-for="file in files"
                :key="file.name"
                v-on:click="sendPaths(file.paths, file.names, file.isDir)"
              >
                <div class="explorerSpan2" v-if="file.isDir == false">
                  <label class="tblSpanLabel">
                    <input
                      class="checkbox"
                      type="checkbox"
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

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      fill="#be2e31"
                      v-if="file.fileExt == '.pdf'"
                      style="margin-right: 10px; margin-left: 10px;"
                      aria-hidden="true"
                      version="1.1"
                      height="16px"
                      viewBox="796 796 200 200"
                      enable-background="new 796 796 200 200"
                      xml:space="preserve"
                    >
                      <g>
                        <g>
                          <path
                            d="M976.828,857.4l-56.941-56.941c-2.875-2.875-6.694-4.459-10.76-4.459H825.93c-8.394,0-15.218,6.828-15.218,15.222v169.56    c0,8.393,6.824,15.219,15.218,15.219H966.07c8.389,0,15.218-6.826,15.218-15.219V868.162    C981.288,864.099,979.705,860.274,976.828,857.4z M969.676,980.781c0,1.989-1.615,3.609-3.604,3.609H825.931    c-1.989,0-3.605-1.62-3.605-3.609V811.221c0-1.988,1.616-3.605,3.605-3.605h79.409c2.174,0,3.936,1.763,3.936,3.936v42.938    c0,7.25,5.876,13.126,13.123,13.126h43.342c1.045,0,2.045,0.415,2.783,1.152c0.738,0.738,1.152,1.739,1.152,2.783V980.781z"
                          />
                        </g>
                        <g>
                          <path
                            d="M844.083,970.6c0,0-0.001,0-0.002,0c-4.46-0.001-8.323-2.32-10.081-6.055c-1.975-4.193-0.958-9.353,2.72-13.805    c5.031-6.09,14.36-11.574,29.288-17.199c3.111-5.742,5.751-11.331,7.673-16.244c3.406-8.708,5.765-15.099,7.711-20.9    c-3.677-7.526-6.285-15.607-7.953-24.636c-1.261-6.824-0.151-12.751,3.126-16.688c2.321-2.79,5.625-4.389,9.063-4.389    c3.338,0,6.55,1.515,8.815,4.157c3.036,3.543,4.197,8.794,3.269,14.786c-1.276,8.237-3.284,16.532-6.29,25.96    c3.385,6.171,7.57,11.805,12.753,17.169c2.656,2.749,5.418,5.278,8.229,7.537c11.915-1.952,21.928-1.912,29.942,0.119    c8.399,2.128,11.579,8.292,10.977,13.119c-0.581,4.66-4.679,9.363-12.521,9.363c-1.759,0-3.636-0.246-5.582-0.733    c-8.749-2.186-17.216-6.223-25.196-12.011c-6.023,1.176-12.655,2.877-19.746,5.066c-5.432,1.679-11.671,3.634-17.823,5.844    c-4.023,7.122-8.586,14.18-13.262,20.505C853.384,969.426,847.233,970.6,844.083,970.6z M857.996,947.002    c-6.791,3.273-11.52,6.503-14.12,9.649c-1.467,1.775-1.8,3.258-1.479,3.938c0.214,0.456,0.844,0.729,1.685,0.729c0,0,0,0,0,0    c0.881,0,4.033-0.381,7.646-5.27C853.856,953.171,855.96,950.132,857.996,947.002z M924.553,928.246    c4.216,2.173,8.534,3.815,12.918,4.911c1.21,0.303,2.33,0.455,3.331,0.455c2.153,0,3.249-0.734,3.312-1.229    c0.074-0.592-0.844-2.162-4.045-2.974C935.729,928.31,930.533,927.92,924.553,928.246z M879.339,928.634l-0.198,0.357    c2.925-0.945,5.756-1.826,8.397-2.642c4.437-1.371,8.712-2.561,12.792-3.56l-0.361-0.277l0.736-0.132    c-1.082-1.027-2.151-2.087-3.205-3.177c-3.726-3.856-6.992-7.846-9.858-12.048l-0.276,0.845l-0.128-0.246    c-1.384,3.786-2.985,7.993-4.913,12.922c-1.008,2.576-2.196,5.317-3.531,8.157L879.339,928.634z M885.628,859.966    c-0.684,0-1.369,0.37-1.929,1.043c-0.691,0.831-2.185,3.376-1.133,9.065c0.79,4.272,1.807,8.303,3.068,12.142    c1.247-4.842,2.197-9.443,2.904-14.01c0.5-3.224,0.083-5.894-1.143-7.325C886.881,860.282,886.271,859.966,885.628,859.966z"
                          />
                        </g>
                      </g>
                    </svg>

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

                    <span>{{ file.names }}</span>
                    <span class="tblRowDateTime float-right"
                      ><i>{{ file.dateTime }}</i></span
                    >
                  </label>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import vue2Dropzone from "vue2-dropzone";
import DeleteModal from "./views/modals/DeleteModal.vue";
import MoveModal from "./views/modals/MoveModal.vue";
import NewFolderModal from "./views/modals/NewFolderModal.vue";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import $ from "jquery";

import ActionService from "../services/ActionService";
import ExplorerService from "../services/ExplorerService";
import FileHelper from "../assets/helpers/FileHelper";

var _explorerService = new ExplorerService();
var _actionService = new ActionService();
var _fileHelper = new FileHelper();

export default {
  components: {
    DeleteModal,
    MoveModal,
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
    async newFolder(params) {
      await _actionService.newFolder(params.currentPath, params.folderName);
      await this.getFolders();
      await this.updateTable(params.currentPath);
    },

    async updateOnFileUpload() {
      this.files = await _explorerService.getContentsFromSelected(this.picked);
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

      $(".tblFiles input:checkbox").prop("checked", false);
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
      this.folders = await _explorerService.getExplorerFolders();
    },

    sendPaths: async function(path, fileName, isDir) {
      this.pickedFile = fileName;
      var response = await _explorerService.sendPath(path);

      this.picked = response.data.path;
      this.currentDir = response.data.directory;
      if (isDir == true) {
        $(".tblFiles input:checkbox").prop("checked", false);
        await this.updateTable(this.picked);
      }
    },

    viewFile() {
      _actionService.viewFile();
    },

    clearSelects() {
      this.checkedObjects = [];
      $(".tblFiles input:checkbox").prop("checked", false);
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
        await this.updateTable(this.picked);
      }
    },

    async deleteSelections() {
      await _actionService.delete(this.checkedObjects).then(async () => {
        this.checkedObjects = [];
        $(".tblFiles input:checkbox").prop("checked", false);
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
	  
	  this.checkedObjects = [];
	  $(".tblFiles input:checkbox").prop("checked", false);
    },

    async move(destinationPath) {
      await _actionService
        .move(this.checkedObjects, destinationPath)
        .then(async () => {
          this.checkedObjects = [];
          $(".tblFiles input:checkbox").prop("checked", false);
          await this.updateTable(destinationPath);
        });
    },

    // Filters the right-hand table for given values
    searchTable() {
      var input, filter, table, body, tr, td, i, txtValue;
      input = this.searchTyped;
      filter = input.toUpperCase();
      table = document.getElementsByClassName("tblFiles")[1];
	  body = table.getElementsByTagName("tbody")[0];
      tr = body.getElementsByTagName("tr");

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
.wrapper {
  overflow-x: hidden;
  overflow-y: hidden;
  border: none;
}

.topBar {
  background-color: #007bff;
  height: 50px;
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

.explorerSpan {
  width: 95%;
  cursor: pointer;
  margin-left: 10px;
  height: 40px !important;
  line-height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.explorerSpan2 {
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

.explorerSpan2:hover {
  background-color: #f9fbfc;
  width: 100%;
}

.btnBack {
  position: absolute;
  height: 20px !important;
  width: 20px !important;
  margin-left: -18px;
  margin-top: 10px;
  border: 2px solid #e5e5e5;
  background-color: white;
  outline: none !important;
}

.btnBack:hover {
  background-color: #e5e5e5;
  transition: 0.5s ease;
}

.btnClearSelect {
  position: absolute;
  height: 20px !important;
  width: 20px !important;
  margin-left: -18px;
  margin-top: 34px;
  border: 2px solid #e5e5e5;
  outline: none !important;
}

.btnClearSelect:hover {
  background-color: #e5e5e5;
  transition: 0.5s ease;
}

.trDirectories:hover {
  background-color: #f9fbfc;
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

.pathReadout {
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

.selectedReadout {
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

.tblFiles {
  overflow-y: scroll;
  border: 2px solid #e5e5e5;
  margin-top: 10px;
  max-height: 400px;
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

.tableHeight {
  height: 55vh;
}

tbody {
  padding-bottom: 10px;
  overflow-y: auto;
  overflow-x: hidden;
}

tbody td,
thead th {
  width: 19%; /* 19% is less than (100% / 5 cols) = 20% */
  float: left;
}

.checkbox {
  margin-left: 10px;
  padding: 10px;
}

.tblSpanLabel {
  width: 100%;
  cursor: pointer;
}

.tblRowDateTime {
  margin-right: 10px;
  font-family: "consolas";
  font-size: 14px;
}

.entries {
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
