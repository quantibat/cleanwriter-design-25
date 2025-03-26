
/**
 * PDF Generation Utility
 * Uses jsPDF & html2canvas to generate PDF documents from content
 */
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface ContentItem {
  topicId: string;
  subject: string;
  body: string;
}

/**
 * Generate a PDF with the given title and content items
 */
export const generatePDF = async (title: string, contentItems: ContentItem[]): Promise<void> => {
  // Create a new PDF document
  const doc = new jsPDF('p', 'mm', 'a4');
  let yPos = 20;
  
  // Add title
  doc.setFontSize(20);
  doc.setTextColor(0, 0, 139); // Dark blue color for title
  doc.text(title, 20, yPos);
  yPos += 10;
  
  doc.setDrawColor(0, 0, 139);
  doc.line(20, yPos, 190, yPos);
  yPos += 10;
  
  // Add each content item
  for (let i = 0; i < contentItems.length; i++) {
    const item = contentItems[i];
    
    // Add subject
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(item.subject, 20, yPos);
    yPos += 10;
    
    // Add body - split into paragraphs
    doc.setFontSize(12);
    doc.setTextColor(80, 80, 80);
    
    const paragraphs = item.body.split('\n\n');
    for (const paragraph of paragraphs) {
      // Split long paragraphs to fit page width
      const textLines = doc.splitTextToSize(paragraph, 170);
      
      // Check if we need a new page
      if (yPos + (textLines.length * 6) > 280) {
        doc.addPage();
        yPos = 20;
      }
      
      // Add the lines
      doc.text(textLines, 20, yPos);
      yPos += (textLines.length * 6) + 4;
    }
    
    // Add a separator between content items
    if (i < contentItems.length - 1) {
      doc.setDrawColor(200, 200, 200);
      doc.line(20, yPos, 190, yPos);
      yPos += 10;
      
      // Check if we need a new page
      if (yPos > 280) {
        doc.addPage();
        yPos = 20;
      }
    }
  }
  
  // Save the PDF
  doc.save(`${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
};

/**
 * Generate a PDF by rendering HTML content
 * This is useful when we want to preserve the exact formatting from the UI
 */
export const generatePDFFromHTML = async (title: string, contentElement: HTMLElement): Promise<void> => {
  try {
    // Render the HTML to a canvas
    const canvas = await html2canvas(contentElement, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false
    });
    
    // Get the canvas dimensions
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
    
    // Create PDF with correct dimensions
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add new pages if content overflows
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    // Save the PDF
    doc.save(`${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
