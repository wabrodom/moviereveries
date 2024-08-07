import { downloadCsv } from '../../utils/downloadCsv'
import Button  from '@mui/material/Button'

const DownloadCsv = ({ data, dataStartRow, fileName }) => {
  const handleFunc = () => {
    downloadCsv(data, dataStartRow, fileName )
  }

  return (
    <Button variant='contained' onClick={handleFunc}>
      Download CSV
    </Button>
  )
}

export default DownloadCsv