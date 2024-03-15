import "./TopLaunches.scss"

const TopLaunches = () => {
  return (
    <div className="aside">
      <div className="top-launches">
        <p className="top-launches-heading">TOP LAUNCHES</p>
        <div className="launches-list">
          <p className="launch">Today&apos;s winners</p>
          <p className="launch">Yesterday&apos;s winners</p>
          <p className="launch">Last week&apos;s winners</p>
          <p className="launch">Last month&apos;s winners</p>
        </div>
      </div>
      {/* <div className="coming-soon"></div>
      <div className="latest-stories"></div>
      <div className="discussions"></div> */}
    </div>
  )
}

export default TopLaunches