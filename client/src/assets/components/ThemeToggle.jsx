import React from "react";

import { BsFillSunFill, BsFillMoonFill, BsMoonFill } from "react-icons/bs";
import Wrapper from "../wrappers/ThemeToggle";
import { useDashboardContext } from "../../pages/DashboardLayout";

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();
  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? <BsFillSunFill className="toggle-icon" /> : <BsMoonFill />}
    </Wrapper>
  );
};

export default ThemeToggle;
