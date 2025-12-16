import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './config';

export default function Task({ _id, title, completed = false, onStatusChange }) {
    const [isChecked, setIsChecked] = useState(completed);
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(title);


    const handleCheck = async () => {
        setIsChecked(!isChecked);
        const token = await AsyncStorage.getItem('userToken');
        await fetch(`${API_URL}/task/${_id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ completed: !isChecked }),
        });
        if (onStatusChange) onStatusChange(_id, !isChecked);
    };

    // Bouton supprimer
    const handleDelete = async () => {
        const token = await AsyncStorage.getItem('userToken');
        await fetch(`${API_URL}/task/${_id}`, {
            method: 'DELETE',
            headers: { 
                'Authorization': `Bearer ${token}`
            },
        });
        if (onStatusChange) onStatusChange(_id, null, true); 
    };

     const handleSaveEdit = async () => {
        const token = await AsyncStorage.getItem('userToken');
        await fetch(`${API_URL}/task/${_id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title: editValue }),
        });
        setIsEditing(false);
        if (onStatusChange) onStatusChange(_id, undefined, false, editValue);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[
                    styles.checkbox,
                    { backgroundColor: isChecked ? '#007AFF' : '#ccc', borderColor: isChecked ? '#007AFF' : '#ccc' }
                ]}
                onPress={handleCheck}
            >
                {isChecked && (
                    <Text style={styles.checkboxText}>
                        ✓
                    </Text>
                )}
            </TouchableOpacity>

            {isEditing ? (
                <TextInput
                    style={[styles.TaskText, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 4, paddingHorizontal: 4 }]}
                    value={editValue}
                    onChangeText={setEditValue}
                    onSubmitEditing={handleSaveEdit}
                    autoFocus
                />
            ) : (
                <Text style={[
                    styles.TaskText,
                    { textDecorationLine: isChecked ? 'line-through' : 'none', color: isChecked ? '#999' : '#333' }
                ]}>
                    {editValue}
                </Text>
            )}

            {isEditing ? (
                <TouchableOpacity style={styles.editButton} onPress={handleSaveEdit}>
                    <Text style={styles.editButtonText}>💾</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
                    <Text style={styles.editButtonText}>✏️</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#efefef',
        borderRadius: 0,
        minHeight: 56,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderRadius: 2,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#d0d0d0',
        backgroundColor: '#ffffff',
        flexShrink: 0,
    },
    checkboxText: { 
        color: '#ffffff', 
        fontSize: 14, 
        fontWeight: 'bold' 
    },
    TaskText: {
        flex: 1,
        fontSize: 15,
        color: '#333333',
        fontWeight: '400',
        letterSpacing: 0.3,
    },
    deleteButton: {
        marginLeft: 8,
        padding: 8,
        borderRadius: 4,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    deleteButtonText: {
        fontSize: 18,
    },
    editButton: {
        marginLeft: 4,
        padding: 8,
        borderRadius: 4,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    editButtonText: {
        fontSize: 18,
    },
});