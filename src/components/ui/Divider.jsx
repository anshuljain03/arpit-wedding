import React from "react";

const Divider = ({ motif = "diamond", className = "" }) => {
  const motifs = {
    diamond: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 0L20 10L10 20L0 10L10 0Z" fill="#E87A4A" />
        <path
          d="M10 4L16 10L10 16L4 10L10 4Z"
          fill="none"
          stroke="#D4993D"
          strokeWidth="1"
        />
      </svg>
    ),
    floral: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="5" fill="#E87A4A" />
        <ellipse
          cx="16"
          cy="6"
          rx="3"
          ry="5"
          fill="#E8508A"
          fillOpacity="0.8"
        />
        <ellipse
          cx="16"
          cy="26"
          rx="3"
          ry="5"
          fill="#E8508A"
          fillOpacity="0.8"
        />
        <ellipse
          cx="6"
          cy="16"
          rx="5"
          ry="3"
          fill="#4A7EC8"
          fillOpacity="0.8"
        />
        <ellipse
          cx="26"
          cy="16"
          rx="5"
          ry="3"
          fill="#4A7EC8"
          fillOpacity="0.8"
        />
        <ellipse
          cx="9"
          cy="9"
          rx="3"
          ry="2"
          fill="#D4993D"
          fillOpacity="0.7"
          transform="rotate(-45 9 9)"
        />
        <ellipse
          cx="23"
          cy="9"
          rx="3"
          ry="2"
          fill="#D4993D"
          fillOpacity="0.7"
          transform="rotate(45 23 9)"
        />
        <ellipse
          cx="9"
          cy="23"
          rx="3"
          ry="2"
          fill="#D4993D"
          fillOpacity="0.7"
          transform="rotate(45 9 23)"
        />
        <ellipse
          cx="23"
          cy="23"
          rx="3"
          ry="2"
          fill="#D4993D"
          fillOpacity="0.7"
          transform="rotate(-45 23 23)"
        />
      </svg>
    ),
    om: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="#E87A4A"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="12" cy="12" r="3" fill="#E87A4A" />
      </svg>
    ),
  };

  return (
    <div className={`divider-ornate ${className}`}>
      {motifs[motif] || motifs.diamond}
    </div>
  );
};

export default Divider;
