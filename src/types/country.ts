
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