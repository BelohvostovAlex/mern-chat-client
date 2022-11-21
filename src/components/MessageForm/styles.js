export const makeStyles = () => ({
  messageFormWrapper: {
    width: "50vw",
    height: "auto",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "4px solid #1976d2",
    borderRadius: "5px",
    marginBottom: "50px",
    boxSizing: "border-box",
  },
  messageFormTitle: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  textField: {
    marginBottom: "10px",
    width: "100%",
    "& .MuiInputBase-root": {
      backgroundColor: "transparent",
    },
  },
  messageFormButton: {
    alignSelf: "end",
  },
});
