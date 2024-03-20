import { PropTypes } from "prop-types";
import { createContext, useState } from "react"

export const CategoryContext = createContext({
  isFeatured: true,
  selectFeatured: () => { },
  selectAll: () => { }
});

const CategoryProvider = ({ children }) => {

  const [isFeatured, setIsFeatured] = useState(true);

  const selectFeatured = () => setIsFeatured(true);
  const selectAll = () => setIsFeatured(false);

  const ctxValue = {
    isFeatured,
    selectFeatured,
    selectAll
  }

  return (
    <CategoryContext.Provider value={ctxValue} >{children}</CategoryContext.Provider>
  )
}

export default CategoryProvider;

CategoryProvider.propTypes = {
  children: PropTypes.node.isRequired
}