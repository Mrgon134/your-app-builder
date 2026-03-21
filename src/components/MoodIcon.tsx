import React from "react";

interface MoodIconProps {
  value: number;
  size?: number;
  color: string;
}

const MoodIcon: React.FC<MoodIconProps> = ({ value, size = 28, color }) => {
  const s = size;
  const icons: Record<number, React.ReactNode> = {
    5: (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="14" fill={color} opacity="0.15" />
        <circle cx="16" cy="16" r="14" stroke={color} strokeWidth="1.5" fill="none" />
        <circle cx="11" cy="13" r="1.5" fill={color} />
        <circle cx="21" cy="13" r="1.5" fill={color} />
        <path d="M10 20Q16 26 22 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M8 8L11 11M24 8L21 11M16 5V8" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    4: (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="14" fill={color} opacity="0.15" />
        <circle cx="16" cy="16" r="14" stroke={color} strokeWidth="1.5" fill="none" />
        <circle cx="11" cy="14" r="1.5" fill={color} />
        <circle cx="21" cy="14" r="1.5" fill={color} />
        <path d="M11 20Q16 24 21 20" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
    3: (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="14" fill={color} opacity="0.15" />
        <circle cx="16" cy="16" r="14" stroke={color} strokeWidth="1.5" fill="none" />
        <circle cx="11" cy="14" r="1.5" fill={color} />
        <circle cx="21" cy="14" r="1.5" fill={color} />
        <line x1="11" y1="21" x2="21" y2="21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    2: (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="14" fill={color} opacity="0.15" />
        <circle cx="16" cy="16" r="14" stroke={color} strokeWidth="1.5" fill="none" />
        <circle cx="11" cy="14" r="1.5" fill={color} />
        <circle cx="21" cy="14" r="1.5" fill={color} />
        <path d="M11 22Q16 18 21 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    ),
    1: (
      <svg width={s} height={s} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="14" fill={color} opacity="0.15" />
        <circle cx="16" cy="16" r="14" stroke={color} strokeWidth="1.5" fill="none" />
        <circle cx="11" cy="14" r="1.5" fill={color} />
        <circle cx="21" cy="14" r="1.5" fill={color} />
        <path d="M10 23Q16 17 22 23" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M23 12L24 15" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  };
  return <>{icons[value] || icons[3]}</>;
};

export default MoodIcon;
