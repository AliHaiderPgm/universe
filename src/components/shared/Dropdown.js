import React from 'react'
import { StyleSheet } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { colors, sizes } from '../constants/theme'
import Icon from './Icon'

export default DropDown = ({ defaultText, list, onSelect, style }) => {
    return (
        <SelectDropdown
            data={list}
            onSelect={(selectedItem) => { onSelect(selectedItem) }}
            defaultButtonText={defaultText}
            buttonTextAfterSelection={(selectedItem) => { return selectedItem }}
            rowTextForSelection={(item) => { return item }}
            buttonStyle={[styles.container, style]}
            buttonTextStyle={{ fontSize: sizes.caption }}
            dropdownStyle={{ borderRadius: sizes.radius, width: 180, marginLeft: -20 }}
            renderDropdownIcon={() => { return <Icon icon="downArrow" size={20} /> }}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        borderRadius: sizes.radius,
        borderWidth: 1,
        height: 40,
        width: 130,
    }
})