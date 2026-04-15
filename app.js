// ─── STATE ────────────────────────────────────────────
let tasks = JSON.parse(localStorage.getItem('do-it-tasks') || '[]');
let filter = 'all';

// ─── SAVE ─────────────────────────────────────────────
function save() {
  localStorage.setItem('do-it-tasks', JSON.stringify(tasks));
}

// ─── ADD TASK ─────────────────────────────────────────
function addTask(text) {
  text = text.trim();
  if (!text) return;

  // detect priority via suffix: !high !med !low
  let priority = null;
  const prioMatch = text.match(/\s+!(high|med|low)$/i);
  if (prioMatch) {
    priority = prioMatch[1].toLowerCase();
    text = text.slice(0, -prioMatch[0].length).trim();
  }

  tasks.unshift({
    id: Date.now(),
    text,
    done: false,
    priority,
    createdAt: new Date().toISOString()
  });

  save();
  render();
}

// ─── TOGGLE DONE ──────────────────────────────────────
function toggleDone(id) {
  const task = tasks.find(t => t.id === id);
  if (task) { task.done = !task.done; save(); render(); }
}

// ─── DELETE ───────────────────────────────────────────
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  save();
  render();
}

// ─── CLEAR DONE ───────────────────────────────────────
function clearDone() {
  tasks = tasks.filter(t => !t.done);
  save();
  render();
}

// ─── FILTER ───────────────────────────────────────────
function setFilter(f) {
  filter = f;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === f);
  });
  render();
}

// ─── RENDER ───────────────────────────────────────────
function render() {
  const list = document.getElementById('task-list');
  const empty = document.getElementById('empty-state');
  const footer = document.getElementById('footer');
  const doneCount = document.getElementById('done-count');
  const totalCount = document.getElementById('total-count');
  const progressFill = document.getElementById('progress-fill');

  // Stats
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  doneCount.textContent = `${done} done`;
  totalCount.textContent = `${total} total`;

  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  progressFill.style.width = pct + '%';

  // Filter
  const visible = tasks.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'done')   return t.done;
    return true;
  });

  list.innerHTML = '';

  if (visible.length === 0) {
    empty.classList.add('visible');
  } else {
    empty.classList.remove('visible');
    visible.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task-item' + (task.done ? ' done' : '');
      li.dataset.id = task.id;

      // Checkbox
      const check = document.createElement('button');
      check.className = 'task-check' + (task.done ? ' checked' : '');
      check.setAttribute('aria-label', task.done ? 'Mark undone' : 'Mark done');
      check.addEventListener('click', () => toggleDone(task.id));

      // Text
      const span = document.createElement('span');
      span.className = 'task-text';
      span.textContent = task.text;

      // Priority tag
      let tagEl = null;
      if (task.priority) {
        tagEl = document.createElement('span');
        const map = { high: ['HIGH', 'tag-high'], med: ['MED', 'tag-medium'], low: ['LOW', 'tag-low'] };
        const [label, cls] = map[task.priority] || ['?', ''];
        tagEl.className = `task-tag ${cls}`;
        tagEl.textContent = label;
      }

      // Delete
      const del = document.createElement('button');
      del.className = 'task-delete';
      del.setAttribute('aria-label', 'Delete task');
      del.innerHTML = '×';
      del.addEventListener('click', () => deleteTask(task.id));

      li.appendChild(check);
      li.appendChild(span);
      if (tagEl) li.appendChild(tagEl);
      li.appendChild(del);
      list.appendChild(li);
    });
  }

  // Footer (show clear button only if there are done tasks)
  const hasDone = tasks.some(t => t.done);
  footer.style.display = hasDone ? 'flex' : 'none';
}

// ─── EVENTS ───────────────────────────────────────────
document.getElementById('add-btn').addEventListener('click', () => {
  const input = document.getElementById('task-input');
  addTask(input.value);
  input.value = '';
  input.focus();
});

document.getElementById('task-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const input = e.target;
    addTask(input.value);
    input.value = '';
  }
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => setFilter(btn.dataset.filter));
});

document.getElementById('clear-done').addEventListener('click', clearDone);

// ─── INIT ─────────────────────────────────────────────
render();