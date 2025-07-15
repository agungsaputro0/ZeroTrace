// src/data/DummyCommunity.ts

export interface Community {
  id: string;
  name: string;
  description: string;
  members: number;
  image: string;
}

const communityData: Community[] = [
  {
    id: "green-circle",
    name: "Green Circle",
    description:
      "A growing network of eco-minded individuals making daily impact for a better planet.",
    members: 5308,
    image: "/assets/img/community-logo/green-circle.jpg",
  },
  {
    id: "plant-forward",
    name: "PlantForward",
    description:
      "A movement that turns actions into trees. Join tree-planting missions & green education.",
    members: 2931,
    image: "/assets/img/community-logo/plant-forward.png",
  },
  {
    id: "eco-steps",
    name: "Eco Steps",
    description:
      "One step at a time, one habit at a time. We’re walking toward a cleaner, greener world.",
    members: 1308,
    image: "/assets/img/community-logo/eco-steps.png",
  },
  {
    id: "clean-nation",
    name: "Clean Nation",
    description:
      "A volunteer-powered community committed to keeping cities clean and trash-free.",
    members: 750,
    image: "/assets/img/community-logo/clean-nation.jpg",
  },
  {
    id: "blue-ocean-crew",
    name: "Blue Ocean Crew",
    description:
      "Focusing on ocean cleanups and awareness of marine debris. Dive in and help protect marine life!",
    members: 1812,
    image: "/assets/img/community-logo/blue-ocean.png",
  },
  {
    id: "urban-gardeners",
    name: "Urban Gardeners",
    description:
      "Bringing greenery back to the city through rooftop gardens and community farming.",
    members: 978,
    image: "/assets/img/community-logo/urban-garedener.jpg",
  },
  {
    id: "plastic-free-society",
    name: "Plastic-Free Society",
    description:
      "Join the movement to reduce single-use plastics and promote reusable alternatives.",
    members: 2060,
    image: "/assets/img/community-logo/plastic-free.png",
  },
  {
    id: "eco-artists",
    name: "Eco Artists",
    description:
      "Artists who use recycled and natural materials to create stunning, eco-conscious art.",
    members: 690,
    image: "/assets/img/community-logo/eco-artist.jpg",
  },
  {
    id: "climate-youth",
    name: "Climate Youth",
    description:
      "Youth-led organization raising climate awareness and pushing for global climate action.",
    members: 4523,
    image: "/assets/img/community-logo/climate-youth.png",
  },
  {
    id: "zero-waste-warriors",
    name: "Zero Waste Warriors",
    description:
      "Dedicated to living a zero-waste lifestyle and educating others to do the same.",
    members: 1654,
    image: "/assets/img/community-logo/zero-waste.jpg",
  },
  {
    id: "green-tech-innovators",
    name: "Green Tech Innovators",
    description:
      "Techies and environmentalists working on sustainable technology solutions.",
    members: 1230,
    image: "/assets/img/community-logo/green-tech.jpg",
  },
  {
    id: "tree-huggers-united",
    name: "Tree Huggers United",
    description:
      "Passionate about forest conservation, reforestation, and protecting biodiversity.",
    members: 2750,
    image: "/assets/img/community-logo/tree-hugger.jpg",
  },
];

export default communityData;
