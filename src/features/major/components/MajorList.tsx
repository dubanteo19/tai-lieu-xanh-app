import { Divider } from "@/shared/ui/divider";
import { MajorItem } from "./MajorItem";
import { useGetAllMajorsQuery } from "../api/major.api";
import { EMPTY_MAJOR_LIST } from "@/shared/constants/message";
import { EmptyList } from "@/shared/components/empty-list";

export const MajorList = () => {
  const { data: majors } = useGetAllMajorsQuery();
  if (!majors?.length) return <EmptyList>{EMPTY_MAJOR_LIST}</EmptyList>;
  return (
    <div className="my-2 mx-4">
      <h3 className="text-base text-primary">Danh sách chuyên ngành</h3>
      <div className="flex gap-2 my-2 ">
        {majors.map((major) => (
          <MajorItem key={major.id} {...major} />
        ))}
      </div>
      <Divider size={2} />
    </div>
  );
};
