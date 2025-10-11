export const PREP_TIME = [
    { name: "10m", value: 10 },
    { name: "15m", value: 15 },
    { name: "30m", value: 30 },
    { name: "45m", value: 45 },
    { name: "1h", value: 60 },
    { name: "1h 15m", value: 75 },
    { name: "1h 30m", value: 90 },
    { name: "1h 45m", value: 105 },
    { name: "2h", value: 120 },
    { name: "More than 2h", value: 121 }
]

export interface PrepTimeType {
    name: string,
    value: number
}