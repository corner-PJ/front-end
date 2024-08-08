import React from 'react';
import styled from 'styled-components';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];

    for (let i = 0; i < totalPages; i++) {
        pages.push(i);
    }

    return (
        <PaginationContainer>
            {pages.map((page) => (
                <PageButton
                    key={page}
                    isSelected={page === currentPage}
                    onClick={() => onPageChange(page)}
                >
                    {page + 1}
                </PageButton>
            ))}
        </PaginationContainer>
    );
};

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
`;

const PageButton = styled.button`
    margin: 10px 6px;
    padding: 8px 13px;
    border: 2px solid #FC819E;
    border-radius: 5px;
    background-color: ${(props) => (props.isSelected ? '#FC819E' : 'transparent')};
    color: ${(props) => (props.isSelected ? '#FFFFFF' : '#FC819E')};
    cursor: pointer;
    font-size: 1.1em; 
    font-weight: bold; 

    &:hover {
        background-color: #FC819E;
        color: #FFFFFF;
    }
`;

export default Pagination;
