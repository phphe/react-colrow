import { createContext, Context } from 'react'
import { RowProps } from "./Row";

export interface RowContextType {
  gutterX?: number
  gutterY?: number
  breakPoints?: RowProps['breakPoints']
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

const RowContext: Context<RowContextType> = createContext({});

export default RowContext
