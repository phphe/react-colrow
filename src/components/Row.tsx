
import * as hp from 'helper-js'
import "./Row.css"
import React, {useState, useMemo, useEffect, useRef, ReactNode} from 'react'
import detectIfNeedReduceColWidth from './detectIfNeedReduceColWidth'
import RowContext from './RowContext'

export const ifNeedReduceColWidth = detectIfNeedReduceColWidth()

export const config = {
  DEFAULT_GUTTER_X: 16,
  DEFAULT_GUTTER_Y: 16,
  COL_WIDTH_REDUCE: 0.09, // for some browsers
  BREAK_POINTS: {
    xs: 544,
    sm: 768,
    md: 992,
    lg: 1200,
  },
  ROW_HEIGHT_CALCULATION: true,
}

export interface RowProps extends React.HTMLProps<HTMLElement> {
  gutter?: number|number[] // [x, y]
  heightCalculation?: boolean
  breakPoints?: typeof config.BREAK_POINTS
  children?: ReactNode
  // responsive
  xsGutterX?: number
  xsGutterY?: number
  smGutterX?: number
  smGutterY?: number
  mdGutterX?: number
  mdGutterY?: number
  lgGutterX?: number
  lgGutterY?: number
  xlGutterX?: number
  xlGutterY?: number
}

const defaultProps = {
  gutter: [config.DEFAULT_GUTTER_X, config.DEFAULT_GUTTER_Y],
  heightCalculation: config.ROW_HEIGHT_CALCULATION,
  breakPoints: config.BREAK_POINTS,
}
export default function Row(props: RowProps={}) {
  props = {
    ...defaultProps,
    ...props,
  }
  const className = `cr-col-${hp.strRand(6)}`
  const {gutter, breakPoints, xsGutterX, xsGutterY, smGutterX, smGutterY, mdGutterX, mdGutterY, lgGutterX, lgGutterY, xlGutterX, xlGutterY} = props
  // state
  const resolveGutterXY = () => {
    const t = Array.isArray(gutter) ? gutter.slice() : [gutter!, gutter!]
    if (t[0] == null) {
      t[0] = config.DEFAULT_GUTTER_X
    }
    if (t[1] == null) {
      t[1] = config.DEFAULT_GUTTER_Y
    }
    return t
  }
  const initialGutter = resolveGutterXY()
  const [gutterX, setgutterX] = useState(initialGutter[0]);
  const [gutterY, setgutterY] = useState(initialGutter[1]);
  const [innerHeight, setinnerHeight] = useState();
  // ref
  const inner = useRef(null)
  const updateInnerHeight = () => {
    if (inner.current != null) {
      const el = inner.current! as HTMLElement
      const h = el.offsetHeight
      if (h !== innerHeight) {
        setinnerHeight(h)
      } 
    }
  }

  // computed
  const styleText = useMemo(() => {
    const baseStyleText = (argGutterX?: number, argGutterY?: number) => {
      if (argGutterX == null) {
        argGutterX = gutterX
      }
      if (argGutterY == null) {
        argGutterY = gutterY
      }
      let styleText = `.${className}{\n`
      styleText += `margin-right: -${argGutterX}px;`
      if (innerHeight == null) {
        styleText += `margin-bottom: -${argGutterY}px;`
      } else if(innerHeight !== 0) {
        styleText += `height: ${innerHeight - argGutterY}px;`
      }
      styleText += `}`
      styleText += `.${className} > .cr-row-inner{
        width: calc(100% + ${argGutterX}px);
      }`
      return styleText
    }
    let styleText = baseStyleText(gutterX, gutterY)
    // responsive
    const bp = breakPoints
    if (xsGutterX != null || xsGutterY != null) {
      styleText += `@media (max-width: ${bp!.xs}px) {${baseStyleText(xsGutterX, xsGutterY)}}`
    }
    if (smGutterX != null || smGutterY != null) {
      styleText += `@media (min-width: ${bp!.xs}px) {${baseStyleText(smGutterX, smGutterY)}}`
    }
    if (mdGutterX != null || mdGutterY != null) {
      styleText += `@media (min-width: ${bp!.sm}px) {${baseStyleText(mdGutterX, mdGutterY)}}`
    }
    if (lgGutterX != null || lgGutterY != null) {
      styleText += `@media (min-width: ${bp!.md}px) {${baseStyleText(lgGutterX, lgGutterY)}}`
    }
    if (xlGutterX != null || xlGutterY != null) {
      styleText += `@media (min-width: ${bp!.lg}px) {${baseStyleText(xlGutterX, xlGutterY)}}`
    }
    // 
    return `<style type="text/css">${styleText}</style>`.replace(/\n/g, '')
  }, [gutterX, gutterY, breakPoints, xsGutterX, xsGutterY, smGutterX, smGutterY, mdGutterX, mdGutterY, lgGutterX, lgGutterY, xlGutterX, xlGutterY, className, innerHeight]);

  // watch
  const updateGutterXY = () => {
    const t = resolveGutterXY()
    setgutterX(t[0])
    setgutterY(t[1])
  }
  useEffect(updateGutterXY, [gutter]);

  // mounted
  useEffect(() => {
    if (props.heightCalculation) {
      updateInnerHeight()
      hp.onDOM(window, 'resize', updateInnerHeight)
      let observer: MutationObserver
      if (window.MutationObserver) {
        // Select the node that will be observed for mutations
        const targetNode = document.body.parentNode
        if (targetNode) {
          // Options for the observer (which mutations to observe)
          const config = { attributes: true, childList: true, subtree: true };
          // Callback function to execute when mutations are observed
          const callback = () => {
            updateInnerHeight()
          }
          // Create an observer instance linked to the callback function
          observer = new MutationObserver(callback);
          // Start observing the target node for configured mutations
          observer.observe(targetNode, config);
        }
      }
      // destroy
      return () => {
        hp.offDOM(window, 'resize', updateInnerHeight)
        if (observer) {
          // Later, you can stop observing
          observer.disconnect()
        }
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // render
  // TODO can cr-row's style be passed in from outside?
  return <RowContext.Provider value={{gutterX, gutterY, breakPoints, xsGutterX, xsGutterY, smGutterX, smGutterY, mdGutterX, mdGutterY, lgGutterX, lgGutterY, xlGutterX, xlGutterY}}>
    <div className={`cr-row ${props.className||''} ${className}`}>
      <div className="cr-row-inner" ref={inner}>
        {props.children}
      </div>
      {/* styleText */}
      <div className="cr-dynamic-style" style={{display:'none'}} dangerouslySetInnerHTML={{__html: styleText}}></div>
    </div>
  </RowContext.Provider>
}