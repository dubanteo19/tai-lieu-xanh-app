import { Box, Chip, Grid, Link, Stack, Typography } from "@mui/material";
import { TitleBar } from "./TitleBar";
import React from "react";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Label } from "@mui/icons-material";
import { documents } from "../data/documents";
import CommentIcon from "@mui/icons-material/Comment";

interface DocumentItemProps {
  item: {
    id: number;
    title: string;
    thumb: string;
    major: string;
    tags: string[];
    view: number;
  };
}

const DocumentItem: React.FC<DocumentItemProps> = ({ item }) => {
  return (
    <Stack direction="row">
      <Box sx={{ maxWidth: 100 }}>
        <img width="100%" src={item.thumb} alt="" />
      </Box>
      <Box sx={{ ml: 1 }}>
        <Box sx={{ minHeight: 20 }}>
          <Typography fontSize={18}>{item.title}</Typography>
        </Box>
        <Stack direction="row" spacing={1}>
          <DisplaySettingsIcon sx={{ color: "primary.main" }} />
          <Chip label={item.major} size="small" />
        </Stack>
        <Stack direction="row" spacing={1}>
          <Label sx={{ color: "primary.main" }} />
          {item.tags.map((tag, index) => (
            <Chip
              key={index}
              size="small"
              variant="filled"
              color="success"
              label={tag}
            />
          ))}
        </Stack>
        <Stack direction="row" spacing={1}>
          <RemoveRedEyeIcon />
          <Typography>{item.view}</Typography>
        </Stack>
      </Box>
    </Stack>
  );
};
export const RecDocumentItem: React.FC<DocumentItemProps> = ({ item }) => {
  return (
    <Grid item position="relative">
      <Box sx={{ maxWidth: 160 }}>
        <img width="100%" src={item.thumb} alt="" />
      </Box>
      <Stack
        position="absolute"
        direction="row"
        sx={{
          background: "rgba(0,0,0,0.6)",
          color: "white",
          bottom: 30,
          width: "90%",
          fontSize: 16,
          justifyContent: "space-between",
        }}
      >
        <Stack alignItems="center" spacing={1} direction="row">
          <RemoveRedEyeIcon fontSize="inherit" />
          <Typography fontSize="inherit">{item.view}</Typography>
        </Stack>
        <Stack alignItems="center" spacing={1} direction="row">
          <CommentIcon fontSize="inherit" />
          <Typography fontSize="inherit">{5}</Typography>
        </Stack>
      </Stack>
      <Link sx={{ textDecoration: "none" }}>
        <Box bgcolor="primary.main" sx={{ borderRadius: 2 }}>
          <Typography color="black" textAlign="center">
            {item.title}
          </Typography>
        </Box>
      </Link>
    </Grid>
  );
};

export const NewDocument = () => {
  return (
    <Box>
      <TitleBar text="TÀI LIỆU MỚI" />
      <Grid container spacing={2}>
        {documents.map((doc) => (
          <RecDocumentItem key={doc.id} item={doc} />
        ))}
      </Grid>
    </Box>
  );
};

export const TopDocument = () => {
  return (
    <Box>
      <TitleBar text="TÀI LIỆU HOT" />
      <Stack spacing={1}>
        {documents.map((doc) => (
          <DocumentItem key={doc.id} item={doc} />
        ))}
      </Stack>
    </Box>
  );
};

export const RelatedDocument = () => {
  return (
    <Box>
      <TitleBar text="TÀI LIỆU LIÊN QUAN" />
      <Stack>
        {documents.map((doc) => (
          <DocumentItem key={doc.id} item={doc} />
        ))}
      </Stack>
    </Box>
  );
};
