import { FilePreview } from "@/features/mdoc/components/FilePreview";
import { FileUpload } from "@/features/mdoc/components/FileUpload";
import FullLoading from "@/shared/components/FullLoading";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { Button } from "@/shared/ui/button";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export const NewDocPage = () => {
  const [major, setMajor] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const { id } = useAppSelector((state) => state.auth);
  const [file, setFile] = useState<File | null>(null);
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
        await createPost(form).unwrap();
        // Navigate to user
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
  if (isLoading) return <FullLoading />;
  return (
    <div>
      <div>
        <p>Thêm thông tin cho tài liệu</p>
        <p>Tiêu đề và mô tả chi tiết sẽ giúp tài liệu của bạn thu hút hơn</p>
      </div>
      <div>
        <div>
          <FileUpload setFile={setFile} />
          <FilePreview file={file} />
          <TextField
            required
            label="Tiêu đề"
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormControl>
            <p>Mô tả tài liệu</p>
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
            <div>
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
            </div>
          )}
          <div>
            <Button>Hủy</Button>
            <Button>Lưu</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
