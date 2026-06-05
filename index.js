/* ============================================================
   CONFIGURATION
============================================================ */

if (typeof REPO_OWNER === "undefined") {
  window.REPO_OWNER = "chaitanya-suddamalla";
  window.REPO_NAME = "50_days_50_web_projects";
}

window.REPO_OWNER = window.REPO_OWNER || "chaitanya-suddamalla";
window.REPO_NAME = window.REPO_NAME || "50_days_50_web_projects";

let currentPage = 1;
let itemsPerPage = 9;
let techStackFilters = [];
let techSearchQuery = "";
let currentFilter = "all";
let currentSort = "default";
let searchQuery = "";

const TECH_ALIASES = {
  react: "react",
  angular: "angular",
  vue: "vue",
  node: "node.js",
  nodejs: "node.js",
  python: "python",
  flask: "flask",
  django: "django",
};

const FILTER_CATEGORY_MAP = {
  all: "all",
  game: "game",
  clone: "clone",
  tool: "tool",
  ui: "ui",
  api: "api",
};

function getCategoryFromTags(tags, name = "") {
  const text = `${tags} ${name}`.toLowerCase();

  if (text.includes("game")) return "game";
  if (text.includes("clone")) return "clone";
  if (text.includes("api")) return "api";
  if (text.includes("ui") || text.includes("animation")) return "ui";
  if (text.includes("tool") || text.includes("calculator")) return "tool";

  return "tool";
}

/* ============================================================
   PROJECT DATA
============================================================ */

const PROJECT_DATA = [
  ["Day 1", "To-Do List", "#", "todo javascript", "beginner"],
  ["Day 2", "AI Image Classifier", "#", "api javascript", "intermediate"],
  ["Day 3", "Astronomy Dashboard", "#", "api javascript", "intermediate"],
  ["Day 4", "Weather Forecasting", "#", "api javascript", "intermediate"],
  ["Day 5", "Placement Predictor", "#", "machine-learning", "advanced"],
  ["Day 6", "Random Joke Generator", "#", "api javascript", "beginner"],
  ["Day 7", "Stock Profit Calculator", "#", "tool javascript", "beginner"],
  ["Day 8", "Amazon Clone", "#", "clone javascript", "intermediate"],
  ["Day 9", "Blog Page", "#", "css html", "beginner"],
  ["Day 10", "Discord Project", "#", "api javascript", "intermediate"],
  ["Day 11", "Spotify Clone", "#", "clone javascript", "intermediate"],
  ["Day 12", "E-Commerce Cart", "#", "javascript", "intermediate"],
  ["Day 13", "Website Personalizer", "#", "tool javascript", "intermediate"],
  ["Day 14", "Material3 Showcase", "#", "ui css", "beginner"],
  [
    "Day 15",
    "Privacy Policy Generator",
    "#",
    "tool javascript",
    "intermediate",
  ],
  ["Day 16", "Analog Clock", "#", "javascript css", "beginner"],
  ["Day 17", "3D Cards", "#", "ui css", "intermediate"],
  ["Day 18", "Animated Searchbar", "#", "ui javascript", "beginner"],
  ["Day 19", "Animated Cursor", "#", "ui javascript", "beginner"],
  ["Day 20", "Color Palette Generator", "#", "ui css", "beginner"],
  ["Day 21", "Color Palette Art Generator", "#", "ui css", "intermediate"],
  ["Day 22", "Carousel Solar System", "#", "canvas css", "intermediate"],
  ["Day 23", "Holo Button", "#", "ui css", "beginner"],
  ["Day 24", "Slider Box", "#", "ui javascript", "beginner"],
  ["Day 25", "Typewriter", "#", "ui javascript", "beginner"],
  ["Day 26", "Virtual Piano", "#", "audio javascript", "intermediate"],
  ["Day 27", "DSA Visualizer", "#", "visualizer javascript", "advanced"],
  [
    "Day 28",
    "Physics Ball Simulation",
    "#",
    "canvas javascript",
    "intermediate",
  ],
  ["Day 29", "Pokedex", "#", "api javascript", "intermediate"],
  ["Day 30", "Coin Scratch", "#", "game javascript", "intermediate"],
  ["Day 31", "Dice Roller", "#", "game javascript", "beginner"],
  ["Day 32", "Dining Philosophers", "#", "simulation javascript", "advanced"],
  ["Day 33", "Hurdle Highway", "#", "game javascript", "intermediate"],
  ["Day 34", "Stone Paper Scissor", "#", "game javascript", "beginner"],
  ["Day 35", "Retro Highway Racer", "#", "game javascript", "intermediate"],
  ["Day 36", "Zen Timer", "#", "productivity javascript", "beginner"],
  ["Day 37", "Pomodoro Timer", "#", "productivity javascript", "beginner"],
  ["Day 38", "Focus Room", "#", "productivity javascript", "intermediate"],
  ["Day 39", "EchoNotes", "#", "todo javascript", "intermediate"],
  ["Day 40", "Habit Tracker", "#", "todo javascript", "intermediate"],
  ["Day 41", "Interview Simulator", "#", "tool javascript", "intermediate"],
  ["Day 42", "BMI Calculator", "#", "tool javascript", "beginner"],
  ["Day 43", "Morse Code Translator", "#", "tool javascript", "beginner"],
  ["Day 44", "GitHub Promo Maker", "#", "tool javascript", "intermediate"],
  ["Day 45", "GitHub Profile Battle", "#", "game javascript", "intermediate"],
  ["Day 46", "Self Improvement", "#", "tool javascript", "intermediate"],
  ["Day 47", "Contest Tracker", "#", "tool javascript", "intermediate"],
  ["Day 48", "Music App", "#", "api javascript", "intermediate"],
  ["Day 49", "2048 Game", "#", "game javascript", "intermediate"],
  ["Day 50", "Image Search Engine", "#", "api javascript", "intermediate"],
];

const PROJECTS = PROJECT_DATA;

/* ============================================================
   UTILITY FUNCTIONS
============================================================ */

function getSourceUrl(url) {
  if (url === "#") {
    return `https://github.com/${window.REPO_OWNER}/${window.REPO_NAME}`;
  }
  return url;
}

function getProjectDirectoryPath(projectName) {
  // Map friendly project names to actual folder names in the repository
  const PROJECT_DIR_MAP = {
    "To-Do List": "01-To-Do-List",
    "AI Image Classifier": "02-AI Image Classifier",
    "Astronomy Dashboard": "03-AstronomyDashboard",
    "Weather Forecasting": "04-Weather Forcasting",
    "Placement Predictor": "05-Placement-Predictor",
    "Random Joke Generator": "06-RandomJokeGenerator",
    "Stock Profit Calculator": "07-Stock-Profit-Calculator",
    "Amazon Clone": "08-New-AmazonClone",
    "Blog Page": "09-Blog Page",
    "Discord Project": "10-Discord project",
    "Spotify Clone": "11-spotify-clone -project",
    "E-Commerce Cart": "12-e-commerce_cart",
    "Website Personalizer": "13-WebsitePersonalizer",
    "Material3 Showcase": "14-Material3Showcase",
    "Privacy Policy Generator": "15-AppPrivacyPolicyGenerator",
    "Analog Clock": "16-AnalogClock",
    "3D Cards": "17-3d cards",
    "Animated Searchbar": "18-Animated Searchbar",
    "Animated Cursor": "19-Animated-cursor",
    "Color Palette Generator": "20-color-palette-generator",
    "Color Palette Art Generator": "21-ColorPaletteArtGenerator",
    "Carousel Solar System": "22-Carousel Solar System",
    "Holo Button": "23-Holo Button",
    "Slider Box": "24-slider box",
    Typewriter: "25-typewriter",
    "Virtual Piano": "26-Virtual_Piano",
    "DSA Visualizer": "27-Data Structures Visualizer",
    "Physics Ball Simulation": "28-PhysicsBallSimulation",
    Pokedex: "29-Pokedex",
    "Coin Scratch": "30-Coin Scratch",
    "Dice Roller": "31-Dice-Roller",
    "Dining Philosophers": "32-Dining Philosophers Simulation",
    "Hurdle Highway": "33-Hurdle_Highway_2D",
    "Stone Paper Scissor": "34-Stone-Paper-Scissor",
    "Retro Highway Racer": "35-RetroHighwayRacer",
    "Zen Timer": "36-ZEN_TIMER",
    "Pomodoro Timer": "37-Pomodoro_Timer",
    "Focus Room": "38-FocusRoom",
    EchoNotes: "39-EchoNotes",
    "Habit Tracker": "40-Habit-Tracker-Web-App",
    "Interview Simulator": "41-InterviewSimulator",
    "BMI Calculator": "42-BMI_Calculator",
    "Morse Code Translator": "43-MorseCodeTranslator",
    "GitHub Promo Maker": "44-GitHubPromoMaker",
    "GitHub Profile Battle": "45-Github-Profile-Battle",
    "Self Improvement": "46-Self-Improvement",
    "Contest Tracker": "47-ContestTracker",
    "Music App": "48-Music App",
    "2048 Game": "49-2048_game",
    "Image Search Engine": "50-Image Search Engine",
  };

  const folder = PROJECT_DIR_MAP[projectName] || projectName;
  // Encode spaces and special characters for URLs
  return `50-Days-50-Web-Projects/${encodeURIComponent(folder)}/`;
}

/* ============================================================
   LOCALSTORAGE MANAGEMENT
============================================================ */

function saveBookmarks(bookmarks) {
  localStorage.setItem("bookmarkedProjects", JSON.stringify(bookmarks));
}

function getBookmarks() {
  const stored = localStorage.getItem("bookmarkedProjects");
  return stored ? JSON.parse(stored) : [];
}

function toggleBookmark(projectName) {
  const bookmarks = getBookmarks();
  const index = bookmarks.indexOf(projectName);

  if (index > -1) {
    bookmarks.splice(index, 1);
  } else {
    bookmarks.push(projectName);
  }

  saveBookmarks(bookmarks);
  return index === -1;
}

function isBookmarked(projectName) {
  return getBookmarks().includes(projectName);
}

function saveRecentProject(projectName) {
  const recent = JSON.parse(localStorage.getItem("recentProjects")) || [];
  const filtered = recent.filter((p) => p !== projectName);
  filtered.unshift(projectName);
  localStorage.setItem("recentProjects", JSON.stringify(filtered.slice(0, 6)));
}

function getRecentProjects() {
  return JSON.parse(localStorage.getItem("recentProjects")) || [];
}

/* ============================================================
   PROJECT FILTERING & SORTING
============================================================ */

function filterProjects(projects) {
  let filtered = [...projects];

  // Apply category filter
  if (currentFilter !== "all") {
    filtered = filtered.filter(
      ([, , , tags, name]) => getCategoryFromTags(tags, name) === currentFilter,
    );
  }

  // Apply search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      ([, name, , tags]) =>
        name.toLowerCase().includes(query) ||
        tags.toLowerCase().includes(query),
    );
  }

  // Apply tech stack filters
  if (techStackFilters.length > 0) {
    filtered = filtered.filter(([, , , tags]) => {
      const tagList = tags.toLowerCase().split(" ");
      return techStackFilters.some((tech) =>
        tagList.some(
          (tag) =>
            tag === tech.toLowerCase() ||
            tag === TECH_ALIASES[tech.toLowerCase()],
        ),
      );
    });
  }

  return filtered;
}

function sortProjects(projects) {
  const sorted = [...projects];

  if (currentSort === "az") {
    sorted.sort((a, b) => a[1].localeCompare(b[1]));
  } else if (currentSort === "latest") {
    sorted.reverse();
  } else if (currentSort === "difficulty") {
    const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };
    sorted.sort(
      (a, b) => (difficultyOrder[a[4]] || 0) - (difficultyOrder[b[4]] || 0),
    );
  }

  return sorted;
}

/* ============================================================
   RENDER FUNCTIONS
============================================================ */

function renderGrid(projects = PROJECTS) {
  const grid = document.getElementById("projectGrid");
  const noResults = document.getElementById("noResults");

  if (!grid) return;

  let filtered = filterProjects(projects);
  let sorted = sortProjects(filtered);

  // Update stats
  updateStats(sorted.length);

  if (sorted.length === 0) {
    grid.innerHTML = "";
    if (noResults) {
      noResults.style.display = "flex";
    }
    return;
  }

  if (noResults) {
    noResults.style.display = "none";
  }

  grid.innerHTML = "";

  sorted.forEach(([day, name, url, tags]) => {
    const category = getCategoryFromTags(tags, name);
    const bookmarked = isBookmarked(name);

    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
      <div class="card-meta">
        <span class="card-day">${day}</span>
        <span class="card-category">${category}</span>
        <button class="card-bookmark-btn ${bookmarked ? "bookmarked" : ""}" 
                data-project="${name}"
                title="${bookmarked ? "Remove bookmark" : "Add bookmark"}">
          <i class="fas fa-bookmark"></i>
        </button>
      </div>

      <div class="card-name">${name}</div>

      <div class="card-tags">
        ${tags
          .split(" ")
          .map((tag) => `<span class="tag">${tag}</span>`)
          .join("")}
      </div>

      <div class="card-footer">
        <div class="card-actions-left">
          <a
            href="${url === "#" ? getProjectDirectoryPath(name) : url}"
            class="card-link"
            target="_blank"
          >
            Live Demo
          </a>

          <a
            href="https://github.com/${window.REPO_OWNER}/${window.REPO_NAME}/tree/main/${getProjectDirectoryPath(name)}"
            target="_blank"
            class="card-link"
          >
            <i class="fab fa-github"></i> Code
          </a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  attachCardListeners();
}

function renderRecentProjects() {
  const grid = document.getElementById("recentGrid");
  if (!grid) return;

  const recent = getRecentProjects();
  const recentProjects = PROJECTS.filter(([, name]) => recent.includes(name));

  grid.innerHTML = "";

  if (recentProjects.length === 0) {
    grid.innerHTML = '<p class="no-recent">No recently viewed projects yet</p>';
    return;
  }

  recentProjects.slice(0, 6).forEach(([day, name, url, tags]) => {
    const category = getCategoryFromTags(tags, name);
    const bookmarked = isBookmarked(name);

    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
      <div class="card-meta">
        <span class="card-day">${day}</span>
        <span class="card-category">${category}</span>
        <button class="card-bookmark-btn ${bookmarked ? "bookmarked" : ""}" 
                data-project="${name}"
                title="${bookmarked ? "Remove bookmark" : "Add bookmark"}">
          <i class="fas fa-bookmark"></i>
        </button>
      </div>

      <div class="card-name">${name}</div>

      <div class="card-tags">
        ${tags
          .split(" ")
          .map((tag) => `<span class="tag">${tag}</span>`)
          .join("")}
      </div>

      <div class="card-footer">
        <div class="card-actions-left">
          <a
            href="${url === "#" ? getProjectDirectoryPath(name) : url}"
            class="card-link"
            target="_blank"
          >
            Live Demo
          </a>

          <a
            href="https://github.com/${window.REPO_OWNER}/${window.REPO_NAME}/tree/main/${getProjectDirectoryPath(name)}"
            target="_blank"
            class="card-link"
          >
            <i class="fab fa-github"></i> Code
          </a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  attachCardListeners();
}

function renderBookmarkedProjects() {
  const grid = document.getElementById("bookmarkGrid");
  if (!grid) return;

  const bookmarks = getBookmarks();
  const bookmarkedProjects = PROJECTS.filter(([, name]) =>
    bookmarks.includes(name),
  );

  grid.innerHTML = "";

  if (bookmarkedProjects.length === 0) {
    grid.innerHTML =
      '<p class="no-bookmarks">No bookmarked projects yet. Bookmark projects to save them here.</p>';
    return;
  }

  bookmarkedProjects.forEach(([day, name, url, tags]) => {
    const category = getCategoryFromTags(tags, name);

    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
      <div class="card-meta">
        <span class="card-day">${day}</span>
        <span class="card-category">${category}</span>
        <button class="card-bookmark-btn bookmarked" 
                data-project="${name}"
                title="Remove bookmark">
          <i class="fas fa-bookmark"></i>
        </button>
      </div>

      <div class="card-name">${name}</div>

      <div class="card-tags">
        ${tags
          .split(" ")
          .map((tag) => `<span class="tag">${tag}</span>`)
          .join("")}
      </div>

      <div class="card-footer">
        <div class="card-actions-left">
          <a
            href="${url === "#" ? getProjectDirectoryPath(name) : url}"
            class="card-link"
            target="_blank"
          >
            Live Demo
          </a>

          <a
            href="https://github.com/${window.REPO_OWNER}/${window.REPO_NAME}/tree/main/${getProjectDirectoryPath(name)}"
            target="_blank"
            class="card-link"
          >
            <i class="fab fa-github"></i> Code
          </a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  attachCardListeners();
}

function updateStats(count) {
  const allCount = document.getElementById("allCount");
  if (allCount) {
    allCount.textContent = count > 0 ? count : "Projects";
  }
}

function attachCardListeners() {
  document.querySelectorAll(".card-bookmark-btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const projectName = this.dataset.project;
      const isNowBookmarked = toggleBookmark(projectName);

      if (isNowBookmarked) {
        this.classList.add("bookmarked");
        this.title = "Remove bookmark";
        showToast(`✓ Bookmarked: ${projectName}`);
      } else {
        this.classList.remove("bookmarked");
        this.title = "Add bookmark";
        showToast(`✗ Removed: ${projectName}`);
      }

      renderBookmarkedProjects();
    });
  });
}

/* ============================================================
   EVENT LISTENERS
============================================================ */

function initializeEventListeners() {
  // Search
  const searchInput = document.getElementById("searchInput");
  const clearSearch = document.getElementById("clearSearch");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      clearSearch.style.display = searchQuery ? "block" : "none";
      renderGrid();
    });
  }

  if (clearSearch) {
    clearSearch.addEventListener("click", () => {
      searchQuery = "";
      if (searchInput) searchInput.value = "";
      clearSearch.style.display = "none";
      renderGrid();
    });
  }

  // Filter chips
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", function () {
      document
        .querySelectorAll(".chip")
        .forEach((c) => c.classList.remove("active"));
      this.classList.add("active");
      currentFilter = this.dataset.filter || "all";
      renderGrid();
    });
  });

  // Sort dropdown
  const sortProjects = document.getElementById("sortProjects");
  if (sortProjects) {
    sortProjects.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderGrid();
    });
  }

  // Tech stack search
  const techStackSearch = document.getElementById("techStackSearch");
  const clearTechFilter = document.getElementById("clearTechFilter");

  if (techStackSearch) {
    techStackSearch.addEventListener("input", (e) => {
      techSearchQuery = e.target.value;
      updateTechFilters();
      renderGrid();
    });
  }

  if (clearTechFilter) {
    clearTechFilter.addEventListener("click", () => {
      techStackFilters = [];
      techSearchQuery = "";
      if (techStackSearch) techStackSearch.value = "";
      clearTechFilter.style.display = "none";
      document.getElementById("activeTechFilters").style.display = "none";
      renderGrid();
    });
  }

  // Mobile menu toggle
  const menuToggle = document.getElementById("menuToggle");
  const navButtons = document.getElementById("navButtons");

  if (menuToggle && navButtons) {
    menuToggle.addEventListener("click", () => {
      navButtons.classList.toggle("active");
      menuToggle.setAttribute(
        "aria-expanded",
        menuToggle.getAttribute("aria-expanded") === "false" ? "true" : "false",
      );
    });
  }

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      localStorage.setItem(
        "theme",
        document.body.classList.contains("light-mode") ? "light" : "dark",
      );
    });
  }

  // Scroll to top button
  const scrollBtn = document.getElementById("scrollBtn");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.add("visible");
      } else {
        scrollBtn.classList.remove("visible");
      }

      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / height) * 100;
      const ringFill = document.getElementById("ringFill");
      if (ringFill) {
        ringFill.style.strokeDashoffset = 138.16 - (scrolled / 100) * 138.16;
      }
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Browse projects button
  const heroBrowseBtn = document.getElementById("heroBrowseBtn");
  if (heroBrowseBtn) {
    heroBrowseBtn.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .getElementById("projects")
        .scrollIntoView({ behavior: "smooth" });
    });
  }

  // Bookmark/Recent toggles
  const recentToggle = document.getElementById("recentToggleBtn");
  const bookmarkToggle = document.getElementById("bookmarkToggleBtn");
  const recentGrid = document.getElementById("recentGrid");
  const bookmarkGrid = document.getElementById("bookmarkGrid");

  if (recentToggle && recentGrid) {
    recentToggle.addEventListener("click", () => {
      const isVisible = recentGrid.style.display !== "none";
      recentGrid.style.display = isVisible ? "none" : "grid";
      recentToggle.textContent = isVisible ? "View All" : "Hide";
    });
  }

  if (bookmarkToggle && bookmarkGrid) {
    bookmarkToggle.addEventListener("click", () => {
      const isVisible = bookmarkGrid.style.display !== "none";
      bookmarkGrid.style.display = isVisible ? "none" : "grid";
      bookmarkToggle.textContent = isVisible ? "View All" : "Hide";
    });
  }

  // Copy bookmarks button
  const copyBookmarksBtn = document.getElementById("copyBookmarksBtn");
  if (copyBookmarksBtn) {
    copyBookmarksBtn.addEventListener("click", () => {
      const bookmarks = getBookmarks();
      const text = bookmarks.join("\n");
      navigator.clipboard.writeText(text).then(() => {
        showToast("✓ Bookmarks copied to clipboard!");
      });
    });
  }
}

function updateTechFilters() {
  const filterTags = document.getElementById("techFilterTags");
  const activeTechFilters = document.getElementById("activeTechFilters");
  const clearTechFilter = document.getElementById("clearTechFilter");

  if (!filterTags || !activeTechFilters) return;

  if (techSearchQuery) {
    const techs = techSearchQuery
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t);

    techStackFilters = techs;

    filterTags.innerHTML = techs
      .map(
        (tech) =>
          `<span class="tech-tag">${tech}<button data-tech="${tech}">×</button></span>`,
      )
      .join("");

    activeTechFilters.style.display = techs.length > 0 ? "flex" : "none";
    clearTechFilter.style.display = techs.length > 0 ? "block" : "none";

    filterTags.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const tech = btn.dataset.tech;
        techStackFilters = techStackFilters.filter((t) => t !== tech);
        techSearchQuery = techStackFilters.join(", ");
        const input = document.getElementById("techStackSearch");
        if (input) input.value = techSearchQuery;
        updateTechFilters();
        renderGrid();
      });
    });
  } else {
    techStackFilters = [];
    activeTechFilters.style.display = "none";
    clearTechFilter.style.display = "none";
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

/* ============================================================
   GITHUB STATS
============================================================ */

function loadGitHubStats() {
  const projectCount = document.getElementById("projectCount");
  const starCount = document.getElementById("starCount");
  const forkCount = document.getElementById("forkCount");
  const issueCount = document.getElementById("issueCount");
  const prCount = document.getElementById("prCount");

  if (!projectCount) return;

  // Set project count
  projectCount.textContent = PROJECTS.length;

  // Fetch GitHub stats
  fetch(`https://api.github.com/repos/${window.REPO_OWNER}/${window.REPO_NAME}`)
    .then((res) => res.json())
    .then((data) => {
      if (starCount) starCount.textContent = data.stargazers_count || 0;
      if (forkCount) forkCount.textContent = data.forks_count || 0;
      if (issueCount) issueCount.textContent = data.open_issues_count || 0;
    })
    .catch(() => {
      // If API fails, just use default values
      if (starCount) starCount.textContent = "—";
      if (forkCount) forkCount.textContent = "—";
      if (issueCount) issueCount.textContent = "—";
    });

  // Fetch PR count separately
  fetch(
    `https://api.github.com/repos/${window.REPO_OWNER}/${window.REPO_NAME}/pulls?state=open&per_page=1`,
  )
    .then((res) => {
      if (prCount) prCount.textContent = res.headers.get("X-Total-Count") || 0;
    })
    .catch(() => {
      if (prCount) prCount.textContent = "—";
    });
}

/* ============================================================
   INITIALIZATION
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  // Set theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }

  // Initialize year
  const currentYear = document.getElementById("Current-Year");
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Load GitHub stats
  loadGitHubStats();

  // Initial renders
  renderGrid();
  renderRecentProjects();
  renderBookmarkedProjects();

  // Initialize event listeners
  initializeEventListeners();
});
