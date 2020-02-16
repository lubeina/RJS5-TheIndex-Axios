import React from "react";

const BookRow = props => {
  const book = props.book;
  const authorName = props.authorName;

  const authors = book.authors.map(author => (
    <div key={author.id}>{author.name} </div>
  ));

  return (
    <tr>
      <td>{book.title}</td>
      {/* <td>{authorName}</td> */}
      <td> {authors} </td>

      <td>
        <button className="btn" style={{ backgroundColor: book.color }} />
      </td>
    </tr>
  );
};

export default BookRow;
