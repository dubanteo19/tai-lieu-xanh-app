interface TitleBarProps {
  text: string;
}
export const TitleBar = ({ text }: TitleBarProps) => {
  return (
    <div className="p-2 bg-primary rounded">
      <h4 className="text-center text-white">{text}</h4>
    </div>
  );
};
