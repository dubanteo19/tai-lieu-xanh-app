import { Box, Typography } from "@mui/material"
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
interface PostBodyProps {
    content: string,
    documents: string[]
}
export const PostBody: React.FC<PostBodyProps> = ({ content, documents }) => {
    return (
        <Box>
            <Typography>
                {content}
            </Typography>
            <LightGallery
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
            >
                {documents.map((document) => (
                    <a href={document}>
                        <img src={document} />
                    </a>))}
            </LightGallery>
        </Box>
    )
}