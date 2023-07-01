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
  Button
} from "@mui/material";
import { getAllPurchaseDetailData } from "../../../api/purchase/purchaseDetail.request";
import { getAllCompanyData } from "../../../api/company/company.request";
import { getAllItemMasterData } from "../../../api/itemMaster/itemMaster.request";
import MenuBar from "../../menu/menuBar";
import { useColors } from "../../../hooks/use-colors";
import CustomIconButton from "../../../components/Buttons/CustomIconButton";
import { Search } from "@mui/icons-material";
import { getAllPurchaseData } from "../../../api/purchase/purchase.request";

const PurchaseLedger = () => {
  const [purchaseData, setPurchaseData] = useState([]);
  const [headData, setHeadData] = useState([]);
  const [purchaseHeadData, setPurchaseHeadData] = useState([]);
  const [detailData, setDetailData] = useState([]);
  const [originalPurchaseData, setOriginalPurchaseData] = useState([]);
  const [originalHeadData, setOriginalHeadData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalValue, setTotalValue] = useState(0);

  //console.log("detail",purchaseData)
  //console.log("head",purchaseHeadData)

  const calculateTotals = (data) => {
    let totalValues = 0;

    data.forEach((entry) => {
      totalValues += entry.value;
    });

    setTotalValue(totalValues);
  };

  useEffect(() => {
    calculateTotals(purchaseData);
  }, [purchaseData]);

  // const totalValues = data.reduce((sum, purchase) => sum + purchase.value, 0);

  useEffect(() => {
    const fetchPurchaseData = async () => {
      try {
        const response = await getAllPurchaseDetailData();
        setPurchaseData(response.data);
        setDetailData(response.data);
        setOriginalPurchaseData(response.data);
        // setTotalValue(totalValues);
      } catch (error) {
        console.error("Failed to fetch Purchase data", error);
      }
    };
    fetchPurchaseData();
  }, []);

  useEffect(() => {
    const fetchPurchaseHeadData = async () => {
      try {
        const response = await getAllPurchaseData();
        setPurchaseHeadData(response.data);
        setHeadData(response.data);
        setOriginalHeadData(response.data);
        //setData(response.data);
      } catch (error) {
        console.error("Failed to fetch Purchase data", error);
      }
    };
    fetchPurchaseHeadData();
  }, []);

  const getPurchaseDate = (pid) => {
    for (let i = 0; i < purchaseHeadData.length; i++) {
      if (purchaseHeadData[i].id === pid) {
        const docDate = purchaseHeadData[i].docDate;
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

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const itemResponse = await getAllItemMasterData();
        setItemData(itemResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchItemData();
  }, []);

  const handleSearch = () => {
    const filteredHeadData = searchQuery
      ? headData.filter((data) => {
          const year = new Date(data.docDate).getFullYear().toString();
          return year === searchQuery;
        })
      : headData;

    const filteredPurchaseData = filteredHeadData.reduce(
      (acc, purchaseHead) => {
        const filteredDetails = detailData.filter(
          (detail) => detail.psId === purchaseHead.id
        );
        return acc.concat(filteredDetails);
      },
      []
    );

    setPurchaseHeadData(filteredHeadData);
    setPurchaseData(filteredPurchaseData);
    calculateTotals(filteredPurchaseData);

    if (filteredPurchaseData.length === 0) {
      setTotalValue(0);
    }
  };

  const getItemName = (itemId) => {
    //console.log(itemId);
    const itemName = itemData.find((item) => item.itemCode === itemId);
    return itemName ? itemName.itemName : "";
  };

  const colors = useColors();

  
  const handleClear = () => {
    setSearchQuery("");

    setPurchaseData(originalPurchaseData);
    setPurchaseHeadData(originalHeadData);
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
            Purchase Ledger
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
              {purchaseData.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell>{getPurchaseDate(purchase.psId)}</TableCell>
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

export default PurchaseLedger;
