import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
export const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files![0]);
  };

  const handleDrop = (event: React.ChangeEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleDragOver = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  return (
    <Box
      sx={{
        border: "2px dashed #ccc",
        borderRadius: "8px",
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#fafafa",
        cursor: "pointer",
        "&:hover": { backgroundColor: "#f0f0f0" },
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Typography variant="body1" color="textSecondary" mb={2}>
        Drag and drop a file here or click to select
      </Typography>
      <input
        type="file"
        style={{ display: "none" }}
        id="file-upload"
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <Button variant="contained" color="primary" component="span">
          Upload File
        </Button>
      </label>
      {file && (
        <Typography variant="body2" mt={2}>
          Selected File: {file.name}
        </Typography>
      )}
    </Box>
  );
};
export const NewDoc = () => {
  const [major, setMajor] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setMajor(event.target.value as string);
  };
  return (
    <Stack sx={{ py: 4 }}>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Thêm thông tin cho tài liệu</Typography>
        <Typography color="text.secondary">
          Tiêu đề và mô tả chi tiết sẽ giúp tài liệu của bạn thu hút hơn
        </Typography>
      </Stack>
      <Paper sx={{ px: 2, py: 2, width: 600, mx: "auto" }}>
        <Stack spacing={2}>
          <FileUpload />
          <TextField required label="Tiêu đề" />
          <FormControl required>
            <Typography>Mô tả tài liệu*</Typography>
            <TextareaAutosize cols={20} minRows={10} />
          </FormControl>
          <FormControl>
            <InputLabel id="major-label">Ngành</InputLabel>
            <Select labelId="major-label" label="major" onChange={handleChange}>
              <MenuItem value={1}>IT</MenuItem>
              <MenuItem value={2}>Ariculture</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>
    </Stack>
  );
};
