// ============================================================
//  1. KIỂM TRA THƯ VIỆN
// ============================================================
if (typeof algebra === 'undefined') {
    console.error("Thư viện algebra.js chưa được tải.");
    alert("Không thể tải thư viện toán học. Hãy tải lại trang.");
}

// ============================================================
//  2. HÀM PHỤ TRỢ
// ============================================================
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function textToHtml(str) {
  return str.replace(/\^([0-9]+|[a-z])/g, '<sup>$1</sup>');
}

// Định dạng đơn thức: bỏ hệ số 1/-1 nếu có biến
function formatTerm(coeff, varName, exp) {
  if (!varName) return `${coeff}`;
  if (exp === 0) return `${coeff}`;
  const vStr = exp === 1 ? varName : `${varName}^${exp}`;
  if (coeff === 1) return vStr;
  if (coeff === -1) return `-${vStr}`;
  return `${coeff}${vStr}`;
}

// Xây dựng chuỗi đa thức từ mảng hạng tử [hệ số, tên_biến, số_mũ]
function buildPolynomial(terms) {
  let parts = [];
  for (let i = 0; i < terms.length; i++) {
    let [coeff, varName, exp] = terms[i];
    if (coeff === 0) continue;
    let termStr = formatTerm(coeff, varName, exp);
    if (i === 0) {
      parts.push(termStr);
    } else {
      if (coeff < 0) {
        parts.push('- ' + formatTerm(Math.abs(coeff), varName, exp));
      } else {
        parts.push('+ ' + termStr);
      }
    }
  }
  return parts.join(' ');
}

// Định dạng biểu thức trong ngoặc: (x + a) hoặc (x - a)
function formatFactor(v, val) {
  if (val < 0) {
    return `(${v} - ${Math.abs(val)})`;
  } else if (val === 0) {
    return `(${v})`;
  } else {
    return `(${v} + ${val})`;
  }
}

// Rút gọn nhân tử chung của biểu thức dạng (a*x + b)^n
function simplifyPowerFactor(a, b, v, exp) {
  if (a === 0) return { coeff: 0, inner: '' };
  // Tìm ước chung lớn nhất của |a| và |b|
  let gcd = (x, y) => {
    x = Math.abs(x); y = Math.abs(y);
    while (y) { let t = y; y = x % y; x = t; }
    return x;
  };
  let g = gcd(a, b);
  if (g > 1) {
    let newA = a / g;
    let newB = b / g;
    let coeff = Math.pow(g, exp);
    let inner = formatTerm(newA, v, 1);
    if (newB > 0) inner += ' + ' + newB;
    else if (newB < 0) inner += ' - ' + Math.abs(newB);
    else inner += '';
    return { coeff: coeff, inner: '(' + inner + ')^' + exp };
  } else {
    let inner = formatTerm(a, v, 1);
    if (b > 0) inner += ' + ' + b;
    else if (b < 0) inner += ' - ' + Math.abs(b);
    else inner += '';
    return { coeff: 1, inner: '(' + inner + ')^' + exp };
  }
}

// Chèn dấu nhân * để algebra.js parse đúng
function insertMultiplication(str) {
  str = str.replace(/\s/g, '');
  str = str.replace(/−/g, '-');
  str = str.replace(/[•*]/g, '*');
  str = str.replace(/\+-/g, '-');
  str = str.replace(/(\d)([a-z])/g, '$1*$2');
  str = str.replace(/([a-z])([a-z])/g, '$1*$2');
  str = str.replace(/\)\(/g, ')*(');
  str = str.replace(/\)([a-z])/g, ')*$1');
  str = str.replace(/([a-z])\(/g, '$1*(');
  str = str.replace(/(\d)\(/g, '$1*(');
  str = str.replace(/\)(\d)/g, ')*$1');
  return str;
}

// ============================================================
//  3. SO SÁNH BẰNG ĐẠI SỐ
// ============================================================
function compareExpressions(userStr, correctStr) {
  if (typeof algebra === 'undefined') return false;
  try {
    let uRaw = userStr.replace(/\s/g, '').replace(/\+-/g, '-');
    let cRaw = correctStr.replace(/\s/g, '').replace(/\+-/g, '-');
    let u = insertMultiplication(uRaw);
    let c = insertMultiplication(cRaw);
    let uExpr = algebra.parse(u);
    let cExpr = algebra.parse(c);
    let diff = uExpr.subtract(cExpr);
    let simplified = diff.simplify();
    return simplified.toString() === "0";
  } catch (e) {
    console.error('Error:', e);
    return false;
  }
}

// ============================================================
//  4. CÁC GENERATOR – TỈ LỆ 20% HẰNG ĐẲNG THỨC + ĐÁP ÁN TỐI GIẢN
// ============================================================
const generators = [];

// ---- 4.1 Đặt nhân tử chung (trọng số 4) ----
for (let i = 0; i < 4; i++) {
  generators.push(function genCommonFactor() {
    let a = randInt(2, 5);
    let b = randInt(1, 4);
    let c = randInt(1, 4);
    let v = randChoice(['x', 'y']);
    let coeff1 = a * b;
    let coeff2 = a * c;
    let polyStr = buildPolynomial([
      [coeff1, v, 2],
      [coeff2, v, 1]
    ]);
    let factorStr = formatTerm(a, v, 1) + '(' + formatTerm(b, v, 1) + ' + ' + c + ')';
    return { question: textToHtml(polyStr), answer: factorStr };
  });
}

// ---- 4.2 Bình phương tổng/hiệu (trọng số 1) ----
generators.push(function genSquare() {
  let a = randInt(1, 3);
  let b = randInt(1, 5);
  let sign = randChoice(['+', '-']);
  let v = randChoice(['x', 'y']);
  let a2 = a * a;
  let ab2 = 2 * a * b;
  let b2 = b * b;
  let polyStr = (sign === '+')
    ? buildPolynomial([[a2, v, 2], [ab2, v, 1], [b2, null, 0]])
    : buildPolynomial([[a2, v, 2], [-ab2, v, 1], [b2, null, 0]]);
  // Đáp án tối giản: rút gọn nhân tử chung nếu có
  let g = Math.abs(a);
  let g2 = gcd(g, Math.abs(b));
  if (g2 > 1) {
    let newA = a / g2;
    let newB = b / g2;
    let coeff = Math.pow(g2, 2);
    let inner = formatTerm(newA, v, 1);
    if (newB > 0) inner += ' + ' + newB;
    else if (newB < 0) inner += ' - ' + Math.abs(newB);
    let factorStr = (coeff === 1) ? '(' + inner + ')^2' : coeff + '(' + inner + ')^2';
    return { question: textToHtml(polyStr), answer: factorStr };
  } else {
    let factorStr = '(' + formatTerm(a, v, 1) + ' ' + sign + ' ' + b + ')^2';
    return { question: textToHtml(polyStr), answer: factorStr };
  }
});

function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { let t = b; b = a % b; a = t; }
  return a;
}

// ---- 4.3 Hiệu hai bình phương (trọng số 1) ----
generators.push(function genDiffSquares() {
  let a = randInt(1, 4);
  let b = randInt(1, 4);
  let v = randChoice(['x', 'y']);
  let polyStr = buildPolynomial([
    [a * a, v, 2],
    [-b * b, null, 0]
  ]);
  let factorStr = '(' + formatTerm(a, v, 1) + ' - ' + b + ')(' + formatTerm(a, v, 1) + ' + ' + b + ')';
  return { question: textToHtml(polyStr), answer: factorStr };
});

// ---- 4.4 Lập phương tổng/hiệu (trọng số 1) ----
generators.push(function genCube() {
  let a = randInt(1, 2);
  let b = randInt(1, 3);
  let sign = randChoice(['+', '-']);
  let v = randChoice(['x', 'y']);
  let a3 = a * a * a;
  let a2b3 = 3 * a * a * b;
  let ab2_3 = 3 * a * b * b;
  let b3 = b * b * b;
  let polyStr = (sign === '+')
    ? buildPolynomial([[a3, v, 3], [a2b3, v, 2], [ab2_3, v, 1], [b3, null, 0]])
    : buildPolynomial([[a3, v, 3], [-a2b3, v, 2], [ab2_3, v, 1], [-b3, null, 0]]);
  // Rút gọn nhân tử chung
  let g = gcd(a, b);
  if (g > 1) {
    let newA = a / g;
    let newB = b / g;
    let coeff = Math.pow(g, 3);
    let inner = formatTerm(newA, v, 1);
    if (newB > 0) inner += ' + ' + newB;
    else if (newB < 0) inner += ' - ' + Math.abs(newB);
    let factorStr = (coeff === 1) ? '(' + inner + ')^3' : coeff + '(' + inner + ')^3';
    return { question: textToHtml(polyStr), answer: factorStr };
  } else {
    let factorStr = '(' + formatTerm(a, v, 1) + ' ' + sign + ' ' + b + ')^3';
    return { question: textToHtml(polyStr), answer: factorStr };
  }
});

// ---- 4.5 Tổng / hiệu hai lập phương (trọng số 1) ----
generators.push(function genSumDiffCubes() {
  let a = randInt(1, 3);
  let b = randInt(1, 3);
  let sign = randChoice(['+', '-']);
  let v = randChoice(['x', 'y']);
  let a2 = a * a;
  let ab = a * b;
  let b2 = b * b;
  let polyStr, factorStr;
  if (sign === '+') {
    polyStr = buildPolynomial([[a2 * a, v, 3], [b2 * b, null, 0]]);
    factorStr = '(' + formatTerm(a, v, 1) + ' + ' + b + ')(' + formatTerm(a2, v, 2) + ' - ' + formatTerm(ab, v, 1) + ' + ' + b2 + ')';
  } else {
    polyStr = buildPolynomial([[a2 * a, v, 3], [-b2 * b, null, 0]]);
    factorStr = '(' + formatTerm(a, v, 1) + ' - ' + b + ')(' + formatTerm(a2, v, 2) + ' + ' + formatTerm(ab, v, 1) + ' + ' + b2 + ')';
  }
  return { question: textToHtml(polyStr), answer: factorStr };
});

// ---- 4.6 Nhóm hạng tử (trọng số 4) ----
for (let i = 0; i < 4; i++) {
  generators.push(function genGrouping() {
    let v1 = randChoice(['x', 'y', 'a', 'b']);
    let v2 = randChoice(['y', 'z', 'b', 'c']);
    if (v1 === v2) v2 = (v1 === 'x' ? 'y' : 'x');
    let m = randInt(1, 3);
    let n = randInt(1, 3);
    let polyStr, factorStr;
    if (Math.random() > 0.5) {
      polyStr = buildPolynomial([
        [1, v1, 2],
        [1, v1 + v2, 1],
        [1, v1, 1],
        [1, v2, 1]
      ]);
      factorStr = '(' + formatTerm(1, v1, 1) + ' + 1)(' + formatTerm(1, v1, 1) + ' + ' + formatTerm(1, v2, 1) + ')';
    } else {
      let sum = m + n;
      let prod = m * n;
      polyStr = buildPolynomial([
        [1, v1, 2],
        [sum, v1, 1],
        [prod, null, 0]
      ]);
      factorStr = formatFactor(v1, m) + formatFactor(v1, n);
    }
    return { question: textToHtml(polyStr), answer: factorStr };
  });
}

// ---- 4.7 Tam thức bậc hai (trọng số 4) ----
for (let i = 0; i < 4; i++) {
  generators.push(function genQuadratic() {
    let hasACoeff = Math.random() < 0.4;
    let v = randChoice(['x', 'y']);
    if (hasACoeff) {
      let a1 = randInt(1, 3);
      let a2 = randInt(1, 3);
      let b1 = randInt(-5, 5);
      let b2 = randInt(-5, 5);
      while (b1 === 0 || b2 === 0 || Math.abs(b1) === 1 && Math.abs(b2) === 1) {
        b1 = randInt(-5, 5);
        b2 = randInt(-5, 5);
      }
      let a = a1 * a2;
      let b = a1 * b2 + a2 * b1;
      let c = b1 * b2;
      let polyStr = buildPolynomial([
        [a, v, 2],
        [b, v, 1],
        [c, null, 0]
      ]);
      let factorStr = '(' + formatTerm(a1, v, 1) + (b1 >= 0 ? ' + ' : ' - ') + Math.abs(b1) + ')' +
                      '(' + formatTerm(a2, v, 1) + (b2 >= 0 ? ' + ' : ' - ') + Math.abs(b2) + ')';
      return { question: textToHtml(polyStr), answer: factorStr };
    } else {
      let m = randInt(-5, 5);
      let n = randInt(-5, 5);
      while (m === 0 || n === 0 || Math.abs(m) === 1 && Math.abs(n) === 1) {
        m = randInt(-5, 5);
        n = randInt(-5, 5);
      }
      let sum = m + n;
      let prod = m * n;
      let polyStr = buildPolynomial([
        [1, v, 2],
        [sum, v, 1],
        [prod, null, 0]
      ]);
      let factorStr = formatFactor(v, m) + formatFactor(v, n);
      return { question: textToHtml(polyStr), answer: factorStr };
    }
  });
}

// ---- 4.8 Phối hợp (trọng số 4) ----
for (let i = 0; i < 4; i++) {
  generators.push(function genMixed() {
    let a = randInt(2, 4);
    let b = randInt(1, 3);
    let v = randChoice(['x', 'y']);
    let polyStr = buildPolynomial([
      [a, v, 2],
      [-a * b * b, null, 0]
    ]);
    let factorStr = formatTerm(a, null, 0) + '(' + formatTerm(1, v, 1) + ' - ' + b + ')(' + formatTerm(1, v, 1) + ' + ' + b + ')';
    return { question: textToHtml(polyStr), answer: factorStr };
  });
}

// ============================================================
//  5. QUẢN LÝ TRẠNG THÁI
// ============================================================
let currentQuestion = '';
let currentAnswer = '';
let correctCount = 0;
let totalCount = 0;

const questionEl = document.getElementById('question');
const userInput = document.getElementById('user-input');
const previewText = document.getElementById('preview-text');
const checkBtn = document.getElementById('check-btn');
const nextBtn = document.getElementById('next-btn');
const statsEl = document.getElementById('stats');
const resetBtn = document.getElementById('reset-btn');
const clearBtn = document.getElementById('clear-btn');

function initQuestion() {
  const gen = randChoice(generators);
  const data = gen();
  currentQuestion = data.question;
  currentAnswer = data.answer;
  questionEl.innerHTML = currentQuestion + ' = ?';
  userInput.value = '';
  userInput.disabled = false;
  userInput.style.borderColor = 'var(--border)';
  userInput.focus();
  previewText.innerHTML = '<i>Chưa nhập gì...</i>';
  nextBtn.style.display = 'none';
  checkBtn.style.display = 'inline-block';
}

function updatePreview() {
  let val = userInput.value;
  let html = textToHtml(val);
  previewText.innerHTML = html || '<i>Chưa nhập gì...</i>';
}

function checkAnswer() {
  const userVal = userInput.value.trim();
  if (!userVal) return;
  userInput.disabled = true;
  checkBtn.style.display = 'none';
  totalCount++;
  const isCorrect = compareExpressions(userVal, currentAnswer);
  if (isCorrect) {
    userInput.style.borderColor = 'var(--success)';
    previewText.innerHTML = '<span style="color: var(--success); font-weight: bold;">✓ Chính xác!</span>';
    correctCount++;
  } else {
    userInput.style.borderColor = 'var(--danger)';
    let displayAns = textToHtml(currentAnswer);
    previewText.innerHTML = `<span style="color: var(--danger); font-weight: bold;">✗ Chưa đúng</span><br><span style="color: #cbd5e1; font-size: 0.95rem;">Đáp án: ${displayAns}</span>`;
  }
  const percent = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  statsEl.innerText = `📊 Số câu đúng: ${correctCount}/${totalCount} (${percent}%)`;
  nextBtn.style.display = 'inline-block';
}

function resetGame() {
  correctCount = 0;
  totalCount = 0;
  statsEl.innerText = `📊 Số câu đúng: 0/0 (0%)`;
  initQuestion();
}

// ============================================================
//  6. SỰ KIỆN
// ============================================================
window.onload = function() {
  initQuestion();
  userInput.oninput = updatePreview;
  userInput.onkeydown = function(e) {
    if (e.key === 'Enter') {
      if (checkBtn.style.display !== 'none') checkAnswer();
      else initQuestion();
    }
  };
  checkBtn.onclick = checkAnswer;
  nextBtn.onclick = initQuestion;
  resetBtn.onclick = resetGame;
  document.querySelectorAll('.kbd-btn[data-char]').forEach(btn => {
    btn.onclick = function() {
      if (userInput.disabled) return;
      const char = this.dataset.char;
      const start = userInput.selectionStart;
      const end = userInput.selectionEnd;
      const text = userInput.value;
      userInput.value = text.substring(0, start) + char + text.substring(end);
      userInput.focus();
      userInput.selectionStart = userInput.selectionEnd = start + char.length;
      updatePreview();
    };
  });
  clearBtn.onclick = function() {
    if (userInput.disabled) return;
    userInput.value = '';
    userInput.focus();
    updatePreview();
  };
};