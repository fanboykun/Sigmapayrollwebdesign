import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { MapPin, Users, Maximize, FileText, Tractor, Package, Shield, Home, Droplets, Globe, Building, Edit2, Save, X } from 'lucide-react';

interface ActivityData {
  no: number;
  estate: string;
  category: string;
  activitiesName: string;
  farmerGroup: string;
  village: string;
  numberOfFarmer: number;
  amountOfContribution: number;
  uom: string;
  date: string;
}

export default function EngagementDashboard() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [activeEstate, setActiveEstate] = useState('Aek Loba');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editTab, setEditTab] = useState('profil');
  const [editFormData, setEditFormData] = useState<any>({});

  const estates = [
    'Aek Loba',
    'Aek Pamienke',
    'Negeri Lama',
    'Tanah Gambus',
    'Bangun Bandar',
    'Mata Pao',
    'Tanah Besih',
    'Sei Liput',
    'Seunagan',
    'Seumanyam',
    'Lae Butar'
  ];

  // Data untuk setiap tahun dan estate
  const yearlyData: Record<number, Record<string, any>> = {
    2024: {
      'Aek Loba': {
        partnershipProfile: {
          jumlahPetani: 920,
          totalLuas: 1685.50,
          jumlahDesa: 18,
          kesesuaianTani: 14,
          kesesuaianValue: 'kelompok'
        },
        trainingData: { jumlahPetani: 305, jamPelatihan: 465 },
        fertilizerData: { jumlahPetani: 25, totalKontribusi: 460, luasAplikasi: 17 },
        solidWasteData: { jumlahPetani: 26, totalKontribusi: 470, luasAplikasi: 17 },
        spplData: { jumlahPetani: 310, totalLuas: 9 },
        apdData: { jumlahPetani: 17, totalKontribusi: 17 },
        shmData: { jumlahPetani: 310, totalLuas: 9 },
        drainageData: { jumlahPetani: 305, luasRawat: 475, jumlahDesa: 9 },
        bridgeData: { jumlahPetani: 305, jumlahKontribusi: 470, jumlahDesa: 9 },
        mediaLinks: [
          { no: 1, link: 'https://www.suaramerdeka.id/sumut/pt-socfindo-aek-loba-bantu-petani-lokal-2024/' },
          { no: 2, link: 'https://www.beritasumut.com/asahan/aek-loba-tingkatkan-produktivitas-petani-2024/' }
        ],
        activitiesData: [
          { no: 1, estate: 'Aek Loba', category: 'Pelatihan Best Management Practice', activitiesName: 'Panen', farmerGroup: 'Kelompok Tani Baru', village: 'Desa Negara', numberOfFarmer: 24, amountOfContribution: 2, uom: 'jam', date: '12 Jan 2024' },
          { no: 2, estate: 'Aek Loba', category: 'Pelatihan Best Management Practice', activitiesName: 'Pemupukan', farmerGroup: 'Kelompok Tani Mandiri', village: 'Lobu Jur', numberOfFarmer: 18, amountOfContribution: 2, uom: 'jam', date: '15 Feb 2024' },
          { no: 3, estate: 'Aek Loba', category: 'Pelatihan Best Management Practice', activitiesName: 'Penyemprotan', farmerGroup: 'Kelompok Tani Longgur', village: 'Desa Pulau Rakyat', numberOfFarmer: 26, amountOfContribution: 2, uom: 'jam', date: '20 Feb 2024' }
        ]
      },
      'Aek Pamienke': {
        partnershipProfile: {
          jumlahPetani: 720,
          totalLuas: 1380.40,
          jumlahDesa: 13,
          kesesuaianTani: 10,
          kesesuaianValue: 'kelompok'
        },
        trainingData: { jumlahPetani: 245, jamPelatihan: 360 },
        fertilizerData: { jumlahPetani: 38, totalKontribusi: 575, luasAplikasi: 21 },
        solidWasteData: { jumlahPetani: 32, totalKontribusi: 500, luasAplikasi: 19 },
        spplData: { jumlahPetani: 250, totalLuas: 10 },
        apdData: { jumlahPetani: 24, totalKontribusi: 24 },
        shmData: { jumlahPetani: 255, totalLuas: 11 },
        drainageData: { jumlahPetani: 240, luasRawat: 405, jumlahDesa: 7 },
        bridgeData: { jumlahPetani: 245, jumlahKontribusi: 410, jumlahDesa: 8 },
        mediaLinks: [
          { no: 1, link: 'https://sumut.antaranews.com/berita/socfindo-aek-pamienke-program-2024' }
        ],
        activitiesData: [
          { no: 1, estate: 'Aek Pamienke', category: 'Pelatihan Best Management Practice', activitiesName: 'Pemeliharaan Tanaman', farmerGroup: 'Kelompok Tani Sejahtera', village: 'Desa Pamienke', numberOfFarmer: 30, amountOfContribution: 2, uom: 'jam', date: '14 Jan 2024' },
          { no: 2, estate: 'Aek Pamienke', category: 'Pupuk Kimia/Pestisida', activitiesName: 'Aplikasi Pupuk', farmerGroup: 'Kelompok Tani Maju', village: 'Desa Suka Makmur', numberOfFarmer: 22, amountOfContribution: 130, uom: 'kg', date: '18 Feb 2024' }
        ]
      },
      'Negeri Lama': {
        partnershipProfile: {
          jumlahPetani: 835,
          totalLuas: 1520.65,
          jumlahDesa: 16,
          kesesuaianTani: 12,
          kesesuaianValue: 'kelompok'
        },
        trainingData: { jumlahPetani: 275, jamPelatihan: 420 },
        fertilizerData: { jumlahPetani: 44, totalKontribusi: 615, luasAplikasi: 24 },
        solidWasteData: { jumlahPetani: 35, totalKontribusi: 525, luasAplikasi: 21 },
        spplData: { jumlahPetani: 280, totalLuas: 12 },
        apdData: { jumlahPetani: 27, totalKontribusi: 27 },
        shmData: { jumlahPetani: 285, totalLuas: 13 },
        drainageData: { jumlahPetani: 270, luasRawat: 430, jumlahDesa: 10 },
        bridgeData: { jumlahPetani: 275, jumlahKontribusi: 435, jumlahDesa: 10 },
        mediaLinks: [
          { no: 1, link: 'https://sumutpos.co/socfindo-negeri-lama-kemitraan-2024' }
        ],
        activitiesData: [
          { no: 1, estate: 'Negeri Lama', category: 'Pelatihan Best Management Practice', activitiesName: 'Teknik Panen Tepat', farmerGroup: 'Kelompok Tani Harapan', village: 'Desa Negeri Lama', numberOfFarmer: 34, amountOfContribution: 2, uom: 'jam', date: '10 Jan 2024' },
          { no: 2, estate: 'Negeri Lama', category: 'Solid dan Janjang Kosong', activitiesName: 'Aplikasi Kompos', farmerGroup: 'Kelompok Tani Berkah', village: 'Desa Suka Damai', numberOfFarmer: 24, amountOfContribution: 170, uom: 'kg', date: '22 Feb 2024' }
        ]
      },
      'Tanah Gambus': {
        partnershipProfile: {
          jumlahPetani: 620,
          totalLuas: 1210.70,
          jumlahDesa: 11,
          kesesuaianTani: 9,
          kesesuaianValue: 'kelompok'
        },
        trainingData: { jumlahPetani: 205, jamPelatihan: 325 },
        fertilizerData: { jumlahPetani: 32, totalKontribusi: 495, luasAplikasi: 15 },
        solidWasteData: { jumlahPetani: 30, totalKontribusi: 445, luasAplikasi: 16 },
        spplData: { jumlahPetani: 210, totalLuas: 8 },
        apdData: { jumlahPetani: 19, totalKontribusi: 19 },
        shmData: { jumlahPetani: 215, totalLuas: 9 },
        drainageData: { jumlahPetani: 200, luasRawat: 360, jumlahDesa: 6 },
        bridgeData: { jumlahPetani: 205, jumlahKontribusi: 365, jumlahDesa: 7 },
        mediaLinks: [
          { no: 1, link: 'https://radaronline.co.id/tanah-gambus-program-petani-2024' }
        ],
        activitiesData: [
          { no: 1, estate: 'Tanah Gambus', category: 'Pelatihan Best Management Practice', activitiesName: 'Pengelolaan Hama', farmerGroup: 'Kelompok Tani Jaya', village: 'Desa Tanah Gambus', numberOfFarmer: 28, amountOfContribution: 2, uom: 'jam', date: '16 Jan 2024' },
          { no: 2, estate: 'Tanah Gambus', category: 'Alat Kerja - APD', activitiesName: 'Distribusi APD', farmerGroup: 'Kelompok Tani Makmur', village: 'Desa Sei Gambus', numberOfFarmer: 19, amountOfContribution: 19, uom: 'unit', date: '20 Feb 2024' }
        ]
      },
      'Bangun Bandar': {
        partnershipProfile: {
          jumlahPetani: 965,
          totalLuas: 1785.60,
          jumlahDesa: 19,
          kesesuaianTani: 15,
          kesesuaianValue: 'kelompok'
        },
        trainingData: { jumlahPetani: 330, jamPelatihan: 515 },
        fertilizerData: { jumlahPetani: 50, totalKontribusi: 725, luasAplikasi: 28 },
        solidWasteData: { jumlahPetani: 41, totalKontribusi: 580, luasAplikasi: 24 },
        spplData: { jumlahPetani: 335, totalLuas: 14 },
        apdData: { jumlahPetani: 31, totalKontribusi: 31 },
        shmData: { jumlahPetani: 340, totalLuas: 15 },
        drainageData: { jumlahPetani: 325, luasRawat: 520, jumlahDesa: 11 },
        bridgeData: { jumlahPetani: 330, jumlahKontribusi: 525, jumlahDesa: 12 },
        mediaLinks: [
          { no: 1, link: 'https://sumutprov.go.id/bangun-bandar-estate-csr-2024' }
        ],
        activitiesData: [
          { no: 1, estate: 'Bangun Bandar', category: 'Pelatihan Best Management Practice', activitiesName: 'Sanitasi Kebun', farmerGroup: 'Kelompok Tani Subur', village: 'Desa Bangun Bandar', numberOfFarmer: 38, amountOfContribution: 2, uom: 'jam', date: '08 Jan 2024' },
          { no: 2, estate: 'Bangun Bandar', category: 'Pengurusan SHM', activitiesName: 'Pendampingan Sertifikat', farmerGroup: 'Kelompok Tani Sehati', village: 'Desa Mekar Jaya', numberOfFarmer: 33, amountOfContribution: 1, uom: 'unit', date: '25 Feb 2024' }
        ]
      },
      'Mata Pao': {
        partnershipProfile: {
          jumlahPetani: 565,
          totalLuas: 1105.80,
          jumlahDesa: 10,
          kesesuaianTani: 8,
          kesesuaianValue: 'kelompok'
        },
        trainingData: { jumlahPetani: 185, jamPelatihan: 290 },
        fertilizerData: { jumlahPetani: 28, totalKontribusi: 420, luasAplikasi: 14 },
        solidWasteData: { jumlahPetani: 24, totalKontribusi: 385, luasAplikasi: 13 },
        spplData: { jumlahPetani: 190, totalLuas: 7 },
        apdData: { jumlahPetani: 15, totalKontribusi: 15 },
        shmData: { jumlahPetani: 195, totalLuas: 8 },
        drainageData: { jumlahPetani: 180, luasRawat: 325, jumlahDesa: 5 },
        bridgeData: { jumlahPetani: 185, jumlahKontribusi: 330, jumlahDesa: 6 },
        mediaLinks: [
          { no: 1, link: 'https://acehtrend.com/mata-pao-estate-2024' }
        ],
        activitiesData: [
          { no: 1, estate: 'Mata Pao', category: 'Pelatihan Best Management Practice', activitiesName: 'Perawatan Tanaman Muda', farmerGroup: 'Kelompok Tani Pao', village: 'Desa Mata Pao', numberOfFarmer: 22, amountOfContribution: 2, uom: 'jam', date: '18 Jan 2024' },
          { no: 2, estate: 'Mata Pao', category: 'Rawat Jalan/Parit', activitiesName: 'Pemeliharaan Drainase', farmerGroup: 'Kelompok Tani Sejati', village: 'Desa Simpang Pao', numberOfFarmer: 26, amountOfContribution: 1, uom: 'ha', date: '28 Feb 2024' }
        ]
      },
      'Tanah Besih': {
        partnershipProfile: {
          jumlahPetani: 765,
          totalLuas: 1440.75,
          jumlahDesa: 14,
          kesesuaianTani: 11,
          kesesuaianValue: 'kelompok'
        },
        trainingData: { jumlahPetani: 255, jamPelatihan: 395 },
        fertilizerData: { jumlahPetani: 41, totalKontribusi: 605, luasAplikasi: 22 },
        solidWasteData: { jumlahPetani: 36, totalKontribusi: 545, luasAplikasi: 20 },
        spplData: { jumlahPetani: 260, totalLuas: 11 },
        apdData: { jumlahPetani: 25, totalKontribusi: 25 },
        shmData: { jumlahPetani: 265, totalLuas: 12 },
        drainageData: { jumlahPetani: 250, luasRawat: 420, jumlahDesa: 8 },
        bridgeData: { jumlahPetani: 255, jumlahKontribusi: 425, jumlahDesa: 9 },
        mediaLinks: [
          { no: 1, link: 'https://acehnews.id/tanah-besih-program-2024' }
        ],
        activitiesData: [
          { no: 1, estate: 'Tanah Besih', category: 'Pelatihan Best Management Practice', activitiesName: 'Grading Buah', farmerGroup: 'Kelompok Tani Besih', village: 'Desa Tanah Besih', numberOfFarmer: 28, amountOfContribution: 2, uom: 'jam', date: '13 Jan 2024' },
          { no: 2, estate: 'Tanah Besih', category: 'Jembatan', activitiesName: 'Pembangunan Jembatan', farmerGroup: 'Kelompok Tani Bersama', village: 'Desa Suka Ramai', numberOfFarmer: 36, amountOfContribution: 1, uom: 'unit', date: '01 Mar 2024' }
        ]
      },
      'Sei Liput': {
        partnershipProfile: {
          jumlahPetani: 890,
          totalLuas: 1645.30,
          jumlahDesa: 17,
          kesesuaianTani: 13,
          kesesuaianValue: 'kelompok'
        },
        trainingData: { jumlahPetani: 295, jamPelatihan: 455 },
        fertilizerData: { jumlahPetani: 47, totalKontribusi: 700, luasAplikasi: 26 },
        solidWasteData: { jumlahPetani: 39, totalKontribusi: 575, luasAplikasi: 23 },
        spplData: { jumlahPetani: 300, totalLuas: 13 },
        apdData: { jumlahPetani: 29, totalKontribusi: 29 },
        shmData: { jumlahPetani: 305, totalLuas: 14 },
        drainageData: { jumlahPetani: 290, luasRawat: 480, jumlahDesa: 10 },
        bridgeData: { jumlahPetani: 295, jumlahKontribusi: 485, jumlahDesa: 11 },
        mediaLinks: [
          { no: 1, link: 'https://medanbisnisdaily.com/sei-liput-2024' }
        ],
        activitiesData: [
          { no: 1, estate: 'Sei Liput', category: 'Pelatihan Best Management Practice', activitiesName: 'Konservasi Tanah', farmerGroup: 'Kelompok Tani Liput', village: 'Desa Sei Liput', numberOfFarmer: 33, amountOfContribution: 2, uom: 'jam', date: '09 Jan 2024' },
          { no: 2, estate: 'Sei Liput', category: 'Pengurusan SPPL', activitiesName: 'Pendampingan SPPL', farmerGroup: 'Kelompok Tani Lestari', village: 'Desa Suka Maju', numberOfFarmer: 30, amountOfContribution: 1, uom: 'unit', date: '21 Feb 2024' }
        ]
      },
      'Seunagan': {
        partnershipProfile: {
          jumlahPetani: 670,
          totalLuas: 1300.50,
          jumlahDesa: 12,
          kesesuaianTani: 9,
          kesesuaianValue: 'kelompok'
        },
        trainingData: { jumlahPetani: 225, jamPelatihan: 350 },
        fertilizerData: { jumlahPetani: 36, totalKontribusi: 540, luasAplikasi: 18 },
        solidWasteData: { jumlahPetani: 31, totalKontribusi: 480, luasAplikasi: 17 },
        spplData: { jumlahPetani: 230, totalLuas: 9 },
        apdData: { jumlahPetani: 21, totalKontribusi: 21 },
        shmData: { jumlahPetani: 235, totalLuas: 10 },
        drainageData: { jumlahPetani: 220, luasRawat: 380, jumlahDesa: 7 },
        bridgeData: { jumlahPetani: 225, jumlahKontribusi: 385, jumlahDesa: 8 },
        mediaLinks: [
          { no: 1, link: 'https://acehterkini.com/seunagan-kemitraan-2024' }
        ],
        activitiesData: [
          { no: 1, estate: 'Seunagan', category: 'Pelatihan Best Management Practice', activitiesName: 'Penyiangan Piringan', farmerGroup: 'Kelompok Tani Seunagan', village: 'Desa Seunagan', numberOfFarmer: 25, amountOfContribution: 2, uom: 'jam', date: '15 Jan 2024' },
          { no: 2, estate: 'Seunagan', category: 'Media Online', activitiesName: 'Publikasi Kegiatan', farmerGroup: 'Kelompok Tani Harmoni', village: 'Desa Padang Seunagan', numberOfFarmer: 12, amountOfContribution: 1, uom: 'artikel', date: '26 Feb 2024' }
        ]
      },
      'Seumanyam': {
        partnershipProfile: {
          jumlahPetani: 790,
          totalLuas: 1495.60,
          jumlahDesa: 15,
          kesesuaianTani: 12,
          kesesuaianValue: 'kelompok'
        },
        trainingData: { jumlahPetani: 265, jamPelatihan: 405 },
        fertilizerData: { jumlahPetani: 43, totalKontribusi: 630, luasAplikasi: 23 },
        solidWasteData: { jumlahPetani: 38, totalKontribusi: 555, luasAplikasi: 21 },
        spplData: { jumlahPetani: 270, totalLuas: 12 },
        apdData: { jumlahPetani: 26, totalKontribusi: 26 },
        shmData: { jumlahPetani: 275, totalLuas: 13 },
        drainageData: { jumlahPetani: 260, luasRawat: 435, jumlahDesa: 9 },
        bridgeData: { jumlahPetani: 265, jumlahKontribusi: 440, jumlahDesa: 10 },
        mediaLinks: [
          { no: 1, link: 'https://acehpost.id/seumanyam-estate-2024' }
        ],
        activitiesData: [
          { no: 1, estate: 'Seumanyam', category: 'Pelatihan Best Management Practice', activitiesName: 'Pengendalian Gulma', farmerGroup: 'Kelompok Tani Manyam', village: 'Desa Seumanyam', numberOfFarmer: 31, amountOfContribution: 2, uom: 'jam', date: '11 Jan 2024' },
          { no: 2, estate: 'Seumanyam', category: 'Pupuk Kimia/Pestisida', activitiesName: 'Aplikasi Pestisida', farmerGroup: 'Kelompok Tani Terpadu', village: 'Desa Gampong Manyam', numberOfFarmer: 23, amountOfContribution: 155, uom: 'liter', date: '23 Feb 2024' }
        ]
      },
      'Lae Butar': {
        partnershipProfile: {
          jumlahPetani: 985,
          totalLuas: 1820.65,
          jumlahDesa: 20,
          kesesuaianTani: 16,
          kesesuaianValue: 'kelompok'
        },
        trainingData: { jumlahPetani: 340, jamPelatihan: 530 },
        fertilizerData: { jumlahPetani: 53, totalKontribusi: 785, luasAplikasi: 30 },
        solidWasteData: { jumlahPetani: 45, totalKontribusi: 665, luasAplikasi: 26 },
        spplData: { jumlahPetani: 345, totalLuas: 16 },
        apdData: { jumlahPetani: 33, totalKontribusi: 33 },
        shmData: { jumlahPetani: 350, totalLuas: 17 },
        drainageData: { jumlahPetani: 335, luasRawat: 550, jumlahDesa: 12 },
        bridgeData: { jumlahPetani: 340, jumlahKontribusi: 555, jumlahDesa: 13 },
        mediaLinks: [
          { no: 1, link: 'https://sumutprov.go.id/lae-butar-kemitraan-2024' },
          { no: 2, link: 'https://medantoday.com/lae-butar-estate-2024' }
        ],
        activitiesData: [
          { no: 1, estate: 'Lae Butar', category: 'Pelatihan Best Management Practice', activitiesName: 'Pemangkasan', farmerGroup: 'Kelompok Tani Butar', village: 'Desa Lae Butar', numberOfFarmer: 36, amountOfContribution: 3, uom: 'jam', date: '08 Jan 2024' },
          { no: 2, estate: 'Lae Butar', category: 'Solid dan Janjang Kosong', activitiesName: 'Distribusi Kompos', farmerGroup: 'Kelompok Tani Persada', village: 'Desa Suka Makmur', numberOfFarmer: 30, amountOfContribution: 215, uom: 'kg', date: '18 Feb 2024' },
          { no: 3, estate: 'Lae Butar', category: 'Alat Kerja - APD', activitiesName: 'Pembagian APD', farmerGroup: 'Kelompok Tani Bersatu', village: 'Desa Padang Butar', numberOfFarmer: 33, amountOfContribution: 33, uom: 'unit', date: '28 Feb 2024' }
        ]
      }
    },
    2025: {
      'Aek Loba': {
      partnershipProfile: {
        jumlahPetani: 1059,
        totalLuas: 1954.69,
        jumlahDesa: 20,
        kesesuaianTani: 16,
        kesesuaianValue: 'kelompok'
      },
      trainingData: { jumlahPetani: 357, jamPelatihan: 550 },
      fertilizerData: { jumlahPetani: 30, totalKontribusi: 550, luasAplikasi: 20 },
      solidWasteData: { jumlahPetani: 30, totalKontribusi: 550, luasAplikasi: 20 },
      spplData: { jumlahPetani: 357, totalLuas: 10 },
      apdData: { jumlahPetani: 20, totalKontribusi: 20 },
      shmData: { jumlahPetani: 357, totalLuas: 10 },
      drainageData: { jumlahPetani: 357, luasRawat: 550, jumlahDesa: 10 },
      bridgeData: { jumlahPetani: 357, jumlahKontribusi: 550, jumlahDesa: 10 },
      mediaLinks: [
        { no: 1, link: 'https://www.waspada.id/sumut/pt-socfindo-aek-loba-serahkan-kambing-kelompok-ternak/' },
        { no: 2, link: 'https://www.mjnews.id/kesehatan/m-6970/pemkab-asahan-ucapkan-terima-kasih-atas-bantuan-alat-resusitasi-dari-pt-socfindo/' },
        { no: 3, link: 'https://medgo.id/tp-pkk-kabupaten-asahan-gelar-rakornis-di-kecamatan-aek-kuasan/' }
      ],
      activitiesData: [
        { no: 1, estate: 'Aek Loba', category: 'Pelatihan Best Management Practice', activitiesName: 'Panen', farmerGroup: 'Kelompok Tani Baru', village: 'Desa Negara', numberOfFarmer: 28, amountOfContribution: 2, uom: 'jam', date: '10 Jan 2025' },
        { no: 2, estate: 'Aek Loba', category: 'Pelatihan Best Management Practice', activitiesName: 'Pemupukan', farmerGroup: 'Kelompok Tani Mandiri', village: 'Lobu Jur', numberOfFarmer: 21, amountOfContribution: 2, uom: 'jam', date: '10 Feb 2025' },
        { no: 3, estate: 'Aek Loba', category: 'Pelatihan Best Management Practice', activitiesName: 'Penyemprotan', farmerGroup: 'Kelompok Tani Longgur', village: 'Desa Pulau Rakyat', numberOfFarmer: 30, amountOfContribution: 2, uom: 'jam', date: '17 Feb 2025' }
      ]
    },
    'Aek Pamienke': {
      partnershipProfile: {
        jumlahPetani: 845,
        totalLuas: 1625.50,
        jumlahDesa: 15,
        kesesuaianTani: 12,
        kesesuaianValue: 'kelompok'
      },
      trainingData: { jumlahPetani: 285, jamPelatihan: 420 },
      fertilizerData: { jumlahPetani: 45, totalKontribusi: 680, luasAplikasi: 25 },
      solidWasteData: { jumlahPetani: 38, totalKontribusi: 590, luasAplikasi: 22 },
      spplData: { jumlahPetani: 290, totalLuas: 12 },
      apdData: { jumlahPetani: 28, totalKontribusi: 28 },
      shmData: { jumlahPetani: 295, totalLuas: 13 },
      drainageData: { jumlahPetani: 280, luasRawat: 475, jumlahDesa: 8 },
      bridgeData: { jumlahPetani: 285, jumlahKontribusi: 480, jumlahDesa: 9 },
      mediaLinks: [
        { no: 1, link: 'https://sumut.antaranews.com/berita/socfindo-aek-pamienke-bantu-petani-lokal' },
        { no: 2, link: 'https://medan.tribunnews.com/aek-pamienke-tingkatkan-produktivitas' }
      ],
      activitiesData: [
        { no: 1, estate: 'Aek Pamienke', category: 'Pelatihan Best Management Practice', activitiesName: 'Pemeliharaan Tanaman', farmerGroup: 'Kelompok Tani Sejahtera', village: 'Desa Pamienke', numberOfFarmer: 35, amountOfContribution: 2, uom: 'jam', date: '12 Jan 2025' },
        { no: 2, estate: 'Aek Pamienke', category: 'Pupuk Kimia/Pestisida', activitiesName: 'Aplikasi Pupuk', farmerGroup: 'Kelompok Tani Maju', village: 'Desa Suka Makmur', numberOfFarmer: 25, amountOfContribution: 150, uom: 'kg', date: '15 Feb 2025' }
      ]
    },
    'Negeri Lama': {
      partnershipProfile: {
        jumlahPetani: 978,
        totalLuas: 1785.30,
        jumlahDesa: 18,
        kesesuaianTani: 14,
        kesesuaianValue: 'kelompok'
      },
      trainingData: { jumlahPetani: 320, jamPelatihan: 490 },
      fertilizerData: { jumlahPetani: 52, totalKontribusi: 720, luasAplikasi: 28 },
      solidWasteData: { jumlahPetani: 41, totalKontribusi: 615, luasAplikasi: 24 },
      spplData: { jumlahPetani: 325, totalLuas: 14 },
      apdData: { jumlahPetani: 32, totalKontribusi: 32 },
      shmData: { jumlahPetani: 330, totalLuas: 15 },
      drainageData: { jumlahPetani: 315, luasRawat: 505, jumlahDesa: 11 },
      bridgeData: { jumlahPetani: 320, jumlahKontribusi: 510, jumlahDesa: 12 },
      mediaLinks: [
        { no: 1, link: 'https://sumutpos.co/socfindo-negeri-lama-program-kemitraan' },
        { no: 2, link: 'https://hariansib.co/negeri-lama-estate-pemberdayaan-petani' }
      ],
      activitiesData: [
        { no: 1, estate: 'Negeri Lama', category: 'Pelatihan Best Management Practice', activitiesName: 'Teknik Panen Tepat', farmerGroup: 'Kelompok Tani Harapan', village: 'Desa Negeri Lama', numberOfFarmer: 40, amountOfContribution: 3, uom: 'jam', date: '08 Jan 2025' },
        { no: 2, estate: 'Negeri Lama', category: 'Solid dan Janjang Kosong', activitiesName: 'Aplikasi Kompos', farmerGroup: 'Kelompok Tani Berkah', village: 'Desa Suka Damai', numberOfFarmer: 28, amountOfContribution: 200, uom: 'kg', date: '20 Feb 2025' }
      ]
    },
    'Tanah Gambus': {
      partnershipProfile: {
        jumlahPetani: 725,
        totalLuas: 1420.80,
        jumlahDesa: 13,
        kesesuaianTani: 10,
        kesesuaianValue: 'kelompok'
      },
      trainingData: { jumlahPetani: 240, jamPelatihan: 380 },
      fertilizerData: { jumlahPetani: 38, totalKontribusi: 580, luasAplikasi: 18 },
      solidWasteData: { jumlahPetani: 35, totalKontribusi: 520, luasAplikasi: 19 },
      spplData: { jumlahPetani: 245, totalLuas: 9 },
      apdData: { jumlahPetani: 22, totalKontribusi: 22 },
      shmData: { jumlahPetani: 250, totalLuas: 11 },
      drainageData: { jumlahPetani: 235, luasRawat: 420, jumlahDesa: 7 },
      bridgeData: { jumlahPetani: 240, jumlahKontribusi: 425, jumlahDesa: 8 },
      mediaLinks: [
        { no: 1, link: 'https://radaronline.co.id/tanah-gambus-kemitraan-berkelanjutan' }
      ],
      activitiesData: [
        { no: 1, estate: 'Tanah Gambus', category: 'Pelatihan Best Management Practice', activitiesName: 'Pengelolaan Hama', farmerGroup: 'Kelompok Tani Jaya', village: 'Desa Tanah Gambus', numberOfFarmer: 32, amountOfContribution: 2, uom: 'jam', date: '14 Jan 2025' },
        { no: 2, estate: 'Tanah Gambus', category: 'Alat Kerja - APD', activitiesName: 'Distribusi APD', farmerGroup: 'Kelompok Tani Makmur', village: 'Desa Sei Gambus', numberOfFarmer: 22, amountOfContribution: 22, uom: 'unit', date: '18 Feb 2025' }
      ]
    },
    'Bangun Bandar': {
      partnershipProfile: {
        jumlahPetani: 1120,
        totalLuas: 2085.45,
        jumlahDesa: 22,
        kesesuaianTani: 18,
        kesesuaianValue: 'kelompok'
      },
      trainingData: { jumlahPetani: 385, jamPelatihan: 600 },
      fertilizerData: { jumlahPetani: 58, totalKontribusi: 850, luasAplikasi: 32 },
      solidWasteData: { jumlahPetani: 48, totalKontribusi: 680, luasAplikasi: 28 },
      spplData: { jumlahPetani: 390, totalLuas: 16 },
      apdData: { jumlahPetani: 36, totalKontribusi: 36 },
      shmData: { jumlahPetani: 395, totalLuas: 17 },
      drainageData: { jumlahPetani: 380, luasRawat: 605, jumlahDesa: 13 },
      bridgeData: { jumlahPetani: 385, jumlahKontribusi: 610, jumlahDesa: 14 },
      mediaLinks: [
        { no: 1, link: 'https://sumutprov.go.id/bangun-bandar-estate-program-csr' },
        { no: 2, link: 'https://portalberita.com/bangun-bandar-pemberdayaan-masyarakat' }
      ],
      activitiesData: [
        { no: 1, estate: 'Bangun Bandar', category: 'Pelatihan Best Management Practice', activitiesName: 'Sanitasi Kebun', farmerGroup: 'Kelompok Tani Subur', village: 'Desa Bangun Bandar', numberOfFarmer: 45, amountOfContribution: 3, uom: 'jam', date: '05 Jan 2025' },
        { no: 2, estate: 'Bangun Bandar', category: 'Pengurusan SHM', activitiesName: 'Pendampingan Sertifikat', farmerGroup: 'Kelompok Tani Sehati', village: 'Desa Mekar Jaya', numberOfFarmer: 38, amountOfContribution: 1, uom: 'unit', date: '22 Feb 2025' }
      ]
    },
    'Mata Pao': {
      partnershipProfile: {
        jumlahPetani: 655,
        totalLuas: 1290.25,
        jumlahDesa: 12,
        kesesuaianTani: 9,
        kesesuaianValue: 'kelompok'
      },
      trainingData: { jumlahPetani: 215, jamPelatihan: 340 },
      fertilizerData: { jumlahPetani: 32, totalKontribusi: 490, luasAplikasi: 16 },
      solidWasteData: { jumlahPetani: 28, totalKontribusi: 450, luasAplikasi: 15 },
      spplData: { jumlahPetani: 220, totalLuas: 8 },
      apdData: { jumlahPetani: 18, totalKontribusi: 18 },
      shmData: { jumlahPetani: 225, totalLuas: 9 },
      drainageData: { jumlahPetani: 210, luasRawat: 380, jumlahDesa: 6 },
      bridgeData: { jumlahPetani: 215, jumlahKontribusi: 385, jumlahDesa: 7 },
      mediaLinks: [
        { no: 1, link: 'https://acehtrend.com/mata-pao-estate-kemitraan' }
      ],
      activitiesData: [
        { no: 1, estate: 'Mata Pao', category: 'Pelatihan Best Management Practice', activitiesName: 'Perawatan Tanaman Muda', farmerGroup: 'Kelompok Tani Pao', village: 'Desa Mata Pao', numberOfFarmer: 26, amountOfContribution: 2, uom: 'jam', date: '16 Jan 2025' },
        { no: 2, estate: 'Mata Pao', category: 'Rawat Jalan/Parit', activitiesName: 'Pemeliharaan Drainase', farmerGroup: 'Kelompok Tani Sejati', village: 'Desa Simpang Pao', numberOfFarmer: 30, amountOfContribution: 1, uom: 'ha', date: '25 Feb 2025' }
      ]
    },
    'Tanah Besih': {
      partnershipProfile: {
        jumlahPetani: 890,
        totalLuas: 1680.90,
        jumlahDesa: 16,
        kesesuaianTani: 13,
        kesesuaianValue: 'kelompok'
      },
      trainingData: { jumlahPetani: 295, jamPelatihan: 460 },
      fertilizerData: { jumlahPetani: 48, totalKontribusi: 710, luasAplikasi: 26 },
      solidWasteData: { jumlahPetani: 42, totalKontribusi: 640, luasAplikasi: 23 },
      spplData: { jumlahPetani: 300, totalLuas: 13 },
      apdData: { jumlahPetani: 29, totalKontribusi: 29 },
      shmData: { jumlahPetani: 305, totalLuas: 14 },
      drainageData: { jumlahPetani: 290, luasRawat: 490, jumlahDesa: 9 },
      bridgeData: { jumlahPetani: 295, jumlahKontribusi: 495, jumlahDesa: 10 },
      mediaLinks: [
        { no: 1, link: 'https://acehnews.id/tanah-besih-program-petani' },
        { no: 2, link: 'https://serambinews.com/tanah-besih-kemitraan-sawit' }
      ],
      activitiesData: [
        { no: 1, estate: 'Tanah Besih', category: 'Pelatihan Best Management Practice', activitiesName: 'Grading Buah', farmerGroup: 'Kelompok Tani Besih', village: 'Desa Tanah Besih', numberOfFarmer: 33, amountOfContribution: 2, uom: 'jam', date: '11 Jan 2025' },
        { no: 2, estate: 'Tanah Besih', category: 'Jembatan', activitiesName: 'Pembangunan Jembatan', farmerGroup: 'Kelompok Tani Bersama', village: 'Desa Suka Ramai', numberOfFarmer: 42, amountOfContribution: 1, uom: 'unit', date: '28 Feb 2025' }
      ]
    },
    'Sei Liput': {
      partnershipProfile: {
        jumlahPetani: 1035,
        totalLuas: 1920.15,
        jumlahDesa: 19,
        kesesuaianTani: 15,
        kesesuaianValue: 'kelompok'
      },
      trainingData: { jumlahPetani: 345, jamPelatihan: 530 },
      fertilizerData: { jumlahPetani: 55, totalKontribusi: 820, luasAplikasi: 30 },
      solidWasteData: { jumlahPetani: 46, totalKontribusi: 670, luasAplikasi: 27 },
      spplData: { jumlahPetani: 350, totalLuas: 15 },
      apdData: { jumlahPetani: 34, totalKontribusi: 34 },
      shmData: { jumlahPetani: 355, totalLuas: 16 },
      drainageData: { jumlahPetani: 340, luasRawat: 560, jumlahDesa: 12 },
      bridgeData: { jumlahPetani: 345, jumlahKontribusi: 565, jumlahDesa: 13 },
      mediaLinks: [
        { no: 1, link: 'https://medanbisnisdaily.com/sei-liput-pemberdayaan' },
        { no: 2, link: 'https://sumutupdate.com/sei-liput-estate-petani' }
      ],
      activitiesData: [
        { no: 1, estate: 'Sei Liput', category: 'Pelatihan Best Management Practice', activitiesName: 'Konservasi Tanah', farmerGroup: 'Kelompok Tani Liput', village: 'Desa Sei Liput', numberOfFarmer: 38, amountOfContribution: 3, uom: 'jam', date: '07 Jan 2025' },
        { no: 2, estate: 'Sei Liput', category: 'Pengurusan SPPL', activitiesName: 'Pendampingan SPPL', farmerGroup: 'Kelompok Tani Lestari', village: 'Desa Suka Maju', numberOfFarmer: 35, amountOfContribution: 1, uom: 'unit', date: '19 Feb 2025' }
      ]
    },
    'Seunagan': {
      partnershipProfile: {
        jumlahPetani: 780,
        totalLuas: 1520.60,
        jumlahDesa: 14,
        kesesuaianTani: 11,
        kesesuaianValue: 'kelompok'
      },
      trainingData: { jumlahPetani: 260, jamPelatihan: 410 },
      fertilizerData: { jumlahPetani: 42, totalKontribusi: 630, luasAplikasi: 21 },
      solidWasteData: { jumlahPetani: 36, totalKontribusi: 560, luasAplikasi: 20 },
      spplData: { jumlahPetani: 265, totalLuas: 11 },
      apdData: { jumlahPetani: 25, totalKontribusi: 25 },
      shmData: { jumlahPetani: 270, totalLuas: 12 },
      drainageData: { jumlahPetani: 255, luasRawat: 445, jumlahDesa: 8 },
      bridgeData: { jumlahPetani: 260, jumlahKontribusi: 450, jumlahDesa: 9 },
      mediaLinks: [
        { no: 1, link: 'https://acehterkini.com/seunagan-program-kemitraan' }
      ],
      activitiesData: [
        { no: 1, estate: 'Seunagan', category: 'Pelatihan Best Management Practice', activitiesName: 'Penyiangan Piringan', farmerGroup: 'Kelompok Tani Seunagan', village: 'Desa Seunagan', numberOfFarmer: 29, amountOfContribution: 2, uom: 'jam', date: '13 Jan 2025' },
        { no: 2, estate: 'Seunagan', category: 'Media Online', activitiesName: 'Publikasi Kegiatan', farmerGroup: 'Kelompok Tani Harmoni', village: 'Desa Padang Seunagan', numberOfFarmer: 15, amountOfContribution: 1, uom: 'artikel', date: '24 Feb 2025' }
      ]
    },
    'Seumanyam': {
      partnershipProfile: {
        jumlahPetani: 920,
        totalLuas: 1745.35,
        jumlahDesa: 17,
        kesesuaianTani: 14,
        kesesuaianValue: 'kelompok'
      },
      trainingData: { jumlahPetani: 305, jamPelatihan: 475 },
      fertilizerData: { jumlahPetani: 50, totalKontribusi: 740, luasAplikasi: 27 },
      solidWasteData: { jumlahPetani: 44, totalKontribusi: 650, luasAplikasi: 25 },
      spplData: { jumlahPetani: 310, totalLuas: 14 },
      apdData: { jumlahPetani: 30, totalKontribusi: 30 },
      shmData: { jumlahPetani: 315, totalLuas: 15 },
      drainageData: { jumlahPetani: 300, luasRawat: 510, jumlahDesa: 10 },
      bridgeData: { jumlahPetani: 305, jumlahKontribusi: 515, jumlahDesa: 11 },
      mediaLinks: [
        { no: 1, link: 'https://acehpost.id/seumanyam-estate-kemitraan' },
        { no: 2, link: 'https://acehnews.net/seumanyam-pemberdayaan-petani' }
      ],
      activitiesData: [
        { no: 1, estate: 'Seumanyam', category: 'Pelatihan Best Management Practice', activitiesName: 'Pengendalian Gulma', farmerGroup: 'Kelompok Tani Manyam', village: 'Desa Seumanyam', numberOfFarmer: 36, amountOfContribution: 2, uom: 'jam', date: '09 Jan 2025' },
        { no: 2, estate: 'Seumanyam', category: 'Pupuk Kimia/Pestisida', activitiesName: 'Aplikasi Pestisida', farmerGroup: 'Kelompok Tani Terpadu', village: 'Desa Gampong Manyam', numberOfFarmer: 27, amountOfContribution: 180, uom: 'liter', date: '21 Feb 2025' }
      ]
    },
    'Lae Butar': {
      partnershipProfile: {
        jumlahPetani: 1145,
        totalLuas: 2120.75,
        jumlahDesa: 23,
        kesesuaianTani: 19,
        kesesuaianValue: 'kelompok'
      },
      trainingData: { jumlahPetani: 395, jamPelatihan: 620 },
      fertilizerData: { jumlahPetani: 62, totalKontribusi: 920, luasAplikasi: 35 },
      solidWasteData: { jumlahPetani: 52, totalKontribusi: 780, luasAplikasi: 30 },
      spplData: { jumlahPetani: 400, totalLuas: 18 },
      apdData: { jumlahPetani: 38, totalKontribusi: 38 },
      shmData: { jumlahPetani: 405, totalLuas: 19 },
      drainageData: { jumlahPetani: 390, luasRawat: 640, jumlahDesa: 14 },
      bridgeData: { jumlahPetani: 395, jumlahKontribusi: 645, jumlahDesa: 15 },
      mediaLinks: [
        { no: 1, link: 'https://sumutprov.go.id/lae-butar-kemitraan-berkelanjutan' },
        { no: 2, link: 'https://medantoday.com/lae-butar-estate-program-petani' },
        { no: 3, link: 'https://sumutberita.id/lae-butar-pemberdayaan-masyarakat' }
      ],
      activitiesData: [
        { no: 1, estate: 'Lae Butar', category: 'Pelatihan Best Management Practice', activitiesName: 'Pemangkasan', farmerGroup: 'Kelompok Tani Butar', village: 'Desa Lae Butar', numberOfFarmer: 42, amountOfContribution: 3, uom: 'jam', date: '06 Jan 2025' },
        { no: 2, estate: 'Lae Butar', category: 'Solid dan Janjang Kosong', activitiesName: 'Distribusi Kompos', farmerGroup: 'Kelompok Tani Persada', village: 'Desa Suka Makmur', numberOfFarmer: 35, amountOfContribution: 250, uom: 'kg', date: '16 Feb 2025' },
        { no: 3, estate: 'Lae Butar', category: 'Alat Kerja - APD', activitiesName: 'Pembagian APD', farmerGroup: 'Kelompok Tani Bersatu', village: 'Desa Padang Butar', numberOfFarmer: 38, amountOfContribution: 38, uom: 'unit', date: '26 Feb 2025' }
      ]
    }
    }
  };

  // Ambil data berdasarkan tahun dan estate yang aktif
  const estateData = yearlyData[selectedYear] || yearlyData[2025];
  const currentData = estateData[activeEstate] || estateData['Aek Loba'];
  const partnershipProfile = currentData.partnershipProfile;
  const trainingData = currentData.trainingData;
  const fertilizerData = currentData.fertilizerData;
  const solidWasteData = currentData.solidWasteData;
  const spplData = currentData.spplData;
  const apdData = currentData.apdData;
  const shmData = currentData.shmData;
  const drainageData = currentData.drainageData;
  const bridgeData = currentData.bridgeData;
  const mediaLinks = currentData.mediaLinks;
  const activitiesData: ActivityData[] = currentData.activitiesData;

  // Fungsi untuk membuka dialog edit
  const handleOpenEdit = () => {
    setEditFormData({
      partnershipProfile: { ...partnershipProfile },
      trainingData: { ...trainingData },
      fertilizerData: { ...fertilizerData },
      solidWasteData: { ...solidWasteData },
      spplData: { ...spplData },
      apdData: { ...apdData },
      shmData: { ...shmData },
      drainageData: { ...drainageData },
      bridgeData: { ...bridgeData },
      mediaLinks: mediaLinks.map(link => ({ ...link })),
    });
    setIsEditDialogOpen(true);
  };

  // Fungsi untuk update field
  const handleFieldChange = (category: string, field: string, value: any) => {
    setEditFormData((prev: any) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  // Fungsi untuk save data (sementara hanya console.log)
  const handleSaveEdit = () => {
    console.log('Data yang akan disimpan:', editFormData);
    console.log('Estate:', activeEstate);
    console.log('Tahun:', selectedYear);
    // Di sini Anda bisa menambahkan logic untuk save ke backend atau update state
    setIsEditDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6 bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-[#dbeafe] py-4 px-6 rounded-lg -mx-6 -mt-6 mb-6">
        <h1 className="text-center text-[#0a1929] tracking-wide">ENGAGEMENT DASHBOARD</h1>
      </div>

      {/* Estate Tabs & Year */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Tabs value={activeEstate} onValueChange={setActiveEstate} className="flex-1">
          <TabsList className="flex flex-wrap h-auto bg-transparent gap-1">
            {estates.map((estate) => (
              <TabsTrigger
                key={estate}
                value={estate}
                className="data-[state=active]:bg-[#fbbf24] data-[state=active]:text-[#0a1929] bg-[#f3f4f6] text-[#4a5568] px-4 py-2"
              >
                {estate}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button 
            onClick={handleOpenEdit}
            className="bg-[#3b82f6] hover:bg-[#2563eb] text-white"
          >
            <Edit2 className="mr-2" size={16} />
            Edit Data
          </Button>

          <div className="bg-[#fef3c7] px-4 py-1 rounded-lg border border-[#fbbf24] flex items-center gap-2">
            <span className="text-sm text-[#0a1929]">Year :</span>
            <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(Number(value))}>
              <SelectTrigger className="w-[100px] h-8 border-none bg-transparent focus:ring-0 focus:ring-offset-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="text-[#3b82f6]" size={20} />
              Map of {activeEstate} Estate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-[4/3] bg-gradient-to-br from-[#22543d] via-[#2d5a3d] to-[#1a472a] rounded-lg overflow-hidden relative">
              {/* Simulated satellite map view */}
              <div className="absolute inset-0 opacity-40">
                <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-[#4ade80] rounded-full blur-2xl"></div>
                <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-[#34d399] rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-[#10b981] rounded-full blur-2xl"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/60 text-center">
                  <MapPin size={48} className="mx-auto mb-2" />
                  <p className="text-sm">Satellite View</p>
                  <p className="text-xs">{activeEstate} Estate</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Kemitraan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="text-[#3b82f6]" size={20} />
              Profil Kemitraan Kebun
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-[#4a5568]">Jumlah Petani</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[80px] text-right">{partnershipProfile.jumlahPetani}</span>
                  <span className="text-[#4a5568] min-w-[80px]">orang</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-[#4a5568]">Total Luas</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[80px] text-right">{partnershipProfile.totalLuas}</span>
                  <span className="text-[#4a5568] min-w-[80px]">ha</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-[#4a5568]">Jumlah Desa</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[80px] text-right">{partnershipProfile.jumlahDesa}</span>
                  <span className="text-[#4a5568] min-w-[80px]">desa</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-[#4a5568]">Jumlah Kelompok Tani</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[80px] text-right">{partnershipProfile.kesesuaianTani}</span>
                  <span className="text-[#4a5568] min-w-[80px]">{partnershipProfile.kesesuaianValue}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pelatihan Best Management Practice */}
        <Card className="bg-[#fef9c3] border-[#fbbf24]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0a1929]">
              <FileText size={18} />
              Pelatihan Best Management Practice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#4a5568]">Jumlah Petani</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[60px] text-right">{trainingData.jumlahPetani}</span>
                  <span className="text-[#4a5568] min-w-[60px]">orang</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#4a5568]">Jam Pelatihan</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[60px] text-right">{trainingData.jamPelatihan}</span>
                  <span className="text-[#4a5568] min-w-[60px]">Jam</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pupuk Kimia/Pestisida */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0a1929]">
              <Package size={18} />
              Pupuk Kimia/Pestisida
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#4a5568]">Jumlah Petani</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[60px] text-right">{fertilizerData.jumlahPetani}</span>
                  <span className="text-[#4a5568] min-w-[60px]">orang</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#4a5568]">Total Kontribusi</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[60px] text-right">{fertilizerData.totalKontribusi}</span>
                  <span className="text-[#4a5568] min-w-[60px]">kg</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#4a5568]">Luas Aplikasi</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[60px] text-right">{fertilizerData.luasAplikasi}</span>
                  <span className="text-[#4a5568] min-w-[60px]">ha</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Solid dan Janjang Kosong */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0a1929]">
              <Tractor size={18} />
              Solid dan Janjang Kosong
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#4a5568]">Jumlah Petani</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[60px] text-right">{solidWasteData.jumlahPetani}</span>
                  <span className="text-[#4a5568] min-w-[60px]">orang</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#4a5568]">Total Kontribusi</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[60px] text-right">{solidWasteData.totalKontribusi}</span>
                  <span className="text-[#4a5568] min-w-[60px]">kg</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#4a5568]">Luas Aplikasi</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[60px] text-right">{solidWasteData.luasAplikasi}</span>
                  <span className="text-[#4a5568] min-w-[60px]">ha</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pengurusan SPPL */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0a1929]">
              <FileText size={18} />
              Pengurusan SPPL- Surat Pernyataan Pengelolaan Lingkungan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#4a5568]">Jumlah Petani</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[60px] text-right">{spplData.jumlahPetani}</span>
                  <span className="text-[#4a5568] min-w-[60px]">orang</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#4a5568]">Total Luas</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[60px] text-right">{spplData.totalLuas}</span>
                  <span className="text-[#4a5568] min-w-[60px]">ha</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alat Kerja - APD */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0a1929]">
              <Shield size={18} />
              Alat Kerja - Alat Pelindung Diri (APD)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#4a5568]">Jumlah Petani</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[60px] text-right">{apdData.jumlahPetani}</span>
                  <span className="text-[#4a5568] min-w-[60px]">orang</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#4a5568]">Total Kontribusi</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[60px] text-right">{apdData.totalKontribusi}</span>
                  <span className="text-[#4a5568] min-w-[60px]">unit</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pengurusan SHM */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0a1929]">
              <Building size={18} />
              Pengurusan SHM
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#4a5568]">Jumlah Petani</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[60px] text-right">{shmData.jumlahPetani}</span>
                  <span className="text-[#4a5568] min-w-[60px]">orang</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#4a5568]">Total Luas</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[60px] text-right">{shmData.totalLuas}</span>
                  <span className="text-[#4a5568] min-w-[60px]">ha</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rawat Jalan/ Parit */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0a1929]">
              <Droplets size={18} />
              Rawat Jalan/ Parit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#4a5568]">Jumlah Petani</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[60px] text-right">{drainageData.jumlahPetani}</span>
                  <span className="text-[#4a5568] min-w-[60px]">orang</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#4a5568]">Luas Rawat Jalan/Parit</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[60px] text-right">{drainageData.luasRawat}</span>
                  <span className="text-[#4a5568] min-w-[60px]">ha</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#4a5568]">Jumlah Desa</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[60px] text-right">{drainageData.jumlahDesa}</span>
                  <span className="text-[#4a5568] min-w-[60px]">desa</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media Online */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0a1929]">
              <Globe size={18} />
              Media Online
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-12 gap-2 pb-2 border-b">
                <div className="col-span-2 text-sm text-[#4a5568]">No</div>
                <div className="col-span-10 text-sm text-[#4a5568]">Link Media Online</div>
              </div>
              {mediaLinks.map((item) => (
                <div key={item.no} className="grid grid-cols-12 gap-2 items-start">
                  <div className="col-span-2 text-sm text-[#0a1929]">{item.no}</div>
                  <div className="col-span-10">
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-[#3b82f6] hover:underline break-all"
                    >
                      {item.link}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Jembatan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#0a1929]">
              <Home size={18} />
              Jembatan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[#4a5568]">Jumlah Petani</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[60px] text-right">{bridgeData.jumlahPetani}</span>
                  <span className="text-[#4a5568] min-w-[60px]">orang</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#4a5568]">Jumlah Kontribusi</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[60px] text-right">{bridgeData.jumlahKontribusi}</span>
                  <span className="text-[#4a5568] min-w-[60px]">ha</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#4a5568]">Jumlah Desa</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#0a1929]">:</span>
                  <span className="text-[#0a1929] min-w-[60px] text-right">{bridgeData.jumlahDesa}</span>
                  <span className="text-[#4a5568] min-w-[60px]">desa</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activities Table */}
      <Card className="bg-[#fef9c3] border-[#fbbf24]">
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#fbbf24] hover:bg-[#fbbf24]">
                  <TableHead className="text-center text-[#0a1929]">No</TableHead>
                  <TableHead className="text-[#0a1929]">Estate</TableHead>
                  <TableHead className="text-[#0a1929]">Category</TableHead>
                  <TableHead className="text-[#0a1929]">Activities Name</TableHead>
                  <TableHead className="text-[#0a1929]">Farmer Group</TableHead>
                  <TableHead className="text-[#0a1929]">Village</TableHead>
                  <TableHead className="text-center text-[#0a1929]">Number of Farmer</TableHead>
                  <TableHead className="text-center text-[#0a1929]">Amount of Contribution</TableHead>
                  <TableHead className="text-center text-[#0a1929]">UoM</TableHead>
                  <TableHead className="text-center text-[#0a1929]">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activitiesData.map((activity) => (
                  <TableRow key={activity.no} className="hover:bg-[#fef9c3]/50">
                    <TableCell className="text-center">{activity.no}</TableCell>
                    <TableCell>{activity.estate}</TableCell>
                    <TableCell>{activity.category}</TableCell>
                    <TableCell>{activity.activitiesName}</TableCell>
                    <TableCell>{activity.farmerGroup}</TableCell>
                    <TableCell>{activity.village}</TableCell>
                    <TableCell className="text-center">{activity.numberOfFarmer}</TableCell>
                    <TableCell className="text-center">{activity.amountOfContribution}</TableCell>
                    <TableCell className="text-center">{activity.uom}</TableCell>
                    <TableCell className="text-center">{activity.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit2 size={20} />
              Edit Data {activeEstate} - Tahun {selectedYear}
            </DialogTitle>
          </DialogHeader>

          <Tabs value={editTab} onValueChange={setEditTab} className="w-full">
            <TabsList className="flex flex-wrap gap-2 h-auto justify-start bg-[#f3f4f6] p-2">
              <TabsTrigger value="profil" className="text-xs px-3 py-2">Profil</TabsTrigger>
              <TabsTrigger value="pelatihan" className="text-xs px-3 py-2">Pelatihan</TabsTrigger>
              <TabsTrigger value="pupuk" className="text-xs px-3 py-2">Pupuk</TabsTrigger>
              <TabsTrigger value="solid" className="text-xs px-3 py-2">Solid Waste</TabsTrigger>
              <TabsTrigger value="sppl" className="text-xs px-3 py-2">SPPL</TabsTrigger>
              <TabsTrigger value="apd" className="text-xs px-3 py-2">APD</TabsTrigger>
              <TabsTrigger value="shm" className="text-xs px-3 py-2">SHM</TabsTrigger>
              <TabsTrigger value="parit" className="text-xs px-3 py-2">Parit</TabsTrigger>
              <TabsTrigger value="jembatan" className="text-xs px-3 py-2">Jembatan</TabsTrigger>
              <TabsTrigger value="media" className="text-xs px-3 py-2">Media</TabsTrigger>
            </TabsList>

            {/* Tab: Profil Kemitraan Kebun */}
            <TabsContent value="profil" className="space-y-4 mt-16">
              <h3 className="text-lg font-semibold">Profil Kemitraan Kebun</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jumlahPetani">Jumlah Petani</Label>
                  <Input
                    id="jumlahPetani"
                    type="number"
                    value={editFormData.partnershipProfile?.jumlahPetani || ''}
                    onChange={(e) => handleFieldChange('partnershipProfile', 'jumlahPetani', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalLuas">Total Luas (ha)</Label>
                  <Input
                    id="totalLuas"
                    type="number"
                    step="0.01"
                    value={editFormData.partnershipProfile?.totalLuas || ''}
                    onChange={(e) => handleFieldChange('partnershipProfile', 'totalLuas', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jumlahDesa">Jumlah Desa</Label>
                  <Input
                    id="jumlahDesa"
                    type="number"
                    value={editFormData.partnershipProfile?.jumlahDesa || ''}
                    onChange={(e) => handleFieldChange('partnershipProfile', 'jumlahDesa', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kesesuaianTani">Jumlah Kelompok Tani</Label>
                  <Input
                    id="kesesuaianTani"
                    type="number"
                    value={editFormData.partnershipProfile?.kesesuaianTani || ''}
                    onChange={(e) => handleFieldChange('partnershipProfile', 'kesesuaianTani', Number(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Tab: Pelatihan BMP */}
            <TabsContent value="pelatihan" className="space-y-4 mt-16">
              <h3 className="text-lg font-semibold">Pelatihan Best Management Practice</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="trainingPetani">Jumlah Petani</Label>
                  <Input
                    id="trainingPetani"
                    type="number"
                    value={editFormData.trainingData?.jumlahPetani || ''}
                    onChange={(e) => handleFieldChange('trainingData', 'jumlahPetani', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jamPelatihan">Jam Pelatihan</Label>
                  <Input
                    id="jamPelatihan"
                    type="number"
                    value={editFormData.trainingData?.jamPelatihan || ''}
                    onChange={(e) => handleFieldChange('trainingData', 'jamPelatihan', Number(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Tab: Pupuk Kimia/Pestisida */}
            <TabsContent value="pupuk" className="space-y-4 mt-16">
              <h3 className="text-lg font-semibold">Pupuk Kimia/Pestisida</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pupukPetani">Jumlah Petani</Label>
                  <Input
                    id="pupukPetani"
                    type="number"
                    value={editFormData.fertilizerData?.jumlahPetani || ''}
                    onChange={(e) => handleFieldChange('fertilizerData', 'jumlahPetani', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pupukKontribusi">Total Kontribusi (kg)</Label>
                  <Input
                    id="pupukKontribusi"
                    type="number"
                    value={editFormData.fertilizerData?.totalKontribusi || ''}
                    onChange={(e) => handleFieldChange('fertilizerData', 'totalKontribusi', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pupukLuas">Luas Aplikasi (ha)</Label>
                  <Input
                    id="pupukLuas"
                    type="number"
                    value={editFormData.fertilizerData?.luasAplikasi || ''}
                    onChange={(e) => handleFieldChange('fertilizerData', 'luasAplikasi', Number(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Tab: Solid dan Janjang Kosong */}
            <TabsContent value="solid" className="space-y-4 mt-16">
              <h3 className="text-lg font-semibold">Solid dan Janjang Kosong</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="solidPetani">Jumlah Petani</Label>
                  <Input
                    id="solidPetani"
                    type="number"
                    value={editFormData.solidWasteData?.jumlahPetani || ''}
                    onChange={(e) => handleFieldChange('solidWasteData', 'jumlahPetani', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="solidKontribusi">Total Kontribusi (kg)</Label>
                  <Input
                    id="solidKontribusi"
                    type="number"
                    value={editFormData.solidWasteData?.totalKontribusi || ''}
                    onChange={(e) => handleFieldChange('solidWasteData', 'totalKontribusi', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="solidLuas">Luas Aplikasi (ha)</Label>
                  <Input
                    id="solidLuas"
                    type="number"
                    value={editFormData.solidWasteData?.luasAplikasi || ''}
                    onChange={(e) => handleFieldChange('solidWasteData', 'luasAplikasi', Number(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Tab: Pengurusan SPPL */}
            <TabsContent value="sppl" className="space-y-4 mt-16">
              <h3 className="text-lg font-semibold">Pengurusan SPPL - Surat Pernyataan Pengelolaan Lingkungan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="spplPetani">Jumlah Petani</Label>
                  <Input
                    id="spplPetani"
                    type="number"
                    value={editFormData.spplData?.jumlahPetani || ''}
                    onChange={(e) => handleFieldChange('spplData', 'jumlahPetani', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="spplLuas">Total Luas (ha)</Label>
                  <Input
                    id="spplLuas"
                    type="number"
                    value={editFormData.spplData?.totalLuas || ''}
                    onChange={(e) => handleFieldChange('spplData', 'totalLuas', Number(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Tab: Alat Kerja - APD */}
            <TabsContent value="apd" className="space-y-4 mt-16">
              <h3 className="text-lg font-semibold">Alat Kerja - Alat Pelindung Diri (APD)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="apdPetani">Jumlah Petani</Label>
                  <Input
                    id="apdPetani"
                    type="number"
                    value={editFormData.apdData?.jumlahPetani || ''}
                    onChange={(e) => handleFieldChange('apdData', 'jumlahPetani', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apdKontribusi">Total Kontribusi (unit)</Label>
                  <Input
                    id="apdKontribusi"
                    type="number"
                    value={editFormData.apdData?.totalKontribusi || ''}
                    onChange={(e) => handleFieldChange('apdData', 'totalKontribusi', Number(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Tab: Pengurusan SHM */}
            <TabsContent value="shm" className="space-y-4 mt-16">
              <h3 className="text-lg font-semibold">Pengurusan SHM</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shmPetani">Jumlah Petani</Label>
                  <Input
                    id="shmPetani"
                    type="number"
                    value={editFormData.shmData?.jumlahPetani || ''}
                    onChange={(e) => handleFieldChange('shmData', 'jumlahPetani', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shmLuas">Total Luas (ha)</Label>
                  <Input
                    id="shmLuas"
                    type="number"
                    value={editFormData.shmData?.totalLuas || ''}
                    onChange={(e) => handleFieldChange('shmData', 'totalLuas', Number(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Tab: Rawat Jalan/Parit */}
            <TabsContent value="parit" className="space-y-4 mt-16">
              <h3 className="text-lg font-semibold">Rawat Jalan/Parit</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paritPetani">Jumlah Petani</Label>
                  <Input
                    id="paritPetani"
                    type="number"
                    value={editFormData.drainageData?.jumlahPetani || ''}
                    onChange={(e) => handleFieldChange('drainageData', 'jumlahPetani', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paritLuas">Luas Rawat Jalan/Parit (ha)</Label>
                  <Input
                    id="paritLuas"
                    type="number"
                    value={editFormData.drainageData?.luasRawat || ''}
                    onChange={(e) => handleFieldChange('drainageData', 'luasRawat', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paritDesa">Jumlah Desa</Label>
                  <Input
                    id="paritDesa"
                    type="number"
                    value={editFormData.drainageData?.jumlahDesa || ''}
                    onChange={(e) => handleFieldChange('drainageData', 'jumlahDesa', Number(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Tab: Jembatan */}
            <TabsContent value="jembatan" className="space-y-4 mt-16">
              <h3 className="text-lg font-semibold">Jembatan</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jembatanPetani">Jumlah Petani</Label>
                  <Input
                    id="jembatanPetani"
                    type="number"
                    value={editFormData.bridgeData?.jumlahPetani || ''}
                    onChange={(e) => handleFieldChange('bridgeData', 'jumlahPetani', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jembatanKontribusi">Jumlah Kontribusi (ha)</Label>
                  <Input
                    id="jembatanKontribusi"
                    type="number"
                    value={editFormData.bridgeData?.jumlahKontribusi || ''}
                    onChange={(e) => handleFieldChange('bridgeData', 'jumlahKontribusi', Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jembatanDesa">Jumlah Desa</Label>
                  <Input
                    id="jembatanDesa"
                    type="number"
                    value={editFormData.bridgeData?.jumlahDesa || ''}
                    onChange={(e) => handleFieldChange('bridgeData', 'jumlahDesa', Number(e.target.value))}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Tab: Media Online */}
            <TabsContent value="media" className="space-y-4 mt-16">
              <h3 className="text-lg font-semibold">Media Online</h3>
              <div className="space-y-4">
                {editFormData.mediaLinks?.map((link: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`mediaLink${index}`}>Link Media {index + 1}</Label>
                    <Input
                      id={`mediaLink${index}`}
                      type="url"
                      value={link.link || ''}
                      onChange={(e) => {
                        const newLinks = [...editFormData.mediaLinks];
                        newLinks[index].link = e.target.value;
                        setEditFormData((prev: any) => ({
                          ...prev,
                          mediaLinks: newLinks
                        }));
                      }}
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
            >
              <X className="mr-2" size={16} />
              Batal
            </Button>
            <Button 
              onClick={handleSaveEdit}
              className="bg-[#10b981] hover:bg-[#059669] text-white"
            >
              <Save className="mr-2" size={16} />
              Simpan
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
