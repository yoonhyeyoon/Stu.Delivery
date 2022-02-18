import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *{
    box-sizing: border-box;
  }
  html{
    scroll-behavior: smooth;
  }
  body{
    /* background-color: black; */
    font-family: "EliceDigitalBaeum_Bold";
    &::-webkit-scrollbar {
      width: 11px;
      height: 11px;
      background: #ffffff;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 7px;
      background-color: #787878;
      &:hover {
        background-color: #C0C0C0;
      }
      &:active{
        background-color: #C0C0C0;
      }
    }
    &::-webkit-scrollbar-track {
      background-color: #101010;
    }
  }
  
  a{
    text-decoration: none;
  }
`;

export default GlobalStyles;
