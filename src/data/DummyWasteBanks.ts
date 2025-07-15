export interface WasteBank {
  id: string;
  name: string;
  address: string;
  distance: string;
  time: string;
  binFull: string;
  image: string;
  pickupAvailable: boolean;
  pickupMechanism?: string[]; // ["Door-to-Door", "Meeting Point"]
  openHours: string;
  contact: string;
  description: string;
  acceptedWasteTypes: string[];
}

const dummyWasteBanks: WasteBank[] = [
  {
    id: "WB001",
    name: "Sustainable Corner – BINUS Anggrek",
    address: "Jl. Kebon Jeruk Raya No. 27, Jakarta Barat",
    distance: "210m",
    time: "3min",
    binFull: "30%",
    image: "/assets/img/bank-sampah-1.jpg",
    pickupAvailable: true,
    pickupMechanism: ["Meeting Point", "Door-to-Door"],
    openHours: "08:00 - 17:00",
    contact: "+62 812 3456 7890",
    description:
      "Salah satu titik pengumpulan sampah daur ulang di area kampus BINUS.",
    acceptedWasteTypes: ["Plastic", "Metal", "Paper"],
  },
  {
    id: "WB002",
    name: "Rebin Station – GoTo HQ",
    address: "Parking Area B1, Pasaraya Blok M, Jakarta Selatan",
    distance: "100m",
    time: "2min",
    binFull: "56%",
    image: "/assets/img/bank-sampah-2.jpg",
    pickupAvailable: false,
    openHours: "09:00 - 18:00",
    contact: "+62 813 1122 3344",
    description:
      "Stasiun Rebin yang terintegrasi dengan ekosistem GoTo.",
    acceptedWasteTypes: ["Organic", "Plastic", "E-Waste"],
  },
  {
    id: "WB003",
    name: "ReWaste Bin – Central Park Avenue",
    address: "LG Floor, Near Carrefour escalator",
    distance: "210m",
    time: "3min",
    binFull: "80%",
    image: "/assets/img/bank-sampah-3.jpg",
    pickupAvailable: true,
    pickupMechanism: ["Meeting Point"],
    openHours: "10:00 - 22:00",
    contact: "+62 811 9988 7766",
    description:
      "Titik pembuangan terpopuler di Central Park.",
    acceptedWasteTypes: ["Plastic", "Metal"],
  },
  {
    id: "WB004",
    name: "Office Waste Hub – BCA Tower",
    address: "LG Floor, Jl. M.H. Thamrin No.1, Jakarta Pusat",
    distance: "210m",
    time: "3min",
    binFull: "21%",
    image: "/assets/img/bank-sampah-4.jpg",
    pickupAvailable: false,
    openHours: "08:00 - 16:00",
    contact: "+62 822 3333 4444",
    description:
      "Waste Hub eksklusif di gedung perkantoran BCA.",
    acceptedWasteTypes: ["Plastic", "Glass", "Paper"],
  },
];

export default dummyWasteBanks;
