import { createContext, Context } from 'react'
import { RowProps } from "./Row";

export interface RowContextType {
  gutterX?: number
  gutterY?: number
  breakPoints?: RowProps['breakPoints']
}

const RowContext: Context<RowContextType> = createContext({});

export default RowContext
