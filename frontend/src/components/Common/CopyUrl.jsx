import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

const CopyUrl = () => {
  const [copied, setCopied] = useState(false)
  const currentUrl = window.location.href

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }


  return (
    <>
      <IconButton
        onClick={handleCopy}
        aria-label='copy'
      >
        <ContentCopyIcon />
      </IconButton>

      {copied && <span color="green">URL copied!</span>}
    </>
  )
}

export default CopyUrl
