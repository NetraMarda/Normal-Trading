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
import { getAllStateMasterData } from "../../api/stateMaster/stateMaster.request";
import StateMasterForm from "../../pages/stateMaster/stateMasterForm";
import CustomIconButton from "../../components/Buttons/CustomIconButton";
import { Search } from "@mui/icons-material";
import { useIds } from "../IdsContext/IdsContext";
import { Link } from "react-router-dom";
import { useColors } from "../../hooks/use-colors";

const StateMasterRecords = () => {
  const { ids, setIds } = useIds();
  const [stateMasterData, setStateMasterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [redirectToStateMasterForm, setRedirectToStateMasterForm] =
    useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchStateMasterData = async () => {
      try {
        const response = await getAllStateMasterData();
        setStateMasterData(response.data);
      } catch (error) {
        console.error("Failed to fetch State data:", error);
      }
    };
    fetchStateMasterData();
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      const filteredData = stateMasterData.filter((data) =>
        data.cityName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setStateMasterData(filteredData);
    } else {
      setStateMasterData(stateMasterData);
    }
  };

  const handleClick = (state) => {
    console.log(state);
    const stateMasterId = state.id;
    setIds((prev) => ({ ...prev, stateMasterId }));
    setRedirectToStateMasterForm(true);
    setSelectedData(state);
    //console.log(setSelectedData(data));
  };

  const handleAddClick = () => {
    setRedirectToStateMasterForm(true);
  };

  if (redirectToStateMasterForm) {
    return <StateMasterForm data={selectedData} />;
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
        StateMaster Records
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
              to="/stateMasterForm"
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
            label="Enter a City name"
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
            <TableCell style={{ fontWeight: "bold" }}>cityName</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>pincode</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>state</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>subArea</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>companyCode</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>state</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>createdBy</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>modifiedBy</TableCell>
          </TableRow>
        </TableHead>

        <tbody>
          {stateMasterData.map((data) => (
            <TableRow
              key={data.id}
              onClick={() => {
                handleClick(data);
              }}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.cityName}</TableCell>
              <TableCell>{data.pincode}</TableCell>
              <TableCell>{data.subArea}</TableCell>
              <TableCell>{data.state}</TableCell>
              <TableCell>{data.companyCode}</TableCell>
              <TableCell>{data.state}</TableCell>
              <TableCell>{data.createdBy}</TableCell>
              <TableCell>{data.modifiedBy}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* {redirectTostateForm && <stateForm />} */}
    </Box>
  );
};

export default StateMasterRecords;
