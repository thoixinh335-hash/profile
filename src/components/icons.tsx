type IconProps = { className?: string; color?: string };

export function GithubIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#FFFFFF" className={className} aria-label="GitHub">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.35.78 1.05.78 2.13 0 1.54-.01 2.78-.01 3.16 0 .31.21.67.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function DiscordIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#5865F2" className={className} aria-label="Discord">
      <path d="M20.32 4.37a19.8 19.8 0 0 0-4.93-1.51 13.78 13.78 0 0 0-.64 1.28 18.27 18.27 0 0 0-5.5 0 12.64 12.64 0 0 0-.64-1.28c-1.71.29-3.37.8-4.93 1.51A20.26 20.26 0 0 0 .1 18.06a19.9 19.9 0 0 0 6.07 3.06c.49-.66.92-1.37 1.29-2.1a12.8 12.8 0 0 1-2.03-.98c.17-.12.34-.26.5-.39a14.2 14.2 0 0 0 12.14 0c.16.14.33.27.5.39-.65.38-1.33.71-2.04.97.37.74.8 1.44 1.3 2.11a19.84 19.84 0 0 0 6.07-3.06 20.22 20.22 0 0 0-3.58-13.69ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42s.95-2.43 2.16-2.43c1.21 0 2.18 1.1 2.16 2.43 0 1.34-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.15-1.08-2.15-2.42s.95-2.43 2.15-2.43c1.21 0 2.18 1.1 2.16 2.43 0 1.34-.95 2.42-2.16 2.42Z" />
    </svg>
  );
}

export function SpotifyIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#1DB954" className={className} aria-label="Spotify">
      <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm5.5 17.31a.75.75 0 0 1-1.03.25c-2.82-1.73-6.37-2.12-10.55-1.16a.75.75 0 1 1-.33-1.46c4.57-1.05 8.5-.6 11.66 1.34.35.22.46.68.25 1.03Zm1.47-3.27a.94.94 0 0 1-1.29.3c-3.23-1.99-8.15-2.56-11.97-1.4a.94.94 0 1 1-.54-1.79c4.37-1.32 9.79-.68 13.5 1.61.44.27.58.85.3 1.28Zm.13-3.4C15.24 8.33 8.88 8.12 5.19 9.24a1.12 1.12 0 1 1-.65-2.16c4.24-1.28 11.28-1.03 15.72 1.6a1.12 1.12 0 0 1-1.16 1.96Z" />
    </svg>
  );
}

export function TelegramIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="#26A5E4" className={className} aria-label="Telegram">
      <path d="M11.94 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm5.9 8.16-1.98 9.34c-.15.66-.54.82-1.1.51l-3-2.21-1.45 1.39c-.16.16-.3.3-.6.3l.21-3.05 5.56-5.02c.24-.21-.05-.33-.37-.12l-6.87 4.33-2.96-.93c-.64-.2-.66-.64.14-.95l11.57-4.46c.53-.2 1 .12.85.87Z" />
    </svg>
  );
}

export function MailIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Mail">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function GlobeIcon({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Website">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}
