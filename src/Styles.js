
import SubDelegateIcon from 'react-icons/lib/md/subdirectory-arrow-right'

import ColapseIcon from 'react-icons/lib/md/keyboard-arrow-up'
import ShownIcon from 'react-icons/lib/md/keyboard-arrow-right'

import Numeral from 'numeral'
import FontIcon from 'material-ui/FontIcon'


export const Colors = {
    highlight:'#4caf50',
    secondary:'#9c9c9c'
}

export const Icons = {

    subDelegate: SubDelegateIcon,
    colapse: ColapseIcon,
    shown:ShownIcon,


}


export const Styles = {

    indentPadding:16,
   
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
}

export const Format = {

    toEther(wei)
    {
        let number = Numeral(wei);
        number.divide(1000000000000000000)
        return number.value()
    }
}
