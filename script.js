const uploadInput = document.getElementById('imageUpload');
const generateBtn = document.getElementById('generateButton');
const downloadBtn = document.getElementById('downloadButton');
const canvas = document.getElementById('collageCanvas');
const ctx = canvas.getContext('2d');

let imageFiles = [];

uploadInput.addEventListener('change', (event) => {
  imageFiles = Array.from(event.target.files).filter(file => file.type.startsWith('image/'));
});

generateBtn.addEventListener('click', () => {
  if (imageFiles.length === 0) {
    alert("Vælg venligst mindst ét billede.");
    return;
  }

  const images = [];
  let loadedCount = 0;

  imageFiles.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        images[index] = img;
        loadedCount++;
        if (loadedCount === imageFiles.length) {
          drawCollage(images);
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
});

function drawCollage(images) {
  const spacing = 20;
  const imgWidth = 250;
  const imgHeight = 250;
  const totalWidth = (imgWidth + spacing) * images.length - spacing;

  canvas.width = totalWidth;
  canvas.height = imgHeight;

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  images.forEach((img, i) => {
    ctx.drawImage(img, i * (imgWidth + spacing), 0, imgWidth, imgHeight);
  });
}

downloadBtn.addEventListener('click', () => {
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = 'collage.png';
  link.href = dataURL;
  link.click();
});
