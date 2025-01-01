import { Badge, Box, Chip, Stack, Typography } from "@mui/material";
import { useGetMajorsWithPostsQuery } from "../api/postApi";
import { useNavigate } from "react-router-dom";

export const MajorList: React.FC = () => {
  const { data: majorsWithPosts } = useGetMajorsWithPostsQuery();
  const navigate = useNavigate();
  return (
    <Box>
      <Stack direction="row" sx={{ width: "100%" }} spacing={2}>
        {majorsWithPosts &&
          majorsWithPosts.map((major) => (
            <Badge key={major.id} badgeContent={major.posts} color="success">
              <Chip
                onClick={() => {
                  navigate(`/search?major=${major.id}`);
                }}
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
