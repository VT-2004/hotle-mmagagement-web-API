import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
  }

  .section__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .section__subheader {
    color: #007bff;
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .section__header {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: #333;
  }

  .section__description {
    color: #666;
    margin-bottom: 2rem;
  }

  .btn {
    display: inline-block;
    padding: 0.8rem 1.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyles; 