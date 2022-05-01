export class ForecastDay {
    date: string;
    avgtemp_c: number;
    totalprecip_mm: number;

    constructor(
        date: string,
        avgtemp_c: number,
        totalprecip_mm: number
    ) {
        this.date = date;
        this.avgtemp_c = avgtemp_c;
        this.totalprecip_mm = totalprecip_mm;
    }
}