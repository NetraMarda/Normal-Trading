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
import ServiceBillForm from "./serviceBill";
import { getAllServiceBillData } from "../../api/serviceBill/serviceBill.request";
import { useIds } from "../IdsContext/IdsContext";
import { Link } from "react-router-dom";
import { useColors } from "../../hooks/use-colors";

const ServiceBillRecords = () => {
  //const{ids,setIds}=useIds()
  const [serviceBillData, setServiceBillData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [redirectToServiceBillForm, setRedirectToServiceBillForm] =
    useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchServiceBillData = async () => {
      try {
        const response = await getAllServiceBillData();
        setServiceBillData(response.data);
      } catch (error) {
        console.error("Failed to fetch ServiceBill data:", error);
      }
    };
    fetchServiceBillData();
  }, []);

  const handleSearch = () => {
    const filteredData = searchQuery
      ? serviceBillData.filter((data) => {
          return parseInt(data.docNo) === parseInt(searchQuery);
        })
      : serviceBillData;
    setServiceBillData(filteredData);
  };

  const handleClick = (serviceBill) => {
    //console.log(accountMasterId)
    //const serviceBillId = service.id;
    //setIds((prev) => ({ ...prev, serviceBillId }));
    setRedirectToServiceBillForm(true);
    setSelectedData(service);
  };
  const handleAddClick = () => {
    setRedirectToServiceBillForm(true);
  };

  if (redirectToServiceBillForm) {
    return <ServiceBillForm data={selectedData} />;
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
        Service Bill Records
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
              to="/serviceBill"
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
            <TableCell style={{ fontWeight: "bold" }}>docNo</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>date</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>cc</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>gstRateCode</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>billNo</TableCell>
            {/* <TableCell style={{ fontWeight: "bold" }}> subTotal</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>CGSTRate</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>CGSTAmount</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>SGSTRate</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>SGSTAmount</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>IGSTAmount</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>IGSTRate</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>total</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>TDSPer</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>TDSAmount</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>TCSRate</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>TCSAmount</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>roundOff</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>finalAmount</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>isTDSTDS</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>TCSNetPayable</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>einvoiceNo</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>ackNo</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>QRCode</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>isDeleted</TableCell> */}
            <TableCell style={{ fontWeight: "bold" }}>companyCode</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>yearCode</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>createdBy</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>modifiedBy</TableCell>
          </TableRow>
        </TableHead>

        <tbody>
          {serviceBillData.map((data) => (
            <TableRow
              key={data.id}
              onClick={() => {
                handleClick(data);
              }}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.docNo}</TableCell>
              <TableCell>{data.date}</TableCell>
              <TableCell>{data.billNo}</TableCell>
              <TableCell>{data.cc}</TableCell>
              <TableCell>{data.gstRateCode}</TableCell>
              {/* <TableCell>{data.subTotal}</TableCell>
              <TableCell>{data.CGSTRate}</TableCell>
              <TableCell>{data.CGSTAmount}</TableCell>
              <TableCell>{data.SGSTRate}</TableCell>
              <TableCell>{data.SGSTAmount}</TableCell>
              <TableCell>{data.IGSTAmount}</TableCell>
              <TableCell>{data.IGSTRate}</TableCell>
              <TableCell>{data.total}</TableCell>
              <TableCell>{data.TDSPer}</TableCell>
              <TableCell>{data.TDSAmount}</TableCell>
              <TableCell>{data.TCSRate}</TableCell>
              <TableCell>{data.TCSAmount}</TableCell>
              <TableCell>{data.roundOff}</TableCell>
              <TableCell>{data.finalAmount}</TableCell>
              <TableCell>{data.isTDS}</TableCell>
              <TableCell>{data.TDS}</TableCell>
              <TableCell>{data.TCSNetPayable}</TableCell>
              <TableCell>{data.einvoiceNo}</TableCell>
              <TableCell>{data.ackNo}</TableCell>
              <TableCell>{data.QRCode}</TableCell>
              <TableCell>{data.isDeleted}</TableCell> */}
              <TableCell>{data.companyCode}</TableCell>
              <TableCell>{data.yearCode}</TableCell>
              <TableCell>{data.createdBy}</TableCell>
              <TableCell>{data.modifiedBy}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default ServiceBillRecords;
