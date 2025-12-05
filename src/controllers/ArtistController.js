import * as artistService from "../services/ArtistService.js";

export const addArtist = async (req, res) => {
  try {
    const artist = await artistService.createArtist(req.body);
    res.status(201).json({ success: true, artist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getArtists = async (req, res) => {
  try {
    const artists = await artistService.getAllArtists();
    res.json({ success: true, artists });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getArtist = async (req, res) => {
  try {
    const artist = await artistService.getArtistById(req.params.id);
    res.json({ success: true, artist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateArtist = async (req, res) => {
  try {
    const artist = await artistService.updateArtist(req.params.id, req.body);
    res.json({ success: true, artist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteArtist = async (req, res) => {
  try {
    await artistService.deleteArtist(req.params.id);
    res.json({ success: true, message: "Artist deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const artist = await artistService.changeArtistStatus(
      req.params.id,
      req.body.status
    );
    res.json({ success: true, artist });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
