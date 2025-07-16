const uploadInput = document.getElementById('imageUpload');
const generateBtn = document.getElementById('generateButton');
const downloadBtn = document.getElementById('downloadButton');
const canvas = document.getElementById('collageCanvas');
const ctx = canvas.getContext('2d');

let images = [];

uploadInput.addEventListener('change', (event) => {
  images = [];
  const files = Array.from(event.target.files);
  if (files.length === 0) return;

  let loaded = 0;

  files.forEach(file => {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        images.push(img);
        loaded++;
        if (loaded === files.length) {
          console.log("Alle billeder indlæst:", images.length);
        }
      };
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
});

generateBtn.addEventListener('click', () => {
  if (images.length === 0) {
    alert("Upload venligst mindst ét billede.");
    return;
  }

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
});

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'collage.png';
  link.href = canvas.toDataURL();
  link.click();
});
