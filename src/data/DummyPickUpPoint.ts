type PickupPoint = {
  id: string;
  location: string;
  date: string; // format: YYYY-MM-DD
  dateReadable: string; // readable version, e.g. "Selasa, 15 Juli 2025"
  time: string; // format: HH:mm WIB
};

// Helper untuk mengubah YYYY-MM-DD jadi "Hari, DD Bulan YYYY"
const getReadableDate = (dateStr: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return new Date(dateStr).toLocaleDateString("id-ID", options);
};

const pickupPoints: PickupPoint[] = [
  {
    id: "MP001",
    location: "Balai RW 01",
    date: "2025-07-15",
    dateReadable: getReadableDate("2025-07-15"),
    time: "08:00–08:30 WIB",
  },
  {
    id: "MP002",
    location: "Lapangan RW 02",
    date: "2025-07-15",
    dateReadable: getReadableDate("2025-07-15"),
    time: "08:30–09:00 WIB",
  },
  {
    id: "MP003",
    location: "Posyandu RW 03",
    date: "2025-07-15",
    dateReadable: getReadableDate("2025-07-15"),
    time: "09:00–09:30 WIB",
  },
  {
    id: "MP004",
    location: "Pos Ronda RW 04",
    date: "2025-07-15",
    dateReadable: getReadableDate("2025-07-15"),
    time: "09:30–10:00 WIB",
  },
  {
    id: "MP005",
    location: "Taman RW 05",
    date: "2025-07-15",
    dateReadable: getReadableDate("2025-07-15"),
    time: "10:00–10:30 WIB",
  },
  {
    id: "MP006",
    location: "Masjid RW 06",
    date: "2025-07-15",
    dateReadable: getReadableDate("2025-07-15"),
    time: "10:30–11:00 WIB",
  },
  {
    id: "MP007",
    location: "SD RW 07",
    date: "2025-07-15",
    dateReadable: getReadableDate("2025-07-15"),
    time: "11:00–11:30 WIB",
  },
  {
    id: "MP008",
    location: "Puskesmas Pembantu RW 08",
    date: "2025-07-15",
    dateReadable: getReadableDate("2025-07-15"),
    time: "11:30–12:00 WIB",
  },
  {
    id: "MP009",
    location: "Gedung Serbaguna RW 09",
    date: "2025-07-15",
    dateReadable: getReadableDate("2025-07-15"),
    time: "12:00–12:30 WIB",
  },
  {
    id: "MP010",
    location: "Perpustakaan RW 10",
    date: "2025-07-15",
    dateReadable: getReadableDate("2025-07-15"),
    time: "12:30–13:00 WIB",
  }
];


export default pickupPoints;
