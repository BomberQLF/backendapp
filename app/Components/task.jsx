import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Task({ title }) {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.checkbox, { backgroundColor: isChecked ? '#007AFF' : '#ccc', borderColor: isChecked ? '#007AFF' : '#ccc' }]}
                    onPress={() => setIsChecked(!isChecked)}
                >
                    {isChecked && (
                        <Text style={styles.checkboxText}>
                            ✓
                        </Text>
                    )}
                </TouchableOpacity>

                <Text style={[styles.TaskText,{ textDecorationLine: isChecked ? 'line-through' : 'none', color: isChecked ? '#999' : '#333'}]}>

                    {title}
                </Text>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderRadius: 4,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkboxText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    TaskText: {
        flex: 1,
        fontSize: 16,
    },


})