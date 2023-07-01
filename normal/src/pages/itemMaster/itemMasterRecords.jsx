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
import { getAllItemMasterData } from "../../api/itemMaster/itemMaster.request";
import ItemMasterForm from "./itemMasterForm";
import CustomIconButton from "../../components/Buttons/CustomIconButton";
import { Search } from "@mui/icons-material";
import { useIds } from "../IdsContext/IdsContext";
import { Link } from "react-router-dom";
import { useColors } from "../../hooks/use-colors";

const ItemMasterRecords = () => {
  const { ids, setIds } = useIds();
  const [itemMasterData, setItemMasterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [redirectToItemMasterForm, setRedirectToItemMasterForm] =
    useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchItemMasterData = async () => {
      try {
        const response = await getAllItemMasterData();
        setItemMasterData(response.data);
      } catch (error) {
        console.error("Failed to fetch itemMaster data", error);
      }
    };
    fetchItemMasterData();
  }, []);

  const handleSearch = () => {
    const filteredData = searchQuery
      ? itemMasterData.filter((data) =>
          data.itemName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : itemMasterData;
    setItemMasterData(filteredData);
  };

  const handleClick = (item) => {
    console.log(item);
    const itemMasterId = item.id;
    setIds((prev) => ({ ...prev, itemMasterId }));
    setRedirectToItemMasterForm(true);
    setSelectedData(item);
    //console.log(setSelectedData(data));
  };

  const handleAddClick = () => {
    setRedirectToItemMasterForm(true);
  };

  if (redirectToItemMasterForm) {
    return <ItemMasterForm data={selectedData} />;
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
        ItemMaster Records
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
              to="/itemMasterForm"
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
            label="Enter a Item name"
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
            <TableCell style={{ fontWeight: "bold" }}> itemCode</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>itemName</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>openingStock</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>wtPer</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>hsnNo</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>gstCode</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>isService</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>openingValue</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>ratePer</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              reverseCalculation
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>companyCode</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              purchaseAccount
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }}>pa</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>sellAccount</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>sa</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>createdBy</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>modifiedBy</TableCell>
          </TableRow>
        </TableHead>

        <tbody>
          {itemMasterData.map((data) => (
            <TableRow
              key={data.id}
              onClick={() => {
                handleClick(data);
              }}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.itemCode}</TableCell>
              <TableCell>{data.itemName}</TableCell>
              <TableCell>{data.openingStock}</TableCell>
              <TableCell>{data.wtPer}</TableCell>
              <TableCell>{data.hsnNo}</TableCell>
              <TableCell>{data.gstCode}</TableCell>
              <TableCell>{data.isService}</TableCell>
              <TableCell>{data.openingValue}</TableCell>
              <TableCell>{data.ratePer}</TableCell>
              <TableCell>{data.reverseCalculation}</TableCell>
              <TableCell>{data.companyCode}</TableCell>
              <TableCell>{data.purchaseAccount}</TableCell>
              <TableCell>{data.pa}</TableCell>
              <TableCell>{data.sellAccount}</TableCell>
              <TableCell>{data.sa}</TableCell>
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

export default ItemMasterRecords;
