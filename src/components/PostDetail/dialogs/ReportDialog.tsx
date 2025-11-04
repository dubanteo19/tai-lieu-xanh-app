import { DialogBaseProps } from "@/components/dialog/DialogBaseProps";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { getVNReason } from "@/utils/statusTranslator";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircularProgress } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { formSchema, ReportFormData } from "./report-dialog.schema";
interface ReportDialogProps extends DialogBaseProps {
  handleReport: (reason: string) => void;
  reasons: string[];
}
export const ReportDialog: FC<ReportDialogProps> = ({
  isFetching,
  closeDialog,
  handleReport,
  reasons,
}) => {
  const form = useForm<ReportFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { reason: "SPAM" },
  });
  const handleSubmit = (data: ReportFormData) => {
    handleReport(data.reason);
  };
  return (
    <>
      <DialogTitle>
        <DialogHeader className="text-center">Báo cáo tài liệu</DialogHeader>
      </DialogTitle>

      <Form {...form}>
        <form
          className="gap-4 mt-2 "
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lý do</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Vui lòng lựa chon lý do" />
                    </SelectTrigger>
                    <SelectContent>
                      {reasons.map((reason) => (
                        <SelectItem id={reason} value={reason}>
                          {getVNReason(reason)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-2 justify-between mt-2">
            <Button type="submit" variant={"default"} disabled={isFetching}>
              {isFetching ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Gửi báo cáo"
              )}
            </Button>
            <Button onClick={closeDialog} variant="destructive">
              Hủy
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
