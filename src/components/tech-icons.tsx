type IconProps = { className?: string };

// 1. TypeScript (Official Brand Blue #3178C6 & White Letters)
export function TypeScriptIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 128 128" className={className} aria-label="TypeScript">
      <rect width="128" height="128" rx="12" fill="#3178C6" />
      <path
        d="M72.5 86.8c1.8 3.1 4.5 5.6 8.3 7.3 3.8 1.8 8.1 2.6 13 2.6 4.4 0 8.3-.7 11.6-2.2 3.3-1.4 5.9-3.5 7.7-6.2 1.8-2.7 2.7-5.9 2.7-9.5 0-3.3-.8-6.1-2.4-8.5-1.6-2.4-3.8-4.3-6.6-5.8-2.8-1.5-6.5-2.9-11.2-4.1-3.7-1-6.6-1.9-8.7-2.9-2.1-.9-3.7-2.1-4.8-3.4-1.1-1.3-1.6-2.9-1.6-4.8 0-2 .6-3.8 1.9-5.3 1.3-1.5 3-2.6 5.3-3.4 2.2-.8 4.8-1.2 7.7-1.2 3.5 0 6.6.6 9.4 1.8 2.7 1.2 5 2.9 6.8 5.1l7.8-10.2c-2.9-2.8-6.6-5-11-6.5-4.5-1.5-9.6-2.3-15.3-2.3-5.2 0-9.9.8-14 2.4-4.1 1.6-7.3 3.9-9.6 6.8-2.3 3-3.5 6.6-3.5 10.9 0 3.7.9 6.8 2.6 9.4 1.7 2.6 4.1 4.7 7.1 6.3 3 1.6 7 3 12.1 4.2 3.7.9 6.6 1.9 8.8 2.9 2.2 1 3.9 2.2 5 3.6 1.2 1.4 1.7 3.1 1.7 5.1 0 2.2-.7 4.1-2.2 5.7-1.5 1.6-3.5 2.8-6 3.6-2.5.8-5.3 1.2-8.5 1.2-4.8 0-9-1-12.7-3-3.7-2-6.5-4.8-8.5-8.4l-11.1 9.4zM22.8 33.6h47.2V46H48.4v48.7H34.1V46H22.8V33.6z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// 2. React (Official React Cyan Atom #61DAFB)
export function ReactIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} aria-label="React">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

// 3. Next.js (Official High-Contrast Monogram)
export function NextJsIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 180 180" className={className} aria-label="Next.js">
      <circle cx="90" cy="90" r="88" fill="#000000" stroke="#FFFFFF" strokeWidth="5" />
      <path
        d="M149.5 157.5L69.1 54H54v72h12.1V69.4l73.9 95.4c3.3-2.2 6.5-4.6 9.5-7.3z"
        fill="url(#paint0_linear_next)"
      />
      <rect fill="url(#paint1_linear_next)" height="72" width="12" x="115" y="54" />
      <defs>
        <linearGradient id="paint0_linear_next" x1="109" x2="144.5" y1="116.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="paint1_linear_next" x1="121" x2="120.8" y1="54" y2="106.9" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 4. Golang (Official Brand Go Cyan Blue #00ADD8)
export function GolangIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Golang">
      <path
        fill="#00ADD8"
        d="M1.811 10.279c-.066-.3-.06-.607.018-.9.08-.293.238-.56.463-.78.225-.219.508-.383.824-.48.316-.096.653-.122.981-.077.567.078 1.077.34 1.488.752.411.412.673.922.75 1.488.078.567-.024 1.146-.293 1.644-.27.498-.702.894-1.233 1.13-.532.236-1.129.3-1.704.183-.574-.117-1.09-.434-1.468-.901-.378-.468-.588-1.045-.597-1.643-.009-.598.183-1.182.544-1.666L1.81 10.28zm21.467 1.554a7.904 7.904 0 0 0-.585-2.222 6.612 6.612 0 0 0-1.492-2.128 6.554 6.554 0 0 0-2.316-1.439 7.95 7.95 0 0 0-2.887-.52 8.016 8.016 0 0 0-3.037.585 7.026 7.026 0 0 0-2.457 1.687 7.424 7.424 0 0 0-1.624 2.534c-.394.99-.588 2.052-.57 3.123.018 1.07.248 2.124.678 3.097.43.972 1.055 1.838 1.835 2.54.78.702 1.702 1.229 2.704 1.548 1.002.32 2.058.444 3.1.365a8.212 8.212 0 0 0 2.977-.852 6.848 6.848 0 0 0 2.37-2.023l-2.404-1.572a4.34 4.34 0 0 1-1.399 1.267 4.908 4.908 0 0 1-1.792.57 5.16 5.16 0 0 1-1.897-.133 4.606 4.606 0 0 1-1.696-.867 4.417 4.417 0 0 1-1.196-1.547 5.148 5.148 0 0 1-.444-2.015h11.238c.03-.464.03-.93 0-1.393zm-8.358-1.572c.07-.63.31-1.227.7-1.723a3.53 3.53 0 0 1 1.488-1.078c.582-.228 1.221-.277 1.83-.14.61.137 1.162.474 1.583.968.42.493.682 1.107.75 1.751l-6.351.222z"
      />
    </svg>
  );
}

// 5. Rust (Authentic Rust Gear #F74C00 / #DEA584)
export function RustIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Rust">
      <path
        fill="#DEA584"
        d="M23.835 12a11.94 11.94 0 0 1-.87 4.463l-1.34-.413a1.49 1.49 0 0 0-.693 2.093l.794 1.157a11.96 11.96 0 0 1-3.23 3.23l-1.157-.794a1.49 1.49 0 0 0-2.093.693l.413 1.34a11.94 11.94 0 0 1-4.463.87 11.94 11.94 0 0 1-4.463-.87l.413-1.34a1.49 1.49 0 0 0-2.093-.693l-1.157.794a11.96 11.96 0 0 1-3.23-3.23l.794-1.157a1.49 1.49 0 0 0-.693-2.093l-1.34.413A11.94 11.94 0 0 1 .165 12c0-1.564.304-3.07.87-4.463l1.34.413a1.49 1.49 0 0 0 .693-2.093L2.274 4.7a11.96 11.96 0 0 1 3.23-3.23l1.157.794a1.49 1.49 0 0 0 2.093-.693l-.413-1.34A11.94 11.94 0 0 1 12 .165c1.564 0 3.07.304 4.463.87l-.413 1.34a1.49 1.49 0 0 0 2.093.693l1.157-.794a11.96 11.96 0 0 1 3.23 3.23l-.794 1.157a1.49 1.49 0 0 0 .693 2.093l1.34-.413c.566 1.393.87 2.899.87 4.463zm-11.835 7.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zm-3-11.25h3.75c1.242 0 2.25 1.008 2.25 2.25a2.247 2.247 0 0 1-1.35 2.062l1.6 3.938h-1.85l-1.35-3.375h-1.3v3.375H9V8.25zm1.75 3.125h1.875a.75.75 0 1 0 0-1.5H10.75v1.5z"
      />
    </svg>
  );
}

// 6. Linux Kernel (Full Authentic Tux: Tux Grey-Black, Pure White Belly, Yellow Feet & Beak #FFA500)
export function LinuxIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Linux">
      <ellipse cx="7.5" cy="21.5" rx="3.5" ry="1.5" fill="#FFA500" />
      <ellipse cx="16.5" cy="21.5" rx="3.5" ry="1.5" fill="#FFA500" />
      <path
        d="M12 2C9 2 7 4.5 7 8c0 1.5.4 3 1.1 4.2C7 13 6 15 6 17.5c0 1.8.6 3 1.5 3.5 1.2.6 3 .8 4.5.8s3.3-.2 4.5-.8c.9-.5 1.5-1.7 1.5-3.5 0-2.5-1-4.5-2.1-5.3.7-1.2 1.1-2.7 1.1-4.2 0-3.5-2-6-5-6z"
        fill="#E2E8F0"
      />
      <ellipse cx="12" cy="14.5" rx="3.2" ry="4.5" fill="#FFFFFF" />
      <polygon points="12,7.5 10.5,9.5 13.5,9.5" fill="#FFA500" />
      <circle cx="10.8" cy="6.2" r="0.75" fill="#000000" />
      <circle cx="13.2" cy="6.2" r="0.75" fill="#000000" />
    </svg>
  );
}

// 7. Docker (Official Docker Blue #2496ED Whale & Containers)
export function DockerIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Docker">
      <path
        fill="#2496ED"
        d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.186v1.887c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.186V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.186v1.887c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.186V9.006a.185.185 0 0 0-.184-.186H8.1a.185.185 0 0 0-.185.186v1.887c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.186V9.006a.185.185 0 0 0-.185-.186H5.136a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 0 0 .185-.186V9.006a.185.185 0 0 0-.185-.186H2.208a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185M23.79 11.78a5.553 5.553 0 0 0-2.454-1.442l-.472-.14-.298.406c-.464.63-.996 1.15-1.597 1.55-.26.17-.54.316-.833.434l-.497.202.164.51c.365 1.135.253 2.373-.314 3.428-.466.864-1.218 1.543-2.146 1.936-1.57.666-3.327.76-5.02.273-1.638-.47-3.1-1.378-4.225-2.625l-.36-.4-.44.304c-1.332.92-2.88 1.455-4.475 1.547-1.12.065-2.242-.112-3.298-.52-.397-.154-.775-.347-1.13-.578l-.348-.226-.2.366A5.257 5.257 0 0 0 0 19.345a5.54 5.54 0 0 0 2.215 4.095c1.554 1.173 3.524 1.776 5.534 1.696 4.398-.175 8.528-2.274 11.456-5.82 2.053-2.484 3.766-5.496 4.585-7.536z"
      />
    </svg>
  );
}

// 8. PostgreSQL (Official Elephant Blue #336791)
export function PostgresIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="PostgreSQL">
      <path
        fill="#336791"
        d="M12.023 0a12 12 0 0 0-4.004.686c-.512.18-.94.478-1.238.895-.298.417-.417.917-.346 1.433.09.658.45 1.258.98 1.636.53.378 1.19.544 1.84.457.77-.103 1.48-.445 2.04-.98.375-.36.68-.78.9-1.24.44.24.84.54 1.19.89.58.58.98 1.3 1.16 2.09.18.79.12 1.61-.17 2.37-.29.76-.8 1.41-1.46 1.87-.66.46-1.45.71-2.25.72H9.5c-.8 0-1.57-.27-2.2-.76-.63-.49-1.07-1.17-1.25-1.94-.18-.77-.1-1.58.23-2.3.33-.72.88-1.3 1.57-1.66-.45-.25-.97-.37-1.49-.35-.52.02-1.03.18-1.47.46-.44.28-.79.68-1.01 1.16-.22.48-.29 1.02-.2 1.54.12.7.46 1.34.97 1.82.51.48 1.17.77 1.87.82.16.88.58 1.68 1.2 2.29.62.61 1.42 1.01 2.29 1.14v3.19c-.83.2-1.6.59-2.26 1.13-.66.54-1.18 1.22-1.52 2-.34.78-.49 1.64-.43 2.5.06.86.32 1.69.76 2.42.44.73 1.05 1.33 1.78 1.75.73.42 1.55.65 2.39.67.84.02 1.67-.17 2.42-.55.75-.38 1.39-.93 1.87-1.62.48-.69.78-1.49.88-2.33.1-.84-.02-1.69-.35-2.48-.33-.79-.86-1.47-1.54-1.97-.68-.5-1.48-.82-2.32-.93v-3.14c.94-.11 1.82-.47 2.53-1.04.71-.57 1.24-1.33 1.52-2.19.28-.86.31-1.78.09-2.65-.22-.87-.69-1.66-1.34-2.27a6.22 6.22 0 0 0-2.37-1.44c-.75-.24-1.54-.36-2.33-.35z"
      />
    </svg>
  );
}

// 9. Redis (Official Red #DC382D)
export function RedisIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Redis">
      <path
        fill="#DC382D"
        d="M22.06 14.65l-9.53 4.77a1.18 1.18 0 0 1-1.06 0L1.94 14.65a1.18 1.18 0 0 1 0-2.11l9.53-4.77a1.18 1.18 0 0 1 1.06 0l9.53 4.77a1.18 1.18 0 0 1 0 2.11zM11.47 2.19a1.18 1.18 0 0 1 1.06 0l9.53 4.77a1.18 1.18 0 0 1 0 2.11L12.53 13.84a1.18 1.18 0 0 1-1.06 0L1.94 9.07a1.18 1.18 0 0 1 0-2.11l9.53-4.77zM1.94 17.47l9.53 4.77a1.18 1.18 0 0 0 1.06 0l9.53-4.77a1.18 1.18 0 0 0 0-2.11l-1.59-.8-7.41 3.71a2.36 2.36 0 0 1-2.12 0l-7.41-3.71-1.59.8a1.18 1.18 0 0 0 0 2.11z"
      />
    </svg>
  );
}

// 10. Node.js (Official Brand Green #5FA04E Hexagon)
export function NodeJsIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Node.js">
      <path
        fill="#5FA04E"
        d="M12 1.608l10 5.774v11.547l-10 5.774-10-5.774v-11.547l10-5.774zm-.137 3.513c-.347 0-.69.09-1 .27l-4.72 2.72c-.615.356-.997 1.018-.997 1.73v5.44c0 .712.382 1.374.997 1.73l4.72 2.72c.62.358 1.38.358 2 0l4.72-2.72c.615-.356.997-1.018.997-1.73v-5.44c0-.712-.382-1.374-.997-1.73l-4.72-2.72c-.31-.18-.653-.27-1-.27z"
      />
    </svg>
  );
}

// 11. Tailwind CSS (Official Brand Cyan #06B6D4)
export function TailwindIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Tailwind CSS">
      <path
        fill="#06B6D4"
        d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"
      />
    </svg>
  );
}

// 12. Python (Official Dual Brand Blue #3776AB & Gold #FFD438)
export function PythonIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Python">
      <path
        fill="#3776AB"
        d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.753h5.81v.826H3.85s-3.85.438-3.85 6.26c0 5.822 3.36 5.61 3.36 5.61h2.008v-2.82c0-3.23 2.748-3.04 2.748-3.04h5.688s2.624.04 2.624-2.563V3.812S16.906 0 11.914 0zm-1.68 1.83a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1z"
      />
      <path
        fill="#FFD438"
        d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.006-2.753h-5.81v-.826h8.166s3.85-.438 3.85-6.26c0-5.822-3.36-5.61-3.36-5.61h-2.008v2.82c0 3.23-2.748 3.04-2.748 3.04H10.15s-2.624-.04-2.624 2.563v5.875S7.094 24 12.086 24zm1.68-1.83a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z"
      />
    </svg>
  );
}


// 13. Visual Studio Code (Clean Vector)
export function VsCodeIcon({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="VS Code">
      <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.27a.999.999 0 0 0-.005 1.419L4.05 12 .322 15.31a.999.999 0 0 0 .005 1.42l1.322 1.21a.999.999 0 0 0 1.276.058l4.12-3.128 9.46 8.63a1.49 1.49 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zM18 16.68l-6.5-4.68L18 7.32v9.36z" />
    </svg>
  );
}

// 14. Windows 11 (Clean 4-pane Grid)
export function WindowsIcon({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Windows 11">
      <path d="M0 0h11v11H0zM13 0h11v11H13zM0 13h11v11H0zM13 13h11v11H13z" />
    </svg>
  );
}

// 15. Web Browsers (Firefox & Chrome Wireframe Globe)
export function BrowserIcon({ className = "size-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Browsers"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

// 16. Arduino (Clean Microcontroller Infinity Vector)
export function ArduinoIcon({ className = "size-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-label="Arduino">
      <path d="M17.5 7A5 5 0 0 0 13 10.15 5 5 0 0 0 6.5 7 5.5 5.5 0 0 0 1 12.5 5.5 5.5 0 0 0 6.5 18a5 5 0 0 0 4.5-3.15A5 5 0 0 0 17.5 18a5.5 5.5 0 0 0 5.5-5.5A5.5 5.5 0 0 0 17.5 7zm-11 9A3.5 3.5 0 0 1 3 12.5 3.5 3.5 0 0 1 6.5 9a3.3 3.3 0 0 1 2.9 1.7L8 12.5l1.4 1.8a3.3 3.3 0 0 1-2.9 1.7zm11 0a3.3 3.3 0 0 1-2.9-1.7l1.4-1.8-1.4-1.8A3.3 3.3 0 0 1 17.5 9a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5zm-12.5-4h3v1h-3zm11 0h1v-1h1v1h1v1h-1v1h-1v-1h-1z" />
    </svg>
  );
}

// 17. Kali Linux (Official Kali Dragon Emblem)
export function KaliLinuxIcon({ className = "size-5" }: IconProps) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-label="Kali Linux"
    >
      <path d="M12.778 5.943s-1.97-.13-5.327.92c-3.42 1.07-5.36 2.587-5.36 2.587s5.098-2.847 10.852-3.008zm7.351 3.095l.257-.017s-1.468-1.78-4.278-2.648c1.58.642 2.954 1.493 4.021 2.665zm.42.74c.039-.068.166.217.263.337.004.024.01.039-.045.027-.005-.025-.013-.032-.013-.032s-.135-.08-.177-.137c-.041-.057-.049-.157-.028-.195zm3.448 8.479s.312-3.578-5.31-4.403a18.277 18.277 0 0 0-2.524-.187c-4.506.06-4.67-5.197-1.275-5.462 1.407-.116 3.087.643 4.73 1.408-.007.204.002.385.136.552.134.168.648.35.813.445.164.094.691.43 1.014.85.07-.131.654-.512.654-.512s-.14.003-.465-.119c-.326-.122-.713-.49-.722-.511-.01-.022-.015-.055.06-.07.059-.049-.072-.207-.13-.265-.058-.058-.445-.716-.454-.73-.009-.016-.012-.031-.04-.05-.085-.027-.46.04-.46.04s-.575-.283-.774-.893c.003.107-.099.224 0 .469-.3-.127-.558-.344-.762-.88-.12.305 0 .499 0 .499s-.707-.198-.82-.85c-.124.293 0 .469 0 .469s-1.153-.602-3.069-.61c-1.283-.118-1.55-2.374-1.43-2.754 0 0-1.85-.975-5.493-1.406-3.642-.43-6.628-.065-6.628-.065s6.45-.31 11.617 1.783c.176.785.704 2.094.989 2.723-.815.563-1.733 1.092-1.876 2.97-.143 1.878 1.472 3.53 3.474 3.58 1.9.102 3.214.116 4.806.942 1.52.84 2.766 3.4 2.89 5.703.132-1.709-.509-5.383-3.5-6.498 4.181.732 4.549 3.832 4.549 3.832zM12.68 5.663l-.15-.485s-2.484-.441-5.822-.204C3.37 5.211 0 6.38 0 6.38s6.896-1.735 12.68-.717Z" />
    </svg>
  );
}

// 18. JavaScript (Official Yellow Badge #F7DF1E)
export function JavaScriptIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="JavaScript">
      <rect width="24" height="24" rx="3" fill="#F7DF1E" />
      <path
        d="M6.5 18.5l1.8-1.1c.4.7.7 1.2 1.5 1.2.8 0 1.3-.3 1.3-1.4v-6.7h2.2v6.8c0 2.2-1.3 3.2-3.4 3.2-1.8 0-2.9-.9-3.4-2zm8.7-1.3l1.8-1c.5.8 1.1 1.4 2.2 1.4 1 0 1.6-.5 1.6-1.2 0-.8-.6-1.1-1.8-1.6l-.6-.3c-1.8-.8-3-1.8-3-3.9 0-2 1.5-3.5 3.9-3.5 1.7 0 2.9.6 3.8 2.2l-1.7 1.1c-.4-.7-.9-1-2.1-1-1 0-1.6.5-1.6 1.1 0 .7.5 1 1.6 1.5l.6.3c2.1.9 3.3 1.9 3.3 4.1 0 2.4-1.9 3.7-4.2 3.7-2.3 0-3.8-1.2-4.5-2.9z"
        fill="#000000"
      />
    </svg>
  );
}

// 19. PHP (Official Purple-Blue #777BB4)
export function PhpIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="PHP">
      <path
        fill="#777BB4"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4.7 13.5H5.8L7.1 8.5h2.5c1.4 0 2.3.8 2.1 2.2-.2 1.6-1.5 2.8-3 2.8H7.7l-.4 2zm2.1-4.2c.6 0 1-.5 1.1-1.1.1-.6-.2-1.1-.8-1.1H8.5l-.4 2.2h1.6zm6.3 4.2h-1.5l.7-3.5h-1.4l-.7 3.5H11l1.3-7h1.5l-.4 2.3h1.4l.4-2.3h1.5l-1.5 7zm4.5-2.8c-.2 1.6-1.5 2.8-3 2.8h-1l-.4 2h-1.5l1.3-7h2.5c1.4 0 2.3.8 2.1 2.2zm-2.4-1.4c.6 0 1-.5 1.1-1.1.1-.6-.2-1.1-.8-1.1h-1.2l-.4 2.2h1.3z"
      />
    </svg>
  );
}

// 20. MySQL (Official Dolphin Blue #00758F & Orange)
export function MySqlIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="MySQL">
      <path
        fill="#00758F"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.7 12.8c-.4.5-.9.9-1.5 1.1-.6.2-1.2.3-1.8.2-1.1-.1-2.1-.6-2.9-1.3-.8-.7-1.4-1.6-1.7-2.7-.3-1.1-.2-2.2.3-3.2.5-1 1.3-1.8 2.3-2.2 1-.4 2.1-.4 3.1 0 .6.2 1.1.6 1.5 1.1l-1.3 1.2c-.3-.4-.6-.6-1-.8-.6-.2-1.3-.2-1.9 0-.6.2-1.1.7-1.4 1.3-.3.6-.4 1.3-.2 1.9.2.6.5 1.2 1 1.6.5.4 1.1.7 1.8.7.4 0 .7-.1 1.1-.2.3-.2.6-.4.8-.7l1.3 1.3z"
      />
      <circle cx="16.5" cy="8.5" r="1.5" fill="#F29111" />
    </svg>
  );
}

// 21. C / C++ (Official Blue Shield #00599C)
export function CppIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="C++">
      <path
        fill="#00599C"
        d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8l7 3.5v7.4l-7 3.5-7-3.5V8.3l7-3.5z"
      />
      <path
        fill="#00599C"
        d="M10.5 9.5c-.5-.4-1.1-.6-1.8-.6-1.4 0-2.4 1.1-2.4 2.6s1 2.6 2.4 2.6c.7 0 1.3-.2 1.8-.6l.7 1.2c-.7.6-1.6.9-2.5.9-2.2 0-3.9-1.7-3.9-4.1s1.7-4.1 3.9-4.1c1 0 1.8.3 2.5.9l-.7 1.2zm3.5 2h-1v-1h-1v1h-1v1h1v1h1v-1h1v-1zm4 0h-1v-1h-1v1h-1v1h1v1h1v-1h1v-1z"
      />
    </svg>
  );
}

// 22. Git (Official Git Orange #F05032)
export function GitIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Git">
      <path
        fill="#F05032"
        d="M21.6 10.9L13.1 2.4c-.5-.5-1.4-.5-1.9 0L9.4 4.2l2.4 2.4c.5-.2 1.1-.1 1.5.3.4.4.5 1 .3 1.5l2.3 2.3c.5-.2 1.1-.1 1.5.3.6.6.6 1.6 0 2.2s-1.6.6-2.2 0c-.4-.4-.5-1-.3-1.5l-2.2-2.2v5.7c.2.1.3.3.4.5.6.6.6 1.6 0 2.2s-1.6.6-2.2 0c-.6-.6-.6-1.6 0-2.2.2-.2.4-.4.6-.5V8.8c-.2-.1-.4-.3-.6-.5-.5-.5-.5-1.3 0-1.8L9.3 4.3 2.4 11.2c-.5.5-.5 1.4 0 1.9l8.5 8.5c.5.5 1.4.5 1.9 0l8.8-8.8c.5-.5.5-1.4 0-1.9z"
      />
    </svg>
  );
}

// 23. Bash / Shell (Terminal Prompt #4EAA25)
export function BashIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Bash">
      <rect width="24" height="24" rx="4" fill="#293138" />
      <path
        d="M5 8l4 4-4 4M12 16h6"
        stroke="#4EAA25"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// 24. GraphQL (Official Pink Hexagon #E10098)
export function GraphqlIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="GraphQL">
      <path
        fill="#E10098"
        d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm0 2.2l6.8 4v8L12 20.1l-6.8-3.9v-8L12 4.2zM12 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-5 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
      />
    </svg>
  );
}

// 25. Prisma ORM (Prism Indigo #5A67D8)
export function PrismaIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Prisma">
      <path
        fill="#2D3748"
        d="M12 1L2 21.5h20L12 1zm0 4.2l6.8 14.3H5.2L12 5.2z"
      />
      <path
        fill="#5A67D8"
        d="M12 5.2l6.8 14.3H12V5.2z"
      />
    </svg>
  );
}

// 26. Nginx (Official Green #009639)
export function NginxIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Nginx">
      <path
        fill="#009639"
        d="M12 2L2 7.8v11.4L12 22l10-2.8V7.8L12 2zm-3 14.2V8.8l2 2.6v4.8H9zm6 0h-2V11l-2-2.6v-1.6h2v2.2l2 2.6V7.8h2v8.4z"
      />
    </svg>
  );
}

// 27. FastAPI (Official Teal #009688 & White Bolt)
export function FastApiIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="FastAPI">
      <circle cx="12" cy="12" r="11" fill="#009688" />
      <path d="M13 3L6 14h5l-1 7 8-12h-5l1-6z" fill="#FFFFFF" />
    </svg>
  );
}

// 28. Bun (Official Cream Dumpling #FBF0DF)
export function BunIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Bun">
      <path
        fill="#FBF0DF"
        stroke="#E3A857"
        strokeWidth="1.5"
        d="M12 4c-4.5 0-8 3-8 7 0 2.5 1.5 5 4 6.2V20h8v-2.8c2.5-1.2 4-3.7 4-6.2 0-4-3.5-7-8-7z"
      />
      <circle cx="9.5" cy="11.5" r="1.2" fill="#2C2416" />
      <circle cx="14.5" cy="11.5" r="1.2" fill="#2C2416" />
      <path d="M11 14.5c.6.5 1.4.5 2 0" stroke="#2C2416" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

// 29. WebSocket (Official Orange Radial #FF6600)
export function WebSocketIcon({ className = "size-3.5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="WebSocket">
      <path
        fill="#FF6600"
        d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V15a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2V8a4 4 0 0 0-4 4v1a4 4 0 0 0 4 4zm4-4a4 4 0 0 0-4-4V7a6 6 0 0 1 6 6z"
      />
    </svg>
  );
}
