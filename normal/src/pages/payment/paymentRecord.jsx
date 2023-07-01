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
import { useIds } from "../IdsContext/IdsContext";
import { getAllPaymentHeadData } from "../../api/payment/paymentHead.request";
import PaymentForm from "./payment";
import { Link } from "react-router-dom";
import { useColors } from "../../hooks/use-colors";

const PaymentRecords = () => {
  const { ids, setIds } = useIds();
  const [paymentData, setPaymentData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [redirectToPaymentForm, setRedirectToPaymentForm] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await getAllPaymentHeadData();
        setPaymentData(response.data);
      } catch (error) {
        console.error("Failed to fetch payment data", error);
      }
    };
    fetchPaymentData();
  }, []);

  const handleSearch = () => {
    const filteredData = searchQuery
      ? paymentData.filter((data) => {
          return parseInt(data.docNo) === parseInt(searchQuery);
        })
      : paymentData;
    setPaymentData(filteredData);
  };

  const handleClick = (item) => {
    console.log(item);
    //const journalVourcherId = item.id;
    //setIds((prev) => ({ ...prev, journalVourcherId }));
    setRedirectToPaymentForm(true);
    setSelectedData(item);
    //console.log(setSelectedData(data));
  };

  const handleAddClick = () => {
    setRedirectToPaymentForm(true);
  };

  if (redirectToPaymentForm) {
    return <PaymentForm data={selectedData} />;
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
        Reciept / Payment Records
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
              to="/payment"
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
            <TableCell style={{ fontWeight: "bold" }}>tranType</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>docNo</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>docDate</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>total</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>cb</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>companyCode</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>yearCode</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>createdBy</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>modifiedBy</TableCell>
          </TableRow>
        </TableHead>

        <tbody>
          {paymentData.map((data) => (
            <TableRow
              key={data.id}
              onClick={() => {
                handleClick(data);
              }}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.tranType}</TableCell>
              <TableCell>{data.docNo}</TableCell>
              <TableCell>{data.docDate}</TableCell>
              <TableCell>{data.total}</TableCell>
              <TableCell>{data.cb}</TableCell>
              <TableCell>{data.companyCode}</TableCell>
              <TableCell>{data.year}</TableCell>
              <TableCell>{data.createdBy}</TableCell>
              <TableCell>{data.mofifiedBy}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* {redirectToCompanyForm && <CompanyForm />} */}
    </Box>
  );
};

export default PaymentRecords;
