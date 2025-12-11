import { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  {
    id: "1",
    position: { x: 250, y: 100 },
    data: {
      label: "Sample Task Node",
      nodeType: "task",
      description: "",
      assignee: "",
      dueDate: "",
    },
    type: "default",
  },
];

const initialEdges = [];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const [simulationLog, setSimulationLog] = useState([]);
  const [simulationError, setSimulationError] = useState("");

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  const handleAddNode = (nodeType) => {
    setNodes((prevNodes) => {
      const newId = (prevNodes.length + 1).toString();

      let defaultData = {
        label: `${nodeType[0].toUpperCase() + nodeType.slice(1)} Node`,
        nodeType,
      };

      if (nodeType === "task") {
        defaultData = {
          ...defaultData,
          description: "",
          assignee: "",
          dueDate: "",
        };
      } else if (nodeType === "approval") {
        defaultData = {
          ...defaultData,
          approverRole: "",
          autoAfterDays: "",
        };
      } else if (nodeType === "automated") {
        defaultData = {
          ...defaultData,
          actionName: "",
          actionParam: "",
        };
      } else if (nodeType === "start") {
        defaultData = {
          ...defaultData,
          notes: "",
        };
      } else if (nodeType === "end") {
        defaultData = {
          ...defaultData,
          message: "",
        };
      }

      const newNode = {
        id: newId,
        type: "default",
        position: {
          x: 250,
          y: 80 + prevNodes.length * 70,
        },
        data: defaultData,
      };

      return [...prevNodes, newNode];
    });
  };

  const handleNodeClick = (_, node) => {
    setSelectedNodeId(node.id);
  };

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;

  const updateSelectedNodeData = (changes) => {
    if (!selectedNodeId) return;
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { ...node.data, ...changes } }
          : node
      )
    );
  };

  const handleLabelChange = (e) => {
    updateSelectedNodeData({ label: e.target.value });
  };

  // ---------- SIMPLE WORKFLOW SIMULATION ----------
  const handleRunSimulation = () => {
    if (nodes.length === 0) {
      setSimulationError("No nodes in the workflow. Please add some nodes.");
      setSimulationLog([]);
      return;
    }

    const startNodes = nodes.filter((n) => n.data?.nodeType === "start");
    const endNodes = nodes.filter((n) => n.data?.nodeType === "end");

    const errors = [];
    if (startNodes.length === 0) errors.push("No Start node found.");
    if (startNodes.length > 1) errors.push("More than one Start node found.");
    if (endNodes.length === 0) errors.push("No End node found.");
    if (endNodes.length > 1) errors.push("More than one End node found.");

    if (errors.length > 0) {
      setSimulationError(errors.join(" "));
      setSimulationLog([]);
      return;
    }

    const middleNodes = nodes.filter(
      (n) =>
        n.data?.nodeType !== "start" &&
        n.data?.nodeType !== "end"
    );

    const orderedNodes = [...startNodes, ...middleNodes, ...endNodes];

    const log = orderedNodes.map((node, index) => {
      const type = node.data?.nodeType || "node";
      const label = node.data?.label || node.id;
      return `Step ${index + 1}: ${type.toUpperCase()} - ${label}`;
    });

    setSimulationError("");
    setSimulationLog(log);
  };

  const nodeTypeClass =
    selectedNode?.data?.nodeType
      ? `pill pill-${selectedNode.data.nodeType}`
      : "pill";

  return (
    <div className="page">
      {/* Top header */}
      <header className="topbar">
        <div className="topbar-title">HR Workflow Designer (Prototype)</div>
        <div className="topbar-subtitle">
          Drag nodes, configure steps, and run a simple workflow simulation.
        </div>
      </header>

      <div className="app-container">
        {/* Left Sidebar */}
        <aside className="sidebar">
          <h2>Nodes</h2>
          <p className="sidebar-hint">Click to add nodes to the canvas.</p>
          <ul className="sidebar-list">
            <li>
              <button
                className="sidebar-button"
                onClick={() => handleAddNode("start")}
              >
                • Start
              </button>
            </li>
            <li>
              <button
                className="sidebar-button"
                onClick={() => handleAddNode("task")}
              >
                • Task
              </button>
            </li>
            <li>
              <button
                className="sidebar-button"
                onClick={() => handleAddNode("approval")}
              >
                • Approval
              </button>
            </li>
            <li>
              <button
                className="sidebar-button"
                onClick={() => handleAddNode("automated")}
              >
                • Automated Step
              </button>
            </li>
            <li>
              <button
                className="sidebar-button"
                onClick={() => handleAddNode("end")}
              >
                • End
              </button>
            </li>
          </ul>
        </aside>

        {/* Middle Canvas Area */}
        <main className="canvas">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={handleNodeClick}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </main>

        {/* Right Panel */}
        <aside className="right-panel">
          <h2>Node Details</h2>

          {!selectedNode && (
            <p className="muted-text">
              Click a node on the canvas to configure it.
            </p>
          )}

          {selectedNode && (
            <div className="node-details">
              <div className="field">
                <label>Node Type</label>
                <div className={nodeTypeClass}>
                  {selectedNode.data?.nodeType || "unknown"}
                </div>
              </div>

              <div className="field">
                <label>Label / Title</label>
                <input
                  type="text"
                  value={selectedNode.data?.label || ""}
                  onChange={handleLabelChange}
                />
              </div>

              {/* Extra fields based on node type */}
              {selectedNode.data?.nodeType === "start" && (
                <>
                  <div className="field">
                    <label>Notes</label>
                    <textarea
                      rows={3}
                      value={selectedNode.data?.notes || ""}
                      onChange={(e) =>
                        updateSelectedNodeData({ notes: e.target.value })
                      }
                    />
                  </div>
                </>
              )}

              {selectedNode.data?.nodeType === "task" && (
                <>
                  <div className="field">
                    <label>Description</label>
                    <textarea
                      rows={3}
                      value={selectedNode.data?.description || ""}
                      onChange={(e) =>
                        updateSelectedNodeData({ description: e.target.value })
                      }
                    />
                  </div>
                  <div className="field">
                    <label>Assignee</label>
                    <input
                      type="text"
                      value={selectedNode.data?.assignee || ""}
                      onChange={(e) =>
                        updateSelectedNodeData({ assignee: e.target.value })
                      }
                    />
                  </div>
                  <div className="field">
                    <label>Due Date</label>
                    <input
                      type="date"
                      value={selectedNode.data?.dueDate || ""}
                      onChange={(e) =>
                        updateSelectedNodeData({ dueDate: e.target.value })
                      }
                    />
                  </div>
                </>
              )}

              {selectedNode.data?.nodeType === "approval" && (
                <>
                  <div className="field">
                    <label>Approver Role</label>
                    <input
                      type="text"
                      value={selectedNode.data?.approverRole || ""}
                      onChange={(e) =>
                        updateSelectedNodeData({
                          approverRole: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="field">
                    <label>Auto-Approve After (days)</label>
                    <input
                      type="number"
                      min="0"
                      value={selectedNode.data?.autoAfterDays || ""}
                      onChange={(e) =>
                        updateSelectedNodeData({
                          autoAfterDays: e.target.value,
                        })
                      }
                    />
                  </div>
                </>
              )}

              {selectedNode.data?.nodeType === "automated" && (
                <>
                  <div className="field">
                    <label>Action Name</label>
                    <input
                      type="text"
                      placeholder="e.g. send_email"
                      value={selectedNode.data?.actionName || ""}
                      onChange={(e) =>
                        updateSelectedNodeData({ actionName: e.target.value })
                      }
                    />
                  </div>
                  <div className="field">
                    <label>Parameter</label>
                    <input
                      type="text"
                      placeholder="e.g. to=hr@example.com"
                      value={selectedNode.data?.actionParam || ""}
                      onChange={(e) =>
                        updateSelectedNodeData({ actionParam: e.target.value })
                      }
                    />
                  </div>
                </>
              )}

              {selectedNode.data?.nodeType === "end" && (
                <>
                  <div className="field">
                    <label>End Message</label>
                    <textarea
                      rows={2}
                      value={selectedNode.data?.message || ""}
                      onChange={(e) =>
                        updateSelectedNodeData({ message: e.target.value })
                      }
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {/* ---------- WORKFLOW TEST SECTION ---------- */}
          <hr className="divider" />
          <h3 className="section-title">Workflow Test</h3>
          <button className="run-button" onClick={handleRunSimulation}>
            Run Simulation
          </button>

          {simulationError && (
            <p className="error-text">{simulationError}</p>
          )}

          {simulationLog.length > 0 && (
            <ul className="log-list">
              {simulationLog.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </div>
  );
}

export default App;
