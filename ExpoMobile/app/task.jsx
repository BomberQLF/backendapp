import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput } from 'react-native';

export default function Task({ _id, title, completed = false, onStatusChange }) {
    const [isChecked, setIsChecked] = useState(completed);
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(title);


    const handleCheck = async () => {
        setIsChecked(!isChecked);
        await fetch(`http://localhost:3000/task/${_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !isChecked }),
        });
        if (onStatusChange) onStatusChange(_id, !isChecked);
    };

    // Bouton supprimer
    const handleDelete = async () => {
        await fetch(`http://localhost:3000/task/${_id}`, {
            method: 'DELETE',
        });
        if (onStatusChange) onStatusChange(_id, null, true); 
    };

     const handleSaveEdit = async () => {
        await fetch(`http://localhost:3000/task/${_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
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
    deleteButton: {
        marginLeft: 10,
        padding: 6,
        borderRadius: 4,
        backgroundColor: '#ff4d4d',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
    },
    editButton: {
        marginLeft: 5,
        padding: 6,
        borderRadius: 4,
        backgroundColor: '#ffd700',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editButtonText: {
        color: '#333',
        fontSize: 16,
    },
});