/**
 * Official Emprise Academy Gallery Dataset
 * Source: 59 verified campus and academic photographs
 */

export interface GalleryImage {
  id: string;
  slug: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  aspectRatio: number;
  orientation: 'landscape' | 'portrait' | 'panoramic';
  originalFileName: string;
}

export type GalleryCategory = "photo" | "media" | "video";

export interface GalleryCategoryMeta {
  id: GalleryCategory;
  title: string;
  description: string;
  iconName: "Camera" | "Newspaper" | "PlayCircle";
  href: string;
  step: string;
  badge?: string;
}

export const GALLERY_CATEGORIES: GalleryCategoryMeta[] = [
  {
    id: "photo",
    title: "Photo Gallery",
    description: "Campus, students & academy moments",
    iconName: "Camera",
    href: "/gallery",
    step: "01",
    badge: "59 Photos",
  },
  {
    id: "media",
    title: "Media Gallery",
    description: "Press features & publications",
    iconName: "Newspaper",
    href: "/gallery/media",
    step: "02",
    badge: "125 Clippings",
  },
  {
    id: "video",
    title: "Video Gallery",
    description: "Campus tours & event highlights",
    iconName: "PlayCircle",
    href: "/gallery/videos",
    step: "03",
  },
];

export const OFFICIAL_GALLERY_IMAGES: GalleryImage[] = [
  {
    "id": "gal-01",
    "slug": "emprise-gallery-01",
    "src": "/gallery/emprise-gallery-01.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 01)",
    "width": 800,
    "height": 531,
    "aspectRatio": 1.507,
    "orientation": "landscape",
    "originalFileName": "10014760_10203761551777782_2418968009931322769_o.jpg"
  },
  {
    "id": "gal-02",
    "slug": "emprise-gallery-02",
    "src": "/gallery/emprise-gallery-02.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 02)",
    "width": 800,
    "height": 531,
    "aspectRatio": 1.507,
    "orientation": "landscape",
    "originalFileName": "1004615_562254143837685_1996267320_n.jpg"
  },
  {
    "id": "gal-03",
    "slug": "emprise-gallery-03",
    "src": "/gallery/emprise-gallery-03.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 03)",
    "width": 800,
    "height": 531,
    "aspectRatio": 1.507,
    "orientation": "landscape",
    "originalFileName": "10271242_10203897652700220_6988523724657034302_o.jpg"
  },
  {
    "id": "gal-04",
    "slug": "emprise-gallery-04",
    "src": "/gallery/emprise-gallery-04.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 04)",
    "width": 800,
    "height": 532,
    "aspectRatio": 1.504,
    "orientation": "landscape",
    "originalFileName": "10495312_10207098051708195_6147197949908532170_o.jpg"
  },
  {
    "id": "gal-05",
    "slug": "emprise-gallery-05",
    "src": "/gallery/emprise-gallery-05.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 05)",
    "width": 800,
    "height": 532,
    "aspectRatio": 1.504,
    "orientation": "landscape",
    "originalFileName": "10557058_10207097968946126_1304880470419251229_o.jpg"
  },
  {
    "id": "gal-06",
    "slug": "emprise-gallery-06",
    "src": "/gallery/emprise-gallery-06.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 06)",
    "width": 800,
    "height": 552,
    "aspectRatio": 1.449,
    "orientation": "landscape",
    "originalFileName": "11.jpg"
  },
  {
    "id": "gal-07",
    "slug": "emprise-gallery-07",
    "src": "/gallery/emprise-gallery-07.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 07)",
    "width": 800,
    "height": 532,
    "aspectRatio": 1.504,
    "orientation": "landscape",
    "originalFileName": "11415497_10207097953825748_5840141792614675937_o.jpg"
  },
  {
    "id": "gal-08",
    "slug": "emprise-gallery-08",
    "src": "/gallery/emprise-gallery-08.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 08)",
    "width": 800,
    "height": 450,
    "aspectRatio": 1.778,
    "orientation": "landscape",
    "originalFileName": "12.jpg"
  },
  {
    "id": "gal-09",
    "slug": "emprise-gallery-09",
    "src": "/gallery/emprise-gallery-09.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 09)",
    "width": 800,
    "height": 450,
    "aspectRatio": 1.778,
    "orientation": "landscape",
    "originalFileName": "13.jpg"
  },
  {
    "id": "gal-10",
    "slug": "emprise-gallery-10",
    "src": "/gallery/emprise-gallery-10.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 10)",
    "width": 800,
    "height": 531,
    "aspectRatio": 1.507,
    "orientation": "landscape",
    "originalFileName": "13305117_1209876639036252_3811844690714688779_o.jpg"
  },
  {
    "id": "gal-11",
    "slug": "emprise-gallery-11",
    "src": "/gallery/emprise-gallery-11.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 11)",
    "width": 800,
    "height": 531,
    "aspectRatio": 1.507,
    "orientation": "landscape",
    "originalFileName": "13323404_1209878199036096_89142143924144140_o.jpg"
  },
  {
    "id": "gal-12",
    "slug": "emprise-gallery-12",
    "src": "/gallery/emprise-gallery-12.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 12)",
    "width": 800,
    "height": 531,
    "aspectRatio": 1.507,
    "orientation": "landscape",
    "originalFileName": "13329475_1209877045702878_1993922833964472779_o.jpg"
  },
  {
    "id": "gal-13",
    "slug": "emprise-gallery-13",
    "src": "/gallery/emprise-gallery-13.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 13)",
    "width": 800,
    "height": 531,
    "aspectRatio": 1.507,
    "orientation": "landscape",
    "originalFileName": "13411692_10209824036056100_313296570437211343_o.jpg"
  },
  {
    "id": "gal-14",
    "slug": "emprise-gallery-14",
    "src": "/gallery/emprise-gallery-14.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 14)",
    "width": 800,
    "height": 531,
    "aspectRatio": 1.507,
    "orientation": "landscape",
    "originalFileName": "13412061_10209823919653190_3287560083739207853_o.jpg"
  },
  {
    "id": "gal-15",
    "slug": "emprise-gallery-15",
    "src": "/gallery/emprise-gallery-15.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 15)",
    "width": 800,
    "height": 532,
    "aspectRatio": 1.504,
    "orientation": "landscape",
    "originalFileName": "1398971_10207097956945826_2664227675929168181_o.jpg"
  },
  {
    "id": "gal-16",
    "slug": "emprise-gallery-16",
    "src": "/gallery/emprise-gallery-16.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 16)",
    "width": 800,
    "height": 531,
    "aspectRatio": 1.507,
    "orientation": "landscape",
    "originalFileName": "1501265_10203761565298120_5711108789022553683_o.jpg"
  },
  {
    "id": "gal-17",
    "slug": "emprise-gallery-17",
    "src": "/gallery/emprise-gallery-17.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 17)",
    "width": 800,
    "height": 532,
    "aspectRatio": 1.504,
    "orientation": "landscape",
    "originalFileName": "1613994_10207097952185707_7208226341806302650_o.jpg"
  },
  {
    "id": "gal-18",
    "slug": "emprise-gallery-18",
    "src": "/gallery/emprise-gallery-18.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 18)",
    "width": 800,
    "height": 532,
    "aspectRatio": 1.504,
    "orientation": "landscape",
    "originalFileName": "19143742_10213422239248931_8476234974679099974_o.jpg"
  },
  {
    "id": "gal-19",
    "slug": "emprise-gallery-19",
    "src": "/gallery/emprise-gallery-19.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 19)",
    "width": 800,
    "height": 1067,
    "aspectRatio": 0.75,
    "orientation": "portrait",
    "originalFileName": "19222604_1569738319755924_6271166121956242153_o.jpg"
  },
  {
    "id": "gal-20",
    "slug": "emprise-gallery-20",
    "src": "/gallery/emprise-gallery-20.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 20)",
    "width": 800,
    "height": 532,
    "aspectRatio": 1.504,
    "orientation": "landscape",
    "originalFileName": "1962174_10207098017787347_1412104431018123589_o.jpg"
  },
  {
    "id": "gal-21",
    "slug": "emprise-gallery-21",
    "src": "/gallery/emprise-gallery-21.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 21)",
    "width": 800,
    "height": 532,
    "aspectRatio": 1.504,
    "orientation": "landscape",
    "originalFileName": "19702791_1597940100229902_7570823470893559038_o.jpg"
  },
  {
    "id": "gal-22",
    "slug": "emprise-gallery-22",
    "src": "/gallery/emprise-gallery-22.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 22)",
    "width": 800,
    "height": 600,
    "aspectRatio": 1.333,
    "orientation": "landscape",
    "originalFileName": "19756753_1599163110107601_2637343166800469193_n.jpg"
  },
  {
    "id": "gal-23",
    "slug": "emprise-gallery-23",
    "src": "/gallery/emprise-gallery-23.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 23)",
    "width": 800,
    "height": 532,
    "aspectRatio": 1.504,
    "orientation": "landscape",
    "originalFileName": "19780732_1597946376895941_8225990292228848624_o.jpg"
  },
  {
    "id": "gal-24",
    "slug": "emprise-gallery-24",
    "src": "/gallery/emprise-gallery-24.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 24)",
    "width": 800,
    "height": 531,
    "aspectRatio": 1.507,
    "orientation": "landscape",
    "originalFileName": "1980299_10203761554657854_3353244434113242359_o (1).jpg"
  },
  {
    "id": "gal-25",
    "slug": "emprise-gallery-25",
    "src": "/gallery/emprise-gallery-25.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 25)",
    "width": 800,
    "height": 531,
    "aspectRatio": 1.507,
    "orientation": "landscape",
    "originalFileName": "1980485_10203761564138091_1203639677451375766_o.jpg"
  },
  {
    "id": "gal-26",
    "slug": "emprise-gallery-26",
    "src": "/gallery/emprise-gallery-26.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 26)",
    "width": 800,
    "height": 351,
    "aspectRatio": 2.279,
    "orientation": "panoramic",
    "originalFileName": "19894925_1599165576774021_7401897369875092818_n.jpg"
  },
  {
    "id": "gal-27",
    "slug": "emprise-gallery-27",
    "src": "/gallery/emprise-gallery-27.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 27)",
    "width": 800,
    "height": 532,
    "aspectRatio": 1.504,
    "orientation": "landscape",
    "originalFileName": "19942814_1597939853563260_7918806812249366480_o.jpg"
  },
  {
    "id": "gal-28",
    "slug": "emprise-gallery-28",
    "src": "/gallery/emprise-gallery-28.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 28)",
    "width": 800,
    "height": 532,
    "aspectRatio": 1.504,
    "orientation": "landscape",
    "originalFileName": "19944211_1597943623562883_2303642447782833142_o.jpg"
  },
  {
    "id": "gal-29",
    "slug": "emprise-gallery-29",
    "src": "/gallery/emprise-gallery-29.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 29)",
    "width": 800,
    "height": 374,
    "aspectRatio": 2.139,
    "orientation": "panoramic",
    "originalFileName": "2.jpg"
  },
  {
    "id": "gal-30",
    "slug": "emprise-gallery-30",
    "src": "/gallery/emprise-gallery-30.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 30)",
    "width": 800,
    "height": 576,
    "aspectRatio": 1.389,
    "orientation": "landscape",
    "originalFileName": "20260217_165828 (1).jpg"
  },
  {
    "id": "gal-31",
    "slug": "emprise-gallery-31",
    "src": "/gallery/emprise-gallery-31.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 31)",
    "width": 800,
    "height": 600,
    "aspectRatio": 1.333,
    "orientation": "landscape",
    "originalFileName": "20260217_170222 (1) (1).jpg"
  },
  {
    "id": "gal-32",
    "slug": "emprise-gallery-32",
    "src": "/gallery/emprise-gallery-32.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 32)",
    "width": 800,
    "height": 533,
    "aspectRatio": 1.501,
    "orientation": "landscape",
    "originalFileName": "20626700_1631173176906594_8309092620908297340_o.jpg"
  },
  {
    "id": "gal-33",
    "slug": "emprise-gallery-33",
    "src": "/gallery/emprise-gallery-33.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 33)",
    "width": 800,
    "height": 600,
    "aspectRatio": 1.333,
    "orientation": "landscape",
    "originalFileName": "23632763_10214868880814066_5949544337315172658_o.jpg"
  },
  {
    "id": "gal-34",
    "slug": "emprise-gallery-34",
    "src": "/gallery/emprise-gallery-34.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 34)",
    "width": 800,
    "height": 533,
    "aspectRatio": 1.501,
    "orientation": "landscape",
    "originalFileName": "27657513_10215540354880498_5092707419292432976_n.jpg"
  },
  {
    "id": "gal-35",
    "slug": "emprise-gallery-35",
    "src": "/gallery/emprise-gallery-35.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 35)",
    "width": 800,
    "height": 456,
    "aspectRatio": 1.754,
    "orientation": "landscape",
    "originalFileName": "3.jpg"
  },
  {
    "id": "gal-36",
    "slug": "emprise-gallery-36",
    "src": "/gallery/emprise-gallery-36.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 36)",
    "width": 800,
    "height": 532,
    "aspectRatio": 1.504,
    "orientation": "landscape",
    "originalFileName": "34344584_10213710016517929_5028881510720077824_n.jpg"
  },
  {
    "id": "gal-37",
    "slug": "emprise-gallery-37",
    "src": "/gallery/emprise-gallery-37.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 37)",
    "width": 800,
    "height": 492,
    "aspectRatio": 1.626,
    "orientation": "landscape",
    "originalFileName": "362280444_10231675766455703_8016632950746550727_n.jpg"
  },
  {
    "id": "gal-38",
    "slug": "emprise-gallery-38",
    "src": "/gallery/emprise-gallery-38.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 38)",
    "width": 800,
    "height": 533,
    "aspectRatio": 1.501,
    "orientation": "landscape",
    "originalFileName": "36245016_10216766736939283_5568571506109186048_n.jpg"
  },
  {
    "id": "gal-39",
    "slug": "emprise-gallery-39",
    "src": "/gallery/emprise-gallery-39.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 39)",
    "width": 800,
    "height": 533,
    "aspectRatio": 1.501,
    "orientation": "landscape",
    "originalFileName": "362691738_10231675848417752_7077879464007734557_n.jpg"
  },
  {
    "id": "gal-40",
    "slug": "emprise-gallery-40",
    "src": "/gallery/emprise-gallery-40.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 40)",
    "width": 800,
    "height": 451,
    "aspectRatio": 1.774,
    "orientation": "landscape",
    "originalFileName": "362977454_10231675762415602_8590854682093164021_n.jpg"
  },
  {
    "id": "gal-41",
    "slug": "emprise-gallery-41",
    "src": "/gallery/emprise-gallery-41.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 41)",
    "width": 800,
    "height": 533,
    "aspectRatio": 1.501,
    "orientation": "landscape",
    "originalFileName": "362983129_10231675767215722_6107383227158325755_n.jpg"
  },
  {
    "id": "gal-42",
    "slug": "emprise-gallery-42",
    "src": "/gallery/emprise-gallery-42.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 42)",
    "width": 800,
    "height": 482,
    "aspectRatio": 1.66,
    "orientation": "landscape",
    "originalFileName": "364037802_10231675830857313_7391700565666923671_n.jpg"
  },
  {
    "id": "gal-43",
    "slug": "emprise-gallery-43",
    "src": "/gallery/emprise-gallery-43.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 43)",
    "width": 766,
    "height": 487,
    "aspectRatio": 1.573,
    "orientation": "landscape",
    "originalFileName": "4.jpg"
  },
  {
    "id": "gal-44",
    "slug": "emprise-gallery-44",
    "src": "/gallery/emprise-gallery-44.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 44)",
    "width": 800,
    "height": 530,
    "aspectRatio": 1.509,
    "orientation": "landscape",
    "originalFileName": "457689_362547270475041_1996575458_o.jpg"
  },
  {
    "id": "gal-45",
    "slug": "emprise-gallery-45",
    "src": "/gallery/emprise-gallery-45.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 45)",
    "width": 800,
    "height": 600,
    "aspectRatio": 1.333,
    "orientation": "landscape",
    "originalFileName": "5.jpg"
  },
  {
    "id": "gal-46",
    "slug": "emprise-gallery-46",
    "src": "/gallery/emprise-gallery-46.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 46)",
    "width": 800,
    "height": 384,
    "aspectRatio": 2.083,
    "orientation": "panoramic",
    "originalFileName": "6.jpg"
  },
  {
    "id": "gal-47",
    "slug": "emprise-gallery-47",
    "src": "/gallery/emprise-gallery-47.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 47)",
    "width": 800,
    "height": 343,
    "aspectRatio": 2.332,
    "orientation": "panoramic",
    "originalFileName": "7.jpg"
  },
  {
    "id": "gal-48",
    "slug": "emprise-gallery-48",
    "src": "/gallery/emprise-gallery-48.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 48)",
    "width": 800,
    "height": 506,
    "aspectRatio": 1.581,
    "orientation": "landscape",
    "originalFileName": "8.jpg"
  },
  {
    "id": "gal-49",
    "slug": "emprise-gallery-49",
    "src": "/gallery/emprise-gallery-49.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 49)",
    "width": 800,
    "height": 600,
    "aspectRatio": 1.333,
    "orientation": "landscape",
    "originalFileName": "9.jpg"
  },
  {
    "id": "gal-50",
    "slug": "emprise-gallery-50",
    "src": "/gallery/emprise-gallery-50.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 50)",
    "width": 800,
    "height": 531,
    "aspectRatio": 1.507,
    "orientation": "landscape",
    "originalFileName": "998423_562258263837273_1547596844_n.jpg"
  },
  {
    "id": "gal-51",
    "slug": "emprise-gallery-51",
    "src": "/gallery/emprise-gallery-51.jpg",
    "alt": "Emprise Academy Mathura campus building facade (Photo 51)",
    "width": 800,
    "height": 600,
    "aspectRatio": 1.333,
    "orientation": "landscape",
    "originalFileName": "FRONT NEW.jpeg"
  },
  {
    "id": "gal-52",
    "slug": "emprise-gallery-52",
    "src": "/gallery/emprise-gallery-52.jpg",
    "alt": "Emprise Academy Mathura campus building facade (Photo 52)",
    "width": 800,
    "height": 600,
    "aspectRatio": 1.333,
    "orientation": "landscape",
    "originalFileName": "FRONT WEB.jpeg"
  },
  {
    "id": "gal-53",
    "slug": "emprise-gallery-53",
    "src": "/gallery/emprise-gallery-53.jpg",
    "alt": "Emprise Academy Mathura campus building facade (Photo 53)",
    "width": 800,
    "height": 533,
    "aspectRatio": 1.501,
    "orientation": "landscape",
    "originalFileName": "FRONT.jpeg"
  },
  {
    "id": "gal-54",
    "slug": "emprise-gallery-54",
    "src": "/gallery/emprise-gallery-54.jpg",
    "alt": "Emprise Academy Mathura campus building facade (Photo 54)",
    "width": 800,
    "height": 533,
    "aspectRatio": 1.501,
    "orientation": "landscape",
    "originalFileName": "FRONT.jpg"
  },
  {
    "id": "gal-55",
    "slug": "emprise-gallery-55",
    "src": "/gallery/emprise-gallery-55.jpg",
    "alt": "Emprise Academy student felicitation and result celebration moments (Photo 55)",
    "width": 800,
    "height": 360,
    "aspectRatio": 2.222,
    "orientation": "panoramic",
    "originalFileName": "RESULT CELEBRATION.jpg"
  },
  {
    "id": "gal-56",
    "slug": "emprise-gallery-56",
    "src": "/gallery/emprise-gallery-56.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 56)",
    "width": 800,
    "height": 524,
    "aspectRatio": 1.527,
    "orientation": "landscape",
    "originalFileName": "WhatsApp Image 2025-04-19 at 12.39.47_787603e5.jpg"
  },
  {
    "id": "gal-57",
    "slug": "emprise-gallery-57",
    "src": "/gallery/emprise-gallery-57.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 57)",
    "width": 800,
    "height": 360,
    "aspectRatio": 2.222,
    "orientation": "panoramic",
    "originalFileName": "WhatsApp Image 2025-06-15 at 21.35.39.jpeg"
  },
  {
    "id": "gal-58",
    "slug": "emprise-gallery-58",
    "src": "/gallery/emprise-gallery-58.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 58)",
    "width": 800,
    "height": 478,
    "aspectRatio": 1.674,
    "orientation": "landscape",
    "originalFileName": "WhatsApp Image 2025-12-05 at 10.59.10 AM (1).jpeg"
  },
  {
    "id": "gal-59",
    "slug": "emprise-gallery-59",
    "src": "/gallery/emprise-gallery-59.jpg",
    "alt": "Emprise Academy campus and student academic life photograph (Photo 59)",
    "width": 800,
    "height": 533,
    "aspectRatio": 1.501,
    "orientation": "landscape",
    "originalFileName": "WhatsApp Image 2025-12-05 at 12.17.07 PM.jpeg"
  }
];

/**
 * Curated subset for Homepage Marquee (Row 1 & Row 2)
 * Ensures a balanced mix of aspect ratios without excessive DOM weight
 */
export const HOMEPAGE_MARQUEE_ROW_1: GalleryImage[] = OFFICIAL_GALLERY_IMAGES.slice(0, 16);
export const HOMEPAGE_MARQUEE_ROW_2: GalleryImage[] = OFFICIAL_GALLERY_IMAGES.slice(16, 32);
