import { addFriends } from "../apis/api";
import Modal from "./Modal";

const SearchResult = ({ isOpen, onClose, searchResults }) => {
  const addFriendHandler = async (id) => {
    try {
      const res = await addFriends(id);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Search Result">
      <div className="space-y-2">
        {searchResults && searchResults.length > 0 ? (
          searchResults.map((result) => (
            <div key={result.id} className="result-item">
              <p>
                <strong>Nickname:</strong> {result.nickName}
                <button
                  className="btn btn-primary "
                  onClick={() => addFriendHandler(result.id)}
                >
                  친구 추가
                </button>
              </p>
            </div>
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </Modal>
  );
};

export default SearchResult;
