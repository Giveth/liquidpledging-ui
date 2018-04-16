import Numeral from 'numeral'
import Web3 from 'web3'
import Moment from 'moment'

import CancelIcon from 'react-icons/lib/fa/close' 

export const Global = {
    smallTrigger:450,
    MAX_CONTENT_WIDTH : 960,
    MIN_CONTENT_WIDTH : 300,
    PAGE_SIDE_PADDING : 20,
    CARD_RADIUS : 5,
    CARD_SIDE_PADDING : 25,
}


export const Colors = {
    contrast:'rgba(108, 205, 220, 1)',
    suttleContrast:'rgba(108, 205, 220, 0.3)',
    base:'#666',
    highlight:'#333',
    backgroundHighlight:'rgba(0, 0, 0, 0.05)',
    backgroundActive:'rgba(0, 0, 0, 0.1)',
    secondary:'#666',
    subtle:'#999',
    admin:'#49bffc',
    giverBackground:'rgba(0, 0, 0, 0.07)',
    delegateBackground:'rgba(0, 0, 0, 0.0)',
    giverBackgroundHover:'rgba(0, 0, 0, 0.1)',
    delegateBackgroundHover:'rgba(0, 0, 0, 0.02)',
    rootHeaderBackground:'rgba(0, 0, 0, 0.05)',
    rootDelegationBackround:'rgba(0, 0, 0, 0.05)',
}

export const Icons = {

    cancel:CancelIcon
}

export const Styles = {

    indentPadding:16,
    minContentWidth:Global.MIN_CONTENT_WIDTH,
    maxContentWidth:Global.MAX_CONTENT_WIDTH,

    givethLogo:{
        padding:Global.PAGE_SIDE_PADDING,
        width:70
    },

    row:{
        display:"flex",
        flexDirection: 'row',
    },

    dialogs:{
        narrow: {
            width: Global.MIN_CONTENT_WIDTH
        },
        fit:{
            width: 'fit-content'
        }
    },

    addressSelector:{
        width:250
    },

    title:{
        paddingTop: 15,
        fontWeight: 200,
        textTransform: "uppercase",
        color: "white",
        margin: 0,
        fontSize: "1em",
    },

    appBar:{

        body:{
            backgroundColor: Colors.contrast,
            height: 40,
            margin: 0,
            paddingTop: 0,
            paddingBottom:15,
            paddingLeft:Global.PAGE_SIDE_PADDING,
            paddingRight:Global.PAGE_SIDE_PADDING,
            display: "flex",
            flexDirection: 'row',
            justifyContent:'center',
            alignItems:"center",
            color:"white"
        },

        menu:{
            backgroundColor: Colors.contrast,
            height: 40,
            margin: 0,
            paddingTop: 0,
            paddingBottom:15,
            width:"100%"
        },

        menuItem:{
            paddingTop:0,
            paddingBottom:0,
            paddingLeft : Global.PAGE_SIDE_PADDING,
            paddingRight : Global.PAGE_SIDE_PADDING
        },

        header:{
            backgroundColor: Colors.contrast,
            height:60,
            paddingLeft:Global.PAGE_SIDE_PADDING,
            paddingRight:Global.PAGE_SIDE_PADDING,
            display: "flex",
            flexDirection: 'row',
            justifyContent:'space-between',
        },

        getHeight(){
            return this.body.height + this.body.paddingTop + this.body.paddingBottom
        },

        content:{
            display: "flex",
            flexDirection: 'row',
            justifyContent:'space-between',
            alignItems:"baseline",
            flex:1,
            maxWidth:Global.MAX_CONTENT_WIDTH,
            minWidth:Global.MIN_CONTENT_WIDTH,
            fontSize: "1.4em",
            fontWeight:200,
            color:"white",
             }
    },

    drawer:{
        width:300,
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'flex-start',
        alignItems: 'left',
    },

    canvas:{
        flex:1,
        display: "flex",
        flexDirection: 'row',
        alignItems:"flex-start",
    },

    page:{
        flex:1,
        display: "flex",
        justifyContent:'center',
        flexDirection: 'column',       
    }, 
    
    singlePage:{
    
        body:{
            display: "flex",
            flexDirection: 'row',
            justifyContent:'center',
            alignItems:"center",
        },  
        
        content:{
            flex:1,
            margin: 0,
            paddingTop: 10,
            paddingBottom:30,
            paddingLeft:Global.PAGE_SIDE_PADDING,
            paddingRight:Global.PAGE_SIDE_PADDING,
            maxWidth:Global.MAX_CONTENT_WIDTH,
            minWidth:Global.MIN_CONTENT_WIDTH,
            overflow:"auto"
        }
    },

    card:{

        body:{
            display: "flex",
            justifyContent:'center',
            flexDirection: 'column',
            padding:0,
            backgroundColor:"white",
            borderRadius:Global.CARD_RADIUS,
            marginTop:15,
            marginBottom:15,
            transition: "transform 300ms ease-in-out"
        },

        header:{
            backgroundColor:Colors.contrast,
            paddingTop:5,
            paddingBottom:5,
            borderTopLeftRadius: Global.CARD_RADIUS,
            borderTopRightRadius: Global.CARD_RADIUS,
            display: "flex",
            justifyContent:'center',
            flexDirection: 'column',

            fontSize:'1em',
            color:"white",
            fontWeight: 200,
            textTransform: 'uppercase',
        },

        content:{
            //paddingTop:10,
            paddingBottom:10,
            display: "flex",
            justifyContent:'center',
            flexDirection: 'column',
        },

        row:{
            display: "flex",
            flexDirection: 'row',
            justifyContent:'space-between',
            paddingLeft: Global.CARD_SIDE_PADDING,
            paddingRight: Global.CARD_SIDE_PADDING,
            lineHeight:"36px",
        },

        buttonsRow:
        {
            display: "flex",
            flexDirection: 'row',
            justifyContent:'space-between',
            paddingLeft: Global.CARD_SIDE_PADDING,
            paddingRight: Global.CARD_SIDE_PADDING,
            lineHeight:"36px",
            justifyContent: 'flex-end'
        },

        subHeader:
        {
            fontSize:"95%",
            color:Colors.contrast,
            fontWeight: 200,
            textTransform: 'uppercase',
        }, 

        delegation:
        {
            color:"grey",
            paddingLeft:Global.CARD_SIDE_PADDING,
            fontSize:"90%",
        },

        divider:
        {
            height:1,
            flex:1,
            backgroundColor:'rgba(0, 0, 0, 0.05)',
            //marginTop:3,
            //marginBottom:3
        }
    },

    funds:{
        amount:{},
        currency:{
            fontSize:"80%",
            opacity:0.7
        },
    },

    pledgesTable:{
        body:{
            borderRadius:Global.CARD_RADIUS,
            background:'white',
            padding:Global.CARD_SIDE_PADDING,
            marginTop:30
        },
        selectedRow:{
            backgroundColor:Colors.suttleContrast
        }
    }
}


export function Merge (style1, style2, style3={}) {
    return Object.assign({},style1, style2, style3)
}

export function MergeIf (style1, style2, condition){
    if(condition)
        return Object.assign({},style1, style2)
    else
        return style1
}

export const Currency = {

    //We work with "number" types.
    //Calculations are done in wei to avoid floting point precision errors

    toEther(wei)
    {
        if (typeof wei === "number")
            wei = wei.toString()
        wei = (isNaN(wei) || wei==="")  ? "0": wei
        return parseFloat(Web3.utils.fromWei(wei))
    },
    
    toWei(ether)
    {
        if (typeof ether === "number")
            ether = ether.toString()
        ether = (isNaN(ether) || ether==="")  ? "0": ether
        return parseInt(Web3.utils.toWei(ether),10)    
    },

    format(amount)
    {
        if (typeof amount === "string")
            amount = parseFloat(amount)

        let number = Numeral(amount)
        return number.format('$0,0.00[000]')//optional decimals inside brackets
    },

    //symbol : 'Ξ ' 
    symbol : 'ETH ' 
}

export const Time = {

    humanizeTimeLeft(endDate)
    {
        if(endDate.toString() === '0')
            return ""
        
        let current = new Date().getMilliseconds()
        let millisLeft = endDate - current

       return Moment.duration(millisLeft).humanize(true) 
    }
}

Numeral.register('locale', 'eth', {
    delimiters: {
        thousands: ' ',
        decimal: '.'
    },
    abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't'
    },
    /*ordinal : function (number) {
        return number === 1 ? 'er' : 'ème'
    },*/
    currency: {
        symbol: ''
    }
})

Numeral.locale('eth')

