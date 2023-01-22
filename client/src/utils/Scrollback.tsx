import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";

const Scrollback = (): JSX.Element => {
  const [showButton, setShowButton] = useState(false);

  const moveBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const CheckScroll = () => {
    if (window.scrollY > 150) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  window.addEventListener("scroll", CheckScroll);

  return (
    <>
      {showButton ? (
        <button className="back-to-top" onClick={moveBackToTop}>
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      ) : null}
    </>
  );
};

export default Scrollback;
