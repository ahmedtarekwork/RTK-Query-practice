import { forwardRef } from "react";

const Footer = forwardRef((_, ref) => {
  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <footer id="app-footer" ref={ref as any}>
      made by{" "}
      <a href="https://github.com/ahmedtarekwork" target="_blank">
        ahmed tarek
      </a>
    </footer>
  );
});
export default Footer;
