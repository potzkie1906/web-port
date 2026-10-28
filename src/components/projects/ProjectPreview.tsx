import type { ProjectPreviewKind } from '../../types'
import './ProjectPreview.css'

/*
  Illustrations shown on project cards until you add real screenshots.
  They're drawn with SVG and use the theme colors, so they work in both themes.
*/

export function ProjectPreview({ kind }: { kind: ProjectPreviewKind }) {
  switch (kind) {
    case 'transit':
      return <TransitPreview />
    case 'lifehub':
      return <LifeHubPreview />
    case 'safetrack':
      return <SafeTrackPreview />
    case 'lostfound':
      return <LostFoundPreview />
  }
}

/* City blocks for the map illustrations: [x, y, width, height]. */
const BLOCKS: Array<[number, number, number, number]> = [
  [36, 40, 70, 44],
  [118, 40, 54, 44],
  [184, 40, 84, 44],
  [280, 40, 60, 44],
  [352, 40, 76, 44],
  [440, 40, 58, 44],
  [510, 40, 94, 44],
  [36, 96, 52, 58],
  [100, 96, 88, 58],
  [200, 96, 64, 58],
  [276, 96, 84, 58],
  [372, 96, 54, 58],
  [438, 96, 90, 58],
  [540, 96, 64, 58],
  [36, 166, 80, 50],
  [128, 166, 60, 50],
  [200, 166, 92, 50],
  [304, 166, 58, 50],
  [374, 166, 86, 50],
  [472, 166, 62, 50],
  [546, 166, 58, 50],
  [100, 228, 64, 46],
  [176, 228, 80, 46],
  [268, 228, 70, 46],
  [350, 228, 90, 46],
  [452, 228, 66, 46],
  [530, 228, 74, 46],
  [300, 286, 60, 42],
  [372, 286, 84, 42],
  [468, 286, 60, 42],
  [540, 286, 64, 42],
]

const BUS = 'M196 262 C 236 240, 262 214, 318 206 S 430 170, 470 132 S 560 84, 612 66'
const JEEPNEY = 'M196 262 C 214 222, 236 190, 262 160 S 300 92, 326 34'
const VAN = 'M196 262 C 250 286, 320 300, 400 296 S 530 306, 620 330'

function TransitPreview() {
  return (
    <svg className="pv" viewBox="0 0 640 400" aria-hidden="true" focusable="false">
      <rect className="pv-bg" width="640" height="400" />
      <path
        className="pv-water"
        d="M0 268 C 70 262, 120 300, 190 318 S 300 372, 340 400 L 0 400 Z"
      />
      {BLOCKS.map(([x, y, width, height]) => (
        <rect
          key={`${x}-${y}`}
          className="pv-block"
          x={x}
          y={y}
          width={width}
          height={height}
          rx="6"
        />
      ))}

      {[BUS, JEEPNEY, VAN].map((d) => (
        <path key={`casing-${d}`} className="pv-casing" d={d} />
      ))}
      <path className="pv-route pv-route--violet" d={BUS} />
      <path className="pv-route pv-route--cyan" d={JEEPNEY} />
      <path className="pv-route pv-route--blue" d={VAN} />

      {/* Moving highlights that read as vehicles on hover. */}
      <path className="pv-flow" d={BUS} pathLength={100} />
      <path className="pv-flow pv-flow--late" d={JEEPNEY} pathLength={100} />
      <path className="pv-flow pv-flow--slow" d={VAN} pathLength={100} />

      {[
        [318, 206, 'violet'],
        [470, 132, 'violet'],
        [612, 66, 'violet'],
        [262, 160, 'cyan'],
        [326, 34, 'cyan'],
        [400, 296, 'blue'],
        [620, 330, 'blue'],
      ].map(([cx, cy, color]) => (
        <circle
          key={`${cx}-${cy}`}
          className={`pv-stop pv-stop--${color}`}
          cx={cx}
          cy={cy}
          r="5.5"
        />
      ))}

      <circle className="pv-terminal" cx="196" cy="262" r="13" />
      <circle className="pv-terminal-core" cx="196" cy="262" r="5" />
      <rect className="pv-label" x="120" y="196" width="178" height="30" rx="15" />
      <text className="pv-text" x="209" y="215.5" textAnchor="middle" fontSize="12.5">
        Batangas Grand Terminal
      </text>

      <g className="pv-legend">
        <rect className="pv-panel" x="456" y="314" width="160" height="66" rx="12" />
        <line className="pv-route pv-route--violet" x1="472" y1="334" x2="490" y2="334" />
        <text className="pv-text pv-text--muted" x="498" y="338" fontSize="11.5">
          Bus
        </text>
        <line className="pv-route pv-route--cyan" x1="532" y1="334" x2="550" y2="334" />
        <text className="pv-text pv-text--muted" x="558" y="338" fontSize="11.5">
          Jeepney
        </text>
        <line className="pv-route pv-route--blue" x1="472" y1="358" x2="490" y2="358" />
        <text className="pv-text pv-text--muted" x="498" y="362" fontSize="11.5">
          Van
        </text>
      </g>
    </svg>
  )
}

function LifeHubPreview() {
  const bars = [52, 74, 40, 88, 62, 70]
  return (
    <svg className="pv" viewBox="0 0 640 400" aria-hidden="true" focusable="false">
      <rect className="pv-bg pv-bg--app" width="640" height="400" />
      <rect className="pv-window" x="24" y="24" width="592" height="352" rx="16" />

      {/* Sidebar */}
      <rect className="pv-sidebar" x="24" y="24" width="64" height="352" rx="16" />
      {[0, 1, 2, 3, 4].map((index) => (
        <rect
          key={index}
          className={index === 0 ? 'pv-nav pv-nav--active' : 'pv-nav'}
          x="45"
          y={60 + index * 44}
          width="22"
          height="22"
          rx="7"
        />
      ))}

      {/* Header */}
      <text className="pv-text pv-text--title" x="112" y="66" fontSize="17">
        Dashboard
      </text>
      <rect className="pv-skeleton" x="112" y="76" width="150" height="7" rx="3.5" />
      <circle className="pv-avatar" cx="584" cy="58" r="14" />

      {/* Tasks */}
      <rect className="pv-card" x="112" y="100" width="232" height="128" rx="12" />
      <text className="pv-text" x="128" y="124" fontSize="12.5">
        Tasks
      </text>
      {[0, 1, 2].map((row) => (
        <g key={row} className={row < 2 ? 'pv-task pv-task--done' : 'pv-task'}>
          <rect
            className="pv-check"
            x="128"
            y={140 + row * 26}
            width="14"
            height="14"
            rx="4"
          />
          {row < 2 ? (
            <path
              className="pv-checkmark"
              d={`M131 ${147 + row * 26} l3 3 l6 -7`}
              pathLength={1}
            />
          ) : null}
          <rect
            className="pv-skeleton"
            x="152"
            y={144 + row * 26}
            width={[132, 104, 150][row]}
            height="7"
            rx="3.5"
          />
        </g>
      ))}

      {/* Assignments */}
      <rect className="pv-card" x="358" y="100" width="238" height="128" rx="12" />
      <text className="pv-text" x="374" y="124" fontSize="12.5">
        Assignments
      </text>
      {['cyan', 'violet', 'blue'].map((color, row) => (
        <g key={color}>
          <circle
            className={`pv-dot pv-dot--${color}`}
            cx="380"
            cy={147 + row * 26}
            r="4.5"
          />
          <rect
            className="pv-skeleton"
            x="392"
            y={143 + row * 26}
            width={[110, 86, 120][row]}
            height="7"
            rx="3.5"
          />
          <rect
            className="pv-pill"
            x="532"
            y={139 + row * 26}
            width="48"
            height="15"
            rx="7.5"
          />
        </g>
      ))}

      {/* Budget */}
      <rect className="pv-card" x="112" y="240" width="232" height="120" rx="12" />
      <text className="pv-text" x="128" y="264" fontSize="12.5">
        Budget
      </text>
      {bars.map((height, index) => (
        <rect
          key={index}
          className={index === 3 ? 'pv-bar pv-bar--accent' : 'pv-bar'}
          x={136 + index * 34}
          y={346 - height * 0.7}
          width="20"
          height={height * 0.7}
          rx="5"
          style={{ transitionDelay: `${index * 40}ms` }}
        />
      ))}

      {/* Subjects */}
      <rect className="pv-card" x="358" y="240" width="238" height="120" rx="12" />
      <text className="pv-text" x="374" y="264" fontSize="12.5">
        Subjects
      </text>
      {[
        [374, 282, 96, 'cyan'],
        [478, 282, 102, 'violet'],
        [374, 316, 120, 'blue'],
      ].map(([x, y, width, color]) => (
        <g key={`${x}-${y}`}>
          <rect className="pv-chip" x={x} y={y} width={width} height="24" rx="12" />
          <circle
            className={`pv-dot pv-dot--${color}`}
            cx={Number(x) + 14}
            cy={Number(y) + 12}
            r="4"
          />
          <rect
            className="pv-skeleton"
            x={Number(x) + 26}
            y={Number(y) + 9}
            width={Number(width) - 40}
            height="6"
            rx="3"
          />
        </g>
      ))}
    </svg>
  )
}

function SafeTrackPreview() {
  return (
    <svg className="pv" viewBox="0 0 640 400" aria-hidden="true" focusable="false">
      <rect className="pv-bg" width="640" height="400" />
      {BLOCKS.map(([x, y, width, height]) => (
        <rect
          key={`${x}-${y}`}
          className="pv-block"
          x={x}
          y={y}
          width={width}
          height={height}
          rx="6"
        />
      ))}
      <circle className="pv-pulse" cx="300" cy="190" r="20" />
      <circle className="pv-pulse pv-pulse--late" cx="300" cy="190" r="20" />
      <circle className="pv-alert" cx="300" cy="190" r="13" />
      <path className="pv-alert-mark" d="M300 183 v8 M300 195.5 v0.5" />
      {[
        [170, 120, 'blue'],
        [452, 140, 'violet'],
        [404, 272, 'cyan'],
      ].map(([x, y, color]) => (
        <path
          key={`${x}-${y}`}
          className={`pv-pin pv-pin--${color}`}
          d={`M${x} ${y} c -9 0 -15 -7 -15 -15 c 0 -9 7 -15 15 -15 s 15 6 15 15 c 0 8 -6 15 -15 15 z`}
        />
      ))}
      <rect className="pv-panel" x="432" y="300" width="184" height="76" rx="12" />
      <rect className="pv-alert-chip" x="448" y="316" width="22" height="22" rx="7" />
      <rect className="pv-skeleton" x="480" y="318" width="110" height="7" rx="3.5" />
      <rect className="pv-skeleton" x="480" y="331" width="76" height="6" rx="3" />
      <rect className="pv-skeleton" x="448" y="352" width="150" height="7" rx="3.5" />
    </svg>
  )
}

function LostFoundPreview() {
  const items = [
    ['Lost', 'amber'],
    ['Found', 'cyan'],
    ['Claimed', 'violet'],
    ['Found', 'cyan'],
    ['Lost', 'amber'],
    ['Claimed', 'violet'],
  ] as const
  return (
    <svg className="pv" viewBox="0 0 640 400" aria-hidden="true" focusable="false">
      <rect className="pv-bg pv-bg--app" width="640" height="400" />
      <rect className="pv-search" x="40" y="32" width="560" height="44" rx="22" />
      <circle className="pv-search-icon" cx="66" cy="54" r="8" />
      <path className="pv-search-icon" d="M72 60 l7 7" />
      <rect className="pv-skeleton" x="90" y="50" width="180" height="8" rx="4" />
      {items.map(([label, color], index) => {
        const x = 40 + (index % 3) * 192
        const y = 96 + Math.floor(index / 3) * 148
        return (
          <g key={index}>
            <rect className="pv-card" x={x} y={y} width="176" height="132" rx="14" />
            <rect
              className="pv-thumb"
              x={x + 14}
              y={y + 14}
              width="148"
              height="58"
              rx="10"
            />
            <rect
              className={`pv-tag pv-tag--${color}`}
              x={x + 14}
              y={y + 84}
              width="62"
              height="20"
              rx="10"
            />
            <text
              className={`pv-text pv-tag-text pv-tag-text--${color}`}
              x={x + 45}
              y={y + 98}
              textAnchor="middle"
              fontSize="10.5"
            >
              {label}
            </text>
            <rect
              className="pv-skeleton"
              x={x + 14}
              y={y + 114}
              width="110"
              height="7"
              rx="3.5"
            />
          </g>
        )
      })}
    </svg>
  )
}
