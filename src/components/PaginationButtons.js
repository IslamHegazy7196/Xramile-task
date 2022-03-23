import React from "react";
import { useFilterContext } from "../context/filter_context";
import styled from "styled-components";

const PaginationButtons = () => {
  const { all_pagination, setPagnition, current_pagination } =
    useFilterContext();
  const Nextpage = () => {
    let nextpage = current_pagination + 1;
    if (nextpage > all_pagination.length - 1) {
      nextpage = 0;
    }
    setPagnition(nextpage);
  };
  const prevpage = () => {
    let prevpage = current_pagination - 1;
    if (prevpage < 0) {
      prevpage = all_pagination.length - 1;
    }
    setPagnition(prevpage);
  };
  return (
    <Wrapper>
      <div className="btn-container">
        <button className="btn" onClick={prevpage}>
          Prev
        </button>
        {all_pagination.map((item, index) => {
          return (
            <button
              key={index}
              className={`btn ${
                index === current_pagination ? "active-btn" : null
              }`}
              onClick={() => setPagnition(index)}
            >
              {index + 1}
            </button>
          );
        })}
        <button className="btn" onClick={Nextpage}>
          Next
        </button>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .active-btn {
    color: var(--clr-primary-1);
    background: var(--clr-primary-7);
  }
  .btn-container {
    display: flex;
    column-gap: 0.5rem;
    margin-bottom: 0.25rem;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

export default PaginationButtons;
