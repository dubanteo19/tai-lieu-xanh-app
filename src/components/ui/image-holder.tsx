import { cn } from "@/lib/utils";
import { NO_IMAGE } from "@/utils/uri";
import { FC, useState } from "react";

interface ImageHolderProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  className?: string;
  alt?: string;
}
export const ImageHolder: FC<ImageHolderProps> = ({
  src,
  alt,
  className,
  ...props
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [imgSrc] = useState<string>(src || NO_IMAGE);
  return (
    <div className={cn(className, "relative  overflow-hidden")}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
      <img
        alt={alt}
        src={imgSrc}
        onLoad={() => setLoaded(true)}
        {...props}
        className={`object-cover w-full h-full transition-opacity duration-300 
            ${loaded ? "opacity-100" : "opcacity-0"}`}
      />
    </div>
  );
};
