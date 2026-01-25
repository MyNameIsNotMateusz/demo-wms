import { css } from "styled-components";

export const theme = {
  fontSizes: {
    xxxs: "8px",
    xxs: "10px",
    xs: "12px",
    sm: "14px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "32px",
    "4xl": "40px",
    "5xl": "48px",
    "6xl": "56px",
    "7xl": "72px",

    responsive: css`
      font-size: 14px;

      @media (max-width: 1600px) {
        font-size: 13px;
      }
      @media (max-width: 1200px) {
        font-size: 12px;
      }
      @media (max-width: 992px) {
        font-size: 11px;
      }
      @media (max-width: 768px) {
        font-size: 10px;
      }
      @media (max-width: 576px) {
        font-size: 9px;
      }
      @media (max-width: 480px) {
        font-size: 8px;
      }
    `,
  },
  colors: {
    primary: "#0159c3",
    secondary: "#012b5d",
    surface: "#f1f2f4",
    text: "#333333",
  },
};
