import { NavLink } from "react-router-dom"
import "./Launches.scss";
import { days, years } from "../../utils/constants";

const Launches = () => {
  return (
    <>
      <div className="main-container">
        <div className="launches-container">
          <div className="launches-heading">
            <div className="heading-text">Best of March 12, 2024</div>
            <div className="routes">
              <NavLink className={({ isActive }) => isActive ? "link link-active" : "link"} to="daily">Daily</NavLink>
              <NavLink className={({ isActive }) => isActive ? "link link-active" : "link"} to="weekly">Weekly</NavLink>
              <NavLink className={({ isActive }) => isActive ? "link link-active" : "link"} to="monthly">Monthly</NavLink>
              <NavLink className={({ isActive }) => isActive ? "link link-active" : "link"} to="yearly">Yearly</NavLink>
            </div>
            <div className="button-group">
              <button type="button" className="text-button">Featured</button>
              <span>|</span>
              <button type="button" className="text-button">All</button>
            </div>
          </div>
          <div className="pagination">
            {
              days.map((day, index) => {
                return (
                  <div key={index}>
                    <NavLink to={`/leaderboard/daily/${day}`} className={({ isActive }) => isActive ? "day selected" : "day"}>{day}</NavLink>
                  </div>
                )
              })
            }
          </div>
          <div className="posts-list"></div>
        </div>
        <div className="launch-archive">
          <p className="launch-archive-heading">LAUNCH ARCHIVE</p>
          <div className="archive-list">
            {years.map((year, index) => {
              return (
                <div key={index} className="archive">
                  <NavLink to={`/leaderboard/${year}`} className={({ isActive }) => isActive ? "archive-link active" : "archive-link"}>{year}</NavLink>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Launches