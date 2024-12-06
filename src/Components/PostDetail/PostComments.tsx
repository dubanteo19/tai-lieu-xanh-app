import { Avatar, Box, Button, Paper, Stack, TextareaAutosize, Typography } from '@mui/material'

interface Comment {
    id: number,
    date: string,
    content: string,
    author: {
        fullName: string,
        avatar: string,
        replies: Comment[]
    }
}
interface PostCommentsProps {
    comments: Comment[]
}
const PostComments: React.FC<PostCommentsProps> = ({ comments }) => {
    return (
        <Paper sx={{ my: 2, p: 3 }}>
            <Typography fontWeight="bold" variant='h5' >
                Bình luận(3)
            </Typography>
            <CommentBox></CommentBox>
            <Stack spacing={2} sx={{ py: 3 }}>
                {comments.map(comment => <Comment comment={comment} />)}
            </Stack>
        </Paper>
    )
}
const CommentBox = () => {
    return (
        <Box>
            <TextareaAutosize minRows={5} cols={65} >
            </TextareaAutosize>
            <Button sx={{ color: "white", float: "right" }} variant='contained'>
                Gửi bình luận
            </Button>
        </Box>
    )
}
interface CommentProps {
    comment: Comment
}
const Comment: React.FC<CommentProps> = ({ comment }) => {
    return (
        <Stack direction="row" spacing={2}>
            <Avatar src={comment.author.avatar} />
            <Stack>
                <Typography fontWeight="bold">{comment.author.fullName}</Typography>
                <Typography >{comment.content}</Typography>
                <Stack alignItems="center" direction="row">
                    <Button>
                        Phản hồi
                    </Button>
                    <Typography >{comment.date}</Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}
export default PostComments