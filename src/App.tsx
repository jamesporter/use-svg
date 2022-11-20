import { useControls } from "leva"
import { RNG, hsla, useSVG } from "./lib"

export function App() {
  const { ref, download, name, setName, props, meta } = useSVG({
    height: 540,
    width: 960,
  })

  const rng = new RNG(-234234, 7834739)

  const { mainColour, boxWidth, boxHeight, stdDeviation } = useControls({
    mainColour: "#0000ff",
    boxWidth: {
      value: 50,
      min: 5,
      max: 500,
    },
    boxHeight: {
      value: 50,
      min: 5,
      max: 500,
    },
    stdDeviation: {
      value: 5,
      min: 0,
      max: 10,
    },
  })

  return (
    <div className="flex flex-col">
      <div className="bg-gradient-to-b from-emerald-400 to-emerald-600 py-4 px-16 flex flex-row justify-start items-center gap-8 print:hidden">
        <h1 className="text-xl sm:text-4xl font-semibold text-white">
          use-svg-maker
        </h1>
        <h2 className="text-sm sm:text-lg text-emerald-100">
          Create SVG drawings with React
        </h2>
      </div>

      <div className="flex flex-col items-center bg-slate-600 p-12">
        <svg className=" bg-white" {...props} ref={ref}>
          <filter id="blurMe">
            <feGaussianBlur stdDeviation={stdDeviation} />
          </filter>

          {Array(9)
            .fill(0)
            .map((_, i) => (
              <rect
                x={i * 0.1 * meta.right}
                y={i * 0.1 * meta.bottom}
                width={0.01 * boxWidth * meta.right}
                height={0.01 * boxHeight * meta.right}
                fill={hsla(i * 10 + 150, 90, 40, 0.5)}
                key={i}
              />
            ))}
          <circle
            cx={meta.center.x}
            cy={meta.center.y}
            r={meta.right / 10}
            fill={mainColour}
            opacity={0.4}
            filter="url(#blurMe)"
          />
          <text
            x={meta.bottom * 0.2}
            y={meta.right * 0.2}
            fill={"black"}
            fontSize={meta.min * 0.1}
            fontFamily="Verdana"
          >
            hi
          </text>
        </svg>

        <div className="flex flex-row gap-4 items-center mt-8 print:hidden">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-4 rounded bg-slate-100 text-slate-700"
          />
          <p className="text-white text-lg">.svg</p>
        </div>

        <button
          className="bg-emerald-500 text-white p-4 rounded-lg mt-8 print:hidden"
          onClick={download}
        >
          Download
        </button>
      </div>
    </div>
  )
}
