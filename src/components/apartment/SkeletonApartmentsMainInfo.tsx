import { Skeleton } from "@mui/material";

function SkeletonApartmentsMainInfo() {
  return <>
    <Skeleton variant="text" width={"80%"} />
    <Skeleton variant="rectangular" height={"25.625rem"} />
    <Skeleton height={"10px"} />
    <Skeleton height={"10px"} />
    <Skeleton height={"10px"} width={"80%"} />
  </>
}

export default SkeletonApartmentsMainInfo