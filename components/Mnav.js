import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Create, Home, MenuBook, Whatshot } from '@mui/icons-material';
import styles from '@/styles/Mnav.module.scss';

const actions = [
  { icon: <Home />, name: 'Home' },
  { icon: <Create />, name: 'Write' },
  { icon: <MenuBook />, name: 'Collection' },
  { icon: <Whatshot />, name: 'Best' },
];

export default function ControlledOpenSpeedDial() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ height: '100%', transform: 'translateZ(0px)', flexGrow: 1}}
    className = {styles.navBtn}>
      <SpeedDial
        className={styles.dialback}
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: 'absolute', bottom: 16, right: 16,'& .MuiFab-primary': { '&:hover': {backgroundColor: 'rgba(224, 102, 102)'} }}}
        icon={<SpeedDialIcon
        sx={{ color:'#fffbef',햐background:'rgba(224, 102, 102)' }}/>}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}
            sx={{ color:'rgba(224, 102, 102)',background:'#fffbef' }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}