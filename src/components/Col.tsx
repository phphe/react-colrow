
import * as hp from 'helper-js'
import "./Col.css"
import React, {useMemo, ReactNode, useContext} from 'react'
import {ifNeedReduceColWidth, config} from './Row'
import RowContext from "./RowContext";

type Width = number|string // default 1; default 1.1 if grow
type Grow = boolean|number
interface ColProps extends React.HTMLProps<HTMLElement>{
  width?: Width
  grow?: Grow
  // responsive
  xs?: Width
  xsGrow?: Grow
  sm?: Width
  smGrow?: Grow
  md?: Width
  mdGrow?: Grow
  lg?: Width
  lgGrow?: Grow
  xl?: Width
  xlGrow?: Grow
  colWidthReduce?: number
  children?: ReactNode
}

const defaultProps = {
  colWidthReduce: config.COL_WIDTH_REDUCE
}

export default function Row(props: ColProps={}) {
  props = {
    ...defaultProps,
    ...props,
  }
  const className = `cr-col-${hp.strRand(6)}`
  const {width, grow, xs, xsGrow, sm, smGrow, md, mdGrow, lg, lgGrow, xl, xlGrow, colWidthReduce} = props
  const ctx = useContext(RowContext)
  const {gutterX, gutterY, breakPoints, xsGutterX, xsGutterY, smGutterX, smGutterY, mdGutterX, mdGutterY, lgGutterX, lgGutterY, xlGutterX, xlGutterY} = ctx

  // computed 
  const styleText = useMemo(() => {
    const baseStyleText = (width?:Width, grow?:Grow, gutterX?:number, gutterY?:number) => {
      // convert width to css text
      const widthText = (width?: Width, gutterX?:number) => {
        if (width == null) {
          width = props.width
        }
        if (gutterX == null) {
          gutterX = ctx.gutterX
        }
        if (typeof width === 'number') {
          if (width <= 1) {
            const reduce = ifNeedReduceColWidth ? ` - ${colWidthReduce}px` : ''
            return `calc(100% * ${width} - ${gutterX}px${reduce})` 
          } else {
            return `${width}px`
          }
        } else {
          return width // such as 100px, 100em, 10cm
        }
      }
      let empty = true
      const styles = []
      if (gutterX != null) {
        styles.push(`margin-right: ${gutterX}px;`)
        empty = false
      }
      if (gutterY != null) {
        styles.push(`margin-bottom: ${gutterY}px;`)
        empty = false
      }
      if (width == null && grow) {
        width = 2
      }
      if (width != null || gutterX != null) {
        styles.push(`width: ${widthText(width, gutterX)};`)
        empty = false
      }
      if (grow != null && grow !== false) {
        if (grow === true) {
          grow = 1
        }
        styles.push(`flex-grow: ${grow};`)
        empty = false
      }
      const style = `.${className}{${styles.join('')}}`
      return {empty, style}
    }

    let styleText = ``
    let w = width
    if (w == null && !grow) {
      w = 1
    }
    styleText += baseStyleText(w, grow, gutterX, gutterY).style
    // responsive
    const bp = breakPoints
    let t
    t = baseStyleText(xs, xsGrow, xsGutterX, xsGutterY)
    if (!t.empty) {
      styleText += `
        @media (max-width: ${bp!.xs}px) {
          ${t.style}
        }
      `
    }
    t = baseStyleText(sm, smGrow, smGutterX, smGutterY)
    if (!t.empty) {
      styleText += `
        @media (min-width: ${bp!.xs}px) {
          ${t.style}
        }
      `
    }
    t = baseStyleText(md, mdGrow, mdGutterX, mdGutterY)
    if (!t.empty) {
      styleText += `
        @media (min-width: ${bp!.sm}px) {
          ${t.style}
        }
      `
    }
    t = baseStyleText(lg, lgGrow, lgGutterX, lgGutterY)
    if (!t.empty) {
      styleText += `
        @media (min-width: ${bp!.md}px) {
          ${t.style}
        }
      `
    }
    t = baseStyleText(xl, xlGrow, xlGutterX, xlGutterY)
    if (!t.empty) {
      styleText += `
        @media (min-width: ${bp!.lg}px) {
          ${t.style}
        }
      `
    }
    // 
    return `<style type="text/css">${styleText}</style>`.replace(/\n/g, '')
  }, [width, grow, xs, xsGrow, sm, smGrow, md, mdGrow, lg, lgGrow, xl, xlGrow, colWidthReduce, gutterX, gutterY, breakPoints, xsGutterX, xsGutterY, smGutterX, smGutterY, mdGutterX, mdGutterY, lgGutterX, lgGutterY, xlGutterX, xlGutterY, className, ctx.gutterX, props.width]);

  // render
  return <div className={`cr-col ${className} ${props.className||''}`} style={props.style}>
    {props.children}
    {/* styleText */}
    <div className="cr-dynamic-style" style={{display:'none'}} dangerouslySetInnerHTML={{__html: styleText}}></div>
  </div>
}

  