const fileUpload = document.getElementById("fileUpload");
const removeBtn = document.getElementById('removeBtn')
const compressBtn = document.getElementById('compressBtn')
// const a = [];

fileUpload.addEventListener("change", (e) => {
  handleImageUpload(e);
  console.log("chosen");
});

removeBtn.addEventListener('click', (e) => {
 

  fetch('/removeDir', {method: 'POST'})
  .then(res => {
    if(res.ok) {
      console.log('folder contents removed successfully ')
      return
    }
    throw new Error('content removal request failed')
  })
  .catch(err => console.log('error removing file contents'))
})


compressBtn.addEventListener('click', (e) => {
  fetch('/compress', {method: 'POST'})
  .then(res => {
    if(res.ok) {
      console.log('compressed file ')
      return
    }
    throw new Error('compression failed')
  })
  .catch(err => console.log('error compressing'))
})



const handleImageUpload = (e) => {
  const files = e.target.files;
  const formData = new FormData();
  formData.append("myFile", files[0]);

  fetch("/saveImage", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

  console.log(files);

  // a.push(files)
  // console.log(a)
};


