import { useGetAllMajorsQuery } from "@/features/major/api/major.api";
import { useCreatePostMutation } from "@/features/post/post-list/api/post.api";
import { useGetAllTagsQuery } from "@/features/tag/api/tag.api";

import { FilePreview } from "@/features/mdoc/components/file-preview";
import { FileUpload } from "@/features/mdoc/components/file-upload";
import FullLoading from "@/shared/components/full-loading";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  createMDocDefaultValues,
  createMdocSchema,
  CreateMDocValues,
} from "../schemas/creat-mdoc.schema";
import { TagSelect } from "./tag-select";
export const CreateMDocForm = () => {
  const form = useForm<CreateMDocValues>({
    resolver: zodResolver(createMdocSchema),
    defaultValues: createMDocDefaultValues,
  });
  const file = form.watch("file");
  const { data: majors } = useGetAllMajorsQuery();
  const { data: tags } = useGetAllTagsQuery();
  const [createPost, { isLoading }] = useCreatePostMutation();
  const handleCreatePost: SubmitHandler<CreateMDocValues> = async (values) => {
    const { file, title, description, majorId, tags } = values;
    try {
      if (!file) return;
      const form = {
        file: file,
        postRequest: {
          title,
          description,
          majorId: Number(majorId),
          tags,
        },
      };
      await createPost(form).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <FullLoading />;
  return (
    <div className="max-w-2xl mx-auto w-full  border border-gray-400 rounded py-4 px-6 mt-4">
      <div>
        <p>Thêm thông tin cho tài liệu</p>
        <p className="text-sm">
          Tiêu đề và mô tả chi tiết sẽ giúp tài liệu của bạn thu hút hơn
        </p>
      </div>
      <div>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreatePost)}>
              <FormField
                control={form.control}
                name="file"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        onFileChange={(file) =>
                          form.setValue("file", file ?? undefined, {
                            shouldValidate: true,
                          })
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {file && <FilePreview file={file} />}
              {file && (
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tiêu đề:</FormLabel>
                        <FormControl>
                          <Input placeholder="Tin hoc dai cuong" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Miêu tả:</FormLabel>
                        <FormControl>
                          <Input placeholder="tai lieu xin" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="majorId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Chuyên ngành:</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={String(field.value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn chuyên ngành" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {majors &&
                              majors.map((major) => (
                                <SelectItem
                                  key={major.id}
                                  value={String(major.id)}
                                >
                                  {major.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {tags && (
                    <FormField
                      name="tags"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nhãn:</FormLabel>
                          <FormControl>
                            <TagSelect
                              value={field.value ?? []}
                              options={tags.map((t) => t.name)}
                              onChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="flex gap-4 mt-4 w-full justify-center">
                    <Button type="submit">Lưu</Button>
                    <Button variant="destructive">Hủy</Button>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
