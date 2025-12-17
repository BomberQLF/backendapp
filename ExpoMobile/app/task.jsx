import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './config';

export default function Task({ _id, title, completed = false, onStatusChange }) {
    const [isChecked, setIsChecked] = useState(completed);
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(title);

    // Animations
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const checkAnim = useRef(new Animated.Value(completed ? 1 : 0)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;

    // Animation d'entrée
    useEffect(() => {
        Animated.spring(slideAnim, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleCheck = async () => {
        // Animation du check
        Animated.sequence([
            Animated.spring(scaleAnim, {
                toValue: 0.9,
                tension: 100,
                friction: 3,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 100,
                friction: 3,
                useNativeDriver: true,
            }),
        ]).start();

        Animated.spring(checkAnim, {
            toValue: isChecked ? 0 : 1,
            tension: 80,
            friction: 5,
            useNativeDriver: true,
        }).start();

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

    const handleDelete = async () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            if (onStatusChange) onStatusChange(_id, null, true);
        });

        const token = await AsyncStorage.getItem('userToken');
        await fetch(`${API_URL}/task/${_id}`, {
            method: 'DELETE',
            headers: { 
                'Authorization': `Bearer ${token}`
            },
        });
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
        <Animated.View style={[
            styles.container,
            {
                opacity: slideAnim,
                transform: [{
                    translateX: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-50, 0]
                    })
                }]
            }
        ]}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <TouchableOpacity
                    style={[styles.checkbox, isChecked && styles.checkboxChecked]}
                    onPress={handleCheck}
                    activeOpacity={0.7}
                >
                    <Animated.View style={[
                        styles.checkIcon,
                        {
                            opacity: checkAnim,
                            transform: [{
                                scale: checkAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.3, 1]
                                })
                            }]
                        }
                    ]}>
                        <Text style={styles.checkIconText}>✓</Text>
                    </Animated.View>
                </TouchableOpacity>
            </Animated.View>

            {isEditing ? (
                <TextInput
                    style={styles.input}
                    value={editValue}
                    onChangeText={setEditValue}
                    onSubmitEditing={handleSaveEdit}
                    autoFocus
                />
            ) : (
                <TouchableOpacity 
                    style={styles.textContainer}
                    onPress={() => setIsEditing(true)}
                    activeOpacity={0.7}
                >
                    <Text style={[
                        styles.taskText,
                        isChecked && styles.taskTextCompleted
                    ]}>
                        {editValue}
                    </Text>
                </TouchableOpacity>
            )}

            <View style={styles.actions}>
                {!isEditing && (
                    <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => setIsEditing(true)}
                        activeOpacity={0.6}
                    >
                        <View style={styles.iconCircle}>
                            <Text style={styles.actionIcon}>✏️</Text>
                        </View>
                    </TouchableOpacity>
                )}

                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={handleDelete}
                    activeOpacity={0.6}
                >
                    <View style={[styles.iconCircle, styles.iconCircleDelete]}>
                        <Text style={styles.actionIcon}>🗑️</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginVertical: 6,
        padding: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
        minHeight: 64,
    },
    checkbox: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2.5,
        borderColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    checkboxChecked: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    checkIcon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkIconText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '900',
    },
    textContainer: {
        flex: 1,
        paddingRight: 8,
    },
    taskText: {
        fontSize: 16,
        color: '#1A1A1A',
        fontWeight: '500',
        lineHeight: 22,
        letterSpacing: 0.2,
    },
    taskTextCompleted: {
        textDecorationLine: 'line-through',
        color: '#AAAAAA',
        fontWeight: '400',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#1A1A1A',
        fontWeight: '500',
        lineHeight: 22,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#007AFF',
        marginRight: 8,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    actionButton: {
        padding: 4,
    },
    iconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F8F9FA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconCircleDelete: {
        backgroundColor: '#007AFF',
    },
    actionIcon: {
        fontSize: 16,
    },
});