export const addSignaturesSection = ({ pdf, companyInfo, contractorInfo }) => {
  const bottomY = pdf.internal.pageSize.getHeight() - 15;

  const lineLength = 70;

  pdf.setFont("Roboto-Regular", "normal");
  pdf.setFontSize(6.5);

  const leftX = 10;
  const leftCenterX = leftX + lineLength / 2;

  pdf.line(leftX, bottomY, leftX + lineLength, bottomY);

  pdf.text(
    companyInfo.name,
    leftCenterX - pdf.getTextWidth(companyInfo.name) / 2,
    bottomY + 5,
  );

  const rightX = pdf.internal.pageSize.getWidth() - 10 - lineLength;

  const rightCenterX = rightX + lineLength / 2;

  pdf.line(rightX, bottomY, rightX + lineLength, bottomY);

  pdf.text(
    contractorInfo.name,
    rightCenterX - pdf.getTextWidth(contractorInfo.name) / 2,
    bottomY + 5,
  );
};
