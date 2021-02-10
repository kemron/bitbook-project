import { memo } from "react";
import { ReactComponent as EthLogo } from "assets/eth-logo.svg";
import { ReactComponent as BtcLogo } from "assets/btc-logo.svg";
import { ReactComponent as LtcLogo } from "assets/ltc-logo.svg";
import { ReactComponent as XrpLogo } from "assets/xrp-logo.svg";
import { ReactComponent as BchLogo } from "assets/bch-logo.svg";
import styled from "@emotion/styled";
import breakpoints from "atoms/breakpoints";
import {
  BCH_PRODUCT,
  BTC_PRODUCT,
  ETH_PRODUCT,
  XRP_PRODUCT,
  LTC_PRODUCT,
} from "atoms/constants";
import ListItem from "./ListItem";

const EMPTY_FUNC = () => {};

type ProductList = {
  currentProduct?: string;
  onSelected?: (selectedProduct: string) => void;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  svg {
    width: 40px;
    height: 40px;
  }

  @media ${breakpoints.small} {
    svg {
      width: 20px;
      height: 20px;
    }

    p {
      display: none;
    }
  }
`;

const AvaialableProductList = ({
  currentProduct = "XBTC",
  onSelected = EMPTY_FUNC,
}: ProductList) => {
  const onProductSelected = (product: string) => () => onSelected(product);

  return (
    <Container>
      <ListItem
        onClick={onProductSelected(BTC_PRODUCT)}
        isSelected={currentProduct === BTC_PRODUCT}
      >
        <BtcLogo /> <p>XBTC/USD</p>
      </ListItem>
      <ListItem
        onClick={onProductSelected(ETH_PRODUCT)}
        isSelected={currentProduct === ETH_PRODUCT}
      >
        <EthLogo /> <p>ETH/USD</p>
      </ListItem>
      <ListItem
        onClick={onProductSelected(LTC_PRODUCT)}
        isSelected={currentProduct === LTC_PRODUCT}
      >
        <LtcLogo /> <p>LTC/USD</p>
      </ListItem>
      <ListItem
        onClick={onProductSelected(BCH_PRODUCT)}
        isSelected={currentProduct === BCH_PRODUCT}
      >
        <BchLogo /> <p>BCH/USD</p>
      </ListItem>
      <ListItem
        onClick={onProductSelected(XRP_PRODUCT)}
        isSelected={currentProduct === XRP_PRODUCT}
      >
        <XrpLogo /> <p>XRP/USD</p>
      </ListItem>
    </Container>
  );
};

export default memo(AvaialableProductList);
