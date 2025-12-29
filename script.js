
const HEBER_ARAMI_IRATOK = [
    { short: "1Mó", full: "1Mózes", chapters: 50 },
    { short: "2Mó", full: "2Mózes", chapters: 40 },
    { short: "3Mó", full: "3Mózes", chapters: 27 },
    { short: "4Mó", full: "4Mózes", chapters: 36 },
    { short: "5Mó", full: "5Mózes", chapters: 34 },
    { short: "Jzs", full: "Józsué", chapters: 24 },
    { short: "Bí", full: "Bírák", chapters: 21 },
    { short: "Ru", full: "Ruth", chapters: 4 },
    { short: "1Sá", full: "1Sámuel", chapters: 31 },
    { short: "2Sá", full: "2Sámuel", chapters: 24 },
    { short: "1Ki", full: "1Királyok", chapters: 22 },
    { short: "2Ki", full: "2Királyok", chapters: 25 },
    { short: "1Kr", full: "1Krónikák", chapters: 29 },
    { short: "2Kr", full: "2Krónikák", chapters: 36 },
    { short: "Ezs", full: "Ezsdrás", chapters: 10 },
    { short: "Ne", full: "Nehémiás", chapters: 13 },
    { short: "Esz", full: "Eszter", chapters: 10 },
    { short: "Jób", full: "Jób", chapters: 42 },
    { short: "Zs", full: "Zsoltárok", chapters: 150 },
    { short: "Pl", full: "Példabeszédek", chapters: 31 },
    { short: "Pr", full: "Prédikátor", chapters: 12 },
    { short: "Én", full: "Énekek éneke", chapters: 8 },
    { short: "Ézs", full: "Ézsaiás", chapters: 66 },
    { short: "Jr", full: "Jeremiás", chapters: 52 },
    { short: "Si", full: "Siralmak", chapters: 5 },
    { short: "Ez", full: "Ezékiel", chapters: 48 },
    { short: "Dá", full: "Dániel", chapters: 12 },
    { short: "Hó", full: "Hóseás", chapters: 14 },
    { short: "Jóe", full: "Jóel", chapters: 3 },
    { short: "Ám", full: "Ámós", chapters: 9 },
    { short: "Ab", full: "Abdiás", chapters: 1 },
    { short: "Jón", full: "Jónás", chapters: 4 },
    { short: "Mi", full: "Mikeás", chapters: 7 },
    { short: "Ná", full: "Náhum", chapters: 3 },
    { short: "Ha", full: "Habakuk", chapters: 3 },
    { short: "So", full: "Sofóniás", chapters: 3 },
    { short: "Ag", full: "Aggeus", chapters: 2 },
    { short: "Za", full: "Zakariás", chapters: 14 },
    { short: "Ma", full: "Malakiás", chapters: 4 },
];

const KERESZTENY_GOROG_IRATOK = [
    { short: "Mt", full: "Máté", chapters: 28 },
    { short: "Mr", full: "Márk", chapters: 16 },
    { short: "Lk", full: "Lukács", chapters: 24 },
    { short: "Jn", full: "János", chapters: 21 },
    { short: "Cs", full: "Cselekedetek", chapters: 28 },
    { short: "Ró", full: "Róma", chapters: 16 },
    { short: "1Ko", full: "1Korintusz", chapters: 16 },
    { short: "2Ko", full: "2Korintusz", chapters: 13 },
    { short: "Ga", full: "Galácia", chapters: 6 },
    { short: "Ef", full: "Efézus", chapters: 6 },
    { short: "Flp", full: "Filippi", chapters: 4 },
    { short: "Kol", full: "Kolosszé", chapters: 4 },
    { short: "1Te", full: "1Tesszalonika", chapters: 5 },
    { short: "2Te", full: "2Tesszalonika", chapters: 3 },
    { short: "1Ti", full: "1Timóteusz", chapters: 6 },
    { short: "2Ti", full: "2Timóteusz", chapters: 4 },
    { short: "Tit", full: "Titusz", chapters: 3 },
    { short: "Flm", full: "Filemon", chapters: 1 },
    { short: "Héb", full: "Héberek", chapters: 13 },
    { short: "Jk", full: "Jakab", chapters: 5 },
    { short: "1Pt", full: "1Péter", chapters: 5 },
    { short: "2Pt", full: "2Péter", chapters: 3 },
    { short: "1Jn", full: "1János", chapters: 5 },
    { short: "2Jn", full: "2János", chapters: 1 },
    { short: "3Jn", full: "3János", chapters: 1 },
    { short: "Júd", full: "Júdás", chapters: 1 },
    { short: "Jel", full: "Jelenések", chapters: 22 },
];

const booksEl = document.getElementById("books");
const chaptersSection = document.getElementById("chapters");
const chapterGrid = document.getElementById("chapterGrid");
const bookTitle = document.getElementById("bookTitle");
const backBtn = document.getElementById("backBtn");

let lastScrollTop = 0;

booksEl.className = "";

function getStoredChapters() {
    const data = localStorage.getItem("readChapters");
    return data ? JSON.parse(data) : {};
}

function storeChapter(bookShort, chapterIndex, done) {
    const readChapters = getStoredChapters();
    if (!readChapters[bookShort]) readChapters[bookShort] = [];

    if (done && !readChapters[bookShort].includes(chapterIndex)) {
        readChapters[bookShort].push(chapterIndex);
    } else if (!done && readChapters[bookShort].includes(chapterIndex)) {
        readChapters[bookShort] = readChapters[bookShort].filter(i => i !== chapterIndex);
    }

    localStorage.setItem("readChapters", JSON.stringify(readChapters));
}

function renderBookGroup(title, books, colorClass) {
    const group = document.createElement("div");
    group.className = "book-group";

    const heading = document.createElement("h2");
    heading.className = "section-title";
    heading.textContent = title;

    const grid = document.createElement("div");
    grid.className = "grid";

    books.forEach(book => {
        const card = document.createElement("div");
        card.className = `card ${colorClass}`;
        card.textContent = book.short;

        const readChapters = getStoredChapters();
        if (readChapters[book.short] && readChapters[book.short].length === book.chapters) {
            card.classList.add("done");
        }

        card.addEventListener("click", () => openBook(book));
        grid.appendChild(card);
    });

    group.appendChild(heading);
    group.appendChild(grid);
    booksEl.appendChild(group);
}

function openBook(book) {
    lastScrollTop = window.scrollY;

    booksEl.classList.add("hidden");
    chaptersSection.classList.remove("hidden");
    bookTitle.textContent = book.full;

    chapterGrid.innerHTML = "";

    const readChapters = getStoredChapters();
    const readSet = readChapters[book.short] || [];

    for (let i = 1; i <= book.chapters; i++) {
        const chapterCard = document.createElement("div");
        chapterCard.className = "card chapter";
        chapterCard.textContent = `${i}`;

        if (readSet.includes(i)) chapterCard.classList.add("done");

        chapterCard.addEventListener("click", () => {
            chapterCard.classList.toggle("done");
            storeChapter(book.short, i, chapterCard.classList.contains("done"));
            updateBookStatus(book);
        });

        chapterGrid.appendChild(chapterCard);
    }

    updateBookStatus(book);
}

function updateBookStatus(book) {
    const chapters = Array.from(chapterGrid.children);
    const allDone = chapters.every(ch => ch.classList.contains("done"));

    const allBookCards = document.querySelectorAll(".card");
    allBookCards.forEach(card => {
        if (card.textContent === book.short) {
            if (allDone) card.classList.add("done");
            else card.classList.remove("done");
        }
    });
}

backBtn.addEventListener("click", () => {
    chaptersSection.classList.add("hidden");
    booksEl.classList.remove("hidden");

    // Visszaállítjuk a teljes oldal scroll pozícióját
    window.scrollTo(0, lastScrollTop);
});


renderBookGroup("Héber–arámi iratok", HEBER_ARAMI_IRATOK, "heber");
renderBookGroup("Keresztény görög iratok", KERESZTENY_GOROG_IRATOK, "gorog");

/* ========== */
/* INFO gomb */
/* ========== */
const trashIcon = document.getElementById("trashIcon");
const infoPanel = document.getElementById("infoPanel");
const infoIcon = document.getElementById("infoIcon");
const closeModalBtn = document.getElementById("closeModal");
const modalLeft = document.querySelector(".modal-left");

function openModal() {
    infoPanel.style.display = "flex";
    setTimeout(() => infoPanel.classList.add("show"), 10);
    document.body.style.overflow = "hidden";
}

function closeModalFunc() {
    // Egyszerűen eltávolítjuk a show osztályt, a CSS transition gondoskodik az animációról
    infoPanel.classList.remove("show");
    
    // Megvárjuk az animáció végét, majd elrejtjük
    infoPanel.addEventListener("transitionend", function handler() {
        infoPanel.style.display = "none";
        document.body.style.overflow = "";
        infoPanel.removeEventListener("transitionend", handler);
    });
}

// Események
infoIcon.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModalFunc);
infoPanel.addEventListener("click", (e) => {
    if (!e.target.closest(".modal-content")) {
        closeModalFunc();
    }
});


/* ================== */
/* Kuka ikon működése */
/* ================== */

const confirmPanel = document.getElementById("confirmPanel");
const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");
const confirmLeft = document.getElementById("confirmLeft");

trashIcon.addEventListener("click", () => {
    const readChapters = getStoredChapters();

    // Van-e egyáltalán kijelölt fejezet?
    const hasAny = Object.values(readChapters).some(arr => arr.length > 0);

    if (!hasAny) {
        alert("Nincs kijelölt fejezet.");
        return;
    }

    const confirmed = confirm(
        "Biztosan törölni szeretnéd az ÖSSZES kijelölt fejezetet?\n\n" +
        "Ez a művelet nem visszavonható."
    );

    if (!confirmed) return;

    // 🔥 TÖRLÉS
    localStorage.removeItem("readChapters");

    // 🔄 Könyv kártyák frissítése
    document.querySelectorAll(".card.done").forEach(card => {
        card.classList.remove("done");
    });

    // 🔄 Fejezet nézet frissítése (ha nyitva van)
    if (!chaptersSection.classList.contains("hidden")) {
        document.querySelectorAll(".chapter.done").forEach(ch => {
            ch.classList.remove("done");
        });
    }
});

/* ======================================= */
/* Fejezetekhez tartozó kis kukák müködése */
/* ======================================= */

function openBook(book) {
    lastScrollTop = window.scrollY;

    booksEl.classList.add("hidden");
    chaptersSection.classList.remove("hidden");
    bookTitle.textContent = book.full;

    chapterGrid.innerHTML = "";

    const readChapters = getStoredChapters();
    const readSet = readChapters[book.short] || [];

    // Fejezet kártyák létrehozása
    for (let i = 1; i <= book.chapters; i++) {
        const chapterCard = document.createElement("div");
        chapterCard.className = "card chapter";
        chapterCard.textContent = `${i}`;

        if (readSet.includes(i)) chapterCard.classList.add("done");

        chapterCard.addEventListener("click", () => {
            chapterCard.classList.toggle("done");
            storeChapter(book.short, i, chapterCard.classList.contains("done"));
            updateBookStatus(book);
        });

        chapterGrid.appendChild(chapterCard);
    }

    updateBookStatus(book);

    // 🔹 Kuka ikon a fejezet nézet tetején
    addTrashToChapterView(book);
}

function addTrashToChapterView(book) {
    const header = document.getElementById("chapterHeader");

    // Ha már van kuka, töröljük
    const existing = document.getElementById("chapterTrash");
    if (existing) existing.remove();

    const trashBtn = document.createElement("div");
    trashBtn.id = "chapterTrash";
    trashBtn.style.cursor = "pointer";
    trashBtn.style.display = "flex";
    trashBtn.style.alignItems = "center";

    trashBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="24" height="24">
            <path fill="#ffffff"
                d="M232.7 69.9C237.1 56.8 249.3 48 263.1 48L377 48C390.8 48 403 56.8 407.4 69.9L416 96L512 96C529.7 96 544 110.3 544 128C544 145.7 529.7 160 512 160L128 160C110.3 160 96 145.7 96 128C96 110.3 110.3 96 128 96L224 96L232.7 69.9zM128 208L512 208L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 208zM216 272C202.7 272 192 282.7 192 296L192 488C192 501.3 202.7 512 216 512C229.3 512 240 501.3 240 488L240 296C240 282.7 229.3 272 216 272zM320 272C306.7 272 296 282.7 296 296L296 488C296 501.3 306.7 512 320 512C333.3 512 344 501.3 344 488L344 296C344 282.7 333.3 272 320 272zM424 272C410.7 272 400 282.7 400 296L400 488C400 501.3 410.7 512 424 512C437.3 512 448 501.3 448 488L448 296C448 282.7 437.3 272 424 272z" />
        </svg>
        <span style="margin-left:0.5rem;"></span>
    `;

    trashBtn.addEventListener("click", () => {
        const stored = getStoredChapters();
        const readSet = stored[book.short] || [];

        if (readSet.length === 0) {
            alert("Nincs kijelölt fejezet.");
            return;
        }

        const confirmed = confirm(`Biztosan törölni szeretnéd a(z) "${book.full}" könyv kijelölt fejezeteit? \n\nEz a művelet nem visszavonható.`);
        if (!confirmed) return;

        delete stored[book.short];
        localStorage.setItem("readChapters", JSON.stringify(stored));

        // Fejezet kártyák frissítése
        document.querySelectorAll(".chapter.done").forEach(ch => ch.classList.remove("done"));

        // Könyv státusz frissítése
        updateBookStatus(book);
    });

    header.appendChild(trashBtn);
}
