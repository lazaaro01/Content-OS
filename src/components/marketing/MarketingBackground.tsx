/**
 * Fundo da landing (UI.pdf): brilhos roxo/azul + linhas onduladas, repetidos a cada ~900px
 * para cobrir a página inteira. Só usa tokens (color-mix + var), então acompanha o tema.
 */
const SEGMENTS = 9;

function Segment() {
  return (
    <div
      className="relative h-[900px] w-full shrink-0"
      style={{
        background: [
          "radial-gradient(520px circle at 82% 28%, color-mix(in srgb, var(--color-primary) 26%, transparent), transparent 70%)",
          "radial-gradient(680px circle at 16% 78%, color-mix(in srgb, var(--color-status-script) 16%, transparent), transparent 70%)",
        ].join(", "),
      }}
    >
      <svg
        className="absolute inset-0 size-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <path
          className="wave-line wave-line-a"
          d="M-60 330 C 200 430, 430 210, 700 290 S 1150 540, 1500 330"
          stroke="var(--color-primary)"
          strokeOpacity="0.35"
          strokeWidth="1.5"
        />
        <path
          className="wave-line wave-line-b"
          d="M-60 650 C 250 560, 460 710, 770 650 S 1200 440, 1500 570"
          stroke="var(--color-status-script)"
          strokeOpacity="0.3"
          strokeWidth="1.5"
        />
        <path
          className="wave-line wave-line-c"
          d="M900 900 C 1050 640, 1250 560, 1500 380"
          stroke="var(--color-primary)"
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

export function MarketingBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 flex flex-col overflow-hidden"
    >
      {Array.from({ length: SEGMENTS }, (_, i) => (
        <Segment key={i} />
      ))}
    </div>
  );
}
