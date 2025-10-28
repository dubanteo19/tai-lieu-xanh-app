import { Badge, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetMajorsWithPostsQuery } from "../api/postApi";
import { Divider } from "@/components/ui/divider";

export const MajorList: React.FC = () => {
  const { data: majorsWithPosts } = useGetMajorsWithPostsQuery();
  const navigate = useNavigate();
  return (
    <div className="my-2 mx-4">
      <h3 className="text-base text-gray-500">Danh sách chuyên ngành</h3>
      <div className="flex gap-2 my-2 ">
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
      </div>
      <Divider size={2} />
    </div>
  );
};
