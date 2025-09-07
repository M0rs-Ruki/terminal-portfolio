import React, { useRef, useState, useEffect } from "react";

// IdentityComp.jsx
// Default export React component. Uses Tailwind CSS for styling.
// Features:
// - Draggable inside its parent container (the portfolio section). Bounded movement.
// - Smooth, physics-like dragging using requestAnimationFrame.
// - Persists last position to localStorage so the card stays where user left it.
// - Grayscale profile image, monogram/logo, name & role, terminal-like dark styling.

export default function IdentityComp({
  id = "identity-card",
  name = "Mors Ruki",
  role = "Senior Software Engineer",
  profileSrc = null, // if not provided uses generated mono avatar
  size = 320, // px (approx card width)
}) {
  const cardRef = useRef(null);
  const containerRef = useRef(null);

  // position in pixels relative to container's top-left
  const [pos, setPos] = useState({ x: 20, y: 20 });
  const draggingRef = useRef(false);
  const pointerOffset = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const velocity = useRef({ vx: 0, vy: 0 });

  // load saved position if exists
  useEffect(() => {
    try {
      const raw = localStorage.getItem(`identity_pos_${id}`);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved && typeof saved.x === "number") setPos(saved);
      }
    } catch (e) {
      // ignore
    }
  }, [id]);

  useEffect(() => {
    const onResize = () => clampPosition(pos, true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos]);

  function savePos(p) {
    try {
      localStorage.setItem(`identity_pos_${id}`, JSON.stringify(p));
    } catch (e) {}
  }

  function clampPosition(p, apply = false) {
    const container = containerRef.current || cardRef.current?.parentElement;
    const card = cardRef.current;
    if (!container || !card) return p;
    const cRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const maxX = Math.max(0, cRect.width - cardRect.width - 8);
    const maxY = Math.max(0, cRect.height - cardRect.height - 8);

    const nx = Math.min(Math.max(0, p.x), maxX);
    const ny = Math.min(Math.max(0, p.y), maxY);
    const res = { x: nx, y: ny };
    if (apply) {
      setPos(res);
      savePos(res);
    }
    return res;
  }

  function startDrag(e) {
    const pointer = getPointer(e);
    const card = cardRef.current;
    const container = containerRef.current || card.parentElement;
    if (!card || !container) return;

    const cRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    draggingRef.current = true;
    // compute offset of pointer inside the card
    pointerOffset.current = {
      x: pointer.clientX - cardRect.left,
      y: pointer.clientY - cardRect.top,
    };

    // stop any existing inertia
    cancelAnimationFrame(rafRef.current);
    velocity.current = { vx: 0, vy: 0 };

    // add listeners
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);

    // visual feedback
    card.style.transition = "none";
    card.style.willChange = "transform";
  }

  function onMove(e) {
    if (!draggingRef.current) return;
    const pointer = getPointer(e);
    const container = containerRef.current || cardRef.current.parentElement;
    const cRect = container.getBoundingClientRect();
    const newX = pointer.clientX - cRect.left - pointerOffset.current.x;
    const newY = pointer.clientY - cRect.top - pointerOffset.current.y;

    // compute velocity approx
    velocity.current = {
      vx: (newX - pos.x) * 0.6,
      vy: (newY - pos.y) * 0.6,
    };

    const clamped = clampPosition({ x: newX, y: newY }, false);
    // set directly without heavy reflows by using transform
    setPos(clamped);
  }

  function endDrag() {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const card = cardRef.current;
    card.style.transition = "transform 220ms cubic-bezier(.2,.9,.2,1)";

    // release and save final position
    const final = clampPosition(pos, true);
    // apply a tiny inertia animation
    const friction = 0.9;
    let { vx, vy } = velocity.current;
    let cur = { ...final };

    function inertia() {
      vx *= friction;
      vy *= friction;
      cur.x += vx * 0.02;
      cur.y += vy * 0.02;
      cur = clampPosition(cur, false);
      setPos(cur);
      if (Math.abs(vx) > 0.5 || Math.abs(vy) > 0.5) {
        rafRef.current = requestAnimationFrame(inertia);
      } else {
        setPos(cur);
        savePos(cur);
      }
    }
    rafRef.current = requestAnimationFrame(inertia);

    // remove listeners
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", endDrag);
    window.removeEventListener("pointercancel", endDrag);
  }

  function getPointer(e) {
    return e.changedTouches ? e.changedTouches[0] : e;
  }

  // keyboard small nudges for accessibility
  function onKeyDown(e) {
    if (e.key === "ArrowUp") moveBy(0, -8, true);
    if (e.key === "ArrowDown") moveBy(0, 8, true);
    if (e.key === "ArrowLeft") moveBy(-8, 0, true);
    if (e.key === "ArrowRight") moveBy(8, 0, true);
  }

  function moveBy(dx, dy, save = false) {
    const next = clampPosition({ x: pos.x + dx, y: pos.y + dy }, false);
    setPos(next);
    if (save) savePos(next);
  }

  // quick generated monochrome avatar fallback
  const fallbackAvatar = (
    <svg width="560" height="560" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width="24" height="24" rx="3" fill="currentColor" />
      <path d="M12 12c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM5 20.25c0-2.485 3.134-4.5 7-4.5s7 2.015 7 4.5v.75H5v-.75z" fill="rgba(255,255,255,0.9)" />
    </svg>
  );

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden"
      aria-label="Portfolio identity container"
    >
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        onPointerDown={startDrag}
        onKeyDown={onKeyDown}
        className={`select-none absolute shadow-2xl rounded-2xl p-4 flex flex-col items-center text-left cursor-grab`} 
        style={{
          width: size,
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          background: "linear-gradient(180deg, rgba(18,18,18,0.96), rgba(12,12,12,0.9))",
          boxShadow: "0 8px 30px rgba(0,0,0,0.6), 0 2px 6px rgba(255,215,0,0.03) inset",
          border: "1px solid rgba(255,255,255,0.03)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
      >
        {/* top monogram/logo */}
        <div className="w-full flex items-center justify-center mb-2">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-semibold bg-gradient-to-br from-gray-800 to-gray-700 text-white" aria-hidden>
            {/* simple monogram */}
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.03)" />
              <text x="12" y="16" textAnchor="middle" fontSize="10" fontWeight="700" fill="white">{(name || "").slice(0,1).toUpperCase()}</text>
            </svg>
          </div>
        </div>

        {/* profile photo */}
        <div className="w-28 h-28 rounded-full overflow-hidden border border-white/5 mb-3 shadow-inner">
          {profileSrc ? (
            <img
              src={profileSrc}
              alt={`${name} avatar`}
              className="object-cover w-full h-full grayscale" 
              style={{ filter: "grayscale(100%) contrast(0.85)" }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
              {fallbackAvatar}
            </div>
          )}
        </div>

        {/* name and role */}
        <div className="w-full text-center">
          <div className="text-white font-semibold text-lg leading-tight">{name}</div>
          <div className="text-gray-400 text-sm mt-1">{role}</div>
        </div>

        {/* subtle footer - terminal style */}
        <div className="mt-3 w-full px-2 flex items-center justify-between text-xs text-gray-500">
          <div className="truncate">ID: <span className="text-gray-400">{id}</span></div>
          <div className="text-gray-400">● active</div>
        </div>

        {/* small handle hint */}
        <div className="mt-3 text-[11px] text-gray-500 opacity-80">Drag to reposition</div>
      </div>
    </div>
  );
}
