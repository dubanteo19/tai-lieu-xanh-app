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
import FullLoading from "../components/FullLoading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useCreatePostMutation } from "../api/postApi";
import { useNavigate } from "react-router-dom";
import { bytesToMB } from "../utils/bytesToMB";
import "@cyntler/react-doc-viewer/dist/index.css";
import { setSlectedComponent } from "../features/user-menu/userMenuSlice";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
const FilePreview: React.FC<{ file: File | null }> = ({ file }) => {
  return (
    <Box>
      {file && (
        <Box sx={{ mt: 2 }} textAlign={"left"}>
          <Typography variant="body2">Tên tài liệu: {file.name}</Typography>
          <Typography variant="body2">
            Kích thước: {bytesToMB(file.size)}
          </Typography>
          <Typography variant="body2">Loại tài liệu: {file.type}</Typography>
        </Box>
      )}
    </Box>
  );
};
interface FileUploadProps {
  setFile: (file: File | null) => void;
}
export const FileUpload: React.FC<FileUploadProps> = ({ setFile }) => {
  const notify = withReactContent(Swal);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    try {
      if (event.target.files?.[0]?.size > 10 * 1024 * 1024) {
        notify.fire({
          icon: "error",
          title: "Thông báo",
          text: "Tài liệu phải có kích thước nhỏ hơn 10MB",
          showConfirmButton: true,
        });
        return;
      }
      setFile(event.target.files?.[0] || null);
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
      <Typography variant="body1" color="error">
        Chỉ chấp nhận tải lên tài liệu có định dạng pdf, docx
      </Typography>
      <Typography variant="body1" color="error" mb={2}>
        Tài liệu phải có kích thước nhỏ hơn 10MB
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
    </Box>
  );
};

export const NewDocPage = () => {
  const [major, setMajor] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [description, setDescription] = React.useState<string>("");
  const { id } = useSelector((state: RootState) => state.auth);
  const [file, setFile] = React.useState<File | null>(null);
  const { data: majors } = useGetAllMajorsQuery();
  const { data: tags } = useGetAlltagsQuery();
  const [createPost, { isLoading }] = useCreatePostMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCreatePost = async () => {
    try {
      if (file) {
        const form = {
          file,
          postRequest: {
            title,
            description,
            majorId: parseInt(major),
            tags: selectedTags,
            authorId: id,
          },
        };
        const re = await createPost(form).unwrap();
        if (re) {
          dispatch(setSlectedComponent("MyPosts"));
          navigate("/user");
        }
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
          <FileUpload setFile={setFile} />
          <FilePreview file={file} />
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
                renderInput={(params) => <TextField {...params} label="Nhãn" />}
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
