import css from 'styled-jsx/css';

export default css.global`
  body {
    margin: 0;
    padding: 0;
    min-width: 320px;
    background: #f8fafc;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.8;
    color: #0f172a;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  * { box-sizing: border-box; }
  h1 {
    font-weight: 700;
  }
  p {
    margin-bottom: 10px;
  }
`;
