import Numeral from 'numeral'
import SubDelegateIcon from 'react-icons/lib/md/subdirectory-arrow-right'
import ColapsedIcon from 'react-icons/lib/md/keyboard-arrow-up'
import ShownIcon from 'react-icons/lib/md/keyboard-arrow-down'
import AddIcon from 'react-icons/lib/fa/plus'
import CancelIcon from 'react-icons/lib/fa/close'
import AddAdminIcon from 'react-icons/lib/md/group-add'
import ProjectIcon from 'react-icons/lib/fa/flask'
import PledgesIcon from 'react-icons/lib/go/search'
import Web3 from 'web3'
import Moment from 'moment'

const MAX_CONTENT_WIDTH = 960
const MIN_CONTENT_WIDTH = 600
const PAGE_SIDE_PADDING = 60
const CARD_RADIUS = 6
const CARD_SIDE_PADDING = 25

export const Colors = {
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

    subDelegate: SubDelegateIcon,
    colapsed: ColapsedIcon,
    shown:ShownIcon,
    add:AddIcon,
    cancel:CancelIcon,
    addAdmin:AddAdminIcon,
    project:ProjectIcon,
    pledges:PledgesIcon,
}

export const Styles = {

    indentPadding:16,
    minContentWidth:MIN_CONTENT_WIDTH,
    maxContentWidth:MAX_CONTENT_WIDTH,


    emptyButton:{
        display:"flex",
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        width:48,
    },

    space:{
        width:24,
        height:24,
    },

    row:{
        display:"flex",
        flexDirection: 'row',
        alignItems:"baseline"
        //justifyContent:'space-between',
    },

    subtitle:{
        color:Colors.secondary,
        textTransform: 'uppercase',
        paddingTop:40,
        margin:0,
    },

    addressSubtle:{
        color:Colors.subtle,
        display: 'inline',
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
        fontSize:'0.8em',
    },

    adminColor:{
        color:Colors.admin
    },

    cardTitle:
    {
        fontSize:'1.2em',
        color: Colors.base,
        display: 'inline',
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
    },

    sectionTitle:
    {
        fontSize:'1em',
        color:Colors.subtle,
        fontWeight: 200,
        textTransform: 'uppercase',
        marginBottom:10,
        marginTop:10,
    },

    sectionFrontCell:
    {
        minWidth:200,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'center',
        flex:1,
    },

    sectionMiddleCell:
    {
        minWidth:200,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'center',
        flex:1,
    },

    sectionBackCell:
    {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'flex-end',
        alignItems: 'center',
    },
   
    delegation:
    {
        container:{
            display: 'flex',
            flexDirection: 'column'
        },

        header:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent:'space-between',
            paddingLeft: 15,
            paddingRight: 15,
            paddingTop: 5,
            paddingBottom: 5,
            marginTop: 5,
        },

        rootHeader:{
            backgroundColor: Colors.rootHeaderBackground
        },

        giverHeader:{
            backgroundColor: Colors.giverBackground,            
        },

        delegateHeader:{
            backgroundColor: Colors.delegateBackground,
            
        },

        headerCell:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent:'flex-start',
            alignItems: 'center',
        },

        giverBackgroundHover:{
            backgroundColor : Colors.giverBackgroundHover
        },
        
        delegateBackgroundHover:{
            backgroundColor : Colors.delegateBackgroundHover
        },

        colapseButton:{
            //width:32
        },

        body:{

        },

        bodyColapsed:{
            display:'none'
        },

        title:{
            color:Colors.highlight,
            paddingRight: 10,
            paddingTop: 0,
            paddingBottom: 0,
            whiteSpace:'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            fontWeight: 300,
            fontSize: '0.95em',
        
        },

        shrink:{
            flex:1,
            minWidth: 0,
            flexBasis:'auto'
        },

        actionButons:
        {
            flexShrink:0,
            display: 'inlineBlock',
        },

        amount:{
            color:Colors.secondary,
           // minWidth:120,
        }
    },

    rootDelegation:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingBottom:10,
        paddingTop:10,
       // paddingLeft:15,
        height:16,
        marginBottom:5,
        backgroundColor:Colors.rootDelegationBackround,
    },

    giverCardHeader:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 5,
    },

    givethLogo:{
       // WebkitFilter: 'grayscale(100%)', 
       justifyContent:"center",
       width:50,
       height:50,
       paddingTop:30
    },

    dialogs:{
        narrow: {
            width: MIN_CONTENT_WIDTH
        },
        fit:{
            width: 'fit-content'
        }
    },

    floatingBottomRight:{
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
        zIndex:100,
        backgroundColor:'grey'
    },

    floatingAddressSelectorTopLeft:{
        margin: 0,
        top: 10,
        right: 20,
        bottom: 'auto',
        left: 'auto',
        zIndex:100,
    },

    

    appBar:{

        body:{
            backgroundColor: "#6CCDDC",
            height: 30,
            margin: 0,
            paddingTop: 30,
            paddingBottom:30,
            paddingLeft:PAGE_SIDE_PADDING,
            paddingRight:PAGE_SIDE_PADDING,
            display: "flex",
            flexDirection: 'row',
            justifyContent:'center',
            alignItems:"center",

        },
        content:{
            display: "flex",
            flexDirection: 'row',
            justifyContent:'space-between',
            alignItems:"baseline",
            flex:1,
            maxWidth:MAX_CONTENT_WIDTH,
            fontSize: "x-large",
            fontWeight:200,
            color:"white"
        }
    },

    page:{
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
            paddingTop: 30,
            paddingBottom:30,
            paddingLeft:PAGE_SIDE_PADDING,
            paddingRight:PAGE_SIDE_PADDING,
            maxWidth:MAX_CONTENT_WIDTH
        }
    },

    card:{

        body:{
            display: "flex",
            justifyContent:'center',
            flexDirection: 'column',
            padding:0,
            backgroundColor:"white",
            borderRadius:CARD_RADIUS,
            margin:10
        },

        header:{
            backgroundColor:"#6CCDDC",
            paddingTop:20,
            paddingBottom:20,
            paddingLeft: CARD_SIDE_PADDING,
            paddingRight: CARD_SIDE_PADDING,
            borderTopLeftRadius: CARD_RADIUS,
            borderTopRightRadius: CARD_RADIUS,
            display: "flex",
            justifyContent:'center',
            flexDirection: 'column',

            fontSize:'1em',
            color:"white",
            fontWeight: 200,
            textTransform: 'uppercase',

        },

        content:{
            padding:20,
            paddingLeft: CARD_SIDE_PADDING,
            paddingRight: CARD_SIDE_PADDING,
            display: "flex",
            justifyContent:'center',
            flexDirection: 'column',
        },

        row:{
            display: "flex",
            flexDirection: 'row',
            justifyContent:'space-between',
            alignItems:"baseline"
        }
    },

    funds:{
        amount:{},
        currency:{
            fontSize:"80%",
            opacity:0.7
        },
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
        if(endDate === 0)
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
        return number === 1 ? 'er' : 'ème';
    },*/
    currency: {
        symbol: ''
    }
});

Numeral.locale('eth')

