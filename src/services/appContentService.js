import AppContent from "../models/appContentModel.js";

// CREATE / UPDATE
export const upsertContent = async ({ type, language, role, content }) => {
  return await AppContent.findOneAndUpdate(
    { type, language, role },
    { content },
    { upsert: true, new: true }
  );
};

// DELETE
export const deleteContent = async ({ type, language, role }) => {
  return await AppContent.findOneAndDelete({ type, language, role });
};

// GET → role-based
export const getContentByRoleLang = async ({ type, language, role }) => {
  return await AppContent.findOne({ type, language, role });
};
