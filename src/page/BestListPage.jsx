import ListForm2 from "../components/ListForm2";

const BestListPage = () => {
  return (
    <>
      <div>
        <ListForm2 isBest={true} name={"베스트 도전 게시물"} />
      </div>
    </>
  );
};

export default BestListPage;
