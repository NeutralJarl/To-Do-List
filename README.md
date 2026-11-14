# Task Tree (JavaScript To-Do List)

> Note: copy this content into the course's JavaScript README.md template if the section names differ.

## Overview
Task Tree is a browser-based to-do list where tasks can have subtasks. I built it to practice core JavaScript: writing small functions, using native array methods, recursion, and using an external library.

## Development Environment
- Visual Studio Code
- A web browser (Chrome, Edge, or Firefox)
- Optional: the Live Server extension for VS Code

## How to Run
1. Open the `todo-app` folder in VS Code.
2. Open `index.html` in your browser (or right-click it and choose **Open with Live Server**).

## Features
- Add, complete, and delete tasks
- Add subtasks under any task
- Filter by All / Active / Completed
- Progress summary ("3 of 7 tasks done")
- Tasks are saved in the browser with `localStorage`

## Requirements Demonstrated
| Requirement | Where |
|---|---|
| Display output to the screen | `renderTask`, `renderList`, `renderSummary` build the page with the DOM |
| Native ES6 array functions | `map`, `filter`, `reduce`, `flatMap`, `some`, `forEach` |
| Recursion | `findTask`, `removeTask`, `countTasks`, `flattenTasks`, `renderTask` |
| External library | [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) via CDN |
| Stretch: exceptions | `validateText` throws errors; `handleAdd` and `loadTasks` use `try/catch` |

## Useful Websites
- [MDN JavaScript Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [canvas-confetti on npm](https://www.npmjs.com/package/canvas-confetti)

## Future Work
- Edit task text
- Due dates (for example with Day.js)
- Drag and drop to reorder tasks
