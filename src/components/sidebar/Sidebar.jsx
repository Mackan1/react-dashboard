import "./sidebar.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import logo from "./Blazar-full-logo.png";

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
              <li className="sidebarListItem active">
                <LocalShippingIcon className="sidebarIcon" /> NG
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
        <div className="sidebarMenu">
          <div className="sidebarTitle">
            <h3>Finance</h3>
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
            <li className="sidebarListItem">
              <AccountCircleIcon className="sidebarIcon" /> Account
            </li>
            <li className="sidebarListItem">
              <ContactSupportIcon className="sidebarIcon" /> Support
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
