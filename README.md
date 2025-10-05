# Easy Read

## Project Description

PDF Viewer is a small, focused web app that lets a user open a local PDF file and read it page-by-page inside the browser. Each page is rendered to an HTML `<canvas>` for crisp display and consistent zoom/scroll behavior. The app supports bookmarks and per-page notes, and it persists user data (bookmarks, notes, last-opened page) in `localStorage` so a reader returns exactly where they left off.

## Target Audience

This project is ideal for students, researchers, or anyone who wants a lightweight PDF reading experience in the browser without uploading files to a server. It also works well as a learning project for web developers who want to practise DOM manipulation, `localStorage`, and integrating PDF.js.

## Key Features

- Open and read PDF files stored on your device.
- Easy navigation between pages and quick jump controls.
- Save bookmarks to mark important pages.
- Add short notes to any page for later reference.
- Remembers where you left off so you can continue reading quickly.
- Responsive layout with a simple full-screen option for focused reading.

## Technologies Used

This project focuses on the core browser APIs and libraries that make PDF viewing reliable and fast. Removed less-used or very common items to keep this list concise.

- **PDF.js (rendering engine)** — Parses PDF files and provides page rendering APIs that the viewer uses to rasterize pages.

- **Canvas 2D API** — Pages are drawn to individual canvases using the Canvas 2D context with device-pixel-ratio scaling for sharp display.

- **File API & Blob URLs** — Local files are read through the File API and passed to the viewer using temporary blob URLs.

- **IntersectionObserver (lazy rendering & visibility tracking)** — Observes which pages are in view and triggers rendering only when needed.

- **Web Storage API (localStorage)** — Stores reader state (bookmarks, notes, last page) as JSON scoped to each document.

## Project Dependencies

A modern web browser with internet access is required to use this application. No installation or downloads are necessary.

## Instructions for Use

Open the application's live link (https://jayanthg-14.github.io/Book/) in a web browser, or open `index.html` from the project folder locally.

1. Click **Upload** and choose a PDF file from your computer. The viewer loads the document and shows the title and total page count.
2. Scroll through pages to read. The current page number updates automatically as you move through the document.
3. Use the **Prev** / **Next** controls or type a page number to jump directly to any page.
4. Click the **bookmark** icon to save the current page. Open the Bookmarks panel to jump back to a bookmarked page.
5. Open the **Notes** panel to add a short note tied to the current page. Notes save automatically and can be deleted when no longer needed.
6. Click **Fullscreen** to focus on reading without distractions.

The app remembers your bookmarks, notes, and last-opened page for the same document in the same browser, so you can return to where you left off.

## Troubleshooting

- **The PDF doesn’t open after selecting it**  
  Make sure the file you selected is a valid PDF. Try re‑uploading the file or using a different PDF to confirm.

- **Pages look empty or don’t appear while scrolling**  
  Refresh the page and upload the PDF again. Also check if your internet connection is active when using the online version.

- **Bookmarks or notes are missing**  
  If you recently cleared your browser history or opened the app in a private window or different device/browser, saved data may not appear. Use the same browser and device to see previous bookmarks or notes.

- **The page number doesn’t update while scrolling**  
  Scroll a bit more slowly or wait for the page to finish loading. If the document is very long, give it a moment to display the correct page.

If an issue continues, closing the tab and reopening the viewer usually helps reset the app without losing your files.


## Contributing or Getting Help

Find the source code and contribute to development by visiting the project repository:

https://github.com/jayanthg-14/Book

You can report issues, suggest improvements, or submit changes through GitHub.
