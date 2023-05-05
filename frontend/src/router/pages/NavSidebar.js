import React from 'react';
import { List, ListItem, ListItemText, Collapse} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link } from "react-router-dom";



function NavSidebar() {
    const [open, setOpen] = React.useState([false, false]);
  const handleClick = (i) => {
    const o = { ...open };
    o[i] = !o[i];
    setOpen(o);
  };
    return (
        <>
            <div className='NavSidebar'
  style={{
    // display: 'inline-block',
    // overflow: "auto",
    width: 300,
    margin: 0,
    backgroundColor: "#F0F0F0",
  }}
>
  <List>
    <ListItem button onClick={() => handleClick(0)}>
      <ListItemText primary="프로젝트1" />
      {open[0] ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
    <Collapse in={open[0]} timeout="auto" unmountOnExit>
      <List
        disablePadding
      >
        <Link to="/kanbanboard">
          <ListItem button>
          <ListItemText primary="&nbsp;&nbsp;&nbsp;&nbsp;보드" />
        </ListItem>
        </Link>
        <Link to="/calendar">
          <ListItem button>
          <ListItemText primary="&nbsp;&nbsp;&nbsp;&nbsp;캘린더" />
        </ListItem>
        </Link>
        <Link to="/dashboard">
          <ListItem button>
          <ListItemText primary="&nbsp;&nbsp;&nbsp;&nbsp;관리자페이지" />
        </ListItem>
        </Link>
      </List>
    </Collapse>
  </List>
</div>
        </>
    );
}

export default NavSidebar;