# use-svg-maker

What if you used React to draw SVGs, rather than clicking a mouse a lot in Figma? React has components too.

Recommended: [Explore a Code Sandbox Now](https://codesandbox.io/s/use-svg-maker-demo-0-0-1-gfjf93?file=/src/App.tsx)

See source code for [a partial example](src/App.tsx) or read the source code (it is pretty simple).

## Install

See [use-svg-maker npm page](https://www.npmjs.com/package/use-svg-maker). Install with:

```bash
npm i use-svg-maker
```

Use in React projects, I would recommend something like [Vite](https://vitejs.dev/) for a server (choosing React and TypeScript) and pulling in `leva` to make it trivial to parameterize drawings.

Import:

```tsx
import { useSVG } from "use-svg-maker"
```

Use:

```tsx
const { ref, download, name, setName, props, meta } = useSVG({
  height: 540,
  width: 960,
})
```

```tsx
<svg className=" bg-white" {...props} ref={ref}>
  {/* draw things here with code */}
</svg>
```

Add something like this to allow local saving of files:

```tsx
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
```

## Releases

- 0.0.1 - Initial release
