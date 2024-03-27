export async function convertFileToBase64(blob: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onerror = () => reject(fileReader.error);

    fileReader.onloadend = () => {
      const dataUrl = fileReader.result as string;
      // remove "data:mime/type;base64," prefix from data url
      const base64 = dataUrl.substring(dataUrl.indexOf(",") + 1);
      resolve(base64);
    };

    fileReader.readAsDataURL(blob);
  });
}
