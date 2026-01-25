import { DialogBaseProps } from "@/shared/components/dialog/DialogBaseProps";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { formSchema, ReportFormData } from "./report-dialog.schema";
import { DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { FormControl, FormField, FormItem, FormLabel } from "@/shared/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { getVNReason } from "@/shared/utils/statusTranslator";
import { Button } from "@/shared/ui/button";
interface ReportDialogProps extends DialogBaseProps {
  handleReport: (reason: string) => void;
  reasons: string[];
}
export const ReportDialog = ({
  isFetching,
  closeDialog,
  handleReport,
  reasons,
}: ReportDialogProps) => {
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
              {isFetching ? <p>CircularProgress</p> : "Gửi báo cáo"}
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
