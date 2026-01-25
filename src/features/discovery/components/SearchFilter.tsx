import { useGetAllMajorsQuery } from "@/features/major/api/major.api";
import { ChangeEvent } from "react";
import { SearchFilters } from "../types/discovery.type";
import { Button } from "@/shared/ui/button";

interface SearchFilterProps {
  filters: SearchFilters;
  onFiltersChange: (newFilters: SearchFilters) => void;
}
export const SearchFilter = ({
  filters,
  onFiltersChange,
}: SearchFilterProps) => {
  const { data: majors } = useGetAllMajorsQuery();
  const { data: tags } = useGetAllMajorsQuery();
  const handleChangeMajor = (event: SelectChangeEvent<string>) => {
    onFiltersChange({
      ...filters,
      major: event.target.value as string,
    });
  };

  const handleChangeFileType = (event: SelectChangeEvent<string>) => {
    onFiltersChange({
      ...filters,
      fileType: event.target.value as string,
    });
  };
  const handleSortChange = (sortType: string) => {
    onFiltersChange({
      ...filters,
      sortBy: sortType,
      direction:
        filters.sortBy === sortType && filters.sortBy === "DESC"
          ? "ASC"
          : "DESC",
    });
  };
  const handleTagChange = (_event: ChangeEvent, newValue: string[]) => {
    onFiltersChange({
      ...filters,
      tags: newValue,
    });
  };
  return (
    <div d>
      <FormControl>
        <p>Loại tài liệu</p>
        <Select
          id="file-type"
          labelId="file-type-label"
          sx={{ width: 140 }}
          value={filters.fileType}
          label="file-type"
          onChange={handleChangeFileType}
        >
          <MenuItem value={"DOCX"}>DOCX</MenuItem>
          <MenuItem value={"PDF"}>PDF</MenuItem>
        </Select>
      </FormControl>{" "}
      <FormControl>
        <InputLabel id="major-label">Ngành</InputLabel>
        <Select
          id="major"
          labelId="major-label"
          sx={{ width: 200 }}
          value={filters.major}
          label="Age"
          onChange={handleChangeMajor}
        >
          {majors?.map((major) => (
            <MenuItem key={major.id} value={major.id}>
              {major.majorName}
            </MenuItem>
          ))}
          <MenuItem value="ALL">All</MenuItem>
        </Select>
      </FormControl>
      {tags && (
        <Autocomplete
          sx={{ width: 380 }}
          multiple
          value={filters.tags}
          onChange={handleTagChange}
          options={tags.map((tag) => tag.tagName)}
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
      )}
      <div>
        <p>Sắp xếp:</p>
      </div>
      <div>
        <Button onClick={() => handleSortChange("views")}>
          {filters.sortBy === "views" &&
            (filters.direction === "DESC" ? "↓" : "↑")}
        </Button>
        <Button onClick={() => handleSortChange("createdDate")}>
          {filters.sortBy === "createdDate" &&
            (filters.direction === "DESC" ? "↓" : "↑")}
        </Button>
      </div>
    </div>
  );
};
