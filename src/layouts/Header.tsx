// react
import { forwardRef } from "react";

// react-router-dom
import { Link, useNavigate } from "react-router-dom";

// icons
import { FaHome } from "react-icons/fa";
import { IoCaretBack } from "react-icons/io5";

// import { GiHamburgerMenu } from "react-icons/gi";

const Header = forwardRef((_, ref) => {
  const navigate = useNavigate();

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <header id="app-header" ref={ref as any}>
      <nav>
        <div className="left-nav">
          <button className="btn" onClick={() => navigate(-1)}>
            <IoCaretBack />
          </button>

          <Link className="btn" to="/">
            <FaHome />
          </Link>
        </div>

        {/* <div className="right-nav">
          <button>
            <GiHamburgerMenu />
          </button>
        </div> */}
      </nav>
    </header>
  );
});

export default Header;
