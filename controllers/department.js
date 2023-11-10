import Department from "../models/department.js";

export const addDepartment = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please Provide all fields",
      });
    }

    let department = await Department.create({
      name,
    });

    res.status(200).json({
      success: true,
      department,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const getDepartment = async (req, res, next) => {
  try {
    const department = await Department.find({});

    res.status(200).json({
      success: true,
      department,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const departmentAddLab = async (req, res, next) => {
  try {
    let department = await Department.findOne({ name: req.body.name });
    let arr = req.body.labsArray;

    if (!department) {
      department = new Department({
        name: req.body.name,
        labs: arr,
      });
    } else {
      department.labs = [...department.labs, ...arr];
    }

    await department.save();

    console.log(`Labs added to department "${req.body.name}"`);

    res
      .status(200)
      .json({ message: `Labs added to department "${req.body.name}"` });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLabBydept = async (req, res, next) => {
  try {
    const { name } = req.body;
    const dept = await Department.findOne({ name });

    res.status(200).json({
      success: true,
      labs: dept.labs,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);
    res.status(200).json({ department });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getByName = async (req, res, next) => {
  try {
    let department = await Department.find({ name: req.params.name });
    res.status(200).json({ department });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
