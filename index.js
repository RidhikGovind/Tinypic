const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const express = require("express");
const path = require("path");
const fs = require('fs')

const app = express();
const PORT = process.env.PORT || 5000;

const testfolder = './tests/'

let fileArr = []
fs.readdir(testfolder, (err,files) => {
    files.forEach(file => {
       fileArr.push(file)
    })
    console.log(fileArr)
})



// const compress = async () => {
//   await imagemin(["leaf.jpg"], {
//     destination: "compressed-img",
//     plugins: [imageminMozjpeg({ quality: 50 })],
//   });

//   console.log("image optimized");
//   console.log(path.join(__dirname, "compressed-img",'*'))
// };

// compress();


app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.download(path.join(__dirname, "compressed-img"));
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("listening at 5000");
});

// ***hardcore compression here****

// const compress = async () => {
//     await imagemin(['leaf.jpg'], {
//         destination: 'compressed-img',
//         plugins: [
//             imageminMozjpeg({quality: 50})
//         ]
//     })

//     console.log('image optimized')
// }
