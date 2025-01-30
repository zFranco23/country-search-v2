
export interface CountryFlag {
    alt: string;
    png: string;
    svg: string
}
export interface CountryName {
    common: string;
    official: string;
    nativeName: Record<string,{
        official: string;
        common: string;
    }>
}
export interface MiniCountry  {
    name: CountryName,
    capital: Array<string>
    region: string,
    population: number
    flags: CountryFlag
    cca3: string
}


export interface Country {
    name:         Name;
    borders:      string[]
    tld:          string[];
    cca2:         string;
    ccn3:         string;
    cca3:         string;
    independent:  boolean;
    status:       string;
    unMember:     boolean;
    currencies:   Record<string, {name: string, symbol: string}>;
    idd:          Idd;
    capital:      string[];
    altSpellings: string[];
    region:       string;
    languages:    Record<string, string>;
    translations: { [key: string]: Translation };
    latlng:       number[];
    landlocked:   boolean;
    area:         number;
    demonyms:     Demonyms;
    maps:         Maps;
    population:   number;
    car:          Car;
    timezones:    string[];
    continents:   string[];
    flags:        Flags;
    coatOfArms:   CoatOfArms;
    startOfWeek:  string;
    capitalInfo:  CapitalInfo;
}

export interface CapitalInfo {
    latlng: number[];
}

export interface Car {
    signs: string[];
    side:  string;
}

export interface CoatOfArms {
}

export interface Currencies {
    SHP: Shp;
}

export interface Shp {
    name:   string;
    symbol: string;
}

export interface Demonyms {
    eng: Eng;
}

export interface Eng {
    f: string;
    m: string;
}

export interface Flags {
    png: string;
    svg: string;
}

export interface Idd {
    root:     string;
    suffixes: string[];
}


export interface Maps {
    googleMaps:     string;
    openStreetMaps: string;
}

export interface Name {
    common:     string;
    official:   string;
    nativeName: NativeName;
}

export interface NativeName {
    eng: Translation;
}

export interface Translation {
    official: string;
    common:   string;
}

export interface CountryBorder {
    name: CountryName
    cca3: string
}