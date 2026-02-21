import FullLoading from "@/shared/components/full-loading";
import { ChangeEvent, useState } from "react";
import { useGetInfoQuery, useUpdateInfoMutation } from "../api/user.api";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useDispatch } from "react-redux";

export const UserProfileUpdate = () => {
  const { id } = useAppSelector((state) => state.auth);
  const { data: user } = useGetInfoQuery(id);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null | ArrayBuffer>("");
  const dispatch = useDispatch();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Preview the image
      };
      reader.readAsDataURL(file);
    }
  };

  const [updateInfo, { data, isLoading }] = useUpdateInfoMutation();
  if (isLoading) return <FullLoading />;
  return <div>User profile</div>;
};
