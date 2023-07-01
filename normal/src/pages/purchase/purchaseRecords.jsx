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
import { getAllPurchaseData } from "../../api/purchase/purchase.request";
import PurchaseForm from "./purchase";
import CustomIconButton from "../../components/Buttons/CustomIconButton";
import { Search } from "@mui/icons-material";
import { useIds } from "../IdsContext/IdsContext";
import { Link } from "react-router-dom";
import { useColors } from "../../hooks/use-colors";

const PurchaseRecords = () => {
  const { ids, setIds } = useIds();
  const [purchaseData, setPurchaseData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [redirectToPurchaseForm, setRedirectToPurchaseForm] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchPurchaseData = async () => {
      try {
        const response = await getAllPurchaseData();
        setPurchaseData(response.data);
      } catch (error) {
        console.error("Failed to fetch purchase data", error);
      }
    };
    fetchPurchaseData();
  }, []);

  const handleSearch = () => {
    const filteredData = searchQuery
      ? purchaseData.filter((data) => {
          return parseInt(data.docNo) === parseInt(searchQuery);
        })
      : purchaseData;
    setPurchaseData(filteredData);
  };

  const handleClick = (purchase) => {
    //   console.log(item);
    //const purchaseId = purchase.id;
    //setIds((prev) => ({ ...prev, purchaseId }));
    setRedirectToPurchaseForm(true);
    setSelectedData(sales);
    //console.log(setSelectedData(data));
  };

  const handleAddClick = () => {
    setRedirectToPurchaseForm(true);
  };

  if (redirectToPurchaseForm) {
    return <PurchaseForm data={selectedData} />;
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
        Purchase Records
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
              to="/purchase"
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
            label="Enter a Document Number"
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
            <TableCell style={{ fontWeight: "bold" }}> tranType</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>cashCredit</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>docNo</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>docDate</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>accountCode</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>broker</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>LRNo</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>truckNo</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>taxableAmount</TableCell>
            {/* <TableCell style={{ fontWeight: "bold" }}>
              CGSTAmount
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>SGSTAmount</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>IGSTAmount</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>postage</TableCell> */}
            <TableCell style={{ fontWeight: "bold" }}>amount</TableCell>
            {/* <TableCell style={{ fontWeight: "bold" }}>TCSPar</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>TCSAmount</TableCell> */}
            <TableCell style={{ fontWeight: "bold" }}>companyCode</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>yearCode</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>createdBy</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>modifiedBy</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>billNo</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>ac</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>bc</TableCell>
            {/* <TableCell style={{ fontWeight: "bold" }}>TDSRate</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>TDSAmount</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>frieghtPerQntl</TableCell> */}
          </TableRow>
        </TableHead>

        <tbody>
          {purchaseData
          .filter((data) => data.tranType === "PD") 
          .map((data) => (
            <TableRow
              key={data.id}
              onClick={() => {
                handleClick(data);
              }}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.tranType}</TableCell>
              <TableCell>{data.cashCredit}</TableCell>
              <TableCell>{data.docNo}</TableCell>
              <TableCell>{data.docDate}</TableCell>
              <TableCell>{data.accountCode}</TableCell>
              <TableCell>{data.broker}</TableCell>
              <TableCell>{data.LRNo}</TableCell>
              <TableCell>{data.truckNo}</TableCell>
              <TableCell>{data.taxableAmount}</TableCell>
              {/* <TableCell>{data.CGSTAmount}</TableCell>
                <TableCell>{data.SGSTAmount}</TableCell>
                <TableCell>{data.IGSTAmount}</TableCell>
                <TableCell>{data.postage}</TableCell> */}
              <TableCell>{data.amount}</TableCell>
              {/* <TableCell>{data.TCSPar}</TableCell>
                <TableCell>{data.TCSAmount}</TableCell> */}
              <TableCell>{data.companyCode}</TableCell>
              <TableCell>{data.yearCode}</TableCell>
              <TableCell>{data.createdBy}</TableCell>
              <TableCell>{data.mofifiedBy}</TableCell>
              <TableCell>{data.billNo}</TableCell>
              <TableCell>{data.ac}</TableCell>
              <TableCell>{data.bc}</TableCell>
              {/* <TableCell>{data.TDSRate}</TableCell>
                <TableCell>{data.TDSAmount}</TableCell>
                <TableCell>{data.frieghtPerQntl}</TableCell> */}
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* {redirectToCompanyForm && <CompanyForm />} */}
    </Box>
  );
};

export default PurchaseRecords;
