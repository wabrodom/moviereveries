import { TableCell } from '@mui/material'

const tableCellHeadStyle = {
  fontWeight: 'bold',
  fontSize: '1.1rem',
  // textTransform: 'uppercase'
}

const TableCellHead = ({ children }) => {
  return (
    <TableCell sx={tableCellHeadStyle}>
      {children}
    </TableCell>
  )
}

export default TableCellHead