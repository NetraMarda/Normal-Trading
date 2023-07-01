import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { React, useState, useEffect } from "react";
import CustomIconButton from "../../../components/Buttons/CustomIconButton";
import { Search } from "@mui/icons-material";
import MenuBar from "../../menu/menuBar";
import { getAllPaymentDetailData } from "../../../api/payment/paymentDetail.request";
import { getAllAccountMasterData } from "../../../api/accountMaster/accountMaster.request";
import { useColors } from "../../../hooks/use-colors";

const TrialBalanceReport = () => {
  const [gledgerData, setGLedgerData] = useState([]);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);

  const colors = useColors();

  useEffect(() => {
    const fetchGLedgerData = async () => {
      try {
        const response = await getAllPaymentDetailData();
        setGLedgerData(response.data);
        setData(response.data);
        setOriginalData(response.data);
      } catch (error) {
        console.error("Failed to fetch GLedger data", error);
      }
    };
    fetchGLedgerData();
  }, []);

  const handleSearch = () => {
    const filteredData = searchQuery
      ? data.filter((data) => {
          const year = new Date(data.docDate).getFullYear().toString();
          return year === searchQuery;
        })
      : data;
    console.log(filteredData);
    setGLedgerData(filteredData);
    calculateTotals(filteredData);

    if (filteredData.length === 0) {
      setTotalDebit(0);
      setTotalCredit(0);
    }
  };

  const calculateTotals = (data) => {
    console.log(data);
    let totalDebitAmount = 0;
    let totalCreditAmount = 0;

    data.forEach((entry) => {
      if (entry.drcr === "0") {
        totalDebitAmount += entry.amount;
      } else if (entry.drcr === "1") {
        totalCreditAmount += entry.amount;
      }
    });

    setTotalDebit(totalDebitAmount);
    setTotalCredit(totalCreditAmount);
  };

  useEffect(() => {
    calculateTotals(gledgerData);
  }, [gledgerData]);

  const handleClear = () => {
    setSearchQuery("");

    setGLedgerData(originalData);
    calculateTotals(originalData);
  };

  const getTransactionLabel = (tranType) => {
    switch (tranType) {
      case "CR":
        return "Cash Receipt";
      case "BR":
        return "Bank Receipt";
      case "CP":
        return "Cash Payment";
      case "BP":
        return "Bank Payment";
      default:
        return tranType; 
    }
  };
  

  return (
    <>
      <MenuBar />
      <Box
        sx={{
          bgcolor: colors.bgColor,
          width: "100%",
          height: "100%",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 17,
        }}
      >
        <Box
          sx={{
            bgcolor: colors.card,
            p: 2,
            borderRadius: 3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              textTransform: "uppercase",
              fontWeight: 500,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            variant="h5"
          >
            Trial Balance Ledger
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            gap: 2,
            p: 2,
            borderRadius: 3,
          }}
        >
          <Button
            sx={{ bgcolor: colors.blue[500], color: "black", ml: 10 }}
            onClick={handleClear}
          >
            Clear
          </Button>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <TextField
              id="search-bar"
              className="text"
              label="Enter Year"
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

        <TableContainer sx={{ display: "flex", justifyContent: "center" }}>
          <Table sx={{ maxWidth: 650 }} aria-label="Gledger Report">
            <TableHead>
              <TableRow>
                <TableCell>DOC_DATE</TableCell>
                <TableCell>TRAN_TYPE</TableCell>

                <TableCell>DEBIT</TableCell>
                <TableCell>CREDIT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gledgerData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.docDate}</TableCell>
                  <TableCell>{getTransactionLabel(data.tranType)}</TableCell>

                  <TableCell>{data.drcr === "0" ? data.amount : ""}</TableCell>
                  <TableCell>{data.drcr === "1" ? data.amount : ""}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2}></TableCell>
                <TableCell>Total Debit: {totalDebit}</TableCell>
                <TableCell>Total Credit: {totalCredit}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default TrialBalanceReport;
