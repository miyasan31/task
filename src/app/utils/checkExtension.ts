export const checkExtension = (filename: File['name']): string => {
  const pos = filename.lastIndexOf('.');
  if (pos === -1) {
    return '';
  }
  return filename.slice(pos + 1);
};
