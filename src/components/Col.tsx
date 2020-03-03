
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
  const {gutterX, gutterY, breakPoints} = useContext(RowContext)

  // computed 
  const styleText = useMemo(() => {
    // convert width to css text
    const widthText = (width: Width) => {
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
    
    let styleText = `.${className}{\n`
    // margin
    styleText += `
      margin-right: ${gutterX}px;
      margin-bottom: ${gutterY}px;
    `
    // base style
    const widthAndGrow = (w?: Width, grow?: Grow) => {
      let t = ''
      if (w != null) {
        t += `width: ${widthText(w)};`
      }
      if (grow != null && grow !== false) {
        if (grow === true) {
          grow = 1
        }
        t += `flex-grow: ${grow};`
      }
      return t
    }
    let w = width
    if (w == null) {
      w = grow != null && grow !== false ? 1.1 : 1
    }
    styleText += widthAndGrow(w, grow)
    styleText += '}'
    // responsive
    const bp = breakPoints
    const xsStyle = widthAndGrow(xs, xsGrow)
    if (xsStyle) {
      styleText += `
        @media (max-width: ${bp!.xs}px) {
          .${className}{
            ${xsStyle}
          }
        }
      `
    }
    const smStyle = widthAndGrow(sm, smGrow)
    if (smStyle) {
      styleText += `
        @media (min-width: ${bp!.xs}px) {
          .${className}{
            ${smStyle}
          }
        }
      `
    }
    const mdStyle = widthAndGrow(md, mdGrow)
    if (mdStyle) {
      styleText += `
        @media (min-width: ${bp!.sm}px) {
          .${className}{
            ${mdStyle}
          }
        }
      `
    }
    const lgStyle = widthAndGrow(lg, lgGrow)
    if (lgStyle) {
      styleText += `
        @media (min-width: ${bp!.md}px) {
          .${className}{
            ${lgStyle}
          }
        }
      `
    }
    const xlStyle = widthAndGrow(xl, xlGrow)
    if (xlStyle) {
      styleText += `
        @media (min-width: ${bp!.lg}px) {
          .${className}{
            ${xlStyle}
          }
        }
      `
    }
    // 
    return `<style type="text/css">${styleText}</style>`.replace(/\n/g, '')
  }, [width, grow, xs, xsGrow, sm, smGrow, md, mdGrow, lg, lgGrow, xl, xlGrow, colWidthReduce, gutterX, gutterY, breakPoints, className]);

  // render
  return <div className={`cr-col ${className} ${props.className||''}`}>
    {props.children}
    {/* styleText */}
    <div className="cr-dynamic-style" style={{display:'none'}} dangerouslySetInnerHTML={{__html: styleText}}></div>
  </div>
}

  