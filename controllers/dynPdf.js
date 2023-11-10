import express from 'express';
import mongoose from 'mongoose';
import pdf from 'html-pdf';
import DynPdf from '../models/dynPdf.js';
import pdfUi from './pdfUi.js';

export const createPdf=async(req,res)=>{
    const pdfOptions = { format: 'Letter' }; // Adjust the format as needed

    // Create the PDF
    pdf.create(pdfUi(req.body), pdfOptions).toBuffer((err, buffer) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error creating PDF');
      } else {
        // Save the PDF to the database
        const pdf = new DynPdf({ pdfData: buffer });
  // console.log(pdf);
  
        pdf.save()
          .then(() => {
  
            res.status(200).json({pdf, message: 'PDF created and saved to the database' });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Error saving PDF to the database' });
          });
      }
    });  
}
export const getPdf=async(req,res)=>{
    const pdfId = req.params.id;
console.log(pdfId);
DynPdf.findById(pdfId)
    .exec()
    .then((pdf) => {
      if (!pdf) {
        return res.status(404).json({ message: 'PDF not found' });
      }

      res.contentType('application/pdf');
      res.send(pdf.pdfData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Error reading PDF from the database' });
    });
}
