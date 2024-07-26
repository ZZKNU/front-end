import ListForm from "../components/ListForm";

const BestListPage = () => {
  return (
    <>
      <div>
        <ListForm isBest={true} name={"베스트 도전 게시물"}/>
      </div>
    </>
  );
};

export default BestListPage;
