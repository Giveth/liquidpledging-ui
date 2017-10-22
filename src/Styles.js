import SubDelegateIcon from 'react-icons/lib/md/subdirectory-arrow-right'
import ColapsedIcon from 'react-icons/lib/md/keyboard-arrow-up'
import ShownIcon from 'react-icons/lib/md/keyboard-arrow-down'
import AddIcon from 'react-icons/lib/fa/plus'
import CancelIcon from 'react-icons/lib/fa/close'
import AddAdminIcon from 'react-icons/lib/md/group-add'

import Numeral from 'numeral'

const MAX_CONTENT_WIDTH = 600
const MIN_CONTENT_WIDTH = 400

export const Colors = {
    highlight:'#333',
    backgroundHighlight:'rgba(0, 0, 0, 0.05)',
    backgroundActive:'rgba(0, 0, 0, 0.1)',
    secondary:'#666',
    subtle:'#bbb',
    admin:'#ff3366',
    giverBackground:'rgba(0, 0, 0, 0.05)',
    delegateBackground:'rgba(0, 0, 0, 0.05)',
}

export const Icons = {

    subDelegate: SubDelegateIcon,
    colapsed: ColapsedIcon,
    shown:ShownIcon,
    add:AddIcon,
    cancel:CancelIcon,
    addAdmin:AddAdminIcon
}

export const Styles = {

    indentPadding:16,

    emptyButton:{
        width:48
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

    colorForAdmin : function (isAdmin)
    {
        let style={}
        
        if(isAdmin)
            style.color = Colors.admin

        return style
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
            paddingLeft: 20,
            paddingRight: 20,

        },

        giverHeader:{
            backgroundColor: Colors.giverBackground,
            paddingTop: 10,
            paddingBottom: 10,
            marginTop: 5,
            
        },

        delegateHeader:{
            backgroundColor: Colors.delegateBackground,
            paddingTop: 10,
            paddingBottom: 10,
            marginTop: 5,
        },

        headerCell:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent:'flex-start',
        },
        
        getHoverStyle : function (isHovering)
        {
            let style={}
            
            if(isHovering)
                style.backgroundColor = Colors.backgroundActive

            return style
        },

        title:{
            color:Colors.highlight,
            paddingLeft: 5,
            paddingRight: 10,
            paddingTop: 0,
            paddingBottom: 0,
        },

        colapseButton:{
            //width:32
        },

        bodyShown:{

        },

        bodyColapsed:{
            display:'none'
        },

        amount:{
            color:Colors.secondary,
            /*borderRadius: 4,
            MoBborderRadius: 4,
            WebkitBorderRadius: 4,
            backgroundColor: Colors.backgroundHighlight,
            padding: 10,
            margin: 0,*/
        }
    },

    givethLogo:{
        WebkitFilter: 'grayscale(100%)', 
       justifyContent:"center"
    },

    dialogs:{
        narrow: {
            width: MIN_CONTENT_WIDTH
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
    }

}

export function Merge (style1, style2, style3={}) {
    return Object.assign({},style1, style2, style3)
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

    symbol : 'Ξ' 
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

