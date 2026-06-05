const STORAGE_KEY = 'taskflowTasks';

const taskInput = document.getElementById('task');
const taskCategory = document.getElementById('task-category');
const taskForm = document.getElementById('task-form');
const notesContainer = document.getElementById('notes-container');
const emptyState = document.getElementById('emptyState');
const documentsList = document.getElementById('documents-list');
const savePdfBtn = document.getElementById('savepdf');
const toast = document.getElementById('toast');
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
const navHome = document.getElementById('nav-home');
const navDocuments = document.getElementById('nav-documents');

let tasks = [];
let currentFilter = 'all';

function init() {
  loadTasks();
  renderTasks();

  taskForm.addEventListener('submit', event => {
    event.preventDefault();
    addTask();
  });

  savePdfBtn.addEventListener('click', saveAsPDF);
  notesContainer.addEventListener('click', handleNotesClick);
  notesContainer.addEventListener('input', handleNoteInput);
  filterButtons.forEach(button => button.addEventListener('click', () => setFilter(button.dataset.filter)));

  if (navHome) {
    navHome.addEventListener('click', () => document.getElementById('home-tab').scrollIntoView({ behavior: 'smooth' }));
  }

  if (navDocuments) {
    navDocuments.addEventListener('click', () => document.getElementById('documents-tab').scrollIntoView({ behavior: 'smooth' }));
  }
}

function loadTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    tasks = stored ? JSON.parse(stored) : [];
  } catch (error) {
    tasks = [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function addTask() {
  const text = taskInput.value.trim();
  const category = taskCategory.value || 'Miscellaneous';

  if (!text) {
    showToast('⚠️ Please enter a task description!');
    return;
  }

  tasks.unshift({
    id: Date.now(),
    text,
    category,
    completed: false,
    createdAt: new Date().toISOString(),
  });

  taskInput.value = '';
  taskCategory.value = '';

  saveTasks();
  renderTasks();
  showToast('✅ Task added successfully!');
}

function setFilter(filter) {
  currentFilter = filter;
  filterButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.filter === filter));
  renderTasks();
}

function handleNotesClick(event) {
  const taskCard = event.target.closest('.task-card');
  if (!taskCard) return;

  const taskId = Number(taskCard.dataset.id);
  if (event.target.closest('.note-check')) {
    toggleTask(taskId);
  }

  if (event.target.closest('.note-delete')) {
    deleteTask(taskId);
  }
}

function handleNoteInput(event) {
  if (!event.target.classList.contains('note-text')) return;
  const taskCard = event.target.closest('.task-card');
  if (!taskCard) return;

  const taskId = Number(taskCard.dataset.id);
  updateTaskText(taskId, event.target.value);
}

function toggleTask(id) {
  tasks = tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task));
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
  showToast('🗑️ Task removed');
}

function updateTaskText(id, newText) {
  const normalizedText = newText.trim() || 'Untitled Task';
  tasks = tasks.map(task => (task.id === id ? { ...task, text: normalizedText } : task));
  saveTasks();
}

function renderTasks() {
  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  notesContainer.innerHTML = '';

  if (filteredTasks.length === 0) {
    emptyState.style.display = 'flex';
    notesContainer.style.display = 'none';
  } else {
    emptyState.style.display = 'none';
    notesContainer.style.display = 'grid';

    filteredTasks.forEach((task, index) => {
      const card = document.createElement('li');
      card.className = `notes task-card ${task.completed ? 'completed' : ''}`;
      card.dataset.id = task.id;
      card.style.setProperty('--i', index);
      card.innerHTML = `
        <div class="note-row">
          <button type="button" class="note-check" aria-label="Toggle task completion">${task.completed ? '✓' : ''}</button>
          <input type="text" class="note-text" value="${escapeHtml(task.text)}" aria-label="Task description" />
          <button type="button" class="note-delete" aria-label="Delete task">Delete</button>
        </div>
        <div class="note-actions">
          <span class="note-type">${escapeHtml(task.category)}</span>
        </div>
      `;
      notesContainer.appendChild(card);
    });
  }

  updateMetrics();
}

function updateMetrics() {
  const total = tasks.length;
  const done = tasks.filter(task => task.completed).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');

  if (progressFill) {
    progressFill.style.width = `${percent}%`;
  }

  if (progressText) {
    progressText.textContent = `${done} / ${total} done`;
  }
}

function saveAsPDF() {
  if (tasks.length === 0) {
    showToast('❌ Cannot export empty list!');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('TaskFlow Agenda Report', 20, 24);

  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 32);
  doc.line(20, 36, 190, 36);

  let y = 46;
  doc.setFontSize(12);

  tasks.forEach((task, index) => {
    const status = task.completed ? '[DONE]' : '[PENDING]';
    const line = `${index + 1}. ${status} (${task.category}) — ${task.text}`;
    doc.text(line, 20, y);
    y += 10;
    if (y > 280) {
      doc.addPage();
      y = 20;
    }
  });

  const fileName = `TaskFlow_${Date.now()}.pdf`;
  const fileURL = URL.createObjectURL(doc.output('blob'));

  appendDocumentToList(fileName, fileURL);
  showToast('📥 Exported list to Documents Tab!');
}

function appendDocumentToList(fileName, fileURL) {
  const docEmptyState = documentsList.querySelector('.empty-state');
  if (docEmptyState) {
    docEmptyState.remove();
  }

  const item = document.createElement('div');
  item.className = 'document-item';
  item.innerHTML = `
    <span>${escapeHtml(fileName)}</span>
    <div class="doc-actions">
      <button type="button" class="doc-btn" onclick="window.open('${fileURL}', '_blank')">View</button>
      <a class="doc-btn" href="${fileURL}" download="${fileName}">Download</a>
      <button type="button" class="doc-btn del" onclick="removeDocumentItem(this)">Delete</button>
    </div>
  `;

  documentsList.appendChild(item);
}

function removeDocumentItem(button) {
  const item = button.closest('.document-item');
  if (item) {
    item.remove();
  }

  if (!documentsList.querySelector('.document-item')) {
    documentsList.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🗂️</div>
        <p class="empty-title">No documents saved yet.</p>
        <p class="empty-desc">Export your tasks to generate a list.</p>
      </div>
    `;
  }
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toast.timeoutId);
  toast.timeoutId = window.setTimeout(() => toast.classList.remove('show'), 3000);
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

window.addEventListener('DOMContentLoaded', init);
