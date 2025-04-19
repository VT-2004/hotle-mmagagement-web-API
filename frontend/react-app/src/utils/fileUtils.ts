/**
 * Utility functions for file operations
 */

/**
 * Saves user registration data to a text file
 * @param userData User registration data
 * @returns Promise that resolves when the file is saved
 */
export const saveUserToFile = async (userData: { name: string; email: string; password: string }): Promise<void> => {
  try {
    // Format the user data as a string
    const userDataString = `
User Registration Data:
Name: ${userData.name}
Email: ${userData.email}
Password: ${userData.password}
Registration Date: ${new Date().toISOString()}
----------------------------------------
`;

    // Create a Blob with the user data
    const blob = new Blob([userDataString], { type: 'text/plain' });
    
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `user_registration_${userData.email.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    
    // Append to the document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
    
    console.log('User registration data saved to file');
  } catch (error) {
    console.error('Error saving user data to file:', error);
    throw error;
  }
};

/**
 * Reads user data from a text file
 * @param file The file to read
 * @returns Promise that resolves with the parsed user data
 */
export const readUserFromFile = (file: File): Promise<{ name: string; email: string; password: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        
        // Parse the content to extract user data
        const nameMatch = content.match(/Name: (.*)/);
        const emailMatch = content.match(/Email: (.*)/);
        const passwordMatch = content.match(/Password: (.*)/);
        
        if (nameMatch && emailMatch && passwordMatch) {
          resolve({
            name: nameMatch[1].trim(),
            email: emailMatch[1].trim(),
            password: passwordMatch[1].trim()
          });
        } else {
          reject(new Error('Invalid file format'));
        }
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    
    reader.readAsText(file);
  });
}; 