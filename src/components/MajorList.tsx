import { Badge, Box, Chip, Stack, Typography } from "@mui/material";
import { IMajor } from "../type/IMajor";

interface Props {
  majors: IMajor[];
}
export const MajorList: React.FC<Props> = ({ majors }) => {
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        {majors.map((major) => (
          <Badge key={major.id} badgeContent={major.posts} color="success">
            <Chip
              sx={{
                fontWeight: "bold",
              }}
              key={major.id}
              label={major.name}
            ></Chip>
          </Badge>
        ))}
      </Stack>
    </Box>
  );
};
