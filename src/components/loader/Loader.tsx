import { CircularProgress } from "@mui/material";

function Loader() {
  return <div style={{flex: "1 1 auto", display: "flex", justifyContent: "center", alignItems: "center"}}>
    <CircularProgress />
  </div>
}

export default Loader;