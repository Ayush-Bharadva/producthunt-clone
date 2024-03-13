import { FiSearch } from "react-icons/fi";
import "./SearchInput.scss";

const SearchInput = () => {
  return (
    <div className="search">
      <FiSearch className="search-icon" />
      <input type="text" placeholder="Search..." />
    </div>
  )
}

export default SearchInput