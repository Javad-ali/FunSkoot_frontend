import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BasicTable from "components/adminComponents/userTable";
import { Report } from "@mui/icons-material";
import ReportTable from "../ReportTable.js/ReportTable";
import AdNavbar from "../adNavbar/AdNavbar";
import AdSidebar from "../sidebar/AdSidebar";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { window } = props;
  const [home, sethome] = React.useState(true);
  React.useEffect(() => {
    if (user?.role !== "admin") {
      navigate("/admin");
    }
  }, []);

  return (
    <Box>
      <AdNavbar />
      <div style={{ display: "flex" }}>
        <AdSidebar setHome={sethome}/>
        {home ? <BasicTable /> : <ReportTable />}
      </div>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
