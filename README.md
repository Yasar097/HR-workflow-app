HR Workflow Designer – Prototype

A simple and visually clean HR Workflow Builder built using React, Vite, and React Flow.
Users can create HR process flows using draggable nodes, edit their configuration, and run a basic workflow simulation.

✨ Features

Add workflow nodes: Start, Task, Approval, Automated Step, End

Drag-and-drop visual canvas

Node selection + editable properties in the right panel

Simple workflow validation (Start and End required)

One-click Run Simulation to preview steps

Minimal, modern UI suitable for documentation & demos

📂 Project Architecture
src/
│ App.jsx        → Main UI (sidebar, canvas, right panel)
│ index.css      → Application styling
│ main.jsx       → Application entry point

▶️ How to Run the Project
1. Install dependencies
npm install

2. Start development server
npm run dev

3. Open in browser
http://localhost:5173/

📸 Screenshots 

Replace the placeholders below with your actual screenshots.

1. Full Application Layout

![WhatsApp Image 2025-12-11 at 00 07 44_4c5e6e7c](https://github.com/user-attachments/assets/8d3079a7-9d0b-4491-b1d7-a7f44d9c8b15)


2. Example Workflow on Canvas

<img width="303" height="616" alt="image" src="https://github.com/user-attachments/assets/5d6b7cd9-aba0-45a2-a0cf-ac7fe3131d7f" />

3. Node Details Panel
4. 
<img width="303" height="556" alt="image" src="https://github.com/user-attachments/assets/4b7e3eec-d954-4a3b-b814-fce9e33daa09" />

5. Simulation Output

<img width="465" height="550" alt="image" src="https://github.com/user-attachments/assets/924c9ee1-97b0-44bb-95c2-116837812efe" />


📘 Example Workflow for Screenshot

Use this simple workflow to showcase your app:

Start Node – “Onboarding Start”

Task Node – “Collect Documents”

Approval Node – “Manager Approval”

Automated Step Node – “Send Welcome Email”

End Node – “Onboarding Complete”

Recommended canvas layout:

Start → Task → Approval → Automated Step → End

🧠 Design Decisions
1. Simple Architecture

To keep the prototype lightweight and easy to review, all logic is inside a single App.jsx.

2. React Flow

Used due to built-in:

Drag + drop

Canvas controls

Zooming

Node management

3. No Backend

Simulation and data stored only in React state.

4. Minimal Validation

Only checks for one Start and one End node.

✔ What Was Completed

Add, drag, and edit workflow nodes

Dynamic form fields based on node type

Clean layout and UI

Basic workflow simulation

Example workflow + screenshots section

🔮 Future Enhancements

Save/Load workflow

Advanced validation (connections, unreachable nodes)

Custom node components

Undo/redo, minimap

Backend for real automation

Authentication & roles
