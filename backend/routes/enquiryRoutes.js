const express = require('express');
const router = express.Router();
const { getEnquiries, createEnquiry, updateEnquiry, deleteEnquiry } = require('../controllers/enquiryController');
const { protect, authorize } = require('../middleware/authMiddleware');

// View enquiries: Open to all logged-in roles (Viewer, Designer, Admin)
router.get('/', protect, getEnquiries);

// Create enquiry: Only Designers and Admins
router.post('/', protect, authorize('Designer', 'Admin'), createEnquiry);

// Update status/details: Only Designers and Admins
router.put('/:id', protect, authorize('Designer', 'Admin'), updateEnquiry);

// Delete record: Restricted to Admins only
router.delete('/:id', protect, authorize('Admin'), deleteEnquiry);

module.exports = router;