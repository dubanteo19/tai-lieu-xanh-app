import {
  Autocomplete,
  Box,
  Button,
  Chip,
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
import { IMajor } from "../type/IMajor";
import { useGetAllMajorsQuery, useGetAlltagsQuery } from "../api/majorApi";
import { useUploadMDocMutation } from "../api/mDocApi";
import FullLoading from "../components/FullLoading";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useCreatePostMutation } from "../api/postApi";
import { IMDoc } from "../type/IMDoc";
import { useNavigate } from "react-router-dom";
interface FileUploadProps {
  setMDoc: (Imdoc: IMDoc) => void;
}
export const FileUpload: React.FC<FileUploadProps> = ({ setMDoc }) => {
  const [uploadFile, { data, isLoading }] = useUploadMDocMutation();
  const { id } = useSelector((state: RootState) => state.auth);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      const file = event.target.files![0];
      const res = await uploadFile({
        userId: id,
        file,
      }).unwrap();
      setMDoc(res);
    } catch (error) {
      console.log(error);
    }
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
    >
      {isLoading && <FullLoading />}
      <Typography variant="body1" color="error">
        Chi chap nhan file pdf, docx
      </Typography>
      <Typography variant="body1" color="error" mb={2}>
        Tep tin phai co kich thuoc nho hon 10MB
      </Typography>
      <input
        type="file"
        accept=".pdf, .docx"
        style={{ display: "none" }}
        id="file-upload"
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <Button variant="contained" color="primary" component="span">
          Upload File
        </Button>
      </label>
      {data && (
        <Box sx={{ mt: 2 }} textAlign={"left"}>
          <Typography variant="body2">Tên tệp tin: {data.fileName}</Typography>
          <Typography variant="body2">Kich thuoc: {data.fileSize}</Typography>
          <Typography variant="body2">
            Loai tai lieu: {data.fileType}
          </Typography>
          <Typography variant="body2">So trang: {data.pages}</Typography>
        </Box>
      )}
    </Box>
  );
};
export const NewDoc = () => {
  const [major, setMajor] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [description, setDescription] = React.useState<string>("");
  const [mDoc, setMDoc] = useState<IMDoc>();
  const { data: majors } = useGetAllMajorsQuery();
  const { data: tags } = useGetAlltagsQuery();
  const [createPost, { isLoading }] = useCreatePostMutation();
  const navigate = useNavigate();
  const handleCreatePost = async () => {
    try {
      if (mDoc) {
        const re = await createPost({
          title,
          description,
          majorId: parseInt(major),
          tags: selectedTags,
          authorId: 1,
          mDoc: mDoc,
        }).unwrap();
        navigate(`/post/${re.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleTagChange = (
    event: React.ChangeEvent<{}>,
    newValue: string[],
  ) => {
    setSelectedTags(newValue);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setMajor(event.target.value as string);
  };
  return (
    <Stack
      sx={{ py: 4 }}
      component={"form"}
      onSubmit={(e) => {
        e.preventDefault();
        handleCreatePost();
      }}
    >
      {isLoading && <FullLoading />}
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
          <FileUpload setMDoc={setMDoc} />
          <TextField
            required
            label="Tiêu đề"
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormControl>
            <Typography>Mô tả tài liệu</Typography>
            <TextareaAutosize
              cols={20}
              onChange={(e) => setDescription(e.target.value)}
              minRows={10}
            />
          </FormControl>
          <FormControl required>
            <InputLabel id="major-label">Ngành</InputLabel>
            <Select
              labelId="major-label"
              required
              value={major + ""}
              label="major"
              onChange={handleChange}
            >
              {majors &&
                majors.map((item: IMajor) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.majorName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {tags && (
            <Box>
              <Autocomplete
                multiple
                value={selectedTags} // Controlled value
                onChange={handleTagChange} // Capture changes
                options={tags.map((tag) => tag.tagName)}
                freeSolo
                renderTags={(value: readonly string[], getTagProps) =>
                  value.map((option: string, index: number) => {
                    const { key, ...tagProps } = getTagProps({ index });
                    return (
                      <Chip
                        variant="outlined"
                        label={option}
                        key={key}
                        {...tagProps}
                      />
                    );
                  })
                }
                renderInput={(params) => <TextField {...params} label="Nhan" />}
              />
            </Box>
          )}
          <Stack direction={"row"} justifyContent="center" spacing={2}>
            <Button variant="outlined" color="error">
              Hủy
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Lưu
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};
