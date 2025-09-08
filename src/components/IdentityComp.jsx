import React, { useState } from 'react';
import '/public/css/IdentityComp.css';

const IdentityComp = ({
  name = "Anup Pradhan (Mors)",
  title = "Full Stack Developer",
  company = "Non",
  photo = "/public/images/your-photo.jpg",
  id = "EMP001"
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="
        identity-container relative flex flex-col items-center py-8
        [perspective:1000px] text-emerald-300
      "
    >
      {/* Lanyard String */}
      <div
        className="
          lanyard-string mb-2
          w-px h-20 rounded-sm
          bg-gradient-to-b from-zinc-700 via-zinc-500 to-zinc-700
          relative
        "
      />
      <div
        className="
          lanyard-clip mb-2 relative
          w-5 h-4 rounded
          border border-zinc-700
          bg-gradient-to-br from-zinc-700 to-zinc-900
        "
      />

      {/* ID Card */}
      <div
        className={`
          identity-card ${isHovered ? 'hovered' : ''}
          relative isolate overflow-hidden
          w-60 h-[360px] sm:w-72 sm:h-[420px]
          rounded-xl border border-emerald-700/40
          bg-zinc-950/80 backdrop-blur
          ring-1 ring-emerald-600/20
          shadow-[0_0_0_1px_rgba(16,185,129,0.25),0_0_40px_rgba(16,185,129,0.08)]
          [transform-style:preserve-3d]
          transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Identity card"
      >
        {/* Subtle grid/glow backdrop */}
        <div
          aria-hidden
          className="
            pointer-events-none absolute inset-0 opacity-10 mix-blend-screen
            bg-[radial-gradient(1000px_300px_at_20%_0%,rgba(16,185,129,.15),transparent),radial-gradient(1000px_300px_at_80%_100%,rgba(16,185,129,.1),transparent)]
          "
        />

        {/* CRT scanlines overlay */}
        <div aria-hidden className="crt-scanlines absolute inset-0 pointer-events-none" />

        {/* Card Header */}
        <div className="card-header flex items-center px-5 pt-5 pb-4 border-b border-emerald-700/30">
          <div className="company-logo mr-3">
            <span className="logo-icon font-mono text-lg font-bold text-emerald-400">&lt;/&gt;</span>
          </div>
          <div className="company-name font-mono text-xs sm:text-sm text-zinc-200 font-semibold tracking-[0.2em] uppercase">
            {company}
          </div>
        </div>

        {/* Photo Section */}
        <div className="photo-section px-5 pt-6 pb-4 flex justify-center">
          <div
            className="
              photo-frame relative w-[120px] h-[150px] rounded-md overflow-hidden
              border border-emerald-700/60
              ring-1 ring-emerald-500/30
              shadow-[0_4px_12px_rgba(0,0,0,0.5)]
            "
          >
            <img
              src={photo}
              alt="Profile"
              className="
                profile-photo w-full h-full object-cover
                grayscale-[.2] contrast-110
                transition-all duration-300
              "
            />
            <div
              className="
                photo-overlay absolute inset-0
                bg-gradient-to-br from-transparent via-emerald-500/10 to-transparent
                opacity-0 transition-opacity duration-300
              "
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="info-section px-5 text-center">
          <h3 className="employee-name font-mono text-lg font-extrabold text-zinc-100 tracking-wide">
            {name}
          </h3>
          <p className="employee-title font-mono text-xs text-emerald-400 uppercase tracking-[0.25em]">
            {title}
          </p>
          <div className="employee-id font-mono text-[10px] text-zinc-500 tracking-[0.3em] uppercase mt-3">
            ID: {id}
          </div>
        </div>

        {/* Card Footer */}
        <div className="card-footer absolute bottom-5 left-5 right-5 flex justify-center">
          <div className="access-level flex items-center font-mono text-[10px] text-emerald-400 font-semibold tracking-[0.2em] uppercase">
            <span
              className="
                status-indicator inline-block w-2 h-2 rounded-full bg-emerald-500
                shadow-[0_0_10px_rgba(16,185,129,0.6)]
                animate-pulse mr-2
              "
            />
            <span>AUTHORIZED</span>
          </div>
        </div>

        {/* Holographic Effect */}
        <div
          aria-hidden
          className="
            holographic-overlay pointer-events-none
            absolute inset-0 -translate-x-full
            bg-[linear-gradient(90deg,transparent,rgba(16,185,129,0.12),transparent)]
            transition-transform duration-700
          "
        />
      </div>

      {/* Interactive Label */}
      <div className="interaction-label font-mono text-[11px] text-emerald-400/80 mt-5 tracking-[0.2em] uppercase">
        [Interactive 3D Card]
      </div>
    </div>
  );
};

export default IdentityComp;
