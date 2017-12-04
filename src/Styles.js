import SubDelegateIcon from 'react-icons/lib/md/subdirectory-arrow-right'
import ColapsedIcon from 'react-icons/lib/md/keyboard-arrow-up'
import ShownIcon from 'react-icons/lib/md/keyboard-arrow-down'
import AddIcon from 'react-icons/lib/fa/plus'
import CancelIcon from 'react-icons/lib/fa/close'
import AddAdminIcon from 'react-icons/lib/md/group-add'
import ProjectIcon from 'react-icons/lib/fa/flask'
import PledgesIcon from 'react-icons/lib/fa/info'
import Numeral from 'numeral'

const MAX_CONTENT_WIDTH = 800
const MIN_CONTENT_WIDTH = 400

export const Colors = {
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
        //justifyContent:'space-between',
    },

    page:{
        center:{
            display:"flex",
            justifyContent:"center",
            alignItems:"flexStart"
        },

        container:{
            margin:20,
            maxWidth:MAX_CONTENT_WIDTH,
            minWidth:MIN_CONTENT_WIDTH,
            width:MAX_CONTENT_WIDTH
        }
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

    delegateRootTitle:
    {
        fontSize:'1.2em'
    },

    sectionTitle:
    {
        fontSize:'0.9em',
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
        flex:2,
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
            paddingLeft: 5,
            paddingRight: 10,
            paddingTop: 0,
            paddingBottom: 0,
            whiteSpace:'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
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
       width:100,
       height:100,
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
        //position: 'fixed',
        zIndex:100,
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

    toEther(wei)
    {
        return wei/1000000000000000000
    },

    format(amount)
    {
        let number = Numeral(amount)
        return number.format('$0,0.[0000]')
    },

    //symbol : 'Ξ' 
    symbol : 'ETH ' 
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

