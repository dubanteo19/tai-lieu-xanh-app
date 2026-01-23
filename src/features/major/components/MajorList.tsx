import { Divider } from "@/shared/ui/divider";
import { MajorItem } from "./MajorItem";
import { useGetAllMajorsQuery } from "../api/major.api";

export const MajorList = () => {
  const { data: majors } = useGetAllMajorsQuery();
  if (!majors?.length) return <h2>Khong co chuyen nganh nao</h2>;
  return (
    <div className="my-2 mx-4">
      <h3 className="text-base text-gray-500">Danh sách chuyên ngành</h3>
      <div className="flex gap-2 my-2 ">
        {majors.map((major) => (
          <MajorItem key={major.id} {...major} />
        ))}
      </div>
      <Divider size={2} />
    </div>
  );
};
