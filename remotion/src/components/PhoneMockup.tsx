import React from "react";

export const PhoneMockup: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => {
  return (
    <div
      style={{
        width: 380,
        height: 780,
        borderRadius: 48,
        background: "#1A1A2E",
        padding: 8,
        boxShadow: "0 40px 100px rgba(124,110,219,0.3), 0 10px 30px rgba(0,0,0,0.2)",
        position: "relative",
        ...style,
      }}
    >
      {/* Notch */}
      <div
        style={{
          position: "absolute",
          top: 8,
          left: "50%",
          transform: "translateX(-50%)",
          width: 140,
          height: 32,
          borderRadius: 20,
          background: "#1A1A2E",
          zIndex: 10,
        }}
      />
      {/* Screen */}
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 40,
          overflow: "hidden",
          background: "#F5F3FF",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
};
