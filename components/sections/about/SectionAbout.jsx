import styles from "./SectionAbout.module.scss";

const SectionAbout = () => {
  return (
    <div className={styles["section-about"]}>

      <p>
        저는 한국 서울에서 일하고 있는 테크니컬 아티스트, 개발자이자 교육자입니다.
        <br /> 공유와 공감에 큰 가치를 두고 있습니다.
      </p>

      <p>The purpose of this website is only for collecting that I studied in digital based media thesedays.
        <br /> 이 페이지에 있는 모든 프로젝트들은 연구/공부 목적입니다.</p>
    </div>
  );
};

export default SectionAbout;
