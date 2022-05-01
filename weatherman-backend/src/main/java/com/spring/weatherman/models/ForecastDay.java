package com.spring.weatherman.models;

import lombok.Data;

@Data
public class ForecastDay {
    private String date;
    private double avgtemp_c;
    private double totalprecip_mm;
}
