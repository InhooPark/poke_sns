
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { Create, Description, Home, MenuBook, Whatshot } from '@mui/icons-material';
import styles from '@/styles/Mnav.module.scss';
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { Statusgroup } from '@/context/StatusContext';

export default function ControlledOpenSpeedDial() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const { pageStatus, setPageStatus, newbie } = useContext(Statusgroup);



  const actions = [
    { icon: <Home />, name: '홈', onClick: () => { setPageStatus("LIST"); } },
    { icon: <Whatshot />, name: '인기', onClick: () => { setPageStatus("TREND"); } },
    { icon: <MenuBook />, name: '도감', onClick: () => { setPageStatus("ENCYCLOPEDIA"); } },
    { icon: <Description />, name: '작성글', onClick: () => { setPageStatus("MYMSG"); } },
    { icon: <Create />, name: '글쓰기', onClick: () => { setPageStatus("WRITE"); } },
  ];


  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ height: '100%', transform: 'translateZ(0px)', flexGrow: 1, '& .MuiFab-primary': { backgroundColor: 'rgba(224, 102, 102)' } }}
      className={styles.navBtn}>
      <SpeedDial
        className={styles.dialback}
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: 'absolute', bottom: 16, right: 16, '& .MuiFab-primary': { '&:hover': { backgroundColor: 'rgba(224, 102, 102)' } } }}
        icon={<SpeedDialIcon
          sx={{ color: '#fffbef', background: 'rgba(224, 102, 102)' }} />}
        onClose={handleClose}
        onOpen={handleClick}
        open={open}

      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
            sx={{ color: 'rgba(224, 102, 102)', background: '#fffbef' }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}