import style from "./index.module.css";
export default function Splash() {
  return (
    <div className={style["splash"]}>
      <img src="/pokemon-logo.png" alt="logo" />
    </div>
  );
}
