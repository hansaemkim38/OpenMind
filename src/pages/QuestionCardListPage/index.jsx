import QuestionCardList from "../../components/QuestionCardList/QuestionCardList";
import ListHeader from "../../components/ListHeader/ListHeader";
import arrowUp from "../../assets/images/icon/Arrow-up.svg";
import arrowDown from "../../assets/images/icon/Arrow-down.svg";
import Pagination from "../../components/Pagination/Pagination";
import styles from "./QuestionCardListPage.module.css";
import { useCallback, useEffect, useState } from "react";
import { List } from "./mockDatas";

function QuestionCardListPage() {
  const [sort, setSort] = useState("createdAt"); // 정렬기준 설정 useState
  const [viewDropdown, setViewDropdown] = useState(false); // 드롭다운 토글 useState
  const [title, setTitle] = useState("최신순"); //제목 useState
  const [arrowDirection, setArrowDirection] = useState(arrowDown); // 토글메뉴 화살표 useState

  const handleSortByNameClick = () => {
    setSort("name");
    setTitle("이름순");
  };
  const handleNewestClick = () => {
    setSort("createdAt");
    setTitle("최신순");
  };

  const sortList = [...List].sort((a, b) =>
    b[sort] < a[sort] ? -1 : b[sort] > a[sort] ? 1 : 0
  );

  const dropdownToggle = () => {
    setViewDropdown(!viewDropdown);
    viewDropdown ? setArrowDirection(arrowDown) : setArrowDirection(arrowUp); // 드롭다운 페이지 활성화시 ↑ 비활성화시 ↓
  };

function QuestionCardListPage() {
  const [feeds, setFeeds] = useState([]);
  const [limit, setLimit] = useState(8);
  const [currentOffset, setCurrentOffset] = useState(0);

  async function getSubjects({ limit, offset }) {
    const response = await (
      await fetch(
        `https://openmind-api.vercel.app/5-4/subjects/?limit=${limit}&offset=${offset}`
      )
    ).json();

    if (!response) return console.error("요청이 실패했습니다.");

    const { results, count } = response;

    return { results, count };
  }

  const displaySubjects = useCallback(async () => {
    try {
      const newFeeds = await getSubjects(limit, currentOffset);
      setFeeds(newFeeds);
    } catch (error) {
      console.error(error);
    }
  }, [limit, currentOffset]);

  useEffect(() => {
    displaySubjects();
  }, [displaySubjects]);

  return (
    <div className={styles.pageContainer}>
      <section className={styles.contentContainer}>
        <ListHeader />
        <div className={styles.titleAndSortBox}>
          <h1 className={styles.title}>누구에게 질문할까요?</h1>
          <ul className={styles.sortMenu}>
            <li>
              <button
                className={styles.selectSortButton}
                onClick={dropdownToggle}
              >
                {title}
                <img src={arrowDirection} alt={arrowDirection} />
              </button>
            </li>
            {viewDropdown && (
              <li className={styles.alignButtons}>
                <button
                  className={styles.alignButton}
                  onClick={handleSortByNameClick}
                >
                  이름순
                </button>
                <button
                  className={styles.alignButton}
                  onClick={handleNewestClick}
                >
                  최신순
                </button>
              </li>
            )}
          </ul>
        </div>
        <div className={styles.listAndPaginationBox}>
          <QuestionCardList feeds={feeds} />
          <Pagination />
        </div>
      </section>
    </div>
  );
}

export default QuestionCardListPage;
