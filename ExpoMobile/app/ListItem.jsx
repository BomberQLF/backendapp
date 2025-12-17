import React, { useState, useEffect ,} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './config';

export default function ListItem({ _id, name, onListChange }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(name);
      const [showActions, setShowActions] = useState(false);

      // Mettre à jour le nom de la liste si les on choisis une autre liste
        useEffect(() => {
        setEditValue(name);
        setShowActions(false);
        setIsEditing(false);
    }, [name, _id]);


    const handleDelete = async () => {
        const token = await AsyncStorage.getItem('userToken');
        await fetch(`${API_URL}/list/${_id}`, {
            method: 'DELETE',
            headers: { 
                'Authorization': `Bearer ${token}`
            },
        });
        if (onListChange) onListChange(_id, true); 
    };

    const handleSaveEdit = async () => {
        const token = await AsyncStorage.getItem('userToken');
        await fetch(`${API_URL}/list/${_id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name: editValue, title: editValue }),
        });
        setIsEditing(false);
        if (onListChange) onListChange(_id, false, editValue);
    };

    return (
        <View style={styles.container}>
            {isEditing ? (
                <TextInput
                    style={[styles.ListText, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 4, paddingHorizontal: 4 }]}
                    value={editValue}
                    onChangeText={setEditValue}
                    onSubmitEditing={handleSaveEdit}
                    autoFocus
                />
            ) : (
                <Text style={styles.ListText}>
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
    ListText: {
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