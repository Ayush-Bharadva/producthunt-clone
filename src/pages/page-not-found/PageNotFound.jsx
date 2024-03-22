import RouteNotFound from "../../assets/images/404-status.png";

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <img src={RouteNotFound} alt="404" />
    </div>
  )
}

export default PageNotFound;