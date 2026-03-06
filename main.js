document.getElementById('generate-btn').addEventListener('click', function() {
  const container = document.getElementById('lotto-container');
  container.innerHTML = ''; // 기존 번호 삭제

  const numbers = generateLottoNumbers();
  
  numbers.forEach((num, index) => {
    // 순차적으로 공이 나타나도록 지연 시간 추가
    setTimeout(() => {
      const ball = document.createElement('div');
      ball.className = `ball ${getColorClass(num)}`;
      ball.textContent = num;
      container.appendChild(ball);
    }, index * 100);
  });
});

function generateLottoNumbers() {
  const numbers = [];
  while (numbers.length < 6) {
    const randomNum = Math.floor(Math.random() * 45) + 1;
    if (!numbers.includes(randomNum)) {
      numbers.push(randomNum);
    }
  }
  return numbers.sort((a, b) => a - b);
}

function getColorClass(num) {
  if (num <= 10) return 'color-1-10';
  if (num <= 20) return 'color-11-20';
  if (num <= 30) return 'color-21-30';
  if (num <= 40) return 'color-31-40';
  return 'color-41-45';
}
