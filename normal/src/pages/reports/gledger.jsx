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
  Button
} from "@mui/material";
import { React, useState, useEffect } from "react";
import CustomIconButton from "../../components/Buttons/CustomIconButton";
import { Search } from "@mui/icons-material";
import MenuBar from "../menu/menuBar";
import { getAllPaymentDetailData } from "../../api/payment/paymentDetail.request";
import { getAllAccountMasterData } from "../../api/accountMaster/accountMaster.request";
import { useColors } from "../../hooks/use-colors";

const GledgerReport = () => {
  const [gledgerData, setGLedgerData] = useState([]);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [accountData, setAccountData] = useState([]);
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
        setOriginalData(response.data)
      } catch (error) {
        console.error("Failed to fetch GLedger data", error);
      }
    };
    fetchGLedgerData();
  }, []);

  useEffect(() => {
    const fetchAccountMasterData = async () => {
      try {
        const accountResponse = await getAllAccountMasterData();
        setAccountData(accountResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchAccountMasterData();
  }, []);

  const getAccountName = (acCode) => {
    const account = accountData.find((account) => account.id === acCode);
    return account ? account.accountName : "";
  };

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
    calculateTotals(originalData)
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
            General Ledger
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
                <TableCell>DOC_NO</TableCell>
                <TableCell>AC_CODE</TableCell>
                <TableCell>AC_NAME</TableCell>
                <TableCell>DEBIT</TableCell>
                <TableCell>CREDIT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gledgerData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.docDate}</TableCell>
                  <TableCell>{data.docNo}</TableCell>
                  <TableCell>{data.ac}</TableCell>
                  <TableCell>{getAccountName(data.ac)}</TableCell>
                  <TableCell>{data.drcr === "0" ? data.amount : ""}</TableCell>
                  <TableCell>{data.drcr === "1" ? data.amount : ""}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4}></TableCell>
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

export default GledgerReport;
