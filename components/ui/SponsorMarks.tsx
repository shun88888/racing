import type { SVGProps } from "react";

type MarkProps = SVGProps<SVGSVGElement>;

const VB = "0 0 260 80";

const osw: React.CSSProperties = {
  fontFamily: "var(--font-oswald), Oswald, Arial, sans-serif",
  fontWeight: 700,
};

const inter: React.CSSProperties = {
  fontFamily: "var(--font-inter), Inter, Arial, sans-serif",
  fontWeight: 500,
};

function Base({ children, ...rest }: MarkProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox={VB}
      xmlns="http://www.w3.org/2000/svg"
      fill="#ffffff"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function ApexMotors(p: MarkProps) {
  return (
    <Base {...p}>
      <polygon points="20,58 36,22 52,58 46,58 36,36 26,58" />
      <text x="62" y="52" fontSize="28" letterSpacing="2" style={osw}>
        APEX
      </text>
      <text x="62" y="68" fontSize="9" letterSpacing="3" opacity="0.75" style={inter}>
        MOTORS
      </text>
    </Base>
  );
}

export function VeloceTech(p: MarkProps) {
  return (
    <Base {...p}>
      <text
        x="20"
        y="50"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontSize="32"
        fontWeight="700"
      >
        Veloce
      </text>
      <rect x="20" y="55" width="94" height="2" />
      <text x="20" y="70" fontSize="9" letterSpacing="4" opacity="0.75" style={inter}>
        TECHNOLOGIES
      </text>
    </Base>
  );
}

export function CircuitDynamics(p: MarkProps) {
  return (
    <Base {...p}>
      <circle cx="30" cy="40" r="16" fill="none" stroke="#ffffff" strokeWidth="2.5" />
      <circle cx="30" cy="40" r="6" />
      <path
        d="M14 40 L22 40 M38 40 L46 40"
        stroke="#ffffff"
        strokeWidth="2.5"
      />
      <text x="56" y="38" fontSize="18" letterSpacing="2" style={{ ...osw, fontWeight: 600 }}>
        CIRCUIT
      </text>
      <text x="56" y="58" fontSize="11" letterSpacing="3" opacity="0.85" style={inter}>
        DYNAMICS
      </text>
    </Base>
  );
}

export function Torque(p: MarkProps) {
  return (
    <Base {...p}>
      <rect x="18" y="20" width="10" height="40" />
      <text x="38" y="56" fontSize="38" letterSpacing="3" style={osw}>
        TORQUE
      </text>
    </Base>
  );
}

export function ForgeIndustries(p: MarkProps) {
  return (
    <Base {...p}>
      <path d="M20 50 L30 30 L40 50 Z" />
      <path d="M40 50 L50 30 L60 50 Z" opacity="0.55" />
      <text x="70" y="46" fontSize="20" letterSpacing="3" style={osw}>
        FORGE
      </text>
      <text x="70" y="62" fontSize="9" letterSpacing="3" opacity="0.85" style={inter}>
        INDUSTRIES
      </text>
    </Base>
  );
}

export function NitroPlus(p: MarkProps) {
  return (
    <Base {...p}>
      <text x="20" y="56" fontSize="34" letterSpacing="3" style={osw}>
        NITRO
      </text>
      <text x="160" y="44" fontSize="40" style={osw}>
        +
      </text>
    </Base>
  );
}

export function Kinetica(p: MarkProps) {
  return (
    <Base {...p}>
      <path
        d="M18 58 Q26 30 34 58 Q42 20 50 58"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <text x="60" y="54" fontSize="26" letterSpacing="6" style={{ ...inter, fontWeight: 300 }}>
        KINETICA
      </text>
    </Base>
  );
}

export function ZerogAero(p: MarkProps) {
  return (
    <Base {...p}>
      <path d="M18 50 L40 28 L60 30 L42 52 Z" />
      <path d="M18 50 L40 28 L38 40 L22 56 Z" opacity="0.55" />
      <text x="72" y="42" fontSize="18" letterSpacing="3" style={{ ...osw, fontWeight: 600 }}>
        ZEROG
      </text>
      <text x="72" y="60" fontSize="10" letterSpacing="4" opacity="0.85" style={inter}>
        AERODYNAMICS
      </text>
    </Base>
  );
}

export function PyroRacing(p: MarkProps) {
  return (
    <Base {...p}>
      <path d="M28 20 Q22 36 30 46 Q24 42 24 50 Q22 60 32 62 Q44 62 42 48 Q50 52 46 38 Q42 32 38 24 Q36 34 30 32 Q30 24 28 20 Z" />
      <text x="56" y="46" fontSize="24" letterSpacing="2" style={osw}>
        PYRO
      </text>
      <text x="56" y="64" fontSize="10" letterSpacing="4" opacity="0.85" style={inter}>
        RACING
      </text>
    </Base>
  );
}

export function PrimaLab(p: MarkProps) {
  return (
    <Base {...p}>
      <rect x="20" y="24" width="32" height="32" fill="none" stroke="#ffffff" strokeWidth="2" />
      <text
        x="36"
        y="48"
        fontFamily="Georgia, serif"
        fontSize="22"
        fontWeight="700"
        textAnchor="middle"
      >
        P
      </text>
      <text x="60" y="44" fontSize="22" letterSpacing="5" style={{ ...inter, fontWeight: 300 }}>
        PRIMA
      </text>
      <text x="60" y="60" fontSize="9" letterSpacing="3" opacity="0.85" style={inter}>
        LABORATORIES
      </text>
    </Base>
  );
}

export function Catalyst(p: MarkProps) {
  return (
    <Base {...p}>
      <circle cx="30" cy="40" r="4" />
      <circle cx="30" cy="40" r="12" fill="none" stroke="#ffffff" strokeWidth="1.5" />
      <circle
        cx="30"
        cy="40"
        r="18"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <text x="56" y="48" fontSize="22" letterSpacing="4" style={{ ...osw, fontWeight: 600 }}>
        CATALYST
      </text>
    </Base>
  );
}

export function RedlineMach(p: MarkProps) {
  return (
    <Base {...p}>
      <path d="M18 30 L50 30 L62 40 L50 50 L18 50 Z" opacity="0.35" />
      <text x="22" y="46" fontSize="14" letterSpacing="2" style={osw}>
        RED
      </text>
      <text x="72" y="38" fontSize="18" letterSpacing="2" style={osw}>
        REDLINE
      </text>
      <text x="72" y="56" fontSize="10" letterSpacing="5" opacity="0.85" style={inter}>
        MACH WORKS
      </text>
    </Base>
  );
}

export function TitanSteel(p: MarkProps) {
  return (
    <Base {...p}>
      <polygon points="20,22 46,22 38,58 28,58" />
      <polygon points="28,22 46,22 38,40 28,40" opacity="0.55" />
      <text x="56" y="44" fontSize="22" letterSpacing="3" style={osw}>
        TITAN
      </text>
      <text x="56" y="60" fontSize="10" letterSpacing="5" opacity="0.85" style={inter}>
        STEEL CO.
      </text>
    </Base>
  );
}

export function QuantumDrive(p: MarkProps) {
  return (
    <Base {...p}>
      <circle cx="30" cy="40" r="14" fill="none" stroke="#ffffff" strokeWidth="2" />
      <circle
        cx="30"
        cy="40"
        r="14"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeDasharray="44 44"
        opacity="0.5"
        transform="rotate(-45 30 40)"
      />
      <text x="54" y="44" fontSize="16" letterSpacing="4" style={{ ...inter, fontWeight: 500 }}>
        QUANTUM
      </text>
      <text x="54" y="58" fontSize="9" letterSpacing="4" opacity="0.85" style={inter}>
        DRIVE SYSTEMS
      </text>
    </Base>
  );
}

export type MarkComponent = (p: MarkProps) => React.JSX.Element;

export const SPONSOR_MARKS: { id: string; name: string; tier: "gold" | "silver" | "bronze" | "partner"; Mark: MarkComponent }[] = [
  { id: "s01", name: "APEX MOTORS", tier: "gold", Mark: ApexMotors },
  { id: "s02", name: "VELOCE TECH", tier: "gold", Mark: VeloceTech },
  { id: "s03", name: "CIRCUIT DYNAMICS", tier: "silver", Mark: CircuitDynamics },
  { id: "s04", name: "TORQUE", tier: "gold", Mark: Torque },
  { id: "s05", name: "FORGE INDUSTRIES", tier: "silver", Mark: ForgeIndustries },
  { id: "s06", name: "NITRO+", tier: "bronze", Mark: NitroPlus },
  { id: "s07", name: "KINETICA", tier: "silver", Mark: Kinetica },
  { id: "s08", name: "ZEROG AERO", tier: "silver", Mark: ZerogAero },
  { id: "s09", name: "PYRO RACING", tier: "bronze", Mark: PyroRacing },
  { id: "s10", name: "PRIMA LAB", tier: "partner", Mark: PrimaLab },
  { id: "s11", name: "CATALYST", tier: "silver", Mark: Catalyst },
  { id: "s12", name: "REDLINE MACH", tier: "bronze", Mark: RedlineMach },
  { id: "s13", name: "TITAN STEEL", tier: "gold", Mark: TitanSteel },
  { id: "s14", name: "QUANTUM DRIVE", tier: "partner", Mark: QuantumDrive },
];
