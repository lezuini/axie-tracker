import { ReactComponent as SVGSummary } from "../images/clipboard.svg";
import { ReactComponent as SVGBinance } from "../images/binance.svg";
import { ReactComponent as SVGGrid } from "../images/grid-outline.svg";
import { ReactComponent as SVGInfo } from "../images/information-circle-outline.svg";
import { ReactComponent as SVGSettings } from "../images/settings-outline.svg";

const Menu = () => {
  return (
    <nav>
      <ul>
        <li>
          <SVGSummary />
        </li>
        <li>
          <SVGBinance />
        </li>
        <li>
          <SVGGrid />
        </li>
        <li>
          <SVGInfo />
        </li>
        <li>
          <SVGSettings />
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
