import mongoose from 'mongoose';

const dynPdfSchema = new mongoose.Schema({
  pdfData: Buffer, // Use Buffer to store binary data
  title: String,
});

const DynPdf = mongoose.model('DynPdf', dynPdfSchema);

export default DynPdf; 