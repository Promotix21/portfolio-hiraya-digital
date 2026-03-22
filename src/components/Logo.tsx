interface LogoProps {
  className?: string;
  variant?: 'blue' | 'gradient' | 'white';
  showText?: boolean;
  size?: number;
}

export default function Logo({
  className = '',
  variant = 'blue',
  showText = true,
  size = 40,
}: LogoProps) {
  const colors = {
    blue: { primary: '#3B5998', secondary: '#2D4A7A' },
    gradient: { primary: '#F5A623', secondary: '#F7DC6F' },
    white: { primary: '#FFFFFF', secondary: '#E0E0E0' },
  };

  const { primary, secondary } = colors[variant];
  const textColor =
    variant === 'white' ? '#FFFFFF' : variant === 'blue' ? '#3B5998' : '#F5A623';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Hiraya Digital logo"
      >
        {/* Origami bird - geometric triangular shapes */}
        {/* Head */}
        <polygon points="30,28 38,22 35,32" fill={primary} />
        {/* Upper body / back */}
        <polygon points="38,22 62,10 52,35" fill={primary} />
        {/* Wing top */}
        <polygon points="62,10 78,8 65,30" fill={secondary} />
        {/* Wing accent */}
        <polygon points="70,14 78,8 72,22" fill={primary} opacity="0.8" />
        {/* Body center */}
        <polygon points="35,32 52,35 48,55" fill={primary} />
        {/* Lower body left */}
        <polygon points="38,22 52,35 35,32" fill={secondary} opacity="0.9" />
        {/* Body right */}
        <polygon points="52,35 65,30 55,58" fill={primary} />
        {/* Tail upper */}
        <polygon points="48,55 55,58 42,78" fill={secondary} />
        {/* Tail lower */}
        <polygon points="42,78 55,58 52,80" fill={primary} opacity="0.85" />
        {/* Tail accent */}
        <polygon points="52,80 55,58 60,72" fill={secondary} opacity="0.7" />
      </svg>
      {showText && (
        <span
          className="text-lg font-bold tracking-tight uppercase"
          style={{ color: textColor, letterSpacing: '0.08em' }}
        >
          Hiraya Digital
        </span>
      )}
    </div>
  );
}
