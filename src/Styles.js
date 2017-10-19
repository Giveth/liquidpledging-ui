
import SubDelegateIcon from 'react-icons/lib/md/subdirectory-arrow-right'

export const Colors = {
    highlight:'#4caf50',
    secondary:'#9c9c9c'
}

export const Styles = {

    indentPadding:30,
    subDelegateIcon: SubDelegateIcon,
    delegation:
    {
        container:{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        },

        header:{
            display: 'flex',
            flexDirection: 'row'
        },

        title:{
            color:Colors.highlight,
            margin: 0
        },

        assignedAmount:{
            color:Colors.secondary,
            margin: 0
        }


    },

}
