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
import { Link } from "react-router-dom";
import { getAllCompanyData } from "../../api/company/company.request";
import CompanyForm from "./CompanyForm";
import CustomIconButton from "../../components/Buttons/CustomIconButton";
import { Search } from "@mui/icons-material";
import { useColors } from "../../hooks/use-colors";

const CompanyRecords = () => {
  const [companyData, setCompanyData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [redirectToCompanyForm, setRedirectToCompanyForm] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await getAllCompanyData();
        setCompanyData(response.data);
      } catch (error) {
        console.error("Failed to fetch company data:", error);
      }
    };
    fetchCompanyData();
  }, []);

  const handleSearch = () => {
    if (searchQuery) {
      const filteredData = companyData.filter((data) =>
        data.companyName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCompanyData(filteredData);
    } else {
      setCompanyData(companyData);
    }
  };

  const handleClick = (e) => {
    console.log(e);
    setRedirectToCompanyForm(true);
    setSelectedData(e);
    //console.log(setSelectedData(data));
  };

  if (redirectToCompanyForm) {
    return <CompanyForm data={selectedData} />;
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
        Company Records
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
              handleClick();
            }}
          >
            <Link
              to="/companyForm"
              style={{
               color:"black",
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
            label="Enter a Company name"
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
            <TableCell style={{ fontWeight: "bold" }}>companyName</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>city</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>state</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>mobile</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>gstNo</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>panNo</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>createdBy</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>modifiedBy</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>fssiNo</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>signPath</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>logoPath</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>stateCode</TableCell>
          </TableRow>
        </TableHead>

        <tbody>
          {companyData.map((data) => (
            <TableRow
              key={data.id}
              onClick={() => {
                handleClick(data);
              }}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.companyName}</TableCell>
              <TableCell>{data.city}</TableCell>
              <TableCell>{data.state}</TableCell>
              <TableCell>{data.mobile}</TableCell>
              <TableCell>{data.gstNo}</TableCell>
              <TableCell>{data.panNo}</TableCell>
              <TableCell>{data.createdBy}</TableCell>
              <TableCell>{data.modifiedBy}</TableCell>
              <TableCell>{data.fssiNo}</TableCell>
              <TableCell>{data.signPath}</TableCell>
              <TableCell>{data.logoPath}</TableCell>
              <TableCell>{data.stateCode}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* {redirectToCompanyForm && <CompanyForm />} */}
    </Box>
  );
};

export default CompanyRecords;
