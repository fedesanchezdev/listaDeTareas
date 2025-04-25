const input = document.querySelector(".tarea");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector(".paraHacer");
const empty = document.querySelector(".empty");
const paraHacer = document.querySelector(".paraHacer");
const enProgreso = document.querySelector(".enProgreso");
const finalizadas = document.querySelector(".finalizadas");

// Cargar tareas al iniciar
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});

// Función para guardar todas las tareas
function saveTasks() {
  const tasks = {
    paraHacer: getTasksFromList(paraHacer),
    enProgreso: getTasksFromList(enProgreso),
    finalizadas: getTasksFromList(finalizadas)
  };
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Obtener tareas de una lista
function getTasksFromList(list) {
  return Array.from(list.children)
    .filter(li => !li.classList.contains('titulo')) // Ignorar títulos
    .map(li => ({
      text: li.querySelector('.text')?.textContent || '',
      status: list.className // "paraHacer", "enProgreso", etc.
    }));
}

// Cargar tareas desde localStorage
function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (savedTasks) {
    populateList(paraHacer, savedTasks.paraHacer);
    populateList(enProgreso, savedTasks.enProgreso);
    populateList(finalizadas, savedTasks.finalizadas);
  }
}

// Llenar una lista con tareas
function populateList(list, tasks) {
  list.innerHTML = '';
  tasks.forEach(task => {
    if (task.text) {
      const li = createTaskElement(task.text);
      list.appendChild(li);
    }
  });
}

// Crear elemento de tarea (reutilizable)
function createTaskElement(text) {
  const li = document.createElement('li');
  const i = document.createElement('i');
  const p = document.createElement('p');
  const deleteBtn = addDeleteBtn();

  li.className = "item";
  i.className = "fas fa-bars";
  p.className = "text";
  p.textContent = text;

  li.appendChild(i);
  li.appendChild(p);
  li.appendChild(deleteBtn);

  return li;
}

// Función para botón eliminar (mejorada)
function addDeleteBtn() {
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.className = "btn-delete";

  deleteBtn.addEventListener("click", (e) => {
    const item = e.target.parentElement;
    item.remove();
    saveTasks(); // Guardar cambios al eliminar
  });

  return deleteBtn;
}

// Añadir nueva tarea
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const text = input.value.trim();

  if (text) {
    const li = createTaskElement(text);
    paraHacer.appendChild(li);
    input.value = "";
    saveTasks(); // Guardar cambios al añadir
  }
});

// Configuración de Sortable.js (actualizada)
const sortableOptions = {
  group: {
    name: "lista-tareas",
    put: true
  },
  animation: 350,
  handle: ".fas",
  filter: ".titulo",
  onEnd: () => saveTasks() // Guardar al mover elementos
};

new Sortable(paraHacer, sortableOptions);
new Sortable(enProgreso, sortableOptions);
new Sortable(finalizadas, sortableOptions);