const convert = require('fbx2gltf');
convert('../fbxModels/insect_model_textured.fbx', '../gltfModels/intectGLTF.gltf', ['--embed']).then(
  destPath => {
    // yay, do what we will with our shiny new GLB file!
  },
  error => {
    // ack, conversion failed: inspect 'error' for details
  }
);