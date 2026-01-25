import { useGetAllMajorsQuery } from "@/features/major/api/major.api";
import { FilePreview } from "@/features/mdoc/components/FilePreview";
import { FileUpload } from "@/features/mdoc/components/FileUpload";
import { useCreatePostMutation } from "@/features/post/post-list/api/post.api";
import { useGetAllTagsQuery } from "@/features/tag/api/tag.api";
import FullLoading from "@/shared/components/FullLoading";
import { Button } from "@/shared/ui/button";
import {
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
import { Form, SubmitHandler, useForm } from "react-hook-form";
import {
  createMdocSchema,
  CreateMDocValues,
} from "../schemas/creat-mdoc.schema";
import { createMDocDefaultValues } from "../schemas/create-mdoc.form";
import { TagSelect } from "./TagSelect";
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
          majorId,
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
    <div>
      <div>
        <p>Thêm thông tin cho tài liệu</p>
        <p>Tiêu đề và mô tả chi tiết sẽ giúp tài liệu của bạn thu hút hơn</p>
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
                    <FormLabel>Tài liệu</FormLabel>
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
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tieu de tai lai</FormLabel>
                    <FormControl>
                      <Input placeholder="title" {...field} />
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
                    <FormLabel>Mieu ta tai lieu</FormLabel>
                    <FormControl>
                      <Input placeholder="description" {...field} />
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
                    <FormLabel>Chuyen nganh</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chon chuyen nghanh" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {majors &&
                          majors.map((major) => (
                            <SelectItem key={major.id} value={String(major.id)}>
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
                      <FormLabel>Nhan</FormLabel>
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
              <div>
                <Button>Hủy</Button>
                <Button type="submit">Lưu</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
