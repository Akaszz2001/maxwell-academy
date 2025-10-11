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

import jsPDF from "jspdf";
import pb from "./pocketbase";

export const generatePDF = async (
  subject: string,
  topic: string,
  classs: string,
  questions: any[]
) => {
  const doc = new jsPDF();
  let y = 20;

  // --- Header Section ---
  doc.setFontSize(16);
  doc.text("Question Paper", 105, y, { align: "center" });
  y += 10;

  doc.setFontSize(12);
  doc.text(`Subject: ${subject}`, 20, y);
  doc.text(`Class: ${classs}`, 100, y);
  doc.text(`Topic: ${topic}`, 160, y);
  y += 15;

  doc.setDrawColor(0);
  doc.line(20, y, 190, y);
  y += 10;

  // --- Questions Section ---
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    // Question Text
    if (q.questionText) {
      doc.setFontSize(12);
      doc.text(`${i + 1}. ${q.questionText}`, 20, y, { maxWidth: 170 });
      y += 8;
    }

    // Image Questions
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

        doc.addImage(base64, "PNG", 25, y, 80, 60);
        y += 65;
      } catch (error) {
        console.error("Error loading image:", error);
      }
    }

    // Options
    ["optionA", "optionB", "optionC", "optionD"].forEach((opt, idx) => {
      if (q[opt]) {
        doc.text(`${String.fromCharCode(97 + idx)}) ${q[opt]}`, 30, y, {
          maxWidth: 160,
        });
        y += 7;
      }
    });

    // Answer
    if (q.answer) {
      doc.setFontSize(11);
      doc.text(`Answer: ${q.answer.toUpperCase()}`, 30, y);
      y += 12;
    }

    // Page Break
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  }

  // --- Save File ---
  const filename = `${subject}_${classs}_${topic}_questions.pdf`.replace(/\s+/g, "_");
  doc.save(filename);
};