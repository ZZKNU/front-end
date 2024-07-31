const Pagination = ({ currentPage = 1, numberOfPages, onClick, limit = 5 }) => {
  const currentSet = Math.ceil(currentPage / limit);
  const lastSet = Math.ceil(numberOfPages / limit);
  const startPage = limit * (currentSet - 1) + 1;
  const numberOfPageForSet =
    currentSet === lastSet && numberOfPages % limit !== 0
      ? numberOfPages % limit
      : limit;

  return (
    <nav aria-label="Page navigation example">
      <ul className="flex justify-center space-x-2">
        {currentSet !== 1 && (
          <li>
            <div
              className="bg-indigo-300 text-white font-bold py-2 px-4 rounded cursor-pointer hover:hover:bg-gray-300"
              onClick={() => onClick(startPage - limit)}
            >
              Previous
            </div>
          </li>
        )}
        {Array(numberOfPageForSet)
          .fill(startPage)
          .map((value, index) => value + index)
          .map((pageNumber) => {
            return (
              <li key={pageNumber}>
                <div
                  className={`font-bold py-2 px-4 rounded cursor-pointer ${
                    currentPage === pageNumber
                      ? "bg-indigo-300 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                  onClick={() => {
                    onClick(pageNumber);
                  }}
                >
                  {pageNumber}
                </div>
              </li>
            );
          })}
        {currentSet !== lastSet && (
          <li>
            <div
              className="bg-indigo-300 text-white font-bold py-2 px-4 rounded cursor-pointer hover:hover:bg-gray-300"
              onClick={() => onClick(startPage + limit)}
            >
              Next
            </div>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
