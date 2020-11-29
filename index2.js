const express = require("express");
const imagemin = require("imagemin");
const fileUpload = require("express-fileupload");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(fileUpload());

// app.get('/', (req,res) => {
//     res.sendFile(__dirname + 'public/index.html')
// })

app.post("/saveImage", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "Error: no file uploaded",
      });
    } else {
      // console.log(req.files)
      const file = req.files.file;
      const fileName = file.name;
      console.log(fileName);

      file.mv("./uploads/" + fileName, (err) => {
        if (err) {
          console.log("err");
          return;
        }
      });

      res.end()
    }
  } catch (err) {
    res.json({ Error: "error while uploading file" });
  }
});

app.get('/removeDir', (req,res) => {
  console.log('removed')
})


app.listen(port, () => console.log(`listening at ${port}`));
