export const makeStyles = () => ({
  mainWrapper: {
    height: "100%",
    width: "100%",
  },
  mainHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    background: "#1976d2",
    marginBottom: "50px",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
  },
  mainTitle: {
    fontSize: "18px",
    color: "#fff",
    fontWeight: "bold",
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  mainBtn: {
    color: "#1976d2",
    background: "#ffff",
    "&:hover": {
      background: "#d6d6d6",
    },
  },
});
