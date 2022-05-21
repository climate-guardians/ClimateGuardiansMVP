// Sample code

const languageEncoding = require("detect-file-encoding-and-language");

const pathToFile = "../gltfModels/intectGLTF_out/buffer.bin"

languageEncoding(pathToFile).then(fileInfo => console.log(fileInfo));
// Possible result: { language: japanese, encoding: Shift-JIS, confidence: { language: 0.97, encoding: 0.97 } }