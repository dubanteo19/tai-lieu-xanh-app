import { useGetAllMajorsQuery } from "@/features/major/api/major.api";
import { ChangeEvent } from "react";

interface SearchFilterProps {
  filters: ISearchFilters;
  onFiltersChange: (newFilters: ISearchFilters) => void;
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
      sort: sortType,
      dir: filters.sort === sortType && filters.dir === "DESC" ? "ASC" : "DESC",
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
        <InputLabel id="file-type-label">Loại tài liệu</InputLabel>
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
      <ButtonGroup variant="contained">
        <Button
          startIcon={<TrendingUp />}
          onClick={() => handleSortChange("views")}
          color={filters.sort === "views" ? "warning" : "inherit"}
          sx={{
            fontSize: 25,
            width: 70,
            bgcolor:
              filters.sort === "views" ? "warning.lighter" : "transparent",
          }}
        >
          {filters.sort === "views" && (filters.dir === "DESC" ? "↓" : "↑")}
        </Button>
        <Button
          startIcon={<AccessTime />}
          onClick={() => handleSortChange("createdDate")}
          color={filters.sort === "createdDate" ? "warning" : "inherit"}
          sx={{
            fontSize: 25,
            width: 70,
            borderRadius: 2,
            bgcolor:
              filters.sort === "createdDate"
                ? "warning.lighter"
                : "transparent",
          }}
        >
          {filters.sort === "createdDate" &&
            (filters.dir === "DESC" ? "↓" : "↑")}
        </Button>
      </ButtonGroup>
    </div>
  );
};
