import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'

import { Link } from 'react-router-dom'

const ListItemGenerate = ({ obj, index, onClick }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton component={Link} to={obj.to} onClick={onClick} data-testid={obj.testid}>
        <ListItemIcon>
          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
        </ListItemIcon>
        <ListItemText primary={obj.label} />
      </ListItemButton>
    </ListItem>
  )
}

export default ListItemGenerate