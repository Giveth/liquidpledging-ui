import React from "react"
import { render } from "react-dom"
import ReactTable from "react-table"
import "react-table/react-table.css"
import {Currency} from './Styles'

class PledgesTable extends React.Component {
  constructor() {
    super()
  }

  render() {

    console.log(this.props.pledges)

    let rows = 10
    if(this.props.pledges.length)
        rows = this.props.pledges.length

    return (        
      <div>
        <ReactTable
          data={this.props.pledges}
          columns={[
            {
              Header: "Pledges",
              columns: [
                {
                    amount: "Id",
                    accessor: "id"
                },
                {
                    Header: "Amount",
                    id: "amount",
                    accessor: d => d.amount,
                    Cell: row => Currency.format(Currency.toEther(row.row.amount))
                },

              ]
            }
          ]}
            pageSize={rows}
            showPaginationTop={false}
            showPaginationBottom={false}
            noDataText=""
        />

      </div>
    )
  }
}

export default PledgesTable


/*
(
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#dadada',
                          borderRadius: '2px'
                        }}>
                    </div>)

                    */