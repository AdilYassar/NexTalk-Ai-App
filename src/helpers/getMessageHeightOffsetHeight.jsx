const getMessageHeightOffset = (heightOfMessageBox, windowHeight) => {
    // Ensure inputs are valid numbers
    if (typeof heightOfMessageBox !== 'number' || typeof windowHeight !== 'number') {
        console.warn('Invalid input: heightOfMessageBox and windowHeight should be numbers.');
        return 0;
    }

    const maxHeightOfMessageBox = windowHeight * 0.18; // 18% of the window height

    // If the message box height exceeds the maximum allowed height
    if (heightOfMessageBox > maxHeightOfMessageBox) {
        return maxHeightOfMessageBox - windowHeight * 0.05; // Adjust by 5% of window height
    }

    // If the message box height is greater than 24 pixels
    if (heightOfMessageBox > 24) {
        return heightOfMessageBox - windowHeight * 0.035; // Adjust by 3.5% of window height
    }

    // Default case, no offset needed
    return 0;
};

export default getMessageHeightOffset;
