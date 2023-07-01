import {
  TableCell,
  TableRow,
  TableHead,
  Table,
  Button,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { React, useState, useEffect } from "react";
import CustomIconButton from "../../components/Buttons/CustomIconButton";
import { Search } from "@mui/icons-material";
import AccountMasterForm from "../accountMaster/AccountMasterForm";
import { getAllAccountMasterData } from "../../api/accountMaster/accountMaster.request";
import { useIds } from "../IdsContext/IdsContext";
import { Link } from "react-router-dom";
import { useColors } from "../../hooks/use-colors";

const AccountMasterRecords = () => {
  //const{ids,setIds}=useIds()
  const [accountData, setAccountData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [redirectToAccountForm, setRedirectToAccountForm] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchAccountMasterData = async () => {
      try {
        const response = await getAllAccountMasterData();
        setAccountData(response.data);
      } catch (error) {
        console.error("Failed to fetch accountMaster data:", error);
      }
    };
    fetchAccountMasterData();
  }, []);

  const handleSearch = () => {
    const filteredData = searchQuery
      ? accountData.filter((data) =>
          data.accountName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : accountData;
    setAccountData(filteredData);
  };

  const handleClick = (accountMasterId) => {
    //console.log(accountMasterId)
    //const accountMasterId = account.id;
    //setIds((prev) => ({ ...prev, accountMasterId }));
    setRedirectToAccountForm(true);
    setSelectedData(accountMasterId);
  };
  const handleAddClick = () => {
    setRedirectToAccountForm(true);
  };

  if (redirectToAccountForm) {
    return <AccountMasterForm data={selectedData} />;
  }

  const colors = useColors();

  return (
    <Box
      sx={{
        maxWidth: "95%",
        maxHeight: "100%",
      }}
    >
      <Typography
        sx={{
          textTransform: "uppercase",
          fontWeight: 500,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 3,
        }}
        variant="h4"
      >
        AccountMaster Records
      </Typography>
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            sx={{ color: "black", bgcolor: colors.green[500] }}
            onClick={() => {
              handleAddClick();
            }}
          >
            <Link
              to="/accountMasterForm"
              style={{
                color: "black",
                textDecoration: "none",
              }}
            >
              Add Data
            </Link>
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            gap: 1,
          }}
        >
          <TextField
            id="search-bar"
            className="text"
            label="Enter a Account name"
            variant="outlined"
            placeholder="Search..."
            value={searchQuery}
            size="small"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <CustomIconButton onClick={handleSearch}>
            <Search />
          </CustomIconButton>
        </Box>
      </Box>

      <Table
        stickyHeader
        aria-label="sticky table"
        style={{
          backgroundColor: "#f5f5f5",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>id</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>accountName</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>accountType</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>address</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>cityCode</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>groupId</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>openingBalance</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>drcr</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>unregister</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>gstNo</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>fssiNo</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>stateCode</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              bankAccountCode
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>bankName</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>branch</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>ifsc</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>whatsappNo</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              tdstcsApplicable
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>locked</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>email</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>ccEmail</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>mobileNo</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>tanNo</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>companyCode</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>createdBy</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>modifiedBy</TableCell>
          </TableRow>
        </TableHead>

        <tbody>
          {accountData.map((data) => (
            <TableRow
              key={data.id}
              onClick={() => {
                handleClick(data);
              }}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.accountName}</TableCell>
              <TableCell>{data.accountType}</TableCell>
              <TableCell>{data.address}</TableCell>
              <TableCell>{data.cityCode}</TableCell>
              <TableCell>{data.groupId}</TableCell>
              <TableCell>{data.openingBalance}</TableCell>
              <TableCell>{data.drcr}</TableCell>
              <TableCell>{data.unregister}</TableCell>
              <TableCell>{data.gstNo}</TableCell>
              <TableCell>{data.fssiNo}</TableCell>
              <TableCell>{data.stateCode}</TableCell>
              <TableCell>{data.bankAccountCode}</TableCell>
              <TableCell>{data.bankName}</TableCell>
              <TableCell>{data.branch}</TableCell>
              <TableCell>{data.ifsc}</TableCell>
              <TableCell>{data.whatsappNo}</TableCell>
              <TableCell>{data.tdstcsApplicable}</TableCell>
              <TableCell>{data.locked}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{data.ccEmail}</TableCell>
              <TableCell>{data.mobileNo}</TableCell>
              <TableCell>{data.tanNo}</TableCell>
              <TableCell>{data.companyCode}</TableCell>
              <TableCell>{data.createdBy}</TableCell>
              <TableCell>{data.modifiedBy}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default AccountMasterRecords;
