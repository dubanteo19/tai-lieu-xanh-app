export const DownloadDialog = () => {
  return (
    <Dialog open={openDownloadPopup} onClose={setOpenDownloadPopup}>
      <DialogTitle textAlign={"center"}>Download document</DialogTitle>
      <DialogContent sx={{ p: 5, width: "400px" }}>
        <h2></h2>
        {isFetching ? (
          <CircularProgress />
        ) : (
          <h2>
            Thank you for download please click the button below to download
          </h2>
        )}
      </DialogContent>
      <DialogActions>
        {presignedUrl && (
          <Button variant="contained" color="primary">
            <a href={presignedUrl.url}>Download</a>
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
