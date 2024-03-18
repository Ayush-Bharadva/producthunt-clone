import { FiSearch } from "react-icons/fi";
import "./SearchInput.scss";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { useModal } from "../../../hooks/useModal";
import Modal from "../../modal/Modal";
import { PiClockCounterClockwise } from "react-icons/pi";
import { SearchOptions, TrendingSearches } from "../../../utils/constants";

const SearchInput = () => {

  const { isModalOpen, toggleModal } = useModal();

  const handleSearchFocus = () => {
    toggleModal();
  }

  return (
    <>
      {isModalOpen ?
        <Modal isOpen closeModal={toggleModal}>
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
              {SearchOptions.map(({ title, subtitle, buttonText }, index) => {
                return <div key={index} className="search-option-wrapper">
                  <div className="icon"><PiClockCounterClockwise /></div>
                  <div className="text">
                    <p className="title">{title}</p>
                    <p className="subtitle">{subtitle}</p>
                  </div>
                  <button className="button">{buttonText}</button>
                </div>
              })}
            </div>
          </div>
        </Modal> :
        <div className="search">
          <FiSearch className="search-icon" />
          <input type="text" onFocus={handleSearchFocus} placeholder="Search..." />
        </div>}
    </>
  )
}

export default SearchInput