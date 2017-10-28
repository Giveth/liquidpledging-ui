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

    let rows = 1
    if(this.props.pledges.length)
        rows = this.props.pledges.length

    return (        
      <div>
        <ReactTable
          data={this.props.pledges}
          columns={[
            {
              Header: this.props.title,
              columns: [
                {
                    Header: "Id",
                    amount: "Id",
                    accessor: "id"
                },
                {
                    Header: "Amount",
                    id: "amount",
                    accessor: d => d.amount,
                    Cell: row => Currency.format(Currency.toEther(row.row.amount))
                },
                {
                    Header: "Delegates",
                    id: "delegates",
                    accessor: d => d.delegates,
                    Cell: row => row.row.delegates.toString()
                },
                {
                    Header: "Owner",
                    id: "owner",
                    accessor: d => d.owner,
                },
                {
                    Header: "Intended project",
                    id: "intendedProject",
                    accessor: d => d.intendedProject,
                },
                {
                    Header: "Commit time",
                    id: "commmitTime",
                    accessor: d => d.commmitTime,
                },
                {
                    Header: "Old pledge",
                    id: "oldPledge",
                    accessor: d => d.oldPledge,
                },
                {
                    Header: "Payment state",
                    id: "paymentState",
                    accessor: d => d.paymentState,
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