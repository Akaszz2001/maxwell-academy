/* eslint-disable @typescript-eslint/no-explicit-any */
// // utils/pdfGenerator.ts
// import jsPDF from "jspdf";
// import pb from "./pocketbase";

// export const generatePDF = async (subject: string, questions: any[]) => {

//     console.log(questions);
    
//   const doc = new jsPDF();
//   let y = 20;

//   doc.setFontSize(18);
//   doc.text(`Subject: ${subject}`, 10, y);
//   y += 15;

//   for (let i = 0; i < questions.length; i++) {
//     const q = questions[i];

//     // Add question text
//     if (q.type === "text" && q.questionText) {
//       doc.setFontSize(12);
//       doc.text(`${i + 1}. ${q.questionText}`, 10, y);
//       y += 10;
//     }

//     // Add image question
//     if (q.type === "image" && q.image) {
//       const imgUrl = pb.files.getURL(q, q.image);
//       const img = await fetch(imgUrl).then(res => res.blob()).then(blob => createImageBitmap(blob));

//       const canvas = document.createElement("canvas");
//       const ctx = canvas.getContext("2d");
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx?.drawImage(img, 0, 0);

//       const imgData = canvas.toDataURL("image/png");
//       doc.addImage(imgData, "PNG", 10, y, 80, 60);
//       y += 70;
//     }

//     // Add options
//     ["optionA", "optionB", "optionC", "optionD"].forEach((opt, idx) => {
//       if (q[opt]) {
//         doc.text(`${String.fromCharCode(97 + idx)}) ${q[opt]}`, 20, y);
//         y += 7;
//       }
//     });

//     // Add answer
//     if (q.answer) {p
//       doc.text(`Answer: ${q.answer}`, 20, y);
//       y += 12;
//     }

//     // Page break if needed
//     if (y > 270) {
//       doc.addPage();
//       y = 20;
//     }
//   }

//   doc.save(`${subject}_questions.pdf`);
// };
// utils/pdfGenerator.ts



// import jsPDF from "jspdf";
// import pb from "./pocketbase";

// export const generatePDF = async (
//   subject: string,
//   topic: string,
//   classs: string,
//   questions: any[]
// ) => {
//   const doc = new jsPDF();
//   let y = 20;

//   // --- Header Section ---
//   doc.setFontSize(16);
//   doc.text("Question Paper", 105, y, { align: "center" });
//   y += 10;

//   doc.setFontSize(12);
//   doc.text(`Subject: ${subject}`, 20, y);
//   doc.text(`Class: ${classs}`, 100, y);
//   doc.text(`Topic: ${topic}`, 160, y);
//   y += 15;

//   doc.setDrawColor(0);
//   doc.line(20, y, 190, y);
//   y += 10;

//   // --- Questions Section ---
//   for (let i = 0; i < questions.length; i++) {
//     const q = questions[i];

//     // Question Text
//     if (q.questionText) {
//       doc.setFontSize(12);
//       doc.text(`${i + 1}. ${q.questionText}`, 20, y, { maxWidth: 170 });
//       y += 8;
//     }

//     // Image Questions
//     if (q.type === "image" && q.image) {
//       try {
//         const imgUrl = q.image.startsWith("http")
//           ? q.image
//           : pb.files.getURL(q, q.image);

//         const response = await fetch(imgUrl);
//         const blob = await response.blob();

//         const base64 = await new Promise<string>((resolve, reject) => {
//           const reader = new FileReader();
//           reader.onloadend = () => resolve(reader.result as string);
//           reader.onerror = reject;
//           reader.readAsDataURL(blob);
//         });

//         doc.addImage(base64, "PNG", 25, y, 80, 60);
//         y += 65;
//       } catch (error) {
//         console.error("Error loading image:", error);
//       }
//     }

//     // Options
//     ["optionA", "optionB", "optionC", "optionD"].forEach((opt, idx) => {
//       if (q[opt]) {
//         doc.text(`${String.fromCharCode(97 + idx)}) ${q[opt]}`, 30, y, {
//           maxWidth: 160,
//         });
//         y += 7;
//       }
//     });

//     // Answer
//     if (q.answer) {
//       doc.setFontSize(11);
//       doc.text(`Answer: ${q.answer.toUpperCase()}`, 30, y);
//       y += 12;
//     }

//     // Page Break
//     if (y > 270) {
//       doc.addPage();
//       y = 20;
//     }
//   }

//   // --- Save File ---
//   const filename = `${subject}_${classs}_${topic}_questions.pdf`.replace(/\s+/g, "_");
//   doc.save(filename);
// };



import jsPDF from "jspdf";
import pb from "./pocketbase";

export const generatePDF = async (
  subject: string,
  topic: string,
  classs: string,
  questions: any[]
) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = 20;
  const leftMargin = 20;
  const rightMargin = 190;
  const lineHeight = 6;

  // --- Header Section ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Question Paper", 105, y, { align: "center" });
  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.text(`Subject: ${subject}`, leftMargin, y);
  doc.text(`Class: ${classs}`, 100, y);
  doc.text(`Topic: ${topic}`, 160, y, { align: "right" });
  y += 8;

  doc.setDrawColor(100);
  doc.line(leftMargin, y, rightMargin, y);
  y += 10;

  // --- Questions Section ---
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`${i + 1}.`, leftMargin, y);
    doc.setFont("helvetica", "normal");

    const textX = leftMargin + 8;
    const textWidth = 170;
    const splitText = doc.splitTextToSize(q.questionText || "", textWidth);
    doc.text(splitText, textX, y);
    y += splitText.length * lineHeight + 3;

    // --- Image Question ---
    if (q.type === "image" && q.image) {
  try {
    const imgUrl = q.image.startsWith("http")
      ? q.image
      : pb.files.getURL(q, q.image);
    const response = await fetch(imgUrl);
    const blob = await response.blob();

    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

    const maxWidth = 120; // max width in mm
    const maxHeight = 90; // max height in mm

    // Create temporary image to get natural dimensions
    const img = new Image();
    img.src = base64;
    await new Promise((res) => (img.onload = res));

    let imgWidth = img.width;
    let imgHeight = img.height;

    // Scale while maintaining aspect ratio
    const widthRatio = maxWidth / imgWidth;
    const heightRatio = maxHeight / imgHeight;
    const scale = Math.min(widthRatio, heightRatio);

    imgWidth = imgWidth * scale;
    imgHeight = imgHeight * scale;

    const imgX = 30;
    const imgY = y;

    // Draw border
    doc.setDrawColor(50);
    doc.setLineWidth(0.6);
    doc.rect(imgX - 2, imgY - 2, imgWidth + 4, imgHeight + 4);

    // Add image
    doc.addImage(base64, "PNG", imgX, imgY, imgWidth, imgHeight);

    y += imgHeight + 8;
  } catch (error) {
    console.error("Error loading image:", error);
  }
}

    // --- Options Section ---
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    const options = ["optionA", "optionB", "optionC", "optionD"];
    options.forEach((opt, idx) => {
      if (q[opt]) {
        const optText = `${String.fromCharCode(97 + idx)}) ${q[opt]}`;
        const wrapped = doc.splitTextToSize(optText, 160);
        doc.text(wrapped, textX + 5, y);
        y += wrapped.length * lineHeight;
      }
    });

    // --- Answer Section ---
    if (q.answer) {
      y += 2;
      doc.setFont("helvetica", "italic");
      doc.setFontSize(11);
      doc.text(`Answer: ${q.answer.toUpperCase()}`, textX, y);
      doc.setFont("helvetica", "normal");
      y += 8;
    }

    // --- Spacing Between Questions ---
    y += 2;
    doc.setDrawColor(200);
    doc.line(leftMargin, y, rightMargin, y);
    y += 6;

    // --- Page Break ---
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  }

  // --- Footer ---
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text("Generated by Pocketbase Exam System", 105, 290, { align: "center" });

  // --- Save File ---
  const filename = `${subject}_${classs}_${topic}_questions.pdf`.replace(/\s+/g, "_");
  doc.save(filename);
};
