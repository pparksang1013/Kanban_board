import React from "react";
import { List, ListItem, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
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
            <div
                className="NavSidebar"
                style={{
                    display: "inline-block",
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
                        <List disablePadding>
                            <ListItem button>
                                <Link to="/kanbanboard">
                                    <ListItemText primary="&nbsp;&nbsp;&nbsp;&nbsp;보드" />
                                </Link>
                            </ListItem>
                            <ListItem button>
                                <Link to="/calendar">
                                    <ListItemText primary="&nbsp;&nbsp;&nbsp;&nbsp;캘린더" />
                                </Link>
                            </ListItem>
                            <ListItem button>
                                <Link to="/dashboard">
                                    <ListItemText primary="&nbsp;&nbsp;&nbsp;&nbsp;관리자페이지" />
                                </Link>
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </div>
        </>
    );
}

export default NavSidebar;
