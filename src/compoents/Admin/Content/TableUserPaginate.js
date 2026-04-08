import React, { useEffect, useState } from 'react';

import ReactPaginate from 'react-paginate';



const TableUserPaginate = (props) => {

    const { listUsers, handleClickBtnUpdate, handleViewUser, handleDeleteUser, fetchListUsersWithPaginate, pageCount } = props;



    const handlePageClick = (event) => {
        fetchListUsersWithPaginate(+event.selected + 1)
        props.setCurrentPage(+event.selected + 1)
        console.log(
            `User requested page number ${event.selected} `
        )
    };



    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">{item.id}</th>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => handleViewUser(item)}
                                    >View
                                    </button>
                                    <button
                                        className="btn btn-warning mx-3"
                                        onClick={() => handleClickBtnUpdate(item)}
                                    >Update
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteUser(item)}
                                    >Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}

                    {listUsers && listUsers.length === 0 &&
                        <tr>
                            <td colSpan={'5'}>Not found data</td>
                        </tr>
                    }
                </tbody>
            </table >
            <ReactPaginate
                containerClassName="pagination justify-content-center"
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
                forcePage={props.currentPage - 1}
            />


        </>
    )
}

export default TableUserPaginate;