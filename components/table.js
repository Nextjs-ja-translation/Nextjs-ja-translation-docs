// Packages
import React from 'react';

const Table = ({ children }) => (
  <table cellSpacing="0" cellPadding="5">
    <tbody>
      {children}

      <style jsx>
        {`
          table {
            width: 100%;
            margin: 30px 0;
            border: none;
          }
        `}
      </style>
    </tbody>
  </table>
);

function Row({ children }) {
  return (
    <tr>
      {children}

      <style jsx>
        {`
          tr {
            text-align: left;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
          }
        `}
      </style>
    </tr>
  );
}

const Cell = ({ children }) =>
  React.createElement(
    'td',
    {
      style: {
        verticalAlign: 'top'
      }
    },
    children
  );

export { Table, Row, Cell };
