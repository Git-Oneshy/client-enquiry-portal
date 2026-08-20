const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
  clientName: { 
    type: String, 
    required: [true, 'Please add client name'] 
  },
  clientEmail: { 
    type: String, 
    required: [true, 'Please add client email'] 
  },
  category: { 
    type: String, 
    enum: ['Permit Design', 'Revisions', 'EPC Support', 'General Enquiry'],
    default: 'Permit Design' 
  },
  description: { 
    type: String, 
    required: [true, 'Please add description'] 
  },
  assignedTo: { 
    type: String, 
    default: 'Unassigned' 
  },
  deadline: { 
    type: Date, 
    required: [true, 'Please add target deadline'] 
  },
  status: { 
    type: String, 
    enum: ['New', 'In Progress', 'Closed'], 
    default: 'New' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', EnquirySchema);