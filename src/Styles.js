import SubDelegateIcon from 'react-icons/lib/md/subdirectory-arrow-right'
import ColapsedIcon from 'react-icons/lib/md/keyboard-arrow-up'
import ShownIcon from 'react-icons/lib/md/keyboard-arrow-right'
import AddIcon from 'react-icons/lib/md/add-circle'

import Numeral from 'numeral'

const MAX_CONTENT_WIDTH = 600
const MIN_CONTENT_WIDTH = 400

export const Colors = {
    highlight:'#333',
    backgroundHighlight:'rgba(0, 0, 0, 0.05)',
    secondary:'#666'
}

export const Icons = {

    subDelegate: SubDelegateIcon,
    colapsed: ColapsedIcon,
    shown:ShownIcon,
    add:AddIcon,
}

export const Styles = {

    indentPadding:16,

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
   
    delegation:
    {
        container:{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        },

        header:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent:'flex-start',
            paddingLeft: 5,
            paddingRight: 10,
            paddingTop: 0,
            paddingBottom: 0,
        },

        giverHeader:{
            backgroundColor: Colors.backgroundHighlight,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            marginTop: 5
        },

        delegateHeader:{
        },

        title:{
            color:Colors.highlight,
            paddingLeft: 5,
            paddingRight: 10,
            paddingTop: 0,
            paddingBottom: 0,
        },

        colapseButton:{
            width:32
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
    }
}

export function Merge (style1, style2) {
    return Object.assign({},style1, style2)
}

export const Currency = {

    toEther(wei)
    {
        let number = Numeral(wei);
        number.divide(1000000000000000000)
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

Numeral.locale('eth');

