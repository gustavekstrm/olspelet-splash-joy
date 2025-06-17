
export interface Question {
  id: string;
  text: string;
  emoji: string;
}

export interface City {
  id: string;
  name: string;
  emoji: string;
  description: string;
  questions: Question[];
}

export const cities: City[] = [
  {
    id: "orebro",
    name: "Örebro",
    emoji: "🏰",
    description: "Lokala referenser från Sveriges hjärta",
    questions: [
      { id: "o1", text: "Drick om du någonsin varit på Stora Torget en fredag kväll!", emoji: "🍺" },
      { id: "o2", text: "Alla som bott på Vivalla dricker dubbelt!", emoji: "🏠" },
      { id: "o3", text: "Drick om du vet vart Svampen är!", emoji: "🍄" },
      { id: "o4", text: "Den som varit på Conventum senast dricker!", emoji: "🏢" },
      { id: "o5", text: "Drick om du gått över Storbron idag!", emoji: "🌉" },
      { id: "o6", text: "Alla som handlat på Krämaren dricker!", emoji: "🛍️" },
      { id: "o7", text: "Drick om du varit på Örebro Hockey match!", emoji: "🏒" },
      { id: "o8", text: "Den som bott längst i Örebro väljer vem som dricker!", emoji: "👑" }
    ]
  },
  {
    id: "uppsala",
    name: "Uppsala",
    emoji: "🎓",
    description: "Studentstadens klassiker",
    questions: [
      { id: "u1", text: "Drick om du någonsin sprungit Fyrisån runt!", emoji: "🏃" },
      { id: "u2", text: "Alla som varit på Carolinabacken dricker!", emoji: "⛰️" },
      { id: "u3", text: "Drick om du vet vad Flogsta scream är!", emoji: "😱" },
      { id: "u4", text: "Den som gått på Uppsala Universitet dricker dubbelt!", emoji: "🎓" },
      { id: "u5", text: "Drick om du varit på Valsala Nation!", emoji: "🏛️" },
      { id: "u6", text: "Alla som bott i Flogsta dricker!", emoji: "🏠" },
      { id: "u7", text: "Drick om du klättrat på Domkyrkan!", emoji: "⛪" },
      { id: "u8", text: "Den som varit på flest nationer väljer vem som dricker!", emoji: "🍻" }
    ]
  }
];

export const neverHaveIEverQuestions: Question[] = [
  { id: "n1", text: "Jag har aldrig... somnat på en fest", emoji: "😴" },
  { id: "n2", text: "Jag har aldrig... kysst någon på första dejten", emoji: "💋" },
  { id: "n3", text: "Jag har aldrig... skickat fel meddelande till fel person", emoji: "📱" },
  { id: "n4", text: "Jag har aldrig... glömt var jag parkerat bilen", emoji: "🚗" },
  { id: "n5", text: "Jag har aldrig... ljugit om min ålder", emoji: "🎂" },
  { id: "n6", text: "Jag har aldrig... sjungit karaoke", emoji: "🎤" },
  { id: "n7", text: "Jag har aldrig... ätit mat som fallit på golvet", emoji: "🍕" },
  { id: "n8", text: "Jag har aldrig... somnat under en film på bio", emoji: "🎬" },
  { id: "n9", text: "Jag har aldrig... dansat på ett bord", emoji: "💃" },
  { id: "n10", text: "Jag har aldrig... ringt fel nummer med flit", emoji: "☎️" }
];
