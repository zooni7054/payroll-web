import * as React from "react";
import {
  ListItem,
  ListItemText,
  ListSubheader,
  Collapse,
  Divider,
  List,
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { adminUrls } from "../../../utils/urls";

import { NavLink } from "react-router-dom";

function AdminMenu() {
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(!open);
  }

  return (
    <div>
      <NavLink
        to={`${adminUrls.Home}`}
        exact
        activeClassName="active"
        className="NavLink-item">
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </NavLink>
      <NavLink
        to={`${adminUrls.About}`}
        activeClassName="active"
        className="NavLink-item">
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="About Us" />
        </ListItem>
      </NavLink>
      <NavLink
        to={`${adminUrls.Shop}`}
        activeClassName="active"
        className="NavLink-item">
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Shop" />
        </ListItem>
      </NavLink>
      <NavLink
        to={`${adminUrls.Table}`}
        activeClassName="active"
        className="NavLink-item">
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Table" />
        </ListItem>
      </NavLink>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Nested Pages" />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" className="sub-menu" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button>
            <ListItemText inset primary="Nested Page 1" />
          </ListItem>
          <ListItem button>
            <ListItemText inset primary="Nested Page 2" />
          </ListItem>
        </List>
      </Collapse>
    </div>
  );
}

export default AdminMenu;

// const useStyles = makeStyles(theme =>
//   createStyles({
//     appMenu: {
//       width: '100%',
//     },
//     menuItemIcon: {
//       color: '#97c05c',
//     },
//   }),
// )
