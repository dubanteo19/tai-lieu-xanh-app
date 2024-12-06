import { Avatar, Stack, Typography } from "@mui/material"

interface PostInfoProps {
    avatar: string,
    fullName: string
    date: string,
    title: string
}
export const PostInfo: React.FC<PostInfoProps> = (info) => {
    return (
        <Stack>
            <Stack direction="row" sx={{ alignItems: "center" }} >
                <Avatar src={info.avatar} />
                <Stack sx={{ flexBasis: '80%', ml: 2 }}>
                    <Typography fontWeight="bold">
                        {info.fullName}
                    </Typography>
                    <Typography >
                        {info.date}
                    </Typography>
                </Stack>
            </Stack>
            <Typography variant="h4">
                {info.title}
            </Typography>
        </Stack>
    )
}