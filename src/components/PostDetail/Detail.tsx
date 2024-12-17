import { Box, Button, Stack, Typography } from "@mui/material"
import { PostInfo } from "./PostInfo"
import { PostBody } from "./PostBody"
import PostComments from "./PostComments"
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DownloadIcon from '@mui/icons-material/Download';
import FlagIcon from '@mui/icons-material/Flag';
export interface DetailProps {
    post: {
        id: number,
        title: string,
        author: {
            fullName: string,
            avatar: string,
        },
        date: string,
        content: string,
        documents: string[],
        comments: Comment[]
    }
}


const PostButtons = () => {
    return (
        <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" spacing={2}>
                <Button startIcon={<ThumbUpAltIcon />} color="success" variant="contained">
                    Yêu thích
                </Button>
                <Button startIcon={<DownloadIcon />} color="warning" variant="contained">
                    Tải tải liệu
                </Button>
            </Stack>
            <Button startIcon={<FlagIcon />} color="error" variant="contained">
                Báo cáo
            </Button>
        </Stack>
    )
}
export const Detail: React.FC<DetailProps> = ({ post }) => {

    return (
        <Box>
            <PostInfo
                fullName={post.author.fullName}
                avatar={post.author.avatar}
                date={post.date}
                title={post.title}
            />
            <PostBody
                content={post.content}
                documents={post.documents}
            />
            <PostButtons />
            <PostComments comments={post.comments} />
        </Box>
    )
}