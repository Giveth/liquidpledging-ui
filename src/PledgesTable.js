import React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import {Currency, Styles} from './Styles'
import LPState from "./LiquidPledgingState.js"
import {Time} from "./Styles.js"

class PledgesTable extends React.Component {

    humanizeDelegates=(delegates)=>
    {
        let list = []
        
        delegates.forEach((adminId, index, array)=>{
            list.push(this.idToAdmin(adminId))

            if(index<array.length-1)
                list.push( <span  key={index+">"} style = {{color:"LightGrey"}} > &#9658; </span>)
        })
        return <span> {list} </span>
    }

    idToAdmin(adminId)
    {
        if(adminId === 0)
            return ""

        return ( <span  key = {adminId}>
                    <span  style = {{color:"DimGrey"}} key = "id"> {" #"+ adminId} </span>
                    <span key = "name" > {LPState.getAdmin(adminId).name} </span>
                </span>)
    }

    filterText(filter , d)
    {
        return String(d._original[filter.id]).indexOf(filter.value)>-1
    }

    isSelectedId(id)
    {
        if(!this.props.selectedIds)
            return false

        for(let i of this.props.selectedIds)
        {
            if(i == id)
                return true
        }

        return false
    }

    getTable( )
    {
        let rows = this.props.pledges.length
        return (        
            <div>
                <ReactTable
                data={this.props.pledges}
                filterable = {true}
                defaultFilterMethod={(filter, delegation) => this.filterText(filter, delegation)}
                pageSize={rows}
                showPaginationTop={false}
                showPaginationBottom={false}
                noDataText=""
                getTrProps={(state, rowInfo, column) => {
                    if(!rowInfo)
                        return
                    let isSelectedId = this.isSelectedId(rowInfo.row.id)
                    let rowStyle = isSelectedId ?Styles.pledgesTable.selectedRow:{}
                    return {
                      style:rowStyle
                    }
                  }}
                columns={[
                    {
                    Header: this.props.title,
                    columns: [
                        {
                            Header: "Id",
                            amount: "Id",
                            accessor: "id",
                            width:40
                        },
                        {
                            Header: "Amount",
                            id: "amount",
                            accessor: d => d.amount,
                            Cell: row => Currency.format(Currency.toEther(row.row.amount)),
                            width:70
                        },
                        {
                            Header: "Delegates",
                            id: "delegates",
                            accessor: d => d.delegates,
                            Cell: row => this.humanizeDelegates(row.row.delegates),
                            minWidth:170
                        },
                        {
                            Header: "Owner",
                            id: "owner",
                            accessor: d => this.idToAdmin(d.owner),
                            minWidth:70
                        },
                        {
                            Header: "Intended project",
                            id: "intendedProject",
                            accessor: d => this.idToAdmin(d.intendedProject),
                            minWidth:70
                        },
                        {
                            Header: "Commit time",
                            id: "commmitTime",
                            accessor: d => Time.humanizeTimeLeft(d.commmitTime),
                            minWidth:70
                        },
                        {
                            Header: "Old pledge",
                            id: "oldPledge",
                            accessor: d => d.oldPledge===0?"":d.oldPledge,
                            minWidth:70
                        },
                        {
                            Header: "Payment state",
                            id: "paymentState",
                            accessor: d => d.paymentState,
                            minWidth:70
                        },
                    ]
                    }
                ]}        
                    
                />
    
            </div>
        )
    }

    render() {

        let table = <div/>
        if(this.props.pledges.length)
            table = this.getTable()

        return table
        
  }
}

export default PledgesTable
