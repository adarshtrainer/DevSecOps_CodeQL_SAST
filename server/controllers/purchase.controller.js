import Purchase from "../models/purchase.model.js";

export const verifyPurchase = async (req, res) => {
  const { userId, projectId } = req.body;
  const purchase = await Purchase.findOne({ userId, projectId, status: "paid" });

  if (!purchase) return res.status(403).json({ msg: "Not purchased" });

  res.json({ access: true });
};

// New function to get all purchased projects for a user
// Get all purchased projects for a user
export const getUserPurchases = async (req, res) => {
  const { userId } = req.body;

  try {
    const purchases = await Purchase.find({ userId, status: "paid" });
    const purchasedProjectIds = purchases.map(p => p.projectId);
    
    // Convert to object for easy frontend lookup
    const purchasedMap = {};
    purchasedProjectIds.forEach(id => purchasedMap[id] = true);

    res.json(purchasedMap); // { projectId1: true, projectId2: true }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


