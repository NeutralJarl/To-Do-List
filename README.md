# Overview

As a software engineer, my goal with this project was to get comfortable with JavaScript's core building blocks and with the functional style of programming it encourages: small single-purpose functions, native array methods, and recursion. I wanted a project that would make me practice working with the browser's DOM, handle errors gracefully, and bring in a third-party library, since those are everyday skills for working on real web applications.

Task Tree is a browser-based to-do list where tasks can have subtasks nested to any depth. You can add, complete, and delete tasks, filter them by All, Active, or Completed, and see a live progress summary. Tasks are saved in the browser with `localStorage`, so they are still there after a refresh. When every task is completed, the app celebrates with a confetti animation.

The software demonstrates the following parts of the JavaScript language:

- **Screen output:** the page is built with the DOM (`createElement`, `appendChild`, `textContent`).
- **Native ES6 array functions:** `map`, `filter`, `reduce`, `flatMap`, `some`, and `forEach`.
- **Recursion:** functions that call themselves to walk the task tree, such as `findTask`, `removeTask`, `countTasks`, `flattenTasks`, and `renderTask`.
- **External library:** canvas-confetti, loaded from a CDN.
- **Exceptions:** `throw` and `try/catch` for input validation and for loading saved data.

My purpose in writing this software was to learn JavaScript syntax by building something small but complete, where each language feature solves a real problem in the app instead of being practiced in isolation.

My 4-5 minute demonstration shows the software running and walks through the code, focusing on what I learned about the language syntax.

[Software Demo Video](https://www.youtube.com/watch?v=tL_H5NbcQ1E)

# Development Environment

I developed the software using Visual Studio Code as my editor and tested it in a web browser, using the browser's developer tools (F12) to read the console and debug. The optional Live Server extension reloads the page automatically when files are saved.

The program is written in JavaScript, with HTML for the page structure and CSS for styling. It uses one external library: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti), loaded from the jsDelivr CDN.

# Useful Websites

- [MDN Web Docs: JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [MDN Web Docs: Array reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [MDN Web Docs: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [canvas-confetti on npm](https://www.npmjs.com/package/canvas-confetti)

# Future Work

- Add the ability to edit a task's text after it has been created
- Make filters keep a subtask visible when its parent is hidden (and vice versa)
- Mark all subtasks complete when a parent task is completed
- Add due dates, possibly with a date library
- Add drag and drop to reorder tasks and move them between parents
