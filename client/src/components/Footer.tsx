import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footercontainer}>
      <a href="cgu">CGU</a>
      <img src="images/instagram_icon.png" alt="instagram" />
      <img src="images/facebook.png" alt="facebook" />
      <img src="images/github_icon.png" alt="github" />
      <Link to="/contact">Contact</Link>
    </footer>
  );
}

export default Footer;
