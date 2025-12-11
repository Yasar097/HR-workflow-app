HR Workflow Designer – Prototype

A simple and clean HR Workflow Builder prototype built using React + Vite + React Flow.
This tool allows users to visually create HR workflows by adding nodes, editing their properties, and running a basic simulation of the process.

Features

Add workflow nodes: Start, Task, Approval, Automated Step, End

Drag and position nodes on a visual canvas

Edit node details in the right panel

Simple workflow validation (Start + End required)

One-click Run Simulation to preview workflow steps

Minimal, clean, professional UI

Project Architecture
src/
│ App.jsx        → Main application UI (sidebar, canvas, right panel)
│ index.css      → Global styling and layout
│ main.jsx       → App entry point

How it Works

React Flow handles the canvas, nodes, and connections.

React state stores:

Workflow nodes

Selected node

Form data

Simulation results

The simulation is local-only and demonstrates workflow order.

How to Run
npm install
npm run dev


Open in your browser:

http://localhost:5173/

Example Workflow for Screenshots

Employee Onboarding Workflow

Start → Onboarding Start

Task → Collect Documents

Approval → Manager Approval

Automated → Send Welcome Email

End → Onboarding Complete

After creating the workflow, click Run Simulation to capture the output.

🧠 Design Decisions

Kept extremely simple to match prototype requirements

Single-file architecture (App.jsx) to make the project easy to review

No backend or database — everything runs in the browser

Used React Flow for easy drag-and-drop and clean visuals

✔ Completed in This Prototype

Three-panel layout (Sidebar → Canvas → Config Panel)

Node adding and editing

Dynamic fields based on node type

Basic workflow simulation

Clean UI suitable for screenshots and demonstration

🔮 What Could Be Added with More Time

Node-to-node connection validation

Saving/loading workflows (JSON export/import)

Custom-styled node components

More complex simulation engine

Backend automation triggers

Authentication and role-based access
