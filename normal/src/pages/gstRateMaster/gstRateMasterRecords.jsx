import { React, useState, useEffect } from "react";
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
import { getAllGstRateMasterData } from "../../api/gstRateMaster/gstRateMaster.request";
import GstRateMasterForm from "./gstRateMasterForm";
import CustomIconButton from "../../components/Buttons/CustomIconButton";
import { Search } from "@mui/icons-material";
import { useIds } from "../IdsContext/IdsContext";
import { Link } from "react-router-dom";
import { useColors } from "../../hooks/use-colors";

const GstRateMasterRecords = () => {
  const { ids, setIds } = useIds();

  const [gstRateMasterData, setGstRateMasterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [redirectToGstRateMasterForm, setRedirectToGstRateMasterForm] =
    useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchGstRateMasterData = async () => {
      try {
        const response = await getAllGstRateMasterData();
        setGstRateMasterData(response.data);
      } catch (error) {
        console.error("Failed to fetch gstRate data:", error);
      }
    };
    fetchGstRateMasterData();
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      const filteredData = gstRateMasterData.filter((data) =>
        data.gstName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setGstRateMasterData(filteredData);
    } else {
      setGstRateMasterData(gstRateMasterData);
    }
  };

  const handleClick = (gstRate) => {
    console.log(gstRate);
    const gstRateMasterId = gstRate.id;
    setIds((prev) => ({ ...prev, gstRateMasterId }));
    setRedirectToGstRateMasterForm(true);
    setSelectedData(gstRate);
    //console.log(setSelectedData(data));
  };

  const handleAddClick = () => {
    setRedirectToGstRateMasterForm(true);
  };

  if (redirectToGstRateMasterForm) {
    return <GstRateMasterForm data={selectedData} />;
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
        GstRateMaster Records
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
              to="/gstRateMasterForm"
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
            label="Enter a Gst name"
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
            <TableCell style={{ fontWeight: "bold" }}>gstName</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>rate</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>cGstRate</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>sGstRate</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>iGstRate</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>companyCode</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>createdBy</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>modifiedBy</TableCell>
          </TableRow>
        </TableHead>

        <tbody>
          {gstRateMasterData.map((data) => (
            <TableRow
              key={data.id}
              onClick={() => {
                handleClick(data);
              }}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.gstName}</TableCell>
              <TableCell>{data.rate}</TableCell>
              <TableCell>{data.cGstRate}</TableCell>
              <TableCell>{data.sGstRate}</TableCell>
              <TableCell>{data.iGstRate}</TableCell>
              <TableCell>{data.companyCode}</TableCell>
              <TableCell>{data.createdBy}</TableCell>
              <TableCell>{data.modifiedBy}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* {redirectToCompanyForm && <CompanyForm />} */}
    </Box>
  );
};

export default GstRateMasterRecords;
