const ENCYCLOPEDIA_DATA = [
  {
    code: "ARSIP #01",
    title: "GASLIGHTING",
    category: "Distorsi Realitas",
    danger: "TINGGI",
    summary: "Membuat korban meragukan ingatan, kewarasan, dan persepsinya sendiri secara perlahan.",
    desc: "Gaslighting bekerja dengan menyangkal fakta yang jelas terjadi, memutarbalikkan kronologi, dan menuduh korban terlalu sensitif hingga korban bergantung pada versi realitas pelaku.",
    signs: "Kalimat seperti 'Kamu cuma mengada-ada', 'Itu tidak pernah terjadi', atau menyembunyikan barang lalu menyalahkan ingatanmu.",
    defense: "Catat kejadian penting secara tertulis segera setelah terjadi dan validasi fakta bersama pihak netral di luar lingkaran pelaku."
  },
  {
    code: "ARSIP #02",
    title: "LOVE BOMBING",
    category: "Jerat Emosi",
    danger: "TINGGI",
    summary: "Banjir perhatian, pujian, dan kedekatan palsu di awal untuk menciptakan ketergantungan.",
    desc: "Pelaku memberikan afeksi berlebihan dalam waktu singkat agar pertahanan logis korban runtuh, lalu menarik perhatian tersebut secara mendadak ketika kendali sudah didapat.",
    signs: "Pujian berlebihan sejak hari pertama, dorongan komitmen terlalu cepat, dan rasa bersalah jika kamu meminta ruang pribadi.",
    defense: "Perlambat ritme hubungan. Amati konsistensi tindakan jangka panjang dibandingkan kata-kata manis di awal."
  },
  {
    code: "ARSIP #03",
    title: "GUILT TRIPPING",
    category: "Jerat Emosi",
    danger: "SEDANG",
    summary: "Menanamkan rasa bersalah agar korban menuruti keinginan pelaku tanpa sadar.",
    desc: "Pelaku memposisikan diri sebagai korban yang menderita akibat keputusanmu, sehingga kamu merasa kejam jika mempertahankan batasan diri.",
    signs: "Mengungkit pengorbanan masa lalu setiap kali kamu menolak permintaan atau mengeluh secara pasif-agresif.",
    defense: "Pisahkan antara empati dan tanggung jawab. Menjaga batasan sehat bukan berarti menyakiti orang lain."
  },
  {
    code: "ARSIP #04",
    title: "SILENT TREATMENT",
    category: "Kendali Sosial",
    danger: "SEDANG",
    summary: "Hukuman berupa kebisuan total untuk memicu kecemasan dan kepatuhan.",
    desc: "Berbeda dengan menenangkan diri sejenak, silent treatment dipakai untuk mengisolasi dan membuat korban mengemis komunikasi serta meminta maaf demi mengakhiri ketegangan.",
    signs: "Menolak berbicara berhari-hari tanpa menjelaskan alasan atau batas waktu diskusi.",
    defense: "Tetap tenang, sampaikan kesiapan berdiskusi saat suasana kondusif, dan jangan mengejar validasi secara panik."
  },
  {
    code: "ARSIP #05",
    title: "TRIANGULASI",
    category: "Kendali Sosial",
    danger: "TINGGI",
    summary: "Memasukkan pihak ketiga untuk memicu rasa tidak aman, cemburu, atau persaingan.",
    desc: "Pelaku membandingkanmu dengan orang lain atau menyampaikan pesan terselubung lewat perantara agar kamu berusaha keras membuktikan nilai dirimu.",
    signs: "Sering memuji orang lain tepat saat kamu melakukan kesalahan kecil untuk memancing reaksi emosional.",
    defense: "Tolak ikut bermain dalam perbandingan. Fokus pada komunikasi langsung dua arah tanpa perantara."
  },
  {
    code: "ARSIP #06",
    title: "MIRRORING & CHAMELEON",
    category: "Distorsi Realitas",
    danger: "SEDANG",
    summary: "Meniru gestur, nilai, dan selera target untuk membangun ilusi kecocokan instan.",
    desc: "Dengan menyalin bahasa tubuh dan keyakinanmu secara halus, pelaku menciptakan kesan seolah kalian memiliki ikatan batin yang langka.",
    signs: "Semua hobi, luka masa lalu, dan prinsip hidupnya tampak selalu identik dengan apa yang baru saja kamu ceritakan.",
    defense: "Uji keaslian dengan bertanya detail mendalam dan amati bagaimana ia bersikap kepada orang lain."
  }
];

const QUIZ_QUESTIONS = [
  {
    question: "Seseorang terus menyangkal ucapan yang jelas-jelas ia katakan kemarin, lalu menuduhmu terlalu sensitif. Pola apa yang sedang terjadi?",
    options: ["Gaslighting", "Mirroring", "Triangulasi"],
    answer: 0
  },
  {
    question: "Baru kenal dua hari, seseorang langsung menghujanimu hadiah dan menyebutmu belahan jiwa, namun marah saat kamu sibuk. Ini ciri dari:",
    options: ["Silent Treatment", "Love Bombing", "Guilt Tripping"],
    answer: 1
  },
  {
    question: "Ketika kamu menolak permintaan teman, ia berkata: 'Setelah semua yang kulakukan untukmu, begini balasanmu?' Ini adalah taktik:",
    options: ["Guilt Tripping", "Mirroring", "Distorsi Spasial"],
    answer: 0
  }
];

// Navigasi Halaman
const navButtons = document.querySelectorAll(".nav-btn");
const pages = document.querySelectorAll(".page");

function switchPage(pageId) {
  pages.forEach((p) => p.classList.remove("active"));
  navButtons.forEach((btn) => btn.classList.remove("active"));

  const targetPage = document.getElementById(`page-${pageId}`);
  const targetBtn = document.querySelector(`.nav-btn[data-page="${pageId}"]`);

  if (targetPage) targetPage.classList.add("active");
  if (targetBtn) targetBtn.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => switchPage(btn.dataset.page));
});

document.querySelectorAll("[data-goto]").forEach((btn) => {
  btn.addEventListener("click", () => switchPage(btn.dataset.goto));
});

// Render Kartu Ensiklopedia
const grid = document.getElementById("encyclopediaGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

function renderCards() {
  const keyword = searchInput.value.toLowerCase().trim();
  const category = categoryFilter.value;

  const filtered = ENCYCLOPEDIA_DATA.filter((item) => {
    const matchText =
      item.title.toLowerCase().includes(keyword) ||
      item.summary.toLowerCase().includes(keyword);
    const matchCat = category === "ALL" || item.category === category;
    return matchText && matchCat;
  });

  grid.innerHTML = "";

  if (filtered.length === 0) {
    grid.innerHTML = `<p style="color:#9e9ea6;">Tidak ada arsip yang cocok dengan pencarianmu.</p>`;
    return;
  }

  filtered.forEach((item) => {
    const card = document.createElement("article");
    card.className = "entry-card";
    card.innerHTML = `
      <div>
        <div class="entry-code">${item.code} • ${item.category.toUpperCase()}</div>
        <h3>${item.title}</h3>
        <p>${item.summary}</p>
      </div>
      <div class="card-footer">
        <span>RISIKO: <strong class="text-red">${item.danger}</strong></span>
        <span>BEDAH ARSIP →</span>
      </div>
    `;
    card.addEventListener("click", () => openModal(item));
    grid.appendChild(card);
  });
}

searchInput.addEventListener("input", renderCards);
categoryFilter.addEventListener("change", renderCards);

// Modal Detail
const modal = document.getElementById("detailModal");
const closeModalBtn = document.getElementById("closeModal");

function openModal(item) {
  document.getElementById("modalCode").textContent = `${item.code} // RISIKO ${item.danger}`;
  document.getElementById("modalTitle").textContent = item.title;
  document.getElementById("modalCategory").textContent = `Kategori: ${item.category}`;
  document.getElementById("modalDesc").textContent = item.desc;
  document.getElementById("modalSigns").textContent = item.signs;
  document.getElementById("modalDefense").textContent = item.defense;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Kuis Uji Kesadaran
let currentQuiz = 0;
let score = 0;
const quizContainer = document.getElementById("quizContainer");

function renderQuiz() {
  if (currentQuiz >= QUIZ_QUESTIONS.length) {
    quizContainer.innerHTML = `
      <span class="badge-red">HASIL PEMINDAIAN</span>
      <h3>SKOR KESADARAN: ${score} / ${QUIZ_QUESTIONS.length}</h3>
      <p>${
        score === QUIZ_QUESTIONS.length
          ? "Instingmu tajam. Kamu mampu mengenali pola manipulasi sebelum ia mengendalikan keputusanmu."
          : "Beberapa bayangan masih sempat menyamar. Pelajari kembali arsip di halaman Ensiklopedia."
      }</p>
      <button class="action-btn" id="restartQuizBtn">ULANGI UJI KESADARAN</button>
    `;
    document.getElementById("restartQuizBtn").addEventListener("click", () => {
      currentQuiz = 0;
      score = 0;
      renderQuiz();
    });
    return;
  }

  const q = QUIZ_QUESTIONS[currentQuiz];
  quizContainer.innerHTML = `
    <span class="badge-red">SKENARIO ${currentQuiz + 1} DARI ${QUIZ_QUESTIONS.length}</span>
    <h3>${q.question}</h3>
    <div id="quizOptions"></div>
  `;

  const optionsDiv = document.getElementById("quizOptions");
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.textContent = `${String.fromCharCode(65 + idx)}. ${opt}`;
    btn.addEventListener("click", () => {
      if (idx === q.answer) score++;
      currentQuiz++;
      renderQuiz();
    });
    optionsDiv.appendChild(btn);
  });
}

renderCards();
renderQuiz();
