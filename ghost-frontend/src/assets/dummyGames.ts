export type Game = {
  id: string;
  name: string;
  uploader: string;
  uploaderImg: string;
  date: string;
  image: string;
  achievements: string[];
  screenshots: string[];
};

export const dummyGames: Game[] = [
  {
    id: "1",
    name: "Spider Man: Miles Morales",
    uploader: "PlayerX",
    uploaderImg: "https://i.pravatar.cc/40?img=2",
    date: "Aug 10, 2025",
    image:
      "https://www.denofgeek.com/wp-content/uploads/2020/11/spider-man-miles-morales-ending-spoilers.jpg?resize=768%2C432",
    achievements: [
      "Accounts Linked: (Link would be provided after purchase).",
      "Web-Shooters: Increases max Web-Shooter ammo capacity by 2.",
      "Holo-Drone: Increases the damage done by a Holo-Drone.",
      "Remote Mine: Increases the Remote Mine’s knockout capacity when attached to a fuse box.",
    ],
    screenshots: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3NJOwUGTgV-e_T4E-T9KbcjCH_aCIWgqGow&s",
      "https://gamingbolt.com/wp-content/uploads/2020/09/marvels-spider-man-miles-morales-image-3-1.jpg",
      "https://www.psu.com/wp/wp-content/uploads/2020/11/marvels-spider-man-miles-morales-review-ps4.jpg",
    ],
  },
  {
    id: "2",
    name: "FIFA 25",
    uploader: "ProGamer22",
    uploaderImg: "https://i.pravatar.cc/40?img=12",
    date: "Aug 20, 2025",
    image: "https://sm.ign.com/ign_nordic/news/f/fc-25-deve/fc-25-developers-say-they-welcome-a-true-competitor-with-a-n_2xh2.jpg",
    achievements: [
      "Ultimate Team Starter Pack",
      "Division 3 Rank",
      "Stadium Tifo Set",
    ],
    screenshots: [
      "https://www.fifa-infinity.com/wp-content/uploads/2025/05/palmer-card-stats-eafc.jpg",
      "https://www.operationsports.com/wp-content/uploads/2019/12/FIFA-20-FUT-Hub-In-Menus_35-scaled-e1575871978245.jpg?resize=1000%2C410",
      "https://preview.redd.it/is-fc-25s-menu-the-worst-in-fc-fifa-history-v0-gxruidz4were1.jpeg?width=1080&crop=smart&auto=webp&s=68e6454b08530336e57f501a6618a5a78ae78b34",
    ],
  },
  {
    id: "3",
    name: "Elden Ring",
    uploader: "DarkSoulz",
    uploaderImg: "https://i.pravatar.cc/40?img=25",
    date: "Aug 15, 2025",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg?t=1748630546",
    achievements: [
      "Level 120 Build",
      "All Maps Unlocked",
      "Rivers of Blood +10",
    ],
    screenshots: [
      "https://thegemsbok.com/wp-content/uploads/2022/04/Elden-Ring-screenshot-with-draconic-tree-sentinel.png",
      "https://www.gamespot.com/a/uploads/original/679/6794662/3950772-eldenring%E2%84%A2_20220309125306.jpg",
      "https://cdn.mos.cms.futurecdn.net/PjhveTjTLLAvSuSeZsjGsJ-1200-80.jpg",
    ],
  },
];
