/**
 * ==========================================================================
 * SIGMA LOGO COMPONENT - SVG VECTOR LOGO (OFFICIAL)
 * ==========================================================================
 * 
 * Komponen logo Sigma dalam bentuk SVG vector untuk branding aplikasi.
 * Logo menggunakan desain asli dari Sigma dengan dua warna hijau.
 * 
 * #Logo #Branding #SVG #VectorGraphics #OfficialLogo
 * 
 * PROPS:
 * - className: Optional CSS class untuk styling tambahan
 * - size: Ukuran logo ('sm' | 'md' | 'lg' | 'xl')
 * 
 * @author Sistem Payroll Team
 * @version 2.0.0
 * @since 2024-10-29
 * ==========================================================================
 */

interface SigmaLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function SigmaLogo({ className = '', size = 'md' }: SigmaLogoProps) {
  // Size mapping untuk width dan height
  const sizeMap = {
    sm: 48,
    md: 64,
    lg: 96,
    xl: 128
  };

  const dimension = sizeMap[size];

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        width={dimension}
        height={(dimension * 36) / 48}
        viewBox="0 0 48 36"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Main Sigma Symbol - Dark Green */}
        <path 
          className="st0" 
          fill="#09773A" 
          d="M4,1c12.9,0,25.7,0,39,0c0,2.7,0,5.4,0,8.2c-0.7,0-1.4,0-2.1,0c-0.5-1.3-0.9-2.7-1.4-4.1c-8.7,0-17.3,0-26.2,0
          c2.1,1.3,4.4,2.6,6.4,4.1c5.1,4.6,4.9,4.8,5.7,8.2c-0.1,2.8-0.7,4.3-2.7,6.2c-0.8,0.7-1.7,1.4-2.5,2.1c-0.6,0.5-0.6,0.5-1.3,1.1
          c-3.1,2.6-3.1,2.6-4.8,3.4c8.2,0,16.4,0,24.8,0c0.7-1.3,1.4-2.7,2.1-4.1c0.7,0,1.4,0,2.1,0c0,2.9,0,5.8,0,8.8c-12.9,0-25.7,0-39,0
          c3.5-6.6,11.7-11.2,17.7-15.6c-0.3-2-0.4-3.1-1.9-4.6c-0.5-0.3-0.9-0.7-1.4-1c-0.5-0.3-0.9-0.7-1.4-1.1c-0.4-0.3-0.7-0.5-1.1-0.8
          c0.3,0.3,0.6,0.5,0.9,0.8c0.4,0.4,0.8,0.7,1.2,1.1c0.6,0.5,0.6,0.5,1.2,1.1c0.9,1.2,0.9,1.2,0.9,3.9c-5.4-0.7-9.8-4.2-13.1-8.2
          C4.9,7.2,4,5.1,4,1"
        />
        
        {/* Accent Detail - Medium Green */}
        <path 
          className="st1" 
          fill="#197D43" 
          d="M23.9,16.6c0.5,0.2,0.9,0.4,1.4,0.7c-0.1,2.1-0.2,3.6-1.7,5.1c-1.1,0.8-2.2,1.6-3.3,2.4
          c-0.5-0.4-0.9-0.9-1.4-1.4c0.3-0.3,0.7-0.6,1-0.9c1.3-1.2,1.3-1.2,1.8-3.2c0.7,0,1.4,0,2.1,0C23.9,18.5,23.9,17.6,23.9,16.6z"
        />
      </svg>
    </div>
  );
}

/**
 * ==========================================================================
 * SIGMA LOGO WITH TEXT VARIANT
 * ==========================================================================
 * 
 * Variant logo dengan text horizontal di samping simbol
 * Menggunakan logo asli Sigma dari base64 data
 * 
 * #LogoVariant #HorizontalLayout #OfficialLogo
 * ==========================================================================
 */
interface SigmaLogoHorizontalProps {
  className?: string;
  showSubtitle?: boolean;
  subtitle?: string;
}

export function SigmaLogoHorizontal({ 
  className = '', 
  showSubtitle = false,
  subtitle = 'Sistem Payroll'
}: SigmaLogoHorizontalProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Logo Symbol - Official Sigma Logo */}
      <div className="w-16 h-12 bg-white rounded-lg flex items-center justify-center px-2 py-1.5">
        <svg
          viewBox="0 0 48 36"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path 
            fill="#09773A" 
            d="M4,1c12.9,0,25.7,0,39,0c0,2.7,0,5.4,0,8.2c-0.7,0-1.4,0-2.1,0c-0.5-1.3-0.9-2.7-1.4-4.1c-8.7,0-17.3,0-26.2,0
            c2.1,1.3,4.4,2.6,6.4,4.1c5.1,4.6,4.9,4.8,5.7,8.2c-0.1,2.8-0.7,4.3-2.7,6.2c-0.8,0.7-1.7,1.4-2.5,2.1c-0.6,0.5-0.6,0.5-1.3,1.1
            c-3.1,2.6-3.1,2.6-4.8,3.4c8.2,0,16.4,0,24.8,0c0.7-1.3,1.4-2.7,2.1-4.1c0.7,0,1.4,0,2.1,0c0,2.9,0,5.8,0,8.8c-12.9,0-25.7,0-39,0
            c3.5-6.6,11.7-11.2,17.7-15.6c-0.3-2-0.4-3.1-1.9-4.6c-0.5-0.3-0.9-0.7-1.4-1c-0.5-0.3-0.9-0.7-1.4-1.1c-0.4-0.3-0.7-0.5-1.1-0.8
            c0.3,0.3,0.6,0.5,0.9,0.8c0.4,0.4,0.8,0.7,1.2,1.1c0.6,0.5,0.6,0.5,1.2,1.1c0.9,1.2,0.9,1.2,0.9,3.9c-5.4-0.7-9.8-4.2-13.1-8.2
            C4.9,7.2,4,5.1,4,1"
          />
          <path 
            fill="#197D43" 
            d="M23.9,16.6c0.5,0.2,0.9,0.4,1.4,0.7c-0.1,2.1-0.2,3.6-1.7,5.1c-1.1,0.8-2.2,1.6-3.3,2.4
            c-0.5-0.4-0.9-0.9-1.4-1.4c0.3-0.3,0.7-0.6,1-0.9c1.3-1.2,1.3-1.2,1.8-3.2c0.7,0,1.4,0,2.1,0C23.9,18.5,23.9,17.6,23.9,16.6z"
          />
        </svg>
      </div>
      
      {/* Text */}
      <div className="flex flex-col">
        <span className="text-xl font-bold text-[#09773A] tracking-wide">SIGMA</span>
        {showSubtitle && (
          <span className="text-xs text-muted-foreground">{subtitle}</span>
        )}
      </div>
    </div>
  );
}
