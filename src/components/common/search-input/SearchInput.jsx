import { FiSearch } from "react-icons/fi";
import "./SearchInput.scss";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { useModal } from "../../../hooks/useModal";
import Modal from "../../modal/Modal";
import { PiClockCounterClockwise } from "react-icons/pi";
import { TrendingSearches } from "../../../utils/constants";
import { NavLink } from "react-router-dom";
import { pstCurrentDate } from "../../../utils/helper";

const [year, month, day] = pstCurrentDate.split("-");

const SearchOptions = [
  {
    title: "Yesterday",
    subtitle: "Top products from yesterday",
    buttonText: "Time travel",
    navigateTo: `/leaderboard/daily/${year}/${month}/${day - 1}`,
  },
  {
    title: "Last Month",
    subtitle: "Top products from last month",
    buttonText: "Time travel",
    navigateTo: `/leaderboard/monthly/${year}/${month - 1}`,
  },
  {
    title: "2024",
    subtitle: "Top products from this year",
    buttonText: "Time travel",
    navigateTo: `/leaderboard/yearly/${year}`,
  },
];

const SearchInput = () => {

  const { isModalOpen: isSearchModalOpen, toggleModal: toggleSearchModal } = useModal();
  const handleSearchFocus = () => toggleSearchModal();

  return (
    <>
      {!isSearchModalOpen ? (
        <div className="search" onClick={handleSearchFocus}>
          <FiSearch className="search-icon" />
          <input type="text" onFocus={handleSearchFocus} placeholder="Search..." />
        </div>
      ) : (
        <Modal closeModal={toggleSearchModal}>
          <div className="search-container">
            <div className="search-input-container">
              <FiSearch className="search-icon" />
              <input type="text" placeholder="Search for products, launches, or people..." />
              <HiOutlineArrowCircleRight className="search-arrow" />
            </div>
            <div className="trending-searches-wrapper">
              <p className="trending-title">Trending</p>
              <div className="trending-searches">
                {TrendingSearches.map((search, index) => {
                  return <p key={index} className="trending-search">{search}</p>;
                })}
              </div>
            </div>
            <div className="search-options">
              {SearchOptions.map(({ title, subtitle, buttonText, navigateTo }, index) => {
                return (
                  <NavLink key={index} to={navigateTo} onClick={toggleSearchModal} className="search-option-link">
                    <div className="search-option-wrapper">
                      <div className="icon">
                        <PiClockCounterClockwise />
                      </div>
                      <div className="text">
                        <p className="title">{title}</p>
                        <p className="subtitle">{subtitle}</p>
                      </div>
                      <button className="button">{buttonText}</button>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </Modal>)
      }
    </>
  );
};

export default SearchInput;