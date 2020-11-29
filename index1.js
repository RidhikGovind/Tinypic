const nodemon = require('nodemon')
const express = require("express");
const imagemin = require("imagemin");
// const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');


const fileUpload = require("express-fileupload");
const fs = require('fs').promises;
const path = require('path')
const fsExtra = require('fs-extra')



const app = express();

const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(fileUpload());

app.listen(port, () => console.log(`listening at ${port}`));

app.post("/saveImage", async (req, res) => {


  const fileName = req.files.myFile.name;
  const image = req.files.myFile;

    

    




  // await fs.mkdir('uploads', {recursive: true})
  const path = __dirname+ '/uploads/'+  fileName;

  // await fs.access('uploads', (err) => {
  //   if(err) {
  //     console.log('uploads folder doesnt exist')
  //     fs.mkdir('uploads', {recursive: true})
  //   }else {
  //     console.log('uploads folder exists')
  //   }
  // })
  
  image.mv(path, (err) => {
    if (err) {
      console.log(err);
      res.writeHead(500, {
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify({
          status: "error",
          message: err,
        })
      );
      return
    }

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({ status: "status", path: `${path}` })
    );
  });
});


app.post('/removeDir',  async (req,res) => {
  // console.log('removed') 
  
  fsExtra.emptyDirSync('uploads')

  console.log('folder contents removed successfully')

  // fs.rmdir('uploads', {recursive: true})
  //   .then(() => console.log('folder  removed successfully'))
})

app.post('/compress',(req,res) => {
  console.log('compressed')

  // await fs.mkdir('uploads', {recursive: true})

  const compress = async () => {
  await imagemin(['uploads/*.{jpg,png}'], {
    destination: "compressed-img",
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
          quality: [0.6, 0.6]
      })
  ],
  });

  console.log("image optimized");
  console.log(path.join(__dirname, "compressed-img",'*'))
};

compress();

})











