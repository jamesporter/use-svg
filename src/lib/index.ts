import { useCallback, useMemo, useRef, useState } from "react"
export * from "./util"

export function downloadSVG(svgEl: SVGSVGElement, name: string) {
	svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg")
	var svgData = svgEl.outerHTML
	var preface = '<?xml version="1.0" standalone="no"?>\r\n'

	var svgBlob = new Blob([preface, svgData], {
		type: "image/svg+xml;charset=utf-8",
	})
	var svgUrl = URL.createObjectURL(svgBlob)

	var downloadLink = document.createElement("a")

	downloadLink.href = svgUrl
	downloadLink.download = name
	document.body.appendChild(downloadLink)
	downloadLink.click()
	document.body.removeChild(downloadLink)
}

export function useSVG({
	defaultName = "",
	scale = "pixel",
	width = 640,
	height = 640,
}: {
	defaultName?: string
	width?: number
	height?: number
	scale?: "pixel" | "normalised"
} = {}) {
	const ref = useRef<SVGSVGElement>(null)

	const sizeProps = useMemo(() => {
		let viewBox: string
		let meta: {
			bottom: number
			right: number
			center: {
				x: number
				y: number
			}
			min: number
			max: number
		}

		if (scale === "pixel") {
			viewBox = `0 0 ${width} ${height}`

			meta = {
				bottom: height,
				right: width,
				center: {
					x: width / 2,
					y: height / 2,
				},
				min: Math.min(height, width),
				max: Math.max(height, width),
			}
		} else {
			const h = height / width

			viewBox = `0 0 1 ${h}`

			meta = {
				bottom: h,
				center: {
					x: 0.5,
					y: h / 2,
				},
				right: 1,
				min: Math.min(h, 1),
				max: Math.max(h, 1),
			}
		}

		return {
			props: {
				width,
				height,
				viewBox,
			},
			meta,
		}
	}, [width, height, scale])

	const [name, setName] = useState(defaultName)

	const download = useCallback(() => {
		if (ref.current) {
			downloadSVG(ref.current, `${name.length > 0 ? name : "export"}.svg`)
		}
	}, [name])

	return {
		ref,
		download,
		name,
		setName,
		props: sizeProps.props,
		meta: sizeProps.meta,
	}
}
