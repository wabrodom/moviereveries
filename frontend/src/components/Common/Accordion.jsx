import { useState, createContext, useContext } from 'react'
import { Accordion as MuiAccordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ToggleContext = createContext()

const Accordion = ({ children, ...restProps }) => {
  return (
    <Box {...restProps}>
      {children}
    </Box>
  )
}

Accordion.Title = function AccordionTitle({ children, ...restProps }) {
  return (
    <Typography variant="h4" {...restProps}>
      {children}
    </Typography>
  )
}


Accordion.Item = function AccordionItem({ children, ...restProps }) {
  const [expanded, setExpanded] = useState(false)
  const toggleExpanded = () => setExpanded(!expanded)

  return (
    <ToggleContext.Provider value={{ expanded, toggleExpanded }}>
      <MuiAccordion expanded={expanded} {...restProps}>
        {children}
      </MuiAccordion>
    </ToggleContext.Provider>
  )
}

Accordion.ItemHeader = function AccordionItemHeader({ children, ...restProps }) {
  const {  toggleExpanded } = useContext(ToggleContext)

  return (
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      onClick={toggleExpanded}
      {...restProps}
    >
      {children}

    </AccordionSummary>
  )
}

Accordion.Body = function AccordionBody({ children, ...restProps }) {
  return (
    <AccordionDetails {...restProps}>
      {children}
    </AccordionDetails>
  )
}

export default Accordion
