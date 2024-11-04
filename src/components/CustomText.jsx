import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const CustomText = ({
    children,
    size = RFValue(12),
    color = 'white',
    opacity = 1,
    fontWeight = 'normal',
    style,
    ...props
}) => {
    return (
        <Text
            style={[
                styles.text,
                {
                    fontSize: size,
                    color,
                    opacity,
                    fontWeight,
                },
                style, // Combine additional styles
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        // You can add default styles here if needed
    },
});

export default CustomText;
