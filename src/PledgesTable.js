import React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import {Currency} from './Styles'
import LPState from "./LiquidPledgingState.js"
import {Time} from "./Styles.js"

class PledgesTable extends React.Component {

    getColorByAdminType(type)
    {
        if(type==="Project")
            return "red"
        if(type==="Delegate")
            return "green"
        if(type==="Giver")
            return "yellow"
        
    }

    humanizeDelegates=(delegates)=>
    {
        
        let list = delegates.map((adminId)=>{
            let delegation = LPState.getAdmin(adminId)
            console.log(adminId, delegation)
            let color = this.getColorByAdminType(delegation.type)
            console.log(color)
            return <span 
                style = {{color:color}}
                key = {delegation.id}>
                    {delegation.name}
                </span>
        })
        return (<div>
                    {list}
                </div>)
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
                        accessor: d =>d.owner + " " + LPState.getAdmin(d.owner).name,
                    },
                    {
                        Header: "Intended project",
                        id: "intendedProject",
                        accessor: d => d.intendedProject,
                    },
                    {
                        Header: "Commit time",
                        id: "commmitTime",
                        accessor: d => Time.humanizeTimeLeft(d.commmitTime),
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