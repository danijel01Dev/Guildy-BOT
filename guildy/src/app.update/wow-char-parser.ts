
export interface ParsedCharacter {
  name: string;
  spec: string;
}

export interface UnresolvedCharacter {
  name: string;
  className: string;
  raw: string;
}

export interface ParseResult {
  characters: ParsedCharacter[];
  unresolved: UnresolvedCharacter[];
}

const has = (text: string, regex: RegExp): boolean =>
  regex.test(text);

const patterns = {
  druid: /\b(druid|rdudu|rdudu|boomy|boomie|balance|bear\s*tank|cat|feral)\b/i,
  priest: /\b(priest|spriest|shadow|disco|disci|disc|discipline|holy\s*priest)\b/i,
  paladin: /\b(pala(?:din)?|hpala|hpal|ret|retri|retardin)\b/i,
  shaman: /\b(shaman|shammy|rsham|rshammy|ele|elemental|enha|enhancement|spellhance)\b/i,
  hunter: /\b(hunter|mm\s*hunt|bm\s*hunt|marksman|survival)\b/i,
  mage: /\b(mage|ttw|fmage|firemage|frost|arcane)\b/i,
  rogue: /\b(rogue|rog|crogue|combat|assa|assassin|subtlety)\b/i,
  dk: /\b(dk|death\s*knight|bdk|udk|unh|unholy|fdk|blood\s*\(?tank\)?)\b/i,
  warlock: /\b(warlock|demolock|demo|affli|affliction|destro|destruction)\b/i,
  warrior: /\b(warrior|fwar|fury|furry|arms)\b/i,
};

function detectSpecs(raw: string): string[] {
  const text = raw.toLowerCase();
  const specs = new Set<string>();

  const isDruid = patterns.druid.test(text);
  const isPriest = patterns.priest.test(text);
  const isPaladin = patterns.paladin.test(text);
  const isShaman = patterns.shaman.test(text);
  const isHunter = patterns.hunter.test(text);
  const isMage = patterns.mage.test(text);
  const isDK = patterns.dk.test(text);
  const isWarrior = patterns.warrior.test(text);

  // DRUID
  if (/\b(rdudu|resto\s*druid|restoration\s*druid)\b/i.test(raw)) {
    specs.add("Restoration Druid");
  }

  if (/\b(boomy|boomie|balance)\b/i.test(raw)) {
    specs.add("Balance Druid");
  }

  if (/\b(bear\s*tank|cat|feral)\b/i.test(raw)) {
    specs.add("Feral Druid");
  }

  // PRIEST
  if (/\b(spriest|shadow)\b/i.test(raw) && isPriest) {
    specs.add("Shadow Priest");
  }

  if (/\b(disco|disci|disc|discipline)\b/i.test(raw) && isPriest) {
    specs.add("Discipline Priest");
  }

  if (/\bholy\b/i.test(raw) && isPriest) {
    specs.add("Holy Priest");
  }

  // PALADIN
  if (/\b(hpala|hpal|holy\s*pala(?:din)?)\b/i.test(raw)) {
    specs.add("Holy Paladin");
  }

  if (/\b(ret|retri|retardin)\b/i.test(raw) && (isPaladin || /\bret\b/i.test(raw))) {
    specs.add("Retribution Paladin");
  }

  if (/\bprot\b/i.test(raw) && isPaladin) {
    specs.add("Protection Paladin");
  }

  // SHAMAN
  if (/\b(rshammy|rsham|resto\s*sham(?:my|an)?|restoration\s*shaman)\b/i.test(raw)) {
    specs.add("Restoration Shaman");
  }

  if (/\b(ele|elemental)\b/i.test(raw) && isShaman) {
    specs.add("Elemental Shaman");
  }

  if (/\b(enha|enhancement|spellhance)\b/i.test(raw)) {
    specs.add("Enhancement Shaman");
  }

  // HUNTER
 if (/\b(mm|mm\s*hunt|marksman|marksmanship)\b/i.test(raw)) {
  specs.add("Marksmanship Hunter");
}
  if (/\b(bm|beast\s*mastery)\b/i.test(raw) && isHunter) {
    specs.add("Beast Mastery Hunter");
  }

  if (/\bsurvival\b/i.test(raw)) {
    specs.add("Survival Hunter");
  }

  // MAGE
  if (/\b(ttw|fmage|fire\s*mage|firemage)\b/i.test(raw)) {
    specs.add("Fire Mage");
  }

  if (/\bfrost\b/i.test(raw) && isMage) {
    specs.add("Frost Mage");
  }

  if (/\barcane\b/i.test(raw) && isMage) {
    specs.add("Arcane Mage");
  }

  // ROGUE
  if (/\b(rogue|rog|crogue|combat)\b/i.test(raw)) {
    specs.add("Combat Rogue");
  }

  if (/\b(assa|assassin|assassination)\b/i.test(raw)) {
    specs.add("Assassination Rogue");
  }
  if (/\b(resto)\b/i.test(raw) && isDruid) {
  specs.add("Restoration Druid");
}

if (/(?<![a-z])sp\b/i.test(raw) && isPriest) {
  specs.add("Shadow Priest");
}

  if (/\b(sub|subtlety)\b/i.test(raw)) {
    specs.add("Subtlety Rogue");
  }

 if (/\b(bdk|blood)\b/i.test(raw) && isDK) {
  specs.add("Blood DK");
}

if (/\b(uh|unh|unholy|udk)\b/i.test(raw) && isDK) {
  specs.add("Unholy DK");
}

if (/\b(fdk|frost\s*dk|frost\s*death\s*knight)\b/i.test(raw) && isDK) {
  specs.add("Frost DK");
}

  // WARLOCK
  if (/\b(demo|demolock|demonology)\b/i.test(raw)) {
    specs.add("Demonology Warlock");
  }

  if (/\b(affli|affliction)\b/i.test(raw)) {
    specs.add("Affliction Warlock");
  }

  if (/\b(destro|destruction)\b/i.test(raw)) {
    specs.add("Destruction Warlock");
  }

  // WARRIOR
  if (/\b(fwar|fury|furry)\b/i.test(raw)) {
    specs.add("Fury Warrior");
  }

  if (/\barms\b/i.test(raw)) {
    specs.add("Arms Warrior");
  }

  if (/\bprot\b/i.test(raw) && isWarrior) {
    specs.add("Protection Warrior");
  }

  return [...specs];
}

function detectUnknownClass(raw: string): string | null {
  if (/\bhunter\b/i.test(raw)) return "Hunter";

  if (/\bwarrior\b/i.test(raw) && !patterns.warrior.test(raw.replace(/\bwarrior\b/i, ""))) {
    return "Warrior";
  }

  if (/\bmage\b/i.test(raw) && !/\b(ttw|fmage|fire|frost|arcane)\b/i.test(raw)) {
    return "Mage";
  }

  if (/\brogue\b/i.test(raw) && !/\brogue\b/i.test(raw.replace(/\brogue\b/i, ""))) {
    return "Rogue";
  }

  return null;
}

export function parseCharacters(input: string): ParseResult {
  const characters: ParsedCharacter[] = [];
  const unresolved: UnresolvedCharacter[] = [];

  const seen = new Set<string>();

  const lines = input
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);

  for (const originalLine of lines) {
    // Supports: CharacterName --> text
    // Supports: CharacterName - text
    const match = originalLine.match(
  /^\s*(?:\d+\.\s*)?([a-z][a-z0-9_-]*)\s*(?:-->| - |:|\s+(?=\d+(?:\.\d+)?k?\b))\s*(.+)$/i
);

    if (!match) continue;

    const name = match[1];
    
    const raw = match[2];

// Ignoriši sve poslije OS oznake
const mainRaw = raw.split(/\bOS\b/i)[0];

const specs = detectSpecs(mainRaw);

   
   const mainSpec = specs[0];

if (mainSpec) {
  const key = `${name.toLowerCase()}|${mainSpec}`;

  if (!seen.has(key)) {
    seen.add(key);
    characters.push({ name, spec: mainSpec });
  }
}
    if (specs.length === 0) {
      const className = detectUnknownClass(raw);

      if (className) {
        unresolved.push({ name, className, raw });
      }
    }
  }
  

  return { characters, unresolved };
}
