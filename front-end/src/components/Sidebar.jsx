import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  ListItemIcon,
  Divider,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import HomeIcon from "@mui/icons-material/Home";

import "../Css/Sidebar.css";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [open, setOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Drawer
      variant="permanent"
      className={`sidebar ${open ? "open" : "closed"}`}
    >
      {/* Header */}
      <div className="sidebar-header">
        {open && <span className="sidebar-title">Weather</span>}
      </div>

      <Divider className="sidebar-divider" />

      {/* Content */}
      <div className="sidebar-content">
        <List className="sidebar-list">
          <ListItem
            button
            className={activeTab === "main-page" ? "active" : ""}
            onClick={() => setActiveTab("main-page")}
          >
            <ListItemIcon>
              <HomeIcon className="sidebar-icon" />
            </ListItemIcon>
            {open && (
              <ListItemText primary="Home page" className="sidebar-text" />
            )}
          </ListItem>
          <ListItem
            button
            className={activeTab === "search-weather" ? "active" : ""}
            onClick={() => setActiveTab("search-weather")}
          >
            <ListItemIcon>
              <SearchIcon className="sidebar-icon" />
            </ListItemIcon>
            {open && (
              <ListItemText primary="Search Weather" className="sidebar-text" />
            )}
          </ListItem>
          <ListItem
            button
            className={activeTab === "chart-weather" ? "active" : ""}
            onClick={() => setActiveTab("chart-weather")}
          >
            <ListItemIcon>
              <ShowChartIcon className="sidebar-icon" />
            </ListItemIcon>
            {open && (
              <ListItemText primary="Chart Weather" className="sidebar-text" />
            )}
          </ListItem>
        </List>
      </div>

      {/* Toggle button */}
      <div className="sidebar-toggle" style={{ marginTop: "auto" }}>
        <IconButton onClick={() => setOpen(!open)}>
          {open ? (
            <ChevronLeftIcon className="sidebar-icon" />
          ) : (
            <ChevronRightIcon className="sidebar-icon" />
          )}
        </IconButton>
      </div>
    </Drawer>
  );
};

export default Sidebar;
