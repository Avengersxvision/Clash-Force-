export default async function handler(req, res) {
  const { tag } = req.query;

  if (!tag) {
    return res.status(400).json({ error: "Missing player tag" });
  }

  try {
    const encodedTag = encodeURIComponent(tag);

    const response = await fetch(
      `https://api.clashofclans.com/v1/players/${encodedTag}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.COC_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Player not found" });
    }

    const data = await response.json();

    return res.status(200).json({
      name: data.name,
      townHall: data.townHallLevel,
      trophies: data.trophies,
      heroes: data.heroes
    });

  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}
