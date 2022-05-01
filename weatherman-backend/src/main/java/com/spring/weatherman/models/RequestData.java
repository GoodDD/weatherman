package com.spring.weatherman.models;

import lombok.Data;

@Data
public class RequestData {
    private double latitude;
    private double longitude;
    private int range;
}
