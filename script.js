const localStorageKey = 'to-do-list-gn';
const completedKey = 'completed-list-gn';

function validateIfExistsNewTask() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let inputValue = document.getElementById('input-new-task').value;
    let exists = values.find(x => x.name == inputValue);
    return !exists ? false : true;
}

function newTask() {
    let input = document.getElementById('input-new-task');
    input.style.border = '';

    // validation
    if (!input.value) {
        input.style.border = '1px solid red';
        alert('Digite algo para inserir em sua lista');
    } else if (validateIfExistsNewTask()) {
        alert('Já existe uma task com essa descrição');
    } else {
        // increment to localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        values.push({
            name: input.value
        });
        localStorage.setItem(localStorageKey, JSON.stringify(values));
        showValues();
    }
    input.value = '';
}

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let completedValues = JSON.parse(localStorage.getItem(completedKey) || "[]");
    let list = document.getElementById('to-do-list');
    let completedList = document.getElementById('completed-list');
    list.innerHTML = '';
    completedList.innerHTML = '';

    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i]['name']}<button onclick='completeTask("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg></button></li>`;
    }

    for (let i = 0; i < completedValues.length; i++) {
        completedList.innerHTML += `<li>${completedValues[i]['name']}</li>`;
    }
}

function completeTask(taskName) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let completedValues = JSON.parse(localStorage.getItem(completedKey) || "[]");
    let index = values.findIndex(x => x.name == taskName);
    if (index > -1) {
        let completedTask = values.splice(index, 1)[0];
        completedValues.push(completedTask);
        localStorage.setItem(localStorageKey, JSON.stringify(values));
        localStorage.setItem(completedKey, JSON.stringify(completedValues));
        showValues();
    }
}

function showClearConfirm() {
    document.getElementById('confirm-container').style.display = 'flex';
}

function hideClearConfirm() {
    document.getElementById('confirm-container').style.display = 'none';
}

function clearCompletedTasks() {
    localStorage.removeItem(completedKey);
    hideClearConfirm();
    showValues();
}

showValues();
