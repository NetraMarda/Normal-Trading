import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { getAllCompanyData } from "../../../api/company/company.request";
import { getAllItemMasterData } from "../../../api/itemMaster/itemMaster.request";
import MenuBar from "../../menu/menuBar";
import { useColors } from "../../../hooks/use-colors";
import CustomIconButton from "../../../components/Buttons/CustomIconButton";
import { Search } from "@mui/icons-material";
import { getAllSalesDetailData } from "../../../api/sales/salesDetail.request";
import { getAllSalesData } from "../../../api/sales/sales.request";

const SalesLedger = () => {
  const [salesData, setSalesData] = useState([]);
  const [headData, setHeadData] = useState([]);
  const [salesHeadData, setSalesHeadData] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [originalSalesData, setOriginalSalesData] = useState([]);
  const [originalHeadData, setOriginalHeadData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalValue, setTotalValue] = useState(0);

  //console.log("detail",salesData)
  //console.log("head",salesHeadData)

  const calculateTotals = (data) => {
    let totalValues = 0;

    data.forEach((entry) => {
      totalValues += entry.value;
    });

    setTotalValue(totalValues);
  };

  useEffect(() => {
    calculateTotals(salesData);
  }, [salesData]);

  // const totalValues = data.reduce((sum, purchase) => sum + purchase.value, 0);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await getAllSalesDetailData();
        setSalesData(response.data);
        setDetailData(response.data);
        setOriginalSalesData(response.data);
        // console.log(response.data)
        // setTotalValue(totalValues);
      } catch (error) {
        console.error("Failed to fetch Purchase data", error);
      }
    };
    fetchSalesData();
  }, []);

  useEffect(() => {
    const fetchSalesHeadData = async () => {
      try {
        const response = await getAllSalesData();
        setSalesHeadData(response.data);
        setHeadData(response.data);
        setOriginalHeadData(response.data);
        //setData(response.data);
      } catch (error) {
        console.error("Failed to fetch Purchase data", error);
      }
    };
    fetchSalesHeadData();
  }, []);

  const getSalesDate = (pid) => {
    for (let i = 0; i < salesHeadData.length; i++) {
      if (salesHeadData[i].id === pid) {
        const docDate = salesHeadData[i].docDate;
        return docDate;
      }
    }
  };

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const companyResponse = await getAllCompanyData();
        setCompanyData(companyResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchCompanyData();
  }, []);

  const getCompanyName = (cid) => {
    const comName = companyData.find((company) => company.id === cid);
    return comName ? comName.companyName : "";
  };

  const handleSearch = () => {
    const filteredHeadData = searchQuery
      ? headData.filter((data) => {
          const year = new Date(data.docDate).getFullYear().toString();
          return year === searchQuery;
        })
      : headData;

    const filteredSalesData = filteredHeadData.reduce((acc, salesHead) => {
      const filteredDetails = detailData.filter(
        (detail) => detail.sbId === salesHead.id
      );
      console.log(filteredDetails);
      return acc.concat(filteredDetails);
    }, []);

    setSalesHeadData(filteredHeadData);
    setSalesData(filteredSalesData);
    calculateTotals(filteredSalesData);

    if (filteredSalesData.length === 0) {
      setTotalValue(0);
    }
  };

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const itemResponse = await getAllItemMasterData();
        //console.log(itemResponse.data)
        setItemData(itemResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchItemData();
  }, []);

  const getItemName = (itemId) => {
    //console.log(itemId);
    const itemName = itemData.find((item) => item.itemCode === itemId);
    return itemName ? itemName.itemName : "";
  };

  const colors = useColors();

  const handleClear = () => {
    setSearchQuery("");

    setSalesData(originalSalesData);
    setSalesHeadData(originalHeadData);
    calculateTotals(originalSalesData);
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
            Sales Ledger
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
            sx={{ bgcolor: colors.blue[500], color:"black", ml: 10 }}
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
          <Table sx={{ maxWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Item</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salesData.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell>{getSalesDate(purchase.sbId)}</TableCell>
                  <TableCell>{getCompanyName(purchase.companyCode)}</TableCell>
                  <TableCell>{getItemName(purchase.itemCode)}</TableCell>
                  <TableCell>{purchase.quantity}</TableCell>
                  <TableCell>{purchase.rate}</TableCell>
                  <TableCell>{purchase.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} align="right">
                  Total Value:
                </TableCell>
                <TableCell>{totalValue}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default SalesLedger;
