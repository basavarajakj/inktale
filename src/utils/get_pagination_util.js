/**
 * @license Apache-2.0
 * @copyright 2024 Basavaraja K J
 */

'use strict';


/**
 * Generate pagination object based on given request parameters, limit and total number of blogs.
 * 
 * @param {object} reqParams - The request parameter object containing pageNumber.
 * @param {number} limit - The limit of blogs per page.
 * @param {number} totalBlogs - The total number of blogs.
 * @returns {object} Pagination object with next, prev, total, and current page information. 
 */
const getPagination = (currentRoute, reqParams, limit, totalBlogs) => {

  const currentPage = Number(reqParams.pageNumber) || 1;
  const skip = limit * (currentPage - 1);
  const totalPages = Math.ceil(totalBlogs / limit);

  const paginationObj = {
    next: totalBlogs > (currentPage * limit) ? `${currentRoute}page/${currentPage + 1}`: null,
    prev: skip && currentPage <= totalPages ? `${currentRoute}page/${currentPage - 1}`: null,
    totalPages,
    currentPage,
    skip,
    limit
  };

  return paginationObj;
}

module.exports = getPagination;