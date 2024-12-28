import { Stack, Typography } from "@mui/material";
import SearchBar from "../../components/SearchBar";
import FullLoading from "../../components/FullLoading";
import { useGetMajorsWithPostsQuery, useGetTagsWithPostsQuery } from "../api/adminMajorApi";
import { TagTable } from "../components/tag/TagTable";
export const TagManager = () => {
  const { data: tags, isLoading } = useGetTagsWithPostsQuery();
  return (
    <Stack sx={{ px: 4 }}>
      {isLoading && <FullLoading />}
      <Typography fontWeight="bold" variant="h5">
        Quản lý nhãn
      </Typography>
      <Stack
        direction="row"
        alignItems="center"
        bgcolor="white"
        sx={{ mt: 2, px: 4, py: 2, borderRadius: 2 }}
        justifyContent="space-between"
      >
        <Stack>
          <SearchBar color="primary.main" />
        </Stack>
      </Stack>
      {tags && <TagTable tags={tags} />}
    </Stack>
  );
};
