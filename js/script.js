const input = document.querySelector(".tarea");
const addBtn = document.querySelector(".btn-add");
const ul = document.querySelector(".paraHacer");
const empty = document.querySelector(".empty");

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const text = input.value;

    if (text !== "") {
        const li = document.createElement("li");
        const i = document.createElement("i");
        const p = document.createElement("p");

        p.textContent = text;

        ul.appendChild(li);
        li.className = "item";
        li.appendChild(i);
        i.className="fas fa-bars";
        li.appendChild(p);
        p.className = "text";
        li.appendChild(addDeleteBtn());
              
    
    input.value = "";
    }
});

function addDeleteBtn() {
    const deleteBtn = document.createElement("button");
  
    deleteBtn.textContent = "X";
    deleteBtn.className = "btn-delete";
  
    deleteBtn.addEventListener("click", (e) => {
      const item = e.target.parentElement;
  
      ul.removeChild(item);
  
    });
  return deleteBtn;
};

const paraHacer = document.querySelector(".paraHacer");
const enProgreso = document.querySelector(".enProgreso");
const finalizadas = document.querySelector(".finalizadas");

Sortable.create(paraHacer, {
  group: {
    name: "lista-tareas"
  },
  animation: 350,
  handle: ".fas",
  filter: ".titulo",
});

Sortable.create(enProgreso, {
  group: {
    name: "lista-tareas"
  },
  animation: 350,
  handle: ".fas",
  filter: ".titulo",
});

Sortable.create(finalizadas, {
  group: {
    name: "lista-tareas"
  },
  animation: 350,
  handle: ".fas",
  filter: ".titulo",
});
