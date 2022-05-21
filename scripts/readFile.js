
const fs = require('fs');

fs.readFile('../gltfModels/intectGLTF_out/buffer.bin', '', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const newData = data.toString('base64');

  fs.writeFile("../gltfModels/intectGLTF_out/bin.txt", newData, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log(typeof newData);
    console.log("The file was saved!");
}); 
});
