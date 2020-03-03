
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
  const {gutter, breakPoints} = props
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
  const style = useMemo(() => {
    const stl:any = {
      marginRight: `-${gutterX}px`,
    }
    if (innerHeight == null) {
      stl.marginBottom = `-${gutterY}px`
    } else if(innerHeight !== 0) {
      stl.height = `${innerHeight - gutterY}px`
    }
    return stl
  }, [gutterX, gutterY, innerHeight]);
  const innerStyle = useMemo(() => ({
    width: `calc(100% + ${gutterX}px)`,
  }), [gutterX]);

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
  return <RowContext.Provider value={{gutterX, gutterY, breakPoints}}>
    <div className={`cr-row ${props.className||''}`} style={{...style, ...props.style}}>
      <div className="cr-row-inner" ref={inner} style={innerStyle}>
        {props.children}
      </div>
    </div>
  </RowContext.Provider>
}