import logoImage from "../../assets/images/logo.png";
import PostProfile from "../../components/PostProfile/PostProfile";
import styles from "./PostPage.module.css";

export default function PostPage() {
  return (
    <div className={styles.container}>
      <h1>
        <span className={styles.blind}>Openmind</span>
        <img src={logoImage} alt="openmind" />
      </h1>
      <PostProfile />
    </div>
  );
}
