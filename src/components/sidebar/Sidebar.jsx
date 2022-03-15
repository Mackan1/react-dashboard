import "./sidebar.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import logo from "./Blazar-full-logo.png";
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <a href="#home" className="logoHolder">
          <img src={logo} alt="logo" className="logo" />
        </a>
        <div className="sidebarMenu">
          <div className="sidebarTitle">
            <h3>Logistics</h3>
            <ul className="sidebarList">
              <NavLink
              exact="true"
              activeClassName="active"
              to="/floship" 
              style={{textDecoration: "none"}} 
              className="sidebarListItem"
              >
                  <LocalShippingIcon className="sidebarIcon" /> NG Floship
              </NavLink>
              <li className="sidebarListItem">
                <QuestionMarkIcon className="sidebarIcon" /> Coming soon
              </li>
              <li className="sidebarListItem">
                <QuestionMarkIcon className="sidebarIcon" /> Coming soon
              </li>
              <li className="sidebarListItem">
                <QuestionMarkIcon className="sidebarIcon" /> Coming soon
              </li>
            </ul>
          </div>
        </div>
        <div className="sidebarMenu">
          <div className="sidebarTitle">
            <h3>Coming soon</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem">
                <QuestionMarkIcon className="sidebarIcon" /> Coming soon
              </li>
              <li className="sidebarListItem">
                <QuestionMarkIcon className="sidebarIcon" /> Coming soon
              </li>
              <li className="sidebarListItem">
                <QuestionMarkIcon className="sidebarIcon" /> Coming soon
              </li>
              <li className="sidebarListItem">
                <QuestionMarkIcon className="sidebarIcon" /> Coming soon
              </li>
            </ul>
          </div>
        </div>
        <div className="sidebarTitle">
          <h3>Quick Menu</h3>
          <ul className="sidebarList">
            <NavLink 
            exact="true"
            activeClassName="active"
            to="/support" 
            style={{textDecoration: "none"}} 
            className="sidebarListItem"
            >
                <ContactSupportIcon className="sidebarIcon" /> Support
            </NavLink> 
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
