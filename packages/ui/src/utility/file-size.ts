export const formatFileSize = (fileSize: number): string => {
  if (fileSize > 1099511627776) {
    return `${(fileSize / 1099511627776).toFixed(2)} TB`;
  } else if (fileSize > 1073741824) {
    return `${(fileSize / 1073741824).toFixed(2)} GB`;
  } else if (fileSize > 1048576) {
    return `${(fileSize / 1048576).toFixed(2)} MB`;
  } else if (fileSize > 1024) {
    return `${(fileSize / 1024).toFixed(2)} KB`;
  } else {
    return `${fileSize} bytes`;
  }
};
