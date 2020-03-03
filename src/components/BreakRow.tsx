import * as hp from 'helper-js'
import "./BreakRow.css"
import React, {useMemo, useContext} from 'react'
import RowContext from "./RowContext";

interface BreakRowProps extends React.HTMLProps<HTMLElement> {
  xs?: boolean
  sm?: boolean
  md?: boolean
  lg?: boolean
  xl?: boolean
}

export default function BreakRow(props: BreakRowProps={}) {
  const className = `cr-break-row-${hp.strRand(6)}`
  const {xs, sm, md, lg, xl} = props
  const {breakPoints} = useContext(RowContext)

  // computed
  const styleText = useMemo(() => {
    if (xs || sm || md || lg || xl) {
      let styleText = `.${className}{display: none;}`
      const bp = breakPoints
      if (xs) {
        styleText += `
          @media (max-width: ${bp!.xs}px){
            .${className}{display: block;}
          }
        `
      }
      if (sm) {
        styleText += `
          @media (max-width: ${bp!.sm}px) and (min-width: ${bp!.xs}px){
            .${className}{display: block;}
          }
        `
      }
      if (md) {
        styleText += `
          @media (max-width: ${bp!.md}px) and (min-width: ${bp!.sm}px){
            .${className}{display: block;}
          }
        `
      }
      if (lg) {
        styleText += `
          @media (max-width: ${bp!.lg}px) and (min-width: ${bp!.md}px){
            .${className}{display: block;}
          }
        `
      }
      if (xl) {
        styleText += `
          @media (min-width: ${bp!.lg}px){
            .${className}{display: block;}
          }
        `
      }
      return `<style type="text/css">${styleText}</style>`.replace(/\n/g, '')
    }
    return ''
  }, [xs, sm, md, lg, xl, breakPoints, className]);

  // render
  return <div className={`cr-break-row ${className} ${props.className||''}`}>
    {/* styleText */}
    <div className="cr-dynamic-style" style={{display:'none'}} dangerouslySetInnerHTML={{__html: styleText}}></div>
  </div>
}