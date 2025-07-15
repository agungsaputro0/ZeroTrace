export interface DumpReport {
  id: string;
  title: string;
  location: string;
  timestamp: string;
  images: string[];
  status: string;
  distance: string;
  description: string; // ✅ tambahkan di interface
}

const dummyDumpReports: DumpReport[] = [
  {
    id: "1",
    title: "Construction Dumping",
    location: "Jl. Pembangunan VI, Tanah Abang",
    timestamp: "12 July 2025 - 5.50 PM",
    images: ["/assets/img/report-1-1.jpeg", "/assets/img/report-1-2.jpg"],
    status: "Urgent",
    distance: "300m",
    description:
      "A large amount of construction waste has been dumped illegally near the roadside, including concrete rubble and broken tiles.",
  },
  {
    id: "2",
    title: "Rotting Organic Waste",
    location: "Taman Kota 2 BSD, Area Tengah",
    timestamp: "13 July 2025 - 8.05 AM",
    images: ["/assets/img/report-2.jpg"],
    status: "Report - Waiting Volunteer",
    distance: "200m",
    description:
      "Organic waste like food leftovers and leaves are left to rot in the park, emitting a foul odor and attracting flies.",
  },
  {
    id: "3",
    title: "E-Waste Found (TV)",
    location: "Jl. Kemanggisan Raya Blok B4 No. 16",
    timestamp: "09 July 2025 - 2.20 PM",
    images: ["/assets/img/report-3.jpeg"],
    status: "Needs Special Handling",
    distance: "250m",
    description:
      "An old television and other electronics have been discarded improperly and require special disposal methods.",
  },
  {
    id: "4",
    title: "Mixed Trash Pile",
    location: "Jl. Danau Sunter, Jakarta Utara",
    timestamp: "05 July 2025 - 4.00 PM",
    images: ["/assets/img/report-4-1.png", "/assets/img/report-4-2.jpg"],
    status: "Pending Clean Up",
    distance: "500m",
    description:
      "A pile of mixed trash including plastics, food wrappers, and household waste is blocking the sidewalk and causing unpleasant views.",
  },
];

export default dummyDumpReports;
