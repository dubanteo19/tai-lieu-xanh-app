import { Avatar,  Stack, Typography } from "@mui/material";
import { getThumbUri } from "../../utils/uri";
import { Link } from "react-router-dom";

interface PostInfoProps {
  avatar: string;
  fullName: string;
  date: string;
  title: string;
  id: number;
}

export const PostInfo: React.FC<PostInfoProps> = (info) => {
  return (
    <Stack sx={{ p: 2 }}>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Avatar src={getThumbUri(info.avatar)} />
        <Stack sx={{ flexBasis: "80%", ml: 2 }}>
          <Link style={{ color: "black" }} to={`/profile/${info.id}`}>
            <Typography>{info.fullName}</Typography>
          </Link>
          <Typography>{info.date}</Typography>
        </Stack>
      </Stack>
      <Typography fontWeight="bold" variant="h5">
        {info.title}
      </Typography>
    </Stack>
  );
};
