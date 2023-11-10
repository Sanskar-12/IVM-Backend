import { Vendors } from "../models/vendor.js";

export const AddVendor = async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, addrs, contact,organizationStatus,panNumber ,tanNumber,gstNumber} = req.body;

    const vendor = await Vendors.create({ name, addrs, contact,organizationStatus,panNumber ,tanNumber,gstNumber});
    res.status(200).json({
      vendor
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const GetAllVendor = async (req, res, next) => {
  try {
    const vendor = await Vendors.find({});

    if (!vendor) {
      return res.status(500).json({ mesage: "Empty :(" });
    }
    res.status(200).json({ success: true, vendor });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
export const GetVendorById = async (req, res, next) => {
  try {
    const vendor = await Vendors.findById(req.params.id);
    if (!vendor) {
      return res.status(500).json({ mesage: "No vendor exists :(" });
    }
    res.status(200).json({ success: true, vendor });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
