import React, { useState, useCallback, useEffect } from "react";

const basePath = import.meta.env.BASE_URL || "/";

const FLOWER_OPTIONS = [
  "flower-coral.png",
  "flower-cream.png",
  "flower-orange.png",
  "flower-peach.png",
  "flower-pink.png",
  "flower-purple.png",
  "flower-red.png",
  "flower-yellow.png",
];

const FlowerEditor = ({
  flowers,
  setFlowers,
  sectionRef,
  topClusterRef,
  bottomClusterRef,
}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [activeCluster, setActiveCluster] = useState("top");
  const [, forceUpdate] = useState(0);

  const selected = flowers.find((f) => f.id === selectedId);
  const clusterFlowers = flowers.filter((f) => f.cluster === activeCluster);
  const clusterRef = activeCluster === "top" ? topClusterRef : bottomClusterRef;

  // Force re-render on scroll/resize so overlay positions stay in sync
  useEffect(() => {
    const refresh = () => forceUpdate((n) => n + 1);
    window.addEventListener("scroll", refresh);
    window.addEventListener("resize", refresh);
    return () => {
      window.removeEventListener("scroll", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  const updateFlower = useCallback(
    (id, updates) => {
      setFlowers((prev) =>
        prev.map((f) => (f.id === id ? { ...f, ...updates } : f)),
      );
    },
    [setFlowers],
  );

  const getClusterRect = useCallback(() => {
    if (!clusterRef?.current) return null;
    return clusterRef.current.getBoundingClientRect();
  }, [clusterRef]);

  const handleMouseDown = useCallback(
    (e, flower) => {
      e.stopPropagation();
      e.preventDefault();
      setSelectedId(flower.id);

      const rect = getClusterRect();
      if (!rect) return;

      const startX = e.clientX;
      const startY = e.clientY;
      const startFlowerX = flower.x;
      const startFlowerY = flower.y;

      const handleMouseMove = (moveEvent) => {
        const dx = ((moveEvent.clientX - startX) / rect.width) * 100;
        const dy = ((moveEvent.clientY - startY) / rect.height) * 100;
        updateFlower(flower.id, {
          x: Math.round((startFlowerX + dx) * 10) / 10,
          y: Math.round((startFlowerY + dy) * 10) / 10,
        });
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        setDragging(null);
      };

      setDragging(flower.id);
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [updateFlower, getClusterRect],
  );

  const handleRotateStart = useCallback(
    (e, flower) => {
      e.stopPropagation();
      e.preventDefault();

      const rect = getClusterRect();
      if (!rect) return;

      const flowerCenterX = rect.left + (flower.x / 100) * rect.width;
      const flowerCenterY =
        activeCluster === "top"
          ? rect.top + (flower.y / 100) * rect.height
          : rect.bottom + (flower.y / 100) * rect.height;

      const handleMouseMove = (moveEvent) => {
        const angle = Math.atan2(
          moveEvent.clientY - flowerCenterY,
          moveEvent.clientX - flowerCenterX,
        );
        const degrees = Math.round((angle * 180) / Math.PI);
        updateFlower(flower.id, { rotation: degrees });
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [updateFlower, getClusterRect, activeCluster],
  );

  const addFlower = useCallback(() => {
    const prefix = activeCluster === "top" ? "t" : "b";
    const clusterNums = flowers
      .filter((f) => f.cluster === activeCluster)
      .map((f) => parseInt(f.id.replace(prefix, ""), 10));
    const maxNum = Math.max(...clusterNums, 0);

    const newFlower = {
      id: `${prefix}${maxNum + 1}`,
      src: "flower-coral.png",
      x: 40,
      y: 0,
      width: 14,
      rotation: 0,
      scaleX: 1,
      opacity: 1,
      cluster: activeCluster,
    };

    setFlowers((prev) => [...prev, newFlower]);
    setSelectedId(newFlower.id);
  }, [flowers, activeCluster, setFlowers]);

  const deleteFlower = useCallback(
    (id) => {
      setFlowers((prev) => prev.filter((f) => f.id !== id));
      setSelectedId(null);
    },
    [setFlowers],
  );

  const duplicateFlower = useCallback(
    (flower) => {
      const prefix = activeCluster === "top" ? "t" : "b";
      const allNums = flowers
        .filter((f) => f.cluster === activeCluster)
        .map((f) => parseInt(f.id.replace(prefix, ""), 10));
      const maxNum = Math.max(...allNums, 0);

      const dup = {
        ...flower,
        id: `${prefix}${maxNum + 1}`,
        x: flower.x + 5,
        y: flower.y + 5,
      };

      setFlowers((prev) => [...prev, dup]);
      setSelectedId(dup.id);
    },
    [flowers, activeCluster, setFlowers],
  );

  const exportJSON = useCallback(() => {
    const json = JSON.stringify({ flowers }, null, 2);
    navigator.clipboard.writeText(json).then(() => {
      alert("Flower layout JSON copied to clipboard!");
    });
    console.log("Flower Layout JSON:\n", json);
  }, [flowers]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedId) return;
      const sel = flowers.find((f) => f.id === selectedId);
      if (!sel) return;

      const step = e.shiftKey ? 5 : 1;
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          updateFlower(selectedId, { x: sel.x - step });
          break;
        case "ArrowRight":
          e.preventDefault();
          updateFlower(selectedId, { x: sel.x + step });
          break;
        case "ArrowUp":
          e.preventDefault();
          updateFlower(selectedId, { y: sel.y - step });
          break;
        case "ArrowDown":
          e.preventDefault();
          updateFlower(selectedId, { y: sel.y + step });
          break;
        case "Delete":
        case "Backspace":
          if (e.target.tagName !== "INPUT" && e.target.tagName !== "SELECT") {
            e.preventDefault();
            deleteFlower(selectedId);
          }
          break;
        case "Escape":
          setSelectedId(null);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, flowers, updateFlower, deleteFlower]);

  // Compute flower overlay positions from cluster ref rect
  const rect = getClusterRect();
  const sectionRect = sectionRef?.current?.getBoundingClientRect();

  return (
    <div
      className="absolute inset-0 z-[200] pointer-events-auto"
      onClick={() => setSelectedId(null)}
      style={{ cursor: "crosshair" }}
    >
      {/* Flower overlays — positioned using fixed coords from cluster ref */}
      {rect &&
        sectionRect &&
        clusterFlowers.map((flower) => {
          const isSelected = flower.id === selectedId;

          // Calculate position relative to the section (since we're absolute inside it)
          const clusterTop = rect.top - sectionRect.top;
          const clusterLeft = rect.left - sectionRect.left;

          let flowerTop, flowerLeft;
          flowerLeft = clusterLeft + (flower.x / 100) * rect.width;

          if (activeCluster === "top") {
            flowerTop = clusterTop + (flower.y / 100) * rect.height;
          } else {
            // bottom cluster: y is negative offset from bottom
            flowerTop =
              clusterTop + rect.height + (flower.y / 100) * rect.height;
          }

          return (
            <div
              key={flower.id}
              className="absolute"
              style={{
                top: flowerTop,
                left: flowerLeft,
                width: `${flower.width}vw`,
                transform: `rotate(${flower.rotation}deg) scaleX(${flower.scaleX})`,
                opacity: flower.opacity,
                cursor: dragging === flower.id ? "grabbing" : "grab",
                zIndex: isSelected ? 210 : 201,
              }}
              onMouseDown={(e) => handleMouseDown(e, flower)}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedId(flower.id);
              }}
            >
              <img
                src={`${basePath}florals/${flower.src}`}
                alt={flower.id}
                className="w-full pointer-events-none select-none"
                draggable={false}
              />
              {isSelected && (
                <>
                  <div
                    className="absolute inset-0 border-2 border-dashed border-blue-500 rounded"
                    style={{ pointerEvents: "none" }}
                  />
                  <div
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-pointer border-2 border-white shadow"
                    style={{ pointerEvents: "all" }}
                    onMouseDown={(e) => handleRotateStart(e, flower)}
                    title="Drag to rotate"
                  />
                  <div
                    className="absolute -bottom-5 left-0 text-[10px] font-mono bg-blue-500 text-white px-1 rounded"
                    style={{ pointerEvents: "none" }}
                  >
                    {flower.id}
                  </div>
                </>
              )}
            </div>
          );
        })}

      {/* Control Panel */}
      <div
        className="fixed right-4 top-20 w-64 bg-white/95 backdrop-blur border border-gray-300 rounded-lg shadow-xl p-4 z-[300] text-xs"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: "calc(100vh - 100px)", overflowY: "auto" }}
      >
        {/* Cluster toggle */}
        <div className="flex mb-3 border border-gray-300 rounded overflow-hidden">
          <button
            onClick={() => {
              setActiveCluster("top");
              setSelectedId(null);
            }}
            className={`flex-1 py-1.5 text-xs font-bold ${
              activeCluster === "top"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Top
          </button>
          <button
            onClick={() => {
              setActiveCluster("bottom");
              setSelectedId(null);
            }}
            className={`flex-1 py-1.5 text-xs font-bold ${
              activeCluster === "bottom"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Bottom
          </button>
        </div>

        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-gray-800">Flower Editor</h3>
          <button
            onClick={exportJSON}
            className="px-2 py-1 bg-green-600 text-white rounded text-[10px] font-bold hover:bg-green-700"
          >
            Export JSON
          </button>
        </div>

        <button
          onClick={addFlower}
          className="w-full mb-3 px-3 py-1.5 bg-blue-600 text-white rounded font-bold hover:bg-blue-700"
        >
          + Add Flower
        </button>

        {/* Selected flower controls */}
        {selected && selected.cluster === activeCluster && (
          <div className="space-y-2 border-t border-gray-200 pt-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-700">
                Selected: {selected.id}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() => duplicateFlower(selected)}
                  className="px-2 py-0.5 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Copy
                </button>
                <button
                  onClick={() => deleteFlower(selected.id)}
                  className="px-2 py-0.5 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                  Del
                </button>
              </div>
            </div>

            <label className="block">
              <span className="text-gray-600">Image</span>
              <select
                value={selected.src}
                onChange={(e) =>
                  updateFlower(selected.id, { src: e.target.value })
                }
                className="mt-0.5 w-full border rounded px-2 py-1 text-xs"
              >
                {FLOWER_OPTIONS.map((src) => (
                  <option key={src} value={src}>
                    {src.replace("flower-", "").replace(".png", "")}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-gray-600">X: {selected.x.toFixed(1)}%</span>
              <input
                type="range"
                min="-20"
                max="100"
                step="0.5"
                value={selected.x}
                onChange={(e) =>
                  updateFlower(selected.id, { x: parseFloat(e.target.value) })
                }
                className="w-full"
              />
            </label>

            <label className="block">
              <span className="text-gray-600">Y: {selected.y.toFixed(1)}%</span>
              <input
                type="range"
                min="-20"
                max="30"
                step="0.5"
                value={selected.y}
                onChange={(e) =>
                  updateFlower(selected.id, { y: parseFloat(e.target.value) })
                }
                className="w-full"
              />
            </label>

            <label className="block">
              <span className="text-gray-600">Width: {selected.width}vw</span>
              <input
                type="range"
                min="3"
                max="50"
                step="0.5"
                value={selected.width}
                onChange={(e) =>
                  updateFlower(selected.id, {
                    width: parseFloat(e.target.value),
                  })
                }
                className="w-full"
              />
            </label>

            <label className="block">
              <span className="text-gray-600">
                Rotation: {selected.rotation}deg
              </span>
              <input
                type="range"
                min="-180"
                max="180"
                step="1"
                value={selected.rotation}
                onChange={(e) =>
                  updateFlower(selected.id, {
                    rotation: parseInt(e.target.value),
                  })
                }
                className="w-full"
              />
            </label>

            <label className="block">
              <span className="text-gray-600">
                Opacity: {selected.opacity.toFixed(2)}
              </span>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={selected.opacity}
                onChange={(e) =>
                  updateFlower(selected.id, {
                    opacity: parseFloat(e.target.value),
                  })
                }
                className="w-full"
              />
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.scaleX === -1}
                onChange={(e) =>
                  updateFlower(selected.id, {
                    scaleX: e.target.checked ? -1 : 1,
                  })
                }
              />
              <span className="text-gray-600">Flip horizontal</span>
            </label>
          </div>
        )}

        {/* Flower list */}
        <div className="mt-3 border-t border-gray-200 pt-2">
          <p className="font-bold text-gray-600 mb-1">
            All ({clusterFlowers.length})
          </p>
          <div className="space-y-0.5 max-h-40 overflow-y-auto">
            {clusterFlowers.map((f) => (
              <div
                key={f.id}
                className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-gray-100 ${
                  f.id === selectedId ? "bg-blue-100" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(f.id);
                }}
              >
                <img
                  src={`${basePath}florals/${f.src}`}
                  className="w-6 h-6 object-contain"
                  alt=""
                />
                <span className="font-mono text-gray-700">{f.id}</span>
                <span className="text-gray-400 ml-auto">
                  {f.src.replace("flower-", "").replace(".png", "")}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 border-t border-gray-200 pt-2 text-[10px] text-gray-400">
          <p>Drag flowers to move. Click to select.</p>
          <p>Arrow keys to nudge (Shift = 5x).</p>
          <p>Delete/Backspace to remove selected.</p>
          <p>Ctrl+Shift+E to toggle editor.</p>
        </div>
      </div>
    </div>
  );
};

export default FlowerEditor;
