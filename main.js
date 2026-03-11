// 테마 토글 로직
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  body.setAttribute('data-theme', 'dark');
  themeBtn.textContent = '☀️';
}

themeBtn.addEventListener('click', () => {
  const isDark = body.getAttribute('data-theme') === 'dark';
  if (isDark) {
    body.removeAttribute('data-theme');
    themeBtn.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  } else {
    body.setAttribute('data-theme', 'dark');
    themeBtn.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  }
});

// Teachable Machine 로직
const URL = "https://teachablemachine.withgoogle.com/models/1grRuEcmb/";
let model, labelContainer, maxPredictions;

async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();
  labelContainer = document.getElementById("label-container");
}

const uploadArea = document.getElementById('upload-area');
const imageInput = document.getElementById('image-input');
const faceImage = document.getElementById('face-image');
const imageContainer = document.getElementById('image-container');
const loading = document.getElementById('loading');
const retryBtn = document.getElementById('retry-btn');

uploadArea.addEventListener('click', () => imageInput.click());

imageInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      faceImage.src = event.target.result;
      uploadArea.classList.add('hidden');
      imageContainer.classList.remove('hidden');
      predict();
    };
    reader.readAsDataURL(file);
  }
});

async function predict() {
  loading.classList.remove('hidden');
  labelContainer.innerHTML = '';
  retryBtn.classList.add('hidden');

  if (!model) await init();

  const prediction = await model.predict(faceImage);
  loading.classList.add('hidden');
  
  // 결과 정렬 (확률 높은 순)
  prediction.sort((a, b) => b.probability - a.probability);

  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction = prediction[i].className;
    const probability = (prediction[i].probability * 100).toFixed(0);
    
    const resultBar = document.createElement("div");
    resultBar.className = "result-bar-container";
    
    // 클래스 이름에 따른 색상/아이콘 설정 (강아지/고양이)
    let barClass = "dog-bar";
    let icon = "🐶";
    if (classPrediction.includes("고양이") || classPrediction.toLowerCase().includes("cat")) {
      barClass = "cat-bar";
      icon = "🐱";
    }

    resultBar.innerHTML = `
      <div class="label-text">
        <span>${icon} ${classPrediction}</span>
        <span>${probability}%</span>
      </div>
      <div class="bar-bg">
        <div class="bar-fill ${barClass}" style="width: ${probability}%"></div>
      </div>
    `;
    labelContainer.appendChild(resultBar);
  }
  
  retryBtn.classList.remove('hidden');
}

retryBtn.addEventListener('click', () => {
  imageInput.value = '';
  uploadArea.classList.remove('hidden');
  imageContainer.classList.add('hidden');
  labelContainer.innerHTML = '';
  retryBtn.classList.add('hidden');
});

// 드래그 앤 드롭 지원
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.style.borderColor = 'var(--accent-color)';
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.style.borderColor = 'var(--placeholder-color)';
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.style.borderColor = 'var(--placeholder-color)';
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (event) => {
      faceImage.src = event.target.result;
      uploadArea.classList.add('hidden');
      imageContainer.classList.remove('hidden');
      predict();
    };
    reader.readAsDataURL(file);
  }
});

// 초기화
init();
