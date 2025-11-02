import { FC } from "react";

export const ReportDialog: FC = () => {
  return (
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogTitle textAlign={"center"}>Báo cáo tài liệu</DialogTitle>
      <DialogContent sx={{ p: 5, width: "400px" }}>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="report-reason-label">Chọn lý do</InputLabel>
          <Select
            labelId="report-reason-label"
            value={reason}
            label="Chọn lý do"
            onChange={(e) => setReason(e.target.value)}
          >
            {reasons?.map((reason) => (
              <MenuItem key={reason} value={reason}>
                {getVNReason(reason)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Hủy
        </Button>
        <Button
          onClick={() => {
            handleReportPost(postId);
          }}
          color="error"
          variant="contained"
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Gửi báo cáo"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
