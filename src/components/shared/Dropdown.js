import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import { colors, sizes } from '../constants/theme'
import Icon from './Icon'

export default DropDown = ({defaultText, list, onSelect}) => {
    return (
        <SelectDropdown
            data={list}
            onSelect={(selectedItem) => {onSelect(selectedItem)}}
            defaultButtonText={defaultText}
            buttonTextAfterSelection={(selectedItem) => {return selectedItem}}
            rowTextForSelection={(item) => {return item}}
            buttonStyle={{backgroundColor:colors.white,borderRadius:sizes.radius,borderWidth:1, height: 40, width: 130,}}
            buttonTextStyle={{fontSize: sizes.caption}}
            dropdownStyle={{borderRadius:sizes.radius,width: 180,marginLeft: -20}}
            renderDropdownIcon={()=>{return <Icon icon="downArrow"size={20}/>}}
        />
    )
}