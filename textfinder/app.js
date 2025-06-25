const video = document.getElementById('video');
const overlay = document.getElementById('overlay');
const ctx = overlay.getContext('2d');
const searchInput = document.getElementById('search');
let currentText = [];

async function setupCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
  return new Promise(resolve => {
    video.onloadedmetadata = () => {
      overlay.width = video.videoWidth;
      overlay.height = video.videoHeight;
      resolve();
    };
  });
}

async function recognize() {
  if (video.paused || video.ended) return requestAnimationFrame(recognize);
  const worker = Tesseract.createWorker();
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data } = await worker.recognize(video);
  currentText = data.words;
  await worker.terminate();
  drawBoxes();
  requestAnimationFrame(recognize);
}

function drawBoxes() {
  ctx.clearRect(0, 0, overlay.width, overlay.height);
  const query = searchInput.value.trim().toLowerCase();
  currentText.forEach(word => {
    const text = word.text.toLowerCase();
    if (query === '' || text.includes(query)) {
      const { x0, y0, x1, y1 } = word.bbox;
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 2;
      ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
    }
  });
}

searchInput.addEventListener('input', drawBoxes);

setupCamera().then(recognize);
