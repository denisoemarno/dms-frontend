export const sampleDoc = {
  sections: [
    {
      blocks: [
        {
          characterFormat: { bold: true, boldBidi: true },
          paragraphFormat: { styleName: 'Normal' },
          inlines: [
            {
              text: 'GettingStarted',
              characterFormat: { bold: true, boldBidi: true },
            },
          ],
        },
      ],
      headersFooters: {},
      sectionFormat: {
        headerDistance: 35.400001525878906,
        footerDistance: 35.400001525878906,
        pageWidth: 595,
        pageHeight: 842,
        leftMargin: 72,
        rightMargin: 72,
        topMargin: 72,
        bottomMargin: 72,
        differentFirstPage: false,
        differentOddAndEvenPages: false,
        bidi: false,
        restartPageNumbering: false,
        pageStartingNumber: 0,
      },
    },
  ],
  characterFormat: {
    fontSize: 12,
    fontFamily: 'Calibri',
    fontSizeBidi: 12,
    fontFamilyBidi: 'Arial',
  },
  background: { color: '#FFFFFFFF' },
  styles: [
    { type: 'Paragraph', name: 'Normal', next: 'Normal' },
    { type: 'Character', name: 'Default Paragraph Font' },
  ],
  defaultTabWidth: 36,
  formatting: false,
  trackChanges: false,
  protectionType: 'NoProtection',
  enforcement: false,
  dontUseHTMLParagraphAutoSpacing: false,
};
