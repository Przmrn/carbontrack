// Tableau Public embed configuration. The owner supplies the real URLs and caption.
export interface TableauConfig {
  src: string;
  openUrl: string;
  previewImage: string;
  heightDesktop: number;
  caption: {
    author: string;
    dataSource: string;
    updated: string;
  };
}

export const tableau: TableauConfig = {
  // TODO(owner): paste the Tableau Public Share URL here. No URL is invented.
  src: "",
  // TODO(owner): paste the public Tableau view URL here for the open-in-new-tab link.
  openUrl: "",
  previewImage: "/dhl/tableau-preview.png",
  heightDesktop: 720,
  caption: {
    // TODO(owner): fill these three fields from the Tableau Public workbook.
    author: "",
    dataSource: "",
    updated: "",
  },
};
