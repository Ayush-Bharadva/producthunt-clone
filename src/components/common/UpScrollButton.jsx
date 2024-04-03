import { useCallback, useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

const UpScrollButton = () => {

  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 100;
    setShowScrollBtn(isScrolled);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return showScrollBtn ? (
    <FaAngleUp className="scroll-to-top" onClick={scrollToTop} />
  ) : null;
};

export default UpScrollButton;