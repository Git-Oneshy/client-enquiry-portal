const Enquiry = require('../models/Enquiry');

// @desc    Get all enquiries with search & filter
// @route   GET /api/enquiries
// @access  Private (All authenticated users)
exports.getEnquiries = async (req, res) => {
  try {
    const { search, status } = req.query;
    let query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { clientName: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { assignedTo: { $regex: search, $options: 'i' } }
      ];
    }

    const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// @desc    Create new enquiry
// @route   POST /api/enquiries
// @access  Private (Designer, Admin)
exports.createEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json({ success: true, data: enquiry });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update enquiry details or status
// @route   PUT /api/enquiries/:id
// @access  Private (Designer, Admin)
exports.updateEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!enquiry) {
      return res.status(404).json({ success: false, error: 'Enquiry not found' });
    }

    res.json({ success: true, data: enquiry });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private (Admin only)
exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ success: false, error: 'Enquiry not found' });
    }

    res.json({ success: true, message: 'Enquiry record removed' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};