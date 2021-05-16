# vue-fs

:rocket: [Demo](https://FlynnDerek.github.io)

This project exists because I noticed there arent many file management solutions avaliable in Vue. So I decided to write my own! Vue-fs is meant to be a
complete home file server and file management solution. The idea being you can run it on a Raspberry Pi, an old laptop or even a rack server. 
Over time I will be adding extra features to this project, listed below. I also welcome collaboration, should any of you feel inclined :)

<p align="center">
  <img src="https://i.imgur.com/xFYP1Ch.png">
</p>

### Features
- [X] Upload (multiple files)
- [X] Download (multiple files/directories)
- [X] Move (multiple files/directories)
- [X] Delete (multiple files/directories)
- [X] Subfolders 
- [X] Extracting
- [X] Create new diretories
- [X] Filtering
- [X] File viewer   *if compatible with the browser
- [ ] Rename files/directories
- [ ] User auth  
- [ ] HTTPS


# Installation
## Client
``` bash
cd client

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Server
``` bash
cd server

# install dependencies
npm install

# run server
node server.js

# if you have nodemon installed globally
npm run dev
```
