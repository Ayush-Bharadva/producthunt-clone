import { FiSearch } from "react-icons/fi";
import "./SearchInput.scss";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { useModal } from "../../../hooks/useModal";
import Modal from "../../modal/Modal";
import { PiClockCounterClockwise } from "react-icons/pi";
import { SearchOptions, TrendingSearches } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {

  const { isModalOpen: isSearchModalOpen, toggleModal: toggleSearchModal } = useModal();
  const handleSearchFocus = () => {
    toggleSearchModal();
  }

  const navigate = useNavigate();

  const handleSearchOptionClick = (navigateTo) => {
    navigate(navigateTo);
    toggleSearchModal();
  };

  return (
    <>
      {!isSearchModalOpen ? (
        <div className="search" onClick={handleSearchFocus}>
          <FiSearch className="search-icon" />
          <input type="text" onFocus={handleSearchFocus} placeholder="Search..." />
        </div>
      ) : (
        <Modal isOpen closeModal={toggleSearchModal}>
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
                  return <p key={index} className="trending-search">{search}</p>
                })}
              </div>
            </div>
            <div className="search-options">
              {SearchOptions.map(({ title, subtitle, buttonText, navigateTo }, index) => {
                return (<div key={index} className="search-option-wrapper" onClick={() => handleSearchOptionClick(navigateTo)} >
                  <div className="icon"><PiClockCounterClockwise /></div>
                  <div className="text">
                    <p className="title">{title}</p>
                    <p className="subtitle">{subtitle}</p>
                  </div>
                  <button className="button">{buttonText}</button>
                </div>)
              })}
            </div>
          </div>
        </Modal>)
      }
    </>
  )
}

export default SearchInput