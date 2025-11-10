const express = require('express');

const rutas_fotos = express.Router();

const fs = require('fs');

const {getPhotoController, postPhotoController, putPhotoController, deletePhotoController, getNewPhotoController, getOnePhotoController} = require("../controllers/controller_photo");

const multer = require('multer');


const upload = multer({
    storage: multer.diskStorage({
                destination: "public/fotos/",
            })
});


rutas_fotos.get('/', getPhotoController);

rutas_fotos.get('/nuevo', getNewPhotoController);

rutas_fotos.get('/:codigo', getOnePhotoController);

rutas_fotos.post("/", upload.single("foto"), postPhotoController);

rutas_fotos.put("/", upload.single("foto"), putPhotoController);

rutas_fotos.delete("/", deletePhotoController);


module.exports = rutas_fotos;