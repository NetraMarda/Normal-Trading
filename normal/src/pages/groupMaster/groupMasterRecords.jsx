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
import { getAllGroupMasterData } from "../../api/groupMaster/groupMaster.request";
import GroupMasterForm from "./groupMasterForm";
import CustomIconButton from "../../components/Buttons/CustomIconButton";
import { Search } from "@mui/icons-material";
import { useIds } from "../IdsContext/IdsContext";
import { Link } from "react-router-dom";
import { useColors } from "../../hooks/use-colors";

const GroupMasterRecords = () => {
  const { ids, setIds } = useIds();

  const [groupMasterData, setGroupMasterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [redirectToGroupMasterForm, setRedirectToGroupMasterForm] =
    useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchGroupMasterData = async () => {
      try {
        const response = await getAllGroupMasterData();
        setGroupMasterData(response.data);
      } catch (error) {
        console.error("Failed to fetch group data:", error);
      }
    };
    fetchGroupMasterData();
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      const filteredData = groupMasterData.filter((data) =>
        data.groupName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setGroupMasterData(filteredData);
    } else {
      setGroupMasterData(groupMasterData);
    }
  };

  const handleClick = (group) => {
    console.log(group.id);
    const groupMasterId = group.id;
    setIds((prev) => ({ ...prev, groupMasterId }));
    setRedirectToGroupMasterForm(true);
    setSelectedData(group);
  };

  const handleAddClick = () => {
    setRedirectToGroupMasterForm(true);
  };

  if (redirectToGroupMasterForm) {
    return <GroupMasterForm data={selectedData} />;
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
        GroupMaster Records
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
              to="/groupMasterForm"
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
            label="Enter a Group name"
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
            <TableCell style={{ fontWeight: "bold" }}>groupName</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>groupType</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>groupOrder</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>companyCode</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>createdBy</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>modifiedBy</TableCell>
          </TableRow>
        </TableHead>

        <tbody>
          {groupMasterData.map((data) => (
            <TableRow
              key={data.id}
              onClick={() => {
                handleClick(data);
              }}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.groupName}</TableCell>
              <TableCell>{data.groupType}</TableCell>
              <TableCell>{data.groupOrder}</TableCell>
              <TableCell>{data.companyCode}</TableCell>
              <TableCell>{data.createdBy}</TableCell>
              <TableCell>{data.modifiedBy}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default GroupMasterRecords;
