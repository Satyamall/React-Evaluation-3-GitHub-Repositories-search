function Pagination({ total, currentPage, onClickCallback }) {
    const pages = new Array(total).fill(0).map((value, index) =>
      currentPage === index + 1 ? (
        <button disabled key={index}>
          {index + 1}
        </button>
      ) : (
        <button key={index} onClick={() => onClickCallback(index + 1)}>
          {" "}
          {index + 1}
        </button>
      )
    );
    return <div>{pages}</div>;
  }
  
  export default Pagination;
  