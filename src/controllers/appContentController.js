import * as appContentService from "../services/appContentService.js";

// POST → Create
export const createContent = async (req, res) => {
  const { type, language, role, content } = req.body;
  try {
    const newContent = await appContentService.upsertContent({
      type,
      language,
      role,
      content,
    });
    res.status(200).json({ success: true, data: newContent });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PUT → Update
export const updateContent = async (req, res) => {
  const { type, language, role, content } = req.body;
  try {
    const updatedContent = await appContentService.upsertContent({
      type,
      language,
      role,
      content,
    });
    res.status(200).json({ success: true, data: updatedContent });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE
export const deleteContent = async (req, res) => {
  const { type, language, role } = req.body;
  try {
    const deleted = await appContentService.deleteContent({
      type,
      language,
      role,
    });
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Content not found" });
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET → role-based
export const getContent = async (req, res) => {
  const { type, language } = req.query;
  const role = req.headers["x-role"]; // staff/customer app se
  if (!role)
    return res
      .status(400)
      .json({ success: false, message: "Role header missing" });

  try {
    const data = await appContentService.getContentByRoleLang({
      type,
      language,
      role,
    });
    if (!data)
      return res
        .status(404)
        .json({ success: false, message: "Content not found" });
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
