import { Badge, Box, Chip, Stack, Typography } from "@mui/material";
import { useGetMajorsWithPostsQuery } from "../api/postApi";

export const MajorList: React.FC = () => {
  const { data: majorsWithPosts } = useGetMajorsWithPostsQuery();
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        {majorsWithPosts &&
          majorsWithPosts.map((major) => (
            <Badge key={major.id} badgeContent={major.posts} color="success">
              <Chip
                sx={{
                  fontWeight: "bold",
                }}
                key={major.id}
                label={major.majorName}
              ></Chip>
            </Badge>
          ))}
      </Stack>
    </Box>
  );
};
