import {
  Typography,
  Box,
  Table,
  TableHead,
  TableCell,
  TableRow,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormControl,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useColors } from "../../hooks/use-colors";
import { getAllCompanyData } from "../../api/company/company.request";
import { useState, useEffect } from "react";
import CompanyForm from "../company/CompanyForm";
import { useIds } from "../IdsContext/IdsContext";
import { getAllAccountingYearData } from "../../api/accountingYear/accountingYear.request";

const CompanySelection = () => {
  const { ids, setIds } = useIds();

  const colors = useColors();
  const [companyData, setCompanyData] = useState([]);
  const [redirectToCompanyForm, setRedirectToCompanyForm] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const [selectedYearData, setSelectedYearData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    const fetchSelectedYearData = async () => {
      try {
        const response = await getAllAccountingYearData();
        setSelectedYearData(response.data);
        if (response.data.length > 0) {
          setSelectedYear(response.data[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch accounting year data:", error);
      }
    };
    fetchSelectedYearData();
  }, []);

  const handleYearChange = (event) => {
    const selectedOptionId = event.target.value;
    const selectedOption = selectedYearData.find(
      (year) => year.id === selectedOptionId
    );

    if (selectedOption) {
      setSelectedYear(selectedOption.id);
    }
    setIds((prev) => ({ ...prev, accountingYearId: selectedOptionId }));
  };

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

  console.log(selectedYearData);

  const handleClick = (companyId, companyName) => {
    setSelectedCompanyId(companyId);
    setIds((prev) => ({ ...prev, companyId }));

    const selectedYearObj = selectedYearData.find(
      (year) => year.id === selectedYear
    );
    const fromDate = new Date(selectedYearObj.fromDate);
    const selectedYearFull = fromDate.getFullYear();

    console.log(selectedYearFull)

    alert(
      `You have selected company : ${companyName} , and AccountingYear : ${selectedYearFull}`
    );
    console.log(companyId);
  };

  const handleSelect = (e) => {
    if (selectedCompanyId) {
      setRedirectToCompanyForm(true);
    }
  };

  const selectedCompany = companyData.find(
    (data) => data.id === selectedCompanyId
  );

  if (redirectToCompanyForm) {
    return <CompanyForm data={selectedCompany} />;
  }

  return (
    <Box
      sx={{
        height: "100%",
        width: "90%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            mt: 4,
          }}
        >
          <FormControl fullWidth variant="outlined" sx={{ width: "140%" }}>
            <InputLabel
              required
              id="selectYear-label"
              // shrink={
              //   groupMasterData.length > 0 || selectedGroupId ? true : false
              // }
            >
              Select Year
            </InputLabel>
            {selectedYear && (
              <Select
                labelId="selectYear-label"
                id="selectYear"
                label="Select Year"
                variant="outlined"
                value={selectedYear}
                {...console.log(selectedYear)}
                onChange={handleYearChange}
              >
                {selectedYearData.map((year) => (
                  <MenuItem key={year.id} value={year.id}>
                    {new Date(year.fromDate).getFullYear()}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
        </Box>
        <Typography
          sx={{
            textTransform: "uppercase",
            fontWeight: 500,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 4,
          }}
          variant="h4"
        >
          Company Selection
        </Typography>

        <Box
          sx={{
            pt: 4,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box sx={{ pr: 3 }}>
            <Button color="green" variant="contained" onClick={handleSelect}>
              <Link to="/companyForm" style={{textDecoration:"none" , color:"black"}}>Select</Link>
            </Button>
          </Box>
          {/* <Box>
            <Button color="red" variant="contained">
              Exit
            </Button>
          </Box> */}
        </Box>
      </Box>

      <Table
        stickyHeader
        aria-label="sticky table"
        style={{
          backgroundColor: "#f5f5f5",
          mt: 4,
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>id</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Company Name</TableCell>
          </TableRow>
        </TableHead>

        <tbody>
          {companyData.map((data) => (
            <TableRow
              key={data.id}
              onClick={() => handleClick(data.id, data.companyName)}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{data.id}</TableCell>
              <TableCell>{data.companyName}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export default CompanySelection;
