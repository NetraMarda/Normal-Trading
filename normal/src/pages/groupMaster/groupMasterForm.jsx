import { React, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import {
  ArrowBack,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import {
  useInsertIntoGroupMasterData,
  useUpdateIntoGroupMasterData,
  useDeleteIntoGroupMasterData,
} from "../../hooks/groupMaster/groupMaster.mutation";
import { useColors } from "../../hooks/use-colors";
import CustomIconButton from "../../components/Buttons/CustomIconButton";
import GroupMasterRecords from "./groupMasterRecords";
import MenuBar from "../menu/menuBar";
import { useIds } from "../IdsContext/IdsContext";
import { Link } from "react-router-dom";

const GroupMasterForm = ({ data }) => {
  const { ids } = useIds();
  const [groupMasterData, setGroupMasterData] = useState({
    groupName: "",
    groupType: "",
    groupOrder: "",
    companyCode: "",
    createdBy: null,
    modifiedBy: null,
  });

  const [groupMasterId, setGroupMasterId] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [redirectToGroupMasterRecords, setRedirectToGroupMasterRecords] =
    useState(false);

  const handleInputData = (e) => {
    setGroupMasterData({ ...groupMasterData, [e.target.name]: e.target.value });
  };

  const handleGroupMasterRecordsData = () => {
    setGroupMasterData(data);
    setGroupMasterId(data.id);
  };

  const handleClick = () => {
    setRedirectToGroupMasterRecords(true);
  };

  const handleClear = () => {
    setGroupMasterId(null);
    setGroupMasterData({
      groupName: "",
      groupType: "",
      groupOrder: "",
      companyCode: "",
      createdBy: null,
      modifiedBy: null,
    });
  };

  const insertGroupMasterMutation = useInsertIntoGroupMasterData();

  function handleInsertGroupMasterData() {
    insertGroupMasterMutation.mutate({
      ...groupMasterData,
      companyCode: ids.companyId,
      createdBy: ids.userId,
    });
    setIsDisabled(!isDisabled);
    setGroupMasterId(null);
    setGroupMasterData({
      groupName: "",
      groupType: "",
      groupOrder: "",
      companyCode: "",
      createdBy: null,
      modifiedBy: null,
    });
    setManageButton({
      create: false,
      save: true,
      delete: false,
      update: false,
      cancel: false,
      edit: false,
    });
  }
  const updateGroupMasterMutation = useUpdateIntoGroupMasterData();

  function handleUpdateGroupMasterData() {
    updateGroupMasterMutation.mutate(groupMasterData);
    setIsDisabled(!isDisabled);
    setGroupMasterId(null);
    setGroupMasterData({
      groupName: "",
      groupType: "",
      groupOrder: "",
      companyCode: "",
      createdBy: null,
      modifiedBy: null,
    });
    setManageButton({
      create: false,
      save: true,
      delete: false,
      update: false,
      cancel: false,
      edit: false,
    });
  }
  const deleteGroupMasterMutation = useDeleteIntoGroupMasterData();

  function handleDeleteGroupMasterData() {
    deleteGroupMasterMutation.mutate({ id: groupMasterId });
    setIsDisabled(!isDisabled);
    setGroupMasterId(null);
    setGroupMasterData({
      groupName: "",
      groupType: "",
      groupOrder: "",
      companyCode: "",
      createdBy: null,
      modifiedBy: null,
    });
    setManageButton({
      create: false,
      save: true,
      delete: false,
      update: false,
      cancel: false,
      edit: false,
    });
  }

  const [manageButton, setManageButton] = useState({
    create: false,
    save: true,
    delete: false,
    update: false,
    cancel: false,
    edit: false,
  });

  const colors = useColors();

  return (
    <>
      {redirectToGroupMasterRecords ? (
        <GroupMasterRecords />
      ) : (
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
              mt: 18,
            }}
          >
            <Box
              sx={{
                bgcolor: colors.card,
                p: 3,
                borderRadius: 3,
                display: "flex",
              }}
            >
              <CustomIconButton
                color={colors.blue[500]}
                onClick={() => {
                  handleClick();
                }}
                description={"Go Back To GroupMaster Records"}
              >
                <Link to="/groupMasterRecords" style={{ color: "white" }}>
                  <ArrowBack />
                </Link>
              </CustomIconButton>

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
                GroupMaster Form
              </Typography>
            </Box>

            <Box
              sx={{
                bgcolor: colors.card,
                p: 2,
                borderRadius: 2,
                py: 4,
              }}
            >
              <Grid container spacing={3}>
                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter Group Id"
                    label="Group Id"
                    disabled
                    variant="outlined"
                    value={groupMasterId ?? ""}
                    //  InputLabelProps={{ shrink: length > 0 ? true : false }}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter Group Name"
                    label="Group Name"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="groupName"
                    value={groupMasterData.groupName}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid xs={12} sm={4} item>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="groupType-label">Group Type</InputLabel>
                    <Select
                      labelId="groupType-label"
                      id="groupType"
                      label="Group Type"
                      disabled={isDisabled}
                      variant="outlined"
                      onChange={handleInputData}
                      name="groupType"
                      value={groupMasterData.groupType || ""}
                    >
                      <MenuItem value="">Select Group Type</MenuItem>
                      <MenuItem value="B">B</MenuItem>
                      <MenuItem value="P">P</MenuItem>
                      <MenuItem value="T">T</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid xs={12} sm={4} item>
                  <TextField
                    placeholder="Enter Group Order"
                    label="Group Order"
                    disabled={isDisabled}
                    variant="outlined"
                    onChange={handleInputData}
                    name="groupOrder"
                    value={groupMasterData.groupOrder ?? ""}
                    //InputLabelProps={{ shrink: length > 0 ? true : false }}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                bgcolor: colors.card,
                borderRadius: 2,
              }}
            >
              <Box display="flex" gap={2}>
                <Button
                  disabled={manageButton.create}
                  onClick={() => {
                    setIsDisabled(!isDisabled);
                    setManageButton({
                      create: true,
                      save: false,
                      edit: true,
                      update: true,
                      delete: true,
                      cancel: false,
                    });
                  }}
                  color="green"
                  variant="contained"
                >
                  Add
                </Button>
                <Button
                  disabled={manageButton.save}
                  onClick={() => {
                    handleInsertGroupMasterData();
                    setIsDisabled(!isDisabled);
                  }}
                  color="green"
                  variant="contained"
                >
                  Save
                </Button>

                <Button
                  disabled={manageButton.edit}
                  onClick={() => {
                    setIsDisabled(!isDisabled);
                    handleGroupMasterRecordsData();
                    setManageButton({
                      create: true,
                      save: true,
                      edit: true,
                      update: false,
                      delete: false,
                      cancel: false,
                      editCompanyId: true,
                    });
                  }}
                  color="blue"
                  variant="contained"
                >
                  Edit
                </Button>

                <Button
                  disabled={manageButton.update}
                  onClick={() => {
                    handleUpdateGroupMasterData();
                  }}
                  color="violet"
                  variant="contained"
                >
                  Update
                </Button>

                <Button
                  disabled={manageButton.delete}
                  onClick={() => {
                    setIsDisabled(isDisabled);
                    handleDeleteGroupMasterData();
                  }}
                  color="red"
                  variant="contained"
                >
                  Delete
                </Button>

                <Button
                  onClick={() => {
                    handleClear();
                    setManageButton({
                      create: false,
                      save: true,
                      delete: false,
                      update: false,
                      cancel: false,
                      edit: false,
                    });
                  }}
                  variant="contained"
                >
                  Clear
                </Button>
              </Box>

              <Box display="flex" gap={2}>
                <CustomIconButton
                  onClick={() => {}}
                  description={"Go To First"}
                  color={colors.blue[400]}
                >
                  <KeyboardDoubleArrowLeft sx={{ fontSize: "28px" }} />
                </CustomIconButton>

                <CustomIconButton
                  onClick={() => {}}
                  description={"Go To Prev"}
                  color={colors.blue[300]}
                >
                  <KeyboardArrowLeft sx={{ fontSize: "28px" }} />
                </CustomIconButton>
                <CustomIconButton
                  onClick={() => {}}
                  description={"Go To Next"}
                  color={colors.blue[300]}
                >
                  <KeyboardArrowRight sx={{ fontSize: "28px" }} />
                </CustomIconButton>

                <CustomIconButton
                  onClick={() => {}}
                  description={"Go To Last"}
                  color={colors.blue[400]}
                >
                  <KeyboardDoubleArrowRight sx={{ fontSize: "28px" }} />
                </CustomIconButton>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default GroupMasterForm;
