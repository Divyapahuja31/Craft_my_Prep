import * as service from "./profile.service.js";

export async function updateProfile(req, res) {
  try {
    const result = await service.updateProfile(req.user.id, req.body);
    if (result.error) return res.status(400).json({ error: result.error });
    res.json({ message: "Profile updated", user: result.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function deleteProfile(req, res) {
  try {
    const result = await service.deleteProfile(req.user.id);
    if (result.error) return res.status(400).json({ error: result.error });
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
