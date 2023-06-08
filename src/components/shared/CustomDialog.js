import React from 'react'
import { Dialog, Portal, Text, Button } from 'react-native-paper'
import { colors } from '../constants/theme'

export default function CustomDialog({ onPress, state, setState }) {
    const hideDialog = () => setState(false)
    return (
        <Portal>
            <Dialog visible={state} onDismiss={hideDialog} style={{ backgroundColor: colors.black }}>
                <Dialog.Title>Are you sure?</Dialog.Title>
                <Dialog.Content>
                    <Text variant="titleSmall">You will be logout from this device.</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => hideDialog()} textColor='#fff'>Cancel</Button>
                    <Button onPress={() => onPress()} textColor='#fff'>Ok</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}
