const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const startButton = document.getElementById('start-button');
const captureButton = document.getElementById('capture-button');

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      video.play();
    }
  })
  .catch(err => {
    console.error(`Error: ${err}`);
  });

startButton.onclick = () => {
  startButton.style.display = 'none';
  captureButton.style.display = 'block';
};

captureButton.onclick = () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = canvas.toDataURL();
  // You can now use the imageData to send it to the server for verification
};



const gallery = document.getElementById('gallery');
const uploadForm = document.getElementById('upload-form');
const fileInput = document.getElementById('file-input');

function displayPhotos() {
  // Display existing photos in the gallery
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('photo-')) {
      const photoUrl = localStorage.getItem(key);
      const photo = document.createElement('img');
      photo.setAttribute('src', photoUrl);
      photo.setAttribute('class', 'photo');
      gallery.appendChild(photo);
    }
  }
}

displayPhotos();

uploadForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const file = fileInput.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = (event) => {
    const photoUrl = event.target.result;
    const key = `photo-${Date.now()}`;
    localStorage.setItem(key, photoUrl);
    const photo = document.createElement('img');
    photo.setAttribute('src', photoUrl);
    photo.setAttribute('class', 'photo');
    gallery.appendChild(photo);
    fileInput.value = '';
  }
  reader.readAsDataURL(file);
});
                                                             