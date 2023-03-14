
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Create, Description, Home, MenuBook, Whatshot } from '@mui/icons-material';
import styles from '@/styles/Mnav.module.scss';
import React, { useState } from 'react';

export default function ControlledOpenSpeedDial() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


const actions = [
  { icon: <Home />, name: '홈', onClick: () => setPageStatus("LIST") },
  { icon: <Whatshot />, name: '인기', onClick: () => setPageStatus("TREND")},
  { icon: <MenuBook />, name: '도감', onClick: () => setPageStatus("ENCYCLOPEDIA") },
  { icon: <Description />, name: '작성글', onClick: () => setPageStatus("WRITE") },
  { icon: <Create />, name: '글쓰기', onClick: () => setPageStatus("MYMSG")},
];


  return (
    <Box sx={{ height: '100%', transform: 'translateZ(0px)', flexGrow: 1,'& .MuiFab-primary': { backgroundColor: 'rgba(224, 102, 102)'}}}
    className = {styles.navBtn}>
      <SpeedDial
        className={styles.dialback}
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: 'absolute', bottom: 16, right: 16,'& .MuiFab-primary': { '&:hover': {backgroundColor: 'rgba(224, 102, 102)'} }}}
        icon={<SpeedDialIcon
        sx={{ color:'#fffbef',background:'rgba(224, 102, 102)' }}/>}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        onClick={actions.onClick}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            // tooltipOpen 
            onClick={handleClose}
            sx={{ color:'rgba(224, 102, 102)',background:'#fffbef' }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}