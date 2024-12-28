import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  Chip,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useEffect } from "react";
import { IPost } from "../type/IPost";
import { useGetAllMajorsQuery, useGetAlltagsQuery } from "../api/majorApi";
import { useSearchParams } from "react-router-dom";
import { useSearchPostsQuery } from "../api/postApi";
import { ISearchFilters } from "../type/ISearchFilters";
import ReactLoading from "react-loading";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { TrendingUp, AccessTime } from "@mui/icons-material";
import FullLoading from "../components/FullLoading";
import { getThumbUri } from "../utils/uri";
const SearchSelectList: React.FC<{
  filters: ISearchFilters;
  onFiltersChange: (newFilters: ISearchFilters) => void;
}> = ({ filters, onFiltersChange }) => {
  const { data: majors } = useGetAllMajorsQuery();
  const { data: tags } = useGetAlltagsQuery();
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
  const handleTagChange = (
    _event: React.ChangeEvent<{}>,
    newValue: string[],
  ) => {
    onFiltersChange({
      ...filters,
      tags: newValue,
    });
  };
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        bgcolor: "white",
        borderRadius: 2,
        padding: 3,
        mb: 2,
      }}
    >
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
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography fontWeight={"bold"}>Sắp xếp:</Typography>
      </Box>
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
    </Stack>
  );
};

const DocumentCard: React.FC<IPost> = (post) => {
  return (
    <Grid size={3}>
      <Stack sx={{ bgcolor: "white", borderRadius: 3 }} maxWidth={400}>
        <Box
          component="img"
          sx={{
            width: "100%",
            borderRadius: 2,
            pt: 2,
            height: 200,
          }}
          src={getThumbUri(post.thumb)}
        />
        <Box sx={{ p: 2 }}>
          <Link
            sx={{
              fontWeight: "bold",
              "&:hover": {
                color: "primary.main",
              },
            }}
            href={"/post/" + post.id}
            underline="none"
            color="black"
          >
            <Typography fontWeight="bold" sx={{ minHeight: 50 }}>
              {post.title}
            </Typography>
          </Link>
          <Link
            sx={{
              fontWeight: "bold",
              "&:hover": {
                color: "primary.main",
              },
            }}
            href={"/profile/" + post.author.id}
            underline="none"
            color="success.main"
          >
            <Typography>{post.author.fullName}</Typography>
          </Link>
          <Typography variant="subtitle2" color="grey">
            {post.downloads} Lượt tải - {post.views} Lượt xem
          </Typography>
        </Box>
      </Stack>
    </Grid>
  );
};
interface SearchResultProps {
  posts: IPost[];
  isLoading: boolean;
}
const SearchResult: React.FC<SearchResultProps> = ({ posts, isLoading }) => {
  return (
    <Grid container spacing={3}>
      {isLoading && (
        <ReactLoading type="spin" color="green" width={50} height={50} />
      )}
      {posts.map((post) => (
        <DocumentCard key={post.id} {...post} />
      ))}
    </Grid>
  );
};
export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = React.useState<ISearchFilters>({
    major: searchParams.get("major") || "",
    keyword: searchParams.get("keyword") || "",
    fileType: searchParams.get("fileType") || "PDF",
    tags: searchParams.getAll("tags") || [],
    sort: "createdDate",
    dir: "DESC",
  });

  const { data: posts, isLoading } = useSearchPostsQuery(filters);
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value) {
        params.set(key, value);
      }
    });
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFiltersChange = (newFilters: ISearchFilters) => {
    setFilters(newFilters);
  };
  return (
    <Box
      sx={{
        bgcolor: "secondary.main",
        paddingY: 3,
        paddingX: 30,
        minHeight: "75vh",
      }}
    >
      {isLoading && <FullLoading />}
      <Typography
        variant="h4"
        textAlign="center"
        fontWeight="bold"
        sx={{ mb: 2 }}
      >
        Tìm kiếm tài liệu
      </Typography>
      <SearchSelectList
        onFiltersChange={handleFiltersChange}
        filters={filters}
      />
      {posts?.length ? (
        <SearchResult isLoading={isLoading} posts={posts} />
      ) : (
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 200,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ mt: 2 }}>
              Không tìm thấy tài liệu
            </Typography>
          </Box>
          <SentimentVeryDissatisfiedIcon
            sx={{ fontSize: 100 }}
            fontSize="large"
          />
        </Stack>
      )}
    </Box>
  );
};
