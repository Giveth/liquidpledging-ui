import React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import {Currency} from './Styles'
import LPState from "./LiquidPledgingState.js"
import {Time} from "./Styles.js"

class PledgesTable extends React.Component {

    humanizeDelegates=(delegates)=>
    {
        let list = []
        
        delegates.forEach((adminId, index, array)=>{
            list.push(this.idToAdmin(adminId))

            if(index<array.length-1)
                list.push( <span  style = {{color:"LightGrey"}} > &#9658; </span>)
        })
        return <span> {list} </span>
    }

    idToAdmin(adminId)
    {
        if(adminId == 0)
            return ""

        return ( <span  key = {adminId}>
                    <span  style = {{color:"DimGrey"}} key = "id"> {" #"+ adminId} </span>
                    <span key = "name" > {LPState.getAdmin(adminId).name} </span>
                </span>)
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
                        Cell: row => this.humanizeDelegates(row.row.delegates)
                    },
                    {
                        Header: "Owner",
                        id: "owner",
                        accessor: d => this.idToAdmin(d.owner),
                    },
                    {
                        Header: "Intended project",
                        id: "intendedProject",
                        accessor: d => this.idToAdmin(d.intendedProject),
                    },
                    {
                        Header: "Commit time",
                        id: "commmitTime",
                        accessor: d => Time.humanizeTimeLeft(d.commmitTime),
                    },
                    {
                        Header: "Old pledge",
                        id: "oldPledge",
                        accessor: d => d.oldPledge==0?"":d.oldPledge,
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