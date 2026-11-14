/**
 * "Equipotential lines": the calm counterpart of the old lines-of-force field.
 *
 * Two poles A and B. The solid hairlines are the Apollonian circles around A
 * (points whose distance ratio to A and B is constant — the equipotentials of
 * a dipole); the dotted arcs are the orthogonal family through both poles (the
 * field lines). Only A sits on the plate; B lies off-sheet, so the rings nest
 * eccentrically and drift away from it. Static geometry, computed at build
 * time, drawn as an SVG and masked so it fades before reaching the type.
 */

const A = { x: 0, y: 0 };
const HALF = 60; // half the distance between the poles, in viewBox units
const ANGLE = (-14 * Math.PI) / 180; // B lies up and toward the far edge
const dir = { x: Math.cos(ANGLE), y: Math.sin(ANGLE) };
const normal = { x: -dir.y, y: dir.x };
const B = { x: A.x + dir.x * HALF * 2, y: A.y + dir.y * HALF * 2 };
const mid = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };

const round = (value: number) => Math.round(value * 100) / 100;

// Equipotentials: |PA| = k |PB|. Spacing grows like the potential falls off.
const equipotentials = [0.05, 0.1, 0.16, 0.23, 0.31, 0.4, 0.5, 0.61].map(
  (k, index) => {
    const offset = (HALF * (1 + k * k)) / (1 - k * k) - HALF;
    return {
      cx: round(A.x - dir.x * offset),
      cy: round(A.y - dir.y * offset),
      r: round((2 * HALF * k) / (1 - k * k)),
      index,
    };
  },
);

// Field lines: every circle through A and B, centred on their bisector.
const fieldLines = [-260, -110, -48, -14, 18, 52, 120, 280].map((c, index) => ({
  cx: round(mid.x + normal.x * c),
  cy: round(mid.y + normal.y * c),
  r: round(Math.hypot(HALF, c)),
  index,
}));

export function HeroPlate() {
  return (
    <div className="landing__plate" aria-hidden="true">
      <svg
        className="landing__plate-svg"
        viewBox="-100 -100 200 200"
        focusable="false"
      >
        <g className="landing__field-lines">
          {fieldLines.map(({ cx, cy, r, index }) => (
            <circle key={index} cx={cx} cy={cy} r={r} data-index={index} />
          ))}
        </g>
        <g className="landing__equipotentials">
          {equipotentials.map(({ cx, cy, r, index }) => (
            <circle
              key={index}
              cx={cx}
              cy={cy}
              r={r}
              style={{ "--i": index } as React.CSSProperties}
            />
          ))}
        </g>
        <circle className="landing__pole-ring" cx={A.x} cy={A.y} r={2.6} />
        <circle className="landing__pole" cx={A.x} cy={A.y} r={0.95} />
      </svg>
    </div>
  );
}
