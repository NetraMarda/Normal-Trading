import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  InputLabel,
  Popover,
  MenuItem,
} from "@mui/material";
import { useColors } from "../../hooks/use-colors";
import { Link } from "react-router-dom";

const MenuBar = () => {
  const colors = useColors();
  const [menuState, setMenuState] = useState({
    master: { anchorEl: null, openPopover: false },
    inward: { anchorEl: null, openPopover: false },
    transaction: { anchorEl: null, openPopover: false },
    outward: { anchorEl: null, openPopover: false },
    report: { anchorEl: null, openPopover: false },
    utility: { anchorEl: null, openPopover: false },
  });

  const handleMenuClick = (event, menu) => {
    setMenuState((prevState) => ({
      ...prevState,
      [menu]: { anchorEl: event.currentTarget, openPopover: true },
    }));
  };

  const handleMenuClose = (menu) => {
    setMenuState((prevState) => ({
      ...prevState,
      [menu]: { anchorEl: null, openPopover: false },
    }));
  };

  function handleLogoutClick() {
    const confirmation = window.confirm("Are you sure you want to log out?");

    if (confirmation) {
      window.location.href = "/Login";
    }
  }

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          bgcolor: colors.card,
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Typography
          variant="h6"
          sx={{ cursor: "pointer", color: "black" }}
          onClick={(event) => handleMenuClick(event, "master")}
        >
          Master
        </Typography>
        <Popover
          open={menuState.master.openPopover}
          anchorEl={menuState.master.anchorEl}
          onClose={() => handleMenuClose("master")}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
              bgcolor: "white",
            }}
          >
            <MenuItem>
              <Link to="/companyForm" style={{ textDecoration: "none" }}>
                <InputLabel sx={{ color: "black" }}>Company</InputLabel>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/accountMasterForm" style={{ textDecoration: "none" }}>
                <InputLabel sx={{ color: "black" }}>AccountMaster</InputLabel>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/groupMasterForm" style={{ textDecoration: "none" }}>
                <InputLabel sx={{ color: "black" }}>GroupMaster</InputLabel>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/itemMasterForm" style={{ textDecoration: "none" }}>
                <InputLabel sx={{ color: "black" }}>ItemMaster</InputLabel>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/stateMasterForm" style={{ textDecoration: "none" }}>
                <InputLabel sx={{ color: "black" }}>StateMaster</InputLabel>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/gstRateMasterForm" style={{ textDecoration: "none" }}>
                <InputLabel sx={{ color: "black" }}>GstRateMaster</InputLabel>
              </Link>
            </MenuItem>
            
          </Box>
        </Popover>

        <Typography
          variant="h6"
          sx={{ cursor: "pointer", color: "black" }}
          onClick={(event) => handleMenuClick(event, "inward")}
        >
          Inward
        </Typography>
        <Popover
          open={menuState.inward.openPopover}
          anchorEl={menuState.inward.anchorEl}
          onClose={() => handleMenuClose("inward")}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
              bgcolor: "white",
            }}
          >
            <MenuItem>
              <Link to="/purchase" style={{ textDecoration: "none" }}>
                <InputLabel sx={{ color: "black" }}>Purchase</InputLabel>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/purchaseReturn" style={{ textDecoration: "none" }}>
                <InputLabel sx={{ color: "black" }}>Purchase Return</InputLabel>
              </Link>
            </MenuItem>
          </Box>
        </Popover>

        <Typography
          variant="h6"
          sx={{ cursor: "pointer", color: "black" }}
          onClick={(event) => handleMenuClick(event, "transaction")}
        >
          Transaction
        </Typography>
        <Popover
          open={menuState.transaction.openPopover}
          anchorEl={menuState.transaction.anchorEl}
          onClose={() => handleMenuClose("transaction")}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
              bgcolor: "white",
            }}
          >
            <MenuItem>
              <Link to="/payment" style={{ textDecoration: "none" }}>
                <InputLabel sx={{ color: "black" }}>Receipt/Payment</InputLabel>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/journalVourcher" style={{ textDecoration: "none" }}>
                <InputLabel sx={{ color: "black" }}>Journal Voucher</InputLabel>
              </Link>
            </MenuItem>
          </Box>
        </Popover>

        <Typography
          variant="h6"
          sx={{ cursor: "pointer", color: "black" }}
          onClick={(event) => handleMenuClick(event, "outward")}
        >
          Outward
        </Typography>
        <Popover
          open={menuState.outward.openPopover}
          anchorEl={menuState.outward.anchorEl}
          onClose={() => handleMenuClose("outward")}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
              bgcolor: "white",
            }}
          >
            <MenuItem>
              <Link to="/invoice" style={{ textDecoration: "none" }}>
                <InputLabel sx={{ color: "black" }}>Invoice</InputLabel>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/salesReturn" style={{ textDecoration: "none" }}>
                <InputLabel sx={{ color: "black" }}>Sale Return</InputLabel>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/serviceBill" style={{ textDecoration: "none" }}>
                <InputLabel sx={{ color: "black" }}>Service Bill</InputLabel>
              </Link>
            </MenuItem>
          </Box>
        </Popover>

        <Typography
          variant="h6"
          sx={{ cursor: "pointer", color: "black" }}
          onClick={(event) => handleMenuClick(event, "report")}
        >
          Reports
        </Typography>
        <Popover
          open={menuState.report.openPopover}
          anchorEl={menuState.report.anchorEl}
          onClose={() => handleMenuClose("report")}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
              bgcolor: "white",
            }}
          >
            <MenuItem>
              <Link to="/gledger" style={{ textDecoration: "none" }}>
                <InputLabel sx={{ color: "black" }}>Ledger</InputLabel>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/purchaseLedger" style={{ textDecoration: "none" }}>
                <InputLabel sx={{ color: "black" }}>Purchase Ledger</InputLabel>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/salesLedger" style={{ textDecoration: "none" }}>
                <InputLabel sx={{ color: "black" }}>Sales Ledger</InputLabel>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/trialBalance" style={{ textDecoration: "none" }}>
                <InputLabel sx={{ color: "black" }}>Trial Balance</InputLabel>
              </Link>
            </MenuItem>
          </Box>
        </Popover>

        <Typography
          variant="h6"
          sx={{ cursor: "pointer", color: "black" }}
          onClick={handleLogoutClick}
        >
          LogOut
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;
