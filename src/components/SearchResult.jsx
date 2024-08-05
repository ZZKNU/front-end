import { addFriends } from "../apis/api";
import Modal from "./Modal";

const SearchResultModal = ({ isOpen, onClose, searchResult }) => {
  if (!searchResult) return null;
  console.log(searchResult.id);
  const addFriendHandler = async () => {
    try {
      await addFriends(searchResult.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Search Result">
      <div className="space-y-2">
        <p>
          <strong>Nickname:</strong> {searchResult.nickName}
        </p>
        <button onClick={addFriendHandler}>친구 추가</button>
      </div>
    </Modal>
  );
};

export default SearchResultModal;
