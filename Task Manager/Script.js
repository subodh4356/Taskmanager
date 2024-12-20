import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGudE_2zbkvzcYOR5iGHhB1oDCkcPZi8s",
  authDomain: "task-manager-2f76c.firebaseapp.com",
  databaseURL: "https://task-manager-2f76c-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "task-manager-2f76c",
  storageBucket: "task-manager-2f76c.firebasestorage.app",
  messagingSenderId: "59520326215",
  appId: "1:59520326215:web:85b74d69bb364e3d5e6f62",
  measurementId: "G-YEBWKCH109"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM Elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Function to add task to Firebase
function addTaskToDatabase(taskText) {
  const tasksRef = ref(db, "tasks");
  const newTaskRef = push(tasksRef);

  set(newTaskRef, {
    id: newTaskRef.key,
    text: taskText
  }).then(() => {
    console.log("Task added successfully!");
  }).catch((error) => {
    console.error("Error adding task:", error);
  });
}

// Function to display tasks from Firebase
function displayTasksFromDatabase() {
  const tasksRef = ref(db, "tasks");

  onValue(tasksRef, (snapshot) => {
    const tasks = snapshot.val();
    taskList.innerHTML = ""; // Clear the list before adding tasks

    if (tasks) {
      Object.keys(tasks).forEach((key) => {
        const task = tasks[key];

        // Create list item
        const li = document.createElement("li");
        li.textContent = task.text;
        taskList.appendChild(li);
      });
    } else {
      taskList.innerHTML = "<li>No tasks available.</li>";
    }
  });
}

// Event Listener for Form Submission
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const taskText = taskInput.value.trim();
  if (taskText) {
    addTaskToDatabase(taskText); // Send data to Firebase
    taskInput.value = ""; // Clear input field
  }
});

// Display tasks on page load
displayTasksFromDatabase();
