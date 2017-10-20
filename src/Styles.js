
import FontIcon from 'material-ui/FontIcon'
import SubDelegateIcon from 'react-icons/lib/md/subdirectory-arrow-right'
import ColapsedIcon from 'react-icons/lib/md/keyboard-arrow-up'
import ShownIcon from 'react-icons/lib/md/keyboard-arrow-right'

import Numeral from 'numeral'

export const Colors = {
    highlight:'#333',
    backgroundHighlight:'rgba(0, 0, 0, 0.03)',
    secondary:'#666'
}

export const Icons = {

    subDelegate: SubDelegateIcon,
    colapsed: ColapsedIcon,
    shown:ShownIcon,
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
            maxWidth:600,
            minWidth:400,
            width:600
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

        assignedAmount:{
            color:Colors.secondary,
            
        },

        colapseButton:{
            width:32
        },

        bodyShown:{

        },

        bodyColapsed:{
            display:'none'
        },
    },

    givethLogo:{
        WebkitFilter: 'grayscale(100%)', 
       justifyContent:"center"
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

