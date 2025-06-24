<template>
  <div
    class="drop-zone"
    :class="{ 'drag-over': isDragging }"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="onDragLeave"
    @drop.prevent="onDrop"
    @click="triggerFileInput"
  >
    <input
      type="file"
      ref="fileInput"
      @change="onFileChange"
      multiple
      class="hidden-input"
    />

    <div class="upload-content">
      <p v-if="!files.length && !uploading">
        Drag & Drop or Click to Upload
      </p>
      <ul v-else class="file-list">
        <li v-for="(file, index) in files" :key="index">
          <div class="file-info">
            <span>{{ file.name }} ({{ formatSize(file.size) }})</span>
            <div
              v-if="uploadProgress[index] !== undefined"
              class="progress-container"
            >
              <div
                class="progress-bar"
                :style="{ width: uploadProgress[index] + '%' }"
              ></div>
              <span class="progress-text">{{ uploadProgress[index] }}%</span>
            </div>
          </div>
          <button
            v-if="!uploading"
            @click="removeFile(index)"
            class="remove-btn"
          >
            ×
          </button>
        </li>
      </ul>
    </div>

    <p v-if="uploading">Uploading... {{ totalProgress }}%</p>
  </div>
</template>

<script>
import config from "../../../config.json";
import axios from "axios";

export default {
  name: "FileUpload",

  data() {
    return {
      files: [],
      isDragging: false,
      uploading: false,
      uploadProgress: {},
    };
  },

  computed: {
    totalProgress() {
      const progresses = Object.values(this.uploadProgress);
      return progresses.length
        ? Math.round(progresses.reduce((a, b) => a + b) / progresses.length)
        : 0;
    },
  },

  methods: {
    onDragOver() {
      this.isDragging = true;
    },

    onDragLeave() {
      this.isDragging = false;
    },

    onDrop(event) {
      this.isDragging = false;
      const droppedFiles = Array.from(event.dataTransfer.files);
      this.files = [...this.files, ...droppedFiles];
      this.uploadFiles();
    },

    triggerFileInput() {
      this.$refs.fileInput.click();
    },

    onFileChange(event) {
      const selectedFiles = Array.from(event.target.files);
      this.files = [...this.files, ...selectedFiles];
      event.target.value = "";
      this.uploadFiles();
    },

    removeFile(index) {
      this.files.splice(index, 1);
    },

    formatSize(bytes) {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    },

    async uploadFiles() {
      if (!this.files.length || this.uploading) return;

      this.uploading = true;
      this.uploadProgress = {};

      const uploadPromises = this.files.map((file, index) => {
        const formData = new FormData();
        formData.append("file", file);

        return axios.post(`${config.baseUrl}upload`, formData, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            this.$emit("refresh");
            this.$set(this.uploadProgress, index, percentCompleted)
          },
        });
      });

      try {
        await Promise.all(uploadPromises);
        this.files = [];
        this.uploadProgress = {};
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        this.uploading = false;
      }
    },
  },
};
</script>

<style scoped>
.drop-zone {
  width: 100%;
  height: 90px;
  border: 1.5px solid #dcdee3;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.drag-over {
  border-color: #2196f3;
  background-color: #f0f8ff;
}

.hidden-input {
  display: none;
}

.upload-content {
  min-height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-list {
  list-style: none;
  padding: 0;
  width: 100%;
}

.file-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.file-info {
  flex-grow: 1;
  text-align: left;
}

.progress-container {
  width: 100%;
  height: 8px;
  background: #eee;
  position: relative;
  margin-top: 4px;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: #2196f3;
  transition: width 0.3s ease;
}

.progress-text {
  position: absolute;
  top: -20px;
  right: 0;
  font-size: 12px;
  color: #666;
}

.remove-btn {
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  font-size: 12px;
  line-height: 20px;
}
</style>
