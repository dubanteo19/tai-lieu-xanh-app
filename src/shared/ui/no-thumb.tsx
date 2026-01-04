interface NoThumbProps {
  width: number;
  height: number;
}
export const NoThumb: React.FC<NoThumbProps> = ({ width, height }) => {
  return (
    <div
      style={{
        width: width,
        height: height,
      }}
      className="flex-center color-[#888] text-[34px]"
    >
      Không có hình xem trước
    </div>
  );
};
