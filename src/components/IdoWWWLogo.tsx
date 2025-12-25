import type { CSSProperties } from "react";

type LogoSize = 'small' | 'medium' | 'large' | 'xlarge';
type LogoMode = 'light' | 'dark';

interface IdoWWWLogoProps {
  size?: LogoSize;
  mode?: LogoMode;
  animated?: boolean;
  className?: string;
  style?: CSSProperties;
}

const IdoWWWLogo: React.FC<IdoWWWLogoProps> = ({ 
  size = 'medium',
  mode = 'light',
  animated = true,
  className = '',
  style = {}
}) => {
  const sizes: Record<LogoSize, { box: number; icon: number; ido: number; www: number; gap: number }> = {
    small: { box: 24, icon: 14, ido: 6, www: 16, gap: 6 },
    medium: { box: 36, icon: 20, ido: 8, www: 26, gap: 9 },
    large: { box: 48, icon: 28, ido: 11, www: 34, gap: 12 },
    xlarge: { box: 64, icon: 36, ido: 14, www: 44, gap: 16 }
  };

  const colors: Record<LogoMode, { primary: string; neutral: string; bg: string }> = {
    light: { primary: '#4a546a', neutral: '#9ca9c9', bg: '#ffffff' },
    dark: { primary: '#9ca9c9', neutral: '#6a7590', bg: '#1a1d28' }
  };

  const s = sizes[size];
  const c = colors[mode];
  const wwwWidth = s.www * 3.5;
  const totalWidth = s.box + s.gap + wwwWidth;
  const textGap = s.ido * 0.1;
  const textHeight = s.ido + textGap + s.www;
  const totalHeight = Math.max(s.box, textHeight);

  return (
    <svg 
      width={totalWidth} 
      height={totalHeight} 
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      {animated && (
        <style>
          {`
            @keyframes idowww-blink {
              0%, 49% { opacity: 1; }
              50%, 99% { opacity: 0.3; }
              100% { opacity: 1; }
            }
            .idowww-blink { animation: idowww-blink 1.2s ease-in-out infinite; }
          `}
        </style>
      )}
      <circle cx={s.box/2} cy={totalHeight/2} r={s.box/2} fill={c.primary} />
      <text 
        x={s.box/2} 
        y={totalHeight/2 + s.icon/3} 
        textAnchor="middle" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontSize={s.icon} 
        fontWeight="700" 
        fill={c.bg}
        className={animated ? 'idowww-blink' : ''}
      >
        I
      </text>
      <g transform={`translate(${s.box + s.gap}, ${totalHeight/2 - textHeight/4})`}>
        <text x="0" y="0" fontFamily="system-ui" fontSize={s.ido} fontWeight="600" letterSpacing="-0.02em" fill={c.neutral}>Ido</text>
        <text x="0" y={s.ido + s.www * 0.5} fontFamily="Georgia, serif" fontSize={s.www} fontWeight="700" fontStyle="italic" letterSpacing="0.05em" fill={c.primary}>WWW</text>
      </g>
    </svg>
  );
};

export default IdoWWWLogo;