export const downloadFile = (url: URL, fileName: string): void => {
    const a = document.createElement("a") as HTMLAnchorElement;
    a.href = url.href;
    a.download = fileName;

    document.body.append(a);
    a.click();
    a.remove();
};
