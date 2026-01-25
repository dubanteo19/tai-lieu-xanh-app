import { useLocation } from "react-router-dom";
interface NavContentProps {
  data: {
    title: string;
    path: string;
    icon: any;
  }[];
}
export const NavContent = ({ data }: NavContentProps) => {
  const pathname = useLocation().pathname;
  return (
    <div>
      <div>
        <p>Tài liệu xanh</p>
        {data.map((item) => {
          const isActived = pathname.startsWith(item.path);
          return (
            <div>
              <div>
                <div>{<item.icon />}</div>
                <div>{item.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
