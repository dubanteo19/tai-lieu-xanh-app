import { Badge, Box, Chip, Stack } from "@mui/material";
import { Major } from "../type/Major";

interface Props {
  majors: Major[];
}
export const MajorList: React.FC<Props> = ({ majors }) => {
  const COLORS = ["#0088FE", "#00C49F", "#EBB028", "#FF8042", "#DA8042"];
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        {majors.map((major, index) => (
          <Badge badgeContent={major.posts} color="success">
            <Chip
              key={major.id}
              sx={{
                backgroundColor: COLORS[index % COLORS.length],
                color: "white",
              }}
              label={major.name}
            ></Chip>
          </Badge>
        ))}
      </Stack>
    </Box>
  );
};
