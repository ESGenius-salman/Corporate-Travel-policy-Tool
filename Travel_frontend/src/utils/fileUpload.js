// File Upload Utility with localStorage support

export const uploadFile = async (file, category = 'general') => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file provided'));
      return;
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      reject(new Error('Invalid file type. Only PDF, JPG, and PNG files are allowed.'));
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      reject(new Error('File size exceeds 5MB limit.'));
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (e) => {
      const fileData = {
        id: Date.now().toString(),
        name: file.name,
        type: file.type,
        size: file.size,
        category: category,
        uploadDate: new Date().toISOString(),
        data: e.target.result // Base64 encoded data
      };

      // Save to localStorage
      const existingFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
      existingFiles.push(fileData);
      localStorage.setItem('uploadedFiles', JSON.stringify(existingFiles));

      resolve(fileData);
    };

    reader.onerror = (error) => {
      reject(new Error('Error reading file: ' + error));
    };

    reader.readAsDataURL(file);
  });
};

export const getUploadedFiles = (category = null) => {
  const files = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
  if (category) {
    return files.filter(file => file.category === category);
  }
  return files;
};

export const deleteFile = (fileId) => {
  const files = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');
  const updatedFiles = files.filter(file => file.id !== fileId);
  localStorage.setItem('uploadedFiles', JSON.stringify(updatedFiles));
  return { success: true };
};

export const downloadFile = (fileData) => {
  const link = document.createElement('a');
  link.href = fileData.data;
  link.download = fileData.name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

export const getFileIcon = (fileType) => {
  if (fileType === 'application/pdf') return '📄';
  if (fileType.startsWith('image/')) return '🖼️';
  return '📎';
};
