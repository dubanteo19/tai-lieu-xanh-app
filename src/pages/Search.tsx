import {
  Box,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { PostProps } from "../components/PostList";
import { posts } from "../data/posts";
import React from "react";
const SearchSelectList = () => {
  const [major, setMajor] = React.useState("");
  const [fileType, setFileType] = React.useState("");

  const handleChangeMajor = (event: any) => {
    setMajor(event.target.value);
  };
  const handleChangeFileType = (event: any) => {
    setFileType(event.target.value);
  };
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        bgcolor: "secondary.main",
        paddingY: 3,
      }}
    >
      <FormControl>
        <InputLabel id="file-type-label">Loại tài liệu</InputLabel>
        <Select
          id="file-type"
          labelId="file-type-label"
          sx={{ width: 200 }}
          value={fileType}
          label="file-type"
          onChange={handleChangeFileType}
        >
          <MenuItem>Ten</MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>{" "}
      <FormControl>
        <InputLabel id="major-label">Ngành</InputLabel>
        <Select
          id="major"
          labelId="major-label"
          sx={{ width: 200 }}
          value={major}
          label="Age"
          onChange={handleChangeMajor}
        >
          <MenuItem>Ten</MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

const DocumentCard: React.FC<PostProps> = (post) => {
  return (
    <Grid size={3}>
      <Stack maxWidth={400}>
        <Box
          component="img"
          sx={{
            width: "100%",
            borderRadius: 2,
            height: 200,
          }}
          src={post.thumb}
        />
        <Typography fontWeight="bold" sx={{ minHeight: 50 }}>
          {post.title}
        </Typography>
        <Link
          sx={{
            fontWeight: "bold",
            "&:hover": {
              color: "primary.main",
            },
          }}
          href="/post/1"
          underline="none"
          color="success.main"
        >
          <Typography>{post.author.fullName}</Typography>
        </Link>
        <Typography variant="subtitle2" color="grey">
          {post.downloads} downloads - {post.views} views
        </Typography>
      </Stack>
    </Grid>
  );
};
interface SearchResultProps {
  posts: PostProps[];
}
const SearchResult: React.FC<SearchResultProps> = ({ posts }) => {
  return (
    <Grid container spacing={3}>
      {posts.map((post) => (
        <DocumentCard {...post} />
      ))}
    </Grid>
  );
};
export const Search = () => {
  return (
    <Box
      sx={{
        bgcolor: "secondary.main",
        paddingY: 3,
        paddingX: 30,
      }}
    >
      <SearchSelectList />
      <SearchResult posts={posts} />
    </Box>
  );
};
