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
import { getAllJournalVourcherHeadData } from "../../api/journalVourcher/journalVourcherHead.request";
import JournalVourcherForm from "./journalVourcher";
import CustomIconButton from "../../components/Buttons/CustomIconButton";
import { Search } from "@mui/icons-material";
import { useIds } from "../IdsContext/IdsContext";
import { Link } from "react-router-dom";
import { useColors } from "../../hooks/use-colors";

const JournalVourcherRecords = () => {
  const { ids, setIds } = useIds();
  const [journalVourcherData, setJournalVourcherData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [redirectToJournalVourcherForm, setredirectToJournalVourcherForm] =
    useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchJournalVourcherData = async () => {
      try {
        const response = await getAllJournalVourcherHeadData();
        setJournalVourcherData(response.data);
      } catch (error) {
        console.error("Failed to fetch journalVourcher data", error);
      }
    };
    fetchJournalVourcherData();
  }, []);

  const handleSearch = () => {
    const filteredData = searchQuery
      ? journalVourcherData.filter((data) => {
          return parseInt(data.docNo) === parseInt(searchQuery);
        })
      : journalVourcherData;
    setJournalVourcherData(filteredData);
  };

  const handleClick = (item) => {
    console.log(item);
    const journalVourcherId = item.id;
    setIds((prev) => ({ ...prev, journalVourcherId }));
    setredirectToJournalVourcherForm(true);
    setSelectedData(item);
    //console.log(setSelectedData(data));
  };

  const handleAddClick = () => {
    setredirectToJournalVourcherForm(true);
  };

  if (redirectToJournalVourcherForm) {
    return <JournalVourcherForm data={selectedData} />;
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
        Journal Vourcher Records
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
              to="/journalVourcher"
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
          {journalVourcherData.map((data) => (
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

export default JournalVourcherRecords;
