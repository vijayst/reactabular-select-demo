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
      this.handleIdChange = this.handleIdChange.bind(this);

      // Add ID column
      columns.push({
        property: 'id',
        header: {
          label: 'Select'
        },
        cell: {
          format: this.renderId.bind(this)
        }
      });

      this.state = {
        rows,
        columns
      };
    }

    onRow(row, { rowIndex }) {
      console.log('on row');
      return {
        className: row.selected && 'selected-row',
        onClick: () => this.onSelectRow(row, rowIndex)
      };
    }

    onSelectRow(row, rowIndex) {
      const { rows } = this.state;
      const { id, name, age } = row;
      console.log('select row');
      this.setState({
        id,
        name,
        age,
        rowNumber: rowIndex + 1
      });
    }

    handleIdChange() {

    }

    renderId(value) {
      return (
        <input
          key={value}
          name="id"
          type="checkbox"
          value={value}
          onChange={this.handleIdChange}
        />
      );
    }

    render() {
      const { rows, columns, id, name, age, rowNumber } = this.state;
      let selectedRows = rows;
      if (rowNumber) {
        const selection = select.row({
          rows,
          selectedRowId: rows[rowNumber - 1].id
        });
        selectedRows = selection.rows;
      }

      return (
        <div>
          <h2>Detail</h2>
          {rowNumber ? (
            <div>
              <div>
                <div>ID</div>
                <div>{id}</div>
              </div>
              <br />
              <div>
                <div>Name</div>
                <div>{name}</div>
              </div>
              <br />
              <div>
                <div>Age</div>
                <div>{age}</div>
              </div>
            </div>
          ) : (
            <div>Please select a row to view detail</div>
          )}
          <hr />
          <h2>List</h2>
          <Table.Provider
            className="pure-table pure-table-striped"
            columns={columns}
          >
            <Table.Header />

            <Table.Body
              rows={selectedRows}
              rowKey="id"
              onRow={this.onRow}
            />

          </Table.Provider>
        </div>
      );
    }
}

ReactDOM.render(<App />, document.getElementById('container'));
