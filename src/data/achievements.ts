
export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  requirement: number;
  currentProgress: number;
  type: 'rounds' | 'cities' | 'modes' | 'special';
}

export const initialAchievements: Achievement[] = [
  {
    id: "first_steps",
    name: "Första steget",
    description: "Spela ditt första spel",
    emoji: "🎮",
    unlocked: false,
    requirement: 1,
    currentProgress: 0,
    type: "rounds"
  },
  {
    id: "city_explorer",
    name: "Stadsutforskare",
    description: "Spela båda städerna",
    emoji: "🗺️",
    unlocked: false,
    requirement: 2,
    currentProgress: 0,
    type: "cities"
  },
  {
    id: "party_animal",
    name: "Party animal",
    description: "Spela 25 rundor",
    emoji: "🎉",
    unlocked: false,
    requirement: 25,
    currentProgress: 0,
    type: "rounds"
  },
  {
    id: "never_have_i_ever_master",
    name: "Sannings-mästare",
    description: "Spela 'Jag har aldrig' 10 gånger",
    emoji: "🤫",
    unlocked: false,
    requirement: 10,
    currentProgress: 0,
    type: "modes"
  },
  {
    id: "completionist",
    name: "Fullständighetsnörd",
    description: "Spela 100 rundor totalt",
    emoji: "💯",
    unlocked: false,
    requirement: 100,
    currentProgress: 0,
    type: "rounds"
  }
];
