import React from 'react';
import ReactDOM from 'react-dom';
import { Table, select } from 'reactabular';
import "./main.scss"

const rows = [
  {
    id: 100,
    name: 'Adam',
    age: 55
  },
  {
    id: 102,
    name: 'Joe',
    age: 12
  },
  {
    id: 101,
    name: 'Brian',
    age: 62
  },
  {
    id: 103,
    name: 'Mike',
    age: 22
  },
  {
    id: 104,
    name: 'Jack',
    age: 33
  }
];

const columns = [
  {
    property: 'name',
    header: {
      label: 'Name'
    }
  },
  {
    property: 'age',
    header: {
      label: 'Age'
    }
  }
];



export default class App extends React.Component {

    constructor() {
      super();
      this.onRow = this.onRow.bind(this);
      this.onSelectRow = this.onSelectRow.bind(this);
      this.state = {
        rows,
        columns
      };
    }

    onRow(row, { rowIndex }) {
      console.log('on row');
      return {
        className: row.selected && 'selected-row',
        onClick: () => this.onSelectRow(rowIndex)
      };
    }

    onSelectRow(selectedRowIndex) {
      const { rows } = this.state;
      console.log('select row');
      this.setState(
        select.row({
          rows,
          selectedRowId: rows[selectedRowIndex].id
        })
      );
    }

    render() {
      const { rows, columns, selectedRow } = this.state;
      console.log('render', rows);
      return (
        <Table.Provider
          className="pure-table pure-table-striped"
          columns={columns}
        >
          <Table.Header />

          <Table.Body
            rows={rows}
            rowKey="id"
            onRow={this.onRow}
          />

        </Table.Provider>
      );
    }
}

ReactDOM.render(<App />, document.getElementById('container'));
