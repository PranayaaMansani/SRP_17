// Select elements
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const progressBarFill = document.getElementById("progress-bar-fill");
const progressPercentage = document.getElementById("progress-percentage");
const searchBox = document.getElementById("search-box");

let totalTasks = 0;
let completedTasks = 0;

// Function to update the progress tracker
function updateProgress() {
    if (totalTasks === 0) {
        progressBarFill.style.width = "0%";
        progressPercentage.textContent = "0%";
    } else {
        const progress = (completedTasks / totalTasks) * 100;
        progressBarFill.style.width = progress + "%";
        progressPercentage.textContent = Math.round(progress) + "%";
    }
}

// Function to add a task
function addTask(event) {
    event.preventDefault();

    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        // Create a delete button inside the task
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        // Append the task to the list container
        listContainer.appendChild(li);

        // Increment the task count
        totalTasks++;
        updateProgress();
        saveTasksToLocalStorage();
    }

    inputBox.value = '';
}

// Event listener to mark tasks as completed or delete them
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        // Toggle completion of the task
        e.target.classList.toggle("checked");

        // Update completed tasks count
        if (e.target.classList.contains("checked")) {
            completedTasks++;
        } else {
            completedTasks--;
        }

        // Update progress
        updateProgress();
        saveTasksToLocalStorage();
    } else if (e.target.tagName === "SPAN") {
        // Task deleted
        const task = e.target.parentElement;

        // Decrement completed tasks if the task is marked as completed
        if (task.classList.contains("checked")) {
            completedTasks--;
        }

        // Remove the task from the list
        task.remove();
        totalTasks--;

        // Update progress
        updateProgress();
        saveTasksToLocalStorage();
    }
}, false);

// When the user clicks "Add" button
document.querySelector(".add").addEventListener("click", function(e) {
    addTask(e);
});

// When the user presses the Enter key
inputBox.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask(e);
    }
});

// Function to save tasks to localStorage
function saveTasksToLocalStorage() {
    const tasks = [];
    const taskElements = document.querySelectorAll('ul li');

    taskElements.forEach(task => {
        tasks.push({
            text: task.textContent.replace("\u00d7", "").trim(),
            checked: task.classList.contains("checked")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasksFromLocalStorage() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (storedTasks) {
        storedTasks.forEach(task => {
            let li = document.createElement("li");
            li.innerHTML = task.text;

            if (task.checked) {
                li.classList.add("checked");
                completedTasks++;
            }

            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);

            listContainer.appendChild(li);
            totalTasks++;
        });
        updateProgress();
    }
}

// Function to search tasks
function searchTasks() {
    const query = searchBox.value.toLowerCase();
    const tasks = listContainer.getElementsByTagName("li");

    Array.from(tasks).forEach(task => {
        const taskText = task.textContent.toLowerCase();
        if (taskText.includes(query)) {
            task.style.display = "block";  // Show task
        } else {
            task.style.display = "none";   // Hide task
        }
    });
}

// Add event listener for the search input field
searchBox.addEventListener("input", searchTasks);

// Initial progress update and load tasks from localStorage
loadTasksFromLocalStorage();
updateProgress();
